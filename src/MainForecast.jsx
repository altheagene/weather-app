export default function MainForecast(props){
    const currentForecast = props.weatherForecast.current;
    const currentLocation = props.weatherForecast.location;
    const isCelsius = props.isCelsius;
    const currentDateTime = props.currentDateTime;
    const history = props.history;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //console.log(currentLocation.localtime.split(' '));
    // const dateAndTime = currentLocation ? currentLocation.localtime.split(' ') : null;
    // const date =  currentLocation ? dateAndTime[0].split('-') : null;
    // const month =  currentLocation ? months[Number(date[1]) - 1] : null;
    // const time = currentLocation ? dateAndTime[1].split(':') : null;
    // const hour = currentLocation ? time[0] : null;
    // let actualHour = currentLocation && hour > 12 ? hour-12 : hour;
    // if(actualHour == 0){
    //     actualHour = 12;
    // }
    // const suffix = currentLocation && hour > 11 ? 'PM' : 'AM'; 

    //The list of recent searches that will be shown below the city/location
    const searchHistoList = history.map(element => {
        
        return(
            <li>
                <button className="search-histo-place">{element.region}, {element.country}</button>
                <button className="delete-button"><span className="bi bi-trash"></span></button>
            </li>
        )
    })

    return(
        <section>
            <div id="city-name-div">
                <h3>{currentForecast ? currentLocation.region : null}, {currentForecast ? currentLocation.country : null}</h3>
                <button style={{backgroundColor: 'transparent',
                                      color: 'white',
                                      border: 'none'
                              }}
                            onClick={props.searcHistoButtonFunc}>
                    <span className="bi bi-caret-down-fill"></span>
                </button>
                {props.searchHistoryShow ? 
                <div id="search-history-div">
                    <ul>
                        {searchHistoList}
                    </ul>
                </div> : null}
            </div>
            <div id="main-forecast-section">
            <div id="date-location-div">
                <p id="location-text">Current Weather</p>
                {/* <p id="date-time-text">{currentForecast ? month + ' ' + date[2] + '    ' + Number(actualHour) +  ':' +  time[1]  + ' ' + suffix :  null}</p> */}
                <p id="date-time-text">{currentForecast ? currentDateTime.date + " " + currentDateTime.time :  null}</p>
            </div>
            <div id="current-weather" style={{display: 'flex'}}>
                {/* <img src="/icons/Sunny-icon.png"></img> */}
                <div id="current-weather-info">
                    <img src={currentForecast ? currentForecast.condition.icon : null}></img>
                    <h2>{currentForecast && isCelsius ? currentForecast.temp_c : currentForecast && !isCelsius ? currentForecast.temp_f : null } <span id="celsius-or-far-sign">   °{isCelsius ? 'C' : 'F'}</span></h2>
                    <div className="forecast-details-div" id="feels-like-div" >
                        <p className="detail-name">Feels like {currentForecast && isCelsius ? currentForecast.temp_c : currentForecast && !isCelsius ? currentForecast.temp_f + '°' : null}</p>
                    </div>
                </div>
            </div>
            <div id="forecast-details">
                {/* <div className="forecast-details-div">
                    <p className="detail-name">Feels like</p>
                    <p className="detail-value">{currentForecast ? currentForecast.feelslike_c + '°' : null}</p>
                </div> */}
                <div className="forecast-details-div">
                    <p className="detail-name">Humidity</p>
                    <p className="detail-value">{currentForecast ? currentForecast.humidity + '%' : null}</p>
                </div>
                <div className="forecast-details-div">
                    <p className="detail-name">Wind</p>
                    <p className="detail-value">{currentForecast ? currentForecast.wind_kph + 'km/h' : null}</p>
                </div>
                <div className="forecast-details-div">
                    <p className="detail-name">Visibility</p>
                    <p className="detail-value">{currentForecast ? currentForecast.vis_km + 'km' : null}</p>
                </div>
                <div className="forecast-details-div">
                    <p className="detail-name">Pressure</p>
                    <p className="detail-value">{currentForecast ? currentForecast.pressure_mb + 'mb' : null}</p>
                </div>
                <div className="forecast-details-div">
                    <p className="detail-name">Dew point</p>
                    <p className="detail-value">{currentForecast && isCelsius? currentForecast.dewpoint_c + '°' : currentForecast && !isCelsius ? currentForecast.dewpoint_f + '°': null}</p>
                </div>
                <div className="forecast-details-div">
                    <p className="detail-name">UV Index</p>
                    <p className="detail-value">{currentForecast ? currentForecast.uv + '' : null}</p>
                </div>
            </div>
            {/* <p className="forecast-description">{currentForecast ? currentForecast.condition.text + '' : null}</p> */}
            </div>
        </section>
    )
}

function SkeletonCards(){

    return(
        <section id="main-forecast-skeleton">
            <div id="skel-date-location-div">
                <p id="skel-location-text"></p>
                <p id="skel-date-text"></p>
            </div>
            <div id="skel-current-weather" style={{display: 'flex'}}>
                {/* <img src="/icons/Sunny-icon.png"></img> */}
                <div id="skel-current-weather-info">
                    <img></img>
                    <h2></h2>
                    <div className="forecast-details-div" id="skel-feels-like-div" >
                        <p className="skel-detail-name">Feels like {currentForecast ? currentForecast.feelslike_c + '°' : null}</p>
                    </div>
                </div>
            </div>
            <div id="skel-forecast-details">
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Humidity</p>
                    <p className="skel-detail-value"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Wind</p>
                    <p className="skel-detail-value"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Visibility</p>
                    <p className="skel-detail-value"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Pressure</p>
                    <p className="skel-detail-value"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Dew point</p>
                    <p className="skel-detail-value"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">UV Index</p>
                    <p className="skel-detail-value"></p>
                </div>
            </div>
        </section>
    )
}