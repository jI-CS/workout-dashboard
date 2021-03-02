import React from "react";

const CustomSpinner = ({ color, size }) => {
   return (
      <div
         className="spinner-icon"
         style={{
            borderTopColor: { color },
            borderLeftColor: { color },
            height: { size },
            width: { size },
         }}
      ></div>
   );
};

export default CustomSpinner;
