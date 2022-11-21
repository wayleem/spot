import Roact from "@rbxts/roact"
import { Players } from "@rbxts/services"
import { store, State } from "shared/store"
import { Signal } from "@rbxts/rodux"

type Props = {
    name: string
    text: any
    position: UDim2
    size: UDim2
}

const label_size = new UDim2(0, 160, 0, 40) as UDim2

type localState = Pick<
    State,
    "game_stage">

export default class DevGui extends Roact.PureComponent<object, localState> {
    unsubscribe?: Signal
    team: AttributeValue | undefined

    didMount() {
        this.unsubscribe = store.changed.connect((newState) => {
            this.setState({
                game_stage: newState.game_stage
            })
            this.team = Players.LocalPlayer.GetAttribute("Team")
        })
    }
    willUnmount() {
        if (this.unsubscribe) this.unsubscribe.disconnect()
    }

    render() {
        this.team = Players.LocalPlayer.GetAttribute("Team")
        this.state = store.getState()

        return (
            <screengui Key="dev">
                <frame Position={new UDim2(0.013, 0, 0.409, 0)} Size={new UDim2(0, 160, 0, 160)}>
                    <StatLabel name="Player Team" text={this.team} position={new UDim2(0, 0, 0.065, 0)} size={label_size}></StatLabel>
                    <StatLabel name="Game Stage" text={this.state.game_stage} position={new UDim2(0, 0, 0.677, 0)} size={label_size}></StatLabel>
                </frame>
            </screengui>
        )
    }
}

function StatLabel(props: Props) {
    return (
        <textlabel
            Key={props.name}
            Text={props.text}
            Size={props.size}
            Position={props.position}
        ></textlabel>
    )
}