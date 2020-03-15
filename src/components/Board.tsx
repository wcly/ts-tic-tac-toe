import React from 'react'
import { ChessType } from '../types/enums'
import Chess from './Chess'
import './Board.css'

interface PropTypes {
    chesses: ChessType[],
    onClick?: (index: number) => void,
    isGameOver?: boolean
}

export const Board: React.FC<PropTypes> = function Board ({ chesses, onClick, isGameOver }: PropTypes) {
    const nIsGameOver = isGameOver!; // 转换成boolean

    const list = chesses.map((type, index) => <Chess
        type={type}
        key={index}
        onClick={() => { !nIsGameOver && onClick && onClick(index) }}
    />)

    return (
        <div className="board">
            {list}
        </div>
    )
}

Board.defaultProps = {
    isGameOver: false
}
