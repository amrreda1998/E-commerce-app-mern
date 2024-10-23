import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { productCardProps } from "../types/productType";



export default function ProdcutCard({ title, image, price }: productCardProps) {
  return (
    <Card
      sx={{
        maxWidth: { xs: 300, sm: 300, md: 345 }, // Responsive max width
        margin: "auto", // Centers the card
        backgroundColor: "#e1f5fe",
      }}
    >
      <CardMedia
        sx={{
          height: { xs: 150, sm: 200, md: 300 }, // Responsive height for the image
          transition: "transform 0.3s ease-in-out", // Smooth transition for hover
          "&:hover": {
            transform: "scale(1.1)", // Enlarge the image on hover
          },
        }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} EGP
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ display: "flex", textAlign: "center", m:"auto" }}
          variant="contained"
          size="medium"
        >
          ِAdd to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
