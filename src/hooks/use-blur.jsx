import { useEffect, useContext } from 'react';

import OauthContext from '../store/oauth-context';

export default function useBlur() {
    const oauthCtx = useContext(OauthContext);

    const { isBlurred, modalStyleHandler } = oauthCtx;

    useEffect(() => {
        document.addEventListener('click', modalStyleHandler);

        return () => {
            document.removeEventListener('click', modalStyleHandler);
        };
    }, [isBlurred]);

    return {
        isBlurred,
        modalStyleHandler
    };
};