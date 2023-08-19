import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cartIcon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CardToggle } from "../../contexts/cardToggle.context";
import {
  NavLink,
  NavigationContainer,
  NavigationWrapper,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CardToggle);

  return (
    <Fragment>
      {/* <div className="navigation"> */}
      <NavigationWrapper>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavigationContainer>
          <NavLink to="Shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="SignIn">Sign In</NavLink>
          )}
          <CartIcon />
        </NavigationContainer>
        {isCartOpen && <CartDropDown />}
      </NavigationWrapper>
      {/* </div> */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
