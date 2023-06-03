import { Divider, InputBase, InputLabel, Paper, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
const CustomInputField = (props) => {
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
        if (props?.isSubmitted && props?.required && !props.value) {
            setError(true);
        } else {
            setError(false);
        }
    }, [props.value, props?.isSubmitted])
    return (
        <>
            <InputLabel className='input-label' required={props.required ?? false}>{props.inputlabel}</InputLabel>
            <Paper
                component="form"
                className={`custom-inputField ${error ? 'red-border' : ''}`}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    name={props.name}
                    disabled={props.disabled}
                    type='number'
                />
                {
                    (props.onHeightChange && props.onLengthChange) &&
                    <>
                        <span><CloseIcon className='close-icon' /></span>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder='height'
                            value={props.height}
                            onChange={props.onHeightChange}
                            name={'dimenionsHeight'}
                            type='number'
                        />
                        <span><CloseIcon className='close-icon' /></span>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="length"
                            value={props.length}
                            onChange={props.onLengthChange}
                            name={"dimenionsLength"}
                            type='number'
                        />
                    </>
                }
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <span className='inputField-btn' color="primary">
                    {props.btnText}{props.supText && <sup>{props.supText}</sup>}
                </span>
            </Paper>
            {error && <Typography className='error-msg'>{props?.inputlabel} is required!</Typography>}
        </>
    )
}

export default CustomInputField