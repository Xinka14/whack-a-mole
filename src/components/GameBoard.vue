<script setup lang="ts">
import { computed } from 'vue';
import type { GameState, Mole } from '../composables/useGame';
import { HOLE_ROWS, HOLE_COLS } from '../constants';
import easy1 from '../assets/easy_1.png';
import easy2 from '../assets/easy_2.png';
import medium1 from '../assets/medium_1.png';
import medium2 from '../assets/medium_2.png';
import hard1 from '../assets/hard_1.png';
import hard2 from '../assets/hard_2.png';

interface Props {
  state: GameState;
  hitMole: (mole: Mole | undefined) => void;
}
const props = defineProps<Props>();

const moleAtHole = computed(() => (holeId: number) => {
  return props.state.moles.find((mole) => mole.isVisible === true && mole.hole.id === holeId);
});
const imagePath = computed(() => (holeId: number) => {
  const mole = moleAtHole.value(holeId);
  switch (mole?.type) {
    case 'easy':
      return mole.isHit ? easy2 : easy1;
    case 'medium':
      return mole.isHit ? medium2 : medium1;
    case 'hard':
      return mole.isHit ? hard2 : hard1;
    default:
      return '';
  }
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
      <div v-for="hole in state.holes" :key="`hole-${hole.id}`" class="border-4 border-yellow-900 rounded-full bg-yellow-800 flex items-center justify-center">
        <transition name="bounce">
          <div v-if="moleAtHole(hole.id)" :key="`mole-${moleAtHole(hole.id)!.id}`" class="w-3/4 h-3/4 mole transform transition-transform" :style="{ 'background-image': `url(${imagePath(hole.id)})` }" @click="hitMole(moleAtHole(hole.id))"></div>
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
