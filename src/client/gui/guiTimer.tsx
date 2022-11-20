import Roact from "@rbxts/roact"
import { Players } from "@rbxts/services"
import { store, State } from "shared/store"

type Props = {
    text: string
}

export default class TimerGui extends Roact.PureComponent<object, State> {
    constructor(o: object) {
        super(o)
    }

    render() {
        const state = store.getState()

        return (
            <screengui Key="timer">
                <TimerLabel text={"" + state.timer}></TimerLabel>
            </screengui>
        )
    }
}

function TimerLabel(props: Props) {
    return (
        <textlabel
            Key="timer"
            Text={props.text}
            Size={new UDim2(0, 200, 0, 50)}
            Position={new UDim2(0.456, 0, 0.025, 0)}
        ></textlabel>
    )
}