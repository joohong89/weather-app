import {CONFIG} from "../configs/Config.js";

const SearchHistoryService = {

    getHistory: () => {
        const storedHistory = localStorage.getItem(CONFIG.STORAGE_KEY);
        return storedHistory ? JSON.parse(storedHistory) : [];
    },
    addSearch: (entry) => {
        if (!entry) return;

        let history = SearchHistoryService.getHistory();
        history.push(entry);

        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(history));
        return history;
    },
    removeSearch: (timestamp) => {
        const history = SearchHistoryService.getHistory().filter((item) => item.timestamp !== timestamp);
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(history));
        return history;
    }
}
export default SearchHistoryService
