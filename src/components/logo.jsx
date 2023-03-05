import {Fragment} from "react";


function Logo({width, height}) {
    return (
        <Fragment>
            <img src="/bookshelf_logo_2.png" alt="logo" css={{
                width: `${width}px`,
                height: `${height}px`,
            }}/>
        </Fragment>
    );
}

export default Logo;