import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProfile } from "./routes/UserProfile";
import { Layout } from "./components/Layout";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { AuthProvider } from "./contexts/useAuth";
import { PrivateRoute } from "./components/PrivateRoute";
import { CreatePost } from "./routes/CreatePost";
import { Home } from "./routes/Home";
import { Search } from "./routes/Search";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              element={
                <Layout>
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                </Layout>
              }
              path="/"
            />
            <Route
              element={
                <Layout>
                  <PrivateRoute>
                    <UserProfile />
                  </PrivateRoute>
                </Layout>
              }
              path="/:username"
            />
            <Route
              element={
                <Layout>
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                </Layout>
              }
              path="/create/post"
            />
            <Route
              element={
                <Layout>
                  <PrivateRoute>
                    <Search />
                  </PrivateRoute>
                </Layout>
              }
              path="/search"
            />
            <Route
              element={
                <Layout>
                  <Login />
                </Layout>
              }
              path="/login"
            />
            <Route
              element={
                <Layout>
                  <Register />
                </Layout>
              }
              path="/register"
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
