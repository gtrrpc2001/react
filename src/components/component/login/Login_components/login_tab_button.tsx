import { Grid2, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  userType: "일반" | "보호자" | "기업";
  handleUserType: (type: "일반" | "보호자" | "기업") => void;
};

export const Login_Tab_Button = (props: Props) => {
  const [t, _i18n] = useTranslation();
  return (
    <Grid2 size={12} className="GridRow-center">
      <ToggleButtonGroup
        value={props.userType}
        exclusive
        onChange={(_e, type) => props.handleUserType(type)}
      >
        <ToggleButton className="UserTypeSelect" value={"일반"}>
          {t("Regular")}
        </ToggleButton>
        <ToggleButton className="UserTypeSelect" value={"보호자"}>
          {t("Guardian")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid2>
  );
};
