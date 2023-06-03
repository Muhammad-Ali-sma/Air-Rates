import axios from "axios";
import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { GoolgePlaceSearch } from '../Services/CommonService';
import { Autocomplete, Box, FormLabel, TextField, Typography } from "@mui/material";

const LocationAutoComplete = (props) => {

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [listNearByData, setListNearByData] = useState([]);
    const [disableClear, setDisableClear] = useState(false);
    const [showloader, setShowloader] = useState(false);
    const [listData, setListData] = useState([]);
    const [error, setError] = useState(false);
    const [value, setValue] = useState(null);
    const [map, setMap] = useState(null);

    const SearchPlaces = async (e) => {
        setShowloader(true)
        await GoolgePlaceSearch(e)
            .then((res) => {
                if (res && res?.length > 0) {
                    setListData(res);
                    setShowloader(false);
                } else {
                    setListData([]);
                    setShowloader(false);
                }
            })

    }

    const setMarkers = (map, markers) => {
        var bounds = new window.google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            var marker = new window.google.maps.Marker({
                position: { lat: parseFloat(markers[i].lat), lng: parseFloat(markers[i].lng) },
                map: map,
            });
            bounds.extend(marker.getPosition());
        }
        map.fitBounds(bounds);
    }

    const onGenerateMap = async (mainItem, items) => {
        if (items?.length > 0) {
            const center = new window.google.maps.LatLng(items[0]?.lat, items[0]?.lng);
            var map = new window.google.maps.Map(document.getElementById(props?.mapid), {
                center: center,
                zoom: 15,
            });
            setMap(map);
            setMarkers(map, [...items, mainItem])
        }
    }

    const NearByplaces = async (item) => {
        setSelectedCountry(item);
        const formData = new FormData();
        formData.append('input', item?.place_id)
        formData.append('type', 'place_id')
        formData.append('country_code', item?.code)
        formData.append('place_type', item?.place_type)
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post('https://www.searates.com/search/google-geocode', formData, config)
            .then(response => {
                setListData([])
                let temp = { ...item, ...response?.data?.results[0].geometry.location, formatted_address: response?.data?.results[0].formatted_address };
                setSelectedCountry(temp)
                setListNearByData(response?.data?.country_ports);
                onGenerateMap(temp, response?.data?.country_ports)

            })
            .catch(error => {
                console.log("error", error);
            });

    }

    const onClear = () => {
        if (!disableClear) {
            setValue(null);
            setListData([]);
            setShowloader(false);
            setListNearByData([]);
            setSelectedCountry(null);
        }
    }

    const handleOnSelect = (item, selected) => {
        let data = {
            address: {
                address1: "",
                address2: "",
                city: selected?.city,
                state: "",
                country: selected?.country,
                region: selected?.region,
                zipCode: "",
                references: "",
                province: "",
                location: {
                    latitude: item?.lat ?? selected?.lat,
                    longitude: item?.lng ?? selected?.lng
                },
                countryCodeISO3: "",
                countryCode: selected?.counrty_code,
                completeAddress: selected?.formatted_address
            },
            code: selected?.code,
            name: item?.name ?? "",
        }
        props.handleChange(data);
        setValue(`${item?.name ?? selected?.city} ${selected?.country}`);
        setListData([]);
        setListNearByData([]);
        setSelectedCountry(null);
    }

    const moveToMarker = (item) => {
        if (item?.lat && item?.lng) {
            const markerLatLng = new window.google.maps.LatLng(item?.lat, item?.lng);
            if (map !== null) {
                map?.panTo(markerLatLng);
            }
        }
    }

    React.useEffect(() => {
         if (props?.isSubmitted && props?.required && !props.value) {
            setError(true);
        } else {
            setError(false);
        }
    }, [props.value, props?.isSubmitted])
    return (
        <>
            <FormLabel className='input-label' required>{props.label}</FormLabel>
            <Autocomplete
                sx={{ marginTop: '5px' }}
                freeSolo
                fullWidth
                value={value}
                options={listNearByData?.length > 0 ? listNearByData : listData}
                autoHighlight
                onInputChange={(e, option) => {
                    if (option) {
                        if (listNearByData?.length === 0) {
                            SearchPlaces(option)
                        }
                    } else {
                        setListNearByData([]);
                        setListData([]);
                        setSelectedCountry(null);
                    }
                }}
                clearOnEscape={true}
                onBlur={onClear}
                clearOnBlur={!disableClear ? true : false}
                filterSelectedOptions={true}
                filterOptions={(options) => options}
                loading={showloader}
                loadingText={<span className="loader" />}
                openOnFocus={true}
                getOptionLabel={(option) => {
                    if (listNearByData?.length === 0 && option?.city) {
                        return option?.city + " " + option?.country
                    } else if (option?.name) {
                        return option?.name
                    } else {
                        return option
                    }
                }}
                renderOption={(props, option) => {
                    return (
                        <div onClick={() => { NearByplaces(option) }}>
                            <div {...props}>
                                <Box component="div" className="city-option-container" >
                                    <p className="city-region">
                                        <ReactCountryFlag
                                            countryCode={option?.code}
                                            style={{ width: 16, height: 16, marginRight: "10px" }}
                                            svg
                                            cdnSuffix="svg"
                                        />
                                        {option.city} {option.region}
                                    </p>
                                    <small className="city-country">{option?.city} {option?.country}</small>
                                </Box>
                            </div>
                        </div>
                    )
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={error}
                        placeholder={props.Inputplaceholder}
                    />
                )}
            />
            {selectedCountry &&
                <div className="autoselect" onMouseLeave={() => setDisableClear(false)}>
                    <div className="customrow">
                        <div className="placename">
                            <Box component="div" className="autorow" onClick={() => handleOnSelect(selectedCountry, selectedCountry)} onMouseEnter={() => { setDisableClear(true); moveToMarker(selectedCountry); }}>
                                <p className="city-region">
                                    <img src="./building.svg" alt="Port" style={{ marginRight: '10px' }} />
                                    {selectedCountry?.city} {selectedCountry?.region}
                                </p>
                                <small className="city-country">{selectedCountry?.city} {selectedCountry?.country}</small>
                            </Box>
                            {listNearByData?.length > 0 && listNearByData?.map((item, index) => {
                                return (
                                    <Box key={`city_${index}`} component="div" className="autorow" onClick={() => handleOnSelect(item, selectedCountry)} onMouseEnter={() => { setDisableClear(true); moveToMarker(item); }}>
                                        <p className="city-region">
                                            <img src="./port.svg" alt="Port" style={{ marginRight: '10px' }} />
                                            {item?.name}
                                        </p>
                                        <small className="city-country">{'Port of ' + selectedCountry?.country}</small>
                                    </Box>
                                )
                            })}
                        </div>
                        <div className="placemap">
                            <div style={{ height: 300 }} id={props?.mapid}></div>
                        </div>
                    </div>
                </div>
            }
            {error && <Typography className='error-msg'>{props?.errorMsgLabel} is required!</Typography>}
        </>
    )
}

export default LocationAutoComplete