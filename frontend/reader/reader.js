import { API_SERVER_HOSTNAME } from "../env.js";
import { http } from "../utils.js"

const titleH1 = document.getElementById('title');
const infoDiv = document.getElementById('info');
const contentDiv = document.getElementById('content');

const main = async () => {

    titleH1.textContent = 'Loading...';
    infoDiv.textContent = 'Loading...';
    contentDiv.textContent = 'Loading...';


    const params = new URLSearchParams(window.location.search);
    if (!params.has('blogId')) {
        contentDiv.textContent = 'Please specify /reader?blogId=<blogId>'
        return;
    }
    const blogId = params.get('blogId');
    const blogRes = http.get(`${API_SERVER_HOSTNAME}/api/blogs/${blogId}`);
    if (!blogRes.ok) {
        contentDiv.textContent = `
            <h2>Failed to fetch blog</h2>
            <p>${blogRes.error}</p>
        `;
        return;
    }
    const {title, content, authorUserId} = blogRes.blog;
    titleH1.textContent = title;
    infoDiv.textContent = content;
    contentDiv.textContent = authorUserId;

}

main();
