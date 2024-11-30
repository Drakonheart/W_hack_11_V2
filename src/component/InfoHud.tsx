import "./InfoHud.css";
import React, { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { motion } from 'framer-motion';



const InfoHud: React.FC = () => {
  const [active, setActive] = useState<"LIVE LOG" | "NOTIFI">("LIVE LOG");

  const handleToggle = (label: "LIVE LOG" | "NOTIFI") => {
    setActive(label);
  };

  const [fileContent, setFileContent] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
      };
      reader.readAsText(file);
    }
  };

  const [adjustable2Width, setAdjustable2Width] = useState(35); // Initial width of adjustable2

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = adjustable2Width;

    const handleMouseMove = (event: { clientX: number }) => {
      const deltaX = event.clientX - startX;

      // Adjust the width calculation to make it increase when dragging left
      const newWidth = Math.max(
        20,
        Math.min(80, startWidth - (deltaX / window.innerWidth) * 100)
      );

      setAdjustable2Width(newWidth); // Update the width of adjustable2
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  

  return (
    <motion.div
      className="info_hud_main"
      style={{
        width: `${adjustable2Width}%`, // Dynamically adjust width of adjustable2
      }}
      initial={{ opacity: 0, x: '100%' }} // Start off with 0 opacity and position off to the right
      animate={{ opacity: 1, x: 0 }} // Animate to full opacity and slide into position
      transition={{ duration: 0.7 }} // Transition duration for both opacity and x
    >
      <div
        className="resize-bar"
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          cursor: "col-resize",
          width: "5px",
          backgroundColor: "#444",
        }}
      />
      <div className="top_header_info_hud">
        <div className="top_header_info_hud_top_right_btn">
          {/* Hidden file input */}
          <input
            type="file"
            accept=".txt"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />

          {/* Button to trigger the file input */}
          <button
            className="upload_text_btn BTN1"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <UploadFileIcon />
          </button>
        </div>

        <div className="slider-container">
          <div
            className={`slider-button ${active === "LIVE LOG" ? "active" : ""}`}
            onClick={() => handleToggle("LIVE LOG")}
          >
            LIVE LOG
          </div>
          <div
            className={`slider-button ${active === "NOTIFI" ? "active" : ""}`}
            onClick={() => handleToggle("NOTIFI")}
          >
            NOTIFI
          </div>
        </div>
      </div>
      <div className="upload_log"></div>
      <div className="log_viewer">{fileContent}</div>
    </motion.div>
  );
};

export default InfoHud;
