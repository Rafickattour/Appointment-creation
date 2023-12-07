import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { LINKS_DATA } from '../lib/data';
import useScroll from '../hooks/use-scroll';
import OauthContext from '../store/oauth-context';
import styles from './MainNavigation.module.css';

export default function MainNavigation() {
    const location = useLocation();
    const currentPath = location.pathname;

    const oauthCtx = useContext(OauthContext);

    const { isFixed } = useScroll();

    const { searchHandler } = oauthCtx;

    return (
        <header className={`${styles.header} ${isFixed ? styles.fixed : ''}`}>
            <nav>
                <ul className={styles.list}>
                    {LINKS_DATA.map((link, index) => (
                        <li key={index}>
                            <Link to={link.url}>{currentPath === '/appointment-creation' ? 'Scheduler' : 'Appointments'}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                {currentPath === '/' ?
                    <Tooltip
                        title='Search'
                        placement='left-start'
                        TransitionComponent={Fade}
                    >
                        <SearchIcon
                            className={styles.searchIcon}
                            onClick={() => searchHandler()}
                        />
                    </Tooltip> : null}
                <AccountCircleIcon className={styles.profileIcon} />
            </div>
        </header>
    );
};