import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import dayjs from "dayjs";
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import InfoIcon from '@mui/icons-material/Info';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { TIMESLOTS } from "../../lib/data";
import BasicModal from "../UI/Modal";
import Textfield from "../UI/TextField";
import DatePicker from "../UI/DatePicker";
import useBlur from "../../hooks/use-blur";
import SelectField from "../SelectFields/Select";
import OauthContext from "../../store/oauth-context";
import TimeslotsList from "../Timeslots/TimeslotsList";
import styles from './NewAppointment.module.css';

let arrowSx = {
    fill: '#666',
    fontSize: '26px',
    cursor: 'pointer',
    '&:hover': {
        fill: '#333'
    }
};

let formatDate = (value) => new Date(value).toISOString().split('T')[0];

export default function NewAppointment(props) {
    const nameRef = useRef();
    const servicesRef = useRef();
    const commentsRef = useRef();
    const startTimeRef = useRef('00:00');
    const endTimeRef = useRef('00:00');
    // const requestAbortController = useRef();

    const oauthCtx = useContext(OauthContext);

    const { isBlurred, modalStyleHandler } = useBlur();

    const { open, isTime, services, selectedDate,
        openHandler, closeHandler, changeDateHandler } = oauthCtx;

    // const [highlightedDays, setHighlightedDays] = useState([1, 2, 30]);
    // const [isLoading, setIsLoading] = useState(false);

    const getSelectedTimes = (time) => {
        startTimeRef.current = time.startTime;
        endTimeRef.current = time.endTime;
    };

    // const getRandomNumber = (min, max) => {
    //     return Math.round(Math.random() * (max - min) + min);
    // };

    // const fakeFetch = (date, { signal }) => {
    //     return new Promise((resolve, reject) => {
    //         const timeout = setTimeout(() => {
    //             const daysInMonth = date.daysInMonth();
    //             const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

    //             resolve({ daysToHighlight });
    //         }, 500);

    //         signal.onabort = () => {
    //             clearTimeout(timeout);
    //             reject(new DOMException('aborted', 'AbortError'));
    //         };
    //     });
    // };

    // const ServerDay = (props) => {
    //     const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    //     const isSelected = !props.outsideCurrentMonth &&
    //         highlightedDays.indexOf(props.day.date()) >= 0;

    //     return (
    //         <Badge
    //             key={props.day.toString()}
    //             overlap="circular"
    //             badgeContent={isSelected ? '🔴' : null}
    //         >
    //             <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    //         </Badge>
    //     );
    // };

    // const disableDateHandler = (day) => {
    //     return highlightedDays.includes(day.date());
    // };

    // const fetchHighlightedDays = (date) => {
    //     const controller = new AbortController();
    //     fakeFetch(date, {
    //         signal: controller.signal,
    //     })
    //         .then(({ daysToHighlight }) => {
    //             setHighlightedDays(daysToHighlight);
    //             // setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             if (error.name !== 'AbortError') {
    //                 throw error;
    //             }
    //         });

    //     requestAbortController.current = controller;
    // };

    // const fetchHighlightedDays = (date) => {
    //     const url = `/api/dates/${date.format('YYYY-MM')}`;

    //     const controller = new AbortController();
    //     axios({
    //         url,
    //         method: 'Get',
    //         signal: controller.signal
    //     }).then((response) => {
    //         if (!response.ok) {
    //             throw new Error('API error');
    //         }

    //         const data = response.data.value;
    //         // const { data: daysToHighlight } = response;
    //         setHighlightedDays(data);
    //     }).catch((error) => {
    //         if (error.name !== 'AbortError') {
    //             throw error;
    //         }
    //     });

    //     requestAbortController.current = controller;
    // };

    // useEffect(() => {
    //     fetchHighlightedDays(selectedDate);

    //     return () => requestAbortController.current?.abort();
    // }, []);

    // const handleMonthChange = (date) => {
    //     if (requestAbortController.current) {
    //         requestAbortController.current.abort();
    //     }

    //     // setIsLoading(true);
    //     setHighlightedDays([]);
    //     fetchHighlightedDays(date);
    // };

    const submitHandler = (e) => {
        e.preventDefault();

        const enteredNameRef = nameRef.current.value;
        const selectedServicesRef = servicesRef.current.textContent;
        const enteredCommentsRef = commentsRef.current.value;
        const selectedStartTimeRef = startTimeRef.current;
        const selectedEndTimeRef = endTimeRef.current;

        const combinedStartDate = new Date(`${formatDate(selectedDate)}T${selectedStartTimeRef}:00Z`);
        const combinedEndDate = new Date(`${formatDate(selectedDate)}T${selectedEndTimeRef}:00Z`);
        // const combinedStartDate = dayjs(`${formatDate(selectedDate)}T${selectedStartTimeRef}`);
        // const combinedEndDate = dayjs(`${formatDate(selectedDate)}T${selectedEndTimeRef}`);

        // combinedStartDate.format('YYYY-MM-DDTHH:mm:ss[Z]');
        // combinedEndDate.format('YYYY-MM-DDTHH:mm:ss[Z]');

        const appointmentData = {
            ntw_name: enteredNameRef,
            _ntw_msgov_service_value: selectedServicesRef,
            ntw_description: enteredCommentsRef,
            ntw_startdate: combinedStartDate.toISOString(),
            ntw_enddate: combinedEndDate.toISOString()
        };

        props.addData(appointmentData);
    };

    return (
        <div className={styles['booking-container']}>
            <BasicModal
                modalMessage1
                open={open === 'modal'}
                title={'Are you sure you want\
                to confirm your appointment?'}
                name={nameRef.current?.value}
                date={formatDate(selectedDate)}
                start={startTimeRef.current}
                end={endTimeRef.current}
                onClose={closeHandler}
                onSubmit={submitHandler}
                onBlur={modalStyleHandler}
                className={`${styles.modal}
                ${isBlurred ? styles.blur : null}`}
            />
            <div className={styles.header}>
                <div>
                    <ArrowCircleLeftIcon sx={arrowSx} onClick={props.onClick} />
                    <h1>Add Appointment details</h1>
                </div>
                <button type='submit' onClick={() => openHandler('modal')}>Book</button>
            </div>
            <div className={styles['content-container']}>
                <div className={styles['side-container']}>
                    <InfoIcon className={styles.infoIcon} />
                    <div>
                        <h3>Appointment Info</h3>
                        <p>Name, Service, Details, Duration</p>
                    </div>
                    <KeyboardArrowRightIcon className={styles.arrowIcon} />
                </div>
                <Box component='form' className={styles['booking-form']}>
                    <Textfield
                        id='name'
                        type='text'
                        ref={nameRef}
                        label='Appointment Name'
                        variant='outlined'
                        size='small'
                        autoComplete='name'
                        inputProps={{ maxLength: 20 }}
                    />
                    <SelectField
                        labelid='service-select-label'
                        labelId='service-select-label'
                        id='service-select'
                        data={services}
                        ref={servicesRef}
                        label='Service'
                        size='small'
                        defaultValue=''
                        loading='Loading Services'
                    />
                    <Textfield
                        id='details'
                        type='text'
                        ref={commentsRef}
                        label='Details'
                        variant='outlined'
                        size='small'
                        rows={2}
                        multiline
                    />
                    <DatePicker
                        value={selectedDate}
                        onChange={changeDateHandler}
                    // onMonthChange={handleMonthChange}
                    // shouldDisableDate={disableDateHandler}
                    // loading={isLoading}
                    // renderLoading={() => <DayCalendarSkeleton />}
                    // slots={{
                    //     day: ServerDay
                    // }}
                    // slotProps={{
                    //     day: {
                    //         highlightedDays
                    //     }
                    // }}
                    />
                    {isTime ?
                        <TimeslotsList data={TIMESLOTS} onClick={getSelectedTimes} /> : null}
                </Box>
            </div>
        </div>
    );
};