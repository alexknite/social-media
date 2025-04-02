import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProfile } from "./routes/UserProfile";
import { Layout } from "./components/Layout";
import { Login } from "./routes/Login";

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
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
