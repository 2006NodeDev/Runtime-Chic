import { makeStyles } from '@material-ui/styles';

export const slytherinStyle = makeStyles((theme) => ({
    title:{
        // backgroundColor: 'white',
        padding : '2px',
        // border : 'solid black 2px',
        color : '#aaaaaa', //light grey
        fontSize : '30px',
    },
    message:{
        backgroundColor: 'white',
        color : 'black',
        padding : '2px',
        border : 'solid black 2px'
    },
    avatar: {
        backgroundColor: '#aaaaaa',//light grey
        color: '#2a623d', //green
    },
    date:{
        color:'#5d5d5d', //dark grey
    },
    root: {
        maxWidth: 600,
        backgroundColor: '#1a472a', //dark green
        color: '#5d5d5d', //dark grey
        border : 'solid black 2px'
    },
}));

export default slytherinStyle;