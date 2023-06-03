import { Grid, Typography } from '@mui/material'
import React from 'react'
import CustomButton from './CustomButton'
import CustomInputField from './CustomInputField'
import InputField from './InputField'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ByUnits = (props) => {

    const handleOnAddBtnClick = () => {
        let item = {
            target: {
                name: "dimensions",
                value: [
                    ...props.dimensions,
                    {
                        height: 0,
                        width: 0,
                        length: 0,
                        quantity: 0,
                        grossWeight: 0,
                        id: props.dimensions[props.dimensions.length - 1].id + 1
                    }
                ]
            }
        }
        props.onChange(item);
    }
    return (
        <>
            {props.dimensions?.map((x, i) =>
                <Dimensions
                    index={i}
                    item={x}
                    dimensions={props.dimensions}
                    onChange={props.onChange}
                    metricState={props.metricState}
                    key={`dimension_${i}`}
                />
            )}
            <Grid container mt={0} spacing={3}>
                <Grid item xs={1}>
                    <CustomButton
                        variant="text"
                        title="Add"
                        icon={<AddIcon />}
                        className="add-dimension-btn"
                        onClick={handleOnAddBtnClick}
                    />
                </Grid>
                <Grid item md={9} xs={11}>
                    <Typography component={'p'} className="dimensions-total"><b>Shipment total:</b> {props.dimensions.reduce((prev, next) => prev += (parseInt(next.quantity || 0) * parseInt(next.length || 0) * parseInt(next.height || 0) * parseInt(next.width || 0)), 0)} {props.metricState === "Imperial (US)" ? "ft" : "m"}<sup>3</sup> {props.dimensions.reduce((prev, next) => prev += parseInt(next.grossWeight || 0), 0)} {props.metricState === "Imperial (US)" ? "lbs" : "mt"}</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ByUnits

export const Dimensions = ({ index, item, dimensions, onChange, metricState }) => {
    const handleOnDeleteBtnClick = () => {
        let temp = {
            target: {
                name: "dimensions",
                value: dimensions.filter(x => x.id !== item.id)
            }
        }
        onChange(temp);
    }
    return (
        <Grid container mt={0}>
            <Grid item md={10} sm={11} xs={12}>
                <Grid container mt={0} spacing={3}>
                    <Grid item md={6} xs={12}>
                        <CustomInputField
                            btnText={metricState === "Imperial (US)" ? "ft" : "m"}
                            placeholder="width"
                            name="dimenionsWidth"
                            onChange={(e) => {
                                let newDimensions = dimensions;
                                newDimensions[index].width = e.target.value;
                                let temp = {
                                    target: {
                                        name: "dimensions",
                                        value: newDimensions
                                    }
                                }
                                onChange(temp);
                            }}
                            value={dimensions[index].width}
                            onHeightChange={(e) => {
                                let newDimensions = dimensions;
                                newDimensions[index].height = e.target.value
                                let temp = {
                                    target: {
                                        name: "dimensions",
                                        value: newDimensions
                                    }
                                }
                                onChange(temp);
                            }}
                            onLengthChange={(e) => {
                                let newDimensions = dimensions;
                                newDimensions[index].length = e.target.value
                                let temp = {
                                    target: {
                                        name: "dimensions",
                                        value: newDimensions
                                    }
                                }
                                onChange(temp);
                            }}
                            height={dimensions[index].height}
                            length={dimensions[index].length}
                            inputlabel="DIMENSIONS"
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <InputField
                            type={'number'}
                            inputlabel="QUANTITY"
                            placeholder="Quantity"
                            name="quantity"
                            required={false}
                            value={dimensions[index].quantity}
                            onChange={(e) => {
                                let newDimensions = dimensions;
                                newDimensions[index].quantity = e.target.value;
                                let temp = {
                                    target: {
                                        name: "dimensions",
                                        value: newDimensions
                                    }
                                }
                                onChange(temp);
                            }}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <CustomInputField
                            btnText={metricState === "Imperial (US)" ? "lbs" : "mt"}
                            placeholder="Gross weight"
                            name="grossWeight"
                            onChange={(e) => {
                                let newDimensions = dimensions;
                                newDimensions[index].grossWeight = e.target.value
                                let temp = {
                                    target: {
                                        name: "dimensions",
                                        value: newDimensions
                                    }
                                }
                                onChange(temp);
                            }}
                            value={dimensions[index].grossWeight}
                            inputlabel="GROSS WEIGHT"
                        />
                    </Grid>
                </Grid>
            </Grid>
            {dimensions.length > 1 &&
                <Grid item sm={1} xs={12} className='delete-dimension-btn-container'>
                    <CustomButton
                        icon={<DeleteIcon />}
                        className="delete-dimension-btn"
                        onClick={handleOnDeleteBtnClick}
                    />
                </Grid>
            }
        </Grid>

    )
}