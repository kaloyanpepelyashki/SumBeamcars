const form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    e.preventDefault(); //Prevents the page from reloading


// constant output
const output = document.getElementById("output");
output.innerHTML = "";   

const persons = document.getElementById("listp").value
const suitcases = document.getElementById("listsc").value

// FETCH TO JSON
fetch("https://kaloyanpepelyashki.github.io/sunbeamcarsjson/cardata.js")
.then (function (data) {
    return data.json();
})

.then (function (post) {
    console.log(post)
    const carlist = post

    for (const car of carlist) {

        const arrivaldate = document.getElementById("start").value
        const departuredate = document.getElementById("end").value
        const days = calcRentalDays(arrivaldate, departuredate) 



        const price = calcRentalCost(days, 100, car.supplement).toFixed(2)
        console.log(days)
        console.log(price)

    if (car.persons >= persons && car.suitcases >= suitcases) {
        let template = "";
    }

    template= `
    <div class="items_holder">
    <div class="first_item">
        <img src="${car.image}" alt="Car" class="caring" width="80px">
        <h2 class="h2">${car.brand} ${car.model}</h2>
        <p class="text"><b>${car.category}</b> <br> <b>persons:</b> ${car.personCapacity} <br> <b>suitcases:</b> ${car.suitcaseCapacity} <br> <b>Comfort:</b> ${car.comfort} </p>
        <h3 class="price">DKK ${price}</h3>
        <button class="button btn_book">Book now</button>
    </div> 
    </div>`

    output.insertAdjacentHTML("beforeend", template) 
        
   }

   })

}) 
// FUNCTIONS (CALCULATION)
function calcRentalDays(arrivaldate, departuredate) {
    const arrival = new Date(arrivaldate); 
    const departure = new Date(departuredate);
    const timediff = departure.getTime() - arrival.getTime();
    const diffindays = timediff / (1000 * 3600 * 24) + 1; 
    return diffindays;
}

function calcRentalCost(days, priceperday, supplement) {
    const baseprice = 495; 
    const totalprice = (baseprice + supplement * days + priceperday * days) * 1.25;
    return totalprice;
}