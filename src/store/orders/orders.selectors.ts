import { createSelector } from "reselect";

import { RootState } from "../store";

import { OrdersState } from "./orders.reducer";

const selectOrdersReducer = (state: RootState): OrdersState => state.orders;

export const selectOrdersArray = createSelector(
    [selectOrdersReducer],
    (ordersSlice) => ordersSlice.orders.sort((a, b) => {
        let date1 = new Date(b.createdAt);
        let date2 = new Date(a.createdAt);
        return date1.getTime() - date2.getTime();
    })
);

export const selectIsOrdersLoading = createSelector(
    [selectOrdersReducer],
    (ordersSlice) => ordersSlice.isLoading,
);
