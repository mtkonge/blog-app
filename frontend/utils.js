
/** @param {string} path @returns {any} */
const get = async (path) => {
    const res = await fetch(path, {
        headers: new Headers({'Content-Type': 'application/json'}),
        method: 'GET',
    });
    return res.json();
}

/** @param {string} path @param {any} data @returns {any} */
const post = async (path, data) => {
    const res = await fetch(path, {
        headers: new Headers({'Content-Type': 'application/json'}),
        method: 'POST',
        body: JSON.stringify(data),
    });
    return res.json();
}

export const http = {get, post}; 
