export interface ZendeskSupportPlugin {
  initialize(options: InitializeOptions): Promise<void>;
  setAnonymousIdentity(options: AnonymousOptions): Promise<void>;
  setIdentity(option: IdentityOption): Promise<void>;
  openChat(): Promise<void>;
}

export interface InitializeOptions {
  iosChatId: string;
  androidChatId: string;
  webClientId: string,
  debugLog: boolean,
}

export interface AnonymousOptions {
  name: string,
  email: string,
}

export interface IdentityOption {
  token: string,
}

export interface OpenChat {}
