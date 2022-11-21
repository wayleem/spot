import Roact from "@rbxts/roact"
import { Players } from "@rbxts/services"
import { store, State } from "shared/store"
import * as logs from "shared/logs"
import { Signal } from "@rbxts/rodux"

type Props = {
    text: string
}

type localState = Pick<
    State,
    "timer">

export default class TimerGui extends Roact.PureComponent<object, State> {
    unsubscribe?: Signal

    didMount() {
        this.unsubscribe = store.changed.connect((newState) => {
            this.setState({
                timer: newState.timer
            })
        })
    }
    willUnmount() {
        if (this.unsubscribe) this.unsubscribe.disconnect()
    }

    render() {
        return (
            <screengui Key="timer">
                <TimerLabel text={"" + this.state.timer}></TimerLabel>
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