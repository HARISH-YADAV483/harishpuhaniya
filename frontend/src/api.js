const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
const API = `${API_BASE_URL}/api`;


export async function getHello() {
    const res = await fetch(`${API}/hello`);
    const data = await res.json();
    return data.message;
}