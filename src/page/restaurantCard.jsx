import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";

function RestaurantCards() {
  const imageUrls = [
    "https://media.express24.uz/r/600/600/WDPvQsBFRFeRSzepL9lnl.jpg",
    "https://media.express24.uz/r/600/600/wHp2MytyZ2vdMsKBcaGdH.jpg",
    "https://media.express24.uz/r/600/600/Tz3OzYvIQueW32NGMj9bx.jpg",
    "https://media.express24.uz/r/600/600/gdqzzOeShkYxNHrnd88xu.jpg",
    "https://media.express24.uz/r/600/600/JTPsJw8n4g9OsA2tqysKa.jpg",
    "https://media.express24.uz/r/600/600/4kzhnne9fID24253Q3QCF.jpg",
    "https://media.express24.uz/r/600/600/HAsAvesrz81FGWvftv6lN.jpg",
    "https://media.express24.uz/r/600/600/l7jb3Id5FboZpGZeC3cFT.jpg",
  ];

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Generate card data using the provided image URLs
    const cards = imageUrls.map((imageUrl, index) => ({
      id: index,
      name: `Restaurant ${index + 1}`,
      imageUrl: imageUrl,
    }));
    setCardData(cards);
  }, []);

  return (
    <Grid container spacing={1} maxWidth={"md"} marginX={"auto"} marginLeft={"8%"}>
      {cardData.map((card, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box
            key={card}
            width={209}
            height={"400px"}
            padding={1}
            bgcolor={"#f3f3f8"}
            borderRadius={"16px"}
            overflow="hidden"
            marginTop={2}
          >
            <img
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
              src={card.imageUrl}
              alt={card.name}
            />
            <p>{card.name}</p>
            <div style={{ padding: "10px", flexDirection: "column", display: "flex" }}></div>
            <Button
              sx={{
                backgroundColor: "white",
                width: "100%",
                borderRadius: "10px",
                color: "black",
                marginTop: "6.5rem",
              }}
            >
              70 000 sum
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default RestaurantCards;
