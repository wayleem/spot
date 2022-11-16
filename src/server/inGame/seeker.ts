import { getDistance } from "shared/calc"

export default function damage(seekerRoot: Part, hiders: Model[]) {
    hiders.forEach(function (hider) {
        const hiderRoot = hider.WaitForChild("HumanoidRootPart") as Part
        if (getDistance(seekerRoot, hiderRoot) <= 25) {
            const Humanoid = hider.WaitForChild("Humanoid") as Humanoid
            Humanoid.TakeDamage(1)
        }
    })
}