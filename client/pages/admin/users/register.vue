<template>
  <div v-if="!loading">
    <AdminSidebar>
    <div class="max-w-md mx-auto mt-8">
      <div class="bg-green-300 p-2 my-4" :class="{ 'block': success, 'hidden': !success }">
        <div class="text-lg font-semibold">Xodim muvaffaqiyatli qo'shildi</div>
        <div class="font-semibold">
          <div>Ismi: {{ data.name || "N/A" }}</div>
          <div>Familiyasi: {{ data.surname || "N/A" }}</div>
          <div>Darajasi: {{ data.user_level || "N/A" }}</div>
          <div>Telefon Raqami: {{ data.phone_number || "N/A" }}</div>
          <div>Login: {{ data.login || "N/A" }}</div>
          <div>Parol: {{ data.password || "N/A" }}</div>
        </div>
      </div>
      <form @submit="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Xodim Ismi</label>
          <input id="name" v-model="name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="surname" class="block mb-2 text-sm font-medium text-gray-700">Xodim Familiyasi</label>
          <input id="surname" v-model="surname" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-700">Xodim Telefon Raqami ( + belgisiz )</label>
          <input id="phone_number" v-model="phone_number" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="998339999779" />
        </div>
        <div class="mb-4">
          <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Xodim Lavozimi</label>
          <select v-model="user_level" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
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
          <button type="submit" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
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
const surname = ref("");
const user_level = ref(null);
const success = ref(false);
const phone_number = ref("");
const data = ref({
  name: "",
  surname: "",
  user_level: "",
  login: "",
  password: "",
  phone_number: "",
});

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
    const response = await $host.post("/register", {
      name: name.value,
      surname: surname.value,
      user_level: user_level.value,
      phone_number: phone_number.value,
    });
    data.value = response.data.newUser;
    success.value = true;
    name.value = "";
    surname.value = "";
    user_level.value = null;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
