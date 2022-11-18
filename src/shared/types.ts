import { Players } from "@rbxts/services"

export enum GameStage {
    preGame = "preGame",
    inGame = "inGame",
    postGame = "postGame"
}

export enum Team {
    intermission = "intermission",
    seeker = "seeker",
    hider = "hider"
}

export interface PlayerData {
    user_id: number,
    player_team: Team,
}

export interface GameState {
    game_stage: GameStage
    players: PlayerData[]
    hiders: Player[]
    seekers: Player[]
    countdown: number
}