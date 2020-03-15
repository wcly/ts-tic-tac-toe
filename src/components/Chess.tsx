import React from 'react'
import { ChessType } from '../types/enums'
import './Chess.css'

interface PropTypes {
    type: ChessType,
    onClick?: () => void,
}

export default function Chess({ type, onClick }: PropTypes) {
    let chess = null;
    if (type === ChessType.red) {
        chess = <div className="red chess-item"></div>
    } else if (type === ChessType.black) {
        chess = <div className="black chess-item"></div>
    }

    return (
        <div className="chess" onClick={() => {
            if (type === ChessType.none && onClick) {
                onClick()
            }
        }}>
            {chess}
        </div>
    )
}
