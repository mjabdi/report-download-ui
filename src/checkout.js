import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import DateForm from "./DateForm";
import TimeForm from "./TimeForm";
import InformationForm from "./InformationForm";
import ReviewForm from "./ReviewForm";
import GlobalState from "./GlobalState";
import AddressForm from "./AddressForm";
import BookService from "./services/BookService";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import HttpsIcon from "@material-ui/icons/Https";

import { BrowserView, MobileView, isMobile } from "react-device-detect";

import ValidateStep from "./Validation";

import MobileStepper from "./MobileStepper";

import logoImage from "./images/logo.png";
import { Grid } from "@material-ui/core";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ResultsForm from "./ResultsForm";

import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import faq from "./FAQ";
import dateformat from "dateformat";
import PackageForm from "./PackageForm";
import PayForm from "./PayForm";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="#">
        <strong> Medical Express Clinic </strong>
      </Link>
      {isMobile ? " " : " All rights reserved."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: "center",
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: "300px",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: theme.spacing(2),
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
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px",
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px",
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
  },

  privacyButton: {
    marginBottom: "20px",
    width: "115px",
  },

  faqButton: {
    marginBottom: "20px",
    marginLeft: "10px",
    // backgroundColor : "#2f942e",
    // "&:hover": {
    //   background: "green",
    //   color: "#fff"
    // },
    textDecoration: "none !important",
    width: "115px",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));



export default function Checkout() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [scrollFAQ, setScrollFAQ] = React.useState("paper");

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


  const steps = state.urlPackageName ?  
  [
    "Appoinment Date",
    "Appoinment Time",
    "Basic Info",
    "Review",
  ]
  :  [
    "Appoinment Date",
    "Appoinment Time",
    "Package",
    "Basic Info",
    "Review",
  ];
  
  function getStepContent(step) {
    if (state.urlPackageName)
    {
      switch (step) {
        case 0:
          return <DateForm />;
        case 1:
          return <TimeForm />;
        case 2:
          return <InformationForm />;
        case 3:
          return <ReviewForm />;
        case 4:
            return <PayForm />;
    
        default:
          throw new Error("Unknown step");
      }
    }else
    {
      switch (step) {
        case 0:
          return <DateForm />;
        case 1:
          return <TimeForm />;
        case 2:
          return <PackageForm />;
        case 3:
          return <InformationForm />;
        case 4:
          return <ReviewForm />;
        case 5:
            return <PayForm />;
        default:
          throw new Error("Unknown step");
      }
    }
  }

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

  /////****************** */

  // const [activeStep, setActiveStep] = React.useState(0);

  const setActiveStep = (step) => {
    setState((state) => ({ ...state, activeStep: step }));
  };

  const [submiting, setSubmiting] = React.useState(false);

  const maxSteps = steps.length;

  const submitForm = () => {
    var promiseArray = [];

    BookService.getNewReference()
      .then((res) => {
        const ref = res.data.ref;

        setState((state) => ({ ...state, ref: ref }));

        let referrer = window.location.pathname;
        if (referrer && referrer.startsWith("/id")) {
          referrer = "/";
        }

        const personInfo = {
          fullname: state.fullname,
          email: state.email || '',
          phone: state.phone || '',
          birthDate: state.birthDate,
          notes: state.notes || '',
          packageName : state.packageName,
          indivisualTests: state.indivisualTests && state.indivisualTests.length > 0 ? JSON.stringify(state.indivisualTests) : null,
          estimatedPrice: state.totalPrice || '',
          doctorConsultation : state.check_withgp || false,
          gender: state.gender,
          smsPush: state.smsPush
        };

        const promise = BookService.bookAppointment({
          ...personInfo,
          bookingDate: dateformat(
            new Date(state.bookingDate.toUTCString().slice(0, -4)),
            "yyyy-mm-dd"
          ),
          bookingTime: state.bookingTime,
          bookingRef: ref,
          referrer: referrer,
        });
        promiseArray.push(promise);

        Promise.all(promiseArray)
          .then((values) => {
            setState((state) => ({ ...state, finalResults: values }));

            setSubmiting(false);
            setActiveStep(state.activeStep + 1);
          })
          .catch((errs) => {
            console.log(`Error :  ${errs}`);
            setSubmiting(false);
          });
      })
      .catch((err) => {
        console.log(`Cannot Get REF NO. : ${err}`);
        setSubmiting(false);
      });
  };

  const proceedToSubmit = () => {
    setState((state) => ({ ...state, proceedToSubmit: true }));
    setActiveStep(4);
  };

  const handleNext = async () => {
    // if (state.activeStep === steps.length - 1) {
    //   // if (!state.dataConfirmed)
    //   // {
    //   //   setState(state => ({...state, dataConfirmedError : true }));
    //   //   return;
    //   // }

    //   // setSubmiting(true);
    //   // submitForm();
    // } else 

    setSubmiting(true)

    const isValid = await ValidateStep(state, setState, state.activeStep, state.urlPackageName ? true : false)

    setSubmiting(false)
    
    if (isValid) {
      setActiveStep(state.activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(state.activeStep - 1);
  };

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
          {state.activeStep <= 3 && (
            <Typography component="h1" variant="h6" align="center">
              Book Appointment Online
            </Typography>
          )}

          <React.Fragment>
            {state.activeStep < steps.length ? (
              <React.Fragment>
                <BrowserView>
                  <Stepper
                    activeStep={state.activeStep}
                    className={classes.stepper}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </BrowserView>

                <MobileView>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="progress"
                    activeStep={state.activeStep}
                  />
                </MobileView>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </React.Fragment>

          {/* <PersonsBox/> */}

          <React.Fragment>
            {state.activeStep === steps.length + 1 ? (
              <ResultsForm />
            ) : (
              <React.Fragment>
                {getStepContent(state.activeStep)}
                <div className={classes.buttons}>
                  {state.activeStep !== 0 && (
                    <Button
                      disabled={submiting}
                      onClick={handleBack}
                      onTouchTap={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                  )}

                  {(state.activeStep === 2 || state.activeStep === 3) &&
                    state.persons &&
                    state.persons.length >= 1 && (
                      <Button
                        // variant="contained"
                        color="secondary"
                        onTouchTap={proceedToSubmit}
                        onClick={proceedToSubmit}
                        className={classes.button}
                      >
                        Skip to Submit
                      </Button>
                    )}

                  {state.activeStep <= steps.length - 1 && (
                    <Button
                      disabled={
                        submiting ||
                        (state.activeStep === steps.length - 1 && !state.bookingRef)
                      }
                      variant="contained"
                      color="primary"
                      onTouchTap={handleNext}
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {state.activeStep === steps.length - 1
                        ? "Proceed to Payment"
                        : "Next"}
                    </Button>
                  )}

                </div>
              </React.Fragment>
            )}
          </React.Fragment>
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
                  maintain and improve our provision of care. Medical records
                  are never used for marketing purposes or shared with any
                  person/business/organisation save for disclosures required by
                  law.
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

        <Backdrop className={classes.backdrop} open={submiting}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Copyright />
      </main>
    </React.Fragment>
  );
}
