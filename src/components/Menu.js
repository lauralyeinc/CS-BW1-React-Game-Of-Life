import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import About from './About.js';
import rules from './rules';
import { menuStyles } from "../styling/menu.js"; 

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
        borderBottom: 0,
        },
        '&:before': {
        display: 'none',
        },
        '&$expanded': {
        margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);
    
const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        minHeight: 56,
        '&$expanded': {
        minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
        margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);
    
const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function Menu() {

    const classes = menuStyles();

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={classes.aboutMenu}>
        <Accordion className={classes.innerMenu} square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography style={{ fontWeight: "bold" }}>About</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              {/* About Component */}
                <About />
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion className={classes.innerMenu} square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography style={{ fontWeight: "bold" }}>Rules</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              {/* Rules Component */}
                <Rules />
            </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    );
}