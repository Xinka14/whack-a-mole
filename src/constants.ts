// 游戏常数配置

// images
import sk1 from './assets/sk_1.png';
import sk2 from './assets/sk_2.png';
import sx1 from './assets/sx_1.png';
import sx2 from './assets/sx_2.png';
import yy1 from './assets/yy_1.png';
import yy2 from './assets/yy_2.png';
// sounds
import sk from './assets/sk.mp3';
import sx from './assets/sx.mp3';
import yy from './assets/yy.mp3';

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
    score: 1,
    type: 'easy',
    img: {
      normal: sk1,
      hit: sk2,
    },
    sound: sk,
  },
  medium: {
    duration: 750,
    score: 2,
    type: 'medium',
    img: {
      normal: sx1,
      hit: sx2,
    },
    sound: sx,
  },
  hard: {
    duration: 700,
    score: 3,
    type: 'hard',
    img: {
      normal: yy1,
      hit: yy2,
    },
    sound: yy,
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
    max: 60,
    icon: '🥉',
    prize: '1万',
  },
  {
    min: 61,
    max: 85,
    icon: '🥈',
    prize: '2万',
  },
  {
    min: 86,
    max: 100,
    icon: '🥇',
    prize: '5万',
  },
];
