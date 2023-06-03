import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { InputLabel, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

const Calendar = (props) => {
    const [error, setError] = React.useState(false);
    React.useEffect(() => {
         if (props?.isSubmitted && props?.required && !props.value) {
            setError(true);
        } else {
            setError(false);
        }
    }, [props.value, props?.isSubmitted])
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} error={error}>
            <InputLabel className='input-label' required>{props.label}</InputLabel>
            <DatePicker
                className={`date-picker ${error ? 'red-border' : ''}`}
                value={props.value}
                onChange={(e) => {
                    let item = {
                        target: {
                            name: props.name,
                            value: e?.format('MM-DD-YYYY')
                        }
                    }
                    props.onChange(item);
                }}
                name={props.name}
                minDate={moment()}
                disablePast={true}
            />
            {error && <Typography className='error-msg'>{props?.errorMsgLabel} is required!</Typography>}
        </LocalizationProvider>
    )
}

export default Calendar