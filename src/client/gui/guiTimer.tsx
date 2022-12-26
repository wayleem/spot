import Roact from "@rbxts/roact"
import { store, State } from "shared/store"
import { Signal } from "@rbxts/rodux"

type Props = {
    text: string
}

type localState = Pick<
    State,
    "time">

export default class TimerGui extends Roact.PureComponent<object, localState> {
    unsubscribe?: Signal

    didMount() {
        this.unsubscribe = store.changed.connect((newState) => {
            this.setState({
                time: newState.time
            })
        })
    }
    willUnmount() {
        if (this.unsubscribe) this.unsubscribe.disconnect()
    }

    render() {
        return (
            <screengui Key="timer">
                <TimerLabel text={"" + this.state.time}></TimerLabel>
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