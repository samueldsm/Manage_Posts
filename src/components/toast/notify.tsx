"use client";

import { ToastContainer, toast } from "react-toastify";

/*TODO: Fix this component to sync based on action (Insert, Edit, Delete) */
export default function Notify() {
  return (
    <div className="flex gap-4 my-1">
      <ToastContainer
        rtl
        theme="dark"
        position="bottom-right"
        draggable
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        hideProgressBar={false}
      />
    </div>
  );
}
