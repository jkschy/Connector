import {QTextEdit, WidgetEventTypes} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../Utils/FontProvider";

class Input {
    private qInput = new QTextEdit();

    constructor(id: string, placeholder?: string, height?: number, onKeyPress?: (value: string) => void) {
        this.qInput.setObjectName(id)
        this.qInput.setPlaceholderText(placeholder ? placeholder : "")
        this.qInput.setFixedHeight(height ? height : 50)
        this.qInput.setFont(FontProvider.getFont(Fonts.Subtitle))

        if (onKeyPress) {
            this.qInput.addEventListener(WidgetEventTypes.KeyRelease,
                () => onKeyPress(this.qInput.toPlainText()))
        }
    }

    public get value() {
        return this.qInput.toPlainText();
    }

    public set value(value: string) {
        this.qInput.setPlainText(value)
    }

    public getWidget() {
        return this.qInput
    }
}

export default Input