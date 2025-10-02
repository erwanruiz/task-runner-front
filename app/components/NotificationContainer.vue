<template>
  <div
    v-if="notifications.length > 0"
    class="fixed top-4 right-4 z-50 space-y-2 w-full"
  >
    <TransitionGroup
      name="notification"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
          {
            'bg-red-50 border-red-200': notification.type === 'error',
            'bg-green-50 border-green-200': notification.type === 'success',
            'bg-yellow-50 border-yellow-200': notification.type === 'warning',
            'bg-blue-50 border-blue-200': notification.type === 'info',
          }
        ]"
      >
        <div class="p-4">
          <div class="flex items-bottom">
            <div class="flex-shrink-0">
              <!-- Error Icon -->
              <svg
                v-if="notification.type === 'error'"
                class="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <!-- Success Icon -->
              <svg
                v-else-if="notification.type === 'success'"
                class="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <!-- Warning Icon -->
              <svg
                v-else-if="notification.type === 'warning'"
                class="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>

              <!-- Info Icon -->
              <svg
                v-else
                class="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div class="ml-3 w-0 flex-1">
              <p
                :class="[
                  'text-sm font-medium',
                  {
                    'text-red-800': notification.type === 'error',
                    'text-green-800': notification.type === 'success',
                    'text-yellow-800': notification.type === 'warning',
                    'text-blue-800': notification.type === 'info',
                  }
                ]"
              >
                {{ notification.message }}
              </p>
            </div>

            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="removeNotification(notification.id)"
                :class="[
                  'rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  {
                    'focus:ring-red-500': notification.type === 'error',
                    'focus:ring-green-500': notification.type === 'success',
                    'focus:ring-yellow-500': notification.type === 'warning',
                    'focus:ring-blue-500': notification.type === 'info',
                  }
                ]"
              >
                <span class="sr-only">{{ t('common.close') }}</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { notifications, removeNotification } = useNotifications()
const { t } = useI18n()
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>