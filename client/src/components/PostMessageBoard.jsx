import React, { useState } from "react";
import { Message } from "../models/Messages";
import { useDispatch } from "react-redux";
import { postMessage } from "../remote/postMessages"

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

    const currentUser = props.user;
//   let currentUser = useSelector((state)=>{
//     return state.loginState.currentUser
//   })

    let dispatch = useDispatch();

    const submitMessage = async () => {
        console.log(`submitting a message from ${currentUser.userId}`)
        let newMessage = new Message()
        // newMessage.userId = currentUser.userId;
        newMessage.message = message;
        newMessage.title = title;
        try{
            let thunk = await postMessage(newMessage);
            dispatch(thunk);
        } catch (e) {
            console.log(`Error from PostMessage ${e}`)
        }
    }

    return(
        <div>
            <h1 className="mt-5 text-center">Post a Message</h1>
            <form onSubmit={submitMessage} id='messageForm'>
                <input type='text' name='title' placeholder='title' value={title} onChange={updateTitle}></input><br/><br/>
                <textarea rows='3' className="form-control" name='message' placeholder='message' value={message} onChange={updateMessage}></textarea><br/><br/>

                <button className="btn btn-success" type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default PostMessage
