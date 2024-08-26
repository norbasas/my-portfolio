"use client";
import React, { useState } from "react";

const CtaButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyText, setCopyText] = useState("norbzqwerty@gmail.com");
  const [showEmail, setShowEmail] = useState(false);

  const handleContactMeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowEmail(false);
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyText("Copied to clipboard!");
      setTimeout(() => {
        setCopyText("norbzqwerty@gmail.com");
      }, 2000);
    } catch (error) {
      setCopyText("Error: Unable to copy");
      setTimeout(() => {
        setCopyText("norbzqwerty@gmail.com");
      }, 2000);
    }
  };

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Email from Portfolio ✨");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: email, subject, message }),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Email sent successfully! 🎉");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => {
        setStatus(null);
      }, 5000);
      setIsLoading(false);
    } else {
      setStatus(`Failed to send email: ${result.error}`);
      setTimeout(() => {
        setStatus(null);
      }, 5000);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 cta-group">
        <a href="https://drive.google.com/file/d/1KFd28388Szp_RKfkB9aJ41WdaDYQz13G/view?usp=drive_link" target="_blank" rel="noreferrer" className="cta-btn">My Resume</a>
        <button className="cta-btn" onClick={handleContactMeClick}>Contact Me</button>
      </div>
      {isModalOpen && (
        <div className="contact-modal">
          {showEmail ? (
            <form onSubmit={sendEmail} className="contact-modal-email">
              <h2>
                Say Hi 👋{" "}
                <button onClick={() => setShowEmail(false)}>
                  <ArrowIcon />
                </button>
              </h2>
              <p className="email-status">{status}</p>
              <input
                type="email"
                placeholder="your@email.com"
                className="contact-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Message"
                className="contact-input"
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="email-submit" style={{pointerEvents: isLoading || status ? 'none' : undefined}}>
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          ) : (
            <div className="contact-modal-content">
              <h2>
                Contact Me{" "}
                <button onClick={handleCloseModal}>
                  <CloseIcon />
                </button>
              </h2>
              <ul>
                <li>
                  <div
                    role="button"
                    className="contact-link"
                    onClick={() => setShowEmail(true)}
                  >
                    <EmailIcon />
                    Email{" "}
                    <div
                      role="button"
                      onClick={(e) =>{
                        e.stopPropagation();
                        handleCopy((e.target as HTMLElement).innerText)
                      }}
                      className="sub-btn"
                    >
                      {copyText}
                    </div>
                    <ArrowIcon />
                  </div>
                </li>
                <li>
                  <a
                    className="contact-link"
                    href="https://www.linkedin.com/in/norbasas/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedinIcon />
                    Linkedin
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a
                    className="contact-link"
                    href="https://github.com/norbasas"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon />
                    Github
                    <ArrowIcon />
                  </a>
                </li>
                <li>
                  <a
                    className="contact-link"
                    href="https://www.instagram.com/nrbzbss/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon />
                    Instagram
                    <ArrowIcon />
                  </a>
                </li>
              </ul>
            </div>
          )}
          <div className="contact-modal-bg" onClick={handleCloseModal}></div>
        </div>
      )}
    </>
  );

  function CloseIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        width={20}
        height={20}
      >
        <path
          d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm3.707,14.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.293,2.293,2.293,2.293Z"
          fill="#fff"
        />
      </svg>
    );
  }

  function ArrowIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width={20}
        height={20}
        className="contact-arrow"
      >
        <path
          d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z"
          fill="#fff"
        />
      </svg>
    );
  }

  function EmailIcon() {
    return (
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
    );
  }

  function LinkedinIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        className="contact-icon"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
          fill="#fff"
        />
      </svg>
    );
  }

  function GithubIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        className="contact-icon"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          fill="#fff"
        />
      </svg>
    );
  }

  function InstagramIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        className="contact-icon"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          fill="#fff"
        />
      </svg>
    );
  }
};

export default CtaButtons;
