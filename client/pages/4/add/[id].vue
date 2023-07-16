<template>
	<div v-if="!loading">
		<Sidebar4>
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
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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
					Xodimni ishdan bo'shatish
				</button>
			</div>
		</Sidebar4>
	</div>
	<div v-else><Loader /></div>
</template>

<script setup>
	let loading = ref(true);

	const router = useRoute();

	onMounted(async () => {
		console.log();
		try {
			const res = await $host.post("/userInfo");
			if (res.data.user.user_level !== 4) {
				window.location.href = "/";
				return;
			}
			const response = await $host.get("/admin/users/" + router.params.id);
		} catch (error) {
			console.log(error);
		}
		loading.value = false;
	});
</script>
