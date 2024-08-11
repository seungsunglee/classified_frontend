import Alert from "@mui/material/Alert"
import { styled } from "@mui/material/styles"

const StyledAlert = styled(Alert, {
  shouldForwardProp: (prop) => prop !== "gutterBottom",
})(({ gutterBottom }) => ({
  whiteSpace: "pre-wrap",
  marginBottom: gutterBottom && 8,
}))

const NonFieldErrors = ({ errors, gutterBottom = false }) => {
  return errors ? (
    <StyledAlert icon={false} severity="error" gutterBottom={gutterBottom}>
      {errors.join("\n")}
    </StyledAlert>
  ) : null
}

export default NonFieldErrors
