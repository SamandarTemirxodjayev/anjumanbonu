<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Xodim Ismi</label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="surname"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Xodim Familiyasi</label
            >
            <input
              id="surname"
              v-model="surname"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="phone_number"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Xodim Telefon raqami</label
            >
            <input
              id="phone_number"
              v-model="phone_number"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="options"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Xodim Lavozimi</label
            >
            <select
              v-model="user_level"
              id="options"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">Admin (Direktor)</option>
              <option value="2">Manager (1.1)</option>
              <option value="3">Manager (1.2)</option>
              <option value="4">Inkubator</option>
              <option value="5">Yem Zavod</option>
              <option value="6">Yangi Ferma</option>
              <option value="7">Eski Ferma(Dorixona, Dizenfeksiya)</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          @click="deleteUser"
          class="w-full px-4 py-2 my-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Xodimni ishdan bo'shatish
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
let surname = ref("");
let user_level = ref(null);
let phone_number = ref("");
const router = useRoute();

onMounted(async () => {
  console.log();
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user.user_level !== 1) {
      window.location.href = "/";
      return;
    }
    const response = await $host.get("/admin/users/" + router.params.id);
    users.value = response.data;
    name.value = users.value.name;
    surname.value = users.value.surname;
    user_level.value = users.value.user_level;
    phone_number.value = users.value.phone_number;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const handleSubmit = async (e) => {
  loading.value = true;
  e.preventDefault();
  try {
    const response = await $host.put("/admin/users/" + router.params.id, {
      name: name.value,
      surname: surname.value,
      user_level: user_level.value,
      phone_number: phone_number.value,
    });
    users.value = response.data;
    name.value = users.value.name;
    surname.value = users.value.surname;
    user_level.value = users.value.user_level;
    phone_number.value = users.value.phone_number;
    loading.value = false;
    alert("Yangilandi");
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async () => {
  loading.value = true;
  try {
    await $host.delete("/admin/users/" + router.params.id);
    alert("Xodimni ishdan bo'shatildi");
    window.location.href = "/admin/users";
  } catch (error) {
    console.log(error);
  }
};
</script>
