export enum GameStage {
    preGame,
    inGame,
    postGame
}

export interface GamePlayerState {
    name: string
    character_team: Folder
    player_team: Team
}

export interface GameState {
    game_stage: GameStage
}

export type State = GamePlayerState | GameState

export const INITIAL_STATE: State = {
    game_stage: GameStage.preGame,
    name: "test",

}
