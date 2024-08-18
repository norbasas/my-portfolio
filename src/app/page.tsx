import RandomAbout from "@/components/RandomAbout";
import RandomNameChanger from "@/components/RandomNameChanger";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import TreeComponent from "@/components/Tree";

const HomePage = () => {
  return (
    <div className="main-container">
      <div className="top-level">
        <div className="top-one">
          <h2>About Me</h2>
          <RandomAbout/>
        </div>
        <div className="top-two">
          <div className="top-two-one">
            <div className="experience">
              
            <h2>Experience</h2>
              <h3>Front-End Web Developer</h3>
              <p>StunnerYPP Corporation | 03/2022 - Present</p>
              <ul>
                <li>Spearheaded development of error handlers for NextJS applications, reducing uncaught errors by 90%</li>
                <li>Converted website from ReactJS to NextJS framework, resulting in 20% improvement in page load times</li>
                <li>Developed and maintained multiple client websites using ReactJS, NextJS, and Vanilla JS plugins</li>
                <li>Implemented JSON-LD structured data for enhanced SEO performance</li>
                <li>Utilized Redis for efficient data caching and improved application performance</li>
                <li>Integrated Next-Auth for seamless user authentication and authorization</li>
                <li>Created custom NextJS site template for rapid client website development, reducing turnaround time by 30%</li>
                <li>Designed and implemented majority of UI components for company&apos;s monorepo NPM packages</li>
                <li>Utilized PM2 process manager to enhance application performance and reliability</li>
                <li>Developed site for VR streaming, enabling immersive user experiences</li>
                <li>Redesigned website to enhance visual appeal and user-friendliness, contributing to a 15% increase in user engagement</li>
                <li>Optimized websites for search engines, improving organic search rankings and click-through rates</li>
              </ul>
              <h3>Web Developer</h3>
              <p>JRomeDRosa and Co. Inc. (Gofer) | 07/2019 - 03/2022</p>
              <ul>
                <li>Translated static designs into interactive web elements using GatsbyJS, optimizing visual and coding components to improve loading speed and performance by up to 20%</li>
                <li>Developed and updated web applications using Laravel and Livewire frameworks</li>
                <li>Created learning management tool for delivery riders to master standard operating procedures and track progress</li>
                <li>Optimized SEO, elevating website to top rankings in local search results and increasing app downloads</li>
                <li>Introduced Git version control to streamline file sharing and collaboration on shared hosting platform</li>
                <li>Additional Experience</li>
                <li>Created layouts, graphics, and visual designs for digital advertisements and print media</li>
                <li>Monitored and reported on marketing expenses and performance metrics</li>
                <li>Provided customer service support and performed basic network administration tasks as needed</li>
              </ul>
           
            </div>
          </div>
          <div className="top-two-two">
            <RandomNameChanger />
            <div className="flex gap-1">
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'].map((tech) => (
                <span key={tech} className="text-xs rounded-md bg-slate-900 px-2 py-1 ">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="top-three">
          <TreeComponent />
        </div>
      </div>
      <div className="bottom-level">
        <div className="bottom-one">
          <h2>Education</h2>
          <ul>
            <li>Pangasinan State University</li>
            <li>BS Information Technology</li>
            <li>2014-2018</li>
          </ul>
        </div>
        <div className="bottom-two">
          <div className="bottom-two-one"><h2>More About me</h2></div>
          <SpotifyPlayer className="bottom-two-two"/>
        </div>
        <div className="bottom-three"><h2>Works</h2></div>
      </div>
    </div>
  );
};

export default HomePage;
