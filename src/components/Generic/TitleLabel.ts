import {QLabel} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../../Utils/FontProvider";

class TitleLabel {
    private qLabel: QLabel = new QLabel()

    constructor(id: string, text: string) {
        this.qLabel.setObjectName(id)
        this.qLabel.setText(text);
        this.qLabel.setFont(FontProvider.getFont(Fonts.Title))
    }

    getWidget() {
        return this.qLabel
    }
}

export default TitleLabel