<template>
  <div>
    <div class="flex min-h-screen bg-gray-100 h-full font-sans antialiased bg-white text-black">
      <div class="w-64 bg-white border-r">
        <div class="p-4">
          <LazyNuxtLink to="/admin" class="text-lg font-bold">ANJUMANBONU</LazyNuxtLink>
        </div>
        <Time />
        <nav class="py-4">
          <ul class="space-y-2 text-gray-500 font-semibold text-xl px-4">
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img
                src="/dashboard.png"
                alt="dashboard"
                width="25"
                class="pr-2" />
              <LazyNuxtLink to="/admin" class="block py-2"> Dashboard </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img src="/user.png" alt="dashboard" width="25" class="pr-2" />
              <LazyNuxtLink to="/admin/users" class="block py-2">
                Xodimlar
              </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img src="/drugs.png" alt="dashboard" width="25" class="pr-2" />
              <LazyNuxtLink to="/admin/drugs" class="block py-2">
                Dorilar
              </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img src="/doctor.png" alt="dashboard" width="25" class="pr-2" />
              <LazyNuxtLink to="/admin/dizenfeksiya" class="block py-2">
                Dizinfeksiya
              </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img src="/logout.png" alt="dashboard" width="25" class="pr-2" />
              <LazyNuxtLink to="/logout" class="block py-2"> Chiqish </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img src="/chat.png" alt="dashboard" width="25" class="pr-2" />
              <LazyNuxtLink to="/chat" class="block py-2"> Chat </LazyNuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="flex-1 p-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import Time from './Time.vue'
</script>