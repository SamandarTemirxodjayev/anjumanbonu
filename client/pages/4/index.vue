<template>
  <div v-if="!loading">
    <Sidebar4>
      <div class="grid grid-cols-6">
        <LazyNuxtLink to="/4/add" class="mr-2 mb-2">
          <div class="square text-white border rounded-lg dark:bg-[#555]">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">{{eggs.length}}</div>
              <div class="mt-4 text-center">Qabul soni ( Tuxum )</div>
            </div>
          </div>
        </LazyNuxtLink>
        <LazyNuxtLink to="/4/chicken" class="mr-2 mb-2">
          <div class="square text-white border rounded-lg dark:bg-[#555]">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">{{chicken.length}}</div>
              <div class="mt-4 text-center">Qabul soni ( Jo'Ja )</div>
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
            <tr class="hover:bg-gray-200 cursor-pointer text-center">
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
    </Sidebar4>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let eggs = reactive({});
let chicken = reactive({});

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user.user_level !== 4) {
      window.location.href = "/";
      return;
    }
    const resEggs = await $host.get("/incubator/eggs");
    eggs = resEggs.data;
    const resChicken = await $host.get("/incubator/chickens");
    chicken = resChicken.data;
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
