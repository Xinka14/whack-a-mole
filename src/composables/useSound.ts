import { MOLE_CONFIGS } from '../constants';
import { MoleTypes, type MoleType } from './useGame';

export function useSound() {
  let audioContext: AudioContext | null = null;
  const buffers = new Map<MoleType, AudioBuffer>();
  let initialized = false;

  async function initSounds() {
    if (initialized === true) {
      return;
    }
    initialized = true;

    audioContext = new AudioContext();

    // 并行加载所有音效
    await Promise.all(MoleTypes.map(loadSound));
  }

  async function loadSound(type: MoleType) {
    if (audioContext === null) {
      return;
    }
    const res = await fetch(MOLE_CONFIGS[type].sound);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await audioContext.decodeAudioData(arrayBuffer);
    buffers.set(type, buffer);
  }

  function playSound(type: MoleType, volume = 1) {
    if (audioContext === null) {
      return;
    }
    const buffer = buffers.get(type);
    if (buffer === undefined) {
      return;
    }

    // 某些浏览器需要在用户交互后 resume
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start(0); // 叠加播放关键点
  }

  return {
    initSounds,
    playSound,
  };
}
