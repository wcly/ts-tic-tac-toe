import React, { PureComponent } from 'react'
import { ChessType, GameStatus } from '../types/enums'
import { Board } from './Board'
import GameStatusShow from './GameStatusShow'

interface StateTyps {
    cheeses: ChessType[],
    gameStatus: GameStatus,
    nextChess: ChessType.red | ChessType.black
}

export default class Game extends PureComponent<{}, StateTyps> {
    state: StateTyps = {
        cheeses: [],
        gameStatus: GameStatus.gaming,
        nextChess: ChessType.black
    }

    componentDidMount() {
        this.init()
    }

    init() {
        const arr: ChessType[] = [];
        for (let i = 0; i < 9; i++) {
            arr.push(ChessType.none)
        }
        this.setState({
            cheeses: arr,
            gameStatus: GameStatus.gaming,
            nextChess: ChessType.black
        })
    }

    getStatus = (chesses: ChessType[], index: number): GameStatus => {
        // 1. 判断是否有一方获得胜利
        const horMin = Math.floor(index / 3) * 3;
        const verMin = index % 3;
        if ((chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2])
            || (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6])
            || (chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none)
            || (chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none)) {
            if (chesses[index] === ChessType.red) {
                return GameStatus.redWin
            } else {
                return GameStatus.blackWin
            }
        }
        // 2. 判断还不是平局
        if (!chesses.includes(ChessType.none)) {
            return GameStatus.equal;
        }
        return GameStatus.gaming
    }

    handleChessClick = (index: number) => {
        this.setState(({ cheeses, nextChess }) => {
            const newCheeses = cheeses.map((item, i) => {
                if (i === index) {
                    return nextChess
                } else {
                    return item
                }
            })
            return {
                cheeses: newCheeses,
                nextChess: nextChess === ChessType.black ? ChessType.red : ChessType.black,
                gameStatus: this.getStatus(newCheeses, index)
            }
        })
    }

    render() {
        return (
            <div className="game" style={{textAlign: 'center'}}>
                <h1>井字过三关</h1>
                <GameStatusShow status={this.state.gameStatus} next={this.state.nextChess} />
                <Board
                    chesses={this.state.cheeses}
                    isGameOver={this.state.gameStatus !== GameStatus.gaming}
                    onClick={index => this.handleChessClick(index)} />
                <button onClick={() => this.init()}>重新开始</button>
            </div >
        )
    }
}
