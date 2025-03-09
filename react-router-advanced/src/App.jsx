import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="*" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
