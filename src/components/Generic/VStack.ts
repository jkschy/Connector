import {Direction, QBoxLayout, QFrame, QWidget} from "@nodegui/nodegui";

class VStack {
    private qFrame = new QFrame()
    private vStack = new QBoxLayout(Direction.TopToBottom);

    constructor(id?: string, ...elements: QWidget[]) {
        this.qFrame.setObjectName(id ? id : "")
        this.vStack.addStretch();

        if (elements) {
            elements.forEach((element) => {
                this.vStack.addWidget(element);
            })
        }
    }

    addChildren(...elements: QWidget[]) {
        elements.forEach((element) => {
            this.vStack.addWidget(element)
        })
        return this
    }

    getLayout() {
        return this.vStack
    }


    getWidget() {
        this.vStack.addStretch()
        this.qFrame.setLayout(this.vStack)
        return this.qFrame
    }
}

export default VStack