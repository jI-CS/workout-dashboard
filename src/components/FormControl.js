import React from "react";
import PropTypes from "prop-types";

const FormControl = ({ children, icon, className }) => {

   return (
      <div className={className}>
         <label >
            {icon}
            {children}
         </label>
      </div>
   );
};

FormControl.propTypes = {
   icon: PropTypes.object,
};

export default FormControl;
