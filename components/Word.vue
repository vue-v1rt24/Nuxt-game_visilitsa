<script setup lang="ts">
const props = defineProps<{
  word: string | null;
  correctLetters: string[];
}>();
</script>

<template>
  <div class="word">
    <span v-for="(w, idx) in word" :key="idx" class="letter">
      {{ correctLetters.includes(w) ? w : '' }}
    </span>
  </div>
</template>

<style lang="css" scoped></style>
