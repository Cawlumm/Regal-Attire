import { Routes, Route } from "react-router-dom";
import Home from "./components/routes/home/home.component";
import NavigationSwitch from "./components/routes/navigation/navigation-switch.component";
import Shop from "./components/shop/shop.component";
import Checkout from "./components/routes/checkout/checkout.component";
import Authentication from "./components/routes/Authentication/Authentication.component";



const App = () => {

  return (
    <Routes>
      <Route path="/" element={<NavigationSwitch />}>
        <Route index element={<Home />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
