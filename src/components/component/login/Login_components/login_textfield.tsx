import { Grid, TextField } from "@mui/material";
import { Login_tabProps } from "./login_tab";
import { ReactNode } from "react";

type Props = {
  id: string;
  className: string;
  error?: boolean;
  value: string;
  type: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  helperText?: ReactNode;
  autoComplete?: string;
  fullWidth?: boolean;
};

export const Login_TextFeild = (props: Props) => {
  return (
    <Grid item xs={12} className="GridRow-center">
      <TextField
        id={props.id}
        className={props.className}
        error={props.error}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        label={props.label}
        variant="outlined"
        helperText={props.helperText}
        autoComplete={props.autoComplete}
        fullWidth={props.fullWidth}
      />
    </Grid>
  );
};