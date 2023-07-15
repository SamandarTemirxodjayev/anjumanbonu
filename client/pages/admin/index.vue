<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="flex items-center">
        <LazyNuxtLink to="/admin/users" class="mr-2">
          <div
            class="square text-white border rounded-lg dark:bg-[#555]">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ users.length }}
              </div>
              <div class="mt-4 text-center">Xodimlar soni</div>
            </div>
          </div>
        </LazyNuxtLink>
        <LazyNuxtLink to="/admin/drugs" class="mr-2">
          <div
            class="square text-white border rounded-lg dark:bg-[#555]">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ drugs.length }}
              </div>
              <div class="mt-4 text-center">Dorilar soni</div>
            </div>
          </div>
        </LazyNuxtLink>
        <LazyNuxtLink to="/admin/dizenfeksiya" class="mr-2">
          <div
            class="square text-white border rounded-lg dark:bg-[#555]">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ dizenfeksiya.length }}
              </div>
              <div class="mt-4 text-center">Dizenfeksiya soni</div>
            </div>
          </div>
        </LazyNuxtLink>
      </div>
      <div>
        <div>So'ngi Amaliyotlar</div>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 border border-black">Name</th>
              <th class="px-5 py-3 border border-black">Surname</th>
              <th class="px-5 py-3 border border-black">Xodim Darajasi</th>
              <th class="px-5 py-3 border border-black">Xodim Raqami</th>
              <th class="px-5 py-3 border border-black">Login</th>
              <th
                @click="userPasswordf"
                class="cursor-pointer px-5 py-3 border border-black">
                Password
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user._id"
              class="hover:bg-gray-200 cursor-pointer text-center">
              <td class="px-5 py-3 border border-black">123</td>
              <td class="px-5 py-3 border border-black">123</td>
              <td class="px-5 py-3 border border-black">123</td>
              <td class="px-5 py-3 border border-black">123</td>
              <td class="px-5 py-3 border border-black">123</td>
              <td class="px-5 py-3 border border-black">123</td>
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
  let loading = ref(true);
  let users = ref([]);
  let drugs = ref([]);
  let dizenfeksiya = ref([]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onMounted(async () => {
    try {
      await sleep(1000);
      const res = await $host.post("/userInfo");
      if (res.data.user.user_level !== 1) {
        window.location.href = "/";
        return;
      }
      const response = await $host.get("/admin/users");
      users.value = response.data;
      const responsedrugs = await $host.get("/admin/drugs");
      drugs.value = responsedrugs.data;
      const responsedizenfeksiya = await $host.get("/admin/dizenfeksiya");
      dizenfeksiya.value = responsedizenfeksiya.data;
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  });
</script>
<style scoped>
  .square {
    width: 250px;
    height: 200px;
  }
</style>
