// 游戏常数配置

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
    color: '#90EE90',
  },
  medium: {
    duration: 750,
    score: 20,
    type: 'medium',
    color: '#FFD700',
  },
  hard: {
    duration: 700,
    score: 30,
    type: 'hard',
    color: '#FF6347',
  },
};
export const MOLE_HIT_DURATION = 200;

// 地洞配置
export const HOLE_ROWS = 5;
export const HOLE_COLS = 3;
export const HOLE_COOLDOWN = 100; // ms
