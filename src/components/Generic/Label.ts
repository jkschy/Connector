import {AlignmentFlag, QFont, QLabel} from "@nodegui/nodegui";
import FontProvider, {Fonts} from "../../Utils/FontProvider";
import {DefaultProps} from "../../Utils/Utils";

interface LabelProps extends DefaultProps{
    text: string,
    font?: Fonts,
}

class Label {
    private qLabel: QLabel = new QLabel()

    constructor(props: LabelProps) {
        this.qLabel.setObjectName(props.id ? props.id : "")
        this.qLabel.setText(props.text);
        this.qLabel.setFont(FontProvider.getFont(props.font ? props.font : Fonts.Subtitle))
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