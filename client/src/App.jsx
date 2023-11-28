import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from './contexts/userContext.jsx';
import './static/loader.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Admin from './ui/pages/admin/Admin';
import Posts from './ui/pages/admin/post/Posts';
import CreatePost from "./ui/pages/admin/post/CreatePost";
import UpdatePost from "./ui/pages/admin/post/UpdatePost";
import ReadPost from './ui/pages/admin/post/ReadPost';
import Tags from './ui/pages/admin/tag/Tags';
import Categories from './ui/pages/admin/category/Categories';
import Loader from "./ui/components/Loader.jsx";
import Authentication from './ui/pages/auth/Authentication.jsx'
import Users from "./ui/pages/admin/user/Users.jsx";
import Autherization from "./ui/pages/auth/Autherization.jsx";
import VerifyEmail from "./ui/pages/auth/VerifyEmail.jsx";
import Single from './ui/pages/main/single/Single.jsx';
import Contact from './ui/pages/main/contact/Contact.jsx';
import Home from './ui/pages/main/home/Home.jsx';
import ResetPassword from "./ui/pages/auth/ResetPassword.jsx";
import Settings from './ui/pages/main/settings/Settings.jsx';

AOS.init();

function App() {

  const location = useLocation()

  const [userData, setUserData] = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isEmpty = (obj) => {
    for (var prop in obj)
      if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
    return JSON.stringify(obj) === JSON.stringify({});
  }

  useEffect(() => {
    const url = location.pathname;
    if (url === "/" || url.includes("single")) import('./static/main.css');
    else if (url.includes("contact")) {
      import('./static/main.css');
      import('./static/contact.css');
    }
    else if (url.includes("admin")) import('./static/admin.css');
    else if (url === "login" || url === "register") import('./static/auth.css');
    else if (url.includes("settings")) import('./static/settings.css');
  }, [location]);

  useEffect(() => {
    if (userData === undefined) setIsLoading(true)
    else {
      if (document.cookie.token && isEmpty(userData)) setIsLoading(true);
      else if (!isEmpty(userData)) {
        if (userData.isAdmin) {
          setIsAdmin(true);
          setTimeout(() => { setIsLoading(false); }, 1000)
        }
        else setTimeout(() => { setIsLoading(false); }, 1000);
      }
      else setTimeout(() => { setIsLoading(false); }, 1000);
    }

  }, [userData, isAdmin]);

  return (
    <>
      {
        isLoading ? <Loader /> :
          <Routes>
            <Route path="admin" element={<Admin />} >
              <Route index element={<Posts />} />
              <Route path="createpost" element={<CreatePost />} />
              <Route path="posts" element={<Posts />} />
              <Route path="updatepost">
                <Route path=":postId" element={<UpdatePost />} />
              </Route>
              <Route path="post">
                <Route path=":postId" element={<ReadPost />} />
              </Route>
              <Route path="tags" element={<Tags />}></Route>
              <Route path="categories" element={<Categories />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="">
              <Route index element={<Home />} />
              <Route path="login" element={<Authentication />} />
              <Route path="register" element={<Autherization />} />
              <Route path="verifyEmail" element={<VerifyEmail />} />

              <Route path="register" element={isEmpty(userData) ? <Autherization /> : <Navigate replace to={"/"} />} />
              <Route path="single">
                <Route path=":postId" element={<Single />} />
              </Route>
              <Route path="contact" element={<Contact />} />
              <Route path="resetPassword">
                <Route path=":token" element={<ResetPassword />} />
              </Route>
              <Route path="settings">
                <Route path=":userId" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
      }
    </>
  );
}

export default App; 