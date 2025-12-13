import { ref, computed } from 'vue';
import { TOTAL_MOLES, EASY_MOLES, MEDIUM_MOLES, HARD_MOLES, INTERVAL_SLOPE, MIN_INTERVAL, MAX_INTERVAL, HOLE_ROWS, HOLE_COLS, MOLE_CONFIGS, HOLE_COOLDOWN, MOLE_HIT_DURATION } from '../constants';
import { assertNotNull, createArrayByRange, getRandomElement, sleep } from '../utils';
import { useSound } from './useSound';

const { initSounds, playSound } = useSound();

export interface GameState {
  countdown: number;
  isGameStarted: boolean;
  isCountingDown: boolean;
  holes: Hole[];
  moles: Mole[];
}

export interface Hole {
  id: number; // start from 0
  isInUse: boolean;
}

export const MoleTypes = ['easy', 'medium', 'hard'] as const;
export type MoleType = (typeof MoleTypes)[number];
export interface Mole {
  id: number; // start from 1
  hole: Hole;
  type: MoleType;
  isHit: boolean;
  isVisible: boolean;
  timer: number;
}

export function useGame(
  initState: GameState = {
    countdown: 3,
    isGameStarted: false,
    isCountingDown: false,
    holes: [],
    moles: [],
  },
) {
  const state = ref<GameState>(structuredClone(initState));
  let timer: number;
  initSounds();

  const generatedCount = computed(() => {
    return {
      easy: state.value.moles.filter((mole) => mole.type === 'easy').length,
      medium: state.value.moles.filter((mole) => mole.type === 'medium').length,
      hard: state.value.moles.filter((mole) => mole.type === 'hard').length,
      total: state.value.moles.length,
    };
  });
  const candidateHoles = computed(() => state.value.holes.filter((hole) => hole.isInUse === false));
  const candidateTypes = computed(() => {
    const types: MoleType[] = [];
    if (generatedCount.value.easy < EASY_MOLES) {
      types.push('easy');
    }
    if (generatedCount.value.medium < MEDIUM_MOLES) {
      types.push('medium');
    }
    if (generatedCount.value.hard < HARD_MOLES) {
      types.push('hard');
    }
    return types;
  });

  function resetGame() {
    state.value = structuredClone(initState);
    state.value.holes = createArrayByRange(HOLE_ROWS * HOLE_COLS).map((id) => generateHole(id));
    clearInterval(timer);
  }

  function generateHole(id: number): Hole {
    return {
      id,
      isInUse: false,
    };
  }

  function useHole(hole: Hole) {
    const found = state.value.holes.findIndex((h) => h.id === hole.id);
    if (found < 0) {
      return;
    }

    state.value.holes.splice(found, 1, {
      ...state.value.holes[found]!,
      isInUse: true,
    });
  }

  function freeHole(hole: Hole) {
    window.setTimeout(() => {
      const found = state.value.holes.findIndex((h) => h.id === hole.id);
      if (found < 0) {
        return;
      }
      state.value.holes.splice(found, 1, {
        ...state.value.holes[found]!,
        isInUse: false,
      });
    }, HOLE_COOLDOWN);
  }

  function startCountdown() {
    state.value.isCountingDown = true;

    timer = window.setInterval(() => {
      state.value.countdown--;
      if (state.value.countdown <= 0) {
        clearInterval(timer);
        startGame();
      }
    }, 1000);
  }

  async function startGame() {
    state.value.isCountingDown = false;
    state.value.isGameStarted = true;

    while (generatedCount.value.total < TOTAL_MOLES) {
      const interval = getMoleInterval();
      generateMole();
      await sleep(interval);
    }
  }

  function getMoleInterval() {
    const denominator = 1 + Math.exp(INTERVAL_SLOPE * (generatedCount.value.total - TOTAL_MOLES / 2));
    return Math.round(MIN_INTERVAL + (MAX_INTERVAL - MIN_INTERVAL) / denominator);
  }

  function generateMole() {
    const hole = getRandomElement(candidateHoles.value);
    const type = getRandomElement(candidateTypes.value);
    assertNotNull(hole);
    assertNotNull(type);

    const id = generatedCount.value.total + 1;
    useHole(hole);
    const mole: Mole = {
      id,
      hole,
      type,
      isHit: false,
      isVisible: true,
      timer: window.setTimeout(() => hideMole(mole), MOLE_CONFIGS[type].duration),
    };
    state.value.moles.push(mole);
    // console.log(`地鼠${mole.id}出现在了${hole.id}`);
  }

  function hideMole(mole: Mole) {
    const found = state.value.moles.findIndex((m) => m.id === mole.id);
    if (found < 0) {
      return;
    }

    freeHole(mole.hole);
    state.value.moles.splice(found, 1, {
      ...state.value.moles[found]!,
      isVisible: false,
    });
    // console.log(`地鼠${mole.id}逃回去了`);
  }

  function hitMole(mole: Mole | undefined) {
    if (mole === undefined) {
      return;
    }

    const found = state.value.moles.findIndex((m) => m.id === mole.id);
    if (found < 0) {
      return;
    }

    clearTimeout(mole.timer);
    state.value.moles.splice(found, 1, {
      ...state.value.moles[found]!,
      isHit: true,
    });
    playSound(mole.type);
    window.setTimeout(() => hideMole(mole), MOLE_HIT_DURATION);
    console.log(`地鼠${mole.id}被打中了`);
  }

  return {
    state,
    resetGame,
    startCountdown,
    hitMole,
  };
}
