// 游戏常数配置

// images
import easy1 from './assets/easy_1.png';
import easy2 from './assets/easy_2.png';
import medium1 from './assets/medium_1.png';
import medium2 from './assets/medium_2.png';
import hard1 from './assets/hard_1.png';
import hard2 from './assets/hard_2.png';
// sounds
import easy from './assets/easy.mp3';
import medium from './assets/medium.mp3';
import hard from './assets/hard.mp3';

// 地鼠配置
export const TOTAL_MOLES = 60; // 一局总地鼠数

export const EASY_MOLES = 30; // 低难度地鼠
export const MEDIUM_MOLES = 20; // 中难度地鼠
export const HARD_MOLES = 10; // 高难度地鼠

// 出现间隔
export const MAX_INTERVAL = 1000;
export const MIN_INTERVAL = 600;
export const INTERVAL_SLOPE = 0.5;

// 地鼠难度配置（停留时间 ms，得分）
export const MOLE_CONFIGS = {
  easy: {
    duration: 800,
    score: 10,
    type: 'easy',
    img: {
      normal: easy1,
      hit: easy2,
    },
    sound: easy,
  },
  medium: {
    duration: 750,
    score: 20,
    type: 'medium',
    img: {
      normal: medium1,
      hit: medium2,
    },
    sound: medium,
  },
  hard: {
    duration: 700,
    score: 30,
    type: 'hard',
    img: {
      normal: hard1,
      hit: hard2,
    },
    sound: hard,
  },
};
export const MOLE_HIT_DURATION = 200;

// 地洞配置
export const HOLE_ROWS = 5;
export const HOLE_COLS = 3;
export const HOLE_COOLDOWN = 100; // ms

// 奖励配置
export const RANK_CONFIGS = [
  {
    min: 0,
    max: 600,
    icon: '🥉',
    prize: '1万',
  },
  {
    min: 601,
    max: 850,
    icon: '🥈',
    prize: '2万',
  },
  {
    min: 851,
    max: 1000,
    icon: '🥇',
    prize: '5万',
  },
];
