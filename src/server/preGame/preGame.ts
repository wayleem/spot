import { store } from "shared/store"
import { GameStage } from "shared/types"
import { ReplicatedStorage } from "@rbxts/services"
import assignTeam from "./assignTeamModule"
import loading from "./loadingModule"
import * as log from "shared/logs"

const StateChangeEvent = ReplicatedStorage.WaitForChild("StateChanges") as RemoteEvent

export default function preGame() {
    const state = store.getState()
    const players = loading(state) as Player[]

    log.debug("Assigning teams...")
    assignTeam(players, state)

    store.dispatch({ type: "set_game_stage", game_stage: GameStage.inGame })
    StateChangeEvent.FireAllClients(state)
}