import { AdminMenuColor } from './types';

export const getIconStyles = (color: AdminMenuColor) => {
  switch (color) {
    case 'primary':
      return {
        container: 'bg-blue-100 dark:bg-blue-900/20',
        icon: 'text-blue-600 dark:text-blue-400',
      };
    case 'secondary':
      return {
        container: 'bg-purple-100 dark:bg-purple-900/20',
        icon: 'text-purple-600 dark:text-purple-400',
      };
    case 'success':
      return {
        container: 'bg-green-100 dark:bg-green-900/20',
        icon: 'text-green-600 dark:text-green-400',
      };
    case 'warning':
      return {
        container: 'bg-orange-100 dark:bg-orange-900/20',
        icon: 'text-orange-600 dark:text-orange-400',
      };
    case 'danger':
      return {
        container: 'bg-red-100 dark:bg-red-900/20',
        icon: 'text-red-600 dark:text-red-400',
      };
    default:
      return {
        container: 'bg-gray-100 dark:bg-gray-900/20',
        icon: 'text-gray-600 dark:text-gray-400',
      };
  }
};
