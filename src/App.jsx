
import './App.css'
import MainForecast from './MainForecast';
import SearchBar from './SearchBar';
import FiveDayForecast from './FiveDayForecast';
import React from 'react'
import { useWindowSize } from 'react-use';
import SkeletonCards from './SkeletonMain';
import Navbar from './Navbar';
import SkeletonFiveDayForecast from './SkeletonFiveDayForecast';
import ErrorWindow from './ErrorWindow';

function App() {

  //STATE
  const [weatherForecast, setWeatherForecast] = React.useState({});
  const [searchSuggestions, setSearchSuggestions] = React.useState({});
  const [searching, setSearching] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [loadingForecast, setLoadingForecast] = React.useState(false);
  const [fetchSuccess, setFetchSuccess] = React.useState(true);
  const [isCelsius, setIsCelsius] = React.useState(true);
  const [kebabMenuIndex, setKebabMenuIndex] = React.useState(-1);
  const [kebabCoordinates, setKebabCoordinates] = React.useState({x: 0, y: 0})
  const [removedRecent, setRemovedRecent] = React.useState({lati: 0, lon: 0})
  const [time, setTime] = React.useState();
  const [timezone,setTimezone] = React.useState(Intl.DateTimeFormat().resolvedOptions().timeZone); //default timezone will be timezone of device's current loc
  const [currentDateTime, setCurrentDateTime] = React.useState()
 //localStorage.clear();
 console.log(time);
 console.log(currentDateTime)
  const getData = localStorage.getItem('data');
  const [history, setHistory] = React.useState(JSON.parse(getData) || []);  
  const date = new Date();

  // const nyTime = new Intl.DateTimeFormat("en-US", {
  //   timeZone: "Europe/Paris",
  //   timeStyle: "short", // gives hh:mm:ss
  //   dateStyle: "medium"    // optional, gives full date
  // }).format();


  // console.log("New York:", nyTime);


  
  // API KEYS
  const geocodeKey = 'b0999bd292c0481780cddfd09d8fc6ee';
  const weatherAPIkey = '1ae6a72a24e14e2495375257252207';

  //REF
  const searchBarRef = React.useRef(null);
  const hourlyForecastContainer = React.useRef(null);
  const lat = React.useRef(null);
  const lng = React.useRef(null);
  const currentHour = React.useRef(null);
  const currentIndexDivRef = React.useRef(null);

  const recentSearchesDiv = React.useRef(null);
  const recentSearchesNavBtnsRef = React.useRef(null);
  const leftBtnRef = React.useRef(null);
  const rightBtnRef = React.useRef(null);

  //VARIABLES
  const currentHisto = localStorage.getItem('data');
  const parsedCurrentHisto = JSON.parse(currentHisto);
  if(Object.keys(weatherForecast).length > 0){
    //console.log(weatherForecast)
      const date = weatherForecast.location.localtime.split(' ');
      const time = date[1].split(':');
      currentHour.current = time[0];
      // currentHour.current = hour === 0 ? 12 : hour > 11 ?  hour - 12: hour;
      //console.log(currentHour);

      const extractSuffix = currentDateTime.time.split(" ");
      const extractHour = extractSuffix[0].split(":")[0];
      if(extractSuffix[1].toLowerCase() == 'pm'){
        const hour = extractHour == 12 ? 12 : extractHour + 12;
        currentHour.current = hour;
      }else if (extractSuffix[1].toLowerCase() == 'am'){
        const hour = extractHour == 12 ? 0 : extractHour;
         currentHour.current = hour
      }
        
      
  }



  // React.useEffect(() => {
  //   const date = weatherForecast.location.localtime.split(' ');
  //   const time = date[1].split(':');
  //   const hour = time[1];
  //   console.log(hour);

  // }, []);

  // setTimeout(() => {
  //   setInterval(() => {
  //   refetchForecast();
  // }, 5000)
  // React.useEffect(() => {
  //    chooseLocation(coordinates.lat, coordinates.lng)
  // }, [coordinates])

  // }, 5000);


  //SearchBar Functions
  async function onSearch(){
    const place = searchBarRef.current.value;
    try{
      const request = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${geocodeKey}&language=en&pretty=1`);
      const data = await request.json();
      console.log(data)
      setSearchSuggestions(data);
      setSearching(false);
    }catch(err){
      console.log(err);
    }
  }

  function handleChange(){
    setSearchInput(searchBarRef.current.value);
  }

  //USE EFFECTS

    //Requests to get the location of the device. location would be used to display default forecast
  React.useEffect(() => {
    setLoadingForecast(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lati = position.coords.latitude;
        const long = position.coords.longitude;
        chooseLocation(lati, long, "Asia/Manila");
        lat.current = lati;
        lng.current = long;
      },
      (error) => {
        console.log(error);
        setFetchSuccess(false);
      });
      setLoadingForecast(false)
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown)
  })

  function handleMouseDown(e){
    //setKebabMenuIndex(-1)
    // if(recentSearchesDiv.current && !recentSearchesDiv.current.contains(e.target)){
    //   setKebabMenuIndex(-1)
    // }
  }

  function outsideClick(){
    setKebabMenuIndex(-1)
  }

  function removeItemFromRecent(lat, long){
    setRemovedRecent({lati: lat, long: long});
    let newhistory = history.filter(histo => histo.lat != lat && histo.lon != long)
    console.log(history)
    setHistory(newhistory);
    setKebabMenuIndex(-1);
  }

  React.useEffect(() => {
    if(Object.keys(weatherForecast).length != 0){
      const lat = weatherForecast.location.lat;
      const long = weatherForecast.location.lon;

      //code to check if current location is already saved in local storage
      console.log(history);
      const exists = history.some( entry => entry.lat === lat && entry.lon === long);  //checks if the weather forecast exists in recent searches
      if(!exists){ 
        let newForecast = weatherForecast.location;
        newForecast.icon = weatherForecast.current.condition.icon,
        newForecast.temp_c = weatherForecast.current.temp_c;
        newForecast.temp_f = weatherForecast.current.temp_f;
        setHistory(histo => [newForecast, ...histo])
      }else{
        let updatedHistory = history.filter(entry => entry.lat != lat && entry.lon != long);
        let newForecast = weatherForecast.location;
        newForecast.icon = weatherForecast.current.condition.icon,
        newForecast.temp_c = weatherForecast.current.temp_c;
        newForecast.temp_f = weatherForecast.current.temp_f;
        updatedHistory.unshift(newForecast)
        setHistory(updatedHistory)
      }
    }
  }, [weatherForecast])

  React.useEffect(() => {
      localStorage.setItem('data', JSON.stringify(history))
  }, [history])


  // React.useEffect(() => {
  //   setInterval(() => {
  //     const time = new Intl.DateTimeFormat("en-US", {
  //       timeZone: timezone,
  //       timeStyle: "short", // gives hh:mm:ss
  //       dateStyle: "medium"    // optional, gives full date
  //     }).format();
  //     setTime(time);
  //   }, 30000)
  // }, [timezone])


    React.useEffect(() => {

      const time = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        timeStyle: "short", // gives hh:mm:ss
        dateStyle: "medium"    // optional, gives full date
        }).format();
      setTime(time);
      const splitDateTime = time ? time.split(",") : null;
      console.log(splitDateTime);

      const formattedDateTime = {
        date: splitDateTime[0],
        time: splitDateTime[2]
      }

      //setCurrentHour

      setCurrentDateTime(formattedDateTime);
      const interval = setInterval(() => {
        const time = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          timeStyle: "short", // gives hh:mm:ss
          dateStyle: "medium"    // optional, gives full date
          }).format();
        setTime(time);
        const splitDateTime = time ? time.split(",") : null;
        
        const formattedDateTime = {
          date: splitDateTime[0],
          time: splitDateTime[2]
        }

        setCurrentDateTime(formattedDateTime);
      }, 30000)

      return () => clearInterval(interval)
    }, [timezone])

    React.useEffect(() => {
      const splitDateTime = time ? time.split(",") : null;
      //console.log(splitDateTime);
      
    }, [time])

    // React.useEffect(() => {
    //   setInterval(() => {
    //     setTime(prev => prev)
    //   }, [30000])
    // }, )
    //Refetches updated forecast every 30 seconds
  // React.useEffect(() => {
  //     setInterval(() => {
  //       refetchForecast();
  //     }, 30000);
  // }, [])

  //When user clicks on another day
  React.useEffect(() => {
    //console.log(currentIndexDivRef.current)
    //console.log(index);
    if(currentIndexDivRef.current){
      currentIndexDivRef.current.scrollLeft = 
      currentIndexDivRef.current.scrollWidth - currentIndexDivRef.current.offsetWidth; //default scrollleft is to the max
      console.log(currentIndexDivRef.current.scrollLeft);

      setTimeout(() => {
        currentIndexDivRef.current.scrollTo({left: 0, behavior: 'smooth'}) //scrolls to the very left

      }, 200)
    }
  }, [index])


  //If search input is not empty
  React.useEffect(() => {
    if(searchInput != ''){
      setSearching(true); //if true, 'Searching Locations' would be shown on search div

      //this is a debounce method
      const timeout = setTimeout(() => {
        onSearch(searchInput);
      }, 1000);

      return () => {
        setSearching(false);
        clearTimeout(timeout);
      }
    }else{
      // searchBarRef.current.blur();
    }
  }, [searchInput]);

  //Adjusts the hourly-forecast-divs edges depending on the index
  React.useEffect(() => {
   if(hourlyForecastContainer.current){
     if(index === 0){
      hourlyForecastContainer.current.style.borderTopLeftRadius = '0px';
    }else if(index === 1){
      hourlyForecastContainer.current.style.borderRadius = '10px';
    } else if(index === 2){
      hourlyForecastContainer.current.style.borderTopRightRadius = '0px';
    }
   }
  }, [index])

  function funcSetTime(name){
    setTime
    const time = new Intl.DateTimeFormat("en-US", {
      timeZone: name,
      timeStyle: "short", // gives hh:mm:ss
      dateStyle: "medium"    // optional, gives full date
    }).format();
    setTime(time);
  }


  //WHEN USER CHOOSES A LOCATION 
  async function chooseLocation(lati, long, timezone){
    lat.current = lati;
    lng.current = long;
    console.log(timezone);
    setTimezone(timezone);
    setIndex(0);
    setLoadingForecast(true);
    try{
      const request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${lat.current}, ${lng.current}&days=5&aqi=no&alerts=no`);
      const data = await request.json();
      setWeatherForecast(data);
      setFetchSuccess(true);
      //setSearchSuggestions([]);
    }catch(err){
       setFetchSuccess(false);
      console.log(err);
    }finally{
      setLoadingForecast(false);
    }
  }

  
  //FUNCTIONS

  function chooseFromRecentSearch(lat, long, timezoneId){
    console.log(timezoneId)
    chooseLocation(lat,long, timezoneId);
    setKebabMenuIndex(-1)
  }

  function chooseForecast(index){
    console.log(index);
    setIndex(index);
    const offsetWidth = hourlyForecastContainer.current.offsetWidth;
    hourlyForecastContainer.current.scrollTo({
      left: offsetWidth * index,
      // behavior: 'smooth'
    })
  }

  //EXTRACTS THE HOUR TO BE USED IN HOURLY FORECASTS
  function getHour(hour){
    const time = hour.time.split(" ");
    const militaryHour = time[1].split(":")[0]; //get the hour part in the time (e.g 4:30...take the number 4)
    const suffix = militaryHour > 11 ? 'PM' : 'AM';
    const actualTime = militaryHour == 0 ? 12 : militaryHour > 12 ? militaryHour - 12 : militaryHour;

    return {
      militaryHour: militaryHour,
      actualHour : Number(actualTime),
      suffix: suffix
    };
  }

  function farenheitBtnClick(){
    setIsCelsius(false);
  }

  function celsiusBtnClick(){
    setIsCelsius(true);
  }


  //BUTTON FUNCTIONS FOR HOURLY FORECASTS
  function clickNextBtn(elementRef){
    const offsetWidth = elementRef.current.offsetWidth;

    const scrollLeft = elementRef.current.scrollLeft;

    if(scrollLeft === elementRef.current.scrollWidth - offsetWidth){
      setIndex(prev => prev == 2 ? 0 : prev + 1);
    }
    elementRef.current.scrollTo(
      {left: elementRef.current.scrollLeft + offsetWidth,
         behavior: 'smooth'});
  }

   function clickPrevBtn(elementRef){
    const offsetWidth = elementRef.current.offsetWidth;

    if(elementRef.current.scrollLeft === 0){
      setIndex(prev => prev == 0 ? 0 : prev - 1);
    }
    elementRef.current.scrollTo(
      {left: elementRef.current.scrollLeft - offsetWidth,
         behavior: 'smooth'});
  }

  //REFETCH FORECAST FUNCTION
  async function refetchForecast(){
    try{
      const fetchRequest = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${lat.current}, ${lng.current}&days=5&aqi=no&alerts=no`);
      const data = await fetchRequest.json();
      setWeatherForecast(data);
    }catch(err){
      console.log(error);
      setFetchSuccess(false)
    }
  }

  const searchBarAtt = {
    ref: searchBarRef,
    onClick: onSearch,
    searchSuggestions: searchSuggestions,
    handleClick: chooseLocation,
    handleChange: handleChange,
    searching: searching,
    searchInput: searchInput,
    celsiusBtnClick: celsiusBtnClick,
    farenheitBtnClick: farenheitBtnClick,
    isCelsius: isCelsius
  }

  function onKebabClick(index,e){
    if(index === kebabMenuIndex){
      setKebabMenuIndex(-1)
      return;
    }

    const parent = e.currentTarget.parentElement;
    const rect = parent.getBoundingClientRect()
    const x = rect.left;
    const y = e.clientY;
    console.log(x);
    console.log(y)
    setKebabCoordinates({x: x, y: y});
    setKebabMenuIndex(index);
  }

    React.useEffect(() => {
        //recentSearchDiv.current.scrollTo({left: 0, behavior:'smooth'})
        if(recentSearchesDiv.current){
          //console.log(recentSearchesDiv.current.scrollWidth);
          //console.log(recentSearchesDiv.current.offsetWidth);

          if(recentSearchesDiv.current.scrollWidth > recentSearchesDiv.current.offsetWidth){
            recentSearchesNavBtnsRef.current.style.display = 'block'
          }else{
            recentSearchesNavBtnsRef.current.style.display = 'none'
          }

          if(recentSearchesDiv.current.scrollLeft == 0){
              leftBtnRef.current.style.opacity = '0.3'
          }else{
              leftBtnRef.current.style.opacity = '1'
          }
        }
    }, [history])

  return (
    <>
      <section id='full-app-section'>
         <Navbar search={searchBarAtt} 
                  history={history} 
                  chooseRecentFunc={chooseFromRecentSearch} 
                  isCelsius={isCelsius}
                  kebabMenuIndex={kebabMenuIndex}
                  onKebabClick={onKebabClick}
                  removeItemFromRecent={removeItemFromRecent}
                  kebabCoordinates={kebabCoordinates}
                  recentSearchesDiv={recentSearchesDiv}
                  outsideClick={outsideClick}
                  recentSearchesNavBtnsRef={recentSearchesNavBtnsRef}
                  leftBtnRef={leftBtnRef}
                  rightBtnRef={rightBtnRef}
                  removedRecent={removedRecent}/>
        <section id='body-section'>
          { fetchSuccess ?  <div>
                  
          {/* <SearchBar ref={searchBarRef} onClick={onSearch} 
                    searchSuggestions={searchSuggestions} 
                    handleClick={chooseLocation} 
                    handleChange={handleChange} 
                    searching={searching}
                    searchInput={searchInput}
                    celsiusBtnClick={celsiusBtnClick}
                    farenheitBtnClick={farenheitBtnClick}
                    isCelsius={isCelsius}/> */}
          {/* <MainForecast weatherForecast={weatherForecast} 
                        loadingForecast={loadingForecast}/>
          <SkeletonCards /> */}
         
          {loadingForecast ? <SkeletonCards /> : <MainForecast weatherForecast={weatherForecast} 
                                                              currentHour={currentHour}
                                                              isCelsius={isCelsius}
                                                              currentDateTime={currentDateTime}
                        />}
          {/* <FiveDayForecast weatherForecast={weatherForecast} 
                          ref={hourlyForecastContainer} 
                          chooseForecast={chooseForecast}
                          index={index}
                          loadingForecast={loadingForecast}
                            />
          <SkeletonFiveDayForecast /> */}

          {loadingForecast ? <SkeletonFiveDayForecast /> : 
                          <FiveDayForecast weatherForecast={weatherForecast} 
                          ref={hourlyForecastContainer} 
                          chooseForecast={chooseForecast}
                          index={index}
                          loadingForecast={loadingForecast}
                          currentHour={currentHour}
                          getHour={getHour}
                          isCelsius={isCelsius}
                          clickNextBtn={clickNextBtn}
                          clickPrevBtn={clickPrevBtn}
                          currentIndexDivRef={currentIndexDivRef}
                            /> }
           </div> : <ErrorWindow /> }
        </section>
      </section>
    </>
  )
}

export default App
