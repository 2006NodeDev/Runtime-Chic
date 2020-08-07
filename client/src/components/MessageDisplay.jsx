import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import { useSelector } from 'react-redux';
import { gryffindorStyle } from "../components/gryffindorStyle";

const useStyles = makeStyles((theme) => ({
  //   title:{
  //     backgroundColor: 'white',
  //   },
  //   message:{
  //     backgroundColor: 'white',
  //   },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  subject: {
    direction: "flex",
    flexDirection: "row",
  },
  //   avatar: {
  //     backgroundColor: '#106944',
  //   },
  //   root: {
  //     maxWidth: 600,
  //     backgroundColor: '#ebf7fa',
  //     color: '#0b3f32',
  //   },
}));

export const MessageDisplay = (props) => {
  let classes = useStyles();
  // let classes = gryffindorStyle();
  // let character = gryffindorStyle();
  let character = gryffindorStyle();
  switch (props.user.house) {
    case 1:
      character = gryffindorStyle();
      console.log(`case: ${props.user.house}`);
      break;
    //   // case 2:
    //   //   classes = Slytherin();
    //   //   break;
    //   // case 3:
    //   //   classes = Ravenclaw();
    //   //   break;
    //   // case 4:
    //   //   classes = Hufflepuff();
    //   //   break;
    default:
    // classes = classes;
  }

  const [expanded, setExpanded] = React.useState(false);

  //   let currentUser = useSelector((state)=>{
  //     return state.loginState.currentUser
  //   })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="display">
      <Card className={character.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={character.avatar}>
              {props.user.house.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={`${props.user.userEmail}`}
          subheader={`${props.message.date}`}
        />
        <Typography className={character.subject}>Subject:</Typography>
        <Typography
          className={character.title}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {" "}
          {props.message.title}
        </Typography>
        <Typography className={character.message} paragraph>
          {props.message.message}
        </Typography>
        <Typography className={character.message} paragraph>
          {props.message.message}
        </Typography>
        {/* <CardContent className={classes.subject}>
          <Typography className={character.subject}>Subject:</Typography>
          <Typography className={character.title} variant="body1" color="textSecondary" component="p">
            {props.message.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* <Typography className={classes.title} paragraph>{props.message.title}</Typography> */}
        {/* <Typography className={character.message} paragraph>
              {props.message.message}
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    </div>
  );
};

export default MessageDisplay;
