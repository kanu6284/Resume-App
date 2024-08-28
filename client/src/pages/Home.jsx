import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import Profile from "../components/Profile";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import ExtraDetails from "../components/ExtraDetails";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("profile");
  const navigate = useNavigate();

  // Handling navigation to next component
  const handleNext = () => {
    switch (activeComponent) {
      case "profile":
        setActiveComponent("educationalDetails");
        break;
      case "educationalDetails":
        setActiveComponent("projectsDetails");
        break;
      case "projectsDetails":
        setActiveComponent("experienceDetails");
        break;
      case "experienceDetails":
        setActiveComponent("extraDetails");
        break;
      default:
        break;
    }
  };

  // Handling navigation to previous component
  const handleBack = () => {
    switch (activeComponent) {
      case "educationalDetails":
        setActiveComponent("profile");
        break;
      case "projectsDetails":
        setActiveComponent("educationalDetails");
        break;
      case "experienceDetails":
        setActiveComponent("projectsDetails");
        break;
      case "extraDetails":
        setActiveComponent("experienceDetails");
        break;
      default:
        break;
    }
  };

  // Define styles
  const paperStyle = {
    margin: "10px",
    padding: "20px",
    backgroundColor: "#fff",
    width: "80%",
    height: "auto",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  };

  const getPageNumber = () => {
    switch (activeComponent) {
      case "profile":
        return 1;
      case "educationalDetails":
        return 2;
      case "projectsDetails":
        return 3;
      case "experienceDetails":
        return 4;
      case "extraDetails":
        return 5;
      default:
        return 1;
    }
  };

  const handleResume = () => {
    navigate("/resume/template=1");
  };

  return (
    <Box style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        {/* Render the appropriate step component based on the active step */}
        {activeComponent === "profile" && <Profile onNext={handleNext} />}
        {activeComponent === "educationalDetails" && (
          <Education onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "projectsDetails" && (
          <Projects onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "experienceDetails" && (
          <Experience onBack={handleBack} onNext={handleNext} />
        )}
        {activeComponent === "extraDetails" && (
          <ExtraDetails onBack={handleBack} />
        )}

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          {activeComponent !== "profile" && (
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ marginRight: "5px", borderRadius: "20px", width: "5rem" }}
            >
              Back
            </Button>
          )}
          {activeComponent !== "extraDetails" && (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ borderRadius: "20px", width: "5rem" }}
            >
              Next
            </Button>
          )}

          {activeComponent === "extraDetails" && (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <Button
                variant="contained"
                onClick={handleResume}
              >
                Review Your Resume
              </Button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <p>Page {getPageNumber()}</p>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default Home;
