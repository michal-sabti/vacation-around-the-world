import * as React from 'react';
import "./siteManager.scss";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router-dom';
import { ApprovedCategory } from './ApprovedCategory';
import ShowAllUsers from './Users/ShowAllUsers';
import { AllTheReports } from './AllTheReports';
import UploadRequest from './UploadRequest';


export default function ViewAllRequests() {
  let nav = useNavigate();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (<>
    <h2 className="class-h2"> פניות משתמשים <span>«</span></h2>

    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="אישור הוספת קטגוריה" value="1" />
            <Tab label="אישורי העלאה" value="2" />
            <Tab label="חסימת משתמש" value="3" />
            <Tab label="חוות דעת" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ApprovedCategory />
        </TabPanel>
        <TabPanel value="2"><UploadRequest /></TabPanel>
        <TabPanel value="3" id="tabPanel"> <ShowAllUsers /> </TabPanel>
        <TabPanel value="4" id="tabPanel"> <AllTheReports /> </TabPanel>
      </TabContext>
    </Box>
  </>)
}