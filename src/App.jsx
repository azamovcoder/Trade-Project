import "./App.css";

import { Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin/Admin";
import Customers from "./pages/Admin/customers/Customers";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Sellers from "./pages/Admin/sellers/Sellers";
import Storage from "./pages/Admin/storage/Storage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="customers" element={<Customers />} />
          <Route path="storage" element={<Storage />} />
          <Route path="sellers" element={<Sellers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
