import React from 'react';
import { WebR } from '../../webR/webr-main';
import { EditorState } from '@codemirror/state';
import { FilesInterface, TerminalInterface } from '../App';
import 'react-data-grid/lib/styles.css';
import './Editor.css';
type EditorBase = {
    name: string;
    readOnly: boolean;
};
type EditorData = EditorBase & {
    type: "data";
    data: {
        columns: {
            key: string;
            name: string;
        }[];
        rows: {
            [key: string]: string;
        }[];
    };
};
type EditorHtml = EditorBase & {
    path: string;
    type: "html";
    readOnly: boolean;
    frame: HTMLIFrameElement;
};
type EditorFile = EditorBase & {
    path: string;
    type: "text";
    readOnly: boolean;
    editorState: EditorState;
    scrollTop?: number;
    scrollLeft?: number;
};
export type EditorItem = EditorData | EditorHtml | EditorFile;
export declare function FileTabs({ files, activeFileIdx, setActiveFileIdx, closeFile }: {
    files: EditorItem[];
    activeFileIdx: number;
    setActiveFileIdx: React.Dispatch<React.SetStateAction<number>>;
    closeFile: (e: React.SyntheticEvent, index: number) => void;
}): React.JSX.Element;
export declare function Editor({ webR, terminalInterface, filesInterface, }: {
    webR: WebR;
    terminalInterface: TerminalInterface;
    filesInterface: FilesInterface;
}): React.JSX.Element;
export default Editor;
