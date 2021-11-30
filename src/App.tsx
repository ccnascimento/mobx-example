import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./index.css";
import Store from "./store";
import Home from "./routes/home";
import Favorites from "./routes/favorites";
import HeroeDetail from "./routes/heroeDetail";
import { ChakraProvider } from "@chakra-ui/react";

export const StoreContext = createContext({} as any);

function App() {
  return (
    <StoreContext.Provider value={new Store()}>
      <ChakraProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/heroes" element={<Home />} />
            <Route path="/heroes/:id" element={<HeroeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </ChakraProvider>
    </StoreContext.Provider>
  );
}

export default App;
