import { makeHello, setPlayerData } from "shared/calc";
import { Players, Teams } from "@rbxts/services"
import preGame from "./preGame/preGame"
import inGame from "./inGame/inGame"
import { store } from "shared/store";
import { GameStage } from "shared/types";

const players = Players.GetPlayers() as Player[]
const intermissionTeam = Teams.WaitForChild("Intermission") as Team

print(makeHello("main.server.ts"));

function playerJoinHandler(team: Team) {
    Players.PlayerAdded.Connect((player) => {
        print("fired")
        const playerData = setPlayerData(player.UserId, team)
        store.dispatch({ type: "add_player_data", player_data: playerData })
    })
}

playerJoinHandler(intermissionTeam)

store.changed.connect((newState, oldState) => {
    newState.players.forEach((state_player) => {
        players.forEach((server_player) => {
            if (state_player.user_id === server_player.UserId) { server_player.Team = state_player.player_team; print("changed") }

        })
    })
    if (newState.game_stage === GameStage.preGame)
        preGame()
    if (newState.game_stage === GameStage.inGame)
        inGame()
})
