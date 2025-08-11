import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  showBadge: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    vibration: false,
    showBadge: true,
  });

  // Obtener notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  // Agregar nueva notificación
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    if (!settings.enabled) return;

    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Simular efectos de notificación
    if (settings.sound) {
      // Aquí se podría reproducir un sonido
      console.log('🔔 Notificación con sonido');
    }

    if (settings.vibration) {
      // Aquí se podría activar la vibración
      console.log('📳 Notificación con vibración');
    }
  }, [settings]);

  // Marcar notificación como leída
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  // Eliminar notificación
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Limpiar todas las notificaciones
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Obtener notificaciones por tipo
  const getNotificationsByType = useCallback((type: Notification['type']) => {
    return notifications.filter(notification => notification.type === type);
  }, [notifications]);

  // Obtener notificaciones recientes (últimas 24 horas)
  const getRecentNotifications = useCallback(() => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return notifications.filter(notification => notification.timestamp > oneDayAgo);
  }, [notifications]);

  // Actualizar configuración
  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Simular notificaciones automáticas
  useEffect(() => {
    if (!settings.enabled) return;

    const interval = setInterval(() => {
      // Simular notificaciones del sistema
      const randomTypes: Notification['type'][] = ['info', 'success', 'warning', 'error'];
      const randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)];
      
      if (Math.random() < 0.1) { // 10% de probabilidad
        addNotification({
          title: 'Recordatorio del Sistema',
          message: 'No olvides revisar tus tareas pendientes',
          type: randomType,
        });
      }
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [settings.enabled, addNotification]);

  return {
    notifications,
    unreadCount,
    settings,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getNotificationsByType,
    getRecentNotifications,
    updateSettings,
  };
};
