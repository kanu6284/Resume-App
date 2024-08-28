import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation } from '../redux/educationSlice';
import { updateProfile } from '../redux/profileSlice';
import { updateProject } from '../redux/projectSlice';
import { updateExperience } from '../redux/experienceSlice';
import axios from 'axios';
import { BASE_URL } from '../api';
import { updateAchievements, updateExtraCoCurricular, updateSkills } from '../redux/extraDetailsSlice';

const theme = createTheme({
    palette: {
        primary: {
            main: '#00695c', // Dark teal
        },
        secondary: {
            main: '#ffab00', // Amber
        },
        background: {
            default: '#e0f2f1', // Light teal
        },
        text: {
            primary: '#004d40', // Darker teal
            secondary: '#00796b', // Medium teal
        },
    },
});

export default function LandingPage() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAllResumeData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/data/get-all-resume-data?id=${currentUser._id}`, {
                headers: {
                    authorization: currentUser.token,
                },
            });
            const resumeData = response.data.resumeData[0];
            if (resumeData) {
                dispatch(updateProfile(resumeData.profile));
                dispatch(updateEducation(resumeData.education[0]));
                resumeData.projects.forEach((project, index) => {
                    Object.keys(project).forEach(field => {
                        dispatch(updateProject({ index, field, value: project[field] }));
                    });
                });
                resumeData.experience.forEach((experience, index) => {
                    Object.keys(experience).forEach(field => {
                        dispatch(updateExperience({ index, field, value: experience[field] }));
                    });
                });
                const { skills, achievements, extraCoCurricular } = resumeData.extraDetails;
                Object.keys(skills).forEach((type) => {
                    skills[type].forEach((skill, index) => {
                        dispatch(updateSkills({ type, index, value: skill }));
                    });
                });
                achievements.forEach((achievement, index) => {
                    dispatch(updateAchievements({ index, value: achievement }));
                });
                extraCoCurricular.forEach((activity, index) => {
                    dispatch(updateExtraCoCurricular({ index, value: activity }));
                });
            }
        } catch (error) {
            console.error("Error in getAllResumeData:", error);
        }
    };

    useEffect(() => {
        getAllResumeData();
    }, []);

    const handleGetStarted = () => {
        navigate('/profile');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className='box-container'>
                <div style={{ color: theme.palette.text.primary }}>
                    <div className="img-container">
                        <div className="image-container-1">
                            <img src="https://static.vecteezy.com/system/resources/previews/005/367/549/original/illustration-of-resume-paper-with-magnifying-glass-suitable-for-design-element-of-job-vacancy-poster-recruitment-agency-website-background-and-resume-builder-service-vector.jpg" alt="image1" className="image-style-1" />
                        </div>
                        <div className="image-container-2">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvA1yIvd0LR6mu0Paty-WDZTb4zMGpcLdlWg&s" alt="image1" className="image-style-2" />
                        </div>
                        <div className="image-container-3">
                            <img src="https://cdn-blog.novoresume.com/articles/best-online-resume-builders/bg.png" alt="image1" className="image-style-3" />
                        </div>
                    </div>
                    <div>
                        <div className="overlay-text">
                            <Container maxWidth="md">
                                <motion.div
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: '800' }}>
                                        Elevate Your Career with a Stunning Resume
                                    </Typography>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                >
                                    <Typography variant="h5" component="h1" gutterBottom>
                                    "Build a standout resume effortlessly. Tailor your career story with easy-to-use tools, professional templates, and instant download options."
                                    </Typography>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                >
                                    <Button
                                        onClick={handleGetStarted}
                                        variant='outlined'
                                        sx={{
                                            borderRadius: '30px',
                                            color: theme.palette.primary.main,
                                            backgroundColor: theme.palette.secondary.main,
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.secondary.main,
                                                border: 'none'
                                            },
                                            border: 'none',
                                            fontWeight: 600
                                        }}
                                        size="large"
                                    >
                                        Let Started
                                    </Button>
                                </motion.div>
                            </Container>
                        </div>
                    </div>
                </div>
            </Box>
        </ThemeProvider>
    );
}
