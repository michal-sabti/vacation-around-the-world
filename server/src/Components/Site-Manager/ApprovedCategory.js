import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { GetUnapprovedCategories, UpdateCategoryToApproved } from '../../Store/Services/siteManager';
import { GetAllCategoty } from '../../Store/Services/filter';
import "./ApprovedCategory.scss";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import ListSubheader from '@mui/material/ListSubheader';
import { Button } from '@mui/material';

export const ApprovedCategory = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nameCategory', headerName: 'שם', width: 130 },
    {
      field: 'status', headerName: 'סטטוס', width: 130,
      valueGetter: (params) =>
        `${params.row.approved == 1 ? 'טופל' : 'לא טופל'}`
    },
    { field: 'approved', headerName: '', width: 130 },
  ];

  let [unapprovedCategory, setUnapprovedCategory] = React.useState([]);
  let [category, setCategory] = React.useState([]);
  let [categoryChoosen,setCategoryChoosen]=React.useState([]);


  React.useEffect(() => {
    GetAllCategoty().then(res => {
      console.log(res.data,"all categoty")
      setCategory(res.data.filter(item => item.approved == true));
      setUnapprovedCategory(res.data.filter(item => item.approved == false));
    }).catch(err => err.message)
  }, [])

  const UpdateCategory = () => {
    UpdateCategoryToApproved(categoryChoosen).then(res => {
      console.log(res);
    }).catch(err => err.message);
     const arr=[...categoryChoosen]
     console.log(arr)
     let a=[];
     let temp = [...unapprovedCategory];
    for(let i in arr){
      console.log(i,"i")
      let b=unapprovedCategory.filter(item=>item.id==arr[i]);
      a=[...a,...b];
      console.log(a)
      temp = temp.filter(item=>item.id!=arr[i]);
    
    console.log("after",arr[i])
    console.log(unapprovedCategory)
    }
    setUnapprovedCategory(temp)
    setCategory([...category,...a])
  }

  function renderRow(props) {
    console.log(props)
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={category[index].nameCategory} />
        </ListItemButton>
      </ListItem>
    );
  }
  const handleChange=(e)=>{
    console.log(e,"e")
    console.log(e.rowSelection)
    setCategoryChoosen(e.rowSelection);
    console.log(categoryChoosen);
  }
  return (<>

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={unapprovedCategory}
        // getRowId={(row) => row.id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        
        checkboxSelection 
        onStateChange={(e)=>{ handleChange(e) }}
        
      />
      <Button id="button" onClick={()=>UpdateCategory()}>אשר העלאת קטגוריה</Button>
    </div>
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <ListSubheader>{`קטגוריות טיולים קיימות:`}</ListSubheader>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={category.length}
        overscanCount={5}
      >

        {renderRow}
      </FixedSizeList>
    </Box>


  </>)
}