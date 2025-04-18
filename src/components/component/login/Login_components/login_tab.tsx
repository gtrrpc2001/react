import { UserLoginProps } from "../login";
import { Login_TextFeild } from "./login_textfield";
import { Login_Tab_Button } from "./login_tab_button";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export interface Login_tabProps extends UserLoginProps {
  emailHelperText: ReactNode;
  pwHelperText: ReactNode;
  isEmailError: boolean;
  isPwError: boolean;
}

export const Login_Tab = (props: Login_tabProps) => {
  const [t, _i18n] = useTranslation();

  return (
    <>
      {props.page == 1 && (
        <Login_Tab_Button
          userType={props.userType}
          handleUserType={props.handleUserType}
        />
      )}
      <Login_TextFeild
        id="email"
        className="logininput"
        error={props.isEmailError}
        value={props.email}
        type="text"
        placeholder="youremail@domain.com"
        onChange={props.handleEmail}
        label={t("Email")}
        helperText={props.emailHelperText}
        autoComplete="username"
      />
      <Login_TextFeild
        id="password"
        className="logininput"
        error={props.isPwError}
        value={props.pw}
        type="password"
        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
        onChange={props.handlePw}
        label={t("Password")}
        helperText={props.pwHelperText}
        autoComplete="current-password"
      />
    </>
  );
};
