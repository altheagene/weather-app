import React from "react";

    function ToolTip({str, tooltipText, detail}){

        const [show, setShow] = React.useState(false);

        return(
            <div className="forecast-details-div">
                <p className="detail-name"
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}>{str}<span className="bi bi-info-circle"
                                                                    style={{
                                                                        fontSize: '0.6rem',
                                                                    }}></span></p>
                <p className="detail-value">{detail}</p>
                {show ? <div className="tool-tip">
                    {tooltipText}
                </div> : null}
            </div>
        )
    }

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
                <button className="search-histo-place"
                        onClick={() => props.chooseRecentFunc(element.lat, element.lon, element.timezone)}
                >{element.region}, {element.country}</button>
                <button className="delete-button"
                        onClick={() => props.removeItemFromRecent(element.lat, element.lon)}><span className="bi bi-trash"></span></button>
            </li>
        )
    })

    return(
        <section>
            <div id="city-name-div">
                <h3>{currentForecast ? currentLocation.region : null}, {currentForecast ? currentLocation.country : null}</h3>
                <button style={{backgroundColor: 'transparent',
                                      color: 'white',
                                      border: 'none',
                                      zIndex: '4'
                              }}
                            onClick={props.searcHistoButtonFunc}>
                    <span className="bi bi-caret-down-fill"></span>
                </button>
                {props.searchHistoryShow ? 
                <>
                    <div id="search-history-bg-div"
                         onClick={props.outsideClick}></div>
                    <div id="search-history-div">
                        <p>Recent Searches</p>
                        <ul>
                            {searchHistoList}
                        </ul>
                    </div>
                </>: null}
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
                {/* <div className="forecast-details-div">
                    <p className="detail-name"
                        >
                        Humidity</p>
                    <p className="detail-value">{currentForecast ? currentForecast.humidity + '%' : null}</p>
                    <div className="tool-tip">
                        {currentForecast.humidity > 70 ?
                        <p>Muggy and damp. High chance of rain, fog, or storms.</p> : 
                        currentForecast > 50 ?
                        <p>Humid air. Clouds and light rain possible.</p>:
                        currentForecast > 30 ?
                        <p>Comfortable air. Fair weather conditions.</p>:
                        <p>Dry air, clear skies likely. Rain is very unlikely.</p>
                        }
                    </div>
                </div>*/}
                <ToolTip str="Humidity" 
                        tooltipText={currentForecast.humidity > 70 ?
                                    'Muggy and damp. High chance of rain, fog, or storms.': 
                                    currentForecast > 50 ?
                                    'Humid air. Clouds and light rain possible.' :
                                    currentForecast > 30 ?
                                    'Comfortable air. Fair weather conditions.':
                                    'Dry air, clear skies likely. Rain is very unlikely.'} 
                        detail={currentForecast.humidity + "%"}/>
                <ToolTip str='Wind'
                         tooltipText={currentForecast.wind_kph > 50 ?
                                    'Gusty and dangerous. May cause damage or travel issues.' :
                                    currentForecast.wind_kph > 30 ?
                                    'Strong winds, can blow around light objects.' : 
                                    currentForecast.wind_kph > 10 ?
                                    'Light to moderate winds, pleasant outdoors.' :
                                    'Calm breeze, barely noticeable.'
                         }
                         detail={currentForecast.wind_kph + 'km/h'} />
                <ToolTip str="Visibility"
                         tooltipText={currentForecast.vis_km > 10 ?
                                        '(Excellent) Clear air, great for outdoor activities.' :
                                        currentForecast.vis_km > 5 ?
                                        '(Good) Mostly clear, minor haze possible.' :
                                        currentForecast.vis_km > 2 ?
                                        '(Moderate) Reduced clarity, haze or light fog present.' :
                                         currentForecast.vis_km > 1 ?
                                        '(Poor) Low visibility, fog, rain, or smoke likely.' :
                                        '(Very Poor) Severe fog, heavy rain, or snow. Travel is hazardous.'
                         }
                         detail={currentForecast.vis_km + 'km'} />
                <ToolTip str="Pressure"
                         tooltipText={currentForecast.pressure_mb > 1020 ?
                                        'Stable and calm weather, usually clear skies.' :
                                        currentForecast.pressure_mb > 999 ?
                                        'Typical pressure, fair or mixed conditions.' :
                                        currentForecast.pressure_mb > 979 ?
                                        'Unsettled weather, clouds and rain more likely.' :
                                        'Stormy or severe weather possible.'
                         }
                         detail={currentForecast.vis_km + 'km'} />
                {isCelsius ? 
                    <ToolTip str="Dew point"
                            tooltipText={currentForecast.dewpoint_c > 20 ?
                                            'Oppressive and very humid, strong chance of storms.' :
                                            currentForecast.dewpoint_c > 16 ?
                                            'Humid and sticky, discomfort noticeable.' :
                                             currentForecast.dewpoint_c > 9 ?
                                            'Slightly humid, still comfortable for most.' :
                                            'Dry and comfortable air.'
                            }
                            detail={currentForecast.dewpoint_c + '°'} /> : 
                    <ToolTip str="Dew point"
                            tooltipText={currentForecast.dewpoint_f > 68 ?
                                            'Oppressive and very humid, strong chance of storms.' :
                                            currentForecast.dewpoint_f > 60 ?
                                            'Humid and sticky, discomfort noticeable.' :
                                             currentForecast.dewpoint_f > 49 ?
                                            'Slightly humid, still comfortable for most.' :
                                            'Dry and comfortable air.'
                            }
                            detail={currentForecast.dewpoint_f + '°'} />}
                <ToolTip str="UV Index"
                            tooltipText={currentForecast.uv > 10 ?
                                            'Extreme risk. Unprotected skin can burn in minutes.' :
                                            currentForecast.uv > 7 ?
                                            'Very high risk. Avoid midday sun, use strong protection.' :
                                            currentForecast.uv > 5 ?
                                            'High risk. Protection needed (hat, sunscreen).' :
                                            currentForecast.uv > 2 ?
                                            'Moderate risk. Use sunscreen if outside for long.' :
                                            'Minimal risk from the sun. Safe for outdoor activities.'
                            }
                            detail={currentForecast.uv} />
                {/* <div className="forecast-details-div">
                    <p className="detail-name">Wind</p>
                    <p className="detail-value">{currentForecast ? currentForecast.wind_kph + 'km/h' : null}</p>
                </div> */}
                {/* <div className="forecast-details-div">
                    <p className="detail-name">Visibility</p>
                    <p className="detail-value">{currentForecast ? currentForecast.vis_km + 'km' : null}</p>
                </div> */}
                {/* <div className="forecast-details-div">
                    <p className="detail-name">Pressure</p>
                    <p className="detail-value">{currentForecast ? currentForecast.pressure_mb + 'mb' : null}</p>
                </div> */}
                {/* <div className="forecast-details-div">
                    <p className="detail-name">Dew point</p>
                    <p className="detail-value">{currentForecast && isCelsius? currentForecast.dewpoint_c + '°' : currentForecast && !isCelsius ? currentForecast.dewpoint_f + '°': null}</p>
                </div> */}
                {/* <div className="forecast-details-div">
                    <p className="detail-name">UV Index</p>
                    <p className="detail-value">{currentForecast ? currentForecast.uv + '' : null}</p>
                </div> */}
            </div>
            {/* <p className="forecast-description">{currentForecast ? currentForecast.condition.text + '' : null}</p> */}
            </div>
        </section>
    )
}

function SkeletonCards(){

    return(
        <section id="main-forecast-skeleton">
            <div id="skel-date-location-div" className="skel">
                <p id="skel-location-text" className="skel"></p>
                <p id="skel-date-text" className="skel"></p>
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
                    <p className="skel-detail-value skel"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Wind</p>
                    <p className="skel-detail-value skel"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Visibility</p>
                    <p className="skel-detail-value skel"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Pressure</p>
                    <p className="skel-detail-value skel"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">Dew point</p>
                    <p className="skel-detail-value skel"></p>
                </div>
                <div className="skel-forecast-details-div">
                    <p className="skel-detail-name">UV Index</p>
                    <p className="skel-detail-value skel"></p>
                </div>
            </div>
        </section>
    )
}