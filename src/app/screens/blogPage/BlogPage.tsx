import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, InputAdornment, Button, Card, CardContent, Stack, Pagination, PaginationItem } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { NavLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Newsletter from "../homePage/Newsletter";
import "../../../css/blog.css";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

interface RecentPost {
  id: number;
  title: string;
  date: string;
  image: string;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Default blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Minimalist Jewelry: The New Fashion Staple",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      date: "19 June 2024",
      image: "/img/blog1.jpg",
      category: "Fashion",
    },
    {
      id: 2,
      title: "The Best Earrings for Every Hairstyle",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      date: "19 June 2024",
      image: "/img/blog2.jpg",
      category: "Style Guide",
    },
    {
      id: 3,
      title: "Choosing the Right Ring for Your Hand Shape",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      date: "19 June 2024",
      image: "/img/blog3.jpg",
      category: "Tips",
    },
    {
      id: 4,
      title: "Top Necklace Trends for 2024: Must-Have Styles",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      date: "19 June 2024",
      image: "/img/blog4.jpg",
      category: "Trends",
    },
    {
      id: 5,
      title: "Statement Earrings: How to Make a Bold Fashion Statement",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      date: "19 June 2024",
      image: "/img/blog5.jpg",
      category: "Fashion",
    },
    {
      id: 6,
      title: "Caring for Your Precious Jewelry: Maintenance Tips",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      date: "19 June 2024",
      image: "/img/blog6.jpg",
      category: "Care Guide",
    },
  ];

  const categories = [
    "Necklace",
    "Gold Jewelry",
    "Silver Jewelry",
    "Diamond Jewelry",
    "Earrings",
    "Gemstone Rings",
  ];

  const recentPosts: RecentPost[] = [
    {
      id: 1,
      title: "The Benefit to Modern Minimalist Jewelry",
      date: "19 June 2024",
      image: "/img/blog1.jpg",
    },
    {
      id: 2,
      title: "A Guide for Choosing the Perfect Engagement Ring",
      date: "19 June 2024",
      image: "/img/blog3.jpg",
    },
    {
      id: 3,
      title: "The Ultimate Guide to Cleaning and Storing Your Jewelry",
      date: "19 June 2024",
      image: "/img/blog6.jpg",
    },
  ];

  // Pagination logic
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="blog-page">
      {/* Header Section */}
      <Box className="blog-header-section">
        <Container className="blog-header-container" maxWidth="lg">
          <Box className="blog-breadcrumb">
            <NavLink to="/" className="breadcrumb-item">
              Home
            </NavLink>
            <NavigateNextIcon className="breadcrumb-separator" />
            <Typography className="breadcrumb-item active">Blog</Typography>
          </Box>
          <Typography className="blog-header-title">Our Latest News & Blogs</Typography>
          <Typography className="blog-header-subtitle">Discover our latest insights and stories</Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container className="blog-main-container" maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column - Blog Posts */}
          <Grid item xs={12} md={8}>
            <Box className="blog-posts-section">

              <Box className="blog-posts-list">
                {currentPosts.map((post) => (
                  <Card key={post.id} className="blog-post-card">
                    <Box className="blog-post-image-wrapper">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="blog-post-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      <Box className="blog-post-date-badge">{post.date}</Box>
                    </Box>
                    <CardContent className="blog-post-content">
                      <Typography className="blog-post-title">{post.title}</Typography>
                      <Typography className="blog-post-excerpt">{post.excerpt}</Typography>
                      <Button className="blog-read-more-btn" component={NavLink} to={`/blog/${post.id}`}>
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              {/* Pagination */}
              <Box className="blog-pagination-wrapper">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                  className="blog-pagination"
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Sidebar */}
          <Grid item xs={12} md={4}>
            <Box className="blog-sidebar">
              {/* Search */}
              <Card className="blog-sidebar-card">
                <CardContent>
                  <Typography className="blog-sidebar-title">Search</Typography>
                  <TextField
                    fullWidth
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon className="blog-search-icon" />
                        </InputAdornment>
                      ),
                    }}
                    className="blog-search-input"
                  />
                </CardContent>
              </Card>

              {/* Popular Category */}
              <Card className="blog-sidebar-card">
                <CardContent>
                  <Typography className="blog-sidebar-title">Popular Category</Typography>
                  <Stack spacing={1} className="blog-categories-list">
                    {categories.map((category, index) => (
                      <NavLink
                        key={index}
                        to={`/products?category=${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="blog-category-item"
                      >
                        {category}
                      </NavLink>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Recent Post */}
              <Card className="blog-sidebar-card">
                <CardContent>
                  <Typography className="blog-sidebar-title">Recent Post</Typography>
                  <Stack spacing={2} className="blog-recent-posts">
                    {recentPosts.map((post) => (
                      <Box key={post.id} className="blog-recent-post-item">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="blog-recent-post-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                        <Box className="blog-recent-post-content">
                          <Typography className="blog-recent-post-title">{post.title}</Typography>
                          <Typography className="blog-recent-post-date">{post.date}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Advertisement Banner */}
              <Card className="blog-sidebar-card blog-ad-banner">
                <Box className="blog-ad-content">
                  <Typography className="blog-ad-text">30% OFF on Latest Collection</Typography>
                  <Button className="blog-ad-button" component={NavLink} to="/products">
                    Explore
                  </Button>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Box className="blog-newsletter-wrapper">
        <Newsletter />
      </Box>
    </div>
  );
}
