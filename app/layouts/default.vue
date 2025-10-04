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
            <div v-if="isAuthenticated">
              <UiDropdown>
                <template #trigger="{ isOpen }">
                  <button class="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
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
                    <svg
                      class="w-4 h-4 transition-transform duration-200"
                      :class="{ 'rotate-180': isOpen }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </template>

                <template #content="{ close }">
                  <div class="px-4 py-3 border-b border-border">
                    <div class="text-sm font-medium text-foreground">{{ user?.name }}</div>
                    <div class="text-sm text-muted-foreground">{{ user?.email }}</div>
                  </div>

                  <NuxtLink
                    to="/profile"
                    @click="close"
                    class="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {{ t('profile.manageProfile') }}
                  </NuxtLink>

                  <button
                    @click="logout(); close()"
                    class="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {{ t('nav.logout') }}
                  </button>
                </template>
              </UiDropdown>
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
import { onMounted } from 'vue'

const { user, isAuthenticated, logout } = useAuth()
const { initLocale, t } = useI18n()

// Initialize locale on mount
onMounted(() => {
  initLocale()
})
</script>