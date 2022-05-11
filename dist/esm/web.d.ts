import { WebPlugin } from '@capacitor/core';
import type { AnonymousOptions, IdentityOption, InitializeOptions, ZendeskSupportPlugin } from './definitions';
export declare class ZendeskSupportWeb extends WebPlugin implements ZendeskSupportPlugin {
    initialize(options: InitializeOptions): Promise<void>;
    setAnonymousIdentity(options: AnonymousOptions): Promise<void>;
    setIdentity(option: IdentityOption): Promise<void>;
    openChat(): Promise<void>;
    closeChat(): Promise<void>;
}
