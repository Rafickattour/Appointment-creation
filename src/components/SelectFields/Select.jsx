import { forwardRef } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import LoadingMsg from '../UI/LoadingMsg';
import styles from './Select.module.css';

let dropdownList;

const SelectField = forwardRef((props, ref) => {
    if (props.data !== undefined && props.data.length > 0) {
        dropdownList = props.data?.map((item, index) => (
            <MenuItem key={index} value={index} className={styles['mui-option']}>
                {item.msgov_servicename}
            </MenuItem >
        ));
    } else {
        dropdownList =
            <MenuItem className={styles['mui-option']}>
                <LoadingMsg class={`loading ${styles['loading--2']}`}>{props.loading}</LoadingMsg>
            </MenuItem >
    }

    return (
        <FormControl
            name='select-form-control'
            className={styles['mui-form']}
        >
            <InputLabel
                id={props.labelid}
                size='small'
            >
                {props.label}
            </InputLabel>
            <Select
                ref={ref}
                {...props}
            >
                {dropdownList}
            </Select>
        </FormControl>
    );
});

export default SelectField;