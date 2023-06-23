<script setup lang="ts">
import { Status } from '~/types/status.types';

//
const props = defineProps<{
  word: string | null;
}>();

const emit = defineEmits<{
  reStart: [];
}>();

//
const isVisible = ref(false);
const gameStatus = ref<Status | null>(null);

//
const open = (status: Status) => {
  isVisible.value = true;
  gameStatus.value = status;
};

const close = () => {
  isVisible.value = false;
};

//
defineExpose({
  open,
  close,
});
</script>

<template>
  <div v-if="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === Status.SUCCESS">Поздравляю, вы победили! 😃</h2>

      <template v-else>
        <h2>Вы проиграли. 😕</h2>
        <h3>...имя: {{ word }}</h3>
      </template>

      <button @click="emit('reStart')">Сыграть ещё раз</button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
