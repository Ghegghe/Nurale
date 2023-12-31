import {
  DashboardPage,
  LoginPage,
  RecoverPage,
  RegisterPage,
  SkillsPage,
  UsersPage,
  TypeOfPaymentsPage,
  CustomersPage,
  SuppliersPage,
  ResourcesPage,
  ResourceSkillsPage,
  PurchaseInvoicesPage,
  PurchaseInvoiceActivitiesPage,
  SalesInvoicesPage,
} from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../../utils/constant';
import Layout from '../molecules/Layout';
import RequireAuth from '../../utils/helper/RequireAuth';

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.recover} element={<RecoverPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path={ROUTES.dashboard} element={<DashboardPage />} />
              <Route path={ROUTES.users} element={<UsersPage />} />
              <Route path={ROUTES.skills} element={<SkillsPage />} />
              <Route path={ROUTES.typeOfPayments} element={<TypeOfPaymentsPage />} />
              <Route path={ROUTES.customers} element={<CustomersPage />} />
              <Route path={ROUTES.suppliers} element={<SuppliersPage />} />
              <Route path={ROUTES.resources} element={<ResourcesPage />} />
              <Route path={ROUTES.resourceSkill} element={<ResourceSkillsPage />} />
              <Route path={ROUTES.purchaseInvoice} element={<PurchaseInvoicesPage />} />
              <Route
                path={ROUTES.purchaseInvoiceActivity}
                element={<PurchaseInvoiceActivitiesPage />}
              />
              <Route path={ROUTES.salesInvoices} element={<SalesInvoicesPage />} />
              {/* <Route path={ROUTES.quickInsert} element={<DashboardPage />} />
              <Route path={ROUTES.jobs} element={<DashboardPage />} />
              <Route path={ROUTES.orders} element={<DashboardPage />} />
              <Route path={ROUTES.activities} element={<DashboardPage />} />
             
              
              
              
              
              
              
              <Route path={ROUTES.scheduledPayments} element={<DashboardPage />} />
              <Route path={ROUTES.scheduledValues} element={<DashboardPage />} />
              
              
              
              <Route path={ROUTES.timesheet} element={<DashboardPage />} />
              <Route path={ROUTES.report} element={<DashboardPage />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
