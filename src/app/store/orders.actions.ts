import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '../core/model/orders.model';

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    'Load Orders': props<{ params: any }>(),
    'Load Orders Success': props<{ data: Order[]; total: number }>(),
    'Load Orders Failure': props<{ error: any }>(),

    'Create Order': props<{ order: Partial<Order> }>(),
    'Create Order Success': props<{ order: Order }>(),
    'Create Order Failure': props<{ error: any }>(),

    'Update Order': props<{ id: number; order: Partial<Order> }>(),
    'Update Order Success': props<{ order: Order }>(),
    'Update Order Failure': props<{ error: any }>(),

    'Delete Order': props<{ id: number }>(),
    'Delete Order Success': props<{ id: number }>(),
    'Delete Order Failure': props<{ error: any }>(),
  }
});
