import React from "react";
import { Audio, Circles } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
       <Circles
      height="80"
      width="80"
      color="#ffbf00"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      
    />
    </div>
  );
};

export default LoadingSpinner;
