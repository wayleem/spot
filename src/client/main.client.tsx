import { makeHello } from "shared/calc"
import { ReplicatedStorage } from "@rbxts/services"
import { store } from "shared/store"
import { GameStage } from "shared/types"
import { Players, StarterGui } from "@rbxts/services"
import Roact from "@rbxts/roact"
import inGame from "./inGame/inGame"
import preGame from "./preGame/preGame"
import DevGui from "./gui/dev"
import TimerGui from "./gui/guiTimer"
import * as logs from "shared/logs"

print(makeHello("main.client.ts"))

const timerEvent = ReplicatedStorage.WaitForChild("timer") as RemoteEvent
const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui")
StarterGui.SetCoreGuiEnabled("PlayerList", false)

function Main() {
    return (
        <screengui>
            <TimerGui></TimerGui>
            <DevGui></DevGui>
        </screengui>
    )
}
Roact.mount(<Main />, PlayerGui, "Main")

timerEvent.OnClientEvent.Connect(() => decrementTimer())

function decrementTimer() {
    store.dispatch({ type: "decrement_game_time" })
}

/*
//tester
store.changed.connect((newState, oldState) => {
    logs.debug("fired")
})
*/

