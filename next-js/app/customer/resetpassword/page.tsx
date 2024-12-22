import React from "react";
import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(() => import("../../components/customer/ResetPasswordForm"), {
  ssr: false,
});
const ResetPassword: React.FC = () => {
  return (
    <>
      <div className="gap"></div>
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
