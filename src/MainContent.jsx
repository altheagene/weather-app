// import React from "react"

// export default function MainContent(){
//     const key = '5ff591efad7d1f66da7f53387d225ed4';
//     const place = 'Cebu';
//     const geocodeKey = 'b0999bd292c0481780cddfd09d8fc6ee';
//     const weatherAPIkey = '1ae6a72a24e14e2495375257252207';
//     const picKey = 'ESHBNs4WTWDBEWehRjtmJjtR4o1hotcjVFhFCunOlhM';
//     const lat = 40.7127281;
//     const lon = -74.0060152;
//     //const data = fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${geocodeKey}`).
//     // const data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${key}&units=metric`).
//     //const data = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`).
//     //const geocodeFetch = fetch(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${geocodeKey}&language=en&pretty=1`).then(data => data.json()).then(data => console.log(data)).catch((err) => console.error('Error:', err));;
//     console.log(data);
//         const [url, newUrl] = React.useState();


//     // let query ;
//     // fetch(`https://api.unsplash.com/search/photos?query=L${place}&client_id=${picKey}`).
//     //             then(data => data.json()).then(data => {
//     //                 query = data.results[0].urls.regular
//     //                 }).catch(err => console.log(err));
//     // console.log(query);

//     // async function getPhoto(){

//     //     try{
//     //         const query = await fetch(`https://api.unsplash.com/search/photos?query=${place}&client_id=${picKey}`);
//     //         const data = await query.json();
//     //         const photoUrl = data.results[0].urls.regular;
//     //         console.log(photoUrl);
//     //         setUrl(photoUrl);
//     //         return photoUrl;
//     //     }catch (err){
//     //         console.log(err);
//     //     }

//     // }
//     // function setUrl(url){
//     //     newUrl(url);
//     // }

//     //getPhoto();

//     return(
//         <section>
//             {/* <img src={url}></img>
//             <img src="https://openweathermap.org/img/wn/10n@2x.png" alt="Weather icon"></img> */}
//         </section>
//     )
// }