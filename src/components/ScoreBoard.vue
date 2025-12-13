<script setup lang="ts">
import { computed } from 'vue';
import { MoleTypes, type GameState } from '../composables/useGame';
import { MOLE_CONFIGS } from '../constants';

interface Props {
  state: GameState;
}
const props = defineProps<Props>();
defineEmits<{
  restart: [];
}>();

const count = computed(() => Object.fromEntries(MoleTypes.map((type) => [type, props.state.moles.filter((mole) => mole.type === type && mole.isHit === true).length])));
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
    <template v-for="type in MoleTypes" :key="type">
      <div class="flex justify-between items-center px-4">
        <img :src="`${MOLE_CONFIGS[type].img.hit}`" class="h-24" />
        <p>×</p>
        <p>{{ count[type] }}</p>
        <p>=</p>
        <p>{{ (count[type] ?? 0) * MOLE_CONFIGS[type].score }}</p>
      </div>
    </template>
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
