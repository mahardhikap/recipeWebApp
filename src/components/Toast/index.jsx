import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  return (
    <div>
      {/* ...other components */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default Toast;