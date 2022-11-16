import { ReplicatedStorage } from "@rbxts/services"
import Roact from "@rbxts/roact"

const teamManager = ReplicatedStorage.WaitForChild("teamManager") as RemoteEvent


type State = {
    visible: boolean
}

type Props = {
    team: "seeker" | "hider" | "intermission"
    position: UDim2
    visible: boolean
    click: (t: Props["team"]) => void
}

export default class SelectTeam extends Roact.PureComponent<object, State> {
    constructor(o: object) {
        super(o)
        this.state = {
            visible: true
        }
    }
    changeTeam(team: Props['team']) {
        this.setState({ visible: false })
        teamManager.FireServer(team)
    }
    render() {
        return (
            <screengui Key="SelectTeam">
                <Select click={() => this.changeTeam("seeker")} visible={this.state.visible} team="seeker" position={new UDim2(0.444, 0, 0.363, 0)}></Select>
                <Select click={() => this.changeTeam("hider")} visible={this.state.visible} team="hider" position={new UDim2(0.518, 0, 0.363, 0)}></Select>
            </screengui>)
    }
}

function Select(props: Props) {
    return (
        <textbutton
            Event={{ Activated: () => props.click(props.team) }}
            Key={props.team}
            Text={props.team}
            Size={new UDim2(0, 50, 0, 50)}
            Position={props.position}
            Visible={props.visible}
        ></textbutton>
    )
}