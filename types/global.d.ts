// global.d.ts
export {};

declare global {
  interface Window {
    activityTimeout: ReturnType<typeof setTimeout>;
  }
}
