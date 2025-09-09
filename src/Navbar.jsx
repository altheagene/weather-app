import SearchBar from "./SearchBar"
import React from "react";
import { createPortal } from "react-dom";
import { useWindowSize } from "react-use";

export default function Navbar(props){

    const search = props.search;
    const history = props.history;
    const recentSearchFunc = props.chooseRecentFunc;
    const isCelsius = props.isCelsius;
    const leftBtnRef = props.leftBtnRef;
    const rightBtnRef =  props.rightBtnRef
    const kebabMenuIndex = props.kebabMenuIndex;
    const recentSearchesDiv = props.recentSearchesDiv
    const recentSearchesNavBtnsRef = props.recentSearchesNavBtnsRef;
    const {width} = useWindowSize();
    //const removedRecent = props.removedRecent

    const histoButtons = history.map((histo, index) => {
        const region = histo.region != '' ? histo.region : histo.country;
        const lat = histo.lat;
        const lon = histo.lon;
        const timezone = histo.tz_id

        return(
            <>
            
            <div className="recent-search-buttons-divs"
                 style={{
                        backgroundColor: index === 0 ?'rgba(255, 255, 255, 0.2)' : 'background-color: rgb(0, 0, 0, 0.3)'
                    }}>
                <div>
                    <button className='recent-search-button'
                            onClick={() => {
                                recentSearchFunc(lat, lon, timezone)
                                recentSearchesDiv.current.scrollTo({left: 0, behavior: 'smooth'})
                            }}>
                        <div>
                            {region}
                        </div>
                        <div>
                            {isCelsius ? <p>{histo.temp_c}</p> : <p>{histo.temp_f}</p>}
                            <img src={histo.icon}></img>
                        </div>
                    </button>
                    <button id="recent-search-three-dots"
                            onClick={(e) => props.onKebabClick(index, e)}>
                        <span className="bi bi-three-dots-vertical"></span>
                    </button>
                </div>
                
                {kebabMenuIndex === index ?
                createPortal(
                <div className="backdrop"
                    onClick={() => props.outsideClick()}>
                    
                    <button className="kebab-drop-menu" 
                            onClick={() => props.removeItemFromRecent(lat, lon)}
                            style={{
                        //top: '60px',
                        left: props.kebabCoordinates.x - 5
                    }}
                    >Remove item</button>
                </div>,
                    document.body) : null}

            </div>
            </>
        )
    })

    function scrollLeft(){
        recentSearchesDiv.current.scrollTo({left: recentSearchesDiv.current.scrollLeft - 170, behavior: 'smooth'});
        if(recentSearchesDiv.current.scrollLeft == 0){
            leftBtnRef.current.style.opacity = '0.3'
        }else{
            leftBtnRef.current.style.opacity = '1';
            rightBtnRef.current.style.opacity = '1';
        }

         props.buttonClick();
    }

    function scrollRight(){
        recentSearchesDiv.current.scrollTo({left: recentSearchesDiv.current.scrollLeft + 170, behavior: 'smooth'});

        const reachedMaxScroll = (Math.floor(recentSearchesDiv.current.scrollLeft) + recentSearchesDiv.current.offsetWidth) == recentSearchesDiv.current.scrollWidth;
        console.log(recentSearchesDiv.current.scrollLeft);
        console.log(recentSearchesDiv.current.offsetWidth);
        console.log(recentSearchesDiv.current.scrollWidth)
        if(reachedMaxScroll){
            rightBtnRef.current.style.opacity = '0.3'
        }else{
            rightBtnRef.current.style.opacity = '1'
            leftBtnRef.current.style.opacity = '1';
        }
        props.buttonClick();
    }

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
                {width > 600 ? 
                    <div id="recent-searches-div">
                        <div id="recent-searches" ref={recentSearchesDiv}>
                            {histoButtons}
                        </div>
                        <div id="recent-searches-nav-btns-div" ref={recentSearchesNavBtnsRef} style={{display: 'none'}}>
                            <button onClick={scrollLeft}
                                    ref={leftBtnRef}>
                                <span className="bi bi-caret-left-fill"></span>
                            </button>
                            <button onClick={scrollRight}
                                    ref={rightBtnRef}>
                                <span className="bi bi-caret-right-fill"></span>
                            </button>

                        </div>
                </div> : <span class="bi bi-clock-history"
                                style={{ color: 'white'}}></span>}
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