import { MOLE_CONFIGS } from '../constants';
import { MoleTypes, type MoleType } from './useGame';
import bgm from '../assets/bgm.mp3';

export function useSound() {
  let audioContext: AudioContext | null = null;
  const buffers = new Map<MoleType, AudioBuffer>();
  let bgmSource: AudioBufferSourceNode | null = null;
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

  async function playBgm() {
    if (audioContext === null) {
      return;
    }
    const res = await fetch(bgm);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = await audioContext.decodeAudioData(arrayBuffer);

    bgmSource = audioContext.createBufferSource();
    bgmSource.buffer = buffer;
    bgmSource.loop = true;

    const bgmGain = audioContext.createGain();
    bgmGain.gain.value = 0.3;
    bgmSource.connect(bgmGain);
    bgmGain.connect(audioContext.destination);

    bgmSource.start(0);
  }

  function stopBgm() {
    if (bgmSource === null) {
      return;
    }

    bgmSource.stop();
  }

  return {
    initSounds,
    playSound,
    playBgm,
    stopBgm,
  };
}
