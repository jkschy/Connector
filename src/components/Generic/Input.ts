import {CursorShape, QLineEdit, WidgetAttribute, WidgetEventTypes} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../../Utils/FontProvider";

class Input {
    private qInput = new QLineEdit();

    constructor(id: string, placeholder?: string, height?: number, font?: Fonts, onKeyPress?: (value: string) => void) {
        this.qInput.setObjectName(id)
        this.qInput.setPlaceholderText(placeholder ? placeholder : "")
        this.qInput.setFixedHeight(height ? height : 50)
        if (font) {
            this.qInput.setFont(FontProvider.getFont(font))
        }

        if (onKeyPress) {
            this.qInput.addEventListener(WidgetEventTypes.KeyPress,
                (event) => onKeyPress(this.qInput.text()))
        }

        this.qInput.setAttribute(WidgetAttribute.WA_MacShowFocusRect, false);
        this.qInput.setInlineStyle("border: none;");
        this.qInput.setCursor(CursorShape.IBeamCursor)
    }

    public get value() {
        return this.qInput.text();
    }

    public set value(value: string) {
        this.qInput.setText(value)
    }

    public getWidget() {
        return this.qInput
    }
}

export default Input