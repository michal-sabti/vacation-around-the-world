import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function IconCheckboxes() {

  return (<>
    {/* //לב */}
    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />

    {/* //כוכבים */}
    <Stack spacing={2}>
      <Rating name="half-rating" precision={0.5} />
    </Stack>

    {/* //טווח מחירים */}
    <Paper sx={{ p: '2px 5px', display: 'flex', alignItems: 'center', width: 250 }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="מחיר מקסימאלי לנופש" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  </>
  );
}




//------------------------------- שם וסיסמה -----------------------------

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  return (
    <Box>
      <FormControl sx={{ m: 1, width: '25ch' }} >
        <InputLabel>סיסמה</InputLabel>
        <OutlinedInput
          type={showPassword ? 'password' : 'text'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: '25ch' }} >
        <InputLabel>שם</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          }
          label="name"
        />
      </FormControl>
    </Box>
  );
}