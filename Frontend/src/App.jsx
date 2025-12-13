import { Routes, Route } from 'react-router-dom';
import AuthLayout from "./layouts/AuthLayout";
import RightAuth from './pages/Auth/RightAuth';
import OtpVerification from './pages/Auth/OtpVerification';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<RightAuth />} />
          <Route path='/signup' element={<RightAuth />} />
          <Route path='/verify-otp' element={<OtpVerification />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
