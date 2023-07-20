<template>
  <div v-if="!loading">
    <Loader />
  </div>
  <div v-else><Loader /></div>
</template>

<script setup>
let loading = ref(true);
let data = ref(null);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

onMounted(async () => {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  } else {
    try {
      await sleep(500);
      const response = await $host.post("/userInfo");
      data.value = response.data;
      let sms = localStorage.getItem("sms_verification");
      if (sms != "verified") {
        return navigateTo("/sms-verification");
      } else {
        if (response.data.user.user_level === 1) {
          window.location.href = "/admin";
        }
        if (response.data.user.user_level === 7) {
          window.location.href = "/7";
        }
        if (response.data.user.user_level === 4) {
          window.location.href = "/4";
        }
      }
    } catch (error) {
      console.log(error);
    }

    loading.value = false;
  }
});
</script>

