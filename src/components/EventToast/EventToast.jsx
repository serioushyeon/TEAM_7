import { useEffect } from "react";
import './EventToast.css'
function Toast({ setToast, text }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className="toastWrapper">
        <div className="toast-alert">
        <p>{text}</p>
        </div>
    </div>
  );
}

export default Toast;