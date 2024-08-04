import { Route, Routes } from "react-router-dom";
import AllApps from "./pages/AllApps";
import Home from "./pages/Homepage";
import Sidebar from "./pages/Sidebar"
import Register from "./components/Register"
import Approvedwidgets from "./components/allwidgets"
import Login from "./components/Login";
import { AuthProvider  } from './context/AuthContext';
import PublishWidget from "./components/creatwidget"
import AdminWidgetList from "./components/AdminWidgetList"
import Logout from "./components/Logout"
import ProtectedRoute from './components/ProtectedRoute'; 
import UpdateWidget from "./components/UpdateWidget"
import MyWidgets from "./components/Mywidgets"
import AdminRoute from "./components/AdminRoute"

// import Explore from "./pages/Explore";
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      {/* <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden"> */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Sidebar />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/approvedwidgets" element={<Approvedwidgets />} /> 
          <Route path="/login" element={<Login />} /> 

          <Route path="/widgets" element={
            <ProtectedRoute>
              <PublishWidget />
            </ProtectedRoute>
          } />
            <Route path="/UpdateWidget/:id" element={
            <ProtectedRoute>
              <UpdateWidget />
            </ProtectedRoute>
          } />
               <Route path="/MyWidgets" element={
            <ProtectedRoute>
              <MyWidgets />
            </ProtectedRoute>
          } />

<Route path="/Admin" element={
            <AdminRoute>
              <AdminWidgetList/>
            </AdminRoute>
          } />



          <Route path="/Logout" element={<Logout />} /> 
        </Routes>
        </AuthProvider>
      {/* </div> */}
    </>
  );
};

export default App;