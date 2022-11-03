import {QPushButton} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../Utils/FontProvider";

class Button{

    private qButton = new QPushButton();

    constructor(id: string, buttonText: string, onClick: () => void) {
        this.qButton.setObjectName(id)
        this.qButton.setText(buttonText)
        this.qButton.setFont(FontProvider.getFont(Fonts.Button))
        this.qButton.addEventListener("clicked", () => onClick())
    }

    getWidget() {
        return this.qButton
    }
}

export default Button