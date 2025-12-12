import { Component, OnInit, HostListener, inject } from '@angular/core';
import { Order } from '../../core/model/orders.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrdersActions } from '../../store/orders.actions';
import { selectOrders, selectTotal, selectLoading } from '../../store/orders.selectors';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OrdersComponent implements OnInit {

  private store = inject(Store);

  orders$ = this.store.select(selectOrders);
  total$ = this.store.select(selectTotal);
  loading$ = this.store.select(selectLoading);

  orders: Order[] = [];
  loading = false;
  total = 0;

  search = '';
  customerFilter = '';
  statusOptions = ['OPEN', 'PENDING', 'INPROGRESS', 'COMPLETED', 'CANCELLED'];
  statusFilter: string[] = [];
  customStatusFilter = '';
  statusDropdownOpen = false;
  page = 1;
  pageSize = 10;
  sortBy = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'desc';
  dialogOpen = false;
  editingOrder: Order | null = null;
  dialogOrder: Partial<Order> = {};
  dialogLoading = false;

  ngOnInit() {
    this.subscribeToStore();
    this.loadOrders();
  }

  subscribeToStore() {
    this.orders$.subscribe(data => this.orders = data);
    this.total$.subscribe(total => this.total = total);
    this.loading$.subscribe(l => this.loading = l);
  }

  buildParams() {
    const params: any = {
      search: this.search,
      customerName: this.customerFilter,
      page: this.page,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };

    const statusArray = [...this.statusFilter];
    if (this.customStatusFilter.trim()) statusArray.push(this.customStatusFilter.trim());
    if (statusArray.length) params.status = statusArray;

    return params;
  }

  loadOrders() {
    const params = this.buildParams();
    this.store.dispatch(OrdersActions.loadOrders({ params }));
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.status-dropdown')) {
      this.statusDropdownOpen = false;
    }
  }

  toggleStatusDropdown() {
    this.statusDropdownOpen = !this.statusDropdownOpen;
  }

  toggleStatus(status: string) {
    if (this.statusFilter.includes(status)) {
      this.statusFilter = this.statusFilter.filter(s => s !== status);
    } else {
      this.statusFilter.push(status);
    }
    this.loadOrders();
  }

  onSort(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.loadOrders();
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.loadOrders();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  clearFilters() {
    this.search = '';
    this.customerFilter = '';
    this.statusFilter = [];
    this.customStatusFilter = '';
    this.loadOrders();
  }

  onDelete(id: number) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    this.store.dispatch(OrdersActions.deleteOrder({ id }));
  }

  openAddDialog() {
    this.dialogOpen = true;
    this.editingOrder = null;
    this.dialogOrder = { orderNo: '', customerName: '', status: 'OPEN', amount: 0 };
  }

  openEditDialog(order: Order) {
    this.dialogOpen = true;
    this.editingOrder = order;
    this.dialogOrder = { ...order };
  }

  closeDialog() {
    this.dialogOpen = false;
  }

  saveOrder() {
    if (this.editingOrder) {
      this.store.dispatch(
        OrdersActions.updateOrder({
          id: this.editingOrder.id!,
          order: this.dialogOrder
        })
      );
    } else {
      this.store.dispatch(
        OrdersActions.createOrder({ order: this.dialogOrder })
      );
    }

    this.closeDialog();
  }

  showAlert(text: string) {
    import('sweetalert2').then((Swal) => {
      Swal.default.fire({
        position: 'top-end',
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  NotifyMessages(al_txt: string) {
    this.showAlert(al_txt);
  }
}
