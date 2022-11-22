import { getDistance } from "shared/calc"

export function damage(seekers: Player[], hiders: Player[]) {
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
}