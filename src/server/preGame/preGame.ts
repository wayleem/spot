import { ReplicatedStorage, ServerStorage, Workspace, Players, Teams } from "@rbxts/services"
import { store } from "shared/store"
import { actions } from "shared/actions"
import { GameStage } from "shared/types"

const teamManager = ReplicatedStorage.WaitForChild("teamManager") as RemoteEvent

const PlayerModels = ServerStorage.WaitForChild("PlayerModels") as Folder

const seekerTeam = Teams.WaitForChild("Seeker") as Team
const hiderTeam = Teams.WaitForChild("Hider") as Team
const intermissionTeam = Teams.WaitForChild("Intermission") as Team

const seeker = PlayerModels.WaitForChild("Seeker") as Model
const hider = PlayerModels.WaitForChild("Hider") as Model

export default function preGame(seekerFolder: Folder, hiderFolder: Folder, intermissionFolder: Folder) {
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

    return [seekerFolder, hiderFolder, intermissionFolder]
}

function setCharacter(player: Player, model: Model) {
    const temp = player.Character as Model

    model = model.Clone()
    model.Name = player.Name
    player.Character = model
    model.Parent = Workspace
    model.PivotTo(temp.GetPivot())
    temp.Destroy()

    return model
}
/*
function assignTeam(players: Player[]) {
    if (seekerTeam.GetPlayers().size() === 0) {
        const player = players.remove(math.floor(math.random() * players.size())) as Player
        player.Team = seekerTeam
        setCharacter(player, seeker)

    } else players.forEach((player) => {
        player.Team = hiderTeam
        setCharacter(player, hider)
    })
}
*/

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