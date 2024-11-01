"use client";

import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Badge,
  Grid,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductCard = ({ productList }) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const handleMouseEnter = (id) => setHoveredProductId(id);
  const handleMouseLeave = () => setHoveredProductId(null);

  const toggleCart = () => setInCart((prev) => !prev);

  // Toggle favorite for a specific product
  const toggleFavorite = (id) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Toggle the favorite status for the specific product ID
    }));
  };

  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 10px",
        }}
      >
        {productList?.products.map((product) => {
          return (
            <Grid item xs={2} key={product.id}>
              <Card
                sx={{
                  maxWidth: 250,
                  position: "relative",
                  overflow: "visible",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {/* Discount Badge */}
                <Badge
                  badgeContent={`-৳${product.discountAmount || 200}`} // Assuming discountAmount is defined
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 10,
                    fontSize: "0.8rem",
                  }}
                />

                {/* Favorite Icon */}
                <IconButton
                  onClick={() => toggleFavorite(product.id)} // Pass product ID to toggleFavorite
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: favoriteStatus[product.id] ? "red" : "gray",
                    zIndex: 10,
                  }}
                >
                  {favoriteStatus[product.id] ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>

                {/* Product Image with Full Hover Overlay */}
                <Box
                  sx={{
                    position: "relative",
                  }}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail} // replace with your image URL
                    alt="Product Image"
                  />

                  {/* Full Image Overlay Buttons, visible on hover */}
                  {hoveredProductId === product.id && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        zIndex: 9,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={
                          inCart ? (
                            <RemoveShoppingCartIcon />
                          ) : (
                            <AddShoppingCartIcon />
                          )
                        }
                        onClick={toggleCart}
                        sx={{ fontSize: "0.8rem" }}
                      >
                        {inCart ? "Remove from Cart" : "Add to Cart"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<VisibilityIcon />}
                        sx={{
                          fontSize: "0.8rem",
                          color: "white",
                          borderColor: "white",
                        }}
                      >
                        Quick View
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Product Details */}
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {product.title}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" noWrap>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ৳{(product.price - product.discountPercentage).toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ৳{product.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductCard;
