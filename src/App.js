import Topnav from './components/Nav/TopBar';
import Sidebar from './components/Nav/SideBar';

import Home from './pages/Home';
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'
import Login from './pages/Login';
import Missing from './pages/Missing';
import Unauthorised from './pages/Unauthorised';

import { useStateContext } from './components/Context/ContextProvider';
import useToken from './components/Context/AuthToken';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const { activeMenu } = useStateContext();

  const { accessToken, setAccessToken } = useToken();
  if (!accessToken) {
    return <Login setAccessToken={setAccessToken} />;
  }

  return (
    <main>
      <div className='flex relative'>
        {activeMenu
          ? (
            <div className='w-72 fixed'>
              <Sidebar />
            </div>
            )
          : (
            <div>
              <Sidebar />
            </div>
            )}
        <div
          className={
              activeMenu
                ? 'min-h-screen md:ml-72 w-full  '
                : 'w-full min-h-screen flex-2'
            }
        >
          <div>
            <Topnav />
          </div>
          <div>
            <Routes>
              {/* dashboard  */}
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login setAccessToken={setAccessToken} />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/reports' element={<Reports />} />

              <Route path='/unauthorised' element={<Unauthorised />} />
              <Route path='*' element={<Missing />} Missing />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
