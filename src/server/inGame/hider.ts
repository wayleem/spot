import { setMaterial } from "shared/calc"

export function deathRattle(hiders: Player[]) {
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