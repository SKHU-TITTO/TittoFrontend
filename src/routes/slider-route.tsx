import { Routes, Route } from "react-router-dom";
import NotFound from "../screens/notfound";
import Slider1 from "../screens/slider/slider1";
import Slider2 from "../screens/slider/slider2";
import Slider3 from "../screens/slider/slider3";

const SliderRoutes = () => {
  return (
    <Routes>
      <Route path="/1" element={<Slider1 />} />
      <Route path="/2" element={<Slider2 />} />
      <Route path="/3" element={<Slider3 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SliderRoutes;
