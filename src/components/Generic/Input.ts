import {CursorShape, QLineEdit, WidgetAttribute, WidgetEventTypes} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../../Utils/FontProvider";
import {DefaultProps} from "../../Utils/Utils";

export interface InputProps extends DefaultProps {
    placeholder?: string,
    font?: Fonts,
    onChange?: (value: string) => void,
    onKeyPress?: (key: string) => void,
}

class Input {
    private qInput = new QLineEdit();

    constructor({id, height, width, font, onChange, placeholder, onKeyPress}: InputProps) {
        this.qInput.setObjectName(id ? id : "")
        this.qInput.setPlaceholderText(placeholder ? placeholder : "")
        this.qInput.setFixedSize(width ? width : 75, height ? height : 50);

        if (font) {
            this.qInput.setFont(FontProvider.getFont(font))
        }

        if (onChange) this.onChange(onChange);

        this.qInput.setAttribute(WidgetAttribute.WA_MacShowFocusRect, false);
        this.qInput.setInlineStyle("border: none;");
        this.qInput.setCursor(CursorShape.IBeamCursor)
    }

    public onChange(callback: (value: string) => void) {
        this.qInput.addEventListener(WidgetEventTypes.KeyRelease, () => callback(this.qInput.text()))
    }

    public onKeyPress(callback: (key: string) => void) {
        this.qInput.addEventListener(WidgetEventTypes.KeyPress, (event) => console.log(event))
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