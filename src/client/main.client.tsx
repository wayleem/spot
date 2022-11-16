import { makeHello } from "shared/calc"
import { Players } from "@rbxts/services"
import Roact from "@rbxts/roact"
import inGame from "./inGame/inGame"
import preGame from "./preGame/preGame"
import DevGui from "./gui/dev"
import SelectTeam from "./gui/guiSelectTeam"

print(makeHello("main.client.ts"))

function Main() {
    return (
        <screengui>
            <SelectTeam></SelectTeam>
            <DevGui></DevGui>
        </screengui>
    )
}
print(Players.LocalPlayer.Character)
Players.LocalPlayer.CharacterAdded.Connect(() => {
    print(Players.LocalPlayer.Character)
    Roact.mount(<Main />, Players.LocalPlayer.WaitForChild("PlayerGui"), "Main")
})

preGame()

inGame()