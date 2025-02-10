import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

import Chart from './pages/Chart';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { assurify_panel_routes as panelRoutes } from './routes';
import { renderRoutes } from './lib/renderRoutes';
import { useAuth } from './context/authContext';
import Loader from './common/Loader';

function App() {
  const { pathname } = useLocation();
  const { userLoggedIn, loading, jwt } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) return <Loader />; // Prevents flickering

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
      {userLoggedIn && jwt ? (
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
