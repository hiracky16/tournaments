export type Player = {
  id: string;
  name: string;
  winner?: boolean;
}

export type Game = {
  player1: Player,
  player2: Player,
}

export type GameParams = {
  gameIdx: number,
  roundIdx: number,
  game: Game,
}
