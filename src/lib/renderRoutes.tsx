import { Route } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

interface ChildRoute {
  navigateLink: string;
  pageTitle: string;
  element: JSX.Element;
}

interface ParentRoute {
  navigateLink: string;
  iconName?: string; // Optional if not used in rendering
  title: string;
  pageTitle: string;
  element: JSX.Element;
  children?: ChildRoute[]; // Optional for routes with children
}

type RoutesArray = ParentRoute[];

export const renderRoutes = (routes: RoutesArray) => {
  return routes.map((route, index) => {
    // check if the route is the index route
    const isIndexRoute = route.navigateLink === 'index';

    // render the route conditionally
    return isIndexRoute ? (
      <Route
        key={index}
        index
        element={
          <>
            <PageTitle title={route.pageTitle} />
            {route.element}
          </>
        }
      />
    ) : (
      <Route
        key={index}
        path={route.navigateLink}
        element={
          <>
            <PageTitle title={route.pageTitle} />
            {route.element}
          </>
        }
      >
        {/* Render child routes if they exist */}
        {route.children?.map((child, childIndex) => (
          <Route
            key={childIndex}
            path={child.navigateLink}
            element={
              <>
                <PageTitle title={child.pageTitle} />
                {child.element}
              </>
            }
          />
        ))}
      </Route>
    );
  });
};
