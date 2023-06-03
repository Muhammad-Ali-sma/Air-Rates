import { Chip } from '@mui/material'
import React from 'react'

const CustomChip = (props) => {
  return (
    <Chip sx={{ minWidth: { md: 'auto', xs: "185px" } }} className={`custom-chip ${props.className}`} onClick={props.onClick} name={props.name} avatar={props.avatar} label={props.label} variant={props.variant ?? 'standard'} />
  )
}

export default CustomChip