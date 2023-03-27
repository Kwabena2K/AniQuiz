import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="container">
      <p>
        <a href="https://github.com/Kwabena2K">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/-kwabena-osei/">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </p>
      <p className="owner">
        {/* calendar function to update to the current year */}
        &copy; {new Date().getFullYear()} Designed by{" "}
        <a href="https://kwabenaosei.com/"> Kwabena Osei</a>
      </p>
      <p className="description">Created with React, HTML and CSS</p>
    </div>
  );
}

export default Footer;
