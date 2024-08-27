import {
  SpinnerParentContainer,
  SpinnerContainer,
  SpinnerOverlay,
} from "../spinner/spinner.components.styles";

const Spinner = () => (
  <SpinnerParentContainer>
    <SpinnerContainer>
      <SpinnerOverlay />
    </SpinnerContainer>
  </SpinnerParentContainer>
);

export default Spinner;
