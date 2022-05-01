import {navbar} from "../components/navbar.js"
document.getElementById("navbar").innerHTML = navbar ();



import {debounce} from "./fetch.js";
document.getElementById("search").addEventListener("input",debounce);