/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import Tooltip from "@reach/tooltip";
import * as colors from "../styles/colors"
import {CircleButton} from "./lib";
import "@reach/tooltip/styles.css"

function ToolTipButton({label, onClick, icon, size}) {


    return (
        <Tooltip label={label} >
            <CircleButton
                css={{
                    backgroundColor: 'white',
                    color: "#679769",
                    width: size,
                    height: size,
                }}
                disabled={false}
                onClick={onClick}
            >
                {icon}
            </CircleButton>
        </Tooltip>
    )
}



function StatusButton({icon, size, label}) {
    return (
        <ToolTipButton label={label ? label : "noted"} onClick={() => {}} highlight={colors.green} icon={icon} size={size} />
    )
}


export {StatusButton, ToolTipButton}