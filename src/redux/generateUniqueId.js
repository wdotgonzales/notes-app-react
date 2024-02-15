export const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    return timestamp;
}

export default generateUniqueId;

