import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GlobalState from "./GlobalState";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { faPoundSign } from "@fortawesome/free-solid-svg-icons";
import { faVial } from "@fortawesome/free-solid-svg-icons";


import dateFormat from "dateformat";
import { Button, Checkbox, Chip, FormControlLabel } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Icon from "@material-ui/core/Icon";
import dateformat from "dateformat";

import Fade from "react-reveal/Fade";

import { calculatePrice, calculateTotalPrice } from "./PriceCalculator";

import ValidateStep from "./Validation";
import { FormatDateFromString } from "./DateFormatter";

import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import BookService from "./services/BookService";
import Alert from "@material-ui/lab/Alert";

import {Packages, Packages2} from './PackageForm'

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "#fff",
    border: `1px solid #ddd`,
    borderRadius: "5px",
    color: "#555",
    padding: "30px 0px 15px 20px",
    textAlign: "justify",
    marginTop: "20px",
    position: "relative",
  },

  boxTime: {
    backgroundColor: "#fff",
    border: `1px solid #ddd`,
    borderRadius: "5px",
    color: "#333",
    padding: "30px 20px 0px 20px",
    textAlign: "justify",
    marginTop: "20px",
    position: "relative",
  },

  boxTitle: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "10px",
    top: -20,
    left: 10,
    color: theme.palette.primary.main,
    fontWeight: "500",
  },

  boxRed: {
    backgroundColor: "#dc2626",
    color: "#fff",
    padding: "1px",
    borderRadius: "4px",
    textAlign: "justify",
    paddingRight: "40px",
  },

  boxInfo: {
    textAlign: "justify",
    backgroundColor: "#fafafa",
    color: "#333",
    // padding : "1px",
    borderRadius: "4px",
    // paddingRight: "40px",
    border: "1px solid #eee",
  },

  ul: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },

  li: {
    marginBottom: "15px",
    fontSize: "0.95rem",
  },

  icon: {
    marginRight: "10px",
    fontSize: "1.1rem",
    // color: theme.palette.primary.main,
    color: "#777",
    float: "left",
  },

  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },

  infoDetails: {
    textAlign: "left",
  },

  infoTitle: {
    fontWeight: "800",
    float: "left",
    width: "120px",
  },

  infoData: {
    fontWeight: "400",
  },

  infoTitleTime: {
    fontWeight: "800",
    float: "left",
    marginRight: "10px",
  },

  infoDataTime: {
    fontWeight: "600",
  },

  title: {
    textAlign: "left",
    fontWeight: "500",
    // marginBottom: "5px",
    marginTop: "5px",
    padding: "10px",
    borderRadius: "4px",
  },

  Accordion: {
    backgroundColor: "#f5f5f5",
    color: "#111",
  },

  terms: {
    fontWeight: "500",
    textAlign: "justify",
    marginTop: "10px",
    padding: "10px",
  },

  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },

  AddAnother: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },

  infoDataPrice: {
    color: theme.palette.secondary.main,
    fontWeight: "600",
  },
}));

export default function ReviewForm() {
  const classes = useStyles();

  const [state, setState] = React.useContext(GlobalState);

  const [totalPrice, setTotalPrice] = React.useState(0);

  const [expanded, setExpanded] = React.useState("panel10");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state.urlPackageName)
    {
      calculatePackage()
     
    }else
    {
      calculatePrice();
    }
  
  }, []);

  const calculatePackage = () =>
  {
    Packages.forEach(item => {
      if (item.title.toLowerCase() === state.urlPackageName)
      {
        setState((state) => ({
          ...state,
          packagePrice:  item.malePrice === item.femalePrice ? `${item.malePrice}`  :  `${item.malePrice}(Male) - ${item.femalePrice}(Female)`,
          packageName: item.packageName
        }));
      }
    })

    Packages2.forEach(item => {
      if (item.title.toLowerCase() === state.urlPackageName)
      {
        setState((state) => ({
          ...state,
          packagePrice: item.price,
          packageName: item.packageName
        }));
      }
    })
  }

  const calculatePrice = () => {
    let price = 0;
    if (state.indivisualTests && state.indivisualTests.length > 0) {
      state.indivisualTests.forEach(item => {
        price += item.price
      });
    }

    if (state.packagePrice)
    {
      price += parseFloat(state.packagePrice.substr(1))
    }

    if (state.check_withgp)
    {
      price += 150;
    }

    setState((state) => ({
      ...state,
      totalPrice: price > 0 ? price.toLocaleString("en-GB", { style: 'currency', currency: 'GBP' }) : null,
    }));

  };

  const dataConfirmedChanged = (event) => {
    setState((state) => ({ ...state, dataConfirmed: event.target.checked }));
    if (event.target.checked) {
      setState((state) => ({ ...state, dataConfirmedError: false }));
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.pageTitle}>
        Review Your Data
      </Typography>

      <Fade down>
        <div>
          <Alert
            severity="info"
            style={{
              marginBottom: "15px",
              fontSize: "0.95rem",
              lineHeight: "1.5rem",
              textAlign: "justify",
            }}
          >
            You can always change or cancel your appointment up-to 24 hours to
            your appointment with ease through your patient portal
             {/* (only if you
            have entered your email address in the previous step) */}
          </Alert>
        </div>

        <div>
          <Alert
            severity="error"
            style={{
              marginBottom: "15px",
              fontSize: "0.95rem",
              lineHeight: "1.5rem",
              textAlign: "justify",
            }}
          >
           Please note that this testing service is not designed for clinically urgent cases as blood samples are referred to an external laboratory for analysis. Turnaround times listed on the website should be treated as a guidelines to when patients should expect to receive results. Clinically urgent blood tests should only be ordered under the care of a registered medical practitioner, not on a self-request basis.
          </Alert>
        </div>

      </Fade>

      <Grid
        container
        direction="column"
        spacing={1}
        justify="flex-start"
        alignItems="stretch"
      >
        <Fade up>
          <div className={classes.boxTime}>
            <div className={classes.boxTitle}>Appointment Info</div>

            <Grid item xs={12} md={12}>
              <div>
                <ul className={classes.ul}>
                  <li className={classes.li}>
                    <span className={classes.infoTitleTime}>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className={classes.icon}
                      />
                      Date:
                    </span>

                    <span className={classes.infoDataTime}>
                      {dateformat(
                        new Date(state.bookingDate.toUTCString().slice(0, -4)),
                        "dddd, mmmm dS, yyyy"
                      )}
                    </span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.infoTitleTime}>
                      <FontAwesomeIcon
                        icon={faClock}
                        className={classes.icon}
                      />
                      Time:
                    </span>
                    <span className={classes.infoDataTime}>
                      {state.bookingTime}
                    </span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.infoTitleTime}>
                      <FontAwesomeIcon
                        icon={faHourglassHalf}
                        className={classes.icon}
                      />
                      Check-up Duration:
                    </span>
                    15 minutes
                  </li>

                  <li className={classes.li}  style={{lineHeight:"2rem"}}>
                    <span className={classes.infoTitleTime} >
                      <FontAwesomeIcon
                        icon={faNotesMedical}
                        className={classes.icon}
                        style={{marginTop:"5px"}}
                      />
                      Package:
                    </span>
                    <span className={classes.infoData} style={{fontWeight:"600"}}>
                      {" "}
                      {state.packageName? `${state.packageName} - ${state.packagePrice}` : '-'}
                    </span>
                  </li>
                  
                  <li className={classes.li}  style={{lineHeight:"2rem"}} hidden={!state.indivisualTests || state.indivisualTests.length === 0}>
                    <span className={classes.infoTitleTime} >
                      <FontAwesomeIcon
                        icon={faVial}
                        className={classes.icon}
                        style={{marginTop:"5px"}}
                      />
                      Indivisual Tests:
                    </span>
                    <div>
                        {state.indivisualTests && state.indivisualTests.map(item => (
                                          <Chip
                                          variant="outlined"
                                          color="default"
                                          label={
                                            <Typography
                                              style={{
                                                whiteSpace: "normal",
                                                fontSize: "0.9rem",
                                                fontWeight: "500",
                                                padding: "10px",
                                                width: "100%",
                                              }}
                                            >
                                              {`${item.code} - ${item.description} - ${item.price.toLocaleString("en-GB", { style: 'currency', currency: 'GBP' })}`}
                                            </Typography>
                                          }
                                          style={{ height: "100%", width: "100%", marginBottom:"5px", marginTop:"5px" }}
                                        />
                        ))}
                    </div>
                  </li>

                  <li className={classes.li} hidden={!state.notes}>
                    <span className={classes.infoTitle} style={{width:"60px"}}> Notes: </span>
                    <span className={classes.infoData} style={{fontWeight:"500"}}>
                      {" "}
                      {state.notes || "-"}{" "}
                    </span>
                  </li>

                  <li className={classes.li} hidden={!state.check_withgp}>
                    <span className={classes.infoData} style={{fontWeight:"700"}}>
                      + Full Doctor Consultation - £150
                    </span>
                  </li>

                  <li className={classes.li}>
                    <div style={{border:"1px solid #f56464", padding:"18px 10px", borderRadius:"10px", position:"relative"}}>
                      <div style={{position:"absolute", top:"-8px", left:"10px", background:"#fff", fontSize:"0.85em", fontWeight:"500", padding:"0px 5px", color:"red"}}>
                        Payable Now
                      </div>
                      <strong> Phlebotomy (Blood Taking Fee) - £50 </strong>
                    </div>
                  </li>

                  <li className={classes.li} hidden={!state.totalPrice} style={{marginTop:"20px"}}>

                  <div style={{border:"1px solid #f56464", padding:"18px 10px", borderRadius:"10px", position:"relative"}}>
                      <div style={{position:"absolute", top:"-8px", left:"10px", background:"#fff", fontSize:"0.85em", fontWeight:"500", padding:"0px 5px", color:"red"}}>
                        Payable at the Clinic
                      </div>

                    <span className={classes.infoTitleTime}>
                      <FontAwesomeIcon
                        icon={faPoundSign}
                        className={classes.icon}
                      />
                      Test Price:
                    </span>
                    <span className={classes.infoData} style={{color:"#dc2626", fontWeight:"500"}}>
                      {" "}
                      {state.totalPrice  ? state.totalPrice  : '-'}
                    </span>

                    </div>
                  </li>

                </ul>
              </div>
            </Grid>
          </div>
        </Fade>

        <Fade up>
          <div className={classes.box}>
            <div className={classes.boxTitle}>Your Info</div>

            <Grid item xs={12} md={12}>
              <div>
                <ul className={classes.ul}>
                  <li className={classes.li}>
                    <span className={classes.infoTitle}>Full Name</span>
                    <span className={classes.infoData}> {state.fullname} </span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.infoTitle}>Telephone</span>
                    <span className={classes.infoData}>
                      {" "}
                      {state.phone || "-"}{" "}
                    </span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.infoTitle}>Email Address</span>
                    <span className={classes.infoData}>
                      {" "}
                      {state.email || "-"}{" "}
                    </span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.infoTitle}>Date of Birth</span>
                    <span className={classes.infoData}> {FormatDateFromString(state.birthDate)} </span>
                  </li>
                  <li className={classes.li}>
                    <span className={classes.infoTitle}>Gender</span>
                    <span className={classes.infoData}> {state.gender === "F" ? 'Female' : 'Male' } </span>
                  </li>

                </ul>
              </div>
            </Grid>
          </div>
        </Fade>


        <div style={{ textAlign: "left", fontWeight: "500", fontSize: "0.9rem", fontWeight:"700", padding: "10px", border: "1px solid #999", borderRadius: "8px", lineHeight: "1.5rem", backgroundColor: "#eee", marginTop: "20px" }}>
            A blood draw fee of <span style={{color:"red"}}>£50</span> is payable to reserve your appointment. When you attend the clinic, you will only be charged for the test, as you have already paid the phlebotomy fee. 
        </div>

        <div style={{ textAlign: "left", fontWeight: "500", fontSize: "0.9rem", padding: "10px", border: "1px solid #999", borderRadius: "8px", lineHeight: "1.5rem", backgroundColor: "#eee", marginTop: "20px" }}>
          Urine tests, swab tests and full sexual health packages carry no blood draw fee, the £50 booking fee will be deducted from the total cost of your service.
        </div>



        <div className={classes.terms}>
          By clicking on the "PROCEED TO PAYMENT" button you are agreeing with our{" "}
          <a
            className={classes.link}
            target="_blank"
            href="https://www.medicalexpressclinic.co.uk/terms-and-conditions"
          >
            terms and condition
          </a>
          &nbsp;
          and 
          &nbsp;
          <a
            className={classes.link}
            target="_blank"
            href="https://www.medicalexpressclinic.co.uk/consent-to-treatment-policies"
          >
            consent to treatment policies.
          </a>
        </div>

        <div>
          <Alert severity="info">
           <div style={{fontSize:"1rem", fontWeight:"500"}}>
            You need to pay the <b style={{color:"red"}}>£50</b> deposit to secure your appointment.
            </div>
          </Alert>
        </div>


        {/* <div style={{textAlign:"left", color: "#111", marginLeft:"10px"}}>
<FormControlLabel className={classes.formControl}  style={ {color: state.dataConfirmedError ? "red" : ''}} 
    control={<Checkbox className={classes.formControl} style={ {color: state.dataConfirmedError ? "red" : ''}} 
     color="secondary" name="emailConfirmCheckBox" checked={state.dataConfirmed} onChange={dataConfirmedChanged} />}
     label={<span style={{ fontSize: '0.9rem' , fontWeight:"500"}}>{`I confirm that the details in this form are correct, and I am happy for them to appear as written above on my results and certificate if ordered.`} </span>}
     />
</div> */}
      </Grid>
    </React.Fragment>
  );
}
