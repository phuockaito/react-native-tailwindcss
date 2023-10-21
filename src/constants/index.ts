export const REACT_APP_API_URL = "https://api-kaito-music.vercel.app/api";

export const formatView = (value: number) => {
    if (value < 1e3) {
        return value.toString();
    } else if (value < 1e6) {
        return (value / 1e3).toFixed(1) + "K";
    } else if (value < 1e9) {
        return (value / 1e6).toFixed(1) + "M";
    } else if (value < 1e12) {
        return (value / 1e9).toFixed(1) + "B";
    } else {
        return (value / 1e12).toFixed(1) + "T";
    }
};

export const formatDuration = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = pad(date.getUTCSeconds());
    if (hh) {
        return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
};
const pad = (string: number) => {
    return ("0" + string).slice(-2);
};