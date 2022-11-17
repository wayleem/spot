import Roact from "@rbxts/roact"
import { Players } from "@rbxts/services"
import { store, State } from "shared/store"

type Props = {
    name: string
    text: any
    position: UDim2
    size: UDim2
}

const label_size = new UDim2(0, 160, 0, 40) as UDim2

export default class DevGui extends Roact.PureComponent<object, State> {
    constructor(o: object) {
        super(o)
    }

    render() {
        const state = store.getState()

        const player = Players.LocalPlayer

        return (
            <screengui Key="dev">
                <frame Position={new UDim2(0.013, 0, 0.409, 0)} Size={new UDim2(0, 160, 0, 160)}>
                    <StatLabel name="Player Team" text={player.GetAttribute("Team")} position={new UDim2(0, 0, 0.065, 0)} size={label_size}></StatLabel>
                    <StatLabel name="Game Stage" text={state.game_stage} position={new UDim2(0, 0, 0.677, 0)} size={label_size}></StatLabel>
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