import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Menu from './pages/Menu';
import InputMenu from './pages/InputMenu';
import UpdateMenu from './pages/UpdateMenu'
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace={true} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/update-menu/:id" element={<UpdateMenu />} />
          {/* <Route path="/menu-detail/:id" element={<MenuDetail />} /> */}
          <Route path="/input-menu" element={<InputMenu />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
