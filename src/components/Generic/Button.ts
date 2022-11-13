import {CursorShape, QPushButton} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../../Utils/FontProvider";

class Button{

    private qButton = new QPushButton();


    constructor(id: string, buttonText: string, disabled: boolean, font?: Fonts) {
        this.qButton.setObjectName(id)
        this.qButton.setDisabled(disabled)
        this.qButton.setText(buttonText)
        this.qButton.setFont(FontProvider.getFont(font ? font : Fonts.Button))

        this.qButton.setCursor(CursorShape.PointingHandCursor);
    }

    onClick(callback: () => void) {
        this.qButton.addEventListener("clicked", callback);
    }

    setSize(width: number, height: number) {
       this.qButton.setFixedSize(width, height)
        return this
    }

    disable() {
        this.qButton.setDisabled(true);
    }

    tooltip(tooltip: string) {
        this.qButton.setToolTip(tooltip);
    }

    enable() {
        this.qButton.setDisabled(false);
    }

    getWidget() {
        return this.qButton
    }
}

export default Button