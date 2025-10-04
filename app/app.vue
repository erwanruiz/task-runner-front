<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NotificationContainer />
  </div>
</template>

<script setup>
const { initAuth } = useAuth()

// Initialize auth on app startup
onMounted(async () => {
  await initAuth()
})
</script>
