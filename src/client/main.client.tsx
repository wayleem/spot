import { makeHello } from "shared/calc"
import { ReplicatedStorage } from "@rbxts/services"
import { store } from "shared/store"
import { GameStage, GameState } from "shared/types"
import { Players, StarterGui } from "@rbxts/services"
import Roact from "@rbxts/roact"
import inGame from "./inGame/inGame"
import preGame from "./preGame/preGame"
import DevGui from "./gui/dev"
import TimerGui from "./gui/guiTimer"
import * as logs from "shared/logs"

print(makeHello("main.client.ts"))

const StateChangeEvent = ReplicatedStorage.WaitForChild("StateChanges") as RemoteEvent
const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui")

StarterGui.SetCoreGuiEnabled("PlayerList", false)

function Main() {
    return (
        <screengui ResetOnSpawn={false}>
            <TimerGui></TimerGui>
            <DevGui></DevGui>
        </screengui>
    )
}
Roact.mount(<Main />, PlayerGui, "Main")

StateChangeEvent.OnClientEvent.Connect((state) => ClientStoreHandler(state))

function ClientStoreHandler(state: Readonly<GameState>) {
    store.dispatch({ type: "set_store", game_state: state })
}

/*
//tester
store.changed.connect((newState, oldState) => {
    logs.debug("fired")
})
*/

