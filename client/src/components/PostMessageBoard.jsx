import React, { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postMessage } from "../remote/postMessages"

const PostMessage = (props) => {

    const [inputs, setInputs] = useState({
        title: "",
        message: "",
    })

    const { title, message } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const currentUser = props.user;
    let dispatch = useDispatch()

    const submitMessage = async () => {
        console.log(`submitting a message from ${currentUser.userId}`)
        let userId = props.user.userId || 1
        let body = { userId, title, message }
        try{
            let thunk = await postMessage(body);
            dispatch(thunk);
            // const response = await fetch(`http://localhost:2007/board`, {
            //     method: "POST",
            //     headers: { 
            //         "Content-Type" : "application/json",
            //         "jwt_token": localStorage.token 
            //     },
            //     body: body,
            // });
            // const parseRes = await response.json();
            console.log('posting...');
        } catch (e) {
            console.log(`Error from PostMessage ${e}`)
        }
    }

    return(
        <div>
            <Nav />
            <h1 className="mt-5 text-center">Post a Message</h1>
            <form onSubmit={submitMessage} id='messageForm'>
                <input type='text' name='title' placeholder='title' value={title} onChange={(e) => onChange(e)}/><br/><br/>
                <textarea rows='3' className="form-control" name='message' placeholder='message' value={message} onChange={(e) => onChange(e)}/><br/><br/>

                <button className="btn btn-success" type='submit'>Submit</button>
            </form>
            <br/>
            <Link to="/messageboard">Back to Message Board</Link>
        </div>
    )
}
export default PostMessage
