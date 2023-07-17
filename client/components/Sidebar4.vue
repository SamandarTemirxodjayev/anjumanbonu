<template>
  <div>
    <div class="flex min-h-screen bg-gray-100 h-full font-sans antialiased bg-white text-black">
      <div class="w-64 bg-white border-r">
        <div class="p-4">
          <LazyNuxtLink to="/4" class="text-lg font-bold">ANJUMANBONU</LazyNuxtLink>
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
              <LazyNuxtLink to="/4/" class="block py-2"> Dashboard </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img
                src="/import.png"
                alt="dashboard"
                width="25"
                class="pr-2" />
              <LazyNuxtLink to="/4/add/register" class="block py-2"> Qabul Qilish </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img
                src="/eggs.png"
                alt="dashboard"
                width="25"
                class="pr-2" />
              <LazyNuxtLink to="/4/add" class="block py-2"> Qabullar (Tuxum) </LazyNuxtLink>
            </li>
            <li
              class="flex items-center hover:bg-purple-100 hover:text-purple-600 px-2">
              <img
                src="/chicken.png"
                alt="dashboard"
                width="25"
                class="pr-2" />
              <LazyNuxtLink to="/4/chicken" class="block py-2"> Qabullar (Jo'Ja) </LazyNuxtLink>
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