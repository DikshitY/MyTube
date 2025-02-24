import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// implemented lazy loading
const Home = lazy(() => import("./pages/Home"));
const Video = lazy(() => import("./pages/Video"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Search = lazy(() => import("./pages/Search"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Channel = lazy(() => import("./pages/Channel"));
const Upload = lazy(() => import("./pages/Upload"));
const MyChannel = lazy(() => import("./pages/MyChannel"));
const EditVideo = lazy(() => import("./pages/EditVideo"));

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="app-container">
      {/* toaster for using toast messages */}
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        {/* NAVBAR  */}
        <Navbar />
        <div className="main">
          {/* SIDEBAR  */}
          <Sidebar />
          <div className="wrapper">
            <Routes>
              <Route path="/">
                {/* PROTECTED ROUTES  */}
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="subscriptions"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <Home type="sub" />{" "}
                      </Suspense>
                    }
                  />
                  <Route
                    path="channel"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <Channel />
                      </Suspense>
                    }
                  />
                  <Route
                    path="channel/:id"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <MyChannel />
                      </Suspense>
                    }
                  />
                  <Route
                    path="upload"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <Upload />
                      </Suspense>
                    }
                  />
                  <Route
                    path="upload/:id"
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <EditVideo />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  index
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <Home type="random" />
                    </Suspense>
                  }
                />
                <Route
                  path="trends"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <Home type="trend" />
                    </Suspense>
                  }
                />
                <Route
                  path="search"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <Search />
                    </Suspense>
                  }
                />
                <Route
                  path="signin"
                  element={
                    currentUser ? (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                      </Suspense>
                    ) : (
                      <Suspense fallback={<div>Loading...</div>}>
                        <SignIn />
                      </Suspense>
                    )
                  }
                />
                <Route
                  path="video/:id"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <Video />
                    </Suspense>
                  }
                />
                {/* NOT FOUND PAGE  */}
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
