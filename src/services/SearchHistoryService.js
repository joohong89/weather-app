const STORAGE_KEY = "SEARCH_HISTORY";

const SearchHistoryService = {

    getHistory: () => {
        const storedHistory = localStorage.getItem(STORAGE_KEY);
        return storedHistory ? JSON.parse(storedHistory) : [];
    },
    addSearch: (entry) => {
        if (!entry) return;

        let history = SearchHistoryService.getHistory();
        history.push(entry);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return history;
    },
    removeSearch: (timestamp) => {
        const history = SearchHistoryService.getHistory().filter((item) => item.timestamp !== timestamp);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        return history;
    }
}
export default SearchHistoryService
