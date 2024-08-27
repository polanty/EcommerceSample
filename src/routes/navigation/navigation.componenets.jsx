import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cartIcon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { cartToggleSelector } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/userDispatch.action";
// import { signOutUser } from "../../utils/firebase/firebase.utils";
// import { CardToggle } from "../../contexts/cardToggle.context";
import {
  NavLink,
  NavigationContainer,
  NavigationWrapper,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  // const { currentUser } = useContext(UserContext);
  const currentUser = useSelector((state) => state.users.currentUser);

  // console.log(currentUser);
  const isCartOpen = useSelector(cartToggleSelector);

  const signUserOutOfApp = () => dispatch(signOutStart());

  return (
    <Fragment>
      {/* <div className="navigation"> */}
      <NavigationWrapper>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavigationContainer>
          <NavLink to="/Shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signUserOutOfApp}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/SignIn">Sign In</NavLink>
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
