<script setup lang="ts">
const props = defineProps<{
  wrongLetters: string[];
}>();
</script>

<template>
  <div class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Ошибки</p>
      <span v-for="(letter, idx) in wrongLetters" :key="letter">{{
        wrongLetters.length - 1 > idx ? `${letter}, ` : letter
      }}</span>

      <!-- <span v-for="(letter, idx) in wrongLetters" :key="letter">{{
        wrongLetters.length - 1 === idx ? letter : `${letter}, `
      }}</span> -->

      <!-- <span v-for="(letter, idx) in wrongLetters" :key="letter">{{
        {{ wrongLetters.length - 1 !== idx ? `${letter}, ` : letter }}
      }}</span> -->
    </div>
  </div>
</template>

<style lang="css" scoped></style>
