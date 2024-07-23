import * as EmailValidator from 'email-validator';
import BookService from "./services/BookService";


export default async function ValidateStep (state,setState, step, hasPackage) 
  {
    var error = false;

    if (step === 0)
    {
      if (!state.bookingDate || !state.bookingDate.getTime())
      {
        setState(state => ({...state, bookingDateError : true}));
        error = true;
      }
    }
    if (step === 1)
    {
      /// Validate time
      
      if (!state.bookingTime)
      {
        setState(state => ({...state, bookingTimeError : true}));
        error = true;
      }
    }  else if (step === 2 && !hasPackage){
      // validate Package
      if ((!state.packageName || state.packageName.length < 1) && (!state.indivisualTests || state.indivisualTests.length === 0) && (!state.notes || state.notes.trim().length === 0))
      {

        setState(state => ({...state, notes : "Blood Tests"}));
        // error = true;
      }


    }
    
    else if ((step === 3 && !hasPackage) || (step === 2 && hasPackage) ){
      ///validate Basic Info
      if (!state.fullname || state.fullname.trim().length < 1)
      {
        setState(state => ({...state, fullnameError : true}));
        error = true;
      }
      if (!state.email || !EmailValidator.validate(state.email))
      {
        setState(state => ({...state, emailError : true}));
        error = true;
      }

      if (!state.gender)
      {
        setState(state => ({...state, genderError : true}));
        error = true;
      }

      if (!state.phone || state.phone.trim().length < 1)
      {
        setState(state => ({...state, phoneError : true}));
        error = true;
      }

      if (!state.birthDate || state.birthDate.length !== 10)
      {
        setState(state => ({...state, birthDateError : true}));
        error = true;
      }

      if (!state.check_nogp)
      {
        setState(state => ({...state, check_nogp_error : true}));
        error = true;
      }

      if (!error) {
        if (!state.bookingRef) {
          try {
            const res = await BookService.getNewReference();
            if (res && res.data && res.data.ref) {
              setState((state) => ({ ...state, bookingRef: res.data.ref }));
            }
            else
            {
              error = true;
            }
          } catch (ex) {
            console.error(ex);
            error = true;
          }
        }
      }
  

    }

      return !error;   
  }