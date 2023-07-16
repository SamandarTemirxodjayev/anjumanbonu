<template>
  <div class="mx-4 flex text-xl text-gray-500">
    <span class="pr-4">{{ currentTime }}</span>
    <span>{{ currentDate }}</span>
  </div>
</template>

<script setup>
const currentTime = ref('');
const currentDate = ref('');
const updateTimeAndDate = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
  currentDate.value = now.toLocaleDateString();
};
onMounted(() => {
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 1000);
});
</script>
