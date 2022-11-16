import { ReplicatedStorage, ServerStorage, Players, Teams } from "@rbxts/services"
import { store } from "shared/store"
import { setPlayerData } from "shared/calc"
import { GameStage, } from "shared/types"

const PlayerModels = ServerStorage.WaitForChild("PlayerModels") as Folder

const seekerTeam = Teams.WaitForChild("Seeker") as Team
const hiderTeam = Teams.WaitForChild("Hider") as Team

const seeker = PlayerModels.WaitForChild("Seeker") as Model
const hider = PlayerModels.WaitForChild("Hider") as Model

export default function preGame() {
    assignTeam(Players.GetPlayers())

    store.dispatch({ type: "set_game_stage", game_stage: GameStage.inGame })
}

function assignTeam(players: Player[]) {

    if (seekerTeam.GetPlayers().size() === 0) {
        const player = players.remove(math.floor(math.random() * players.size())) as Player
        player.Team = seekerTeam

        setCharacter(player, seekerTeam)

    } else players.forEach((player) => {
        player.Team = hiderTeam

        setCharacter(player, hiderTeam)
    })
}

function setCharacter(player: Player, team: Team) {
    const temp = player.Character as Model
    let model = temp

    if (team === seekerTeam) model = seeker
    else model = hider

    model = model.Clone()
    model.Name = player.Name
    player.Character = model
    model.PivotTo(temp.GetPivot())
    temp.Destroy()

    const playerData = setPlayerData(player.UserId, team)
    store.dispatch({ type: "edit_player_data", player_data: playerData })
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