<script setup lang="ts">
import { computed } from 'vue';
import type { GameState } from '../composables/useGame';
import { MOLE_CONFIGS } from '../constants';
import easy2 from '../assets/easy_2.png';
import medium2 from '../assets/medium_2.png';
import hard2 from '../assets/hard_2.png';

interface Props {
  state: GameState;
}
const props = defineProps<Props>();
defineEmits<{
  restart: [];
}>();

const count = computed(() => {
  return {
    easy: props.state.moles.filter((mole) => mole.type === 'easy' && mole.isHit === true).length,
    medium: props.state.moles.filter((mole) => mole.type === 'medium' && mole.isHit === true).length,
    hard: props.state.moles.filter((mole) => mole.type === 'hard' && mole.isHit === true).length,
  };
});
const score = computed(() => {
  return props.state.moles.reduce((total, mole) => {
    if (mole.isHit === false) {
      return total;
    }

    return total + MOLE_CONFIGS[mole.type].score;
  }, 0);
});
const isInRange = computed(() => (min: number, max: number) => {
  return score.value >= min && score.value <= max;
});
</script>

<template>
  <div class="w-dvw h-dvh bg-linear-to-br from-violet-500 to-fuchsia-500 flex flex-col gap-2 p-4 text-white">
    <div class="text-center text-4xl py-2">得分</div>
    <div class="flex justify-between items-center px-4">
      <img :src="`${easy2}`" class="h-24" />
      <p>×</p>
      <p>{{ count.easy }}</p>
      <p>=</p>
      <p>{{ count.easy * MOLE_CONFIGS['easy'].score }}</p>
    </div>
    <div class="flex justify-between items-center px-4">
      <img :src="`${medium2}`" class="h-24" />
      <p>×</p>
      <p>{{ count.medium }}</p>
      <p>=</p>
      <p>{{ count.medium * MOLE_CONFIGS['medium'].score }}</p>
    </div>
    <div class="flex justify-between items-center px-4">
      <img :src="`${hard2}`" class="h-24" />
      <p>×</p>
      <p>{{ count.hard }}</p>
      <p>=</p>
      <p>{{ count.hard * MOLE_CONFIGS['hard'].score }}</p>
    </div>
    <hr />
    <div class="text-right px-4">{{ score }}</div>
    <div class="flex-1"></div>
    <div class="flex justify-between items-center text-right px-4" :class="isInRange(0, 500) ? ['animate-bounce'] : []">
      <p class="w-10">0</p>
      <p>〜</p>
      <p>500</p>
      <p class="text-2xl">🥉</p>
      <p class="w-10">1万</p>
    </div>
    <div class="flex justify-between items-center text-right px-4" :class="isInRange(501, 800) ? ['animate-bounce'] : []">
      <p class="w-10">501</p>
      <p>〜</p>
      <p>800</p>
      <p class="text-2xl">🥈</p>
      <p class="w-10">2万</p>
    </div>
    <div class="flex justify-between items-center text-right px-4" :class="isInRange(801, 1000) ? ['animate-bounce'] : []">
      <p class="w-10">801</p>
      <p>〜</p>
      <p>1000</p>
      <p class="text-2xl">🥇</p>
      <p class="w-10">5万</p>
    </div>
    <div class="flex-1"></div>
    <button @click="$emit('restart')" class="px-8 py-3 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all">再来一局</button>
  </div>
</template>
