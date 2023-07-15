<template>
  <Loader />
</template>
<script setup>
setTimeout(() => {
  localStorage.clear();
  navigateTo('/login');
}, 2000);
</script>