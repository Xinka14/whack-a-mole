<script setup lang="ts">
import { computed, ref } from 'vue';
import { MoleTypes, type GameState } from '../composables/useGame';
import { MOLE_CONFIGS, RANK_CONFIGS } from '../constants';

interface Props {
  state: GameState;
}
const props = defineProps<Props>();
defineEmits<{
  restart: [];
}>();

const showPrize = ref(false);
function openPrize() {
  showPrize.value = true;
}
function closePrize() {
  showPrize.value = false;
}

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
const prize = computed(() => {
  const rank = RANK_CONFIGS.find((rank) => isInRange.value(rank.min, rank.max));
  return rank?.prize ?? '';
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
    <template v-for="(rank, index) in RANK_CONFIGS" :key="index">
      <div class="flex justify-between items-center text-right px-4" :class="isInRange(rank.min, rank.max) ? [] : ['text-gray-400']">
        <p class="w-10">{{ rank.min }}</p>
        <p>〜</p>
        <p>{{ rank.max }}</p>
        <p class="text-2xl" :class="isInRange(rank.min, rank.max) ? ['shake'] : ['opacity-25']" @click.stop="openPrize">{{ rank.icon }}</p>
      </div>
    </template>
    <div class="flex-1"></div>
    <button @click="$emit('restart')" class="px-8 py-3 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all">再来一局</button>
  </div>
  <Teleport to="body">
    <div v-if="showPrize" class="modal-mask" @click.self="closePrize">
      <div class="modal-content flex flex-col justify-evenly items-center">
        <marquee behavior="alternate">😘😘😘</marquee>
        <marquee behavior="alternate" direction="right">🎉🎉🎉</marquee>
        <p class="text-xl">{{ prize }}</p>
        <marquee behavior="alternate">🎉🎉🎉</marquee>
        <marquee behavior="alternate" direction="right">😘😘😘</marquee>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.shake {
  animation: shake 1.5s 0.5s infinite both;
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  10% {
    transform: rotate(-12deg);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  20% {
    transform: rotate(12deg);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  28% {
    transform: rotate(-10deg);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  36% {
    transform: rotate(10deg);
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
  }

  42% {
    transform: rotate(-8deg);
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
  }

  48% {
    transform: rotate(8deg);
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
  }

  52% {
    transform: rotate(-4deg);
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
  }

  56% {
    transform: rotate(4deg);
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
  }

  60% {
    transform: rotate(0deg);
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
  }

  100% {
    transform: rotate(0deg);
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease forwards;
  z-index: 999;
}

.modal-content {
  background: #eee;
  padding: 24px 32px;
  border-radius: 12px;
  width: 80%;
  height: 40%;

  animation: scaleIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
