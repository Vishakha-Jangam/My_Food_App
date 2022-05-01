import {navbar} from "../components/navbar.js"
document.getElementById("navbar").innerHTML = navbar ();

import { login } from "./fetch.js";
document.getElementById("submit").addEventListener("click",login);