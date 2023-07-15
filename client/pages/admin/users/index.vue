<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <a href="/admin/users/register" class="flex justify-end mb-4 mr-10">
          <button class="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-sm font-semibold">
            Xodim Qo'shish
          </button>
        </a>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 border border-black">Xodim Ismi</th>
              <th class="px-5 py-3 border border-black">Xodim Familiyasi</th>
              <th class="px-5 py-3 border border-black">Xodim Darajasi</th>
              <th class="px-5 py-3 border border-black">Xodim Raqami</th>
              <th class="px-5 py-3 border border-black">Xodim Logini</th>
              <th @click="userPasswordf" class="cursor-pointer px-5 py-3 border border-black">Xodim Paroli</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" class="hover:bg-gray-200 cursor-pointer text-center">
              <td class="px-5 py-3 border border-black"><a :href="`/admin/users/${user._id}`">{{ user.name }}</a></td>
              <td class="px-5 py-3 border border-black">{{ user.surname }}</td>
              <td class="px-5 py-3 border border-black text-center">{{ user.user_level }}</td>
              <td class="px-5 py-3 border border-black">{{ user.phone_number }}</td>
              <td class="px-5 py-3 border border-black">{{ user.login }}</td>
              <td class="px-5 py-3 border border-black"><span v-if="!userPassword">*************</span><span v-else>{{ user.password }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
const loading = ref(true);
const users = ref([]);
const userPassword = ref(false);

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user.user_level !== 1) {
      window.location.href = "/";
      return;
    }
    const response = await $host.get("/admin/users");
    users.value = response.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const userPasswordf = () => {
  userPassword.value = !userPassword.value;
};
</script>