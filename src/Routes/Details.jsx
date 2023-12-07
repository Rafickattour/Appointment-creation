import { useContext } from 'react';

import OauthContext from '../store/oauth-context';
import AppointmentDetails from "../components/AppointmentsDetail/AppointmentDetails"

export default function Details() {
    const oauthCtx = useContext(OauthContext);

    const { appointmentDetails: appDetails } = oauthCtx;

    return <AppointmentDetails data={appDetails} />
};