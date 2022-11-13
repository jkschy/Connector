import VStack from "./Generic/VStack";
import Label from "./Generic/Label";
import Input from "./Generic/Input";
import Modal from "./Generic/Modal";

const connectionDialog = (serverAddress: string, onChange: (value: string) => void) => {
    return new Modal("connectionModal",
                new VStack("modal-content",
                    new Label("myIp", `Your address: ${serverAddress}`).getWidget(),
                    new Label("modal-title", "Enter address to connect to: ").getWidget(),
                    new Input("connection", "connection address", 20, undefined, onChange).getWidget(),
                ).getLayout())
}

export default connectionDialog