import {ModalDismissButton} from "./modal";
import {Button} from "./lib";

function Confirmation({deleteHandler}) {

    return <div css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
    }}>
        <Button onClick={deleteHandler}>Delete</Button>
        <ModalDismissButton>
            <Button variant="secondary">Cancel</Button>
        </ModalDismissButton>
    </div>
}


export default Confirmation