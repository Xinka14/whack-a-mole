<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from './composables/useGame';
import StartPage from './components/StartPage.vue';
import GameBoard from './components/GameBoard.vue';
import ScoreBoard from './components/ScoreBoard.vue';
import { TOTAL_MOLES } from './constants';

const { state, resetGame, startCountdown, hitMole } = useGame();

const isWaiting = computed(() => state.value.isCountingDown === false && state.value.isGameStarted === false);
const isGameEnded = computed(() => state.value.moles.length === TOTAL_MOLES && state.value.moles.every((mole) => mole.isVisible === false));
const isGameStarted = computed(() => (state.value.isCountingDown === true || state.value.isGameStarted === true) && isGameEnded.value === false);

function handleStart() {
  resetGame();
  startCountdown();
}
function handleRestart() {
  resetGame();
}
</script>

<template>
  <div>
    <StartPage v-if="isWaiting" @start="handleStart" />
    <GameBoard v-if="isGameStarted" :state="state" :hit-mole="hitMole" />
    <ScoreBoard v-if="isGameEnded" :state="state" @restart="handleRestart" />
  </div>
</template>
