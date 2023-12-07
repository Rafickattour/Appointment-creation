import { useState, useContext } from 'react';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import SMenu from '../UI/Menu';
import BasicModal from '../UI/Modal';
import OauthContext from '../../store/oauth-context';
import styles from './AppointmentItem.module.css';

export default function AppointmentItem(props) {
    const oauthCtx = useContext(OauthContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const typeOpen = Boolean(anchorEl);

    const { open, openHandler, closeHandler } = oauthCtx;

    const menuHandler = () => {
        openHandler('modal');
        closeMenuHandler();
    };

    const openMenuHandler = (e) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const closeMenuHandler = () => {
        setAnchorEl(null);
    };

    return (
        <li className={styles.appointment} onClick={props.onClick}>
            <BasicModal
                open={open === 'modal'}
                title={'Cancel appointment?'}
                onClose={closeHandler}
                onSubmit={() => alert('Appointment canceled')}
            />
            <div className={styles['top-side']}>
                <h4>{props.name}</h4>
                <Tooltip
                    title='Show Menu'
                    TransitionComponent={Fade}
                >
                    <IconButton
                        id='positioned-btn'
                        className={styles.effect}
                        onClick={openMenuHandler}>
                        <MoreVertIcon className={styles.moreIcon} />
                    </IconButton>
                </Tooltip>
                <SMenu
                    id='positioned-menu'
                    aria-labelledby='positioned-btn'
                    anchorEl={anchorEl}
                    open={typeOpen}
                    onSchedule={props.onClick}
                    onCancel={menuHandler}
                    onClose={closeMenuHandler}
                />
            </div>
            <div className={styles['middle-side']}>
                <ScheduleIcon className={styles.timeIcon} />
                {props.startTime} - {props.endTime}
            </div>
            <div className={styles['bottom-side']}>
                <CalendarTodayIcon className={styles.dateIcon} />
                {props.scheduledDate}
            </div>
        </li >
    );
};