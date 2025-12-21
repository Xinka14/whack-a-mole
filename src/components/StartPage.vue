<script setup lang="ts">
defineEmits<{
  start: [];
}>();
</script>

<template>
  <div class="w-dvw h-dvh bg-linear-to-br from-violet-500 to-fuchsia-500 flex flex-col items-center justify-center text-white">
    <h1 class="w-80 text-center text-6xl font-bold mb-4">解压打地鼠</h1>
    <p class="w-50 text-xl">妈妈生日快乐！</p>
    <p class="w-50 text-xl">一边出气，一边赚钱!</p>
    <p class="w-50 text-xl mb-8">分数越高，奖金越多！</p>
    <button @click="$emit('start')" class="px-8 py-3 bg-white text-purple-600 font-bold text-lg rounded-lg">开始游戏</button>
    <p class="fixed right-2 bottom-2">Ver 1.2.17</p>
  </div>
</template>
