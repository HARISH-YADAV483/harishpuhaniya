import "./EducationNew.css";
import jroject from "../assets/hero.png";

const Education = () => {
    return (
        <div className="education-container parento">
            <div className="hero-section">
                <img src={jroject} alt="Academic Header" className="hero-img" />
                <div className="hero-overlay">
                    <h1 className="hero-title">Academic Journey & Skills</h1>
                </div>
            </div>

            <main className="content-wrapper">
                <section className="info-card fade-in">
                    <div className="card-header">
                        <i className="fas fa-university"></i>
                        <h2 className="black">Education</h2>
                    </div>
                    <div className="details">
                        <h3>Bachelor of Technology (B.Tech)</h3>
                        <p className="institution black">NIT Kurukshetra</p>
                        <p className="branch black">Information Technology (IT) - 1st Year</p>
                        <p className="desc">
                            Currently pursuing my engineering degree at one of India's premier technical institutions,
                            focusing on buildind a strong foundation in computer science and technology.
                        </p>
                    </div>
                </section>

                <section className="info-card slide-up delay-1">
                    <div className="card-header">
                        <i className="fas fa-microchip"></i>
                        <h2 className="black">Tech Interest</h2>
                    </div>
                    <div className="details">
                        <p className="desc">
                            I am highly passionate about the ever-evolving world of technology.
                            My journey is driven by a deep curiosity for how software shapes our future.
                            I love exploring new programming languages and the logic behind complex systems.
                        </p>
                    </div>
                </section>

                <section className="info-card slide-up delay-2">
                    <div className="card-header">
                        <i className="fas fa-layer-group"></i>
                        <h2 className="black">Current Focus</h2>
                    </div>
                    <div className="details">
                        <h3 >Full MERN Stack Development</h3>
                        <p className="desc">
                            I am currently dedicating my main skill development to Web Development.
                            My core expertise is being built around the MERN stack (MongoDB, Express.js, React, Node.js),
                            with a focus on creating production-ready, full-stack applications.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Education;