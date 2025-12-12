import { createReducer, on } from '@ngrx/store';
import { OrdersActions } from './orders.actions';
import { Order } from '../core/model/orders.model';

export interface OrdersState {
  data: Order[];
  total: number;
  loading: boolean;
  error: any;
}

export const initialState: OrdersState = {
  data: [],
  total: 0,
  loading: false,
  error: null
};

export const ordersReducer = createReducer(
  initialState,

  on(OrdersActions.loadOrders, state => ({ ...state, loading: true })),
  on(OrdersActions.loadOrdersSuccess, (state, { data, total }) => ({
    ...state,
    loading: false,
    data,
    total
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrdersActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    data: [order, ...state.data]
  })),

  on(OrdersActions.updateOrderSuccess, (state, { order }) => ({
    ...state,
    data: state.data.map(o => (o.id === order.id ? order : o))
  })),

  on(OrdersActions.deleteOrderSuccess, (state, { id }) => ({
    ...state,
    data: state.data.filter(o => o.id !== id)
  })),
);
