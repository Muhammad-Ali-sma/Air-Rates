import { Container, Typography, Grid, MenuItem, Select, TextField, Autocomplete, InputLabel, Paper, ToggleButton, ToggleButtonGroup, styled, ListSubheader, Box, Alert, AlertTitle, InputBase, Divider } from '@mui/material';
import React from 'react';
import { CONTAINER_TYPE, IMO_CLASS, SHIPPING_TYPE, TRANSPORTATION_DATA, TRUCK_TYPE, WAGON_TYPE } from './data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InputField from './components/InputField';
import LocationAutoComplete from './components/LocationAutoComplete';
import Calendar from './components/Calendar';
import { formReducer } from './utils/Globalfunction';
import CustomChip from './components/CustomChip';
import Popover from './components/Popover';
import CheckBox from './components/CheckBox';
import CustomButton from './components/CustomButton';
import SelectDropDown from './components/SelectDropDown';
import CustomInputField from './components/CustomInputField';
import { BoatIcon, PlaneIcon, RoadIcon, RocketIcon, TruckIcon, WagonIcon } from './components/Icons';
import ByUnits from './components/ByUnits';
import DialogBox from './components/DialogBox';
import { getHSCodes, ShipmentQuote } from './Services/CommonService';
import SnackAlert from './components/SnackAlert';


const Form = () => {

    const [formData, setFormData] = React.useReducer(formReducer, {});
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [show, setShow] = React.useState('');
    const [type, setType] = React.useState('');
    const [data, setData] = React.useState([]);
    const [msg, setMsg] = React.useState('');


    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
            margin: theme.spacing(0.5),
            border: 0,
            width: '100%',
            '&:not(:first-of-type)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-of-type': {
                borderRadius: '6px',
            },
        },
    }));
    const handleDeliveryWay = (event) => {
        if (event.target.value) {
            let items = [
                {
                    target: {
                        name: "serviceType",
                        value: event.target.value === "1" ? "Full container load FCL" : null
                    }
                },
                {
                    target: {
                        name: "optIcon",
                        value: null
                    }
                }
            ]
            items.map(x => setFormData(x));
            clearFormData();
            setFormData(event);
        }
    };
    const handleCargoType = (cargoType) => {
        let temp = { ...formData['product'], type: cargoType, details: {} }
        if (cargoType === "perishable") {
            temp.details = {
                Scale: 'C'
            };
        }
        if (formData['product']?.type === cargoType) {
            temp.type = null;
            temp.details = {};
        }
        let items = [{
            target: {
                name: "product",
                value: temp
            }
        }, {
            target: {
                name: "cargoStatus",
                value: cargoType
            }
        }]
        items.map(x => setFormData(x));
    }
    const handleAssociatedServices = (type) => {
        if (formData?.associatedServices !== undefined) {
            if (formData?.associatedServices?.filter(x => x?.serviceId === type)?.length > 0) {
                let temp = {
                    target: {
                        name: "associatedServices",
                        value: formData["associatedServices"]?.filter(x => x.serviceId !== type)
                    }
                }
                setFormData(temp);
            } else {
                let item = {
                    target: {
                        name: "associatedServices",
                        value: [...formData?.associatedServices, { serviceId: type, details: type === 'Insurance' ? { InvoiceAmount: "" } : {} }]
                    }
                }
                setFormData(item);
            }
        } else {
            let item = {
                target: {
                    name: "associatedServices",
                    value: [{ serviceId: type, details: type === 'Insurance' ? { InvoiceAmount: "" } : {} }]
                }
            }
            setFormData(item);
        }
    }
    const getIcon = (name, className) => {
        if (name === "boat") {
            return <BoatIcon active={"1"} className={className ?? ""} />
        }
        if (name === "truck") {
            return <TruckIcon className={className ?? ""} />
        }
        if (name === "wagon") {
            return <WagonIcon className={className ?? ""} />
        }
        if (name === "plane") {
            return <PlaneIcon active={"3"} className={className ?? ""} />
        }
    }
    const handleOnOptClick = (optIcon) => {
        let item = {
            target: {
                name: "optIcon",
                value: optIcon
            }
        }
        setFormData(item);
    }
    const handleOnByUnitsClick = (e) => {
        let item = [
            {
                target: {
                    name: "weight",
                    value: null
                }
            },
            {
                target: {
                    name: "volume",
                    value: null
                }
            },
            {
                target: {
                    name: "commodities",
                    value: [
                        {
                            height: 0,
                            width: 0,
                            length: 0,
                            quantity: 0,
                            grossWeight: 0,
                            description: "",
                            units: "",
                            internalIdentifier: "",
                            id: 1
                        }
                    ]
                }
            }
        ]
        item.map(x => setFormData(x));
        setFormData(e);
    }
    const handleTransportationType = (e) => {
        setFormData(e);
        clearFormData();
    }
    const clearFormData = () => {
        let items = [

            {
                target: {
                    name: "customer",
                    value: ''
                }
            },
            {
                target: {
                    name: "customerReferenceNumber",
                    value: ''
                }
            },
            {
                target: {
                    name: "incoterm",
                    value: ''
                }
            },
            {
                target: {
                    name: "cargoStatus",
                    value: ''
                }
            },
            {
                target: {
                    name: "byUnits",
                    value: false
                }
            },
            {
                target: {
                    name: "shipType",
                    value: ""
                }
            },
            {
                target: {
                    name: "grossWeight",
                    value: ""
                }
            },
            {
                target: {
                    name: "loadingRate",
                    value: ""
                }
            },
            {
                target: {
                    name: "dischargingRate",
                    value: ""
                }
            },
            {
                target: {
                    name: "mainCarrier",
                    value: ""
                }
            },
            {
                target: {
                    name: "qty",
                    value: ""
                }
            },
            {
                target: {
                    name: "truckType",
                    value: ""
                }
            },
            {
                target: {
                    name: "qtyOfTrucks",
                    value: ""
                }
            },
            {
                target: {
                    name: "wagonType",
                    value: ""
                }
            },
            {
                target: {
                    name: "qtyOfWagons",
                    value: ""
                }
            },
            {
                target: {
                    name: "weight",
                    value: ""
                }
            },
            {
                target: {
                    name: "volume",
                    value: ""
                }
            },
            {
                target: {
                    name: "commodities",
                    value: [
                        {
                            height: 0,
                            width: 0,
                            length: 0,
                            quantity: 0,
                            grossWeight: 0,
                            id: 1,
                            description: "",
                            units: "",
                            internalIdentifier: "",
                        }
                    ]
                }
            }

        ];
        items.map(x => setFormData(x));
    }

    const handleOnSubmit = () => {
        setIsSubmitted(true);
        ShipmentQuote(formData['modality'] === 'sea' ? 'ocean' : formData['modality'], formData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    React.useEffect(() => {
        getHSCodes(null, 0, setIsLoaded, setData);
        let items = [
            {
                target: {
                    name: "cargoStatus",
                    value: ''
                }
            },
            {
                target: {
                    name: "modality",
                    value: 'sea'
                }
            },
            {
                target: {
                    name: "serviceType",
                    value: 'Full container load FCL'
                }
            },
            {
                target: {
                    name: "optIcon",
                    value: 'boat'
                }
            },
            {
                target: {
                    name: "customer",
                    value: 'sdfsdf'
                }
            },
            {
                target: {
                    name: "customerReferenceNumber",
                    value: ''
                }
            },
            {
                target: {
                    name: "incoterm",
                    value: ''
                }
            },
            {
                target: {
                    name: "productDto",
                    value: {
                        description: "",
                        hsCode: "",
                        type: "",
                        details: {}
                    }
                }
            },
            {
                target: {
                    name: "commodities",
                    value: [
                        {
                            height: 0,
                            width: 0,
                            length: 0,
                            quantity: 0,
                            grossWeight: 0,
                            id: 1,
                            description: "",
                            units: "",
                            internalIdentifier: "",
                        }
                    ]
                }
            }
        ]
        items.map(x => setFormData(x));
    }, [])
    React.useEffect(() => {
        if (isSubmitted && !formData['productDto']?.details?.temperature) {
            setError(true);
        } else {
            setError(false);
        }
    }, [formData['productDto']?.details?.temperature, isSubmitted])
    console.log('first', formData)
    return (
        <Container>
            <Box className='layout'>
                <Grid container>
                    <Grid item md={10} sm={9} xs={12}>
                        <Box className='heading-wrapper'>
                            <Typography variant='h4'>Request a quote</Typography>
                            <img src="./ebook.svg" alt="ebook" />
                        </Box>
                        <Typography className='headline' mt={2}>And get the best rates from the leading logistics providers.</Typography>
                    </Grid>
                    <Grid item md={2} sm={3} xs={12}>
                        <SelectDropDown
                            icon={(props) => <KeyboardArrowDownIcon {...props} />}
                            value={formData['metricState'] ?? "International (SI)"}
                            className='metric-select'
                            name="metricState"
                            onChange={setFormData}
                            data={["International (SI)", "Imperial (US)"]}
                        />
                    </Grid>
                </Grid>
                <Typography variant='h6' mt={2} mb={3}>Cargo details</Typography>
                <Grid container>
                    <Grid item md={9} xs={12}>
                        <Box className="flex-box" mb={1}>
                            <InputLabel className='input-label' required>PRODUCT</InputLabel>
                            <Typography sx={{ float: 'right', cursor: 'pointer' }} onClick={() => setModal(true)}>HS Codes</Typography>
                        </Box>
                        <Autocomplete
                            freeSolo
                            fullWidth
                            options={data}
                            autoHighlight
                            className='img-select'
                            value={formData['productDto'] || { description: "" }}
                            onChange={(e, option) => {
                                if (!option) {
                                    getHSCodes(null, 0, setIsLoaded, setData);
                                    let temp = {
                                        hsCode: null,
                                        description: "",
                                        type: null,
                                        details: {}
                                    }
                                    setFormData({ target: { name: "productDto", value: temp } });
                                } else {
                                    let temp = {
                                        ...formData['productDto'],
                                        hsCode: option?.code ?? null,
                                        description: option?.description
                                    }
                                    setFormData({ target: { name: "productDto", value: temp } });
                                }
                            }}
                            getOptionLabel={(option) => option.description}
                            renderOption={(props, option) => (
                                <Box className="flex-box" component="li"  {...props}>
                                    <div style={{ display: "flex", alignItems: "center", flex: 1 }} >
                                        <span className={`commodity-icons ${option?.class}`} />
                                        {option.description}
                                    </div>
                                    <div className='hs-code'>{option.code}</div>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    error={(isSubmitted && !formData['productDto']?.description) ? true : false}
                                    {...params}
                                    placeholder="Enter commodity type or HS code"
                                />
                            )}
                        />
                        {isSubmitted && !formData['productDto']?.description && <Typography className='error-msg'>Product field is required!</Typography>}
                    </Grid>
                    {formData['productDto']?.description &&
                        <Grid item md={9} xs={12} mt={3}>
                            <CustomChip className={formData['productDto']?.type === "hazardous" ? "active-chip" : ""} onClick={() => handleCargoType("hazardous")} avatar={<div className={`commodity-icons _25`} />} label="Hazardous cargo" />
                            <CustomChip className={formData['productDto']?.type === "perishable" ? "active-chip" : ""} onClick={() => handleCargoType("perishable")} avatar={<div className={`commodity-icons _26`} />} label="Perishable cargo" />
                            <CustomChip className={formData['productDto']?.type === "oversized" ? "active-chip" : ""} onClick={() => handleCargoType("oversized")} avatar={<div className={`commodity-icons _27`} />} label="Oversized cargo" />
                            <CustomChip className={formData['productDto']?.type === "liquid" ? "active-chip" : ""} onClick={() => handleCargoType("liquid")} avatar={<div className={`commodity-icons _28`} />} label="Liquid cargo" />
                        </Grid>
                    }
                </Grid>
                {(formData['productDto']?.type === "hazardous" && formData['productDto']?.description) &&
                    <Grid container mt={2} spacing={2}>
                        <Grid item md={5} sm={6} xs={12}>
                            <SelectDropDown
                                required={true}
                                errorMsgLabel="Imo class"
                                isSubmitted={isSubmitted}
                                icon={(props) => <KeyboardArrowDownIcon {...props} />}
                                value={formData['productDto']?.details?.imo_class ?? ""}
                                onChange={(e) => {
                                    let temp = {
                                        ...formData['productDto'],
                                        details: { ...formData['productDto']?.details, imo_class: e.target.value }
                                    }
                                    setFormData({ target: { name: "productDto", value: temp } });
                                }}
                                placeholder="Imo class"
                                label="IMO CLASS"
                                data={IMO_CLASS}
                            />
                        </Grid>
                        <Grid item md={5} sm={6} xs={12}>
                            <InputField
                                required={true}
                                errorMsgLabel="Un number"
                                isSubmitted={isSubmitted}
                                inputlabel="UN NUMBER"
                                placeholder="0"
                                value={formData['productDto']?.details?.un_number ?? ""}
                                onChange={(e) => {
                                    let temp = {
                                        ...formData['productDto'],
                                        details: { ...formData['productDto']?.details, un_number: e.target.value }
                                    }
                                    setFormData({ target: { name: "productDto", value: temp } });
                                }}
                            />
                        </Grid>
                    </Grid>
                }
                {(formData['productDto']?.type === "oversized" && formData['productDto']?.description) &&
                    <Grid container mt={0} spacing={3}>
                        <Grid item md={2.5} sm={4} xs={12}>
                            <CustomInputField
                                btnText={formData['metricState'] === "Imperial (US)" ? "ft" : "m"}
                                placeholder="0"
                                onChange={(e) => {
                                    let temp = {
                                        ...formData['productDto'],
                                        details: { ...formData['productDto']?.details, length: e.target.value }
                                    }
                                    setFormData({ target: { name: "productDto", value: temp } });
                                }}
                                value={formData['productDto']?.details?.length ?? ""}
                                inputlabel="Length"
                                required={true}
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                        <Grid item md={2.5} sm={4} xs={12}>
                            <CustomInputField
                                btnText={formData['metricState'] === "Imperial (US)" ? "ft" : "m"}
                                placeholder="0"
                                onChange={(e) => {
                                    let temp = {
                                        ...formData['productDto'],
                                        details: { ...formData['productDto']?.details, width: e.target.value }
                                    }
                                    setFormData({ target: { name: "productDto", value: temp } });
                                }}
                                value={formData['productDto']?.details?.width ?? ""}
                                inputlabel="Width"
                                required={true}
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                        <Grid item md={2.5} sm={4} xs={12}>
                            <CustomInputField
                                btnText={formData['metricState'] === "Imperial (US)" ? "ft" : "m"}
                                placeholder="0"
                                onChange={(e) => {
                                    let temp = {
                                        ...formData['productDto'],
                                        details: { ...formData['productDto']?.details, height: e.target.value }
                                    }
                                    setFormData({ target: { name: "productDto", value: temp } });
                                }}
                                value={formData['productDto']?.details?.height ?? ""}
                                inputlabel="Height"
                                required={true}
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                    </Grid>
                }
                {(formData['productDto']?.type === "perishable" && formData['productDto']?.description) &&
                    <Grid container mt={3}>
                        <Grid item md={5} sm={6} xs={12}>
                            <InputLabel className='input-label'>TEMPERATURE REGIME</InputLabel>
                            <Paper
                                component="form"
                                className={`custom-inputField custom-select ${error ? 'red-border' : ''}`}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 2 }}
                                    placeholder="0"
                                    onChange={(e) => {
                                        let temp = {
                                            ...formData['productDto'],
                                            details: { ...formData['productDto']?.details, temperature: e.target.value }
                                        }
                                        setFormData({ target: { name: "productDto", value: temp } });
                                    }}
                                    value={formData['productDto']?.details?.temperature ?? ""}
                                />
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <TextField
                                    onChange={(e) => {
                                        let temp = {
                                            ...formData['productDto'],
                                            details: { ...formData['productDto']?.details, Scale: e.target.value }
                                        }
                                        setFormData({ target: { name: "productDto", value: temp } });
                                    }}
                                    value={formData['productDto']?.details?.Scale ?? ""}
                                    sx={{ ml: 1, flex: 1 }}
                                    id="select"
                                    select
                                >
                                    <MenuItem value="C"><sup>o</sup>C</MenuItem>
                                    <MenuItem value="F"><sup>o</sup>F</MenuItem>
                                </TextField>
                            </Paper>
                            {error && <Typography className='error-msg'>Temperature is required!</Typography>}
                        </Grid>
                    </Grid>
                }
                <Typography variant='h6' mt={7} mb={3}>Delivery</Typography>
                <Grid container>
                    <Grid item md={3} sm={6} xs={12}>
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                mr: { sm: 1, xs: 0 },
                                mb: { sm: 0, xs: 1 }
                            }}
                        >
                            <StyledToggleButtonGroup
                                size="small"
                                sx={{ width: '100%' }}
                                value={formData['modality']}
                                exclusive
                                onChange={handleDeliveryWay}
                            >
                                <ToggleButton name="modality" className='selected-sea' value={'sea'}>
                                    <BoatIcon active={formData['modality'] === "sea"} />&nbsp;SEA
                                </ToggleButton>
                                <ToggleButton name="modality" className='selected-land' value={'land'}>
                                    <RoadIcon active={formData['modality'] === "land"} />&nbsp;LAND
                                </ToggleButton>
                                <ToggleButton name="modality" className='selected-air' value={'air'}>
                                    <PlaneIcon active={formData['modality'] === "air"} />&nbsp;AIR
                                </ToggleButton>
                            </StyledToggleButtonGroup>
                        </Paper>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <StyledToggleButtonGroup
                            size="small"
                            value={formData['modality']}
                            exclusive
                            onChange={handleDeliveryWay}
                        >
                            <ToggleButton name="modality" className='selected-auto' value={"auto"}>
                                <RocketIcon active={formData['modality'] === "auto"} />&nbsp;AUTO
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </Grid>
                </Grid>
                {formData['modality'] === 'auto' ?
                    <Grid container mt={1} spacing={3}>
                        <Grid item md={5} xs={12}>
                            <CustomInputField
                                btnText={formData['metricState'] === "Imperial (US)" ? "lbs" : "mt"}
                                placeholder="Weight"
                                name="weight"
                                onChange={setFormData}
                                value={formData['weight']}
                                inputlabel="Weight"
                                required={true}
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                        <Grid item md={5} xs={12}>
                            <CustomInputField
                                supText="3"
                                btnText={formData['metricState'] === "Imperial (US)" ? "ft" : "m"}
                                placeholder="Volume"
                                name="volume"
                                onChange={setFormData}
                                value={formData['volume']}
                                inputlabel="Volume"
                                required={true}
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                    </Grid>
                    :
                    <Grid container mt={0} spacing={3}>
                        <Grid item md={5} xs={12}>
                            <InputLabel className='input-label' required>TRANSPORTATION BY</InputLabel>
                            <Select
                                fullWidth
                                displayEmpty
                                IconComponent={(props) => <KeyboardArrowDownIcon {...props} />}
                                value={formData["serviceType"] ?? ""}
                                name="serviceType"
                                onChange={(e) => handleTransportationType(e)}
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <Typography>Select type</Typography>;
                                    } else {
                                        return <Typography>{getIcon(formData['optIcon'])}&nbsp;&nbsp;&nbsp;{selected.split('/')[0]}</Typography>
                                    }
                                }}
                            >
                                {TRANSPORTATION_DATA[formData['modality']]?.options?.map((opt) => {
                                    return opt.suboptions.map(item => (
                                        item.title ?
                                            <ListSubheader>
                                                {getIcon(opt.icon)}&nbsp;{item.title}
                                            </ListSubheader>
                                            :
                                            <MenuItem onClick={() => handleOnOptClick(opt.icon)} key={item.name} value={`${item.name}${item.shortForm ? " " + item.shortForm : ""}`} disabled={item.disabled} >
                                                &nbsp;&nbsp;&nbsp;{getIcon(opt.icon, "svg-icon")}{item.name}<Typography component={'span'}>&nbsp;{item.shortForm}</Typography>
                                            </MenuItem>
                                    ))
                                })}
                            </Select>
                        </Grid>
                    </Grid>
                }
                {(formData["serviceType"] === "Full container load FCL" || formData["serviceType"] === "ULD container") &&
                    <Grid container mt={0} spacing={3}>
                        <Grid item md={5} sm={6} xs={12}>
                            <SelectDropDown
                                label="Container type"
                                icon={(props) => <KeyboardArrowDownIcon {...props} />}
                                value={formData['mainCarrier'] ?? ""}
                                name="mainCarrier"
                                onChange={setFormData}
                                placeholder="Container type"
                                data={CONTAINER_TYPE}
                                required={true}
                                errorMsgLabel="Container type"
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                        <Grid item md={5} sm={6} xs={12}>
                            <InputField
                                type={'number'}
                                inputlabel="QUANTITY OF CONTAINERS"
                                placeholder="0"
                                name="qty"
                                errorMsgLabel="Quantity"
                                value={formData['qty']}
                                onChange={setFormData}
                                required={true}
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                    </Grid>
                }
                {(formData["serviceType"] === "Less container load LCL" || formData["serviceType"] === "Less truck load LTL" || formData["serviceType"] === "Standard cargo") &&
                    <>
                        <Grid container mt={1}>
                            <Grid item xs={12}>
                                <CheckBox
                                    label="By units"
                                    name="byUnits"
                                    checked={formData["byUnits"]}
                                    onChange={handleOnByUnitsClick}
                                />
                            </Grid>
                        </Grid>
                        {formData["byUnits"] === true ?
                            <ByUnits
                                onChange={setFormData}
                                dimensions={formData['commodities']}
                                metricState={formData['metricState']}
                            />
                            :
                            <Grid container mt={0} spacing={3}>
                                <Grid item md={5} sm={6} xs={12}>
                                    <CustomInputField
                                        btnText={formData['metricState'] === "Imperial (US)" ? "lbs" : "mt"}
                                        placeholder="Weight"
                                        name="weight"
                                        onChange={setFormData}
                                        value={formData['weight']}
                                        inputlabel="Weight"
                                        required={true}
                                        isSubmitted={isSubmitted}
                                    />
                                </Grid>
                                <Grid item md={5} sm={6} xs={12}>
                                    <CustomInputField
                                        supText="3"
                                        btnText={formData['metricState'] === "Imperial (US)" ? "ft" : "m"}
                                        placeholder="Volume"
                                        name="volume"
                                        onChange={setFormData}
                                        value={formData['volume']}
                                        inputlabel="Volume"
                                        required={true}
                                        isSubmitted={isSubmitted}
                                    />
                                </Grid>
                            </Grid>
                        }
                    </>
                }
                {formData["serviceType"] === "Bulk" &&
                    <>
                        <Grid container mt={0} spacing={3}>
                            <Grid item md={5} sm={6} xs={12}>
                                <SelectDropDown
                                    label="SHIP TYPE"
                                    icon={(props) => <KeyboardArrowDownIcon {...props} />}
                                    value={formData['shipType'] ?? ""}
                                    name="shipType"
                                    onChange={setFormData}
                                    placeholder="Shippping type"
                                    data={SHIPPING_TYPE}
                                    required={true}
                                    isSubmitted={isSubmitted}
                                    errorMsgLabel="Transportation type"
                                />
                            </Grid>
                            <Grid item md={5} sm={6} xs={12}>
                                <CustomInputField
                                    btnText={formData['metricState'] === "Imperial (US)" ? "lbs" : "mt"}
                                    name="grossWeight"
                                    onChange={setFormData}
                                    value={formData["grossWeight"]}
                                    inputlabel="Gross Weight"
                                    required={true}
                                    isSubmitted={isSubmitted}
                                />
                            </Grid>
                        </Grid>
                        <Grid container mt={0} spacing={3}>
                            <Grid item md={5} sm={6} xs={12}>
                                <CustomInputField
                                    btnText={formData['metricState'] === "Imperial (US)" ? "lbs/day" : "mt/day"}
                                    name="loadingRate"
                                    onChange={setFormData}
                                    value={formData["loadingRate"]}
                                    inputlabel="LOADING RATE"
                                />
                            </Grid>
                            <Grid item md={5} sm={6} xs={12}>
                                <CustomInputField
                                    btnText={formData['metricState'] === "Imperial (US)" ? "lbs/day" : "mt/day"}
                                    name="dischargingRate"
                                    onChange={setFormData}
                                    value={formData["dischargingRate"]}
                                    inputlabel="DISCHARGING RATE"
                                    required={true}
                                />
                            </Grid>
                        </Grid>
                    </>
                }
                {formData["serviceType"] === "Full truck load FTL" &&
                    <Grid container mt={0} spacing={3}>
                        <Grid item md={5} sm={6} xs={12}>
                            <SelectDropDown
                                label="TRUCK TYPE"
                                icon={(props) => <KeyboardArrowDownIcon {...props} />}
                                value={formData['truckType'] ?? ""}
                                name="truckType"
                                onChange={setFormData}
                                placeholder="Truck type"
                                data={TRUCK_TYPE}
                                required={true}
                                isSubmitted={isSubmitted}
                                errorMsgLabel="Truck type"
                            />
                        </Grid>
                        <Grid item md={5} sm={6} xs={12}>
                            <InputField
                                type={'number'}
                                inputlabel="QUANTITY OF TRUCKS"
                                placeholder="0"
                                name="qtyOfTrucks"
                                value={formData['qtyOfTrucks']}
                                onChange={setFormData}
                                required={true}
                                isSubmitted={isSubmitted}
                                errorMsgLabel="Quantity"
                            />
                        </Grid>
                    </Grid>
                }
                {formData["serviceType"] === "Full wagon load FWL" &&
                    <Grid container mt={0} spacing={3}>
                        <Grid item md={5} sm={6} xs={12}>
                            <SelectDropDown
                                label="WAGON TYPE"
                                icon={(props) => <KeyboardArrowDownIcon {...props} />}
                                value={formData['wagonType'] ?? ""}
                                name="wagonType"
                                onChange={setFormData}
                                placeholder="Wagon type"
                                data={WAGON_TYPE}
                                required={true}
                                isSubmitted={isSubmitted}
                                errorMsgLabel="Wagon type"
                            />
                        </Grid>
                        <Grid item md={5} sm={6} xs={12}>
                            <InputField
                                type={'number'}
                                inputlabel="QUANTITY OF WAGONS"
                                placeholder="0"
                                name="qtyOfWagons"
                                value={formData['qtyOfWagons']}
                                onChange={setFormData}
                                required={true}
                                isSubmitted={isSubmitted}
                                errorMsgLabel="Quantity"
                            />
                        </Grid>
                    </Grid>
                }
                <Grid container mt={0} spacing={3}>
                    <Grid item md={5} sm={6} xs={12}>
                        <LocationAutoComplete
                            label={'From'}
                            required={true}
                            Inputplaceholder={'City , Port'}
                            mapid={'frommap'}
                            handleChange={(data) => {
                                let item = {
                                    target: {
                                        name: "origin",
                                        value: data
                                    }
                                }
                                setFormData(item);
                            }}
                            errorMsgLabel={"Location from"}
                            isSubmitted={isSubmitted}
                            value={formData['origin']}
                        />
                    </Grid>
                    <Grid item md={5} sm={6} xs={12}>
                        <LocationAutoComplete
                            label={'To'}
                            required={true}
                            errorMsgLabel={"Location to"}
                            Inputplaceholder={'City , Port'}
                            mapid={'tomap'}
                            value={formData['destination']}
                            handleChange={(opt) => {
                                let item = {
                                    target: {
                                        name: "destination",
                                        value: opt
                                    }
                                }
                                setFormData(item);
                            }}
                            isSubmitted={isSubmitted}
                        />
                    </Grid>
                </Grid>
                <Grid container mt={0} spacing={3}>
                    <Grid item md={5} sm={6} xs={12}>
                        <Calendar
                            value={formData['readytoload']}
                            onChange={setFormData}
                            label="READY TO LOAD"
                            placeholder="Select"
                            name="readytoload"
                            isSubmitted={isSubmitted}
                            required={true}
                            errorMsgLabel={"Ready to load date"}
                        />
                    </Grid>
                </Grid>
                <Grid container mt={3}>
                    <Grid item md={9} xs={12}>
                        <InputField
                            multiline={true}
                            type={'text'}
                            inputlabel="ADDITIONAL INFORMATION"
                            placeholder="Write a message..."
                            name="info"
                            value={formData['info']}
                            onChange={setFormData}
                            minRows={2}
                        />
                    </Grid>
                </Grid>
                <Typography variant='h6' mt={7} mb={3}>Associated services</Typography>
                <Box mt={2} className="associated-services">
                    <Popover title={"Add cargo insurance to your shipment to stay safe from any accidents."} >
                        <CustomChip
                            onClick={() => handleAssociatedServices('Insurance')}
                            avatar={
                                <>
                                    <CheckBox name="associatedServices" checked={formData["associatedServices"]?.filter(x => x.serviceId === 'Insurance')?.length > 0 ? true : false} onChange={() => handleAssociatedServices('Insurance')} />
                                    <div className={`commodity-icons _29`} />
                                </>
                            }
                            label="Insurance"
                        />
                    </Popover>
                    <Popover title={"Order an inspection or tally service by checking this one."} >
                        <CustomChip
                            onClick={() => handleAssociatedServices('inspection-services')}
                            avatar={<><CheckBox name="associatedServices" checked={formData["associatedServices"]?.filter(x => x.serviceId === 'inspection-services')?.length > 0 ? true : false} onChange={() => handleAssociatedServices('inspection-services')} /><div className={`commodity-icons _30`} /></>}
                            label="Inspection services"
                        />
                    </Popover>
                    <Popover title={"For different type of commodities and specific local requirements, we will help you to get phytosanitary, radiology, veterinary and other types of certificates."} >
                        <CustomChip
                            onClick={() => handleAssociatedServices('certification')}
                            avatar={<><CheckBox name="associatedServices" checked={formData["associatedServices"]?.filter(x => x.serviceId === 'certification')?.length > 0 ? true : false} onChange={() => handleAssociatedServices('certification')} /><div className={`commodity-icons _31`} /></>} label="Certification"
                        />
                    </Popover>
                    <Popover title={"Select this item if you need customs brokerage service."} >
                        <CustomChip
                            onClick={() => handleAssociatedServices('customs-clearance')}
                            avatar={<><CheckBox name="associatedServices" checked={formData["associatedServices"]?.filter(x => x.serviceId === 'customs-clearance')?.length > 0 ? true : false} onChange={() => handleAssociatedServices('customs-clearance')} /><div className={`commodity-icons _32`} /></>}
                            label="Customs clearance"
                        />
                    </Popover>
                </Box>
                {formData['associatedServices']?.filter(x => x.serviceId === 'Insurance')[0] &&
                    <Grid container mt={3}>
                        <Grid item sm={4} xs={12}>
                            <CustomInputField
                                btnText="USD"
                                placeholder="0"
                                name="invoiceAmount"
                                onChange={(e) => {
                                    let temp = formData['associatedServices']?.filter(x => x.serviceId === 'Insurance')[0]?.details;
                                    temp.InvoiceAmount = e.target.value;
                                    setFormData(temp);
                                }}
                                value={formData['invoiceAmount']}
                                inputlabel="Invoice Amount"
                                required={true}
                                isSubmitted={isSubmitted}
                            />
                        </Grid>
                    </Grid>
                }
                <Typography variant='h6' mt={7} mb={3}>СARGOES Finance</Typography>
                <Alert
                    severity="info"
                    className='custom-alert'
                    iconMapping={{
                        info: <CheckBox name="isAccessingTrade" checked={formData["isAccessingTrade"]} onChange={setFormData} />,
                    }}
                >
                    <AlertTitle>I am interested in accessing Trade, Logistics or Invetory Finance</AlertTitle>
                    <Box component={'span'} sx={{ display: { md: 'block', xs: 'none' } }}><img src="./cargo.svg" alt="" style={{ float: 'right' }} /></Box>
                    CARGOES Finance provides access to finance for exporters, importers and logistics companies across the globe for receivables and payables
                    <Box component={'span'} sx={{ display: { md: 'none', xs: 'block' } }}><img src="./cargo.svg" alt="" style={{ float: 'right' }} /></Box>
                </Alert>
                <Typography variant='h6' mt={7} mb={3}>Contact details</Typography>
                <Grid container mt={3} gap={3}>
                    <Grid item sm={4} xs={12}>
                        <InputField
                            type={'text'}
                            inputlabel="PHONE"
                            placeholder="(000) 000 000"
                            name="phone"
                            value={formData['phone']}
                            onChange={setFormData}
                            isSubmitted={isSubmitted}
                            required={true}
                            errorMsgLabel="Phone"
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <InputField
                            type={'email'}
                            inputlabel="EMAIL"
                            placeholder="Enter your email"
                            name="email"
                            value={formData['email']}
                            onChange={setFormData}
                            isSubmitted={isSubmitted}
                            required={true}
                            errorMsgLabel="Email"
                        />
                    </Grid>
                </Grid>
                <Grid container mt={4} spacing={4}>
                    <Grid item sm={3} xs={12}>
                        <CustomButton
                            title="Send"
                            onClick={handleOnSubmit}
                        />
                    </Grid>
                    <Grid item md={8}>
                        <Typography component={"p"} className="terms-conditions">By clicking Send, you agree with our <Typography component={"a"}>Terms & conditions.</Typography></Typography>
                    </Grid>
                </Grid>
            </Box>
            <DialogBox
                open={modal}
                loading={isLoaded}
                handleClose={() => setModal(false)}
                handleOnSelect={(val) => {
                    val.description = val.title;
                    let item = {
                        target: {
                            name: "productDto",
                            value: {
                                ...formData['productDto'],
                                description: val.title,
                                hsCode: val.code
                            }
                        }
                    }
                    getHSCodes(val.code, val.level, setIsLoaded, setData);
                    setFormData(item);
                }}
            />
            <SnackAlert
                show={show}
                msg={msg}
                type={type}
                handleClose={() => setShow(false)}
            />
        </Container>
    );
}

export default Form;
