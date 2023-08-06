import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Menu from './pages/Menu';
import InputMenu from './pages/InputMenu';
import UpdateMenu from './pages/UpdateMenu'
import Home from './pages/Home';
import SearchMenu from './pages/SearchMenu';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/menu" replace={true} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/update-menu/:id" element={<UpdateMenu />} />
          {/* <Route path="/menu-detail/:id" element={<MenuDetail />} /> */}
          <Route path="/input-menu" element={<InputMenu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-menu" element={<SearchMenu />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
