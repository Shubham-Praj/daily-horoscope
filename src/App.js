import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Box,
  Chip,
  Container,
  createTheme,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Tooltip,
  Zoom,
} from "@mui/material";
import bgImg from "./img/space.jpg";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const zodicSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

function App() {
  const [cardData, setcardData] = useState({});

  const getData = async (zodic) => {
    const res = await fetch(
      `https://aztro.sameerkumar.website/?sign=${zodic.toLowerCase()}&day=today`,
      {
        method: "POST",
      }
    );

    const data = await res.json();
    setcardData(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box sx={{ p: 5 }}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 5,
            }}
          >
            <Autocomplete
              size="small"
              disablePortal
              options={zodicSigns}
              sx={{
                width: "100%",
                backgroundColor: "black",
                borderRadius: "5px",
              }}
              onChange={(event, newValue) => {
                getData(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Zodiac Signs" />
              )}
            />
          </Container>

          {Object.keys(cardData).length !== 0 && (
            <Box
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "transparent",
                  backdropFilter: "blur(4.6px)",
                  borderRadius: "10px",
                  border: "1px solid white",
                }}
                variant="outlined"
              >
                <CardContent>
                  <Typography color="text.h1" gutterBottom variant="h5">
                    {cardData ? cardData.date_range : ""}
                  </Typography>

                  <Typography variant="body2">
                    {cardData.description}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Grid
                      spacing={2}
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Tooltip
                          title="Compatibility"
                          placement="bottom"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Chip label={cardData.compatibility} />
                        </Tooltip>
                      </Grid>

                      <Grid item>
                        <Tooltip
                          title="Color"
                          placement="bottom"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Chip label={cardData.color} />
                        </Tooltip>
                      </Grid>

                      <Grid item>
                        <Tooltip
                          title="Mood"
                          placement="bottom"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Chip label={cardData.mood} />
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip
                          title="Lucky Time"
                          placement="bottom"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Chip label={cardData.lucky_time} />
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip
                          title="Lucky Number"
                          placement="bottom"
                          arrow
                          TransitionComponent={Zoom}
                        >
                          <Chip label={cardData.lucky_number} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
