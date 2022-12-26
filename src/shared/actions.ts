import { GameStage, PlayerData, Team, GameState } from "./types"
import { makeActionCreator } from "@rbxts/rodux"

export type set_game_stage = { type: "set_game_stage", game_stage: GameStage }

export type add_player_data = { type: "add_player_data", player_data: PlayerData }

export type edit_player_data = { type: "edit_player_data", player_data: PlayerData }

export type remove_player_data = { type: "remove_player_data", user_id: number }

export type add_playing = { type: "add_playing", player: Model, team: Team }

export type remove_playing = { type: "remove_playing", player: Model, team: Team }

export type decrement_timer = { type: "decrement_timer" }

export type set_timer = { type: "set_timer", time: number }

export type set_store = { type: "set_store", game_state: GameState }

export type actions = set_game_stage | add_player_data | edit_player_data | remove_player_data | add_playing | remove_playing | decrement_timer | set_timer | set_store


/* rodux way
export const set_game_stage = makeActionCreator("set_game_stage", (game_stage: GameStage) => { return { game_stage } })

export const add_player_data = makeActionCreator("add_player_data", (player_data: PlayerData) => { return { player_data } })

export const edit_player_data = makeActionCreator("edit_player_data", (player_data: PlayerData) => { return { player_data } })

export const remove_player_data = makeActionCreator("remove_player_data", (user_id: number) => { return { user_id } })

export const add_playing = makeActionCreator("add_playing", (player: Model) => { return { player } })

export const remove_playing = makeActionCreator("remove_playing", (player: Model) => { return { player } })

export const decrement_timer = makeActionCreator("decrement_timer", () => { return {} })

export const set_timer = makeActionCreator("set_timer", (time: number) => { return { time } })

export const set_store = makeActionCreator("set_store", (game_state: GameState) => { return { game_state } })
*/