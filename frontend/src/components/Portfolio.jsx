import React, { useEffect } from 'react';
import "./Portfolio.css";
import hostelImg from "../assets/hostel.png";
import projectImg from "../assets/project.png";
import personalImg from "../assets/personal.png";
import blogchitImg from "../assets/image copy 5.png";

const Portfolio = () => {
    const projects = [
        {
            id: 1,
            title: "Campuss Managment System",
            description: "A hostel web portal  with express and Node.js.  Features : 1. Only hostel residents can logins by sending otp to their respective students ids. \n 2.After login students can fill their mess rebate online (which further go for admin verification ) 3. Student can fill online complaints (which will be transferred to warden of hostel  4.A group chat option for students of hostel so that they can chat with each other . 5. Tou will find all other necessary detail by exploring the website . **LOGIN ID for trail : 125103037@nitkkr.ac.in,  PASS :asd ",
            image: hostelImg,
            link: "https://dev-topaz.onrender.com",
            tags: ["Express.js", "Node.js", "MongoDB", "tailwind"]
        },
        {
            id: 2,
            title: "Scam-Protection App",
            description: "ScamShield is a full-stack web platform designed to detect, analyze, and prevent online scams. It evaluates suspicious content using AI, verifies domains, and cross-checks scammer data to generate a real-time scam score with actionable insights for users.",
            image: projectImg,
            link: "https://hackrustfinal.onrender.com/",
            tags: ["React", "API", "CSS", "AI", "express.js"]
        },
        {
            id: 3,
            title: "BlogChit",
            description: "BlogChit is a full-stack blogging and social networking platform that combines content creation, community engagement, and real-time communication in a single ecosystem. Users can write and publish rich-text blogs, interact through likes, comments, bookmarks, and follows, join public or private communities, and communicate via real-time one-to-one and group chats. The platform also features a global search engine, notification system, media sharing, and an admin moderation workflow that ensures content quality through a verification process before publication. Built with React, Node.js, MongoDB, Socket.io, Cloudinary, and Resend, BlogChit delivers a scalable and interactive user experience for both readers and creators.",
            image: blogchitImg,
            link: "https://blogchit.onrender.com/",
            tags: ["React", "API", "CSS", "Socket.io", "express.js", "MongoDB"]
        },

        {
            id: 4,
            title: "Personal Portfolio",
            description: "A modern, responsive portfolio website built with React.",
            image: personalImg,
            link: "#",
            tags: ["React", "Framer Motion", "CSS", "express"]
        }
    ];

    useEffect(() => {
        const cards = document.querySelectorAll('.project-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="portfolio-section">
            <h2 className="section-title black">My Projects</h2>
            <div className="projects-grid">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <div className="card-image">
                            <img src={project.image} alt={project.title} />
                            <div className="card-overlay">
                                <a href={project.link} className="view-project">View Project</a>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="card-tags">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
