import { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Divider,
} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import JobDialog from '../components/JobDialog'; // Import the new component
import api from '../utils/api'; // Import the api instance

const JobList = () => {
    const [open, setOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]); // State to hold jobs
    const [currentPage, setCurrentPage] = useState(1); // State for current page

    const fetchJobs = async (page) => {
        try {
            const response = await api.get(`/info/point?size=10&page=${page}`);
            const jobsWithDetails = await Promise.all(response.points.map(async (job) => {
                const jobResponse = await api.get(`/info/job?jobId=${job._id}`);
                const companyResponse = await api.get(`/info/company?companyId=${job.company_id}`);
                return { 
                    ...jobResponse, 
                    ...companyResponse,
                    point: job.point,
                    company_size_point: job.weighted_company_size_point,
                    experience_point: job.weighted_experience_point,
                    job_title_point: job.weighted_job_title_point,
                    location_point: job.weighted_location_point,
                    salary_point: job.weighted_salary_point,
                    distance_to_ideal_point: job.distance_to_weighted_ideal,
                    distance_to_neagative_ideal_point: job.distance_to_weighted_negative_ideal,
                }; 
            }));
            setJobs(jobsWithDetails); // Update jobs state
            console.log(jobsWithDetails[0]);
        } catch (error) {
            console.error("Error fetching jobs:", error); // Handle errors
        }
    };

    useEffect(() => {
        fetchJobs(currentPage); // Fetch jobs when the component mounts or currentPage changes
    }, [currentPage]);

    const handleNextPage = () => {
            setCurrentPage(currentPage + 1); // Increment page
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Decrement page
        }
    };

    const handleClickOpen = (job) => {
        setSelectedJob(job);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ padding: 2, display: "flex", justifyContent: "center", backgroundColor: "grey.200" }}>
            <Grid container spacing={2} sx={{ maxWidth: "100%" }}>
                {jobs.map((job) => (
                    <Grid item xs={12} key={job.job.job_id}>
                        <Card
                            onClick={() => handleClickOpen(job)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 2,
                                transition: "0.3s",
                                borderRadius: 10,
                                "&:hover": {
                                    boxShadow: 3,
                                    transform: "scale(1.02)",
                                },
                            }}
                        >
                            {/* Job Information */}
                            <CardContent sx={{ flex: 1, marginLeft: 2 }}>
                                <Typography variant="h6" fontWeight="bold" color="text.primary">
                                    {job.job.job_title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ marginY: 0.5 }}
                                >
                                    <strong>Company:</strong> {job.company.company_name}
                                </Typography>
                                <Box display="flex" gap={1}>
                                    <Button variant="outlined" sx={{ borderRadius: "20px", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                                        {job.company.city}, {job.company.country}
                                    </Button>
                                    <Button variant="outlined" sx={{ borderRadius: "20px", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                                        {job.job.years_of_experience} years
                                    </Button>
                                </Box>
                                <Divider sx={{ marginY: 1 }} />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ marginTop: 1 }}
                                >
                                    <strong>Industry:</strong> {job.company.industry}
                                </Typography>
                                {/* Point Display */}
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Total Point:</strong> {job.point}
                                </Typography>
                            </CardContent>

                            {/* Salary and Time Posted */}
                            <Box textAlign="right" sx={{ position: 'relative', right: '10px', top: '-50px' }}>
                                <Typography variant="h6" fontWeight="bold" color="success.main">
                                    <MonetizationOnIcon sx={{ verticalAlign: 'middle', marginRight: 0.5 }} />
                                    {job.job.salary}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))}
                {/* Pagination Controls - Moved below job listings */}
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Button onClick={handleNextPage}>
                        Next
                    </Button>
                </Box>
            </Grid>

            {/* Popup Dialog */}
            <JobDialog
                open={open}
                onClose={handleClose}
                selectedJob={selectedJob}
            />
        </Box>
    );
};

export default JobList;
