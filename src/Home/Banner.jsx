import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const slides = [
  {
    src: "https://i.ibb.co/TDpkB17k/Albedo-Base-XL-A-modern-digital-service-platform-homepage-conce-2.jpg",
    alt: "Reliable Services Banner",
    text: "Reliable Services, Real Reviews",
  },
  {
    src: "https://i.ibb.co/3yNLgWnH/Albedo-Base-XL-Creative-servicebased-platform-showcasing-people-2.jpg",
    alt: "Empower Business Banner",
    text: "Empower Your Business with Trust",
  },
  {
    src: "https://i.ibb.co/0p2nk82s/Albedo-Base-XL-Professional-workspace-with-people-reviewing-ser-0.jpg",
    alt: "Customer Feedback Banner",
    text: "Discover What Customers Really Think",
  },
];

const Banner = () => {
  return (
    <Swiper autoplay={{ delay: 3000 }} loop modules={[Autoplay]}>
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[300px] md:h-[500px] max-w-6xl mx-auto mt-10 px-4">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0   flex items-center justify-center text-white text-3xl md:text-5xl font-bold text-center px-4">
              {slide.text}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
