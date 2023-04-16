import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

// Imported Picture
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.contexts";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../contexts/cart.context";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  // we use useContext(UserContext) this holds both currentUser and setCurrentUser
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

// Fragment
// We can use a Fragment instead of a div if we are not going to keep re-rendring the data
// we need to import the Fragmnet / import {Fragment} from 'react';

// OutLet
// Outlet allows us to add data to the screen that is separate from our main page
// we need to import / import {Outlet} from 'react';
// Athe bottom of the application at the outlet <Outlet/>

// Link
// Links allows us to click on a image or a button and re-render the screen to a new page.
// we need to inclose the wording or picture in link / <Link><CrwLogo className='logo/> </Link>

// as='span' changes the link to a span
