import {AlignmentFlag, QLabel} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../../Utils/FontProvider";

class Label {
    private qLabel: QLabel = new QLabel()

    constructor(id: string, text: string, font?: Fonts) {
        this.qLabel.setObjectName(id)
        this.qLabel.setText(text);
        this.qLabel.setFont(FontProvider.getFont(font ? font : Fonts.Subtitle))
        this.qLabel.setFixedHeight(20);
    }


    align(alignment: AlignmentFlag) {
        this.qLabel.setAlignment(alignment)
        return this;
    }

    getWidget() {
        return this.qLabel
    }
}

export default Label