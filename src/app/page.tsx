import HoverImage from "@/components/HoverImages";
import RandomAbout from "@/components/RandomAbout";
import RandomNameChanger from "@/components/RandomNameChanger";
import Slider from "@/components/slider";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import TreeComponent from "@/components/Tree";

import { getMarkdownContent } from "@/lib/markdown";
import Image from "next/image";

const createImageArray = (count: number) => {
  const images = [];
  for (let i = 1; i <= count; i++) {
    images.push(`/images/${i}.jpg`);
  }
  return images;
};

const images = createImageArray(11);

const HomePage = async () => {
  const { contentHtml } = await getMarkdownContent("content/experience.md");
  const slides = [
    {
      title: "Christian Bautista Website",
      description: "",
      image: "/images/work-1.png",
    },
  ];

  return (
    <>
    <div className="main-container">
     
      <div className="top-level">
        <div className="top-one">
          <video
            src="/videos/train.mp4"
            autoPlay
            muted
            loop
            className="about-video"
          />
            <div className="card-title-section">
              <AboutIcon/>
              <span>About.</span>
            </div>
          <div className="about-container">
            <h2>About Me</h2>
            <RandomAbout />
          </div>
        </div>
        <div className="top-two">
          <div className="top-two-one">
            <div className="card-title-section">
              <ExperienceIcon/>
              <span>Experience.</span>
            </div>
            <div
              className="experience"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
          <div className="top-two-two">
            <RandomNameChanger />
            <div className="flex gap-1">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"].map(
                (tech) => (
                  <div
                    key={tech}
                    className="text-xs rounded-md bg-slate-900 px-2 py-1 "
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="top-three">
        <div className="card-title-section">
              <GameIcon/>
              <span>Mini Island.</span>
            </div>
          <TreeComponent />
        </div>
      </div>
      <div className="bottom-level">
        <div className="bottom-one">
          <div className="card-title-section">
            <EducationIcon/>
            <span>Education.</span>
          </div>
          <div className="education-wrapper">
          <h2>My Education</h2>
            <ul>
              <li>Pangasinan State University</li>
              <li>BS Information Technology</li>
              <li>2014-2018</li>
            </ul>
          </div>
          <Image width={363} height={347} src="/images/education.jpg" alt="Under Grad Days" />
        </div>
        <div className="bottom-two">
          <div className="bottom-two-one">
            <div className="card-title-section">
              <CameraIcon/>
              <span>Camera Roll.</span>
            </div>
            <HoverImage
              images={images}
              alt="Random Image"
              width={400}
              height={400}
            />
          </div>
          <SpotifyPlayer className="bottom-two-two" />
        </div>
        <div className="bottom-three">
          <Slider slides={slides} />
          <div className="card-title-section">
            <WorkIcon/>
            <span>Works.</span>
          </div>
        </div>
      </div>
    </div>
     <div className="particles-wrapper">
     <ul className="particles">
       {[...Array(100)].map((_, i) => (
         <li key={i} className="particle"/>
       ))}
     </ul>
   </div>
   </>
  );

};

export default HomePage;


function AboutIcon() {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="35"
    height="35"
    className="section-icons"
  >
    <path
      d="m19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-1,6v11.09c0,.854-.551,1.59-1.371,1.831-.821.236-1.681-.08-2.144-.799l-6.486-10.88v10.758c0,.553-.448,1-1,1s-1-.447-1-1V6.911c0-.854.551-1.59,1.371-1.832.817-.24,1.681.08,2.144.799l6.486,10.88V6c0-.552.448-1,1-1s1,.448,1,1Z"
      fill="#fff" />
  </svg>;
}

function ExperienceIcon() {
  return <svg
  xmlns="http://www.w3.org/2000/svg"
  id="Filled"
  viewBox="0 0 24 24"
  width="35"
  height="35"
  className="section-icons"
>
  <path
    d="M19,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H5A5.006,5.006,0,0,0,0,9v3H24V9A5.006,5.006,0,0,0,19,4ZM8.184,4A3,3,0,0,1,11,2h2a3,3,0,0,1,2.816,2Z"
    fill="#fff"
  />
  <path
    d="M13,15a1,1,0,0,1-2,0V14H0v5a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V14H13Z"
    fill="#fff"
  />
</svg>
}

function GameIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" width="35"
  height="35"
  className="section-icons">
  <path d="M471.486,107.389c-19.107-33.968-53.075-53.075-91.29-53.075H127.557c-38.214,0-72.183,19.107-91.29,53.075  c-23.353,42.46-36.091,89.167-36.091,137.996c0,116.766,46.706,212.302,106.151,212.302c31.845,0,57.322-29.722,76.429-91.29  c2.123-8.492,10.615-14.861,21.23-14.861h104.028c8.492,0,16.984,6.369,21.23,14.861c19.107,61.568,44.583,91.29,76.429,91.29  c59.445,0,106.151-95.536,106.151-212.302C507.578,196.555,494.84,149.849,471.486,107.389z M191.248,224.155h-21.23v21.23  c0,12.738-8.492,21.23-21.23,21.23s-21.23-8.492-21.23-21.23v-21.23h-21.23c-12.738,0-21.23-8.492-21.23-21.23  c0-12.738,8.492-21.23,21.23-21.23h21.23v-21.23c0-12.738,8.492-21.23,21.23-21.23s21.23,8.492,21.23,21.23v21.23h21.23  c12.738,0,21.23,8.492,21.23,21.23C212.478,215.663,203.986,224.155,191.248,224.155z M331.367,266.615  c-16.984,0-31.845-14.861-31.845-31.845s14.861-31.845,31.845-31.845c16.984,0,31.845,14.861,31.845,31.845  S346.228,266.615,331.367,266.615z M392.935,202.925c-14.861,0-31.845-14.861-31.845-31.845s16.984-31.845,31.845-31.845  s31.845,14.861,31.845,31.845S409.919,202.925,392.935,202.925z" fill="#fff"/>
  </svg>
}

function EducationIcon() {
  return <svg
  id="Layer_1"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  data-name="Layer 1"
  width="35"
  height="35"
  className="section-icons"
>
  <path
    d="m24 8.48v11.52a1 1 0 0 1 -2 0v-8.248l-7.4 3.536a5 5 0 0 1 -2.577.694 5.272 5.272 0 0 1 -2.7-.739l-7.38-3.513a3.691 3.691 0 0 1 -.084-6.455c.027-.016.056-.031.084-.045l7.457-3.558a5.226 5.226 0 0 1 5.282.045l7.375 3.513a3.767 3.767 0 0 1 1.943 3.25zm-11.978 9.5a7.26 7.26 0 0 1 -3.645-.972l-4.377-2.089v2.7a5.007 5.007 0 0 0 3.519 4.778 15.557 15.557 0 0 0 4.481.603 15.557 15.557 0 0 0 4.481-.607 5.007 5.007 0 0 0 3.519-4.778v-2.691l-4.459 2.13a6.983 6.983 0 0 1 -3.519.928z"
    fill="#fff"
  />
</svg>
}

function CameraIcon() {
  return <svg
  xmlns="http://www.w3.org/2000/svg"
  id="Filled"
  viewBox="0 0 24 24"
  width="35"
  height="35"
  className="section-icons"
>
  <path
    d="M17.721,3,16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L6.279,3Z"
    fill="#fff"
  />
  <circle cx="12" cy="14" r="4" fill="#fff" />
  <path
    d="M19,5H5a5.006,5.006,0,0,0-5,5v9a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10A5.006,5.006,0,0,0,19,5ZM12,20a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,20Z"
    fill="#fff"
  />
</svg>
}

function WorkIcon() {
  return <svg
  xmlns="http://www.w3.org/2000/svg"
  id="Layer_1"
  data-name="Layer 1"
  viewBox="0 0 24 24"
  width="35"
  height="35"
  className="section-icons"
>
  <path
    d="M19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5ZM7.293,12.705l2.583,2.583c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-2.583-2.583c-.567-.566-.879-1.32-.879-2.122s.312-1.555,.879-2.122l2.583-2.583c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.583,2.583c-.189,.189-.293,.44-.293,.707s.104,.519,.293,.708Zm10.828,1.419l-2.583,2.583c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.583-2.583c.188-.189,.293-.44,.293-.708s-.104-.518-.293-.707l-2.583-2.584c-.391-.391-.391-1.024,0-1.414,.391-.391,1.023-.391,1.414,0l2.583,2.583c.566,.566,.879,1.32,.879,2.121s-.312,1.555-.879,2.122Z"
    fill="white"
  />
</svg>
}