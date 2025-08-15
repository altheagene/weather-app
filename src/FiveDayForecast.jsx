import React from "react";
import clsx from "clsx";
import { useWindowSize } from "react-use";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FiveDaysForecast(props){
    const {width} = useWindowSize();
    return(
       <>
       {
        width > 650 ? <DesktopFiveDayForecast props={props}/> :  <MobileFiveDayForecast props={props} />
       }
       
       </>
    )
}


function DesktopFiveDayForecast(props){
    const hourlyDiv1 = React.useRef(null);
    const hourlyDiv2 = React.useRef(null);
    const hourlyDiv3 = React.useRef(null);
    const currentIndexRef = props.props.currentIndexDivRef;
    const arr = [hourlyDiv1, hourlyDiv2, hourlyDiv3];
    const {width} = useWindowSize();
    const isCelsius = props.props.isCelsius;
    const todayCurrentHour = React.useRef(null);
    const fiveDayForecast = props.props.weatherForecast.forecast ? props.props.weatherForecast.forecast.forecastday : [];
    const dayForecastElements = fiveDayForecast.map((forecast, index) => {
        const date = forecast.date.split('-');
        const dateNum = date[2];
        const imgSrc = forecast.day.condition.icon;
        
        return(
            <button className="daily-forecast-div"
                    onClick={() => props.props.chooseForecast(index)}
                    style={{
                        backgroundColor: index === props.props.index || fiveDayForecast.length === 0 ?  'rgba(255, 255, 255, 0.118)' : ' rgba(0, 0, 0, 0.3)',
                        height: index == props.props.index ? '100%' : '90%',
                        borderBottomLeftRadius: index == props.props.index ? '0' : '10px',
                        borderBottomRightRadius: index == props.props.index? '0' : '10px'
                        }}>
                <p className="date">{index === 0 ? 'Today' : dateNum}</p>
                <img src={imgSrc ? imgSrc : null}
                     ></img>
                <p className="max-temp">{isCelsius ? forecast.day.maxtemp_c : forecast.day.maxtemp_f}°</p>
                <p className="min-temp">{isCelsius ? forecast.day.mintemp_c : forecast.day.mintemp_f}°</p>
            </button>
        )
    })

    const hourlyForecastElements = fiveDayForecast.map((forecast, foreCastindex) => {
        console.log(foreCastindex)
        const hourly = forecast.hour;
        const hourlyDivs = hourly.map((hour, index) => {
            const time = props.props.getHour(hour);
                if(index >= 0){
                    return(
                        <div style={{
                            width: width > 890 ? '128px' : width <= 890 ? '123.6px' : 'none'
                        }}>
                            <div className="hourly-div" 
                                // ref={time.militaryHour === props.props.currentHour.current && foreCastindex  == 0 ? todayCurrentHour : null }
                                style={{backgroundColor: time.militaryHour === props.props.currentHour.current && foreCastindex  == 0 ? '#3A59D1' : ''}}>
                                <p className="time">{time.actualHour + ' ' + time.suffix}</p>
                                {/* <p>{hour.condition.text}</p> */}
                                <img src={hour.condition.icon} 
                                    className="hour-forecast-icon"
                                    style={{
                                        height: '40px'
                                    }}/>
                                <p>{isCelsius ? hour.temp_c : hour.temp_f}°</p>
                            </div>
                        </div>
                    )
                }
        })

        
        //const ref= React.useRef(null);
        // const currentIndexRef = props.props.currentIndexDivRef;
        
        return(
            <div className="day-hourly-div" 
                 style={{
                    //display: 'flex'
                    display: foreCastindex === props.props.index ? 'flex' : 'none', //hides the div if it is not the one the user clicked. this is to avoid errors in scrolling as i have found. the divs could not be divided equally during scrolling. the div for the next date will spill over.
                    // width: '128px',
                    // height: '130px'
                 }} 
                 ref={foreCastindex === 0 ? todayCurrentHour : foreCastindex === props.props.index  ? currentIndexRef : null}>
                    <button className='scroll-left-btn'
                            onClick={() => props.props.clickPrevBtn(foreCastindex === 0 ? todayCurrentHour : foreCastindex === props.props.index  ? currentIndexRef : nullIndexRef)}
                           >
                        <span className='bi bi-caret-left-fill'></span>
                    </button>
                {hourlyDivs}
                <button className='scroll-right-btn'
                        onClick={() => props.props.clickNextBtn(foreCastindex === 0 ? todayCurrentHour :foreCastindex === props.props.index  ? currentIndexRef : null)}>
                    <span className="bi bi-caret-right-fill"></span>
                </button>
            </div>
        )
    })


    React.useEffect(() => {

        //scrolls to the current forecast in the hourlyForecast container
        if(todayCurrentHour.current && props.props.index === 0){
            const currentHour = props.props.currentHour.current;
            console.log('hi');
            console.log(props.props.currentHour)
            const offsetWidth = todayCurrentHour.current.offsetWidth;
            console.log(offsetWidth)
            //todayCurrentHour.current.scrollIntoView({behavior: 'smooth', inline: 'center'})
            todayCurrentHour.current.scrollLeft = 0;
            if(width > 890){
                if(currentHour > 17){
                    todayCurrentHour.current.scrollTo({left: offsetWidth * 3, behavior: 'smooth'});
                }else if(currentHour > 11){
                    todayCurrentHour.current.scrollTo({left: offsetWidth * 2, behavior: 'smooth'});
                }else if(currentHour > 5){
                    todayCurrentHour.current.scrollTo({left: offsetWidth * 1, behavior: 'smooth' });
                }
            }else if(width <= 890){
                if(currentHour > 19){
                    todayCurrentHour.current.scrollTo({left: offsetWidth * 4, behavior: 'smooth'});
                }else if(currentHour > 14){
                    todayCurrentHour.current.scrollTo({left: offsetWidth * 3, behavior: 'smooth'});
                }else if(currentHour > 9){
                    todayCurrentHour.current.scrollTo({left: offsetWidth * 2, behavior: 'smooth'});
                }else if(currentHour > 4){
                    todayCurrentHour.current.scrollTo({left: offsetWidth * 1, behavior: 'smooth'});
                }
            }
        }
    }, [props.props.index  === 0]);

    // React.useEffect(() => {
    //     console.log(arr[props.props.index].current);
    //     arr[props.props.index].current.scrollRight = 0;
    //     arr[props.props.index].current.scrollTo({left: 0, behavior: 'smooth'});
    // }, [props.props.index != 0])

    return(
        <section id="five-day-forecast">
            <h3 style={{
                paddingBottom: '1rem',
                paddingLeft: '0.2rem',
                color: 'white'
            }}>3-Day Forecast</h3>
            <div id="daily-forecast-container">
                {dayForecastElements}
            </div>
            <div id="hourly-forecast-container" ref={props.props.ref}>
                {hourlyForecastElements}
            </div>
        </section>
    )
}

function HourlyDivs(){
    
    const ref= React.useRef(null);

        
        return(
            <div className="day-hourly-div" 
                 style={{
                    //display: 'flex'
                    display: foreCastindex === props.props.index ? 'flex' : 'none', //hides the div if it is not the one the user clicked. this is to avoid errors in scrolling as i have found. the divs could not be divided equally during scrolling. the div for the next date will spill over.
                    // width: '128px',
                    // height: '130px'
                 }} 
                 ref={foreCastindex === 0 ? todayCurrentHour : ref}>
                    <button className='scroll-left-btn'
                            onClick={() => props.props.clickPrevBtn(foreCastindex === 0 ? todayCurrentHour : ref)}
                           >
                        <span className='bi bi-caret-left-fill'></span>
                    </button>
                {hourlyDivs}
                <button className='scroll-right-btn'
                        onClick={() => props.props.clickNextBtn(foreCastindex === 0 ? todayCurrentHour :ref)}>
                    <span className="bi bi-caret-right-fill"></span>
                </button>
            </div>
        )
}

function MobileFiveDayForecast(props){
    const isCelsius = props.props.isCelsius;
    const todayHourRef = React.useRef(null);
    const todayHourlyForecast = props.props.weatherForecast.forecast ? props.props.weatherForecast.forecast.forecastday[0].hour : [];
    const todayHourlyForecastElements = todayHourlyForecast.map((hour) => {
        const time = props.props.getHour(hour);
        return(
            <div className="hourly-div-mobile today" ref={props.props.currentHour.current === time.militaryHour ? todayHourRef : null}
                style={{
                    backgroundColor: props.props.currentHour.current === time.militaryHour ?  '#3A59D1' : ' background-color: rgba(255, 255, 255, 0.118)',
                    color: props.props.currentHour.current === time.militaryHour ? 'white' : 'white',
                    border:  props.props.currentHour.current === time.militaryHour ? '3px solid rgba(230, 230, 230, 0.58)' : ' 2px solid rgb(159, 107, 197)'
               }}>
                <p>{time.actualHour + ' ' + time.suffix}</p>
                <img src={hour.condition.icon}></img>
                <p>{isCelsius ? hour.temp_c : hour.temp_f}°</p>
            </div>
        )
    })

    const next4DaysForecast = props.props.weatherForecast.forecast ?  props.props.weatherForecast.forecast.forecastday : [];
    const next4DaysForeElements = next4DaysForecast.map((forecast, index) => {

        if(index > 0){
            return(
                <WeatherAccordion forecast={forecast} getHour={props.props.getHour}  isCelsius={isCelsius}/>
            )
        }else{
            
        }
        
    })
    

    React.useEffect(() => {
        if(todayHourRef.current){
            todayHourRef.current.scrollIntoView({behavior: 'smooth', inline: 'center'});
        }
    }, [])

    return(
        <section id='mobile-forecast-section'>
            <h2>Today</h2>
            <div id="today-hourly-forecast" >
                {todayHourlyForecastElements}
            </div>
        
            <h3> Next 2 Days</h3>
            <div id="four-day-forecast-div">
                {next4DaysForeElements}
            </div>
        </section>
    )
}

function WeatherAccordion(props){
    const isCelsius = props.isCelsius
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = props.forecast.date.split("-");
    const [status, setStatus] = React.useState(false);
    const hourlyForecast = props.forecast.hour;
    const dayForecast = props.forecast.day;
    const hourlyForecastElements = hourlyForecast.map((hour, index) => {

        const time = props.getHour(hour);
        return(
            <div className="hourly-div-mobile">
                <p>{Number(time.actualHour) + ' ' + time.suffix}</p>
                <img src={hour.condition.icon}></img>
                <p>{isCelsius ? hour.temp_c : hour.temp_f}°</p>
            </div>
        )
    })


    return(
            <>
                <div className="accordion-div">
                    <button className='accordion-btn' onClick={() => setStatus(prev => !prev)}>
                        <p>{months[Number(date[1])-1]} {date[2]}</p>
                        <div>
                            <img src={dayForecast.condition.icon}></img>
                            <p>{dayForecast.maxtemp_c} / {dayForecast.mintemp_c}</p>
                        </div>
                        <i className={clsx('bi', {
                                            'bi-caret-up-fill' : status,
                                            'bi-caret-down-fill' : !status})}></i>
                    </button>
                    
                    <div className={clsx(
                        'panel', 
                        {
                            open: status
                        }
                    )}>
                        {hourlyForecastElements}
                    </div>
                </div>
                <div className="bottom-border" ></div>
            </>
        )
    }