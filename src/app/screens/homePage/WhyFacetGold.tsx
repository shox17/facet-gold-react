import React, { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: <VerifiedIcon />,
    title: "Ethically Sourced Materials",
    description: "Only certified gemstones and responsibly sourced metals",
  },
  {
    icon: <WorkspacePremiumIcon />,
    title: "Handcrafted Excellence",
    description: "Crafted by skilled artisans with meticulous attention to detail",
  },
  {
    icon: <CheckCircleIcon />,
    title: "Lifetime Quality Promise",
    description: "Designed to endure, backed by uncompromising standards",
  },
  {
    icon: <SecurityIcon />,
    title: "Secure & Trusted Checkout",
    description: "Protected payments and worldwide insured delivery",
  },
];

export default function WhyFacetGold() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="why-facet-gold-section" ref={sectionRef}>
      <div className="why-facet-gold-container">
        <Box className="why-facet-gold-header">
          <Box className="why-facet-gold-label">WHY FACET & GOLD</Box>
          <Box className="why-facet-gold-heading">Luxury You Can Trust</Box>
          <Box className="why-facet-gold-divider" />
          <Box className="why-facet-gold-subtitle">
            Crafted with integrity, designed to last a lifetime.
          </Box>
        </Box>
        <Stack
          className={`why-facet-gold-grid ${isVisible ? "visible" : ""}`}
          direction="row"
          spacing={0}
        >
          {trustItems.map((item, index) => (
            <Box
              key={index}
              className="why-facet-gold-item"
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <Box className="why-facet-gold-icon-wrapper">
                {item.icon}
              </Box>
              <Box className="why-facet-gold-item-title">{item.title}</Box>
              <Box className="why-facet-gold-item-description">
                {item.description}
              </Box>
            </Box>
          ))}
        </Stack>
      </div>
    </div>
  );
}

