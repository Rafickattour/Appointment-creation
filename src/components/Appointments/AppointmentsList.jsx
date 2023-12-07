import { useState, useMemo, useContext } from "react"
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Textfield from "../UI/TextField";
import LoadingMsg from "../UI/LoadingMsg";
import AppointmentItem from "./AppointmentItem";
import OauthContext from "../../store/oauth-context";
import styles from './AppointmentsList.module.css';

let formatHour = (value) => dayjs(value).format('hh:mm A');
let formatDate = (value) => new Date(value).toISOString().split('T')[0];

export default function AppointmentsList({ data }) {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const oauthCtx = useContext(OauthContext);

    const { isSearch } = oauthCtx;

    const searchHandler = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredServices = useMemo(() => {
        if (searchQuery.trim() !== '') {
            return data.filter((item) =>
                item.ntw_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                item._createdby_value === '1a36ed5f-4772-ee11-8179-6045bd8f9f9d' &&
                item.ntw_appointmentstatus === 0 || item.ntw_appointmentstatus === 3);
        } else {
            return data.filter((item) => (
                item._createdby_value === '1a36ed5f-4772-ee11-8179-6045bd8f9f9d' &&
                item.ntw_appointmentstatus === 0 || item.ntw_appointmentstatus === 3
            ));
        }
    }, [searchQuery, data]);

    return (
        <section className={styles['appointment-container']}>
            <div className={styles.header}>
                <h1>Appointments Types</h1>
                <div className={styles.actions}>
                    {isSearch ?
                        <Textfield
                            id='search'
                            type='search'
                            size='small'
                            value={searchQuery}
                            onChange={searchHandler}
                            label={!searchQuery ? 'Search' : 'Searching'}
                        /> : null}
                    <div onClick={() => navigate('/booking')}>
                        <AddIcon className={styles.addIcon} />
                        <button>Create</button>
                    </div>
                </div>
            </div>
            <div className={styles.profile}>
                <AccountCircleIcon className={styles.profileIcon} />
                <h3>Customer Name</h3>
            </div>
            {data.length > 0 ? (
                <ul>
                    {filteredServices.map((item) => (
                        <AppointmentItem
                            key={item.ntw_appointmentid}
                            name={item.ntw_name}
                            startTime={formatHour(item.ntw_startdate)}
                            endTime={formatHour(item.ntw_enddate)}
                            scheduledDate={formatDate(item.ntw_startdate)}
                            onClick={() => navigate(`/appointments/${item.ntw_appointmentid}`)}
                        />
                    ))
                    }
                </ul>
            ) : <LoadingMsg class={styles.loading}>Fetching data</LoadingMsg>}
            {data.length > 0 && filteredServices.length === 0 ?
                <div className={styles.result}>No matches found</div> : null}
        </section>
    );
};