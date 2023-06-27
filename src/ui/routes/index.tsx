import {
  BillingPage,
  DashboardPage,
  Esempio1,
  Esempio2,
  Esempio3,
  LoginPage,
  RecoverPage,
  RegisterPage,
  SkillPage,
} from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../../utils/constant';
import Layout from '../molecules/Layout';
import ClientPage from '../pages/Client';
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
              <Route path={ROUTES.client} element={<ClientPage />} />
              <Route path={ROUTES.skill} element={<SkillPage />} />
              <Route path={ROUTES.billing} element={<BillingPage />} />
              <Route path={ROUTES.example1} element={<Esempio1 />} />
              <Route path={ROUTES.example2} element={<Esempio2 />} />
              <Route path={ROUTES.example3} element={<Esempio3 />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
