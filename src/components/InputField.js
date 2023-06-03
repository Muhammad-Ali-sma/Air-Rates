import { InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'

const InputField = (props) => {
  const [error, setError] = React.useState(false);
  React.useEffect(() => {
    console.log(props.label + " " + props.value)
    if (props?.isSubmitted && props?.required && !props.value) {
      setError(true);
    } else {
      setError(false);
    }
  }, [props.value, props?.isSubmitted])
  return (
    <>
      <InputLabel className='input-label' required={props.required ?? true}>{props.inputlabel}</InputLabel>
      <TextField
        error={error}
        placeholder={props.placeholder}
        fullWidth
        type={props.type ?? 'text'}
        value={props.value ?? ""}
        onChange={props.onChange}
        mb={-1}
        name={props.name ?? ""}
        {...props}
      />
      {error && <Typography className='error-msg'>{props?.errorMsgLabel} is required!</Typography>}
    </>
  )
}

export default InputField