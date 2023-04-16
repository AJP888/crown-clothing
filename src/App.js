import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.components";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/sign-in/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

// Routes and Route
// Routes and Route allow us to re Route our Application to different Pages.
// We use the link to allow us to move from one page to another.

// shop/* can expect further routes in the shop
