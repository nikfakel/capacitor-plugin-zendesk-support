export interface ZendeskSupportPlugin {
    initialize(options: InitializeOptions): Promise<void>;
    setAnonymousIdentity(options: AnonymousOptions): Promise<void>;
    setIdentity(option: IdentityOption): Promise<void>;
    showHelpCenter(options?: HelpCenterOptions): Promise<void>;
    openChat(options?: TicketRequestOptions): Promise<void>;
    showUserTickets(): Promise<void>;
    closeChat(): Promise<void>;
}
export interface InitializeOptions {
    zendeskUrl: string;
    appId: string;
    clientId: string;
    webClientId: string;
    debugLog: boolean;
}
export interface AnonymousOptions {
    name: string;
    email: string;
}
export interface IdentityOption {
    token: string;
}
export interface HelpCenterOptions {
    groupBy?: string;
    groupIds?: number[];
    labels?: string[];
}
export interface TicketRequestOptions {
    subject?: string;
    tags?: string[];
    fields?: string[];
}
