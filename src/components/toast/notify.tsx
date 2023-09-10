import { ToastContainer } from "react-toastify";

const Notify = () => {
  return (
    <div className="flex gap-4 my-1">
      <ToastContainer
        rtl
        theme="dark"
        position="bottom-right"
        draggable={true}
        autoClose={5000}
        newestOnTop
        closeOnClick={true}
        pauseOnHover={true}
        hideProgressBar={false}
        pauseOnFocusLoss
      />
    </div>
  );
};
export default Notify;
