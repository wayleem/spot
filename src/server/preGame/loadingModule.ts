import { ReplicatedStorage, Players } from "@rbxts/services"
import { store } from "shared/store"
import { GameState } from "shared/types"
import * as log from "shared/logs"

const timerEvent = ReplicatedStorage.WaitForChild("timer") as RemoteEvent

export default function loading(state: Readonly<GameState>) {
    while (state.timer !== 0) {
        store.dispatch({ type: "decrement_game_time" })
        timerEvent.FireAllClients(state)
        wait(1)
    }
    store.dispatch({ type: "set_game_time", timer: 30 })
    timerEvent.FireAllClients(state)

    const players = getPlaying(Players.GetPlayers())

    if (players.size() === 0) {
        log.warn("0 players.")
        loading(state)

    } else return players
}

function getPlaying(players: Player[]) {
    const playing_players = [] as Player[]
    players.forEach((player) => {
        if (player.Character) playing_players.push(player)
    })
    return playing_players
}