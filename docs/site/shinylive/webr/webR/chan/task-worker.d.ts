import { Endpoint } from './task-common';
import { Message } from './message';
export declare class SyncTask {
    #private;
    endpoint: Endpoint;
    msg: Message;
    transfers: Transferable[];
    taskId?: number;
    sizeBuffer?: Int32Array;
    signalBuffer?: Int32Array;
    syncifier: _Syncifier;
    constructor(endpoint: Endpoint, msg: Message, transfers?: Transferable[]);
    scheduleSync(): this | undefined;
    poll(): boolean;
    doSync(): Generator<undefined, unknown, unknown>;
    get result(): unknown;
    syncify(): any;
}
declare class _Syncifier {
    nextTaskId: Int32Array;
    signalBuffer: Int32Array;
    tasks: Map<number, SyncTask>;
    constructor();
    scheduleTask(task: SyncTask): void;
    waitOnSignalBuffer(): void;
    tasksIdsToWakeup(): Generator<number, void, unknown>;
    pollTasks(task?: SyncTask): boolean;
    syncifyTask(task: SyncTask): void;
}
/**
 * Sets the interrupt handler. This is called when the computation is
 * interrupted. Should zero the interrupt buffer and throw an exception.
 * @internal
 */
export declare function setInterruptHandler(handler: () => void): void;
/**
 * Sets the interrupt buffer. Should be a shared array buffer. When element 0
 * is set non-zero it signals an interrupt.
 * @internal
 */
export declare function setInterruptBuffer(buffer: ArrayBufferLike): void;
export {};
