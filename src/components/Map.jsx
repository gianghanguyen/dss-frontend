import { Box, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { ReactBingmaps } from "react-bingmaps";

const key = "AsgCTq23zlkffLKJ3ASt2KqbtL6qNUX7EFwoub3jmXCc5GSNQWz8obkPArC3W_an";

function Map({ setLocation }) {
  const [pushPins, setPushPins] = React.useState([
    {
      location: [21.004, 105.846],
      option: { color: "blue" },
    },
  ]);
  const [searchInput, setSearchInput] = React.useState("");
  const [selectLocation, setSelectLocation] = React.useState(null);
  const [boundary, setBoundary] = React.useState(null);

  const handleSubmit = (event) => {
    if (searchInput !== null && searchInput !== "") {
      setBoundary({
        search: searchInput,
        polygonStyle: {
          fillColor: "rgba(161,224,255,0.4)",
          strokeColor: "#a495b2",
          strokeThickness: 2,
        },
        option: {
          entityType: "PopulatedPlace",
        },
      });
    }
    setLocation(selectLocation);
    event.preventDefault();
  };

  const getLocation = (event) => {
    const { latitude, longitude } = event;

    fetch(
      `https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?key=${key}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.resourceSets && data.resourceSets.length > 0) {
          const addressLine =
            data.resourceSets[0].resources[0].address.formattedAddress;
          setSearchInput(addressLine);
          setSelectLocation({ latitude, longitude });
        }
      })
      .catch((error) => console.error("Error fetching address:", error));

    setPushPins([
      {
        location: [latitude, longitude],
        option: { color: "blue" },
      },
    ]);
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" bgcolor="white">
      <Box
        component="form"
        onSubmit={handleSubmit}
        p="4px"
        display="flex"
        columnGap="8px"
      >
        <TextField
          size="small"
          onChange={(event) => setSearchInput(event.target.value)}
          value={searchInput}
          placeholder="Location"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
      <Box sx={{ width: "100%", height: "100%" }}>
        <ReactBingmaps
          center={[21.004, 105.846]}
          bingmapKey={key}
          boundary={boundary}
          getLocation={{
            addHandler: "click",
            callback: (event) => {
              const location = {
                latitude: event.latitude,
                longitude: event.longitude,
              };
              getLocation(location);
            },
          }}
          pushPins={pushPins}
        ></ReactBingmaps>
      </Box>
    </Box>
  );
}
Map.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

export default Map;
