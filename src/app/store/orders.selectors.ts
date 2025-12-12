import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectOrders = createSelector(
  selectOrdersState,
  s => s.data
);

export const selectTotal = createSelector(
  selectOrdersState,
  s => s.total
);

export const selectLoading = createSelector(
  selectOrdersState,
  s => s.loading
);
