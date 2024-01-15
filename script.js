function element(country, classname, id, text){
    let crtag = document.createElement(country);
    crtag.classList = classname;
    crtag.id =id;
    crtag.innerHTML = text;
    return crtag;
  }
  
  
  let container = element("div", "container","", "");
  const h1 = element("h1", "text-center", "title", "");
  const row = element("div", "row", "", "");
  
  const response = fetch("https://restcountries.com/v3.1/all");
  response
  .then((data)=> data.json())
  .then((card)=>{
    for(let i=0;i <card.length;i++){
       const col = document.createElement("div");
       col.classList ="col-sm-6 col-md-4 col-lg-4 col-xl-4";
  col.innerHTML =`
  <div class= "card h-100">
  <div class="card-header">
  <h5 class = "card-title text-center">${card[i].name.common}</h5>
  </div>
  <div class = "img-box">
  <img src="${card[i].flags.png}" class="card-img-top" alt="..."/>
  </div>
  <div class = "card-body">
  <div class="card-text text-center">Region: ${card[i].region}</div>
  <div class="card-text text-center">Capital: ${card[i].capital}</div>
  <div class="card-text text-center">Countrycode: ${card[i].cca3}</div>
  <div class="card-text text-center">Population: ${card[i].population}</div>
  <div class="card-text text-center">Latlng: ${card[i].atlng}</div>
  
  <button class = "btn btn-primary" Onclick = "getWeatherData('${card[i].name.common}',${i})"> Click Here for Weather</button>
  <p class ="weatherInfo-${i}"></p>
  <div class="some-class"></div>
  </div>
  </div>`;
  row.append(col);
    }
    let btns = document.querySelectorAll("button");
    btns.forEach((btn, index)=>{
      btn.addEventListener("click",()=>{
        let latlng = card[index].latlng;
        let lat = latlng[0];
        let lng = latlng[1];
                                                  
        let weatherAPI = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=c28bb606b0e190dae96d6396e7351eba&units=metric`);
           weatherAPI
           .then((data)=> data.json())
           .then((value)=>         
  alert( `Weather of ${card[index].name.common}= ${Math.floor(value.main.temp)}°C`)         
           );
  
      });
    });
  
  });
  document.body.append(h1,container);
  container.append(row);