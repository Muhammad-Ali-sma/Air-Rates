import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { getHSCodes } from '../Services/CommonService'
import CustomButton from './CustomButton'

const DialogBox = (props) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleOnCategoryClick = (item) => {
        setSelectedCategory([...selectedCategory, { code: item.code, level: item.level + 1, title: item.description }])
        getHSCodes(item.code, item.level + 1, setIsLoaded, setData)
    }
    const handleOnCancelBtnClick = () => {
        setSelectedCategory([]);
        props.handleClose();
    }
    React.useEffect(() => {
        getHSCodes(null, 0, setIsLoaded, setData);
    }, [props.open])

    return (
        <Dialog
            open={props.open}
            onClose={handleOnCancelBtnClick}
            maxWidth="lg"
            sx={{ '& .MuiDialog-paper': { minWidth: { md: '800px', sm: '600px' } } }}
            className='hs-modal'
        >
            <DialogTitle>
                HS codes
            </DialogTitle>
            <DialogContent>
                {!isLoaded ?
                    <div className='modal-content'>
                        <div className='modal-heading'><span onClick={() => { getHSCodes(null, 0, setIsLoaded, setData); setSelectedCategory([]); }}>Main categories / </span>{selectedCategory.map(x => <span onClick={() => { getHSCodes(x.code, x.level, setIsLoaded, setData); setSelectedCategory(selectedCategory.filter(y => y.level <= x.level)) }}>{x.title + " / "}</span>)}</div>
                        {data?.filter(x => x.code).map((x, i) => {
                            return <div key={`code_${x.code}`} className="flex-box" onClick={() => handleOnCategoryClick(x)}>
                                <div className="flex-box">
                                    <div className={`commodity-icons ${x?.class}`} />
                                    {x.description}
                                </div>
                                <div className='hs-code'>{x.code}</div>
                            </div>
                        }
                        )}
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress />
                    </div>
                }

            </DialogContent>
            <DialogActions>
                <CustomButton
                    title="Cancel"
                    className="modal-btn"
                    onClick={handleOnCancelBtnClick}
                />
                {selectedCategory.length > 0 &&
                    <CustomButton
                        title="Select"
                        className="modal-btn modal-select-btn"
                        onClick={() => { props.handleOnSelect(selectedCategory[selectedCategory?.length - 1]); handleOnCancelBtnClick() }}
                    />
                }
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox