import { LogService, RunService } from "@rbxts/services"
import { getDistance, setMaterial } from "shared/calc"
import { store } from "shared/store"
import { GameStage } from "shared/types"
import { damage } from "./seeker"
import { deathRattle } from "./hider"
import * as logs from "shared/logs"

export default function inGame() {
    const state = store.getState()
    logs.debug("before loop")
    RunService.Heartbeat.Connect(() => {
        if (state.game_stage === GameStage.inGame) {
            damage(state.seekers, state.hiders)
            deathRattle(state.hiders)
        }
    })
}
