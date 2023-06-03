import { Button } from '@mui/material'
import React from 'react'

const CustomButton = (props) => {
    return (
        <>
            <Button
                fullWidth
                onClick={props.onClick}
                variant={props.variant ?? "contained"}
                className={props.className ?? ""}
            >
                {props.icon ?? null}   {props.title ?? null}
            </Button>
        </>
    )
}

export default CustomButton