<script setup lang="ts">
const isOpen = ref(false);

//
const open = () => {
  isOpen.value = true;
};

const close = () => {
  isOpen.value = false;
};

//
defineExpose({
  open,
  close,
});
</script>

<template>
  <div :class="['notification-container', { show: isOpen }]">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

<style lang="css" scoped></style>
