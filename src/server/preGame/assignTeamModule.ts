import { Workspace, ServerStorage } from "@rbxts/services"
import { store } from "shared/store"
import { setPlayerData } from "shared/calc"
import { Team, GameState } from "shared/types"
import * as log from "shared/logs"

const PlayerModels = ServerStorage.WaitForChild("PlayerModels") as Folder
const seeker = PlayerModels.WaitForChild("Seeker") as Model
const hider = PlayerModels.WaitForChild("Hider") as Model

export default function assignTeam(players: Player[], state: Readonly<GameState>) {

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