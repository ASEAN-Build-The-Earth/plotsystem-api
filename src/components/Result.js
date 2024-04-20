import { useContext, useEffect, useState } from "react";
import { SearchContext, fetchApi } from "./SearchBar"
import LoadingSvg from "./LoadingSvg"
import './components.css';

const ResultContent = {
    ShowGuide: (tutorial, onCLick) => <div className="guide_container">
        <strong>Getting Started</strong>
        <p className="guide_text">
            If You just started, join our server IP<br/>
            and you will see our tutorial NPC to guide you through.<br/>
            The resource of that process can be found below.
        </p>
        <div className="guide_plot">
            <strong>Tutorials Plot</strong>
            <span className="plot_entries">
                <a
                href={tutorial["Google Maps"]}
                target="_blank"
                rel="noopener noreferrer"
                >In Google Map</a>
                <a
                href={tutorial["Google Earth"]}
                target="_blank"
                rel="noopener noreferrer"
                >In Google Earth</a>
            </span>
        </div>
        <button>

        </button>
        <svg onClick={onCLick} role="close_button" className="guide_close" viewBox="-45 150 700 700" xmlns="http://www.w3.org/2000/svg">
            <path d="M640 320L512 192 320 384 128 192 0 320l192 192L0 704l128 128 192-192 192 192 128-128L448 512 640 320z"/>
        </svg>
    </div>,
    ShowPlotResponse: plot => <div className="guide_container">
        <div className="guide_plot">
            <span className="plot_city"><><code>[ID {plot.id}]</code> <b>Plot in</b> <strong>{plot.fullName}</strong></></span>
            <code className="plot_loc">Lat: {plot.cords.replace(",", ", Lon: ")}</code>
            <span className="plot_entries">
                <a className="plot_link"
                href={plot.gmap}
                target="_blank"
                rel="noopener noreferrer"
                >Google Map</a>
                <a className="plot_link"
                href={plot.gearth}
                target="_blank"
                rel="noopener noreferrer"
                >Google Earth</a>
                <a className="plot_link"
                href={plot.osm}
                target="_blank"
                rel="noopener noreferrer"
                >Open Street Map</a>
            </span>
        </div>
    </div>,
    ShowSearchingGuide: <div role="alert" className="guide_message">
        <p>Insert your in-progress Plot ID here<br/>
        and press search to view the location</p>
    </div>,
    NoPlotFoundError: <div role="alert" className="error_message">
        <p>No Plot found in this ID, Please try again</p>
    </div>,
    InvalidNumberError: <div role="alert" className="error_message">
        <p>Invalid Number, Please try again</p>
    </div>,
    Loading: <LoadingSvg className="loading_svg"/>
}

function Result() {
    const searchResult = useContext(SearchContext);
    const [display, setDisplay] = useState(ResultContent.Loading);
    const [tutorial, setTotorial] = useState(null);
    const [isClosed, setClosed] = useState(false);

    useEffect(() => {
        if(isClosed) setDisplay(ResultContent.ShowSearchingGuide);
    }, [isClosed])

    useEffect(() => {
        if(tutorial == null) return;
        tutorial.then(result => setDisplay(ResultContent.ShowGuide(result, setClosed)));
    }, [tutorial])

    useEffect(() => {
        setDisplay(ResultContent.Loading)
        if(searchResult === undefined) fetchApi("tutorial", setTotorial);
        else if(searchResult != null)
            searchResult.then((response) => {
                if(!response) setDisplay(ResultContent.NoPlotFoundError);
                else setDisplay(ResultContent.ShowPlotResponse(response));
            })
        else setDisplay(ResultContent.InvalidNumberError);
    }, [searchResult])

    return <div className="content_display">
        {display}
    </div>
}

export default Result;