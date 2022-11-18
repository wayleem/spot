import { ServerStorage, Workspace, Players } from "@rbxts/services"
import { store } from "shared/store"
import { setPlayerData } from "shared/calc"
import { GameStage, Team } from "shared/types"

const PlayerModels = ServerStorage.WaitForChild("PlayerModels") as Folder

const seeker = PlayerModels.WaitForChild("Seeker") as Model
const hider = PlayerModels.WaitForChild("Hider") as Model

export default function preGame() {
    wait(5)
    //print("start")
    let players = getPlaying(Players.GetPlayers())
    while (players.size() === 0) {
        print("Can't start game with 0 players.")
        wait(5)
        players = getPlaying(Players.GetPlayers())
    }
    print("Game starting")
    assignTeam(players)

    //store.dispatch({ type: "set_game_stage", game_stage: GameStage.inGame })
}

function assignTeam(players: Player[]) {
    const state = store.getState()

    if (state.seekers === 0) {
        const player = players.remove(math.floor(math.random() * (players.size() - 1))) as Player

        setCharacter(player, Team.seeker)
        print("set seeker")

    }
    players.forEach((player) => {
        setCharacter(player, Team.hider)
        print("set hider")
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
}

function getPlaying(players: Player[]) {
    const playing_players = [] as Player[]
    players.forEach((player) => {
        if (player.Character) playing_players.push(player)
    })
    return playing_players
}


/*
function assignTeam(player: Player, team: any) {

    switch (team) {
        case "seeker":
            player.Team = seekerTeam
            setCharacter(player, seeker.Clone()).Parent = seekerFolder
            break

        case "hider":
            player.Team = hiderTeam
            setCharacter(player, hider.Clone()).Parent = hiderFolder
            break
    }
}
Players.PlayerAdded.Connect((player) => {
    Workspace.WaitForChild(player.Name).Parent = intermissionFolder
    player.Team = intermissionTeam
})
teamManager.OnServerEvent.Connect(assignTeam)
*/