import {CursorShape, QPushButton} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../../Utils/FontProvider";
import {DefaultProps} from "../../Utils/Utils";

export interface ButtonProps extends DefaultProps {
    buttonText: string,
    disabled?: boolean,
    font?: Fonts,
}

class Button{

    private qButton = new QPushButton();


    constructor({id, disabled, font, height, width, buttonText}: ButtonProps) {
        this.qButton.setObjectName(id ? id : "")
        this.qButton.setDisabled(disabled ? disabled : false)
        this.qButton.setText(buttonText)
        this.qButton.setFont(FontProvider.getFont(font ? font : Fonts.Button))

        if (width) {
            this.qButton.setFixedWidth(width);
        }

        if (height) {
            this.qButton.setFixedHeight(height);
        }

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