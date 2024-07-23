/**
 * Interfaces for the webR main and worker thread communication channels.
 * @module Channel
 */
import { AsyncQueue } from './queue';
import { Message, Response } from './message';
import { WebRPayload } from '../payload';
export declare abstract class ChannelMain {
    #private;
    inputQueue: AsyncQueue<Message>;
    outputQueue: AsyncQueue<Message>;
    systemQueue: AsyncQueue<Message>;
    abstract initialised: Promise<unknown>;
    abstract close(): void;
    abstract interrupt(): void;
    read(): Promise<Message>;
    flush(): Promise<Message[]>;
    readSystem(): Promise<Message>;
    write(msg: Message): void;
    request(msg: Message, transferables?: [Transferable]): Promise<WebRPayload>;
    protected putClosedMessage(): void;
    protected resolveResponse(msg: Response): void;
}
export interface ChannelWorker {
    resolve(): void;
    write(msg: Message, transfer?: [Transferable]): void;
    writeSystem(msg: Message, transfer?: [Transferable]): void;
    read(): Message;
    handleInterrupt(): void;
    setInterrupt(interrupt: () => void): void;
    run(args: string[]): void;
    inputOrDispatch: () => number;
    setDispatchHandler: (dispatch: (msg: Message) => void) => void;
    onMessageFromMainThread: (msg: Message) => void;
}
/**
 * Handler functions dealing with setup and communication over a Service Worker.
 */
export interface ServiceWorkerHandlers {
    handleActivate: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
    handleFetch: (this: ServiceWorkerGlobalScope, ev: FetchEvent) => any;
    handleInstall: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
    handleMessage: (this: ServiceWorkerGlobalScope, ev: ExtendableMessageEvent) => any;
}
