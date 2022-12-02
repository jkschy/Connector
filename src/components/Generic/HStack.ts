import {AlignmentFlag, Direction, QBoxLayout, QFrame, QWidget} from "@nodegui/nodegui";

class HStack {
    private qFrame = new QFrame()
    private hStack = new QBoxLayout(Direction.LeftToRight);
    private alignment: AlignmentFlag;

    constructor(id?: string, alignment?: AlignmentFlag) {
        this.qFrame.setObjectName(id ? id : "")
        this.alignment = alignment ? alignment : AlignmentFlag.AlignCenter;

        if (this.alignment === AlignmentFlag.AlignCenter || this.alignment === AlignmentFlag.AlignRight) {
            this.hStack.addStretch()
        }
    }

    addChildren(...elements: QWidget[]) {
        elements.forEach((element) => {
            this.hStack.addWidget(element)
        })
        return this;
    }

    withStyles(stylesheet: string) {
        this.qFrame.setStyleSheet(stylesheet);
    }

    getWidget() {
        if (this.alignment === AlignmentFlag.AlignLeft || this.alignment === AlignmentFlag.AlignCenter) {
            this.hStack.addStretch()
        }

        this.qFrame.setLayout(this.hStack)
        return this.qFrame
    }
}

export default HStack