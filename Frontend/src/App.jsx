import { Routes, Route } from 'react-router-dom';
import Auth from "./pages/Auth/Auth"

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
