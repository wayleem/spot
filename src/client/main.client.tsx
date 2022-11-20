import { makeHello } from "shared/calc"
import { store } from "shared/store"
import { GameStage } from "shared/types"
import { Players, StarterGui } from "@rbxts/services"
import Roact from "@rbxts/roact"
import inGame from "./inGame/inGame"
import preGame from "./preGame/preGame"
import DevGui from "./gui/dev"
import TimerGui from "./gui/guiTimer"

print(makeHello("main.client.ts"))
StarterGui.SetCoreGuiEnabled("PlayerList", false)

function Main() {
    return (
        <screengui>
            <TimerGui></TimerGui>
            <DevGui></DevGui>
        </screengui>
    )
}
Roact.mount(<Main />, Players.LocalPlayer.WaitForChild("PlayerGui"), "Main")

/*
preGame()

inGame()

store.changed.connect((newState, oldState) => {
    if (newState.game_stage !== oldState.game_stage) {
        //run pregame if gamestage is pre
        if (newState.game_stage === GameStage.preGame)
            preGame()
        //run ingame if gamestage is ingame
        if (newState.game_stage === GameStage.inGame)
            inGame()
    }
})
*/