import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersActions } from './orders.actions';
import { OrderService } from '../core/services/orders.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);
  private orderService = inject(OrderService);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(({ params }) =>
        this.orderService.getOrders(params).pipe(
          map(res => OrdersActions.loadOrdersSuccess(res)),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      mergeMap(({ order }) =>
        this.orderService.createOrder(order).pipe(
          map(res => OrdersActions.createOrderSuccess({ order: res })),
          catchError(error => of(OrdersActions.createOrderFailure({ error })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.updateOrder),
      mergeMap(({ id, order }) =>
        this.orderService.updateOrder(id, order).pipe(
          map(res => OrdersActions.updateOrderSuccess({ order: res })),
          catchError(error => of(OrdersActions.updateOrderFailure({ error })))
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.deleteOrder),
      mergeMap(({ id }) =>
        this.orderService.deleteOrder(id).pipe(
          map(() => OrdersActions.deleteOrderSuccess({ id })),
          catchError(error => of(OrdersActions.deleteOrderFailure({ error })))
        )
      )
    )
  );
}
