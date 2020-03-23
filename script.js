// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.getElementById("launchForm");
   form.addEventListener("submit", function(event) {
     let pilotNameInput = document.querySelector("input[name=pilotName]");
     let copilotNameInput = document.querySelector("input[name=copilotName]");
     let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
     let cargoMassInput = document.querySelector("input[name=cargoMass]");
     
     //for testing expediency only
     pilotNameInput.value = "G";
     copilotNameInput.value = "H"
     fuelLevelInput.value = 25000;
     cargoMassInput.value = 2500;
      
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      }
      else if(isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))){
         alert("Please enter appropriate numbers for both the Fuel Level and the Cargo Mass");
         event.preventDefault();
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
            if (cargoMassInput.value > 10000){
               document.getElementById("cargoStatus").innerHTML = `Cargo mass of ${cargoMassInput.value} kg is too high to launch!`;
            }         
         }
         else {
            document.getElementById("launchStatus").innerHTML = `Shuttle Is Ready For Launch`;
            document.getElementById("launchStatus").style.color = "green";
         }
         event.preventDefault();
      }
      //get some JSON
      fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         response.json().then( function(json) {
            const div = document.getElementById("missionTarget");
            // Add HTML that includes the JSON data
            div.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[1].name}</li>
               <li>Diameter: ${json[1].diameter}</li>
               <li>Star: ${json[1].star}</li>
               <li>Distance from Earth: ${json[1].distance}</li>
               <li>Number of Moons: ${json[1].moons}</li>
            </ol>
            <img src="${json[1].image}">
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
