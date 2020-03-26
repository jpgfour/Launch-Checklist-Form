// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.getElementById("launchForm");
   form.addEventListener("submit", function(event) {
     let pilotNameInput = document.querySelector("input[name=pilotName]");
     let copilotNameInput = document.querySelector("input[name=copilotName]");
     let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
     let cargoMassInput = document.querySelector("input[name=cargoMass]");
     
     //for testing expediency only
     //pilotNameInput.value = "G";
     //copilotNameInput.value = "H"
     //fuelLevelInput.value = 25000;
     //cargoMassInput.value = 2500;

     //document.getElementById("faultyItems").style.visibility = "invisible";
      
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         document.getElementById("faultyItems").style.visibility = "invisible";
         //event.preventDefault();
      }
      else if(isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))){
         alert("Please enter appropriate numbers for both the Fuel Level and the Cargo Mass");
         document.getElementById("faultyItems").style.visibility = "invisible";
         //event.preventDefault();
      }
      else {
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready to launch`
         document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready to launch`
         document.getElementById("faultyItems").style.visibility = "visible";

         //add two more secondary conditions - low fuel and heavy cargo
         if (fuelLevelInput.value < 10000 || cargoMassInput.value > 10000){
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready For Launch`;
            document.getElementById("launchStatus").style.color = "red";
            if (fuelLevelInput.value < 10000){
               document.getElementById("fuelStatus").innerHTML = `Fuel level of ${fuelLevelInput.value} liters is too low to launch!`;
            } 
            // if(fuelLevelInput.value >= 10000){
            //    document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
            // }
            if (cargoMassInput.value > 10000){
               document.getElementById("cargoStatus").innerHTML = `Cargo mass of ${cargoMassInput.value} kg is too high to launch!`;
            }
            // if(cargoMassInput.value <= 10000){
            //    document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
            // }        
         }
         else {
            document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
            document.getElementById("launchStatus").innerHTML = `Shuttle Is Ready For Launch`;
            document.getElementById("launchStatus").style.color = "green";
         }
         event.preventDefault();
      }
      //get some JSON
      fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         response.json().then( function(json) {
            const div = document.getElementById("missionTarget");
            const mysteryPlanet = Math.floor(Math.random() *6);
            // Add HTML that includes the JSON data
            div.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[mysteryPlanet].name}</li>
               <li>Diameter: ${json[mysteryPlanet].diameter}</li>
               <li>Star: ${json[mysteryPlanet].star}</li>
               <li>Distance from Earth: ${json[mysteryPlanet].distance}</li>
               <li>Number of Moons: ${json[mysteryPlanet].moons}</li>
            </ol>
            <img src="${json[mysteryPlanet].image}">
            `;
         });
      });
   });
 });

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
