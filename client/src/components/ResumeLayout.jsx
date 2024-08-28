import React from 'react';
import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function ResumeLayout() {
    const paperStyle = {
        margin: "20px",
        padding: "20px",
        width: "90%",
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    };
    
    const containerStyle = {
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 40px)", // Adjust to fit within the viewport
    };

    return (
        <Box style={containerStyle}>
            <Paper elevation={3} style={paperStyle}>
                <Outlet />
            </Paper>
        </Box>
    );
}
