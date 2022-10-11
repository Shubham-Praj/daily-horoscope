import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Autocomplete, Container, Paper, TextField } from "@mui/material";

const zodicSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpius",
  "Sagittarius",
  "Capricornus",
  "Aquarius",
  "Pisces",
];

function App() {
  const [cardData, setcardData] = useState({});

  const getData = async (zodic) => {
    const res = await fetch(
      `https://aztro.sameerkumar.website/?sign=${zodicSigns[zodic]}&day=today`,
      {
        method: "POST",
      }
    );

    const data = await res.json();

    setcardData(data);
  };

  console.log(cardData);

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <Autocomplete
          size="small"
          disablePortal
          options={zodicSigns}
          sx={{ width: "60%" }}
          onChange={(e) => getData(e.target.value)}
          renderInput={(params) => (
            <TextField {...params} label="Zodiac Signs" />
          )}
        />
      </Container>

      {Object.keys(cardData).length !== 0 && (
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Card sx={{ minWidth: 275 }} variant="outlined">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {cardData.color ? cardData.color : ""}
              </Typography>
              <Typography variant="h5" component="div"></Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      )}
    </>
  );
}

export default App;
