import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Message } from "../../models/Message";
import '../../App.css'

const useStyles = makeStyles((theme) => ({
    root:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFieldTitle: {
        alignSelf: 'center',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        paddingRight: 1,
        paddingLeft:2,
        marginTop: 0,
        fontWeight: 500
    },
    textFieldMessage: {
        alignSelf: 'center',
        width: '75%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        paddingRight: 1,
        paddingLeft:2,
        marginTop: 0,
        fontWeight: 500
    },
}))

const PostMessage = (props) => {

    let[message, changeMessage] = useState('')
    let[title, changeTitle] = useState('')

    const classes = useStyles();

    const updateMessage = (e) => {
        e.preventDefault()
        changeMessage(e.currentTarget.value)
    }

    const updateTitle = (ey) => {
        e.preventDefault()
        changeTitle(e.currentTarget.value)
    }

    const submitMessage = async (e) => {
        e.preventDefault()
        let newMessage = {
            userId: currentUser.userId,
            message,
            title,
            email:currentUser.email,
        }
        try{
            // await newMessageServer(newMessage)
        } catch (e) {
            console.log(`Error from PostMessage ${e}`)
        }

        props.history.push(`/MessageBoard`)
    }

    return(
        <div className={classes.root}>
            <form onSubmit={submitMessage}>
                <TextField className={classes.textFieldTitle} label='title' value={title} onChange={updateTitle}></TextField>
                <TextField className={classes.textFieldMessage} label='message' value={message} onChange={updateMessage}></TextField>

                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    )
}
export default PostMessage