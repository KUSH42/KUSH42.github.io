import { Sequencer, WorkletSynthesizer } from 'spessasynth_lib';

const PROCESSOR_MODULE_PATH =
  'https://cdn.jsdelivr.net/npm/spessasynth_lib@4.1.0/dist/spessasynth_processor.min.js';
const SOUND_BANK_ID = 'main';
const TIME_TICK_MS = 100;

const workletModules = new WeakMap();

function toArrayBuffer(fileOrArrayBuffer) {
  if (fileOrArrayBuffer instanceof ArrayBuffer) {
    return Promise.resolve(fileOrArrayBuffer);
  }
  if (fileOrArrayBuffer?.arrayBuffer) {
    return fileOrArrayBuffer.arrayBuffer();
  }
  throw new TypeError('Expected a File or ArrayBuffer.');
}

function midiSourceFrom(fileOrArrayBuffer, buffer) {
  if (fileOrArrayBuffer instanceof ArrayBuffer) {
    return { binary: buffer, fileName: 'local.mid' };
  }
  return {
    binary: buffer,
    fileName: fileOrArrayBuffer?.name || 'local.mid',
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function ensureWorkletModule(context) {
  if (!workletModules.has(context)) {
    workletModules.set(
      context,
      context.audioWorklet.addModule(PROCESSOR_MODULE_PATH),
    );
  }
  return workletModules.get(context);
}

export async function createSpessaMidiPlayer({
  onStateChange = () => {},
  onTimeChange = () => {},
  onError = () => {},
} = {}) {
  let context = null;
  let synth = null;
  let sequencer = null;
  let destroyed = false;
  let pollTimer = null;

  let soundFontLoaded = false;
  let midiLoaded = false;
  let state = 'idle';
  let currentTime = 0;
  let duration = 0;

  let pendingSoundFontBuffer = null;
  let pendingMidiData = null;
  let pendingVolume = 1;
  let pendingLoop = false;

  function getDuration() {
    if (sequencer && Number.isFinite(sequencer.duration)) {
      return Math.max(0, sequencer.duration);
    }
    return duration;
  }

  function emitTime() {
    const nextTime = sequencer
      ? clamp(sequencer.currentHighResolutionTime || 0, 0, getDuration())
      : currentTime;
    currentTime = nextTime;
    duration = getDuration();
    onTimeChange({
      currentTime,
      duration,
    });
  }

  function stopPolling() {
    if (pollTimer !== null) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  function startPolling() {
    stopPolling();
    pollTimer = setInterval(() => {
      if (!destroyed) emitTime();
    }, TIME_TICK_MS);
  }

  function baseReadyState() {
    if (soundFontLoaded && midiLoaded) return 'ready';
    if (soundFontLoaded) return 'soundfont-ready';
    if (midiLoaded) return 'midi-ready';
    return 'idle';
  }

  function setState(nextState) {
    state = nextState;
    onStateChange({
      state,
      soundFontLoaded,
      midiLoaded,
      currentTime,
      duration,
      paused: sequencer ? sequencer.paused : false,
    });
  }

  function syncReadyState() {
    setState(baseReadyState());
    emitTime();
  }

  function fail(error) {
    stopPolling();
    const normalized = error instanceof Error ? error : new Error(String(error));
    setState('error');
    onError(normalized);
    return normalized;
  }

  function bindSequencerEvents() {
    sequencer.eventHandler.addEvent('songChange', 'matrix-rain-midi-song-change', () => {
      duration = getDuration();
      currentTime = 0;
      emitTime();
      if (state !== 'playing' && state !== 'paused' && state !== 'stopped') {
        syncReadyState();
      }
    });

    sequencer.eventHandler.addEvent('timeChange', 'matrix-rain-midi-time-change', () => {
      currentTime = clamp(sequencer.currentTime || 0, 0, getDuration());
      emitTime();
    });

    sequencer.eventHandler.addEvent('songEnded', 'matrix-rain-midi-song-ended', () => {
      stopPolling();
      sequencer.currentTime = 0;
      currentTime = 0;
      emitTime();
      setState('stopped');
    });

    sequencer.eventHandler.addEvent('midiError', 'matrix-rain-midi-error', (error) => {
      fail(error);
    });
  }

  async function ensureEngine() {
    if (sequencer) {
      return;
    }

    context = new AudioContext();
    await ensureWorkletModule(context);

    synth = new WorkletSynthesizer(context);
    synth.connect(context.destination);
    synth.setMasterParameter('masterGain', pendingVolume);

    sequencer = new Sequencer(synth);
    sequencer.loopCount = pendingLoop ? -1 : 0;
    bindSequencerEvents();

    if (pendingSoundFontBuffer) {
      await synth.soundBankManager.addSoundBank(pendingSoundFontBuffer, SOUND_BANK_ID);
      await synth.isReady;
      soundFontLoaded = true;
    }

    if (pendingMidiData) {
      sequencer.loadNewSongList([pendingMidiData]);
      sequencer.currentTime = currentTime;
      midiLoaded = true;
      duration = getDuration();
    }
  }

  function haltPlayback(resetTime = false) {
    if (!sequencer || !synth) {
      if (resetTime) currentTime = 0;
      return;
    }
    sequencer.pause();
    if (resetTime) {
      sequencer.currentTime = 0;
      currentTime = 0;
    } else {
      currentTime = clamp(sequencer.currentTime || 0, 0, getDuration());
    }
    synth.stopAll(true);
    synth.resetControllers();
    emitTime();
  }

  return {
    async loadSoundFont(fileOrArrayBuffer) {
      try {
        if (state === 'playing' || state === 'paused') {
          haltPlayback(true);
        }

        pendingSoundFontBuffer = await toArrayBuffer(fileOrArrayBuffer);
        soundFontLoaded = true;

        if (synth) {
          try {
            await synth.soundBankManager.deleteSoundBank(SOUND_BANK_ID);
          } catch {}
          await synth.soundBankManager.addSoundBank(pendingSoundFontBuffer, SOUND_BANK_ID);
          await synth.isReady;
        }

        syncReadyState();
      } catch (error) {
        soundFontLoaded = false;
        throw fail(error);
      }
    },

    async loadMidi(fileOrArrayBuffer) {
      try {
        if (state === 'playing' || state === 'paused') {
          haltPlayback(true);
        }

        const buffer = await toArrayBuffer(fileOrArrayBuffer);
        pendingMidiData = midiSourceFrom(fileOrArrayBuffer, buffer);
        midiLoaded = true;
        currentTime = 0;

        if (sequencer) {
          sequencer.loadNewSongList([pendingMidiData]);
          sequencer.currentTime = 0;
          duration = getDuration();
        }

        syncReadyState();
      } catch (error) {
        midiLoaded = false;
        throw fail(error);
      }
    },

    async play() {
      if (!soundFontLoaded || !midiLoaded) {
        return false;
      }
      try {
        await ensureEngine();
        await context.resume();
        if (currentTime > 0) {
          sequencer.currentTime = currentTime;
        }
        sequencer.play();
        startPolling();
        setState('playing');
        emitTime();
        return true;
      } catch (error) {
        throw fail(error);
      }
    },

    pause() {
      if (!soundFontLoaded || !midiLoaded || state !== 'playing' || !sequencer) {
        return;
      }
      sequencer.pause();
      currentTime = clamp(sequencer.currentTime || 0, 0, getDuration());
      stopPolling();
      setState('paused');
      emitTime();
    },

    stop() {
      if (!soundFontLoaded || !midiLoaded) {
        return;
      }
      stopPolling();
      haltPlayback(true);
      setState('stopped');
    },

    seek(seconds) {
      const nextTime = clamp(seconds, 0, getDuration());
      currentTime = nextTime;
      if (sequencer) {
        sequencer.currentTime = nextTime;
      }
      emitTime();
    },

    setVolume(value01) {
      pendingVolume = clamp(value01, 0, 1);
      if (synth) {
        synth.setMasterParameter('masterGain', pendingVolume);
      }
    },

    setLoop(enabled) {
      pendingLoop = enabled;
      if (sequencer) {
        sequencer.loopCount = enabled ? -1 : 0;
      }
    },

    getState() {
      return {
        state,
        soundFontLoaded,
        midiLoaded,
        currentTime,
        duration: getDuration(),
        paused: sequencer ? sequencer.paused : false,
      };
    },

    destroy() {
      destroyed = true;
      stopPolling();
      try {
        sequencer?.pause();
      } catch {}
      try {
        synth?.stopAll(true);
      } catch {}
      try {
        if (synth && context) synth.disconnect(context.destination);
      } catch {}
      try {
        synth?.destroy();
      } catch {}
      context?.close().catch(() => {});
    },
  };
}
