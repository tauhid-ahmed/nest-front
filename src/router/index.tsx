import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import NewStory from "../pages/new-story/page";
import SearchPage from "../pages/search/page";
import WelcomePage from "../pages/welcome/page";
import Homepage from "../pages/home/page";
import PostDetails from "../pages/post-details/page";
import EditPostDeatailsPage from "../pages/edit-post/page";
import { useAuthentication } from "../context/auth-context";
import RootLayout from "./layout";

export default function PageRouter() {
  const { isSignedIn } = useAuthentication();
  return (
    <Router>
      <Routes>
        {!isSignedIn && <Route path="/" element={<WelcomePage />} />}
        {isSignedIn && (
          <Route element={<RootLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/posts" element={<Outlet />}>
              <Route path=":postId" element={<PostDetails />} />
              <Route path="edit/:postId" element={<EditPostDeatailsPage />} />
            </Route>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/new-story" element={<NewStory />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}
