import { Button, Grid2 } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  disabled: boolean;
  page: number;
};

export const Login_Button = ({ disabled, page }: Props) => {
  const [t, _i18n] = useTranslation();

  return (
    <Grid2 size={12} className="GridRow-center">
      <div className={page == 1 ? "loginButtonWraper" : "CorpButtonWraper"}>
        <Button
          sx={{
            textTransform: "none",
          }}
          variant="contained"
          className="loginButton"
          type="submit"
          disabled={disabled}
        >
          {t("Sign In")}
        </Button>
      </div>
    </Grid2>
  );
};
