import { makeHello, setPlayerData } from "shared/calc";
import { Players, Teams } from "@rbxts/services"
import preGame from "./preGame/preGame"
import inGame from "./inGame/inGame"
import { store } from "shared/store";
import { GameStage } from "shared/types";



const intermissionTeam = Teams.WaitForChild("Intermission") as Team

print(makeHello("main.server.ts"));

playerJoinHandler(intermissionTeam)

store.changed.connect((newState, oldState) => {
    if (newState.game_stage === GameStage.preGame)
        preGame()
    if (newState.game_stage === GameStage.inGame)
        inGame()
})

function playerJoinHandler(team: Team) {
    Players.PlayerAdded.Connect((player) => {
        const playerData = setPlayerData(player.UserId, team)
        store.dispatch({ type: "add_player_data", player_data: playerData })
    })
}
