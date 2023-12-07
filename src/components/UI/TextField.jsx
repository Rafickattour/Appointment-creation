import { forwardRef } from 'react';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label.Mui-focused': {
                            color: '#830823',
                        }
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'E8E8E8'
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: '#000000'
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: '#830823'
                        },
                    }
                }
            }
        }
    });

const Textfield = forwardRef((props, ref) => {
    const outerTheme = useTheme();

    return (
        <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField {...props} inputRef={ref} />
        </ThemeProvider>
    );
});

export default Textfield;