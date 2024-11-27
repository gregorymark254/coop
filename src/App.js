import Topnav from './components/Nav/TopBar';
import Sidebar from './components/Nav/SideBar';

import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Missing from './pages/Missing';
import Unauthorised from './pages/Unauthorised';

import { useStateContext } from './components/Context/ContextProvider';
import useToken from './components/Context/AuthToken';
import { Routes, Route } from 'react-router-dom';
import LogoutModal from './pages/Logout';

const App = () => {
  const { activeMenu } = useStateContext();
  const { accessToken, setAccessToken } = useToken();

  

  return (
    <main className="min-h-screen flex flex-col">
      {/* Topnav - Occupies the full width */}
      <div className="w-full">
        <Topnav />
      </div>

      <div className="flex flex-row">
        {/* Sidebar - Positioned below Topnav, occupies space if active */}
        {activeMenu && (
          <div className="w-72">
            <Sidebar />
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 ${
            activeMenu ? 'md:ml-4' : 'ml-0'
          } min-h-screen`}
        >
          <Routes>
            {/* dashboard */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setAccessToken={setAccessToken} />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/logout" element={<LogoutModal />} />
            <Route path="/unauthorised" element={<Unauthorised />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default App;
