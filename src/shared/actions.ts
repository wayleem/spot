import { GameStage, PlayerData, Team } from "./types"

export type set_game_stage = { type: "set_game_stage", game_stage: GameStage }

export type add_player_data = { type: "add_player_data", player_data: PlayerData }

export type edit_player_data = { type: "edit_player_data", player_data: PlayerData }

export type remove_player_data = { type: "remove_player_data", user_id: number }

export type add_playing_player = { type: "add_playing_player", player: Player, team: Team }

export type remove_playing_player = { type: "remove_playing_player", player: Player, team: Team }

export type actions = set_game_stage | add_player_data | edit_player_data | remove_player_data | add_playing_player | remove_playing_player


/*
export const set_game_stage = makeActionCreator("set_game_stage", (game_stage: GameStage) => { return { game_stage } })
export const set_player_team = makeActionCreator("set_player_team", (team: string) => { return { team } })

export const action = { set_game_stage, set_player_team }
*/