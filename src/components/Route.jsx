import { Outlet } from 'react-router-dom';

function RouteLayout() {
  return (
    <main className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 min-h-screen p-4">
      <Outlet />
    </main>
  );
}

export default RouteLayout;
