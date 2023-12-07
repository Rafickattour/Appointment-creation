import styles from './TimeslotItem.module.css';

export default function TimeslotItem(props) {
    return (
        <li
            tabIndex='0'
            className={styles.timeslot}
            onClick={props.onClick}
        >
            {props.startTime} - {props.endTime} {props.unit}
        </li>
    );
};