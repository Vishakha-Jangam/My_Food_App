import {navbar} from "../components/navbar.js"
document.getElementById("navbar").innerHTML = navbar ();

import { register } from "./fetch.js";
document.getElementById("submit").addEventListener("click",register);