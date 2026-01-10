import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Testimonial {
  name: string;
  role: string;
  title: string;
  text: string;
  rating: number;
  avatarUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Leslie Alexander",
    role: "Fashion Enthusiast",
    title: "Lovely Jewelry!",
    text: "I absolutely adore my new ring from Facet & Gold. The craftsmanship is exceptional, and the attention to detail is remarkable. It's become my favorite piece, and I receive compliments every time I wear it.",
    rating: 5.0,
    avatarUrl: "/img/potter.jpg",
  },
  {
    name: "Sarah Mitchell",
    role: "Jewelry Collector",
    title: "Amazing Designs!",
    text: "The quality and elegance of their pieces are unmatched. I've purchased multiple items, and each one exceeds my expectations. The team's dedication to excellence truly shows in every creation.",
    rating: 5.0,
    avatarUrl: "/img/ron.jpg",
  },
  {
    name: "Emily Chen",
    role: "Luxury Buyer",
    title: "Exquisite Craftsmanship",
    text: "Facet & Gold has become my go-to for special occasions. Their pieces are timeless, beautifully made, and the customer service is outstanding. Highly recommend to anyone seeking quality jewelry.",
    rating: 5.0,
    avatarUrl: "/img/hermione.jpg",
  },
  {
    name: "Jessica Martinez",
    role: "Style Consultant",
    title: "Perfect Gift Choice",
    text: "I gifted a necklace to my sister, and she was overjoyed. The packaging was elegant, and the piece itself is stunning. The brand truly understands luxury and attention to detail.",
    rating: 5.0,
    avatarUrl: "/img/dumbledor.jpg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth <= 768 ? 1 : 2);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);
  const totalSlides = Math.ceil(testimonials.length / cardsPerView);

  const goToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + cardsPerView;
      return Math.min(next, maxIndex);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - cardsPerView;
      return Math.max(prevIndex, 0);
    });
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="testimonials-section">
      <div className="testimonials-container">
        <Box className="testimonials-header">
          <Box className="testimonials-label">TESTIMONIALS</Box>
          <Box className="testimonials-title">What Our Clients Say</Box>
        </Box>

        <Box className="testimonials-slider-wrapper">
          <button
            className="testimonials-arrow testimonials-arrow-left"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous testimonials"
          >
            <ArrowBackIosIcon />
          </button>

          <Box className="testimonials-slider">
            <Box
              className="testimonials-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <Box key={index} className="testimonial-card">
                  <Box className="testimonial-rating-row">
                    <Box className="testimonial-stars">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="testimonial-star"
                          sx={{ fontSize: 18 }}
                        />
                      ))}
                    </Box>
                    <Box className="testimonial-rating-value">
                      {testimonial.rating.toFixed(1)}
                    </Box>
                  </Box>

                  <Box className="testimonial-title">{testimonial.title}</Box>

                  <Box className="testimonial-text">{testimonial.text}</Box>

                  <Box className="testimonial-author">
                    <Box className="testimonial-avatar">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                        />
                      ) : (
                        <span className="testimonial-avatar-initials">
                          {getInitials(testimonial.name)}
                        </span>
                      )}
                    </Box>
                    <Box className="testimonial-author-info">
                      <Box className="testimonial-author-name">
                        {testimonial.name}
                      </Box>
                      <Box className="testimonial-author-role">
                        {testimonial.role}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <button
            className="testimonials-arrow testimonials-arrow-right"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label="Next testimonials"
          >
            <ArrowForwardIosIcon />
          </button>
        </Box>

        <Box className="testimonials-pagination">
          {Array.from({ length: totalSlides }).map((_, index) => {
            const slideIndex = index * cardsPerView;
            const isActive =
              slideIndex <= currentIndex &&
              currentIndex < slideIndex + cardsPerView;
            return (
              <button
                key={index}
                className={`testimonials-dot ${isActive ? "active" : ""}`}
                onClick={() => goToSlide(slideIndex)}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </Box>
      </div>
    </div>
  );
}

