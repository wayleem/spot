import { RunService, Teams, Workspace } from "@rbxts/services"
import { getDistance, setMaterial } from "shared/calc"
//import damage from "./seeker"
//import deathRattle from "./hider"

export default function inGame() {
    const seekerTeam = Teams.WaitForChild("Seeker") as Team
    const hiderTeam = Teams.WaitForChild("Hider") as Team

    const seekers = seekerTeam.GetPlayers()
    const hiders = hiderTeam.GetPlayers()

    const hiderFolder = Workspace.WaitForChild("Hiders") as Folder
    const seekerFolder = Workspace.WaitForChild("Seekers") as Folder

    RunService.Heartbeat.Connect(() => {
        seekers.forEach((seeker) => {
            const character = seeker.Character as Model
            const seekerRoot = character.WaitForChild("HumanoidRootPart") as Part


            damage(seekerRoot, hiders)
        })
    })
    //deathRattle(hiders)
}

function damage(seekerRoot: Part, hiders: Player[]) {
    RunService.Heartbeat.Connect(() => {
        hiders.forEach((hider) => {
            const character = hider.Character as Model
            const hiderRoot = character.WaitForChild("HumanoidRootPart") as Part
            if (getDistance(seekerRoot, hiderRoot) <= 25) {
                const Humanoid = hider.WaitForChild("Humanoid") as Humanoid
                Humanoid.TakeDamage(1)
            }
        })
    })

}

function deathRattle(hiders: Model[]) {
    hiders.forEach((hider) => {
        const Humanoid = hider.WaitForChild("Humanoid") as Humanoid
        Humanoid.Died.Connect(() => {
            const HumanoidRootPart = hider.WaitForChild("HumanoidRootPart") as Part
            const corpse = hider.Clone()
            HumanoidRootPart.Anchored = true
            setMaterial(hider)
            print("died")
            //corpse.Parent = hider.Parent
            //hider.PivotTo(hider.GetPivot())
        })
    })
}