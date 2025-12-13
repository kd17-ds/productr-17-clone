import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import AuthLayout from "./layouts/AuthLayout";
import RightAuth from './pages/Auth/RightAuth';
import OtpVerification from './pages/Auth/OtpVerification';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<RightAuth />} />
          <Route path='/signup' element={<RightAuth />} />
          <Route path='/verify-otp' element={<OtpVerification />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
