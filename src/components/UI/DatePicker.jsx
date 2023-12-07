import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function DatePicker(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <StaticDatePicker
                slotProps={{
                    actionBar: {
                        actions: ['today']
                    }
                }}
                {...props}
                disablePast
                showDaysOutsideCurrentMonth
            /> */}
            <DateCalendar
                {...props}
                disablePast
                showDaysOutsideCurrentMonth
            />
        </LocalizationProvider>
    );
};