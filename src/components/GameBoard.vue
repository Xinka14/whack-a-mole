<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { GameState, Mole } from '../composables/useGame';
import { HOLE_ROWS, HOLE_COLS, MOLE_CONFIGS } from '../constants';

interface Props {
  state: GameState;
  hitMole: (mole: Mole | undefined) => void;
}
const props = defineProps<Props>();

const holesWithMole = computed(() => {
  return props.state.holes.map((hole) => {
    const mole = props.state.moles.find((mole) => mole.isVisible === true && mole.hole.id === hole.id);
    let imagePath;
    switch (mole?.isHit) {
      case true:
        imagePath = MOLE_CONFIGS[mole.type].img.hit;
        break;
      case false:
        imagePath = MOLE_CONFIGS[mole.type].img.normal;
        break;
      default:
        imagePath = '';
        break;
    }

    return {
      ...hole,
      mole,
      imagePath,
    };
  });
});

onMounted(() => {
  // preload images
  Object.values(MOLE_CONFIGS).forEach((config) => {
    const img1 = new Image();
    img1.src = config.img.normal;
    const img2 = new Image();
    img2.src = config.img.hit;
  });
});
</script>

<template>
  <div class="w-dvw h-dvh bg-green-100 flex flex-col">
    <!-- 倒计时 -->
    <div v-if="state.isCountingDown" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="text-white text-8xl font-bold">{{ state.countdown }}</div>
    </div>

    <!-- 地洞网格 -->
    <div class="flex-1 p-2 bg-green-200 grid gap-4 board">
      <div v-for="hole in holesWithMole" :key="`hole-${hole.id}`" class="border-4 border-yellow-900 rounded-full bg-yellow-800 flex items-center justify-center">
        <transition name="bounce">
          <div v-if="hole.mole" class="w-3/4 h-3/4 mole" :style="{ 'background-image': `url(${hole.imagePath})` }" @click="hitMole(hole.mole)"></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  grid-template-rows: repeat(v-bind(HOLE_ROWS), minmax(0, 1fr));
  grid-template-columns: repeat(v-bind(HOLE_COLS), minmax(0, 1fr));
}

.bounce-enter-active {
  animation: bounce-in 0.2s ease-out;
  transform-origin: bottom center;
}

.bounce-leave-active {
  animation: bounce-out 0.2s ease-in;
  transform-origin: bottom center;
  pointer-events: none;
}

@keyframes bounce-in {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scaleY(1);
    opacity: 1;
  }
  100% {
    transform: scaleY(0);
    opacity: 0;
  }
}

.mole {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
