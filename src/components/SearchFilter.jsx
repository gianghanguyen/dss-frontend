import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Map from "./map";
import { Button, TextField, CircularProgress } from "@mui/material";
import api from "../utils/api";
import { toast } from "react-toastify";
import Detail from "./Detail";

export default function SearchFilter() {
  const [location, setLocation] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState("");
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const res = await api.get("/calculate", {
        params: {
          salaryWeight: 0.05,
          experienceWeight: 0.2,
          jobTitleWeight: 0.5,
          companySizeWeight: 0.05,
          locationWeight: 0.2,
          experience: experience,
          jobTitle: jobTitle,
          userLongtitude: location?.longitude,
          userLatitude: location?.latitude,
        },
      });

      setJobData(res.top_50_jobs);
      console.log(res.top_50_jobs);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
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
            onChange={(event) => setJobTitle(event.target.value)}
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

      <Box sx={{ width: "75%", p: "0px 20px", ml: 2 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          jobData.length > 0 && <Detail jobData={jobData} />
        )}
      </Box>
    </Box>
  );
}
