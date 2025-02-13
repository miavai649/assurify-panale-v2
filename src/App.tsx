import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

import Loader from './common/Loader';
import { useAuth } from './context/authContext';
import DefaultLayout from './layout/DefaultLayout';
import { renderRoutes } from './lib/renderRoutes';
import Chart from './pages/Chart';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { assurify_panel_routes as panelRoutes } from './routes';

function App() {
  const { pathname } = useLocation();
  const { userLoggedIn, loading, token } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading && !userLoggedIn && !token) return <Loader />;

  return (
    <Routes>
      {/* Authentication Pages (Outside DefaultLayout) */}
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignUp />
          </>
        }
      />

      {/* Protected Routes (Inside DefaultLayout) */}
      {userLoggedIn && token ? (
        <Route
          path="/*"
          element={
            <DefaultLayout>
              <Routes>
                {renderRoutes(panelRoutes)}
                <Route
                  path="/forms/form-layout"
                  element={
                    <>
                      <PageTitle title="Form Layout | TailAdmin" />
                      <FormLayout />
                    </>
                  }
                />
                <Route
                  path="/tables"
                  element={
                    <>
                      <PageTitle title="Tables | TailAdmin" />
                      <Tables />
                    </>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <>
                      <PageTitle title="Settings | TailAdmin" />
                      <Settings />
                    </>
                  }
                />
                <Route
                  path="/chart"
                  element={
                    <>
                      <PageTitle title="Basic Chart | TailAdmin" />
                      <Chart />
                    </>
                  }
                />
                <Route
                  path="/ui/alerts"
                  element={
                    <>
                      <PageTitle title="Alerts | TailAdmin" />
                      <Alerts />
                    </>
                  }
                />
                <Route
                  path="/ui/buttons"
                  element={
                    <>
                      <PageTitle title="Buttons | TailAdmin" />
                      <Buttons />
                    </>
                  }
                />
              </Routes>
            </DefaultLayout>
          }
        />
      ) : (
        <Route path="/*" element={<SignIn />} />
      )}
    </Routes>
  );
}

export default App;
