import { ListSubheader, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const TransportationMenu = ({ item, index, opt }, props) => {
    const { userId, ...rest } = props;
    if (item.title) {
        return <ListSubheader>
            <img src={opt.icon} alt="icon" />&nbsp;{item.title}
        </ListSubheader>
    }
    else {
        return <MenuItem key={item.name} value={item.name + " " + item.shortForm + " " + opt.icon} disabled={item.disabled} >
            <img className='svg-icon' src={opt.icon} alt="icon" />&nbsp;{item.name}<Typography component={'span'}>&nbsp;{item.shortForm}</Typography>
        </MenuItem>
    }
}

export default TransportationMenu