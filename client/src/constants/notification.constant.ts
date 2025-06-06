import type { NotificationType } from '../types';

export const notificationClasses: Record<NotificationType, string> = {
  success: 'bg-green-200 border border-green-500 text-green-800',
  error: 'bg-rose-200 border border-rose-400 text-rose-800',
  warning: 'bg-orange-200 border border-amber-600 text-orange-800',
  info: 'bg-blue-200 border border-blue-500 text-blue-800',
};

export const svgColorClasses: Record<NotificationType, string> = {
  success: 'stroke-green-800',
  error: 'stroke-rose-800',
  warning: 'stroke-orange-800',
  info: 'stroke-blue-800',
};
