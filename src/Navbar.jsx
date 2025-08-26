import SearchBar from "./SearchBar"
import React from "react";

export default function Navbar(props){

    const search = props.search;
    const history = props.history;
    const recentSearchFunc = props.chooseRecentFunc;
    const isCelsius = props.isCelsius;
    const leftBtnRef = React.useRef(null);
    const rightBtnRef = React.useRef(null);
    const recentSearchesRef = React.useRef(null);
    const recentSearchBtnsRef = React.useRef(null)


    const histoButtons = history.map((histo, index) => {
        const region = histo.region != '' ? histo.region : histo.country;
        const lat = histo.lat;
        const lon = histo.lon;
        return(
            <div className="recent-search-buttons-divs"
                 style={{
                        backgroundColor: index === 0 ?'rgba(255, 255, 255, 0.2)' : 'background-color: rgb(0, 0, 0, 0.3)'
                    }}>
                <button class='recent-search-button'
                    onClick={() => {
                        recentSearchFunc(lat, lon)
                        recentSearchesRef.current.scrollTo({left: 0, behavior: 'smooth'})
                    }} 
                    >
                    <div>
                        {region}
                    </div>
                    <div>
                        {isCelsius ? <p>{histo.temp_c}</p> : <p>{histo.temp_f}</p>}
                        <img src={histo.icon}></img>
                    </div>
                </button>
                <button id="recent-search-three-dots"><span className="bi bi-three-dots-vertical"></span></button>
            </div>
        )
    })

    function scrollLeft(){
        recentSearchesRef.current.scrollTo({left: recentSearchesRef.current.scrollLeft - 170, behavior: 'smooth'});
        if(recentSearchesRef.current.scrollLeft == 0){
            leftBtnRef.current.style.opacity = '0.3'
        }else{
            leftBtnRef.current.style.opacity = '1';
            rightBtnRef.current.style.opacity = '1';
        }
    }

    function scrollRight(){
        recentSearchesRef.current.scrollTo({left: recentSearchesRef.current.scrollLeft + 170, behavior: 'smooth'});

        const reachedMaxScroll = (Math.floor(recentSearchesRef.current.scrollLeft) + recentSearchesRef.current.offsetWidth) == recentSearchesRef.current.scrollWidth;
        console.log(recentSearchesRef.current.scrollLeft);
        console.log(recentSearchesRef.current.offsetWidth);
        console.log(recentSearchesRef.current.scrollWidth)
        if(reachedMaxScroll){
            rightBtnRef.current.style.opacity = '0.3'
        }else{
            rightBtnRef.current.style.opacity = '1'
            leftBtnRef.current.style.opacity = '1';
        }
    }

    React.useEffect(() => {
        const recentSearchDiv = recentSearchesRef.current;
        console.log(recentSearchesRef.current.scrollWidth);
        console.log(recentSearchesRef.current.offsetWidth);
        //recentSearchesRef.current.scrollTo({left: 0, behavior:'smooth'})
        if(recentSearchesRef.current.scrollWidth > recentSearchesRef.current.offsetWidth){
            recentSearchBtnsRef.current.style.display = 'block'
        }

        if(recentSearchesRef.current.scrollLeft == 0){
            leftBtnRef.current.style.opacity = '0.3'
        }else{
            leftBtnRef.current.style.opacity = '1'
        }
    }, [history])

    return(
        <header id="nav-section">
            <nav>
                <SearchBar ref={search.ref} onClick={search.onClick} 
                   searchSuggestions={search.searchSuggestions} 
                   handleClick={search.handleClick} 
                   handleChange={search.handleChange} 
                   searching={search.searching}
                  searchInput={search.searchInput}
                  celsiusBtnClick={search.celsiusBtnClick}
                  farenheitBtnClick={search.farenheitBtnClick}
                  isCelsius={search.isCelsius}/>
                <div id="recent-searches-div">
                    <div id="recent-searches" ref={recentSearchesRef}>
                        {histoButtons}
                    </div>
                    <div id="recent-searches-buttons-div" ref={recentSearchBtnsRef} style={{display: 'none'}}>
                        <button onClick={scrollLeft}
                                ref={leftBtnRef}>
                            <span className="bi bi-caret-left-fill"></span>
                        </button>
                        <button onClick={scrollRight}
                                ref={rightBtnRef}>
                            <span className="bi bi-caret-right-fill"></span>
                        </button>

                    </div>
                </div>
                <div id="temp-format-btns">
                    <button onClick={search.farenheitBtnClick}
                            style={{
                                backgroundColor: search.isCelsius ? 'transparent' : 'rgba(255, 255, 255, 0.42)',
                                color: search.isCelsius ? 'gray' : 'white'
                            }}>F°</button>
                    <button onClick={search.celsiusBtnClick}
                            style={{
                                backgroundColor:search.isCelsius ?  'rgba(255, 255, 255, 0.42)' : 'transparent',
                                color: search.isCelsius ? 'white' : 'gray'
                            }}>C°</button>
                </div>
            </nav>
        </header>
    )
}