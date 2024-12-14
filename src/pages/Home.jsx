import { Box, Container } from "@mui/material";
import SearchFilter from "../components/SearchFilter";
export default function Home() {
  
  return (
    <div>
      <Container maxWidth="lg" sx={{ marginLeft: "8px" }}>
        <Box display="flex" flexDirection="row">
          <SearchFilter />
        </Box>
      </Container>
    </div>
  );
}

