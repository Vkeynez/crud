import AllUsers from './Component/AllUsers';
import AddUser from './Component/AddUser';
import NotFound from './Component/NotFound'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './Component/NavBar';

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="/all" element={<AllUsers /> } />
        <Route path="/add/:id" element={<AddUser />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
