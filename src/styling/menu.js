import { makeStyles } from "@material-ui/core/styles";

export const menuStyles = makeStyles(theme => ({
root: {
},
ruleMenu: {
    marginTop: "-1%",
    width: "250px",
    backgroundColor: "lightgrey",
    position: "fixed",
    left: "84%"
},
aboutMenu: {
    width: "350px",
    position: "relative",
    left: "25%",
    marginTop: "-25%"
},
    innerMenu: {
    backgroundColor: "black",
    background: "linear-gradient(#000, #062474)",
    color: "#90cccc",
    padding: "10px",
    boxShadow: "5px 10px 18px darkslategray" 
}
}));