import { all, call } from 'typed-redux-saga/macro';

import { categoriesSaga } from './categories/categories.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';
import { ordersSagas } from './orders/orders.sagas';

export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas), call(cartSagas), call(ordersSagas)]);
}
