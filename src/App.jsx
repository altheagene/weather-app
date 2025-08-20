
import './App.css'
import MainForecast from './MainForecast';
import SearchBar from './SearchBar';
import FiveDayForecast from './FiveDayForecast';
import React from 'react'
import { useWindowSize } from 'react-use';
import SkeletonCards from './SkeletonMain';
import Navbar from './Navbar';
import SkeletonFiveDayForecast from './SkeletonFiveDayForecast';

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

  //VARIABLES

  if(Object.keys(weatherForecast).length > 0){
    console.log(weatherForecast)
      const date = weatherForecast.location.localtime.split(' ');
      const time = date[1].split(':');
      currentHour.current = time[0];
      // currentHour.current = hour === 0 ? 12 : hour > 11 ?  hour - 12: hour;
      console.log(currentHour);
  }

  //Requests to get the location of the device. location would be used to display default forecast
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lati = position.coords.latitude;
        const long = position.coords.longitude;
        chooseLocation(lati, long);
        lat.current = lati;
        lng.current = long;
      },
      (error) => {
        console.log(error);
      });

  }, [])

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

  //Refetches updated forecast every 30 seconds
  React.useEffect(() => {
      setInterval(() => {
        refetchForecast();
      }, 30000);
  }, [])

  //SearchBar Functions
  async function onSearch(){
    const place = searchBarRef.current.value;
    try{
      const request = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${geocodeKey}&language=en&pretty=1`);
      const data = await request.json();
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

  //When user clicks on another day
  React.useEffect(() => {
    console.log(currentIndexDivRef.current)
    console.log(index);
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


  //WHEN USER CHOOSES A LOCATION 
  async function chooseLocation(lati, long){
    lat.current = lati;
    lng.current = long;
    setIndex(0);
    setLoadingForecast(true);
    try{
      const request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${lat.current}, ${lng.current}&days=5&aqi=no&alerts=no`);
      const data = await request.json();
      setWeatherForecast(data);
      setFetchSuccess(true);
      //setSearchSuggestions([]);
    }catch(err){
      console.log(err);
      setFetchSuccess(false);
    }finally{
      setLoadingForecast(false);
    }
  }

  
  //FUNCTIONS
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
    }
  }

  return (
    <>
      <section id='full-app-section'>
        {fetchSuccess ? null : <div id='error-msg-div'>
          <p>There was an error in fetching your weather forecast request.</p>
        </div>}
        <Navbar>
        <SearchBar ref={searchBarRef} onClick={onSearch} 
                   searchSuggestions={searchSuggestions} 
                   handleClick={chooseLocation} 
                   handleChange={handleChange} 
                   searching={searching}
                  searchInput={searchInput}
                  celsiusBtnClick={celsiusBtnClick}
                  farenheitBtnClick={farenheitBtnClick}
                  isCelsius={isCelsius}/>
        </Navbar>
        {/* <MainForecast weatherForecast={weatherForecast} 
                      loadingForecast={loadingForecast}/>
        <SkeletonCards /> */}
        {loadingForecast ? <SkeletonCards /> : <MainForecast weatherForecast={weatherForecast} 
                                                            currentHour={currentHour}
                                                            isCelsius={isCelsius}
                      />}
        {/* <FiveDayForecast weatherForecast={weatherForecast} 
                         ref={hourlyForecastContainer} 
                         chooseForecast={chooseForecast}
                         index={index}
                         loadingForecast={loadingForecast}
                          />
        <SkeletonFiveDayForecast /> */}

        {loadingForecast ? <SkeletonFiveDayForecast /> : <FiveDayForecast weatherForecast={weatherForecast} 
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
      </section>
    </>
  )
}

export default App
