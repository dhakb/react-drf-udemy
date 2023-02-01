/** @jsx jsx */
/** @jsxRuntime classic */
import {jsx} from '@emotion/core'

import {Link} from '../components/lib'

function NotFoundScreen() {
    return (
        <div
            css={{
                height: '100%',
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div>
                Sorry... No screen to display here. <Link to="/books">Go home</Link>
            </div>
        </div>
    )
}

export {NotFoundScreen}
