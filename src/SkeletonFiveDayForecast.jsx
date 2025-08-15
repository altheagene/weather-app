export default function SkeletonFiveDayForecast(){

    return(
        <>
            <DesktopSkelFiveDayFore />
        </>
    )
}

function DesktopSkelFiveDayFore(){
   return(
        <section id="skel-five-day-forecast">
            <h3 style={{
                paddingBottom: '1rem',
                paddingLeft: '0.2rem',
                color: 'white'
            }}>5-Day Forecast</h3>
            <div id="skel-daily-forecast-container">
                <div className="skel-daily-forecast-div"></div>
                <div className="skel-daily-forecast-div"></div>
                <div className="skel-daily-forecast-div"></div>
            </div>
            <div id="skel-hourly-forecast-container">
                
            </div>
        </section>
    )
}