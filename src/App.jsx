import { useCallback, useMemo, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

const slides = [
    {
        title: 'One Tap Setup',
        img: '/slide-img/one-tap.jpeg',
        imageWidth: 343,
        imageHeight: 375,
    },
    {
        title: 'Personalized Spatial Audio',
        img: '/slide-img/spatial-audio.jpeg',
        imageWidth: 211,
        imageHeight: 375,
    },
    {
        title: 'Audio Sharing',
        img: '/slide-img/audio-sharing.jpeg',
        imageWidth: 265,
        imageHeight: 352,
        centered: true,
    },
    {
        title: 'Automatic Switching',
        img: '/slide-img/automatic-switching.jpeg',
        imageWidth: 336,
        imageHeight: 100,
        centered: true,
    },
    {
        title: 'Siri',
        img: '/slide-img/siri.jpeg',
        imageWidth: 168,
        imageHeight: 168,
        centered: true,
    },
    {
        title: 'Accessibility',
        img: '/slide-img/a11y.jpeg',
        imageWidth: 135,
        imageHeight: 135,
        centered: true,
    },
];

const slideWidth = 400;
const slideMargin = 20;

const scrollToSlide = (slider, slideIndex) => {
    if (!slider) return;
    slider.scrollTo({
        left: slideIndex * (slideWidth + slideMargin),
        behavior: 'smooth',
    });
};

const App = () => {
    const sliderRef = useRef(null);
    const [sliderPosition, setSliderPosition] = useState(0);

    const currentSlide = useMemo(() => {
        return Math.floor(sliderPosition / (slideWidth + slideMargin));
    }, [sliderPosition]);

    const scrolledToEndOfSlider = useMemo(() => {
        if (!sliderRef.current) return false;
        const { scrollWidth, scrollLeft, clientWidth } = sliderRef.current;
        return scrollLeft + clientWidth >= scrollWidth - 1;
    }, [sliderPosition]);

    const goToNextSlide = useCallback(() => {
        scrollToSlide(sliderRef.current, currentSlide + 1);
    }, [currentSlide]);

    const goToPreviousSlide = useCallback(() => {
        scrollToSlide(sliderRef.current, currentSlide - 1);
    }, [currentSlide]);

    return (
        <div className="bg-gray-200 min-h-screen font-sans py-16">
            <h2 className="font-semibold text-6xl text-center max-w-[800px] mx-auto mb-20">
                A magical connection to your devices.
            </h2>

            <div className="h-[500px] overflow-hidden">
                <ul
                    ref={sliderRef}
                    onScroll={(ev) => {
                        setSliderPosition(ev.currentTarget.scrollLeft);
                    }}
                    className="flex h-[540px] pb-10 overflow-x-auto snap-x snap-mandatory mr-5"
                >
                    {slides.map((slide) => (
                        <li
                            key={slide.title}
                            className="snap-start snap-always shrink-0 mr-5 last:mr-0"
                        >
                            <div className="slide-center relative flex h-full flex-col bg-white w-[400px] rounded-2xl">
                                <div
                                    className={`h-full flex justify-center ${
                                        slide.centered
                                            ? 'items-center'
                                            : 'items-start'
                                    }`}
                                >
                                    <img
                                        src={slide.img}
                                        alt={slide.title}
                                        width={slide.imageWidth}
                                        height={slide.imageHeight}
                                    />
                                </div>

                                <h3 className="mt-auto text-2xl font-semibold p-6">
                                    {slide.title}
                                </h3>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    disabled={currentSlide === 0}
                    onClick={() => goToPreviousSlide()}
                    className="disabled:text-gray-400 disabled:border-gray-400 w-8 text-[2rem] h-8 border-2 border-black rounded-full flex items-center justify-center mr-2"
                >
                    <span className="sr-only">Previous slide</span>
                    <IoIosArrowBack className="w-5 h-5" />
                </button>
                <button
                    disabled={
                        scrolledToEndOfSlider ||
                        currentSlide === slides.length - 1
                    }
                    onClick={() => goToNextSlide()}
                    className="disabled:text-gray-400 disabled:border-gray-400 w-8 text-[2rem] h-8 border-2 border-black rounded-full flex items-center justify-center mr-2"
                >
                    <span className="sr-only">Next slide</span>
                    <IoIosArrowBack className="rotate-180 w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default App;
