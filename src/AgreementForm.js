import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DateForm from './DateForm';
import TimeForm from './TimeForm';
import InformationForm from './InformationForm';
import ReviewForm from './ReviewForm';
import GlobalState from './GlobalState';
import AddressForm from './AddressForm';
import BookService from './services/BookService';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';

import HttpsIcon from '@material-ui/icons/Https';

import {BrowserView, MobileView, isMobile} from 'react-device-detect';

import logoImage from './images/logo.png';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import faq from './FAQ';
import { useEffect } from 'react';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
           <strong> Medical Express Clinic </strong> 
      </Link>{isMobile ? ' ' : ' All rights reserved.' }
   
       
 
     
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: 'center',
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px"
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px"
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
    
  },
  privacyButton: {
    marginBottom : "20px",
    width: "115px"
  },

  faqButton: {
    marginBottom : "20px",
    marginLeft : "10px",
    // backgroundColor : "#2f942e",
    // "&:hover": {
    //   background: "green",
    //   color: "#fff"
    // },
    textDecoration : "none !important",
    width: "115px"

  },

  getStartedButton: {
    marginTop : "30px",
    marginBottom : "10px",

},
textContent : {
    color : "#666f77",
    fontSize : "1rem",
    textAlign: "justify",
    paddingLeft: "8px",
    paddingRight: "20px",
    lineHeight: "2em",
    fontWeight : "400"
},

textContentMobile : {
  color : "#666f77",
  fontSize : "0.9rem",
  textAlign: "justify",
  paddingLeft: "8px",
  paddingRight: "20px",
  lineHeight: "2em",
  fontWeight : "400"
},

}));




export default function AgreementForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();


  //// ** Dialog

  const [check, setCheck] = React.useState({});

  const [error, setError] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [scrollFAQ, setScrollFAQ] = React.useState('paper');


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const descriptionElementRefFAQ = React.useRef(null);
  React.useEffect(() => {
    if (openFAQ) {
      const { current: descriptionElementFAQ } = descriptionElementRefFAQ;
      if (descriptionElementFAQ !== null) {
        descriptionElementFAQ.focus();
      }
    }
  }, [openFAQ]);


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClickOpenFAQ = (scrollType) => () => {
    setOpenFAQ(true);
    setScrollFAQ(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFAQ = () => {
    setOpenFAQ(false);
  };


  const checkClicked = (event, id) =>
  {
    switch (id)
    {
        case 1: 
            setCheck({...check, check1:event.target.checked});
            break;
        case 2: 
            setCheck({...check, check2:event.target.checked});
            break;
        case 3: 
            setCheck({...check, check3:event.target.checked});
            break;
        case 4: 
            setCheck({...check, check4:event.target.checked});
            break;
        case 5: 
            setCheck({...check, check5:event.target.checked});
        break;    
        default:
                break;

    }

  }

 const backButtonClicked = (event) =>
 {
     setState(state => ({...state, getStarted:false}));
 }


const getAgreeClicked = (event) => {

  setState(state => ({...state, agreed: true}));

    // if (check.check1 && check.check2 && check.check3 && check.check4 && check.check5)
    // {
    //     setState(state => ({...state, agreed: true}));
    // }
    // else
    // {
    //     setError(true);
    // }
}

useEffect( () => {
  if (check.check1 && check.check2 && check.check3 && check.check4 && check.check5)
  {
    setError(false);
  }
}, [check]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Typography
                style={{ fontWeight: "400" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                Medical Express Clinic
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <img
                className={classes.logoImage}
                src={logoImage}
                alt="logo image"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ marginBottom: "30px" }}
            component="h1"
            variant="h6"
            align="left"
          >
            Patients wishing to book an appointment must confirm that:
          </Typography>

          <ul style={{ fontSize: "1rem", color: "#333", textAlign: "left" }}>
            <li style={{ marginTop: "15px" }}>
              {`I am not displaying any symptoms of COVID-19 and have not recently been in close contact with a COVID-19 patient.`}
            </li>
            <li style={{ marginTop: "15px" }}>
              I am making an appointment for a blood test on a self-request
              basis. I have reviewed the{" "}
              <a
                href="https://www.blood.london/terms-and-condition/"
                target="_blank"
                style={{
                  fontWeight: "600",
                  textDecoration: "none",
                  color: "#111",
                }}
              >
                {" "}
                terms and conditions{" "}
              </a>{" "}
              of the service and am aware that I will receive the laboratory
              report for the selected test only. I consent for test results to
              be emailed to my booking email address without any review,
              comment, interpretation or advice from the doctor or the clinic.
            </li>
          </ul>

          <div
            style={{
              textAlign: "left",
              fontSize: "1.1rem",
              fontWeight: "700",
              textDecoration: "underline",
            }}
          >
            I am aware
          </div>

          <ul style={{ fontSize: "1rem", color: "#333", textAlign: "left" }}>
            <li style={{ marginTop: "15px" }}>
              Test results will be emailed to my booking email address without
              any review, comment, interpretation, advice on 
              <strong>suitability of the test</strong> , diagnosis or
              explanation of results from the doctor or the clinic.
            </li>
            <li style={{ marginTop: "15px" }}>
              Test results will be emailed to my booking email address 
              <strong>
                {" "}
                without any review, comment, interpretation or medical advice
                from the doctor or the clinic.
              </strong>
            </li>
            <li style={{ marginTop: "15px" }}>
              Of the pre-testing requirements for my selected diagnostic test.
              (Fasting, time of the day, etc.)
            </li>
            <li style={{ marginTop: "15px" }}>
              That this testing service  <strong>is not designed for clinically urgent
              cases</strong> as blood samples are referred to an external laboratory for
              analysis and reporting. <strong>Turnaround times listed on the website
              should be treated as a guideline to when patients should expect to
              receive results. </strong> Clinically urgent blood tests should only be
              ordered under the care of a registered medical practitioner, not
              on a self-request basis.
            </li>

            <li style={{ marginTop: "15px" }}>
            <strong>A blood draw fee of <span style={{color:"red"}}>£50</span> is payable upon booking your appointment, this will be deducted from the total cost of your service. </strong> 
              Urine tests, swab tests and full sexual health packages carry no blood draw fee, the £50 booking fee will be deducted from the total cost of your service.
            </li>

          </ul>

          {/* <Grid container  direction="column"  justify="flex-start" alignItems="flex-start" spacing={3}>

                <Grid item xs={12}  >

                        <FormControlLabel 
                            control={<Checkbox  color="primary" name="check1" checked={check.check1} onChange={(event => checkClicked(event,1))} />}
                            label={<span style={{ fontSize: '1rem' }}>{`I do not have a fever`} 
                            </span>}
                        />
                </Grid>

                <Grid item xs={12}  >

                        <FormControlLabel
                                    control={<Checkbox color="primary" name="check2"checked={check.check2} onChange={(event => checkClicked(event,2))} />}
                                    label={<span style={{ fontSize: '1rem' }}>{`I do not have a new, continuous cough`} 
                                    </span>}
                                />
                </Grid>

                <Grid item xs={12}  >

                    <FormControlLabel
                                control={<Checkbox color="primary" name="check3" checked={check.check3} onChange={(event => checkClicked(event,3))} />}
                                label={<span style={{ fontSize: '1rem' }}>{`I do not have shortness of breath`} 
                                </span>}
                            />
                    </Grid>

                
                <Grid item xs={12}  >

                    <FormControlLabel style={{ fontSize: '1rem', textAlign:"justify" }}
                                control={<Checkbox color="primary" name="check4" checked={check.check4} onChange={(event => checkClicked(event,4))}  />}
                                label={<span style={{ fontSize: '1rem', textAlign:"left" }}>{`I have not been in contact with someone suspected or known to have coronavirus`} 
                                </span>}
                            />
                    </Grid>

                    <Grid item xs={12}  >

                        <FormControlLabel style={{ fontSize: '1rem', textAlign:"justify" }}
                                    control={<Checkbox color="primary" name="check5" checked={check.check5} onChange={(event => checkClicked(event,5))}  />}
                                    label={<span style={{ fontSize: '1rem', textAlign:"left" }}>
                                      {
                                      `I am making an appointment for a blood test on a self-request basis. I am aware that I will receive the laboratory report for the selected test only and I consent for test results to be emailed to my booking email address without any review, comment, interpretation or advice from the doctor or the clinic.`
                                      } 
                                    </span>}
                                />
                        </Grid>

                </Grid> */}

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
            style={{
              background: "#ffe8e8",
              color: "#990000",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            If you cannot confirm all the point stated above, you must not
            proceed any further. Please click the "Agree" button to agree to
            these terms.
          </p>

          {error && (
            <Alert severity="error">
              You need to check all the terms to proceed!{" "}
            </Alert>
          )}

          {/* <Button 
                // variant="contained" 
                className={classes.getStartedButton} 
                style = {{marginRight : "20px"}}
                color="default"
                onClick={backButtonClicked}
                onTouchTap={backButtonClicked} 
                >
        Back
        </Button> */}

          <Button
            variant="contained"
            className={classes.getStartedButton}
            color="primary"
            onClick={getAgreeClicked}
            onTouchTap={getAgreeClicked}
          >
            Agree
          </Button>
        </Paper>

        <Button
          variant="contained"
          className={classes.privacyButton}
          color="secondary"
          startIcon={<HttpsIcon />}
          onClick={handleClickOpen("paper")}
          onTouchTap={handleClickOpen("paper")}
        >
          Privacy
        </Button>

        <Button
          variant="contained"
          className={classes.faqButton}
          color="secondary"
          startIcon={<LiveHelpIcon />}
          onClick={handleClickOpenFAQ("paper")}
          onTouchTap={handleClickOpenFAQ("paper")}
        >
          FAQ
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">PRIVACY NOTICE</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div
                style={{ textAlign: "justify", padding: "0px", color: "#333" }}
              >
                <p>
                  Medical Express Clinic collects and holds the personal data of
                  patients registered at the clinic so as to provide safe and
                  effective ongoing care for our patients.
                </p>
                <p>
                  Medical records are kept confidentially and securely under
                  lock and key or securely on our server. They are primarily
                  used for the safe and effective delivery of care.
                </p>
                <p>
                  Your medical record may be subject to clinical audit and
                  management review in order for Medical Express Clinic to
                  maintain and improve our provision of care.
                </p>
                <p>
                  Please review our Patient Information handout, given to you
                  prior to registration for more information.
                </p>
                <p>
                  If you would like to review a full copy of our Privacy and
                  Decency Policy, please ask at reception.
                </p>
                <p>Thank you</p>
                <p>Medical Express Clinic</p>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openFAQ}
          onClose={handleCloseFAQ}
          scroll={scrollFAQ}
          aria-labelledby="scroll-dialog-title-FAQ"
          aria-describedby="scroll-dialog-description-FAQ"
        >
          <DialogTitle id="scroll-dialog-title">FAQ</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description-FAQ"
              ref={descriptionElementRefFAQ}
              tabIndex={-1}
            >
              <div style={{ textAlign: "justify", padding: "10px" }}>
                {faq.map((element) => (
                  <React.Fragment>
                    <p
                      style={{
                        borderLeft: "4px solid red",
                        background: "#eee",
                        fontWeight: "600",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        lineHeight: "30px",
                      }}
                    >
                      <span style={{ color: "red", fontSize: "24px" }}>
                        {" "}
                        Q.{" "}
                      </span>
                      {element.question}
                    </p>

                    <p
                      style={{
                        borderLeft: "4px solid #999",
                        background: "#fff",
                        fontWeight: "400",
                        color: "#555",
                        paddingLeft: "10px",
                        paddingRight: "30px",
                        lineHeight: "50px",
                      }}
                    >
                      <span style={{ color: "#555", fontSize: "24px" }}>
                        {" "}
                        A.{" "}
                      </span>
                      {element.answer}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFAQ} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Copyright />
      </main>
    </React.Fragment>
  );
}