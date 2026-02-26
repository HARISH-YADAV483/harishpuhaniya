import logu from "../assets/image.png";
import pogu from "../assets/pgaph.png";
import jogu from "../assets/bcover.png";

import roject from "../assets/imagecopy.png";
import oject from "../assets/imagcopy.png";
import ject from "../assets/imagopy.png";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import "./graphy.css";
import "./Education.css";
import "./Portfolio.css";
import "./contact.css";

const SkillBar = ({ name, targetWidth, count }) => {
    const [isVisible, setIsVisible] = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (barRef.current) {
            observer.observe(barRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`maal ${isVisible ? "visible" : ""}`} ref={barRef}>
            <div className="name">{name}</div>
            <div className="flex">
                <div className="loading" style={{ "--target-width": targetWidth }}></div>
                <div className="count">{count}</div>
            </div>
        </div>
    );
};

function Home() {
    const skills = [
        { name: "CLANG", targetWidth: "70%", count: "70%" },
        { name: "PYTHON", targetWidth: "50%", count: "50%" },
        { name: "JAVASCRIPT", targetWidth: "90%", count: "90%" },
        { name: "REACT", targetWidth: "90%", count: "90%" },
        { name: "NODE.JS", targetWidth: "75%", count: "75%" },
        { name: "HTML CSS", targetWidth: "95%", count: "95%" },
    ];
    const nameref = useRef(null);
    const lastnameref = useRef(null);
    const numberref = useRef(null);
    const emailref = useRef(null);
    const messageref = useRef(null);

    const [name, setname] = useState("");
    const [lastname, setlastname] = useState("");
    const [number, setnumber] = useState("");
    const [email, setemail] = useState("");
    const [message, setmessage] = useState("");
    const handleSend = async () => {
        const formData = {
            name: nameref.current.value,
            lastname: lastnameref.current.value,
            number: numberref.current.value,
            email: emailref.current.value,
            message: messageref.current.value,
        };

        if (!formData.name || !formData.lastname || !formData.email) {
            alert("Please fill in all required fields (Name, Lastname, and Email).");
            return;
        }

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
            const response = await fetch(`${API_BASE_URL}/api/contact`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Contact information sent successfully!");
                // Optionally clear the form
                nameref.current.value = "";
                lastnameref.current.value = "";
                numberref.current.value = "";
                emailref.current.value = "";
                messageref.current.value = "";
                setname("");
                setlastname("");
                setnumber("");
                setemail("");
                setmessage("");
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error sending contact:", error);
            alert("Failed to send contact information. Please check if the backend is running.");
        }
    };

    return (
        <div className="homee">
            <div className="profile animate-fade-in-up">
                <div className="imgg animate-fade-in-up delay-1">
                    <img src={logu} alt="ScamShield" className="logu" />
                </div>
                <div className="para">
                    <h1 className="hello animate-fade-in-up delay-2">Hello</h1>
                    <h3 className="bit animate-fade-in-up delay-2">A Bit About Me</h3>
                    <p className="pai animate-fade-in-up delay-3">
                        I'm Harish Puhaniya UI/UX designer and Web developer. Currently pursuing my B.tech degree from NIT Kurukshetra with Information Technology branch.
                    </p>
                    <div className="circles animate-fade-in-up delay-4 reveal">
                        <Link to="#education" className="ji"><div className="cici cicu">Education</div></Link>
                        <Link to="#portfolio" className="ji"><div className="cici cick">Project</div></Link>
                        <Link to="#photography" className="ji"><div className="cici cicb">Photos</div></Link>
                        <Link to="#blogs" className="ji"><div className="cici cicn">Blog</div></Link>
                    </div>
                </div>
            </div>

            <div className="educations" id="education">
                <h1 className="peveal">Education and Learnings</h1>
                <h2 className="peveal">My Knowledge Level in Software</h2>
                <div className="subjects">
                    {skills.map((skill, index) => (
                        <SkillBar key={index} {...skill} />
                    ))}
                    {/* <Link className="ji"><div className="explore">
                        Explore
                    </div></Link> */}
                </div>
                <div className="button">
                    <Link to="/education"><button className="explore">Explore more</button></Link>
                </div>
            </div>

            <div className="portfolio" id="portfolio">
                <h1 className="peveal">PORTFOLIO</h1>
                <h2 className="peveal">MY LATEST WORK <span><Link to="/projects" className="see-more">SEE MORE</Link></span></h2>
                <div className="projects">
                    <div className="project-item peveal">
                        <img src={roject} alt="Project 1" />
                        <div className="project-info">
                            <h3>ScamShield</h3>
                        </div>
                    </div>
                    <div className="project-item peveal">
                        <img src={oject} alt="Project 2" />
                        <div className="project-info">
                            <h3>Campus-managment</h3>
                        </div>
                    </div>
                    <div className="project-item peveal">
                        <img src={ject} alt="Project 3" />
                        <div className="project-info">
                            <h3>Interative Map</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="photography photography-reveal" id="photography">
                <div className="pgraphy image-reveal">
                    <img src={pogu} alt="ScamShield" className="pogu" />
                </div>
                <div className="tgraphy text-reveal">
                    <h1>
                        Photography for Fun
                    </h1>
                    <p>
                        Capturing moments that tell a story. Photography is not just about taking pictures, it's about preserving memories and exploring the beauty of the world through a lens.
                    </p>
                    <Link to="/contact"><button>Explore More</button></Link>
                </div>
            </div>
            <div className="photography photography-reveal" id="blogs">
                <div className="pgraphy image-reveal">
                    <img src={jogu} alt="ScamShield" className="pogu" />
                </div>
                <div className="tgraphy text-reveal">
                    <h1>
                        Blogs
                    </h1>
                    <p>
                        Blogs are online platforms where individuals share ideas, knowledge, and experiences. They help build personal brands, educate readers, and showcase skills through creative writing, tutorials, and insights on various topics.
                    </p>
                    <Link to="/contact"><button>Explore More</button></Link>
                </div>
            </div>
            <div className="contact" id="contact">
                <div className="details">
                    <div className="parac">
                        <h1>Contact</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, officia necessitatibus possimus nesciunt repellat mollitia. Beatae error tempora officiis, dolores illo hic corrupti non repellendus alias obcaecati at totam eaque.</p>
                        <p>+91 8396029503
                            <br />
                            harishpuhaniya@gmail.com
                        </p>
                    </div>
                </div>
                <div className="inputs">
                    <div className="name">
                        <input type="text" placeholder="Name" ref={nameref} required />
                        <input type="text" placeholder="Lastname" ref={lastnameref} required />

                    </div>
                    <div className="email">
                        <input type="text" placeholder="email" ref={emailref} required />
                    </div>
                    <div className="phone">
                        <input type="text" placeholder="phone" ref={numberref} />
                    </div>
                    <div className="message">
                        <input type="text" placeholder="message" ref={messageref} />
                    </div>
                    <div className="submit"><button onClick={handleSend}>Send</button></div>
                </div>
            </div>
            <h3>{name}</h3>
            <h3>{lastname}</h3>
            <h3>{number}</h3>
            <h3>{email}</h3>
            <h3>{message}</h3>

        </div>
    );
}

export default Home;