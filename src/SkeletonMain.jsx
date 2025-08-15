export default function SkeletonCards(){

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
                        <p className="skel-detail-name"></p>
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