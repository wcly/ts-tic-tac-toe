import React from 'react'
import { GameStatus, ChessType } from '../types/enums'
import './GameStatusShow.css'

interface PropTypes {
    status: GameStatus,
    next: ChessType.red | ChessType.black
}

export default function GameStatusShow({ status, next }: PropTypes) {
    let content: JSX.Element;
    if (status === GameStatus.gaming) {
        if (next === ChessType.red) {
            content = <div className="red">红方落子</div>
        } else {
            content = <div className="black">黑方落子</div>
        }
    } else {
        if (status === GameStatus.redWin) {
            content = <div className="win red">红方胜利</div>
        } else if (status === GameStatus.blackWin) {
            content = <div className="win black">黑方胜利</div>
        } else {
            content = <div className="win equal">平局</div>
        }
    }

    return (
        <div className="status">
            {content}
        </div>
    )
}
