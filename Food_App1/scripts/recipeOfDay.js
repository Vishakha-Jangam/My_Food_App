import {navbar} from "../components/navbar.js"
document.getElementById("navbar").innerHTML = navbar ();

import { appendRecepies } from "./fetch.js";
try{
    let res= await fetch("https://themealdb.com/api/json/v1/1/random.php");
    let data = await res.json();
    let result = data.meals;
    console.log(result);
    appendRecepies(result);

}catch(err){
    console.log(err);
}