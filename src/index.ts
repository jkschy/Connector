import {AlignmentFlag, Direction, QBoxLayout, QIcon, QMainWindow, QWidget,} from '@nodegui/nodegui';
import Button from "./components/Generic/Button";
import Input from "./components/Generic/Input";
import HStack from "./components/Generic/HStack";
import VStack from "./components/Generic/VStack";
import Label from "./components/Generic/Label";
import {randomUUID} from "crypto";
import exec from "child_process"
import {Fonts} from "./Utils/FontProvider";
import {RemoteInfo} from "dgram";
import ConnectionDisplay from "./components/ConnectionDisplay";

const Server = require("./Server").default

const res = exec.execSync("ipconfig getifaddr en0").toString().trim();

const server = new Server(res)
await server.start(true);

let connectionAddress = "";
let connectionPort = -1;

server.onMessage((msg: string, rinfo: RemoteInfo) => {
    if (connectionAddress !== rinfo.address) {
        connectionAddress = rinfo.address
        connectionPort = rinfo.port
        connectionInput.value = `${connectionAddress}:${connectionPort}`
        connected.foundConnection();
        sendButton.enable()
    }
   addMessage(msg, false)
})

server.onConnectionSuccess(() => {
    sendButton.enable();
    connected.foundConnection()
})

const win = new QMainWindow();
win.setWindowTitle("Connector - " + server.serverPort());
win.setWindowIcon(new QIcon("assets/Logo.png"))

const centralWidget = new QWidget();
centralWidget.setObjectName("root");

const rootLayout = new QBoxLayout(Direction.TopToBottom);
centralWidget.setLayout(rootLayout);

const sendMessage = () => {
    server.sendMessage(messageInput.value, connectionPort, connectionAddress)
    addMessage(messageInput.value, true)
    messageInput.value = ""
}

const messageInput = new Input({id:"MessageInput", height: 32, width: 350, font: Fonts.Message, placeholder: "Message", onKeyPress: (key) => {
    if (key === "Enter") {
        sendMessage()
    }
}})

const sendButton = new Button({id: "sendMessageButton", buttonText: "⏎", disabled: true, font: Fonts.SendButton});
sendButton.onClick(sendMessage)

const messageArea = new VStack()
messageArea.getWidget().setMinimumHeight(600)

const connectionInput = new Input({id: "connectionInput", placeholder: "Connection Address", font: Fonts.Message, width: 300});
connectionInput.onChange((value) => {
    connected.lostConnection();
    connectionAddress = value.substring(0, value.indexOf(":"))
    connectionPort = parseInt(value.substring(value.indexOf(":") + 1, value.length + 1));
    if (connectionAddress && connectionPort && connectionPort.toString().length === 4) {
        server.sendConnectionRequest(connectionAddress, connectionPort);
    }
})

const connected = new ConnectionDisplay();
const config = new Button({id: "config", buttonText: "⚙︎", font: Fonts.Icon})

const topStack = new HStack("topStack")
topStack.addChildren(connected.getWidget(), connectionInput.getWidget(), config.getWidget());

const addressLabel = new Label({id: "ip", text: `${res}:${server.serverPort()}`, font: Fonts.Title});
const address = new HStack("ip-address").addChildren(addressLabel.getWidget())

const addMessage = (message: string, self: boolean) => {
    const messageLabel = new Label({id: randomUUID(), text:message, font:Fonts.Message}).align(self ? AlignmentFlag.AlignRight | AlignmentFlag.AlignBottom : AlignmentFlag.AlignLeft | AlignmentFlag.AlignBottom);
    messageArea.addChildren(messageLabel.getWidget())
}

const actionArea = new HStack("ActionArea", AlignmentFlag.AlignJustify)
actionArea.addChildren(messageInput.getWidget(), sendButton.getWidget())

rootLayout.addWidget(topStack.getWidget())
rootLayout.addWidget(address.getWidget())
rootLayout.addWidget(messageArea.getWidget())
rootLayout.addWidget(actionArea.getWidget())
win.setStyleSheet(`
#root {
    background-color: black;
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

#connectionInput {
    background-color: white;
    color: black;
    border: none;
    background-color: #f0f0f0;
    border-radius: 15px;
    padding: 5px;
}

#config {
    background-color: transparent;
    border: none;
    margin-left: 25px;
    height: 50%;
    padding: -5px 5px 1px 5px;
    border-radius: 5px;
    color: white !important;
}

#config:hover {
    background-color: #ababab;
    color: black;
}

#ip-address {
    width: 100%;
}

#addConnection {
    background-color: #404040;
    padding: 5px;
    border-radius: 15px;
}`);
win.setCentralWidget(centralWidget);
win.show();

(global as any).win = win;
