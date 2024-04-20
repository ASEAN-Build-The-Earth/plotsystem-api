import { useState, createContext, useEffect } from "react";
import './components.css';

const BUTTON_PRESS_DELAY = 2000;
const API_DOMAIN = "https://plots.thatsnek.asia"
// TUTORIALS Endpoints: https://plots.thatsnek.asia/tutorial
// CITY PLOT Endpoints: https://plots.thatsnek.asia/plot/{plot_id}

export const SearchContext = createContext(undefined);
export function fetchApi(id, handler) {
    if(typeof id === "number" && id < 1) return handler(null);
    
    const url = typeof id === "string"? `${API_DOMAIN}/${id}/` : `${API_DOMAIN}/plot/${id}`;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(url, { method: 'GET', keepalive: true, headers:  headers }).then((rs) => handler(rs.json()));
}

export default function SearchBar({ children }) {
    const [id, setId] = useState("");
    const [searchResult, setSearchResult] = useState(undefined);

    function handleChange(e) { 
        return e.target.value.length >= 4? id : setId(Math.abs(e.target.value)); 
    }

    return <div className="container">
        <label className="search_box">
            Plot ID:
            <input
                className="input_box"
                value={id}
                onChange={handleChange}
                type="number"
                data-testid="input"
            />
            <SearchButton id={id} onClick={() => fetchApi(id, setSearchResult)}>
            Search
            </SearchButton>
        </label>
        <SearchContext.Provider value={searchResult}>
            {children}
        </SearchContext.Provider>
    </div>
}

function SearchButton({ id, onClick, children }) {
    const [onTimeout, setOnTimeout] = useState(false);
    useEffect(() => {
        if(onTimeout) setTimeout(() => setOnTimeout(false), BUTTON_PRESS_DELAY);
    }, [onTimeout])

    function handleClick() {
        if(onTimeout) return;
        onClick();
        setOnTimeout(true);
    }

    return <button 
        className="search_button" data-testid="button" onClick={handleClick} 
        disabled={typeof id !== "number"? true : onTimeout}>
        {children}
    </button>
}