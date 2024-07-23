import "./App.css";
import Checkout from "./checkout";
import WelcomeForm from "./WelcomeForm";
import AgreementForm from "./AgreementForm";
import GlobalState from "./GlobalState";
import React, { useEffect } from "react";
import BookService from "./services/BookService";
import theme from "./theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import DownloadForm from "./DownloadForm";


const getReportId = () => {
  const arr = window.location.pathname.split("/")
  return arr[arr.length-1]
};

function App() {
  const [state, setState] = React.useState({
    loaded: false,
    confirmDOB: false,
  });

  useEffect( () => {
    const reportId = getReportId();
    if (reportId && reportId.length > 0) {
      loadBloodReport(reportId)
    }
  }, []);

  const loadBloodReport = async (id) => {
    const res = await BookService.getBloodReport(id)
    if (res && res.data && res.data.result)
    {
      console.log(res.data.result)
      setState(state => ({...state, loaded: true, bloodReport: res.data.result}));
    }    
  }

  return (
    // <PayPalScriptProvider options={{"client-id": SANDBOX ? SANDBOX_CLIENT_ID : LIVE_CLIENT_ID, currency: "GBP"}}>

      <GlobalState.Provider value={[state, setState]}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <div className="App">
            {!state.loaded && (
              <div style={{padding:"20px", fontSize:"1.1em", color:"#cf2e2e"}}>
                loading... <br/>
              </div>
            )}
            {state.loaded && !state.confirmDOB && <WelcomeForm />}
            {state.loaded && state.confirmDOB && <DownloadForm/>}

          </div>
        </MuiThemeProvider>
      </GlobalState.Provider>

        //  {/* // </PayPalScriptProvider> */}

  );
}

export default App;
