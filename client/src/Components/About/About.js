import { GetAbout, UpdateAbout } from "../../Store/Services/about"
import * as React from 'react';
import "./About.scss"
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
export default function About() {
    let { register, handleSubmit, formState: { errors } } = useForm({ mode: "onSubmit" });
    let [about, setAbout] = React.useState();
    let [keyOfPar, setKey] = React.useState(0);
    let [content, setContent] = React.useState();
    let user = useSelector(state => state.user.currentUser);
    const saveUpdates = (update) => {
        update = {
            ...update,
            idabout: keyOfPar
        }
        UpdateAbout(update).then((res) => {
            alert(res.data.message)
            setKey(0);
            setContent();
        }).catch(err => err.message)
        console.log(update)

    }

    React.useEffect(() => {
        GetAbout().then((res) => {
            setAbout(res.data)
        }).catch(err => err.message)
    }, [])
    return (<>
        <div id="about-div">
            <img src="/gif10.jpg" id="gif-about"/>

            <h2 className="class-h2">קצת עלינו <span>«</span></h2>
            {console.log(about)}
            {about?.map((item) => (<div key={item.idabout}>
                <h4>{item.content}</h4>
                {user?.kindUser == 3 ? <input type="button" value="עדכון פיסקה" onClick={() => { setKey(item.idabout); setContent(item.content); }} /> : null}
            </div>))}
        </div>
        <div className={keyOfPar == 0 ? "before modal" : "after modal"}>
            <form className="modal-content" onSubmit={handleSubmit(saveUpdates)}>
                <span class="close" >&times;</span>
                <label>paragraph</label><br />
                <input type="text" className="title" defaultValue={" 8"}{...register("title", { require: true })} /><br />
                <label>content</label><br />
                <input type="text" className="content" defaultValue={content}{...register("content", { require: true })} /><br />
                {/* <input type="submit" value="עדכן"></input> */}
            </form>
        </div>

    </>)
}



