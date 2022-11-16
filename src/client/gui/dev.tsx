import Roact from "@rbxts/roact"
import { store } from "shared/store"
import { State } from "shared/types"

//const folder = character.Parent as Folder

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
        this.state = store.getState()

    }

    render() {
        return (
            <screengui Key="dev">
                <frame Position={new UDim2(0.013, 0, 0.409, 0)} Size={new UDim2(0, 160, 0, 160)}>
                    <StatLabel name="Player Team" text={this.state} position={new UDim2(0, 0, 0.065, 0)} size={label_size}></StatLabel>
                    <StatLabel name="Character Folder" text={this.state} position={new UDim2(0, 0, 0.370, 0)} size={label_size}></StatLabel>
                    <StatLabel name="Game Stage" text={this.state} position={new UDim2(0, 0, 0.677, 0)} size={label_size}></StatLabel>
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