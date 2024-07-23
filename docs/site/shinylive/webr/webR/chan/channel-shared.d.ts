import { Message } from './message';
import { ChannelMain, ChannelWorker } from './channel';
import { WebROptions } from '../webr-main';
export declare class SharedBufferChannelMain extends ChannelMain {
    #private;
    initialised: Promise<unknown>;
    resolve: (_?: unknown) => void;
    close: () => void;
    constructor(config: Required<WebROptions>);
    interrupt(): void;
}
export declare class SharedBufferChannelWorker implements ChannelWorker {
    #private;
    onMessageFromMainThread: (msg: Message) => void;
    constructor();
    resolve(): void;
    write(msg: Message, transfer?: [Transferable]): void;
    writeSystem(msg: Message, transfer?: [Transferable]): void;
    read(): Message;
    inputOrDispatch(): number;
    run(args: string[]): void;
    setInterrupt(interrupt: () => void): void;
    handleInterrupt(): void;
    setDispatchHandler(dispatch: (msg: Message) => void): void;
}
