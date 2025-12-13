// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getITem(key));
};