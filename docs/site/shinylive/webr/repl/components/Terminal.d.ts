import React from 'react';
import './Terminal.css';
import { TerminalInterface } from '../App';
import { WebR } from '../../webR/webr-main';
import 'xterm/css/xterm.css';
export declare function Terminal({ webR, terminalInterface, }: {
    webR: WebR;
    terminalInterface: TerminalInterface;
}): React.JSX.Element;
export default Terminal;
