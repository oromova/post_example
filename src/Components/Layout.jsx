import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };
  return (
    <div className="min-h-screen flex flex-col">
  {/* Header */}
  <header className="bg-black text-white py-4 px-6 text-lg font-semibold shadow-md flex justify-between">
   <h1>API</h1> 
    <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition" onClick={LogOut}>
      Log Out
    </button>
  </header>

  {/* Main Content */}
  <div className="flex flex-1">
    {/* Sidebar */}
    <aside className="w-64 bg-gray-100 p-4 shadow-md hidden md:block">
      <div className='flex flex-col'>
        <NavLink to="/" className="py-2 px-3 hover:bg-gray-200 rounded-md cursor-pointer" activeclassName='active'>Categories</NavLink>
        <NavLink to="/brand" className="py-2 px-3 hover:bg-gray-200 rounded-md cursor-pointer" activeclassName='active'>Brands</NavLink>
        <NavLink className="py-2 px-3 hover:bg-gray-200 rounded-md cursor-pointer" activeclassName='active'>Cities</NavLink>
      </div>
    </aside>

    {/* Main Section */}
    <main className="flex-1 p-6 bg-gray-50">
    <div className='col-span-9 p-4'><Outlet/></div>
    </main>
  </div>

  {/* Footer */}
  <footer className="bg-gray-800 text-white text-center py-3">
    &copy; API
  </footer>
</div>

  
  );
}

export default Layout;