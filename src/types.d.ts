export {};
declare global {
  interface Window {
    zE: (action: string, argument?: string, options?: () => void) => void;
    zendesk: any;
  }
}