import { ServiceWorkerHandlers } from './channel';
export declare function handleInstall(): void;
export declare function handleActivate(event: ExtendableEvent): void;
export declare function handleFetch(event: FetchEvent): boolean;
export declare function handleMessage(event: ExtendableMessageEvent): boolean;
export declare const webRHandlers: ServiceWorkerHandlers;
