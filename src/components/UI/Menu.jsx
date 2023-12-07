import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SMenu(props) {
    const MENU = [
        {
            name: 'Edit',
            event: props.onSchedule
        },
        {
            name: 'Cancel',
            event: props.onCancel
        }
    ];

    return (
        <Menu
            {...props}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
        >
            {MENU.map((menu, index) => (
                <MenuItem key={index} onClick={menu.event}>{menu.name}</MenuItem>
            ))}
        </Menu>
    );
};