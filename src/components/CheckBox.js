import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const CheckBox = (props) => {
    if (props.label) {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        value={props.checked ?? false}
                        onChange={(e) => {
                            let item = {
                                target: {
                                    name: props.name,
                                    value: e.target.checked
                                }
                            }
                            props.onChange(item);
                        }}
                        name={props.name}
                    />
                }
                label={props.label}
            />
        )
    } else {
        return (
            <Checkbox
            size='small'
                checked={props.checked ?? false}
                onChange={(e) => {
                    let item = {
                        target: {
                            name: props.name,
                            value: e.target.checked
                        }
                    }
                    props.onChange(item);
                }}
                name={props.name}
            />
        )
    }
}

export default CheckBox;