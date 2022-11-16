import { RunService } from "@rbxts/services"
import damage from "./seeker"
import deathRattle from "./hider"

export default function inGame(seekerFolder: Folder, hiderFolder: Folder) {
    let seekers = seekerFolder.GetChildren() as Model[]
    let hiders = hiderFolder.GetChildren() as Model[]

    RunService.Heartbeat.Connect(() => {
        seekers = seekerFolder.GetChildren() as Model[]
        hiders = hiderFolder.GetChildren() as Model[]
        seekers.forEach((seeker) => {
            const seekerRoot = seeker.WaitForChild("HumanoidRootPart") as Part
            damage(seekerRoot, hiders)
        })
    })
    deathRattle(hiders)
}