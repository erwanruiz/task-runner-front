<template>
  <div class="min-h-screen bg-background">
    <header class="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-6">
            <h1 class="text-xl font-semibold text-foreground">
              Task Runner
            </h1>

            <!-- Navigation Links -->
            <nav v-if="isAuthenticated" class="hidden md:flex items-center space-x-6">
              <NuxtLink
                to="/"
                class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                active-class="text-foreground"
              >
                {{ t('nav.home') }}
              </NuxtLink>
              <NuxtLink
                to="/tasks"
                class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                active-class="text-foreground"
              >
                {{ t('nav.tasks') }}
              </NuxtLink>
              <NuxtLink
                to="/calendar"
                class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                active-class="text-foreground"
              >
                {{ t('nav.calendar') }}
              </NuxtLink>
            </nav>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Language Selector -->
            <LanguageSelector />

            <!-- Theme Toggle -->
            <ThemeToggle />

            <!-- User Menu -->
            <div v-if="isAuthenticated" class="flex items-center space-x-3">
              <div class="flex items-center space-x-2">
                <img
                  v-if="user?.avatar_url"
                  :src="user.avatar_url"
                  :alt="user.name"
                  class="h-8 w-8 rounded-full border border-border"
                >
                <div v-else class="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border">
                  <span class="text-sm font-medium text-muted-foreground">
                    {{ user?.name?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="text-sm font-medium text-foreground hidden sm:block">{{ user?.name }}</span>
              </div>

              <UiButton
                @click="logout"
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground"
              >
                {{ t('nav.logout') }}
              </UiButton>
            </div>

            <!-- Login Button for non-authenticated users -->
            <div v-else>
              <UiButton
                @click="$router.push('/login')"
                variant="default"
                size="sm"
              >
                {{ t('nav.login') }}
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, logout } = useAuth()
const { initLocale, t } = useI18n()

// Initialize locale on mount
onMounted(() => {
  initLocale()
})
</script>