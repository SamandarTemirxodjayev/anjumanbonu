<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <NuxtLink
          to="/admin/drugs/register"
          class="flex justify-end mb-4 mr-10">
          <button
            class="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-sm font-semibold">
            Dori Qo'shish
          </button>
        </NuxtLink>
        <table class="w-full">
          <thead>
            <tr class="">
              <th class="px-5 py-3 text-left border border-black">Name</th>
              <th class="px-5 py-3 text-left border border-black">Qoldiq</th>
              <th class="px-5 py-3 text-left border border-black">Narxi</th>
              <th class="px-5 py-3 text-left border border-black">
                Umumiy Narxi
              </th>
              <th class="px-5 py-3 text-left border border-black">
                Minimal ko'rsatkich
              </th>
              <th class="px-5 py-3 text-left border border-black">Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in products"
              :key="user._id"
              class="hover:bg-gray-200 cursor-pointer">
              <td class="px-5 py-3 border border-black">
                <NuxtLink :to="`/admin/drugs/${user._id}`">
                  <div>
                    {{ user.name }}
                  </div>
                </NuxtLink>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ user.quantity }} {{ user.type }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{
                    user.price
                      .toLocaleString("en-US", {
                        useGrouping: true,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      .replaceAll(",", "'")
                  }}
                </div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>
                  {{
                    (user.price * user.quantity)
                      .toLocaleString("en-US", {
                        useGrouping: true,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      .replaceAll(",", "'")
                  }}
                </div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ user.min_limit }}</div>
              </td>
              <td
                class="px-5 py-3 border border-black text-white font-semibold"
                :class="{
                  'bg-red-500': user.min_limit > user.quantity,
                  'bg-green-500': user.min_limit <= user.quantity,
                }">
                <div>
                  {{
                    user.min_limit > user.quantity
                      ? "Olish kerak"
                      : "Yetarlicha"
                  }}
                </div>
              </td>
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
  let products = ref([]);
  let data = ref();
  let options = ref({
    responsive: true,
    maintainAspectRatio: false,
  });

  onMounted(async () => {
    try {
      const res = await $host.post("/userInfo");
      if (res.data.user.user_level !== 1) {
        window.location.href = "/";
        return;
      }
      const response = await $host.get("/admin/drugs");
      products.value = response.data;
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  });
</script>
