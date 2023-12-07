import TimeslotItem from './TimeslotItem';
import styles from './TimeslotsList.module.css';

export default function TimeslotsList(props) {
    const getSelectedTimes = (time) => {
        props.onClick(time);
    };

    return (
        <div className={styles['timeslots-container']}>
            {props.data.length > 0 ? (
                <ul>
                    {props.data.map((time) => (
                        <TimeslotItem
                            key={time.id}
                            startTime={time.startTime}
                            endTime={time.endTime}
                            unit={time.unit}
                            onClick={getSelectedTimes.bind(null, time)}
                        />
                    ))}
                </ul>
            ) : (
                <div className={styles.message}>
                    There are currently no available time slots
                </div>
            )}
        </div>
    );
};