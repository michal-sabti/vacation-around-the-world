import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from "@mui/material";
import { useEffect } from "react";
import FormInput from "./formInput";
import Password from "./password";

const schema = yup.object({
    name: yup.string().required("שדה זה חובה").min(2, 'שם אינו תקין').max(50, 'שם ארוך מידי'),
    phone: yup.string().required("שדה זה חובה").min(9, 'מספר הפלאפון אינו תקין').max(10, 'מספר הפלאפון אינו תקין'),
    email: yup.string().email("כתובת מייל אינה תקינה").required("שדה זה חובה"),
   
}).required();

const ManagerDetails = ({ onSubmit, type}) => {
    const dispatch = useDispatch();
    const [u, setU] = React.useState(null);
    const [arr, setArr] = React.useState([]);
    const user = useSelector(state => state.user.currentUser);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { user }
    });
    useEffect(() => {
        if (user) {
            arr.forEach(x => setValue(x.name, user[x.name]))
        }
    }, [user]);

    React.useEffect(() => {
        const a = [{ lableName: "שם פרטי", name: "name", type: "text" },
        { lableName: "מספר טלפון", name: "phone", type: "text" },
        { lableName: "דואר אלקטרוני", name: "email", type: "mail" }];
        setArr(a);
        
        if (user) {
            let u2 = {...user};
            setU({...u2});
        }
    }, [user])

    const onSubmit2 = (data) => {
        console.log(data,"data");
        console.log(type)
        
        if (type == "edit") {
            data.id = user.id;
            data.status = user.status;
        }
        delete data.user;
        data.id = user.id;
        console.log(data,"da")
        onSubmit(data);
    }

    return <form onSubmit={handleSubmit(onSubmit2)} className="container">
        <br /> <p>רגע לפני שמייצרים את האטרקציה, הכנס את פרטיך:</p> <br />
        <div className="row gx-0">
            <div className="col-md-6">
                {arr.map(item => <React.Fragment key={item.name}> {item.name != "password" ? <FormInput
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    user={u}
                    flag={false} /> :null
                   }
                </React.Fragment>
                )}
            </div>
            <div className="col-md-5 overflow-hidden" style={{ height: "70vh" }}>
                {/* <img src="pic/1.jpg" className="w-100 h-100 rounded" /> */}
                <img src="pic/8.jpg" className="w-100 h-100 rounded" />
            </div>
        </div>

        <div className="text-start" style={{ position: "relative", top: "80px" }}>
            <Button variant="contained"
                style={{ background: "#94db9f" }}
                size="medium" type="submit">
                להמשיך לשלב הבא </Button>
        </div>
    </form>
}
export default ManagerDetails;