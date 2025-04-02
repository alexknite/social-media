import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProfile } from "./routes/UserProfile";
import { Layout } from "./components/Layout";

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
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
