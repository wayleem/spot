import { RunService } from "@rbxts/services"
import { getDistance, setMaterial } from "shared/calc"
import { store } from "shared/store"
import { GameStage } from "shared/types"
import { damage } from "./seeker"
import { deathRattle } from "./hider"

export default function inGame() {
    const state = store.getState()
    while (state.game_stage === GameStage.inGame) {
        task.spawn(() => damage(state.seekers, state.hiders))
        deathRattle(state.hiders)
    }

}
