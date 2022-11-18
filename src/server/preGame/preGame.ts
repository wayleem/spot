import { ServerStorage, Workspace, Players } from "@rbxts/services"
import { store } from "shared/store"
import { setPlayerData } from "shared/calc"
import { GameStage, Team } from "shared/types"

const PlayerModels = ServerStorage.WaitForChild("PlayerModels") as Folder

const seeker = PlayerModels.WaitForChild("Seeker") as Model
const hider = PlayerModels.WaitForChild("Hider") as Model

export default function preGame() {
    wait(5)
    let players = getPlaying(Players.GetPlayers())
    while (players.size() === 0) {
        print("Can't start game with 0 players.")
        wait(5)
        players = getPlaying(Players.GetPlayers())
    }
    print("Game starting")
    assignTeam(players)

    store.dispatch({ type: "set_game_stage", game_stage: GameStage.inGame })
}

function assignTeam(players: Player[]) {
    const state = store.getState()

    if (state.seekers.size() === 0) {
        const player = players.remove(math.floor(math.random() * (players.size() - 1))) as Player

        setCharacter(player, Team.seeker)
    }
    players.forEach((player) => {
        setCharacter(player, Team.hider)
    })
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

    print("set character")
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