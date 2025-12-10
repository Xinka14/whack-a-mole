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
</script>

<template>
  <div class="w-dvw h-dvh bg-linear-to-br from-violet-500 to-fuchsia-500 flex flex-col gap-2 px-4 text-white">
    <div class="text-center text-4xl py-4">得分</div>
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
    <hr class="my-2" />
    <div class="text-right px-4">{{ score }}</div>

    <button @click="$emit('restart')" class="px-8 py-3 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all">再来一局</button>
  </div>
</template>
