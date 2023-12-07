import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { addData } from "../lib/api";
import SnackBar from '../components/UI/SnackBar';
import OauthContext from '../store/oauth-context';
import NewAppointment from "../components/AppointmentsForm/NewAppointment";

let error;

export default function Booking() {
    const navigate = useNavigate();

    const oauthCtx = useContext(OauthContext);

    const { open, openHandler, closeHandler } = oauthCtx;

    function redirectHandler() {
        navigate('/', { replace: true });
    };

    const addDataHandler = async (data) => {
        const responseData = await addData(data, 'ntw_appointments');

        error = responseData.error;

        openHandler('snackbar');

        if (!error) {
            redirectHandler();
        }
    };

    return (
        <>
            <NewAppointment addData={addDataHandler} onClick={redirectHandler} />
            {/* <SnackBar
                open={open === 'snackbar'} autoHideDuration={1500} onClose={closeHandler}
                message={error ? 'Failed to sent request' : null}
            /> */}
        </>
    );
};