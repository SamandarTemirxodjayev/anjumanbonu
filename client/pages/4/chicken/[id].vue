<template>
  <div v-if="!loading">
    <Sidebar4>
      <div class="max-w-md mx-auto mt-8">
        <div
          class="bg-green-300 p-2 my-4"
          :class="{ block: success, hidden: !success }"
        >
          <div class="text-lg font-semibold">Muvaffaqiyatli yangilandi</div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Qabul qilingan Sanasi</label
            >
            <input
              id="name"
              :value="`${deliveryDate.day}.${deliveryDate.month}.${deliveryDate.year}`"
              type="text"
              disabled="disabled"
              class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Qabul qilingan Vaqti</label
            >
            <input
              id="name"
              v-model="deliveryTime"
              type="text"
              disabled="disabled"
              class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Zarar Yetkan Jo'Jalar</label
            >
            <input
              id="name"
              v-model="defectiveChicken"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Zarar Yetkan Tuxumlar</label
            >
            <input
              id="name"
              v-model="defective"
              type="text"
              disabled="disabled"
              class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="surname"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Urug'lanmagan Tuxumlar</label
            >
            <input
              id="surname"
              v-model="unfertilized"
              type="text"
              disabled="disabled"
              class="bg-gray-300  w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="surname"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Vaqt</label
            >
            <input
              id="surname"
              v-model="time"
              type="text"
              disabled="disabled"
              class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="surname"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Sana</label
            >
            <input
              id="surname"
              v-model="date"
              type="text"
              disabled="disabled"
              class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="surname"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Holat</label
            >
            <select
              v-model="status"
              id="options"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">1 (Jo'Ja)</option>
              <option value="2">2 (Yopish)</option>
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
      </div>
    </Sidebar4>
  </div>
  <div v-else><Loader /></div>
</template>

<script setup>
let loading = ref(true);
let deliveryDate = reactive({
	day: "",
  month: "",
  year: "",
});
let deliveryTime = ref("");
let defectiveChicken = ref("");
let date = ref("");
let time = ref("");
let success = ref(false);
let status = ref("");
let defective = ref();
let unfertilized = ref();

const router = useRoute();

onMounted(async () => {
  console.log();
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user.user_level !== 4) {
      window.location.href = "/";
      return;
    }
    const resp = await $host.get("/incubator/eggs/" + router.params.id);
    deliveryDate = resp.data.date;
    deliveryTime.value = resp.data.time;
    defectiveChicken.value = resp.data.defectiveChicken;
    status.value = resp.data.status;
    defective.value = resp.data.defective;
    unfertilized.value = resp.data.unfertilized;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 500);
});
const updateTimeAndDate = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString();
  date.value = now.toLocaleDateString();
};
const handleSubmit = (e) => {
  e.preventDefault();
  const data = {
    defectiveChicken: defectiveChicken.value,
    status: status.value,
  };
  $host
    .put("/incubator/chickens/" + router.params.id, data)
    .then((res) => {
      success.value = true;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
