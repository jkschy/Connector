import {AlignmentFlag, Direction, QBoxLayout, QMainWindow, QWidget,} from '@nodegui/nodegui';
import StylesheetLoader from "./StylesheetLoader";
import {root} from "postcss";
import Button from "./components/Button";
import Input from "./components/Input";
import TitleLabel from "./components/TitleLabel";
import HStack from "./components/HStack";
import VStack from "./components/VStack";
import Label from "./components/Label";
import {randomUUID} from "crypto";

const Server = require("./Server").default
const server = new Server(5000, "0.0.0.0")
server.start()

server.onMessage((msg: string) => {
   addMessage(msg, false)
})


const win = new QMainWindow();
win.setWindowTitle("Connector - " + server.serverPort());

const centralWidget = new QWidget();
centralWidget.setObjectName("root");

const MainStyleSheet = new StylesheetLoader("src/stylesheet.css");

const rootLayout = new QBoxLayout(Direction.TopToBottom);
centralWidget.setLayout(rootLayout);

const titleLabel = new TitleLabel("mainTitle", "Welcome to Connect Messenger");

const messageArea = new VStack()
messageArea.getWidget().setMinimumHeight(200)

const addMessage = (message: string, self: boolean) => {
    messageArea.addChildren(new Label(randomUUID(), message).align(self ? AlignmentFlag.AlignRight : AlignmentFlag.AlignLeft).getWidget())
}




const messageInput = new Input("MessageInput", "Message", 40)

const sendButton = new Button("sendMessageButton", "⏎", () => {
    server.sendMessage(messageInput.value, 5001, "0.0.0.0")
    addMessage(messageInput.value, true)
    messageInput.value = ""
})

const actionArea = new HStack("ActionArea")
actionArea.addChildren(messageInput.getWidget(), sendButton.getWidget())


rootLayout.addWidget(titleLabel.getWidget())
rootLayout.addWidget(messageArea.getWidget())
rootLayout.addWidget(actionArea.getWidget())
win.setCentralWidget(centralWidget);
win.setStyleSheet(MainStyleSheet.toString());

win.show();

(global as any).win = win;
