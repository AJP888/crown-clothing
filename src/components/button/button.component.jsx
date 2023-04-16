import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles"; // exported different button styles

// creating the BUTTON_TYPE_CLASSES object
export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

// create a getButton fuction that holds a buttontype of BUTTON_TYPE_CLASSES.base // that holds .base = means base.base
// we then have .ggoel and .inverted
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

// we then have CUstomButton = getButton(buttonType)
// we then turn the divs into <CustomButton>
const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
