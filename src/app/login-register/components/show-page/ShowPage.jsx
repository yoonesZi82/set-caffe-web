"use client";
import { useState } from "react";
import Login from "../login-form/form/Login";
import Register from "../register-form/form/Register";
import Sms from "../sms-form/form/Sms";
import PageForm from "@/components/form/panel-form/PageForm";

const ShowPage = () => {
  const [authType, setAuthType] = useState("login");

  const showRegisterForm = () => setAuthType("register");
  const showLoginForm = () => setAuthType("login");
  const showLoginOtp = () => setAuthType("sms");

  return (
    <PageForm>
      {authType === "login" ? (
        <Login
          showRegisterForm={showRegisterForm}
          showLoginOtp={showLoginOtp}
        />
      ) : authType === "register" ? (
        <Register showLoginForm={showLoginForm} />
      ) : (
        <Sms showLoginForm={showLoginForm} />
      )}
    </PageForm>
  );
};

export default ShowPage;
