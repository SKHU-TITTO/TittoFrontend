import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { ComponentProps } from "react";

const PrevArrow = (props: ComponentProps<"button">) => (
  <button {...props} className="slick-prev" aria-label="Previous">
    <img
      src="/imgs/slider/leftarrow.png"
      alt="Previous"
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  </button>
);

const NextArrow = (props: ComponentProps<"button">) => (
  <button {...props} className="slick-next" aria-label="Next">
    <img
      src="/imgs/slider/rightarrow.png"
      alt="Next"
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  </button>
);
const MaxSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const navigate = useNavigate();

  return (
    <SliderWrap>
      <Slider {...settings}>
        <div>
          <Img1
            src={"/imgs/slider/slider1.png"}
            onClick={() => navigate("/slider/1/")}
            alt="Slide 1"
          />
        </div>
        <div>
          <Img1
            src="/imgs/slider/slider2.png"
            onClick={() => navigate("/slider/2/")}
            alt="Slide 2"
          />
        </div>
        <div>
          <Img1
            src="/imgs/slider/slider3.png"
            onClick={() => navigate("/slider/3/")}
            alt="Slide 3"
          />
        </div>
      </Slider>
    </SliderWrap>
  );
};

export default MaxSlider;

const SliderWrap = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;

  .slick-prev {
    left: 10px;
    z-index: 1;
    width: 40px;
    height: 40px;
    &:before {
      content: "";
    }
  }
  .slick-next {
    right: 10px;
    z-index: 1;
    width: 40px;
    height: 40px;
    &:before {
      content: "";
    }
  }
  .slick-prev:hover,
  .slick-next:hover {
  }
`;

const Img1 = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
