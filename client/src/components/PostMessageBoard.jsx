import React, { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Message } from "../models/Messages";
import { postMessageActionMapper } from "../action-mappers/postMessage-action-mapper";

const PostMessage = (props) => {

    let[message, changeMessage] = useState('')
    let[title, changeTitle] = useState('')

    const updateMessage = (e) => {
        e.preventDefault()
        changeMessage(e.currentTarget.value)
    }

    const updateTitle = (e) => {
        e.preventDefault()
        changeTitle(e.currentTarget.value)
    }
;
//   let currentUser = useSelector((state)=>{
//     return state.loginState.currentUser
//   })

    let dispatch = useDispatch()

    const submitMessage = async () => {
        let newMessage = new Message()
        newMessage.userId = 2;
        newMessage.message = message;
        newMessage.title = title;
        try{
            let thunk = await postMessageActionMapper(newMessage);
            dispatch(thunk);
            console.log('posting...');
        } catch (e) {
            console.log(`Error from PostMessage ${e}`)
        }
    }

    return(
        <div>
            <Nav />
            <h1 className="mt-5 text-center">Post a Message</h1>
                <input type='text' name='title' placeholder='title' value={title} onChange={updateTitle}/><br/><br/>
                <textarea rows='3' className="form-control" name='message' placeholder='message' value={message} onChange={updateMessage}/><br/><br/>
                <button className="btn btn-success" type='submit' onClick={submitMessage} >Submit</button>
            <br/>
            <Link to="/messageboard">Back to Message Board</Link>
        </div>
    )
}
export default PostMessage
