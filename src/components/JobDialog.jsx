import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Stack,
  Link,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';

const JobDialog = ({ open, onClose, selectedJob }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Typography variant="h6" gutterBottom>
          {selectedJob?.job.job_title}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 0.5 }} color="action" />
            <Typography variant="body2">{selectedJob?.company.city}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PeopleIcon sx={{ mr: 0.5 }} color="action" />
            <Typography variant="body2">{selectedJob?.company.company_size} employees</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkHistoryIcon sx={{ mr: 0.5 }} color="action" />
            <Typography variant="body2">{selectedJob?.job.years_of_experience} years</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MonetizationOnIcon sx={{ mr: 0.5 }} color="action" />
            <Typography variant="body2">{selectedJob?.job.salary}</Typography>
          </Box>
        </Stack>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Point</Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Location Point:</strong> {selectedJob?.location_point}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Company Size Point:</strong> {selectedJob?.company_size_point}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Job Title Point:</strong> {selectedJob?.job_title_point}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Experience Point:</strong> {selectedJob?.experience_point}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Salary Point:</strong> {selectedJob?.salary_point}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, fontWeight: 'bold', color: 'primary.main', paddingTop: 1 }}>
            <strong>Total Point:</strong> {selectedJob?.point}
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Job description</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Salary:</strong> {selectedJob?.job.salary}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Experience:</strong> {selectedJob?.job.years_of_experience} years
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Description:</strong> {selectedJob?.job.description}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Skills:</strong> {selectedJob?.job.skills}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Responsibilities:</strong> {selectedJob?.job.responsibilities}
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Company</Typography>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Name:</strong> {selectedJob?.company.company_name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Industry:</strong> {selectedJob?.company.industry}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Company Size:</strong> {selectedJob?.company.company_size} employees
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Contact number:</strong> {selectedJob?.company.contact}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Location:</strong> {selectedJob?.company.city}, {selectedJob?.company.country}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Website: </strong> 
                    <Link href={selectedJob?.company.website} target="_blank" rel="noopener" underline="hover">
                        {selectedJob?.company.website}
                    </Link>
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Benefit:</strong> {selectedJob?.company.benefit}
                </Typography>
            </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

JobDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedJob: PropTypes.shape({
    job: PropTypes.shape({
      job_title: PropTypes.string,
      salary: PropTypes.string,
      years_of_experience: PropTypes.number,
      description: PropTypes.string,
      skills: PropTypes.string,
      responsibilities: PropTypes.string,
    }),
    location_point: PropTypes.number,
    company_size_point: PropTypes.number,
    job_title_point: PropTypes.number,
    experience_point: PropTypes.number,
    salary_point: PropTypes.number,
    point: PropTypes.number,
    company: PropTypes.shape({
      company_name: PropTypes.string,
      industry: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      company_size: PropTypes.string,
      website: PropTypes.string,
      benefit: PropTypes.string,
      contact: PropTypes.string
    })
  })
};

export default JobDialog;