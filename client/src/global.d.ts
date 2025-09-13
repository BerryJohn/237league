// Global type definitions for next-intl
type Messages = typeof import('../messages/pl.json');

declare global {
  interface IntlMessages extends Messages {}
}

export {};
