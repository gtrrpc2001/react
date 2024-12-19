import { Grid2, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleAnimateInit } from "../../../func/func";

interface MainFrameProps {
  children?: React.ReactNode;
  setExitAnimation: React.Dispatch<
    React.SetStateAction<{
      opacity: number;
      x: number;
    }>
  >;
}

export const MainFrame = (props: MainFrameProps) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={24} className="loginPaper">
      {/* 타이틀  */}
      <Grid2 container className="Grid-Container">
        <Grid2 size={12} className="GridRow-center">
          <div
            className="titleWraper"
            onClick={() => {
              handleAnimateInit("/", props.setExitAnimation, navigate);
            }}
          >
            <Typography className="lookheartText" variant="h4">
              LOOKHEART
            </Typography>
          </div>
        </Grid2>
      </Grid2>
      {/* 타이틀  */}
      {props.children}
    </Paper>
  );
};
