import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';

import { NAV_DATA, TIMESLOTS } from '../../lib/data';
import Textfield from '../UI/TextField';
import DatePicker from '../UI/DatePicker';
import InfoIcon from '@mui/icons-material/Info';
import OauthContext from '../../store/oauth-context';
import TimeslotsList from '../Timeslots/TimeslotsList';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import styles from './AppointmentDetails.module.css';

let arrowSx = {
    fill: '#666',
    fontSize: '26px',
    cursor: 'pointer',
    '&:hover': {
        fill: '#333'
    }
};


let serviceName;
let formatDate = (value) => new Date(value).toISOString().split('T')[0];

export default function AppointmentDetails(props) {
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const servicesRef = useRef();
    const commentsRef = useRef();
    const startTimeRef = useRef('00:00');
    const endTimeRef = useRef('00:00');

    const oauthCtx = useContext(OauthContext);

    const { ntw_name, _ntw_msgov_service_value,
        ntw_description, ntw_startdate } = props.data;

    const { open, isTime, services, selectedDate, activeStage: active,
        openHandler, closeHandler, changeDateHandler, activeHandler } = oauthCtx;

    const matchingService = services.find((service) =>
        service.msgov_serviceid === _ntw_msgov_service_value);

    if (typeof matchingService === 'object') {
        serviceName = matchingService.msgov_servicename;
    }

    function redirectHandler() {
        navigate('..');
    };

    // console.log(dayjs(ntw_startdate).format('YYYY-MM-DDTHH:mm:ss[Z]'));

    const getSelectedTimes = (time) => {
        startTimeRef.current = time.startTime;
        endTimeRef.current = time.endTime;
    };

    useEffect(() => {
        if (ntw_name && nameRef.current) {
            nameRef.current.value = ntw_name;
        }
        if (ntw_description && commentsRef.current) {
            commentsRef.current.value = ntw_description;
        }
        if (serviceName && servicesRef.current) {
            servicesRef.current.value = serviceName;
        }
    }, [active, ntw_name, serviceName, ntw_description]);

    const submitHandler = (e) => {
        e.preventDefault();

        const selectedStartTimeRef = startTimeRef.current;
        const selectedEndTimeRef = endTimeRef.current;

        const combinedStartDate = new Date(`${formatDate(selectedDate)}T${selectedStartTimeRef}:00Z`);
        const combinedEndDate = new Date(`${formatDate(selectedDate)}T${selectedEndTimeRef}:00Z`);

        const appointmentData = {
            ntw_startdate: combinedStartDate.toISOString(),
            ntw_enddate: combinedEndDate.toISOString()
        };

        console.log(appointmentData);
        return;

        props.updData(appointmentData);
    };

    return (
        <div className={styles['details-container']}>
            <div className={styles.header}>
                <div>
                    <ArrowCircleLeftIcon sx={arrowSx} onClick={redirectHandler} />
                    <h1>{ntw_name}</h1>
                </div>
                <button onClick={submitHandler}>Confirm</button>
            </div>
            <div className={styles['content-container']}>
                <ul className={styles['side-container']}>
                    {NAV_DATA.map((nav, index) => (
                        <li
                            key={index}
                            className={`${styles['nav-list']}
                            ${active === index ? styles.active : ''}`}
                            onClick={() => activeHandler(index)}
                        >
                            {nav.icon ? <InfoIcon className={styles.infoIcon} /> :
                                <EditCalendarIcon className={styles.calendarIcon} />}
                            <div>
                                <h3>{nav.title}</h3>
                                <p>{nav.text}</p>
                            </div>
                            <KeyboardArrowRightIcon className={styles.arrowIcon} />
                        </li>
                    ))}
                </ul>
                <Box component='form' className={styles['booking-form']}>
                    {active === 0 ? (
                        <div>
                            <label htmlFor='name'>Appointment Name</label>
                            <Textfield
                                id='name'
                                type='text'
                                hiddenLabel
                                ref={nameRef}
                                variant='outlined'
                                size='small'
                                autoComplete='name'
                                placeholder='Appointment Name'
                                inputProps={{ readOnly: true }}
                            />
                            <label htmlFor='service'>Service</label>
                            <Textfield
                                id='service'
                                type='text'
                                hiddenLabel
                                ref={servicesRef}
                                variant='outlined'
                                size='small'
                                placeholder='Services'
                                inputProps={{ readOnly: true }}
                            />
                            <label htmlFor='details'>Details</label>
                            <Textfield
                                id='details'
                                type='text'
                                hiddenLabel
                                ref={commentsRef}
                                variant='outlined'
                                size='small'
                                rows={2}
                                multiline
                                placeholder='Details'
                                inputProps={{ readOnly: true }}
                            />
                        </div>
                    ) : (
                        <div>
                            <div className={styles['date-side']}>
                                <h3>Select Date and Time</h3>
                                <DatePicker
                                    value={selectedDate}
                                    onChange={changeDateHandler}
                                />
                            </div>
                            {isTime ? (
                                <div className={styles['time-side']}>
                                    <h3>{dayjs(selectedDate).format('DD MMM YYYY')}</h3>
                                    <TimeslotsList data={TIMESLOTS} onClick={getSelectedTimes} />
                                </div>
                            ) : null}
                        </div>
                    )}
                </Box>
            </div>
        </div >
    );
};