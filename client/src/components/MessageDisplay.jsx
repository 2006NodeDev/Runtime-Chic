import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    backgroundColor: '#ebf7fa',
    color: '#0b3f32',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#106944',
  },
}));

export const UserDisplay = (props)=>{
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

//   let currentUser = useSelector((state)=>{
//     return state.loginState.currentUser
//   })

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div className='display'>
      <Card className={classes.root}> 
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.user.house.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={`${props.message.title}`}
          subheader={props.message.date}
        />
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
            <Typography paragraph>Message:</Typography>
            <Typography paragraph>
              {props.message.message}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}