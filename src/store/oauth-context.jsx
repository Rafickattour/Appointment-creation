import React, { useState, useEffect, useReducer } from "react";
import dayjs from "dayjs";

import { getData, getDataId, getToken } from "../lib/api";

const OauthContext = React.createContext({
    openHandler: (type) => { },
    closeHandler: () => { },
    changeDateHandler: (date) => { },
    modalStyleHandler: () => { },
    searchHandler: () => { },
    activeHandler: (index) => { }
});

const oauthReducer = (state, action) => {
    switch (action.type) {
        case 'CALL_APP':
            return { ...state, appointments: action.payload };
        case 'CALL_SERVICES':
            return { ...state, services: action.payload };
        case 'CALL_APPDETAILS':
            return { ...state, appointmentDetails: action.payload };
        default:
            return state;
    }
};

const appointmentReducer = (state, action) => {
    switch (action.type) {
        case 'OPEN':
            return { ...state, open: action.payload };
        case 'CLOSE':
            return { ...state, open: null };
        case 'SEARCH':
            return { ...state, isSearch: true };
        case 'BLUR':
            return { ...state, isBlurred: !state.isBlurred };
        case 'ACTIVE':
            return { ...state, activeStage: action.payload };
        case 'SET_DATE':
            return { ...state, isTime: true, selectedDate: action.payload };
        default:
            return state;
    }
};

export const OauthContextProvider = ({ children }) => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const id = pathSegments[pathSegments.length - 1];
    // const [currentPath, setCurrentPath] = useState('');
    // const [id, setId] = useState('');

    const [state, dispatch] = useReducer(oauthReducer, {
        services: [],
        appointments: [],
        appointmentDetails: []
    });

    const [appState, dispatchApp] = useReducer(appointmentReducer, {
        open: null,
        isTime: false,
        activeStage: 0,
        isSearch: false,
        isBlurred: false,
        selectedDate: dayjs()
    });


    const openHandler = (type) => {
        dispatchApp({ type: 'OPEN', payload: type });
    };

    const closeHandler = () => {
        dispatchApp({ type: 'CLOSE' });
    };

    const changeDateHandler = (newDate) => {
        dispatchApp({ type: 'SET_DATE', payload: newDate });
    };

    const modalStyleHandler = () => {
        dispatchApp({ type: 'BLUR' });
    };

    const searchHandler = () => {
        dispatchApp({ type: 'SEARCH' });
    };

    const activeHandler = (index) => {
        dispatchApp({ type: 'ACTIVE', payload: index });
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = await getToken();
            // setCurrentPath(window.location.pathname);

            let appData, serviceData, appDetails;

            switch (currentPath) {
                case '/appointment-creation':
                    appData = await getData('ntw_appointments', token);
                    break;
                case '/appointment-creation/booking':
                    serviceData = await getData('msgov_services', token);
                    break;
                case `/appointment-creation/appointments/${id}`:
                    serviceData = await getData('msgov_services', token);
                    appDetails = await getDataId('ntw_appointments', token, id);
                    break;
                default:
                // console.log('No data available');
            }

            if (appData) {
                dispatch({ type: 'CALL_APP', payload: appData });
            }
            if (serviceData) {
                dispatch({ type: 'CALL_SERVICES', payload: serviceData });
            }
            if (appDetails) {
                dispatch({ type: 'CALL_APPDETAILS', payload: appDetails });
            }
        };
        fetchData();
    }, [currentPath, id]);

    const contextValue = {
        ...state,
        ...appState,
        openHandler,
        closeHandler,
        searchHandler,
        activeHandler,
        changeDateHandler,
        modalStyleHandler
    };

    return (
        <OauthContext.Provider value={contextValue}>
            {children}
        </OauthContext.Provider>
    );
};

export default OauthContext;