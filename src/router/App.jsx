import { Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import MyMenu from '../pages/RecipeMenu/MyMenu';
import InputMenu from '../pages/RecipeMenu/InputMenu';
import UpdateMenu from '../pages/RecipeMenu/UpdateMenu'
import Home from '../pages/RecipeMenu/Home';
import SearchMenu from '../pages/RecipeMenu/SearchMenu';
import DetailMenu from '../pages/RecipeMenu/DetailMenu';
import Login from '../pages/Auth/Login'
import AuthChecker from '../components/AuthChecker'
import Register from '../pages/Auth/Register';
import UserProfile from '../pages/Profile';
import Bookmarked from '../pages/RecipeMenu/Bookmark';
import Liked from '../pages/RecipeMenu/Like';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace={true} />} />
          <Route path="/mymenu" element={<AuthChecker><MyMenu /></AuthChecker>} />
          <Route path="/bookmarked" element={<AuthChecker><Bookmarked /></AuthChecker>} />
          <Route path="/liked" element={<AuthChecker><Liked /></AuthChecker>} />
          <Route path="/update-menu/:id" element={<AuthChecker><UpdateMenu /></AuthChecker>} />
          {/* <Route path="/menu-detail/:id" element={<MenuDetail />} /> */}
          <Route path="/input-menu" element={<AuthChecker><InputMenu /></AuthChecker>} />
          <Route path="/home" element={<Home />} />
          <Route path="/search-menu" element={<SearchMenu />} />
          <Route path="/detail-menu/:id" element={<DetailMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<AuthChecker><UserProfile /></AuthChecker>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
