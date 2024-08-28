import { Box, Button, Paper, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import Confetti from "react-confetti";
import github from "../../assets/github.png";
import leetcode from "../../assets/leetcode.png";
import codechef from "../../assets/codechef.png";
import codeforces from "../../assets/codeforces.png";
import DownloadIcon from "@mui/icons-material/Download";
import "../../styles/resumetemplate1.css";
import { Link } from "react-router-dom";
import Feedback from "../Feedback";
import moment from "moment";
import html2pdf from "html2pdf.js";

export default function KanikaResumeTemplate() {
  const ref = useRef();
  const profile = useSelector((state) => state.profileDetails);
  const education = useSelector((state) => state.educationDetails);
  const projects = useSelector((state) => state.projectDetails);
  const experience = useSelector((state) => state.experienceDetails);
  const extraDetails = useSelector((state) => state.extraDetails);
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [feedbackShown, setFeedbackShown] = useState(false);

  useEffect(() => {
    const feedbackAlreadyShown = localStorage.getItem('feedbackShown');
    if (feedbackAlreadyShown) {
      setFeedbackShown(true);
    }
  }, []);

  const handleDownload = () => {
    try {
      const resumeContainer = document.querySelector(".resume-container");

      if (resumeContainer) {
        setLoading(true);
        const opt = {
          margin: 0.1,
          filename: 'kanika-resume.pdf',
          image: { type: 'jpeg', quality: 1.00 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().set(opt).from(resumeContainer).save().then(() => {
          setLoading(false);
          setCongratsVisible(true);

          setTimeout(() => {
            setCongratsVisible(false);
          }, 5000);
        });
      } else {
        console.error("Resume container not found.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customStyle = {
    width: "100%",
    maxWidth: "794px",
    height: "1123px",
    maxHeight: "1123px",
    padding: "1rem 2rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
  };

  const returnLinks = {
    profile: "/profile",
    education: "/education",
    projects: "/projects",
    experience: "/experience",
    extraDetails: "/extraDetails",
  };

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={congratsVisible ? 600 : 0}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "2vw",
          flexGrow: 1,
        }}
      >
        <Paper className="resume-container" elevation={2} style={customStyle} ref={ref}>
          <Box sx={{ flexShrink: 4 }}>
            {/* Heading */}
            <h1 className="name-heading">
              {profile.firstName} {profile.lastName}
            </h1>
            <div className="user-detail">
              <div className="data">
                <p><i className="fa-solid fa-phone" /></p>
                <p className="sub-heading">{profile.mobile}</p>
              </div>
              <div className="data">
                <p><i className="fa-solid fa-envelope" /></p>
                <p className="sub-heading">{profile.email}</p>
              </div>
              <div className="data">
                <p><i className="fa-solid fa-map-marker" /></p>
                <p className="sub-heading">{profile.address}</p>
              </div>
            </div>

            <div className="resume-content">
              {/* Left section */}
              <div className="left-section">

                {/* Education */}
                <div className="education-info">
                  <div className="heading">Education</div>
                  <hr />
                  <div className="info">
                    <div className="college">{education.college}</div>
                    <div className="clg-details">
                      <div className="clg-degree">
                        {education.year} {education.branch} Engineering
                      </div>
                      <div className="meta-data">
                        <div className="dates">
                          <i className="fa-solid fa-calendar" />
                          {education.startYear}-{education.endYear}
                        </div>
                        <div className="locality">
                          <i className="fa-solid fa-map-marker" />
                          {education.city}
                        </div>
                      </div>
                      <div className="grade">
                        {education?.grades && <p>CGPA: {education?.grades}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <div className="higher-clg">{education.higherCollege}</div>
                    <div className="clg-details">
                      <div className="meta-data">
                        <div className="dates">
                          <i className="fa-solid fa-calendar" />
                          {education.startYear2}-{education.endYear2}
                        </div>
                        <div className="locality">
                          <i className="fa-solid fa-map-marker" />
                          {education.city2}
                        </div>
                      </div>
                      <div className="grade">
                        {education?.percentage && <p>Percentage: {education?.percentage}%</p>}
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <div className="school">{education.school}</div>
                    <div className="school-details">
                      <div className="meta-data">
                        <div className="dates">
                          <i className="fa-solid fa-calendar" />
                          {education.startYear3}-{education.endYear3}
                        </div>
                        <div className="locality">
                          <i className="fa-solid fa-map-marker" />
                          {education.city3}
                        </div>
                      </div>
                      <div className="grade">
                        {education?.percentage2 && <p>Percentage: {education?.percentage2}%</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {extraDetails?.skills.languages && extraDetails?.skills.languages.length > 0 && (
                  <div className="skills">
                    <div className="heading">Skills</div>
                    <hr />
                    {extraDetails?.skills.languages?.length > 0 && (
                      <>
                        <h4 className="skill-names">Languages:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.languages?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.web?.length > 0 && (
                      <>
                        <h4 className="skill-names">Web:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.web?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.webFrameworks?.length > 0 && (
                      <>
                        <h4 className="skill-names">Web Frameworks:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.webFrameworks?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.databases?.length > 0 && (
                      <>
                        <h4 className="skill-names">Databases:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.databases?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    {extraDetails?.skills.devTools?.length > 0 && (
                      <>
                        <h4 className="skill-names">Dev Tools:</h4>
                        <div className="skillset">
                          <ul className="sk">
                            {extraDetails?.skills.devTools?.map((skill, index) => (
                              <li key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Certifications */}
                {extraDetails?.certifications?.length > 0 && (
                  <div className="certifications">
                    <div className="heading">Certifications</div>
                    <hr />
                    <div className="info">
                      {extraDetails?.certifications?.map((certification, index) => (
                        <div className="certification-item" key={index}>
                          <div className="certification-name">{certification.name}</div>
                          <div className="certification-details">
                            <div className="meta-data">
                              <div className="date">
                                <i className="fa-solid fa-calendar" />
                                {moment(certification.date).format("MMMM YYYY")}
                              </div>
                              <div className="issuer">
                                <i className="fa-solid fa-building" />
                                {certification.issuer}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {experience?.length > 0 && (
                  <div className="experience">
                    <div className="heading">Experience</div>
                    <hr />
                    {experience?.map((exp, index) => (
                      <div className="exp-item" key={index}>
                        <div className="exp-company">{exp.company}</div>
                        <div className="exp-details">
                          <div className="exp-position">
                            {exp.position} ({exp.startYear} - {exp.endYear})
                          </div>
                          <div className="exp-location">
                            <i className="fa-solid fa-map-marker" />
                            {exp.city}
                          </div>
                          <div className="exp-description">{exp.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {projects?.length > 0 && (
                  <div className="projects">
                    <div className="heading">Projects</div>
                    <hr />
                    {projects?.map((proj, index) => (
                      <div className="project-item" key={index}>
                        <div className="project-title">{proj.title}</div>
                        <div className="project-details">
                          <div className="project-description">{proj.description}</div>
                          <div className="project-links">
                            {proj.github && (
                              <a href={proj.github} target="_blank" rel="noopener noreferrer">
                                <img src={github} alt="GitHub" />
                              </a>
                            )}
                            {proj.leetcode && (
                              <a href={proj.leetcode} target="_blank" rel="noopener noreferrer">
                                <img src={leetcode} alt="LeetCode" />
                              </a>
                            )}
                            {proj.codechef && (
                              <a href={proj.codechef} target="_blank" rel="noopener noreferrer">
                                <img src={codechef} alt="CodeChef" />
                              </a>
                            )}
                            {proj.codeforces && (
                              <a href={proj.codeforces} target="_blank" rel="noopener noreferrer">
                                <img src={codeforces} alt="Codeforces" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </Box>
        </Paper>
        <div>
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
            variant="contained"
            color="primary"
            onClick={handleDownload}
            endIcon={<DownloadIcon />}
          >
            {loading ? <CircularProgress size={24} /> : "Download Resume"}
          </Button>
        </div>
      
        {feedbackShown ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Provide Feedback
          </Button>
        ) : (
          <Link to={returnLinks.profile} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              Provide Feedback
            </Button>
          </Link>
        )}
        <Feedback open={open} handleClose={handleClose} />
      </Box>
    </>
  );
}
