import SearchBar from "./SearchBar"

export default function Navbar(props){

    const search = props.search
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