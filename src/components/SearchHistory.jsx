import {Utils} from "../utils/Utils.jsx";
import {Button} from "react-bootstrap";
import {IoMdSearch} from "react-icons/io";
import {MdDelete} from "react-icons/md";
import {useCallback, useEffect, useState} from "react";
import SearchHistoryService from "../services/SearchHistoryService.js";

const SearchHistory = ({onSearchFromHistory, createdDateTime}) => {
    const [searchHistory, setSearchHistory] = useState([]);

    const searchFromHistory = useCallback((value) => {
        onSearchFromHistory(value)
    }, [onSearchFromHistory]);

    const deleteFromHistory = (timestamp) => {
        let history = SearchHistoryService.removeSearch(timestamp);
        setSearchHistory(history.reverse());
    }

    useEffect(() => {
        let history = SearchHistoryService.getHistory();
        setSearchHistory(history.reverse());
    },[createdDateTime]);

    return (
        <div className="search-history-wrapper">
            <h5>Search History</h5>
            {
                searchHistory && searchHistory.length ? searchHistory.map((item) =>
                    <div className="search-history-card" key={item.timestamp}>
                        <div className="search-history-card-city d-flex flex-column align-items-start justify-content-start flex-md-row align-items-md-center justify-md-content-between flex-grow-1">
                            <div className="flex-grow-1">{item.value && Utils.formatLocation(item.value.name, item.value.state, item.value.country)}</div>

                            <div className="ms-md-3 ms-0 d-flex align-items-center"> {Utils.formatTimeStamp(item.timestamp)}</div>
                        </div>

                        <div  className="ms-3 d-flex">
                            <Button className="search-history-card-actions" onClick={() => searchFromHistory(item.value)}><IoMdSearch /></Button>
                            <Button className="search-history-card-actions ms-1" onClick={() => deleteFromHistory(item.timestamp)}><MdDelete /></Button>
                        </div>
                    </div>
                ) : <div>No search history.</div>
            }
        </div>
    )
}
export default SearchHistory
