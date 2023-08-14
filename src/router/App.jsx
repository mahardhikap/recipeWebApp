import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Menu from '../pages/Menu';
import InputMenu from '../pages/InputMenu';
import UpdateMenu from '../pages/UpdateMenu'
import Home from '../pages/Home';
import SearchMenu from '../pages/SearchMenu';
import DetailMenu from '../pages/SearchMenu/_id';
import Login from '../pages/Auth/Login';
import AuthChecker from '../components/AuthChecker';
import Register from '../pages/Auth/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace={true} />} />
          <Route path="/menu" element={<AuthChecker><Menu /></AuthChecker>} />
          <Route path="/update-menu/:id" element={<UpdateMenu />} />
          {/* <Route path="/menu-detail/:id" element={<MenuDetail />} /> */}
          <Route path="/input-menu" element={<InputMenu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-menu" element={<SearchMenu />} />
          <Route path="/detail-menu/:id" element={<DetailMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
