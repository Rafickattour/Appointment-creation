import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const modalSx = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '4px',
    boxShadow: 24,
    p: 4
};

export default function BasicModal(props) {
    return (
        <Modal
            open={props.open}
            onClose={props.onBlur}
            keepMounted
            aria-labelledby="modal-modal-title"
        >
            <Box sx={modalSx} className={props.className}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.title}
                </Typography>
                {props.modalMessage1 ? (
                    <div>
                        <p>Appointment Name:</p>
                        <p>{props.name}</p>
                        <p>Appointment Date:</p>
                        <p>{props.date}</p>
                        <p>Start Time:</p>
                        <p>{props.start}</p>
                        <p>End Time:</p>
                        <p>{props.end}</p>
                    </div>
                ) : null}
                <div>
                    <button onClick={props.onClose}>Close</button>
                    <button type='submit' onClick={props.onSubmit}>Save</button>
                </div>
            </Box>
        </Modal>
    );
};