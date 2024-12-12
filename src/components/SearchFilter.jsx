import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Map from "./map";
import { Button, TextField } from "@mui/material";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function SearchFilter() {
  const [location, setLocation] = useState(null);
  const [jobTitle, sẹtJobTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState("");

  const getResult = async () => {
    try {
      await api
      .post("/", {
        userLatitude: location.latitude,
        userLongtitude: location.longtitude,
        experience,
      })
      .then((res) => {
        console.log(res);
      });
    }
    catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ width: "25%", p: "0px 20px" }}>
      <Typography sx={{ fontSize: 16 }}>Location</Typography>
      <Box sx={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        <img src="https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg" />
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "600px",
          }}
        >
          <Map setLocation={setLocation} />
        </Box>
      </Modal>
      <Box sx={{ display: "flex-col", mt: 4 }}>
        <Typography sx={{ fontSize: 16 }}>Job Title</Typography>
        <TextField
          sx={{
            "& .MuiInputBase-root": {
              height: 45,
            },
            width: "100%",
          }}
          autoFocus
          placeholder="Enter job title"
          type="text"
          variant="outlined"
          value={jobTitle}
          onChange={(event) => sẹtJobTitle(event.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex-col", mt: 4 }}>
        <Typography sx={{ fontSize: 16 }}>Experience</Typography>
        <TextField
          sx={{
            "& .MuiInputBase-root": {
              height: 45,
            },
            width: "100%",
          }}
          autoFocus
          placeholder="Experience"
          type="text"
          variant="outlined"
          value={experience}
          onChange={(event) => setExperience(event.target.value)}
        />
      </Box>
      <Button onClick={getResult} sx={{ mt: 2 }}>
        Search
      </Button>
    </Box>
  );
}
