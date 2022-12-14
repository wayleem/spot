import { makeHello, setPlayerData } from "shared/calc";
import { LogService, Players } from "@rbxts/services"
import preGame from "./preGame/preGame"
import inGame from "./inGame/inGame"
import { store } from "shared/store";
import { GameStage, Team } from "shared/types";
import * as logs from "shared/logs"

const players = Players.GetPlayers() as Player[]

print(makeHello("main.server.ts"));

function playerJoinHandler() {
    Players.PlayerAdded.Connect((player) => {
        const playerData = setPlayerData(player.UserId, Team.intermission)
        print("player data added")
        store.dispatch({ type: "add_player_data", player_data: playerData })
    })
}

function playerLeaveHandler() {
    Players.PlayerRemoving.Connect((player) => {

    })
}

playerLeaveHandler()
playerJoinHandler()


//first cycle
preGame()

store.changed.connect((newState, oldState) => {

    //run pregame if gamestage is pre
    if (newState.game_stage === GameStage.preGame) {
        logs.debug("transitioning to pregame...")
        preGame()
    }
    //run ingame if gamestage is ingame
    if (newState.game_stage === GameStage.inGame) {
        logs.debug("transitioning to ingame...")
        inGame()
    }

})
