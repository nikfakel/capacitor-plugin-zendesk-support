export {};
declare global {
  interface Window {
    zE: (action: string, argument?: string, options?: any) => void;
    zendesk: any;
  }
}
