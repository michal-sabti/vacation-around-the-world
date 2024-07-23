import * as React from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AttractionsIcon from '@mui/icons-material/Attractions';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { HomePage } from '../HomePage';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
// const rows = await promiseQuery(query);
// for(let i in rows){
//     rows[i].pic=[];
//     console.log(rows[i].id)
//     const images=`select imgUrl from travels.trip_images where tripId = ${rows[i].id}`;
//     const imagesResult=await promiseQuery(images);
//     for( let j in imagesResult){
//         rows[i].pic[j]=imagesResult[j];
//     }

// }
const style = {
    position: 'absolute',
    top: '50%',
    left: '45%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ChooseWhatAdd({ flag }) {
    const nav=useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); };
    const navigate = useNavigate();
    const user = useSelector(state=>state.user.currentUser);
    useEffect(() => {
        handleOpen();
    }, [])
    useEffect(()=>{
        if(!user)
           {
            Swal.fire("רק משתמש רשום יכול להוסיף אטרקציה/ מלון")
            nav("/home");
           }
    })

console.log(open)
    return (
        user? (<div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='text-center my-5'>
                        <h2 className='m-5'>בחרו מה להוסיף:</h2>
                        <div className='row gx-0 justify-content-center'>
                            <Button className='rounded shadow col-4 center px-3 py-5 ms-5'
                                // style={{ color: "#94db9f" }}
                                onClick={() => { navigate("/AddEndEditAttraction"); handleClose(); }}>
                                <AttractionsIcon fontSize='large' />
                                <h3>אטרקציה</h3>
                            </Button>
                            <Button className='rounded shadow col-4 center px-3 py-5 me-4'
                                // style={{ color: "#94db9f" }}
                                onClick={() => { navigate("/AddEndEditHotel"); handleClose(); }}>
                                <LocationCityIcon fontSize='large' />
                                <h3>בית מלון</h3>
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
            { !open && <HomePage/> }
        </div>):null
    
    );
}