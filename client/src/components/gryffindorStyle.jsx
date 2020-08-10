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
    backgroundColor: "#fdf6e4",
    color: "black",
    padding: "2px",
    height: "80px",
    fontFamily: "lemonada",
    border: "solid black 2px",
    boxShadow: "inset 0px 5px 25px 5px black, 5px 5px 12px 2px #dba800",
    marginBottom: "10px",
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
    height: 270,
    backgroundColor: "#740001",
    color: "#eeba30",
    border: "solid black 2px",
    marginBottom: "10px",
  },
}));

export default gryffindorStyle;
