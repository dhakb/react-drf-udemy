/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import {ModalDismissButton} from "./modal";
import {Button} from "./lib";

function Confirmation({deleteHandler}) {

    return <div css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px"
    }}>
        <div css={{marginTop: "10px"}}>
            <Button onClick={deleteHandler} variant="brown" css={{marginRight: "10px"}}>Delete</Button>
            <ModalDismissButton>
                <Button variant="secondary">Cancel</Button>
            </ModalDismissButton>
        </div>
    </div>
}


export default Confirmation