import { Workspace, RunService, Players, Teams } from "@rbxts/services"
import seekerView from "./seeker"

const seekerFolder = Workspace.WaitForChild("Seekers") as Folder
const hiderFolder = Workspace.WaitForChild("Hiders") as Folder

let seekers = seekerFolder.GetChildren() as Model[]
let hiders = hiderFolder.GetChildren() as Model[]

const seekerTeam = Teams.WaitForChild("Seeker") as Team
const hiderTeam = Teams.WaitForChild("Hider") as Team

export default function inGame() {
    RunService.Heartbeat.Connect(() => {
        seekers = seekerFolder.GetChildren() as Model[]
        hiders = hiderFolder.GetChildren() as Model[]
        switch (Players.LocalPlayer.Team) {
            case seekerTeam:
                seekerView(seekers, hiders)
                break
        }
    })
}