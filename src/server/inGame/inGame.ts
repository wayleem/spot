import { RunService } from "@rbxts/services"
import { getDistance, setMaterial } from "shared/calc"
//import damage from "./seeker"
//import deathRattle from "./hider"

export default function inGame() {
    const hiders = [] as Player[]
    const seekers = [] as Player[]

}


function damage(seekers: Player[], hiders: Player[]) {
    RunService.Heartbeat.Connect(() => {
        seekers.forEach((seeker) => {
            const character = seeker.Character as Model
            const seekerRoot = character.WaitForChild("HumanoidRootPart") as Part
            hiders.forEach((hider) => {
                const character = hider.Character as Model
                const hiderRoot = character.WaitForChild("HumanoidRootPart") as Part
                if (getDistance(seekerRoot, hiderRoot) <= 25) {
                    const Humanoid = hider.WaitForChild("Humanoid") as Humanoid
                    Humanoid.TakeDamage(1)
                }
            })
        })
    })

}

function deathRattle(hiders: Player[]) {
    hiders.forEach((hider) => {
        const Humanoid = hider.WaitForChild("Humanoid") as Humanoid
        Humanoid.Died.Connect(() => {
            const character = hider.Character as Model
            const HumanoidRootPart = character.WaitForChild("HumanoidRootPart") as Part
            const corpse = hider.Clone()
            HumanoidRootPart.Anchored = true
            setMaterial(character)
            print("died")
            //corpse.Parent = hider.Parent
            //hider.PivotTo(hider.GetPivot())
        })
    })
}