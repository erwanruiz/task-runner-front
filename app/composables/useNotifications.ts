interface Notification {
  id: string
  title?: string
  type: 'error' | 'success' | 'warning' | 'info'
  message: string
  timeout?: number
}

export const useNotifications = () => {
  const notifications = useState<Notification[]>('notifications', () => [])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      timeout: 5000,
      ...notification
    }

    notifications.value.push(newNotification)

    if (newNotification.timeout && newNotification.timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.timeout)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  const showError = (message: string, timeout?: number) => {
    return addNotification({ type: 'error', message, timeout })
  }

  const showSuccess = (message: string, timeout?: number) => {
    return addNotification({ type: 'success', message, timeout })
  }

  const showWarning = (message: string, timeout?: number) => {
    return addNotification({ type: 'warning', message, timeout })
  }

  const showInfo = (message: string, timeout?: number) => {
    return addNotification({ type: 'info', message, timeout })
  }

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearAll,
    showError,
    showSuccess,
    showWarning,
    showInfo
  }
}