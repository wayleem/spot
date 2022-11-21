import * as actions from "./actions"
import { GameState, GameStage, Team, PlayerData } from "./types"
import Rodux, { createReducer, Store } from "@rbxts/rodux"
import { Players, ReplicatedFirst } from "@rbxts/services"

export type State = GameState

const INITIAL_STATE: State = {
    game_stage: GameStage.preGame,
    players: [],
    seekers: [],
    hiders: [],
    timer: 30
}

const reducer = createReducer<State, actions.actions>(INITIAL_STATE, {
    set_game_stage: (state: State, action: actions.set_game_stage) => {
        state.game_stage = action.game_stage
        return state
    },
    add_player_data: (state: State, action: actions.add_player_data) => {
        const player = Players.GetPlayerByUserId(action.player_data.user_id) as Player

        state.players.push(action.player_data)

        player.SetAttribute("Team", action.player_data.player_team)
        //more attributes

        return state
    },
    edit_player_data: (state: State, action: actions.edit_player_data) => {
        const index = state.players.findIndex(player => player.user_id === action.player_data.user_id)
        const player = Players.GetPlayerByUserId(action.player_data.user_id) as Player

        if (index !== -1) state.players[index] = action.player_data

        player.SetAttribute("Team", action.player_data.player_team)
        //more attributes

        return state
    },
    remove_player_data: (state: State, action: actions.remove_player_data) => {
        const index = state.players.findIndex(player => player.user_id === action.user_id)

        if (index !== -1) state.players.remove(index)

        return state
    },
    add_playing_player: (state: State, action: actions.add_playing_player) => {
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
    remove_playing_player: (state: State, action: actions.remove_playing_player) => {
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
    decrement_game_time: (state: State) => {
        state.timer = state.timer - 1

        return state
    },
    set_game_time: (state: State, action: actions.set_game_time) => {
        state.timer = action.timer

        return state
    }
})

export const store = new Store(reducer, {
    game_stage: GameStage.preGame,
    players: [],
    seekers: [],
    hiders: [],
    timer: 30
}, [Rodux.loggerMiddleware])
