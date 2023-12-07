import { useContext } from 'react';

// import SnackBar from '../components/UI/Toast';
import OauthContext from '../store/oauth-context';
import AppointmentsList from "../components/Appointments/AppointmentsList";

export default function Appointments() {
    const oauthCtx = useContext(OauthContext);

    const { open, appointments, closeHandler } = oauthCtx;

    return (
        <>
            <AppointmentsList data={appointments} />
            {/* <SnackBar
                open={open === 'snackbar'} autoHideDuration={1500}
                onClose={closeHandler} message={'Request Send Sucessfully'}
            /> */}
        </>
    );
};