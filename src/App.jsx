import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product/Product";
import Homepage from "./pages/Homepage/Homepage";
import Pricing from "./pages/Product/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/City/CityList";
import City from "./components/City/City";
import CountriesList from "./components/Country/CountriesList";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
