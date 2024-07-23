import { Message } from './message';
import { WebROptions } from '../webr-main';
import { ChannelMain } from './channel';
export declare class PostMessageChannelMain extends ChannelMain {
    #private;
    initialised: Promise<unknown>;
    resolve: (_?: unknown) => void;
    close: () => void;
    constructor(config: Required<WebROptions>);
    interrupt(): void;
}
export declare class PostMessageChannelWorker {
    #private;
    constructor();
    resolve(): void;
    write(msg: Message, transfer?: [Transferable]): void;
    writeSystem(msg: Message, transfer?: [Transferable]): void;
    read(): Message;
    inputOrDispatch(): number;
    run(_args: string[]): void;
    setDispatchHandler(dispatch: (msg: Message) => void): void;
    request(msg: Message, transferables?: [Transferable]): Promise<any>;
    setInterrupt(): void;
    handleInterrupt(): void;
    onMessageFromMainThread(message: Message): void;
}
