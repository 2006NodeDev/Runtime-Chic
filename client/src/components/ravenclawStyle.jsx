import { makeStyles } from '@material-ui/styles';

export const ravenclawStyle = makeStyles((theme) => ({
    title:{
        // backgroundColor: 'white',
        padding : '2px',
        // border : 'solid black 2px',
        color : '#9d704e', //bronze
        fontSize : '30px',
    },
    message:{
        backgroundColor: 'white',
        color : 'black',
        padding : '2px',
        border : 'solid black 2px'
    },
    avatar: {
        backgroundColor: '#9d704e',
        color: '#0383ac', //blue
    },
    date:{
        color:'#eeba30',
    },
    root: {
        maxWidth: 600,
        backgroundColor: '#0d4a65',
        color: '#eeba30',
        border : 'solid black 2px'
    },
}));

export default ravenclawStyle;