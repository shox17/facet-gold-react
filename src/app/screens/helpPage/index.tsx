import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import GridLegacy from "@mui/material/GridLegacy";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Newsletter from "../homePage/Newsletter";
import "../../../css/help.css";
import { faq, faqCategories, FAQ } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState("General Information");
  const [expandedQuestion, setExpandedQuestion] = useState<string | false>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setExpandedQuestion(false);
  };

  const handleQuestionToggle = (question: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedQuestion(isExpanded ? question : false);
  };

  const filteredFAQs = faq.filter((item: FAQ) => item.category === selectedCategory);

  return (
    <div className="help-page">
      {/* Header Section */}
      <Box className="help-header-section">
        <Container className="help-header-container" maxWidth="lg">
          <Box className="help-breadcrumb">
            <Typography className="breadcrumb-item">Home</Typography>
            <Typography className="breadcrumb-separator">/</Typography>
            <Typography className="breadcrumb-item active">Help</Typography>
          </Box>
          <Box className="help-header-title">Help</Box>
          <Box className="help-header-subtitle">Find answers to your questions</Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container className="help-main-container" maxWidth="lg">
        <GridLegacy container spacing={4} className="help-content-grid">
          {/* Left Sidebar - Categories */}
          <GridLegacy item xs={12} md={4}>
            <Card className="help-categories-card" elevation={0}>
              <CardContent className="help-categories-content">
                <Typography className="help-categories-title">FAQs</Typography>
                <Box className="help-categories-list">
                  {faqCategories.map((category) => (
                    <Box
                      key={category}
                      className={`help-category-item ${selectedCategory === category ? "active" : ""}`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      <Typography className="help-category-text">{category}</Typography>
                    </Box>
                  ))}
                  </Box>
              </CardContent>
            </Card>
          </GridLegacy>

          {/* Right Content - FAQs */}
          <GridLegacy item xs={12} md={8}>
            <Box className="help-faqs-section">
              {selectedCategory === "General Information" ? (
                <Box className="help-faqs-list">
                  {filteredFAQs.map((item: FAQ, index: number) => {
                    const isExpanded = expandedQuestion === item.question;
                    return (
                      <Accordion
                        key={index}
                        expanded={isExpanded}
                        onChange={handleQuestionToggle(item.question)}
                        className="help-faq-accordion"
                        elevation={0}
                      >
                        <AccordionSummary
                          expandIcon={isExpanded ? <RemoveIcon className="help-faq-icon" /> : <AddIcon className="help-faq-icon" />}
                          className={`help-faq-summary ${isExpanded ? "expanded" : ""}`}
                        >
                          <Typography className="help-faq-question">{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="help-faq-details">
                          <Typography className="help-faq-answer">{item.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                    </Box>
              ) : (
                <Box className="help-faqs-list">
                  {filteredFAQs.map((item: FAQ, index: number) => {
                    const isExpanded = expandedQuestion === item.question;
                    return (
                      <Accordion
                        key={index}
                        expanded={isExpanded}
                        onChange={handleQuestionToggle(item.question)}
                        className="help-faq-accordion"
                        elevation={0}
                      >
                        <AccordionSummary
                          expandIcon={isExpanded ? <RemoveIcon className="help-faq-icon" /> : <AddIcon className="help-faq-icon" />}
                          className={`help-faq-summary ${isExpanded ? "expanded" : ""}`}
                        >
                          <Typography className="help-faq-question">{item.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="help-faq-details">
                          <Typography className="help-faq-answer">{item.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Box>
              )}
            </Box>
          </GridLegacy>
        </GridLegacy>

        {/* Terms Section */}
        <Box className="help-terms-section">
          <Card className="help-terms-card" elevation={0}>
            <CardContent className="help-terms-content">
              <Typography className="help-terms-title">Terms & Conditions</Typography>
              <Box className="help-terms-list">
                {terms.map((term, index) => (
                  <Box key={index} className="help-term-item">
                    <Typography className="help-term-text">{term}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Feature Section */}
        <Box className="help-features-section">
          <GridLegacy container spacing={3}>
            <GridLegacy item xs={12} md={4}>
              <Card className="help-feature-card" elevation={0}>
                <CardContent className="help-feature-card-content">
                  <Box className="help-feature-icon-wrapper">
                    <LocalShippingIcon className="help-feature-icon" />
                  </Box>
                  <Typography className="help-feature-title">Free Shipping</Typography>
                  <Typography className="help-feature-text">
                    Free shipping for order above $200
                  </Typography>
                </CardContent>
              </Card>
            </GridLegacy>
            <GridLegacy item xs={12} md={4}>
              <Card className="help-feature-card" elevation={0}>
                <CardContent className="help-feature-card-content">
                  <Box className="help-feature-icon-wrapper">
                    <PaymentIcon className="help-feature-icon" />
                  </Box>
                  <Typography className="help-feature-title">Flexible Payment</Typography>
                  <Typography className="help-feature-text">
                    Multiple secure payment options
                  </Typography>
                </CardContent>
              </Card>
            </GridLegacy>
            <GridLegacy item xs={12} md={4}>
              <Card className="help-feature-card" elevation={0}>
                <CardContent className="help-feature-card-content">
                  <Box className="help-feature-icon-wrapper">
                    <SupportAgentIcon className="help-feature-icon" />
                  </Box>
                  <Typography className="help-feature-title">24x7 Support</Typography>
                  <Typography className="help-feature-text">
                    We support online all days.
                  </Typography>
                </CardContent>
              </Card>
            </GridLegacy>
          </GridLegacy>
                      </Box>
      </Container>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
