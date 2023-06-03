import { Fade, Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Popover = (props) => {
    return (
        <Tooltip
            title={props.title}
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            placement="top"
        >
            <Box component={'span'}>
                {props.children}
            </Box>
        </Tooltip>
    )
}

export default Popover