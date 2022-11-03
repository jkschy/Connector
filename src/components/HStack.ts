import {Direction, QBoxLayout, QFrame, QWidget} from "@nodegui/nodegui";

class HStack {
    private qFrame = new QFrame()
    private hStack = new QBoxLayout(Direction.LeftToRight);
    constructor(id?: string) {
        this.qFrame.setObjectName(id ? id : "")
    }

    addChildren(...elements: QWidget[]) {
        elements.forEach((element) => {
            this.hStack.addWidget(element)
        })
    }

    getWidget() {
        this.qFrame.setLayout(this.hStack)
        return this.qFrame
    }
}

export default HStack