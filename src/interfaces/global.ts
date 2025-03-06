export {};

declare global {
  interface Window {
    GetUserID: () => string | null;
    IsGameReadOnly: () => boolean;
    GetToken: () => string | null;
    GetApiBaseUrl: () => string | null;
  }
  function createUnityInstance(...args: any[]): any;
}
