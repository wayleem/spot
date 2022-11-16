//Game
import { getDistance, setVisible } from "shared/calc"
//Workspace

export default function seekerView(seekers: Model[], hiders: Model[]) {
    seekers.forEach((seeker) => {
        const seekerRoot = seeker.WaitForChild("HumanoidRootPart") as Part
        renderHiders(seekerRoot, hiders)
    })
}

function renderHiders(seekerRoot: Part, hiders: Model[]) {
    hiders.forEach((hider) => {
        const hiderRoot = hider.WaitForChild("HumanoidRootPart") as Part
        if (getDistance(seekerRoot, hiderRoot) <= 25) {
            setVisible(hider, true)
        } else setVisible(hider, false)
    })
}
