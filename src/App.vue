<template>
  <div>
    <main class="flex">
      <div
        class="bg-white min-h-screen h-auto poke-transition"
        :class="isSideNavigationToggled ? 'w-16 mr-2' : 'sm:w-66 w-16 mr-1'"
      >
        <SideNav @toggle-side-navigation="toggleSideNavigation" />
      </div>
      <section class="flex-1 bg-gray-1 min-h-screen h-auto overflow-hidden">
        <div class="p-6 flex justify-between bg-primary-700 text-white">
          <Header headingLevel="h2" :text="currentLabel" />
        </div>
        <div class="m-6"><RouterView /></div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideNav from './components/SideNav.vue'
import Header from './components/SharedComponents/Header.vue'

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const routes = ref(['/pokemon', '/pokemon'])

const labels = ref(['Pokemon', 'About'])

const isSideNavigationToggled = ref(false)

const route = useRoute()

const toggleSideNavigation = (isSideNavigation: boolean) => {
  isSideNavigationToggled.value = isSideNavigation
  console.log(isSideNavigationToggled, 'isSideNavigationToggled')
}

const currentLabel = computed(() => {
  const index = routes.value.indexOf(route.path)
  return index !== -1 ? labels.value[index] : 'DashBoard'
})
</script>

<style scoped></style>
