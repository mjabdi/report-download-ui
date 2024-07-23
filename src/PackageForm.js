import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GlobalState from "./GlobalState";
import PersonsBox from "./PersonsBox";
import AntiBodyComponent from "./AntiBodyComponent";
import Chip from "@material-ui/core/Chip";
import {
  Button,
  DialogActions,
  DialogTitle,
  FormControl,
  FormLabel,
  Icon,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Checkout from "./checkout";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "@material-ui/core/Dialog";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import BookService from "./services/BookService";

import {matchSorter} from 'match-sorter'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
  formControl: {
    textAlign: "justify",
  },

  FormTitle: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  packageBox: {
    border: "2px solid",
    borderRadius: "15px",
    width: "100%",
    padding: "20px 5px",

    transition: "all 0.4s ease-in-out",
    boxShadow: " 0 0 10px rgb(0 0 0 / 20%)",
    [theme.breakpoints.up("sm")]: {
      minHeight: "180px",
    },

    cursor: "pointer",
  },

  pageTitle: {
    color: theme.palette.primary.main,
    marginBottom: "15px",
  },

  listOptions:{
    backgroundColor: theme.palette.primary.light,
    color: "#000",
    borderRadius:"30px",
    padding: "10px",
    fontWeight:"500",
    fontSize: "1rem"
  }
}));

export const Packages = [
  {
    packageName: "SILVER BLOOD TEST",
    title: "SILVER BLOOD TEST",
    malePrice: "£107.00",
    femalePrice: "£107.00",
    color: "#aaa",
    descriptions: [
      "Kidney Function",
      "Uric Acid",
      "Bone Metabolism",
      "Nutrition and Immunity",
      "Liver Function",
      "Cholesterol Profile",
      "Blood Sugar (Glucose)",
      "Haematology - Anaemia, Red & White Blood Cell count",
      "Inflammatory Markers",
    ],
    suitableFor:
      "General check-up usually for healthy people to determine normal body function. Very helpful in indicating deficiencies and identifying problems.",
  },
  {
    packageName: "SILVER PLUS BLOOD TEST",
    title: "SILVER PLUS BLOOD TEST",
    malePrice: "£195.00",
    femalePrice: "£195.00",
    color: "#00a1c5",
    descriptions: [
      "Kidney Function",
      "Uric Acid",
      "Bone Metabolism",
      "Nutrition and Immunity",
      "Liver Function",
      "Cholesterol Profile",
      "Blood Sugar (Glucose)",
      "Haematology - Anaemia, Red & White Blood Cell count",
      "Inflammatory Markers",
      "Iron Levels",
      "CK and LDH to look at muscle function",
    ],
    suitableFor:
      " Young, healthy and active people looking to monitor or improve physical activity and daily health. Very helpful in indicating deficiencies and identifying problems.",
  },
  {
    packageName: "GOLD BLOOD TEST",
    title: "GOLD BLOOD TEST",
    malePrice: "£250.00",
    femalePrice: "£250.00",
    color: "#ff7a11",
    descriptions: [
      "Kidney Function",
      "Uric Acid",
      "Bone Metabolism",
      "Nutrition and Immunity",
      "Liver Function",
      "Cholesterol Profile",
      "Blood Sugar (Glucose)",
      "Haematology - Anaemia, Red & White Blood Cell count",
      "Inflammatory Markers",
      "Iron Levels",
      "CK and LDH to look at muscle function",
      "Thyroid Function Test",
    ],
    suitableFor:
      " All ages to have a blood assessment of overall health and organ function. Generally good to perform annually in order to monitor changes in levels. This screening tool can also be used to confirm certain diagnoses.",
    prefix: "Early detection of diabetes - HBA1C Test",
    suffix:
      "A PSA test can be performed for men over the age of 50, the cost is £80.",
  },
  {
    packageName: "PLATINIUM BLOOD TEST",
    title: "PLATINIUM BLOOD TEST",
    malePrice: "£420.00",
    femalePrice: "£420.00",
    color: "#333",
    descriptions: [
      "Kidney Function",
      "Uric Acid",
      "Bone Metabolism",
      "Nutrition and Immunity",
      "Liver Function",
      "Cholesterol Profile",
      "Blood Sugar (Glucose)",
      "Haematology - Anaemia, Red & White Blood Cell count",
      "Inflammatory Markers",
      "Iron Levels",
      "CK and LDH to look at muscle function",
      "Thyroid Function Test",
      "Early detection of diabetes - HBA1C Test",
      "Vitamin D, B12 and Folic Acid",
    ],
    suitableFor:
      "High performance athletes or those desiring a detailed and comprehensive insight into their biochemistry, organ function and muscoskeletal functions.",
  },
];

export const Packages2 = [
  {
    packageName: "BLOOD SAMPLE AND URINE",
    title: "BLOOD_SAMPLE_AND_URINE",
    desc: "HIV I&II, Syphilis IgM/IgG, Chlamydia, Gonorrhoea",
    price: "£350.00",
    color: "#3fc566",
  },
  {
    packageName: "BLOOD SAMPLE AND URINE OR SWAB",
    title: "BLOOD_SAMPLE_AND_URINE_OR_SWAB",
    desc:
      "HIV I&II, Hepatitis B, Hepatitis C Antibodies, Hepatitis C Antigen, Syphilis IgM/IgG -",
    price: "£450.00",
    color: "#94b8dd",
  },
];

const Individuals = [
  {
    packageName: "HIV TESTING",
    desc: "HIV I & II",
    price: "£49.00",
  },
  {
    packageName: "CHLAMYDIA TESTING",
    price: "£69.00",
  },
  {
    packageName: "SYPHILIS BLOOD TESTING",
    price: "£55.00",
  },
  {
    packageName: "HERPES TESTING",
    desc: "Herpes I & II",
    price: "£92.50",
  },
  {
    packageName: "GONORRHOEA TESTING",
    price: "£69.00",
  },
  {
    packageName: "HEPATITIS A PROFILE TESTING",
    desc: "A",
    price: "£87.00",
  },
  {
    packageName: "HEPATITIS B PROFILE TESTING",
    desc: "B",
    price: "£109.50",
  },
  {
    packageName: "HEPATITIS C ANTIBODIES TESTING",
    desc: "C",
    price: "£89.00",
  },
  {
    packageName: "HPV TESTING",
    price: "£200.00",
  },
  {
    packageName: "BACTERIAL SWAB TESTING",
    price: "£68.50",
  },
];

const IndividualsCombo = [
  {
    packageName: "CHLAMYDIA, GONORRHOEA AND TRICHOMONAS",
    price: "£114.00",
  },
  {
    packageName: "HIV I & II WITH SYPHILIS",
    price: "£190.00",
  },
];

const WhiteRadio = withStyles({
  root: {
    color: "#fff",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function PackageForm() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const searchRef = React.useRef(null)

  const [allCodes, setAllCodes] = React.useState([]);

  const [indivisualTests, setIndivisualTests] = React.useState(state.indivisualTests? state.indivisualTests : [])

  const [noOptionsText, setNoOptionsText] = React.useState('')

  const [packageName, setPackageName] = React.useState(state.packageName || "");
  const [packagePrice, setPackagePrice] = React.useState(
    state.packagePrice || 0
  );

  const [notes, setNotes] = React.useState(state.notes || '')

  const notesChanged = (event) => {
    setNotes(event.target.value);
    setState((state) => ({ ...state, notes: event.target.value }));
  };

  const fetchAllCodes = async () => {
    try {
      const res = await BookService.getAllCodes();
      const data = res.data.result
      const options = data.map((option) => {
        const firstLetter = option.code[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });


      setAllCodes(options);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllCodes();
  }, []);

  const packageClicked = (_packageName, price) => {

    if (_packageName !== packageName)
    {
      setPackageName(`${_packageName}`);
      setPackagePrice(price);
      setState((state) => ({
        ...state,
        packageName: `${_packageName}`,
        packagePrice: price,
      }));
    }else
    {
      setPackageName('');
      setPackagePrice('');
      setState((state) => ({
        ...state,
        packageName: '',
        packagePrice: '',
      }));
    }


  };

  const [infoItem, setInfoItem] = React.useState(null);
  const [showInfoDialog, setShowInfoDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setShowInfoDialog(false);
  };

  const showMoreInfoDialog = (item) => {
    setInfoItem(item);
    setShowInfoDialog(true);
  };

  const filterOptions = (options, { inputValue }) => {

    if (inputValue && inputValue.length >= 3)
    {
      setNoOptionsText("")
      return matchSorter(options, inputValue, {keys: ['code', 'description']});
    }
    else
    {
      setNoOptionsText("Please enter at least 3 characters")
      return matchSorter(options, '$$$$', {keys: ['code', 'description']});
    }
  }

  return (
    <React.Fragment>
      <Typography className={classes.pageTitle} variant="h6" gutterBottom>
        Choose your Package
      </Typography>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 20px #dadada",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "#777",
            marginBottom: "20px",
          }}
        >
          Popular Blood Test Packages
        </div>

        <Grid
          container
          spacing={1}
          alignItems="baseline"
          style={{ marginTop: "10px" }}
        >
          {Packages.map((item) => (
            <Grid item xs={6} sm={3}>
              <div
                className={classes.packageBox}
                style={
                  packageName?.startsWith(item.packageName)
                    ? {
                        borderColor: item.color,
                        color: "#fff",
                        backgroundColor: item.color,
                      }
                    : { borderColor: item.color, color: item.color }
                }
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <div
                    onClick={() =>
                      packageClicked(item.packageName, `${item.malePrice}`)
                    }
                    style={{ width: "97%" }}
                  >
                    <Grid item xs={12}>
                      <div style={{ fontWeight: "500", fontSize: "1rem" }}>
                        {item.title}
                      </div>
                    </Grid>

                    <Grid item xs={12}>
                      <div style={{ marginTop: "10px" }}>
                        {item.malePrice === item.femalePrice && (
                          <div
                            style={{
                              fontSize: "1rem",
                              marginTop: "10px",
                              marginBottom: "15px",
                              fontWeight: "600",
                            }}
                          >
                            {item.malePrice}
                          </div>
                        )}

                        {item.malePrice !== item.femalePrice && (
                          <React.Fragment>
                            <div
                              style={{
                                fontSize: "2rem",
                                fontWeight: "600",
                                marginTop: "10px",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faMars}
                                style={{ fontSize: "2rem" }}
                                transform="left-4 down-1"
                              />{" "}
                              {item.malePrice}
                            </div>
                            <div
                              style={{
                                fontSize: "2rem",
                                fontWeight: "600",
                                marginTop: "10px",
                                marginBottom: "20px",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faVenus}
                                style={{ fontSize: "2rem" }}
                                transform="left-4 down-1"
                              />{" "}
                              {item.femalePrice}
                            </div>
                          </React.Fragment>
                        )}
                      </div>
                    </Grid>

                    {/* <Grid item xs={12} md={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          packageClicked(item.packageName, `${item.malePrice}`)
                        }
                      >
                        Select
                      </Button>
                    </Grid> */}
                  </div>

                  <Grid item xs={12} md={12} style={{ marginTop: "10px" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="default"
                      onClick={() => showMoreInfoDialog(item)}
                    >
                      <span
                        style={{ fontSize: "0.8rem", textTransform: "none" }}
                      >
                        {" "}
                        Find out more
                      </span>
                    </Button>
                    {/* <div style={{color:"#fff", backgroundColor:item.color, borderRadius:"15px", width:"80%", padding:"5px"}}  
                      onClick={() =>
                          packageClicked(item.packageName, `${item.malePrice}`)
                        }>
                      Find out more
                    </div> */}
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ))}

          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "1rem",
              fontWeight: "500",
              color: "#777",
              marginBottom: "10px",
              marginTop: "30px",
            }}
          >
            Looking for a specific blood test? Search through over 1,000 blood tests we offer at our clinic below :
          </div>

          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: "400",
              color: "#777",
            }}
          >
            <Autocomplete
              ref={searchRef}
              onFocus={() => searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              multiple
              id="tags-outlined"
              noOptionsText={noOptionsText}
              value={indivisualTests}
              onChange={(event, newValue) => {
                 setIndivisualTests(newValue)
                 setState(state => ({...state, indivisualTests: newValue}))
              }}
              filterOptions={filterOptions} 
              options={allCodes.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
              // groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => <div className={classes.listOptions}>
                {option.code} - {option.description} - {parseFloat(
                  option.price
                ).toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}</div>
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    color="primary"
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
                        {`${option.code} - ${option.description} - ${parseFloat(
                          option.price
                        ).toLocaleString("en-GB", {
                          style: "currency",
                          currency: "GBP",
                        })}`}
                      </Typography>
                    }
                    {...getTagProps({ index })}
                    style={{ height: "100%", width: "100%" }}
                  />
                  // <Chip variant="outlined" color="primary"  label={option} style={{width:"100%", fontWeight:"500"}} {...getTagProps({ index })} />
                ))
              }
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  fullWidth
                  {...params}
                  variant="outlined"
                  label="Blood Tests"
                  placeholder="Enter blood test"
                />
              )}
            />
          </div>


          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "1rem",
              fontWeight: "500",
              color: "#777",
              marginBottom: "0px",
              marginTop: "30px",
            }}
          >
            Couldn't find your blood test in the list? Write to us below :
          </div>

          <div
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: "400",
              color: "#777",
            }}
          >
            <TextField
              style={{ marginTop: "10px" }}
              id="notes"
              // error={state.notesError && state.package === "Others"}
              fullWidth
              // required={state.package === "Others"}
              label="Notes"
              value={notes}
              autoComplete="none"
              onChange={notesChanged}
              placeholder="Enter your notes"
              variant="outlined"
            />
          </div>


          <div style={{marginTop:"30px", fontWeight:"500", textAlign:"left"}}> 
          * A blood draw fee of <span style={{color:"#dc2626", fontWeight:"600"}}>£50</span> is payable blood tests. Urine tests, swab tests and full sexual health packages carry no surcharge.
          </div>

        </Grid>
      </div>

      {infoItem && (
        <Dialog onClose={handleCloseDialog} open={showInfoDialog}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                backgroundColor: "#333",
                color: "#fff",
                margin: "0",
                padding: "20px",
              }}
            >
              {infoItem.title}
            </div>

            <div style={{ position: "absolute", right: "10px", top: "10px" }}>
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon style={{ color: "#fff" }} />
              </IconButton>
            </div>

            <div
              style={
                {
                  // padding: "20px",
                }
              }
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  backgroundColor: "#fff",
                  color: "#333",
                  margin: "0",
                  padding: "20px 10px",
                }}
              >
                {`${infoItem.title} - ${infoItem.malePrice}`}
              </div>

              <div>
                <ul style={{ listStyle: "none" }}>
                  {infoItem.descriptions.map((desc) => (
                    <li
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1rem",
                        fontWeight: "400",
                        marginTop: "10px",
                      }}
                    >
                      <CheckCircleRoundedIcon
                        style={{
                          fontSize: "0.95rem",
                          marginLeft: "-20px",
                          color: "#ff7a11",
                        }}
                      />
                      <span style={{ paddingLeft: "10px" }}>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {infoItem.prefix && (
                <div
                  style={{
                    padding: "20px",
                    paddingBottom: "0px",
                    marginTop: "5px",
                    color: "#555",
                    fontSize: "0.85rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  {infoItem.prefix}
                </div>
              )}

              <div
                style={{
                  padding: "20px",
                  marginTop: "5px",
                  color: "#555",
                  fontSize: "0.85rem",
                  lineHeight: "1.4rem",
                }}
              >
                Suitable for : {infoItem.suitableFor}
              </div>

              {infoItem.suffix && (
                <div
                  style={{
                    padding: "0px 20px",
                    marginTop: "5px",
                    marginBottom: "20px",
                    color: "#555",
                    fontSize: "0.85rem",
                    lineHeight: "1.4rem",
                  }}
                >
                  {infoItem.suffix}
                </div>
              )}
            </div>
          </div>
        </Dialog>
      )}
    </React.Fragment>
  );
}
