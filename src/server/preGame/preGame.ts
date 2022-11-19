import { ServerStorage, Workspace, Players } from "@rbxts/services"
import { store } from "shared/store"
import { setPlayerData } from "shared/calc"
import { GameStage, Team, GameState } from "shared/types"
import * as log from "shared/logs"

const PlayerModels = ServerStorage.WaitForChild("PlayerModels") as Folder

const seeker = PlayerModels.WaitForChild("Seeker") as Model
const hider = PlayerModels.WaitForChild("Hider") as Model

export default function preGame() {
    const state = store.getState()
    wait(5)
    let players = getPlaying(Players.GetPlayers())
    while (players.size() === 0) {
        log.warn("Can't start game with 0 players.")
        wait(5)
        players = getPlaying(Players.GetPlayers())
    }
    log.debug("Assigning teams...")
    assignTeam(players, state)

    store.dispatch({ type: "set_game_stage", game_stage: GameStage.inGame })
}

function loading(state: Readonly<GameState>) {
    while (state.timer !== 0) {
        store.dispatch({ type: "decrement_game_time" })
        wait(1)
    }
    store.dispatch({ type: "set_game_stage", game_stage: GameStage.inGame })
}

function assignTeam(players: Player[], state: Readonly<GameState>) {

    if (state.seekers.size() === 0) {
        const player = players.remove(math.floor(math.random() * (players.size() - 1))) as Player

        setCharacter(player, Team.seeker)
    }
    players.forEach((player) => {
        setCharacter(player, Team.hider)
    })
    log.debug("Teams assigned.")
}

function setCharacter(player: Player, team: Team) {
    const temp = player.Character as Model
    let model = temp

    if (team === Team.seeker) model = seeker
    else model = hider

    model = model.Clone()
    model.Name = player.Name
    player.Character = model
    model.Parent = Workspace
    model.PivotTo(temp.GetPivot())
    temp.Destroy()

    const playerData = setPlayerData(player.UserId, team)
    store.dispatch({ type: "edit_player_data", player_data: playerData })
    store.dispatch({ type: "add_playing_player", player: player, team: team })
}

function getPlaying(players: Player[]) {
    const playing_players = [] as Player[]
    players.forEach((player) => {
        if (player.Character) playing_players.push(player)
    })
    return playing_players
}