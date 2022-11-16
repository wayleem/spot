import { setMaterial } from "shared/calc"

export default function deathRattle(hiders: Model[]) {
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