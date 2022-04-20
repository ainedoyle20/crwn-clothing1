import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { checkUserSession } from './store/user/user.actions';
import { selectCurrentUser } from './store/user/user.selectors';
import { selectCartItems } from './store/cart/cart.selectors';

import { fetchCartItemsStart } from './store/cart/cart.actions';

import { setCartItemsInFirestore } from './utils/firebase/firebase.utils';

import Spinner from './components/spinner/spinner.component';

const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const PaymentConfirmation = lazy(() => import('./routes/payment-confirmation/payment-confirmation.component'));
const OrderHistory = lazy(() => import('./routes/order-history/order-history.component'));

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  useEffect(() => {
    if (currentUser !== null && currentUser.id !== undefined) {
      dispatch(fetchCartItemsStart(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser !== null && currentUser.id !== undefined) {
      console.log('setting cart items in firestore');
      setCartItemsInFirestore(currentUser.id, cartItems);
    }
  }, [cartItems]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="order-history" element={<OrderHistory />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;