import * as actions from "./actions"
import { State, INITIAL_STATE } from "./types"
import Rodux, { createReducer, Store } from "@rbxts/rodux"

const reducer = createReducer<State, actions.actions>(INITIAL_STATE, {
    set_game_stage: (state: State, action: actions.set_game_stage) => {
        state = action
        return state
    },
    set_player_team: (state: State, action: actions.set_player_team) => {
        state = action
        return state
    },
})

export const store = new Store(reducer, {}, [Rodux.thunkMiddleware])

