# Order-management-Frontend

This is the frontend of the **Order Management** project built with **Angular 19**, **TailwindCSS** components.  
It connects to the backend API to manage Orders with full CRUD functionality.

---

##  Features

### Table / Grid
- Columns: Order No, Customer, Status, Amount, Created At, Actions  
- Sorting: Click column headers to toggle ascending/descending  
- Filtering:
  - Status: Multi-select dropdown with checkboxes + optional text input for custom filter  
  - Customer: Text input filter  
  - Global search box for key fields  
- Pagination:
  - Page navigation (Prev/Next or page numbers)  
  - Rows per page selector (10/20/50/100)  
- Active filters display with a “Clear filters” option  

### CRUD Operations
- Add Order (dialog modal)  
- Edit Order (dialog modal)  
- Delete Order with confirmation dialog  
- Toast notifications for success/error messages  
- Loading indicators while fetching data  

### UI Components
- Table, Dialog, Inputs, Selects, Buttons, Toasts

### Auth & Interceptors - JWT-based
- JWT-based authentication  
- AuthGuard protects routes for logged-in users  
- HTTP interceptor adds token to requests and handles unauthorized errors  

### Routes
- `/login` → Login page component  
- `/orders` → Orders page component (protected)  

### State Management
- **NgRx (Redux pattern)**
  - Actions, Reducers, Effects, Selectors  
  - Centralized state for Orders and Auth  
  - Handles async API calls, loading states, and error handling  

---

## Installation & Running Locally

** Installation

1. Clone the repository:

	```bash
	git clone <repo-url>
	cd order-management-Frontend

2. Install dependencies:
	npm install

3. Run the Angular dev server:
ng serve


** Filters / Search / Sort **
	Global Search: Matches orderNo and customerName
	Status Filter: Multi-select dropdown, select multiple statuses; optional text filter
	Customer Filter: Free-text input
	Sorting: Click column headers to toggle ascending/descending
	Pagination: Navigate pages and select rows per page (10/20/50/100)
	Clear Filters: Button resets all filters


** Importnant **
- Login with below credentials
- admin/admin123
