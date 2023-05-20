import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Browse from "./Browse";
import BrowseABrand from "./BrowseABrand";
import BrowseACategory from "./BrowseACategory";
import BrowseByBrand from "./BrowseByBrand";
import BrowseByCategory from "./BrowseByCategory";
import Cart from "./Cart";
import { ContactInfo } from "./ContactInfo";
import { Faq } from "./Faq";
import Footer from "./Footer";
import Form from "./Form";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import { HelpCenter } from "./HelpCenter";
import HomePage from "./HomePage";
import { NewsLetter } from "./NewsLetter";
import { OrderStatus } from "./OrderStatus";
import { ProductHelp } from "./ProductHelp";
import { Returns } from "./Returns";
import { Warranty } from "./Warranty";

/**
 *
 * @returns All routes and components for the whole app
 */
function App() {
  // Navigation state holds the current page info of where the user is
  const [navigationState, setNavigationState] = useState("home");
  // If confirmation is true, it means the user has completed the order + confirmation number
  const [confirmation, setConfirmation] = useState(false);
  // On fetch (GET) shows the quantity of items on the cart badge
  const [cartLength, setCartLength] = useState(null);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header
        navigationState={navigationState}
        cartLength={cartLength}
        setCartLength={setCartLength}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage setNavigationState={setNavigationState} />}
        />
        <Route
          path="/store"
          element={<Browse setNavigationState={setNavigationState} />}
        />
        <Route path="/store/brands" element={<BrowseByBrand />} />
        <Route path="/store/categories" element={<BrowseByCategory />} />
        <Route
          path="/store/brand/:company"
          element={
            <BrowseABrand
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          }
        />
        <Route
          path="/store/category/:category"
          element={
            <BrowseACategory
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              setNavigationState={setNavigationState}
              confirmation={confirmation}
              setConfirmation={setConfirmation}
              cartLength={cartLength}
              setCartLength={setCartLength}
            />
          }
        />
        <Route
          path="/form"
          element={
            <Form
              confirmation={confirmation}
              setConfirmation={setConfirmation}
              setCartLength={setCartLength}
            />
          }
        />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/orderstatus" element={<OrderStatus />} />
        <Route path="/producthelp" element={<ProductHelp />} />
        <Route path="/contactinfo" element={<ContactInfo />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
