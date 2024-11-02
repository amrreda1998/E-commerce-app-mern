import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { productCardProps } from "../types/productType";
import { BackendURL } from "../constants/baseURL";

const HomePage = () => {
  const [products, setProdcuts] = useState<productCardProps[]>([]);
  //handel errors
  const [error, setError] = useState(false);

  useEffect(() => {
    //modern syntax to fetch data from a server (more readable , scalability(no nesting then() (callback hell) ))
    const fetchData = async () => {
      try {
        const response = await fetch(`${BackendURL}/products`);
        const { data } = await response.json();
        setProdcuts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <Box sx={{ fontSize: 30, fontWeight: 4, textAlign: "center", mt: 10 }}>
        Something went wrong ☹️ !!!!
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {products.map((p: productCardProps) => (
          <Grid key={p._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard {...p}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
