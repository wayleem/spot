import { GameStage, PlayerData } from "./types"

export type set_game_stage = { type: "set_game_stage", game_stage: GameStage }

export type add_player_data = { type: "add_player_data", player_data: PlayerData }

export type edit_player_data = { type: "edit_player_data", player_data: PlayerData }

export type actions = set_game_stage | add_player_data | edit_player_data


/*
export const set_game_stage = makeActionCreator("set_game_stage", (game_stage: GameStage) => { return { game_stage } })
export const set_player_team = makeActionCreator("set_player_team", (team: string) => { return { team } })

export const action = { set_game_stage, set_player_team }
*/