const encodeUrl = (url, before, after) => {
    try {
        return url.replace(`${before}`, `${encodeURI(after)}`);
    } catch (error) {
        return null
    }
}

module.exports = encodeUrl;
