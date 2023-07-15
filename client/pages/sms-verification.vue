<template>
  <div v-if="!loading" class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form class="bg-white rounded-lg shadow-lg p-8" @submit.prevent="handleSubmit">
        <h2 class="text-2xl font-semibold mb-6">Tasdiqlash</h2>
        
        <div class="mb-4">
          <label for="vcode" class="block text-gray-700 font-semibold mb-2">Kodni kiriting</label>
          <input type="text" id="vcode" v-model="vcode" class="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-indigo-500">
        </div>
        <button type="submit" class="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors">Tasdiqlash</button>
      </form>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const loading = ref(true);
const vcode = ref('');

const handleSubmit = async () => {
  try {
    const response = await axios.post("http://80.78.254.116:3021/api/sms-verification", null, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log(response.data);
    // Handle the response as needed
  } catch (error) {
    console.log(error);
    // Handle the error as needed
  }
};

onMounted(async () => {
  const token = localStorage.getItem("sms_verification");
  if (token) {
    window.location.href = "/";
  } else {
    try {
      await axios.post("http://80.78.254.116:3021/api/sms-verification", {"text": "Hello"}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  }
});
</script>
