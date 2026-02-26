const API = "/api";

export async function getHello() {
    const res = await fetch(`${API}/hello`);
    const data = await res.json();
    return data.message;
}