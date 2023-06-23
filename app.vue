<script setup lang="ts">
import { Notification, Popup } from '#components';
import { Status } from './types/status.types';

const { data, error, refresh } = await useFetch<{ name: string }>('/api/username', {
  transform: (data) => {
    data.name = data.name.toLowerCase();
    return data;
  },
});

// console.log(data.value?.name);

// const word = ref('василий');
const word = ref<string | null>(data.value?.name || null);
const letters = ref<string[]>([]);
const notificationRef = ref<InstanceType<typeof Notification> | null>(null);
const popupRef = ref<InstanceType<typeof Popup> | null>(null);

//
const correctLetters = computed(() => letters.value.filter((w) => word.value?.includes(w)));
const wrongLetters = computed(() => letters.value.filter((w) => !word.value?.includes(w)));

const isSuccess = computed(() => [...word.value!].every((w) => correctLetters.value.includes(w)));
const isFailed = computed(() => wrongLetters.value.length === 6);

const isModalVisible = computed(() => isSuccess.value || isFailed.value);

//
let idxInterval: number = 0;

const showNotification = () => {
  clearTimeout(idxInterval);
  notificationRef.value?.open();

  idxInterval = window.setTimeout(() => notificationRef.value?.close(), 1000);
};

//
const reStart = () => {
  letters.value = [];
  popupRef.value?.close();
  refresh();
};

//
watch([correctLetters, wrongLetters, data], () => {
  if (isSuccess.value) {
    popupRef.value?.open(Status.SUCCESS);
  }

  if (isFailed.value) {
    popupRef.value?.open(Status.FAILED);
  }

  if (data.value) {
    // console.log('новое слово: ', data.value.name);
    word.value = data.value.name;
  }
});

//
onMounted(() => {
  window.addEventListener('keydown', ({ key }) => {
    if (isModalVisible.value) return;

    if (letters.value.includes(key)) {
      showNotification();

      return;
    }

    if (/[а-яА-яЁё]/.test(key)) {
      letters.value.push(key.toLowerCase());
    }
  });
});
</script>

<template>
  <div id="app">
    <Header />

    <div v-if="error" class="error">Данные не получены. Зайдите позже.</div>

    <div class="game-container">
      <Figure :wrong-letters-count="wrongLetters.length" />

      <WrongLetters v-if="wrongLetters.length" :wrong-letters="wrongLetters" />

      <Word :word="word" :correct-letters="correctLetters" />
    </div>

    <Popup ref="popupRef" :word="word" @re-start="reStart" />

    <Notification ref="notificationRef" />
  </div>
</template>

<style lang="css" scoped></style>
