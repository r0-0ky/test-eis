import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TablePage } from '../../pages/table-page';

const router = createBrowserRouter([
  {
    path: '*',
    element: <TablePage />,
  },
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
