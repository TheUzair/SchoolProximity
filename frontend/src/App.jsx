import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

const SchoolList = lazy(() => import("./components/SchoolList"));
const AddSchoolForm = lazy(() => import("./components/AddSchoolForm"));
const Footer = lazy(() => import("./components/Footer"));

// Loading component
const Loading = () => <div className="text-center mt-4">Loading...</div>;

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-grow">
          {/* Sidebar */}
          <nav className="w-64 bg-white shadow-lg flex flex-col justify-between">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                School Management
              </h1>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? 'bg-blue-100 text-blue-700' : 'text-blue-500 hover:bg-blue-100'}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add"
                    className={({ isActive }) =>
                      `block py-2 px-4 rounded ${isActive ? 'bg-blue-100 text-blue-700' : 'text-blue-500 hover:bg-blue-100'}`
                    }
                  >
                    Add School
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* User Avatar */}
            <div className="p-4">
              <div className="flex items-center">
                <img
                  src="user.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="ml-2 text-gray-700">User Name</span>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main className="flex-grow p-8">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<SchoolList />} />
                <Route path="/add" element={<AddSchoolForm />} />
              </Routes>
            </Suspense>
          </main>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;