import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProfile } from "./routes/UserProfile";
import { Layout } from "./components/Layout";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
            path="/:username"
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
      </Router>
    </ChakraProvider>
  );
}

export default App;
