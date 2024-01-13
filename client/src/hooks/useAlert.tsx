import { useState } from "react";

type AlertType = {
  message: string
  type: string
  status: boolean
}

const initialAlert = {
  message: "",
  type: "",
  status: false,
}

const useAlert = () => {
  const [alertSuccess, setAlertSuccess] = useState<AlertType>(initialAlert);
  const [alertFailed, setAlertFailed] = useState<AlertType>(initialAlert);

  const showAlertSuccess = (props: AlertType) => {
    if (props.type === "success") {
      setAlertSuccess((prevAlert) => ({
        ...prevAlert,
        message: props.message,
        type: props.type,
        status: props.status,
      }));

    }
  };

  const showAlertFailed = (props: AlertType) => {
    if (props.type === 'failed')
      setAlertFailed({ 
        message: props.message, 
        type: props.type, 
        status: props.status 
      });
  }

  const hideSuccessAlert = () => {
    setAlertSuccess(initialAlert);
  }

  const hideFailedAlert = () => {
    setAlertFailed(initialAlert);
  }

  // setAlertSuccess({message: props?.message, status: props?.status});

  return { alertSuccess, alertFailed, showAlertSuccess, showAlertFailed, hideSuccessAlert, hideFailedAlert };
}

export default useAlert;
