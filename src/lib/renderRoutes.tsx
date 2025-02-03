import { Route } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

interface ChildRoute {
  navigateLink: string;
  pageTitle: string;
  element: JSX.Element;
}

interface ParentRoute {
  navigateLink: string;
  iconName?: string;
  title: string;
  pageTitle: string;
  element: JSX.Element;
  children?: ChildRoute[];
}

type RoutesArray = ParentRoute[];

export const renderRoutes = (routes: RoutesArray) => {
  return routes.flatMap((route, index) => {
    const mainRoute = (
      <Route
        key={index}
        path={route.navigateLink === 'index' ? '/' : route.navigateLink}
        element={
          <>
            <PageTitle title={route.pageTitle} />
            {route.element}
          </>
        }
      />
    );

    const childRoutes =
      route.children?.map((child, childIndex) => (
        <Route
          key={`${index}-${childIndex}`}
          path={child.navigateLink}
          element={
            <>
              <PageTitle title={child.pageTitle} />
              {child.element}
            </>
          }
        />
      )) || [];

    return [mainRoute, ...childRoutes];
  });
};
