import { makeStyles } from '@material-ui/styles';

export const hufflepuffStyle = makeStyles((theme) => ({
    title:{
        // backgroundColor: 'white',
        padding : '2px',
        // border : 'solid black 2px',
        color : '#9d704e', //lighter yellow
        fontSize : '30px',
    },
    message:{
        backgroundColor: 'white',
        color : 'black',
        padding : '2px',
        border : 'solid black 2px'
    },
    avatar: {
        backgroundColor: '#9d704e', //lighter yellow 
        color: '#0383ac', //lighter brown?
    },
    date:{
        color:'#ecb939', //dark yellow
    },
    root: {
        maxWidth: 600,
        backgroundColor: '#372e29', //darker brwon?
        color: '#ecb939', //dark yellow
        border : 'solid black 2px'
    },
}));

export default hufflepuffStyle;