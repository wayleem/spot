import { LogService, RunService, Players } from "@rbxts/services"
import { getDistance, setMaterial } from "shared/calc"
import { store } from "shared/store"
import { GameStage, Team, PlayerData } from "shared/types"
import * as logs from "shared/logs"
import seekerView from "./seeker"

export default function inGame() {
    const state = store.getState()
    RunService.Heartbeat.Connect(() => {
        if (state.game_stage === GameStage.inGame) {
            const allPlayers = state.players as PlayerData[]
            const seekers = state.seekers as Model[]
            const hiders = state.hiders as Model[]
            switch (checkTeam(Players.LocalPlayer.UserId, allPlayers)) {
                case Team.seeker:
                    seekerView(seekers, hiders)
                    break
            }
        }
    })
}

function getTeam(userid: number, allPlayers: PlayerData[]) {
    function isPlaying(player: PlayerData) {
        if (player.user_id === userid) return true
        else return false
    }
    const index = allPlayers.findIndex(isPlaying)
    return allPlayers[index].player_team
}