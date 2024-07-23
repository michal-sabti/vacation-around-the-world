// import * as React from 'react';
// import CreateIcon from '@mui/icons-material/Create';
// import IconButton from '@mui/material/IconButton';
// import "./siteManager.scss";
// import NavBar from '../NavBar';

// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import Stack from '@mui/material/Stack';
// import CanvasJSReact from '@canvasjs/react-charts';
// import { HotelComments5Stars, TripComments5Stars } from '../../Store/Services/siteManager';
// import { useEffect } from 'react';
// import { useState } from 'react';
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// export default function ChangLook() {

//     const changeColor = (e) => {
//         console.log(e.target.value)
//         let bg = e.target.value;
//     }
//     const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

//     const handleFormat = (event, newFormats) => {
//         setFormats(newFormats);
//     };

//     const [alignment, setAlignment] = React.useState('left');

//     const handleChange = (event, newAlignment) => {
//         setAlignment(newAlignment);
//     };

//     const children = [
//         <ToggleButton value="left" key="left">
//             <FormatAlignLeftIcon />
//         </ToggleButton>,
//         <ToggleButton value="center" key="center">
//             <FormatAlignCenterIcon />
//         </ToggleButton>,
//         <ToggleButton value="right" key="right">
//             <FormatAlignRightIcon />
//         </ToggleButton>,
//         <ToggleButton value="justify" key="justify">
//             <FormatAlignJustifyIcon />
//         </ToggleButton>,
//     ];

//     const control = {
//         value: alignment,
//         onChange: handleChange,
//         exclusive: true,
//     };

//     return (<>
//         <ToggleButtonGroup
//             value={formats}
//             onChange={handleFormat}
//             aria-label="text formatting"
//         >
//             <ToggleButton value="bold" aria-label="bold">
//                 <FormatBoldIcon />
//             </ToggleButton>
//             <ToggleButton value="italic" aria-label="italic">
//                 <FormatItalicIcon />
//             </ToggleButton>
//             <ToggleButton value="underlined" aria-label="underlined">
//                 <FormatUnderlinedIcon />
//             </ToggleButton>
//             <ToggleButton value="color" aria-label="color" disabled>
//                 <FormatColorFillIcon />
//                 <ArrowDropDownIcon />
//             </ToggleButton>
//         </ToggleButtonGroup>


//         <IconButton id="chang-look">
//             <CreateIcon />
//         </IconButton>
//         <input type="color" onChange={(e) => changeColor(e)}></input>

//         <Stack spacing={2} alignItems="center">
//             <ToggleButtonGroup {...control} aria-label="Medium sizes">
//                 {children}
//             </ToggleButtonGroup>
//         </Stack>
//     </>)
// }