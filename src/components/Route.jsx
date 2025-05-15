import { Outlet } from 'react-router-dom';

function RouteLayout() {
  return (
    <main className="bg-gr min-h-screen">
      <Outlet />
    </main>
  );
}

export default RouteLayout;
