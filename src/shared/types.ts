export enum GameStage {
    preGame = "preGame",
    inGame = "inGame",
    postGame = "postGame"
}

export interface PlayerData {
    user_id: number
    player_team: Team
}

export interface GameState {
    game_stage: GameStage
    players: Array<PlayerData>
    hiders: number
    seekers: number
    countdown: number
}