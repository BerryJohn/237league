import { ComponentType } from 'react';

export type AdminMenuColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'default';

export interface AdminMenuItem {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  color: AdminMenuColor;
  available: boolean;
}
