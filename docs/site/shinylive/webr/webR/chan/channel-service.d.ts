import { Message, Response } from './message';
import { ChannelMain, ChannelWorker } from './channel';
import { WebROptions } from '../webr-main';
export declare class ServiceWorkerChannelMain extends ChannelMain {
    #private;
    initialised: Promise<unknown>;
    resolve: (_?: unknown) => void;
    close: () => void;
    constructor(config: Required<WebROptions>);
    activeRegistration(): ServiceWorker;
    interrupt(): void;
}
export declare class ServiceWorkerChannelWorker implements ChannelWorker {
    #private;
    onMessageFromMainThread: (msg: Message) => void;
    constructor(data: {
        clientId?: string;
        location?: string;
    });
    resolve(): void;
    write(msg: Message, transfer?: [Transferable]): void;
    writeSystem(msg: Message, transfer?: [Transferable]): void;
    syncRequest(message: Message): Response;
    read(): Message;
    inputOrDispatch(): number;
    run(args: string[]): void;
    setInterrupt(interrupt: () => void): void;
    handleInterrupt(): void;
    setDispatchHandler(dispatch: (msg: Message) => void): void;
}
