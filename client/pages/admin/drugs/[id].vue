<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
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
        <button
          @click="deleteUser"
          class="w-full px-4 py-2 my-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
          O'chirish
        </button>
      </div>
    </AdminSidebar>
  </div>
  <div v-else><Loader /></div>
</template>

<script setup>
  let loading = ref(true);
  let data = ref(null);
  let users = ref([]);
  let name = ref("");
  let type = ref(null);
  let price = ref("");
  let min_limit = ref("");
  const router = useRoute();

  onMounted(async () => {
    console.log();
    try {
      const res = await $host.post("/userInfo");
      if (res.data.user.user_level !== 1) {
        window.location.href = "/";
        return;
      }
      const response = await $host.get("/admin/drugs/" + router.params.id);
      users.value = response.data;
      name.value = users.value.name;
      type.value = users.value.type;
      price.value = users.value.price;
      min_limit.value = users.value.min_limit;
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  });

  const handleSubmit = async (e) => {
    loading.value = true;
    e.preventDefault();
    try {
      const response = await $host.put("/admin/drugs/" + router.params.id, {
        name: name.value,
        type: type.value,
        price: price.value,
        min_limit: min_limit.value,
      });
      users.value = response.data;
      name.value = users.value.name;
      type.value = users.value.type;
      price.value = users.value.price;
      min_limit.value = users.value.min_limit;
      loading.value = false;
      alert("Yangilandi");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    loading.value = true;
    try {
      await $host.delete("/admin/drugs/" + router.params.id);
      alert("O'chirildi");
      navigateTo("/admin/drugs");
    } catch (error) {
      console.log(error);
    }
  };
</script>
