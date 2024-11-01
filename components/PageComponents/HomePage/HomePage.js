import ProductCard from "@/components/Card/Card";
import React from "react";

const getAllProductApi = async () => {
  try {
    const res = await fetch(`https://dummyjson.com/products`, {
      method: "GET",
    });
    const responseData = await res.json();

    // Since this API does not return a `code`, we check if the response was successful
    if (res.ok) {
      return responseData;
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error fetching https://dummyjson.com/products API:", error);
    return [];
  }
};

const HomePage = async () => {
  const productList = await getAllProductApi();
  console.log("productList", productList);

  return (
    <div>
      <ProductCard productList={productList} />
    </div>
  );
};

export default HomePage;
