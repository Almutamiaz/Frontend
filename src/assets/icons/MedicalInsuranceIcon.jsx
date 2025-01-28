import React from "react";

const MedicalInsuranceIcon = ({ color = "#0F0138" }) => {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8102 0L18 8.95615C18 14.6715 14.5183 19.7955 9.19713 21.8977L9.02195 21.832C3.56942 19.7736 -0.0217981 14.562 9.95838e-05 8.75908L0.0219974 0H15.8102Z"
        fill={color}
      />
      <path
        d="M13.0501 8.39767L12.2618 7.04001L10.0282 8.33197V5.74805H8.45157V8.33197L6.218 7.04001L5.42969 8.39767L7.66325 9.68963L5.42969 10.9816L6.218 12.3393L8.45157 11.0473V13.6312H10.0282V11.0473L12.2618 12.3393L13.0501 10.9816L10.8165 9.68963L13.0501 8.39767Z"
        fill="white"
      />
      <path d="M15.8086 0H17.9984V8.75908H15.8086V0Z" fill={color} />
    </svg>
  );
};

export default MedicalInsuranceIcon;
