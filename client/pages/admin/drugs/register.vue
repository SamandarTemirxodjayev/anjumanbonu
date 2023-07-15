<template>
  <div v-if="!loading">
    <AdminSidebar>
    <div class="max-w-md mx-auto mt-8">
      <div class="bg-green-300 p-2 my-4" :class="{ 'block': success, 'hidden': !success }">
        <div class="font-semibold text-xl">
          Muvaffaqiyatli yaratildi
        </div>
      </div>
      <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Dori Ismi</label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label
              for="type"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Dori o'lchami</label
            >
            <select
              v-model="type"
              id="options"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="Litr">Litr</option>
              <option value="Doza">Doza</option>
            </select>
          </div>
          <div class="mb-4">
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Har bir dori o'lchami uchun narxi</label
            >
            <input
              id="price"
              v-model="price"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label
              for="min_limit"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Dorining minimal ko'rsatkichi</label
            >
            <input
              id="min_limit"
              v-model="min_limit"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
    </div>
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
const loading = ref(true);
const name = ref("");
const price = ref("");
const type = ref(null);
const success = ref(false);
const min_limit = ref("");

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user.user_level !== 1) {
      window.location.href = "/";
      return;
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.post("/admin/drugs", {
      name: name.value,
      price: price.value,
      type: type.value,
      min_limit: min_limit.value,
    });
    success.value = true;
    name.value = "";
    price.value = "";
    type.value = null;
    min_limit.value = "";
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
