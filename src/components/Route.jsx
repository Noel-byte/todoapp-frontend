import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import Footer from './Footer';

function RouteLayout() {
  return (

    <>
    <Header/>
    <main>
       <Outlet />
    </main>
    <Footer/>
    </>
     

  );
}

export default RouteLayout;
