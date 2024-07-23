import "./sqpaymentform.css";
import React from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core";
import PaymentService from "./services/PaymentService";
import { PayPalButtons } from "@paypal/react-paypal-js";


const PaymentFormPaypal = (props) => {
  const createOrderCalled = async (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Deposit for blood test (Medcial Express Clinic)",
          amount: {
            value: 50,
          },
        },
      ],
    });
  };

  const onApproveCalled = async (data, actions) => {
    const order = await actions.order.capture();

    // console.log("order", order);

    await handleApprove(order);
  };

  const handleApprove = async (order) => {
    try {
      props.onStart();
      const result = await PaymentService.doPayment({
        paymentInfo: order,
        personInfo: props.personInfo,
      });
      console.log(result);
      props.onComplete(result);
    } catch (ex) {
      console.error(ex);
      props.onError(ex);
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
        justifyItems="center"
        alignItems="center"
        
        style={{ width: "100%" }}
      >
        <Grid item style={{ width: "100%" }}>
          <PayPalButtons
            createOrder={createOrderCalled}
            onApprove={onApproveCalled}
            onError={(err) => {
              console.error("PayPal Error: ", err);
            }}
          />
        </Grid>
      </Grid>

      {/* <div className="sq-error-message">
        {this.state.errorMessages.map((errorMessage) => (
          <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
        ))}
      </div> */}
    </React.Fragment>
  );
};

export default PaymentFormPaypal;
