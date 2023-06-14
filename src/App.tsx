import { Route, Routes, BrowserRouter } from "react-router-dom";
import "@fontsource/inter";
import UserListPage from "./pages/user";
import DashboardLayout from "./layout/DashboardLayout";
import QueryProvider from "./client";
import ProductListPage from "./pages/product";
import ServiceListPage from "./pages/service";
import OrderListPage from "./pages/order";
import AuthLoginPage from "./pages/auth";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
          <Routes>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path="login" element={<AuthLoginPage />}/>
              </Route>
              <Route path="/" element={<ProtectedRoute />}>
                <Route path='/' element={<DashboardLayout />}>
                  <Route path="users" element={<UserListPage />}/>
                  <Route path="products" element={<ProductListPage />} />
                  <Route path="services" element={<ServiceListPage />} />
                  <Route path="orders" element={<OrderListPage />} />
                </Route>
              </Route>
          </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
