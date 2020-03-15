// 棋子类型
export enum ChessType {
    none,
    red,
    black
}

export enum GameStatus {
    gaming, // 游戏中
    redWin, // 红方胜
    blackWin, //黑方胜
    equal, // 平局
}