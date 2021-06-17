import React,{useState} from 'react';
import './Stackoverflow.css'

function Stackoverflow() {
    const [input,SetInput]= useState("");

    const changeHandler=e=>{
        SetInput(e.target.value);
        console.log(input);
        
    }

  const  searchSO=(amount = 10, cache = 0) =>{
    let searchBar = document.getElementById("stackoverflow-search-bar");

    var oVal = searchBar.value;
    console.log(oVal);
        const val = encodeURIComponent(oVal);
        fetch(
          `https://api.stackexchange.com/2.2/search/advanced?pagesize=${amount}&order=desc&sort=activity&accepted=True&q=${val}&site=stackoverflow`
        ).then((v) =>
          v.json().then((data) => {
            // console.log(data);
            if (data.items.length === 0) {
              document.getElementById("answers-container").innerHTML =
                "No Results found, please use more concise keywords!";
              return;
            }
      
            if (amount >= 100 || cache === data.items.length) {
              document.getElementById("Load-More").innerHTML =
                "<h5>Sorry, no more results</h5>";
            } else {
              
            }
      
            const d = data.items;
            const x = d.map(
              (a) => `<a  href="${a.link}" target=”_blank">${a.title}</a>`
            );
            document.getElementById(
              "search-results"
            ).innerHTML = `Searching Results for ${input}:`;
            document.getElementById("answers-container").innerHTML = x.join("<br><hr>");
          })
        );
    }
    document.addEventListener("keyup", function (e) {
      if (e.code == 13 || e.key == "Enter") {
        searchSO();
      }
    });

    return (
        <div className="mane">
          <div id="main-title-container">
            <svg id="stackoverflow-logo" width="73" height="68" viewBox="0 0 73 68" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.6875 39.6667H18.25V59.5H13.6875V39.6667Z" fill="#607D8B"/>
              <path d="M13.6875 55.25H53.2292V59.5H13.6875V55.25Z" fill="#607D8B"/>
              <path d="M48.6667 39.6667H53.2292V59.5H48.6667V39.6667ZM22.8125 48.1667H44.1042V52.4167H22.8125V48.1667Z" fill="#607D8B"/>
              <path d="M22.9353 40.0345L44.1047 42.1565L43.6166 46.3821L22.4471 44.2601L22.9353 40.0345Z" fill="#A68A6E"/>
              <path d="M56.074 8.49982L59.3186 28.1001L54.8079 28.748L51.5633 9.14773L56.074 8.49982Z" fill="#EF6C00"/>
              <path d="M43.2981 11.6686L53.6872 28.9774L49.7036 31.0521L39.3144 13.7433L43.2981 11.6686Z" fill="#FF9800"/>
              <path d="M31.179 20.614L48.6675 31.9216L46.0651 35.4141L28.5765 24.1065L31.179 20.614Z" fill="#D38B28"/>
              <path d="M25.7012 30.0588L45.7345 36.7718L44.1897 40.7722L24.1563 34.0593L25.7012 30.0588Z" fill="#C09553"/>
            </svg>
            <h1 id="main-title">StackOverFlow</h1>
          </div>
        <div id="main-searching-container">
          <div className="cont">
          <input id="stackoverflow-search-bar" type="text" placeholder="Search..." onClick={(e)=>changeHandler(e)}></input>
          <div id="search-results"></div>
          <div id="answers-container"></div>
          </div>
          
      </div>
      </div>
    )
}

export default Stackoverflow
