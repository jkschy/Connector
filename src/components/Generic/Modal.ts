import {QDialog, QLayout} from "@nodegui/nodegui";

class Modal {
    private modal = new QDialog()
    constructor(id: string, layout: QLayout) {
        this.modal.setObjectName(id)
        this.modal.setLayout(layout)
    }

    show() {
        this.modal.show()
    }

    getWidget() {
        return this.modal
    }
}

export default Modal