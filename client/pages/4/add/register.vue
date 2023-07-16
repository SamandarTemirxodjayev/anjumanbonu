<template>
  <div v-if="!loading">
    <Sidebar4>
      <div class="max-w-md mx-auto mt-8">
        <div class="bg-green-300 p-2 my-4" :class="{ 'block': success, 'hidden': !success }">
          <div class="text-lg font-semibold">Muvaffaqiyatli qo'shildi</div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label for="companyName" class="block mb-2 text-sm font-medium text-gray-700">Yuborgan tashkilot nomi</label>
            <input id="companyName" v-model="companyName" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Mahsulot</label>
            <input disabled="disabled" id="name" v-model="name" type="text" class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="quantity" class="block mb-2 text-sm font-medium text-gray-700">Mahsulot soni</label>
            <input id="quantity" v-model="quantity" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-700">Narxi</label>
            <input id="price" v-model="price" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="priceEggs" class="block mb-2 text-sm font-medium text-gray-700">Mahsulot Umumiy Narxi</label>
            <input disabled="disabled" id="priceEggs" :value="totalPrice" type="text" class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="priceEggs" class="block mb-2 text-sm font-medium text-gray-700">Soliq Stavkasi</label>
            <input id="priceEggs" v-model="soliq" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="priceEggs" class="block mb-2 text-sm font-medium text-gray-700">Soliq Stavkasi</label>
            <input disabled="disabled" id="priceEggs" :value="totalPrices" class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Sana</label>
            <input disabled="disabled" v-model="date" class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Vaqt</label>
            <input disabled="disabled" v-model="time" class="bg-gray-300 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <button type="submit" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Sidebar4>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
const loading = ref(true);
const name = ref("Urug'langan tuxum");
const companyName = ref("");
const quantity = ref();
const price = ref();
const soliq = ref();
const date = ref('');
const time = ref('');
const success = ref(false);

const totalPrice = computed(() => {
  if (price.value && quantity.value) {
    return (price.value * quantity.value).toLocaleString();
  } else {
    return null;
  }
});
const totalPrices = computed(() => {
  if (price.value && quantity.value && soliq.value) {
    return ((price.value * quantity.value)/100*soliq.value +(price.value * quantity.value)).toLocaleString();
  } else {
    return null;
  }
});

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user.user_level !== 4) {
      window.location.href = "/";
      return;
    }
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
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const data = {
      name: name.value,
      companyName: companyName.value,
      quantity: quantity.value,
      price: price.value,
      soliq: soliq.value,
      date: date.value,
      time: time.value,
      status: 0,
      defective: 0,
      unfertilized: 0
    };
    const response = await $host.post('/incubator/eggs', data);
    if (response.status === 200) {
      success.value = true;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
