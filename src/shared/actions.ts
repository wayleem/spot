import Rodux, { makeActionCreator } from "@rbxts/rodux"
import { GameStage, GameState, GamePlayerState } from "./types"


export type set_game_stage = { type: "set_game_stage", game_stage: GameStage }
export type set_player_team = { type: "set_player_team", name: string, player_team: Team, character_team: Folder }

export type get_game_stage = { type: "get_game_state", GameState: GameState }
export type get_player_team = { type: "get_player_team" }

export type actions = set_game_stage | set_player_team


/*
export const set_game_stage = makeActionCreator("set_game_stage", (game_stage: GameStage) => { return { game_stage } })
export const set_player_team = makeActionCreator("set_player_team", (team: string) => { return { team } })

export const action = { set_game_stage, set_player_team }
*/