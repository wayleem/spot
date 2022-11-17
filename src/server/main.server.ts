import { makeHello, setPlayerData } from "shared/calc";
import { Players } from "@rbxts/services"
import preGame from "./preGame/preGame"
import inGame from "./inGame/inGame"
import { store } from "shared/store";
import { GameStage, Team } from "shared/types";

const players = Players.GetPlayers() as Player[]

print(makeHello("main.server.ts"));

function playerJoinHandler() {
    Players.PlayerAdded.Connect((player) => {
        const playerData = setPlayerData(player.UserId, Team.intermission)

        store.dispatch({ type: "add_player_data", player_data: playerData })
    })
}

playerJoinHandler()

store.changed.connect((newState, oldState) => {
    //run pregame if gamestage is pre
    if (newState.game_stage === GameStage.preGame)
        preGame()
    //run ingame if gamestage is ingame
    if (newState.game_stage === GameStage.inGame)
        inGame()
})
