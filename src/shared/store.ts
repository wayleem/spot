import * as action from "./actions"
import { GameState, GameStage, Team } from "./types"
import Rodux, { createReducer, Store } from "@rbxts/rodux"
import { Players } from "@rbxts/services"

export type State = GameState

const INITIAL_STATE: State = {
    game_stage: GameStage.preGame,
    players: [],
    seekers: [],
    hiders: [],
    time: 30
}

const reducer = createReducer<State, action.actions>(INITIAL_STATE, {
    set_game_stage: (state: State, action: action.set_game_stage) => {
        state.game_stage = action.game_stage
        return state
    },
    add_player_data: (state: State, action: action.add_player_data) => {
        const player = Players.GetPlayerByUserId(action.player_data.user_id) as Player

        state.players.push(action.player_data)

        player.SetAttribute("Team", action.player_data.player_team)
        //more attributes

        return state
    },
    edit_player_data: (state: State, action: action.edit_player_data) => {
        const index = state.players.findIndex(player => player.user_id === action.player_data.user_id)
        const player = Players.GetPlayerByUserId(action.player_data.user_id) as Player

        if (index !== -1) state.players[index] = action.player_data

        player.SetAttribute("Team", action.player_data.player_team)
        //more attributes

        return state
    },
    remove_player_data: (state: State, action: action.remove_player_data) => {
        const index = state.players.findIndex(player => player.user_id === action.user_id)

        if (index !== -1) state.players.remove(index)

        return state
    },
    add_playing: (state: State, action: action.add_playing) => {
        switch (action.team) {
            case Team.hider:
                state.hiders.push(action.player)
                break
            case Team.seeker:
                state.seekers.push(action.player)
                break
        }

        return state
    },
    remove_playing: (state: State, action: action.remove_playing) => {
        let index
        switch (action.team) {
            case Team.hider:
                index = state.hiders.findIndex(hider => hider === action.player)
                if (index !== -1) state.hiders.remove(index)
                break
            case Team.seeker:
                index = state.seekers.findIndex(seeker => seeker === action.player)
                if (index !== -1) state.seekers.remove(index)
                break
        }

        return state
    },
    decrement_timer: (state: State) => {
        state.time = state.time - 1

        return state
    },
    set_timer: (state: State, action: action.set_timer) => {
        state.time = action.time

        return state
    },
    set_store: (state: State, action: action.set_store) => {
        state = action.game_state
        return state
    }
})

export const store = new Store(reducer, {
    game_stage: GameStage.preGame,
    players: [],
    seekers: [],
    hiders: [],
    time: 30
}, [Rodux.loggerMiddleware])
