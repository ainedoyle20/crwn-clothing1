import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOutStart } from '../../store/user/user.actions';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { selectCurrentUser } from '../../store/user/user.selectors';
import { selectIsCartOpen, selectCartItems } from '../../store/cart/cart.selectors';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import {
    NavigationContainer,
    LogoContainer,
    NavLinksContainer,
    NavLink,
} from './navigation.styles';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItems = useSelector(selectCartItems);

    const signOutUserHandler = () => {
        if (currentUser !== null && currentUser.id !== undefined) {
           dispatch(signOutStart(currentUser.id, cartItems)); 
        }
    };

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                
                <NavLinksContainer>
                    <NavLink to="/shop">Shop</NavLink>
                    <NavLink to="/order-history">Orders</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {currentUser
                    ? <NavLink as="span" onClick={signOutUserHandler}>Sign Out</NavLink>
                    : <NavLink to="/auth">SignIn</NavLink>
                    }
                    <CartIcon />
                </NavLinksContainer>

                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;
