import {AlignmentFlag, Direction, QBoxLayout, QMainWindow, QWidget,} from '@nodegui/nodegui';
import {root} from "postcss";
import Button from "./components/Generic/Button";
import Input from "./components/Generic/Input";
import HStack from "./components/Generic/HStack";
import VStack from "./components/Generic/VStack";
import Label from "./components/Generic/Label";
import {randomUUID} from "crypto";
import exec from "child_process"
import {Fonts} from "./Utils/FontProvider";
import {RemoteInfo} from "dgram";
import ConnectionDialog from "./components/ConnectionDialog";

const Server = require("./Server").default
new Server().start();

const res = exec.execSync("ipconfig getifaddr en0").toString().trim();

const server = new Server(res)
await server.start(true);

let connectionAddress = "";
let connectionPort = -1;

server.onMessage((msg: string, rinfo: RemoteInfo) => {
    if (connectionAddress !== rinfo.address) {
        connectionAddress = rinfo.address
        connectionPort = rinfo.port
        sendButton.enable()
    }
   addMessage(msg, false)
})

const win = new QMainWindow();
win.setWindowTitle("Connector - " + server.serverPort());

const centralWidget = new QWidget();
centralWidget.setObjectName("root");

const rootLayout = new QBoxLayout(Direction.TopToBottom);
centralWidget.setLayout(rootLayout);

const messageInput = new Input("MessageInput", "Message", 32, Fonts.Input)

const sendButton = new Button("sendMessageButton", "⏎", true, Fonts.SendButton);
sendButton.onClick(() => {
    server.sendMessage(messageInput.value, connectionPort, connectionAddress)
    addMessage(messageInput.value, true)
    messageInput.value = ""
})

sendButton.tooltip("Send Message!")

const connectionDialog = ConnectionDialog(`${server.serverIp()}:${server.serverPort()}`, (value) => {
    connectionAddress = value.substring(0, value.indexOf(":"))
    connectionPort = parseInt(value.substring(value.indexOf(":") + 1, value.length));
    sendButton.enable()
})

const addConnectionButton = new Button("addConnection", "🔗", false, undefined);
addConnectionButton.onClick(() => {
    connectionDialog.show()
})

addConnectionButton.tooltip("Add Connection!")


const topStack = new HStack("topStack", AlignmentFlag.AlignRight)
topStack.addChildren(addConnectionButton.getWidget())

const messageArea = new VStack()
messageArea.getWidget().setMinimumHeight(400)

const addMessage = (message: string, self: boolean) => {
    messageArea.addChildren(new Label(randomUUID(), message, Fonts.Message).align(self ? AlignmentFlag.AlignRight | AlignmentFlag.AlignBottom : AlignmentFlag.AlignLeft | AlignmentFlag.AlignBottom).getWidget())
}

const actionArea = new HStack("ActionArea", AlignmentFlag.AlignJustify)
actionArea.addChildren(messageInput.getWidget(), sendButton.getWidget())

rootLayout.addWidget(topStack.getWidget())
rootLayout.addWidget(messageArea.getWidget())
rootLayout.addWidget(actionArea.getWidget())
win.setStyleSheet(`
#root {
    background-color: #000;
}

#MessageInput {
    display: flex;
    width: 300px;
    background-color: transparent;
}

#ActionArea {
    border: 1px solid #6b6b6b;
    border-radius: 20px;
    padding: 0;
}

#sendMessageButton {
    background-color: rgb(0, 122, 255);
    padding: 8px 10px;
    border-radius: 15px
}

#addConnection {
    background-color: #404040;
    padding: 5px;
    border-radius: 15px;
}`);
win.setCentralWidget(centralWidget);

win.show();

(global as any).win = win;
