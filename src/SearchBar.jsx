
export default function SearchBar(props){
    const isCelsius = props.isCelsius;
    const searchSuggestionList = props.searchSuggestions.results ? props.searchSuggestions.results : [];
    const searchInput = props.searchInput;
    const searchSuggestionBtns = searchSuggestionList.map(suggestion => {
        
        return(
            <li>
                <button onClick={() => props.handleClick(suggestion.geometry.lat, suggestion.geometry.lng)}>{suggestion.formatted}</button>
            </li>
        )
    })
    return(
        <section id="search-bar-section">
            <div>
                <input type="text" ref={props.ref} placeholder="Search a city" onChange={props.handleChange}></input>
                {/* <div id="temp-format-btns">
                    <button onClick={props.farenheitBtnClick}
                            style={{
                                backgroundColor: isCelsius ? 'transparent' : 'rgba(255, 255, 255, 0.42)',
                                color: isCelsius ? 'gray' : 'white'
                            }}>F</button>
                    <button onClick={props.celsiusBtnClick}
                            style={{
                                backgroundColor: isCelsius ?  'rgba(255, 255, 255, 0.42)' : 'transparent',
                                color: isCelsius ? 'white' : 'gray'
                            }}>C</button>
                </div> */}
            </div>
            {props.ref.current === document.activeElement ? <div id="suggestions-div" style={{visibility: searchInput.length > 0 ? 'visible' : 'hidden'}}>
                <ul>
                    {props.searching ? <li><p style={{paddingLeft: '1rem'}}>Loading...</p></li> :  searchInput.length > 1 && searchSuggestionBtns.length < 1 ? <li><p style={{paddingLeft: '1rem'}}>No results found</p></li> :  searchInput.length > 1 && searchSuggestionBtns.length > 0 ?  searchSuggestionBtns : null }
                </ul>
            </div> : null}
            {/* <button onClick={props.onClick}>Search</button> */}
        </section>
    )
}