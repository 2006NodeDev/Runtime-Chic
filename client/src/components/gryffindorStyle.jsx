import { makeStyles } from "@material-ui/styles";

export const gryffindorStyle = makeStyles((theme) => ({
  title: {
    // backgroundColor: 'white',
    padding: "2px",
    // border : 'solid black 2px',
    color: "#d3a625",
    fontSize: "30px",
  },
  message: {
    backgroundColor: "white",
    color: "black",
    padding: "2px",
    border: "solid black 2px",
  },
  avatar: {
    backgroundColor: "#d3a625",
    color: "#ae0001",
  },
  date: {
    color: "#eeba30",
  },
  root: {
    maxWidth: 500,
    height: 150,
    backgroundColor: "#740001",
    color: "#eeba30",
    border: "solid black 2px",
  },
}));

export default gryffindorStyle;
