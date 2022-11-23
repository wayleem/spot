import { getDistance } from "shared/calc"
import * as logs from "shared/logs"

export function damage(seekers: Model[], hiders: Model[]) {
    seekers.forEach((seeker) => {
        const seekerRoot = seeker.WaitForChild("HumanoidRootPart") as Part
        hiders.forEach((hider) => {
            const hiderRoot = hider.WaitForChild("HumanoidRootPart") as Part
            if (getDistance(seekerRoot, hiderRoot) <= 25) {
                const Humanoid = hider.WaitForChild("Humanoid") as Humanoid
                Humanoid.TakeDamage(1)
            }
        })
    })
}