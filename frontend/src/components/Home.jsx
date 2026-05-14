import logu from "../assets/nyu.png";
import pogu from "../assets/pgaph.png";
import jogu from "../assets/image copy 3.jpeg";
import { Download, ArrowRight , PenTool, Code2,Smartphone,BrainCircuit, ExternalLink } from "lucide-react";
import roject from "../assets/imagecopy.png";
import oject from "../assets/imagcopy.png";
import ject from "../assets/imagopy.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import "./Home2.css";
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
const services = [
    {
      icon: <PenTool size={28} />,
      title: "UI/UX Design",
      desc: "Designing intuitive and engaging user experiences with pixel-perfect attention to detail.",
      link: "/services#uiux",
    },
    {
      icon: <Code2 size={28} />,
      title: "Web Development",
      desc: "Building responsive, performant, and scalable web applications with modern technologies.",
      link: "/services#webdev",
    },
    {
      icon: <Smartphone size={28} />,
      title: "Responsive Design",
      desc: "Creating fluid layouts that deliver a seamless experience on every device and screen size.",
      link: "/services#responsive",
    },
    {
      icon: <BrainCircuit size={28} />,
      title: "AI Model Development",
      desc: "Developing intelligent AI solutions and custom ML models for real-world applications.",
      link: "/services#ai",
    },
  ];

const ServiceCard = ({ service, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Trigger animation every time the card enters the viewport while scrolling down.
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.15,
                // Start slightly before the card is fully in view.
                rootMargin: "0px 0px -10% 0px",
            }
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`service-card ${isVisible ? 'service-card--visible' : ''}`}
            style={{ transitionDelay: `${index * 120}ms` }}
        >
            <div className="service-card__icon-wrap">
                {service.icon}
            </div>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.desc}</p>
            <Link to={service.link} className="service-card__link">
                Learn More <ArrowRight size={15} />
            </Link>
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
    const waveRef = useRef(null);
    const [isWaving, setIsWaving] = useState(false);
    const nameref = useRef(null);
    const lastnameref = useRef(null);
    const numberref = useRef(null);
    const emailref = useRef(null);
    const messageref = useRef(null);

    const [name, setname] = useState("");
    const [load, setload] = useState(false);
    const [submission, setsubmission] = useState("");
    const [lastname, setlastname] = useState("");
    const [number, setnumber] = useState("");
    const [email, setemail] = useState("");
    const [message, setmessage] = useState("");
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                    } else {
                        entry.target.classList.remove("in-view");
                    }
                });
            },
            { threshold: 0.15 }
        );

        const images = document.querySelectorAll('.scroll-anim-image');
        images.forEach((img) => observer.observe(img));

        return () => {
            images.forEach((img) => observer.unobserve(img));
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsWaving(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const waveObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsWaving(true);
                } else {
                    setIsWaving(false);
                }
            },
            { threshold: 0.5 }
        );

        if (waveRef.current) {
            waveObserver.observe(waveRef.current);
        }

        return () => waveObserver.disconnect();
    }, []);
    
    const handleSend = async () => {
        setload(true);
        const formData = {
            name: nameref.current.value,
            lastname: lastnameref.current.value,
            number: numberref.current.value,
            email: emailref.current.value,
            message: messageref.current.value,
        };

        if (!formData.name || !formData.lastname || !formData.email) {
            setload(false);
            alert("Please fill in all required fields (Name, Lastname, and Email).");
            return;
        }

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
            const { data } = await axios.post(`${API_BASE_URL}/api/contact`, formData);

         setsubmission( data.message || "Thanks for Submission!");
         setload(false);
        //  alert(data.message || "Thanks for Submission!");

            // Clear the form
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
        } catch (error) {
            // setload(false);
            console.error("Error sending contact:", error);
            const msg = error.response?.data?.message || "Failed to send contact information. Please check if the backend is running.";
            alert(msg);
        }
    };
    // if(load){
    //     document.getElementById("load").style.display = "block";
    // }
    // else{
    //     document.getElementById("load").style.display = "none";
    // }

    return (
        <div className="homee ">
            <div className=" profilew animate-fade-in-up ">
               
                <div className="para">
                    <h1 className="hello animate-fade-in-up delay-2" style={{color:"rgb(241, 186, 2)" , fontWeight:"bold" , fontSize:"2.6rem"}}>Hello, <span ref={waveRef} className={`wave-emoji${isWaving ? ' waving' : ''}`}>👋</span></h1>
                    <h3 className="bit animate-fade-in-up delay-2">I'm Harish Puhaniya</h3>
                    <p className="pai animate-fade-in-up delay-3">
                       I’m Harish Puhaniya, a UI/UX Designer and Web Developer currently pursuing a B.Tech in Information Technology at National Institute of Technology Kurukshetra. Passionate about creating user-centered digital experiences, I enjoy combining clean design with functional development to build modern and impactful web solutions.</p>
                    {/* freel: visible for >=450px inside para */}
                    <div className="freel freel-inside">
                      <h3 style={{display:"flex", justifyContent:"center", gap:"12px" , alignItems:"center"}}><div className="blink"></div>Freelancer</h3>
                      <p>Book now </p>
                    </div>
                    {/* action buttons: visible only on >=750px inside para */}
                    <div className="action-btns action-btns-inside">
                      <div className="action-btn">Download CV <Download size={18} /></div>
                      <div className="action-btn">See My Work <ArrowRight size={18} /></div>
                    </div>
                </div>
                 <div className={`imgg animate-fade-in-up delay-1  ${!isImageLoaded ? 'skeleton-loading' : ''}` } >
                    <img 
                        src={logu} 
                        alt="ScamShield" 
                        className={`logu rama  ${isImageLoaded ? 'loaded' : 'loading'}`} 
                        onLoad={() => setIsImageLoaded(true)} 
                    />
                </div>
            </div>
<p className="pao animate-fade-in-up delay-3">
                       I’m Harish Puhaniya, a UI/UX Designer and Web Developer currently pursuing a B.Tech in Information Technology at National Institute of Technology Kurukshetra. Passionate about creating user-centered digital experiences, I enjoy combining clean design with functional development to build modern and impactful web solutions.
                    </p>
            {/* freel for <450px: outside profilew, below it */}
            <div className="freel freel-outside">
              <h3 style={{display:"flex", justifyContent:"center", gap:"12px" , alignItems:"center"}}><div className="blink"></div>Freelancer</h3>
              <p>Book now </p>
            </div>

            {/* action buttons for <=749px: below profilew */}
            <div className="action-btns action-btns-outside">
              <div className="action-btn">Download CV <Download size={18} /></div>
              <div className="action-btn">See My Work <ArrowRight size={18} /></div>
            </div>
           <h2 className="section-heading mar">
  <span className="circi"></span>
  What I Do
</h2>
 <h2 className="titu mar">Services I Provide</h2>
 <div className="services-grid">
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} index={index} />
      ))}
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
                <h2 className="peveal">MY LATEST WORK <span><Link to="/projects" className="see-more">CLICK HERE</Link></span></h2>
                <div className="projects">
                    <div className="project-item peveal">
                        <img src={roject} alt="Project 1" className="scroll-anim-image" />
                        <div className="project-info">
                            <h3>ScamShield</h3>
                        </div>
                    </div>
                    <div className="project-item peveal">
                        <img src={oject} alt="Project 2" className="scroll-anim-image" />
                        <div className="project-info">
                            <h3>Campus-managment</h3>
                        </div>
                    </div>
                    <div className="project-item peveal">
                        <img src={ject} alt="Project 3" className="scroll-anim-image" />
                        <div className="project-info">
                            <h3>Interative Map</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="photography photography-reveal" id="photography">
                <div className="pgraphy image-reveal">
                    <img src={pogu} alt="ScamShield" className="pogu scroll-anim-image" />
                </div>
                <div className="tgraphy text-reveal">
                    <h1>
                        Photography for Fun
                    </h1>
                    <p>
                        Capturing moments that tell a story. Photography is not just about taking pictures, it's about preserving memories and exploring the beauty of the world through a lens.
                    </p>
                    <Link to="/photos"><button>Explore More</button></Link>
                </div>
            </div>
            <div className="photography photography-reveal" id="blogs">
                <div className="pgraphy image-reveal">
                    <img src={jogu} alt="ScamShield" className="pogu scroll-anim-image" />
                </div>
                <div className="tgraphy text-reveal">
                    <h1>
                        Blogs
                    </h1>
                    <p>
                        Blogs are online platforms where individuals share ideas, knowledge, and experiences. They help build personal brands, educate readers, and showcase skills through creative writing, tutorials, and insights on various topics.
                    </p>
                    <Link to="https://harishpuhaniya.blogspot.com/"><button>Explore More</button></Link>
                </div>
            </div>
            <div className="contact" id="contact">
                <div className="details">
                    <div className="parac">
                        <h1>Contact</h1>
                        <p>If you’d like to get in touch, feel free to contact me anytime.
                             I’m always open to discussing new ideas, projects, collaborations,
                              or answering your questions. Your feedback and suggestions are highly
                               appreciated. You can reach out through email, phone, or social media,
                             and I’ll do my best to respond as quickly as possible.</p>
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
          {load && (
  <div className=" joko" >
  <span className="visually-hidden">Sending...</span>
</div>
)}
            <h3>{name}</h3>
            <h3>{lastname}</h3>
            <h3>{number}</h3>
            <h3>{email}</h3>
            <h3>{message}</h3>

        </div>
    );
}

export default Home;
