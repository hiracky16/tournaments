export type Player = {
  id: string;
  name: string;
  winner?: boolean;
}

export type Game = {
  player1: Player,
  player2: Player,
}

export type Round = {
  games: Game[],
}

export type PlayerKeys = 'player1' | 'player2'

export type UpdateGameParams = {
  gameIdx: number,
  roundIdx: number,
  game: Game,
}

export type UpdateNextGamePlayerParams = {
  gameIdx: number,
  roundIdx: number,
  player: Player,
}
