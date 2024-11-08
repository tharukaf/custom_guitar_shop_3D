import PropTypes from "prop-types"
import { Typography, Button } from "@mui/material"

BackgroundColorButtons.propTypes = {
  changeBackground: PropTypes.func.isRequired,
}

export default function BackgroundColorButtons({ changeBackground }) {
  return (
    <div className="colorPicker">
      <Typography sx={
        { fontSize: "12px", marginRight: "10px" }
      }>Change Backdrop Color</Typography>
      <Button
        style={{
          backgroundColor: "white",
          width: "10px",
          height: "10px",
          border: "1px solid black",
        }}
        onClick={() => changeBackground("white")}
      ></Button>
      <Button
        style={{
          backgroundColor: "black",
          width: "10px",
          height: "10px",
          border: "1px solid black",
        }}
        onClick={() => changeBackground("black")}
      ></Button>
      <Button
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "10px",
          border: "1px solid black",
        }}
        onClick={() => changeBackground("grey")}
      ></Button>
    </div>
  );
}


