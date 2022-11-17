import * as actions from "./actions"
import { GameState, GameStage } from "./types"
import Rodux, { createReducer, Store } from "@rbxts/rodux"
import { Players } from "@rbxts/services"

export type State = GameState

const INITIAL_STATE: State = {
    game_stage: GameStage.preGame,
    players: [],
    seekers: 0,
    hiders: 0,
    countdown: 60
}

const reducer = createReducer<State, actions.actions>(INITIAL_STATE, {
    set_game_stage: (state: State, action: actions.set_game_stage) => {
        state.game_stage = action.game_stage
        return state
    },
    add_player_data: (state: State, action: actions.add_player_data) => {
        const player = Players.GetPlayerByUserId(action.player_data.user_id)
        if (player) {
            state.players.push(action.player_data)

            player.SetAttribute("Team", action.player_data.player_team)
            //more attributes
        }
        return state
    },
    edit_player_data: (state: State, action: actions.edit_player_data) => {
        const player = Players.GetPlayerByUserId(action.player_data.user_id)
        if (player) {
            const index = state.players.findIndex(player => player.user_id === action.player_data.user_id)
            if (state.players[index]) state.players[index] = action.player_data

            player.SetAttribute("Team", action.player_data.player_team)
            //more attributes
        }
        return state
    }
})

export const store = new Store(reducer, {
    game_stage: GameStage.preGame,
    players: [],
    seekers: 0,
    hiders: 0,
    countdown: 60
}, [Rodux.loggerMiddleware])
