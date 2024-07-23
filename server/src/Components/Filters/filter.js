import * as React from 'react';
import './filter.scss';
import { GetAllCategoty, GetCitiesByCategoty } from "../../Store/Services/filter";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Stack } from 'rsuite';


export default function Filter() {
    let nav = useNavigate();
    let [idOfCategoryFilter, setIdCategories] = React.useState([]);
    let country = useSelector(state => state.country.currentCountry);

    let [arrCategorys, setArrCategories] = React.useState([]);
    React.useEffect(() => {
        GetAllCategoty().then(res => {
            console.log("הקטגוריות שנשמרו הם", res.data)
            setArrCategories(res.data.filter(item => item.approved == true));
        }).catch(err => { console.log(err); alert("התרחשה שגיאה בקבלת הקטגוריות") })
    }, [])

    // פונקציה שבודקת מה בחר
    const handleChange = (e, item) => {
        console.log(e.target.checked, item)
        console.log(item.id)

        if (e.target.checked)
            setIdCategories(prevArray => [...prevArray, item.id]);
        else
            setIdCategories(prevArray => prevArray.filter(x => x != item.id));
    }

    //function - search cities by filter category
    const searchPlace = () => {
        console.log(idOfCategoryFilter)
        GetCitiesByCategoty(idOfCategoryFilter, country.id).then(res => {
            // שומר את שמות הערים שבהם נמצאות האטרקציות שבחר
            const names = [];
            res.data.forEach(innerArray => {
                innerArray.forEach(obj => {
                    names.push(obj);
                });
            });
            nav('/citiesByFilter', { state: { names } })
            console.log(names)
        })
    }

    return (<>
        <div className='filter'>
            <h2>עוזרים לך במציאת החופשה המתאימה ביותר ...</h2>
            <hr>{console.log(arrCategorys)}</hr>
            <ul>
                {
                    arrCategorys.map(item => <li key={item.id}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox name={item.nameCategory} onChange={(e) => { handleChange(e, item) }} />}
                                label={item.nameCategory}
                            />
                        </FormGroup>
                    </li>)
                }
            </ul>
            <Stack spacing={2} direction="row">
                <Button variant="contained" id="search-trip" onClick={() => { searchPlace() }}>חיפוש</Button>
            </Stack>
            {/* <input type="button" value="חיפוש" onClick={() => { searchPlace() }} /> */}
        </div>
    </>);
}