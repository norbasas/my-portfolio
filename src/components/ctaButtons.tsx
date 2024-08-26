"use client";
import React, { useState } from "react";

const CtaButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactMeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 cta-group">
        <button>My Resume</button>
        <button onClick={handleContactMeClick}>Contact Me</button>
      </div>
      {isModalOpen && (
        <div className="contact-modal" >
            
          <div className="contact-modal-content">
            <h2>Contact Me <button onClick={handleCloseModal}><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width={20} height={20}><path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm3.707,14.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.293,2.293,2.293,2.293Z" fill="#fff"/></svg></button></h2>
            <ul>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width={50}
                    height={50}
                    className="contact-icon"
                  >
                    <path
                      d="M1.225,8.467C1.331,8.344,8.48,1.449,8.48,1.449a5.026,5.026,0,0,1,7.055.015s7.134,6.88,7.239,7l-8.653,8.654a3.074,3.074,0,0,1-4.242,0Zm14.31,10.069a5.024,5.024,0,0,1-7.07,0L.229,10.3A4.962,4.962,0,0,0,0,11.708V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V11.708a4.962,4.962,0,0,0-.229-1.408Z"
                      fill="#fff"
                    />
                  </svg>
                  Email
                  <ArrowIcon/>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width={50}
                    height={50}
                    className="contact-icon"
                  >
                    <path
                      d="M1.225,8.467C1.331,8.344,8.48,1.449,8.48,1.449a5.026,5.026,0,0,1,7.055.015s7.134,6.88,7.239,7l-8.653,8.654a3.074,3.074,0,0,1-4.242,0Zm14.31,10.069a5.024,5.024,0,0,1-7.07,0L.229,10.3A4.962,4.962,0,0,0,0,11.708V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V11.708a4.962,4.962,0,0,0-.229-1.408Z"
                      fill="#fff"
                    />
                  </svg>
                  Linkedin
                  <ArrowIcon/>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width={50}
                    height={50}
                    className="contact-icon"
                  >
                    <path
                      d="M1.225,8.467C1.331,8.344,8.48,1.449,8.48,1.449a5.026,5.026,0,0,1,7.055.015s7.134,6.88,7.239,7l-8.653,8.654a3.074,3.074,0,0,1-4.242,0Zm14.31,10.069a5.024,5.024,0,0,1-7.07,0L.229,10.3A4.962,4.962,0,0,0,0,11.708V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V11.708a4.962,4.962,0,0,0-.229-1.408Z"
                      fill="#fff"
                    />
                  </svg>
                  Email
                  <ArrowIcon/>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width={50}
                    height={50}
                    className="contact-icon"
                  >
                    <path
                      d="M1.225,8.467C1.331,8.344,8.48,1.449,8.48,1.449a5.026,5.026,0,0,1,7.055.015s7.134,6.88,7.239,7l-8.653,8.654a3.074,3.074,0,0,1-4.242,0Zm14.31,10.069a5.024,5.024,0,0,1-7.07,0L.229,10.3A4.962,4.962,0,0,0,0,11.708V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V11.708a4.962,4.962,0,0,0-.229-1.408Z"
                      fill="#fff"
                    />
                  </svg>
                  Email
                  <ArrowIcon/>
                </a>
              </li>
            </ul>
          </div>
          <div className="contact-modal-bg" onClick={handleCloseModal}></div>
        </div>
      )}
    </>
  );

    function ArrowIcon() {
        return <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width={20}
            height={20}
            className="contact-arrow"
        >
            <path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" fill="#fff" />
        </svg>;
    }
};

export default CtaButtons;
