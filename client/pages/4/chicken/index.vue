<template>
  <div v-if="!loading">
    <Sidebar4>
      <div class="mt-8">
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 border border-black">Yuborgan Tashkilot</th>
              <th class="px-5 py-3 border border-black">Mahsulot</th>
              <th class="px-5 py-3 border border-black">Soni</th>
              <th class="px-5 py-3 border border-black">Zarar Yetkan Jo'Jalar</th>
              <th class="px-5 py-3 border border-black">Umumiy Soni</th>
              <th class="cursor-pointer px-5 py-3 border border-black">Vaqti</th>
              <th class="cursor-pointer px-5 py-3 border border-black">Sanasi</th>
              <th class="cursor-pointer px-5 py-3 border border-black">Holati</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="egg in eggs" :key="egg._id" class="hover:bg-gray-200 cursor-pointer text-center" @click="redirect(egg._id)">
              <td class="px-5 py-3 border border-black">{{ egg.companyName }}</td>
              <td class="px-5 py-3 border border-black">{{ egg.name }}</td>
              <td class="px-5 py-3 border border-black">{{ egg.quantity }}</td>
              <td class="px-5 py-3 border border-black">{{ egg.defectiveChichken }} ( {{(100-(egg.quantity-egg.defectiveChichken)*100/egg.quantity).toFixed(3)}}% )</td>
              <td class="px-5 py-3 border border-black">{{ egg.quantity-egg.defective-egg.unfertilized-egg.defectiveChichken }} ( {{((egg.quantity-egg.defective-egg.unfertilized-egg.defectiveChichken)*100/egg.quantity).toFixed(3)}}% )</td>
              <td class="px-5 py-3 border border-black">{{ egg.time }}</td>
              <td class="px-5 py-3 border border-black">{{ egg.date }}</td>
              <td class="px-5 py-3 border border-black">{{ egg.status }}</td>
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
const loading = ref(true);
const eggs = ref([]);

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user.user_level !== 4) {
      window.location.href = "/";
      return;
    }
    const resEggs = await $host.get("/incubator/chickens");
    console.log(resEggs.data);
    eggs.value = resEggs.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const redirect = (id) => {
  navigateTo("/4/chicken/" + id);
}
</script>
