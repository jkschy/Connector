import VStack from "./Generic/VStack";

class ConnectionDisplay {
    stack: VStack


    constructor() {
        this.stack = new VStack("displayButton");
        this.stack.getWidget().setStyleSheet(this.getCss(false))
    }

    private getCss(foundConnection: boolean) {
        return ` 
         #displayButton {
         background-color: ${foundConnection ? 'green' : 'red'};
         border-radius:12px;
         max-width:25px;
         max-height:25px;
         min-width:25px;
         min-height:25px;}
        `
    }

    foundConnection() {
        this.stack.getWidget().setStyleSheet(this.getCss(true));
    }

    lostConnection() {
        this.stack.getWidget().setStyleSheet(this.getCss(false))
    }

    getWidget() {
        return this.stack.getWidget()
    }
}

export default ConnectionDisplay