import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

export default function Layout({ children }) {
    return (
        <Fragment>
            <MainNavigation />
            <main>
                {children}
            </main>
        </Fragment>
    );
};