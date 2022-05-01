let id;

const debounce = async () =>{
    if(id){
        clearTimeout(id);
    }
    id = setTimeout(function(){
        receipe();
    },500);
};

const receipe = () =>{
    let search_recipe = document.getElementById("search").value;
    getReceipe(search_recipe);
}

const getReceipe = async (wordSearch) =>{
    try{
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${wordSearch}`);

    let data = await res.json();

    let result = data.meals;
    //console.log(data);
    appendRecepies(result);
    }catch(err){
        console.log(err);
    }
}

let appendRecepies = (data) =>{
    let container =document.getElementById("container");

    if(data==undefined){
        container.innerHTML = null;
    }
    else{
        container.innerHTML =null;

        data.forEach((el) => {
            let div =document.createElement("div");

            let img= document.createElement("img");
            img.src=el.strMealThumb;

            let div1 =document.createElement("div");


            let h2 =document.createElement("h2");
            h2.innerText=el.strMeal;

            let p1 =document.createElement("p");
            p1.innerText=`Area : ${el.strArea}`;

            let p2 =document.createElement("p");
            p2.innerText=`Category :${el.strCategory}`;

            let p3 =document.createElement("p");
            p3.innerText=  `Ingredient: ${el.strIngredient1}, ${el.strIngredient2}, ${el.strIngredient3}, ${el.strIngredient4}, ${el.strIngredient5}, ${el.strIngredient6}, ${el.strIngredient7}, ${el.strIngredient8}, ${el.strIngredient9}, ${el.strIngredient10}, ${el.strIngredient11}, ${el.strIngredient12}, ${el.strIngredient13}, ${el.strIngredient14}, ${el.strIngredient15}, ${el.strIngredient16}, ${el.strIngredient17}, ${el.strIngredient18}, ${el.strIngredient19}, ${el.strIngredient20}`;


            let p4 =document.createElement("p");
            p4.innerText= `Instructions: ${el.strInstructions}`;

            div1.append(img,h2,p1,p2,p3,p4);

            div.append(div1);
            document.getElementById("container").append(div);

        });
    }
}



let register = async (e) => {
    e.preventDefault();
    let form_data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        username: document.getElementById("username").value,
        mobile: document.getElementById("mobile").value,
        description: document.getElementById("description").value,
    };
    form_data = JSON.stringify(form_data);

    let res = await fetch("https://masai-api-mocker.herokuapp.com/auth/register", {
        method: "POST",
        body: form_data,
        //mode :"no-cors", //= if getting any error add this
        headers: {
            "Content-Type": "application/json",
        },
    });
    let data = await res.json();
    console.log(data);
    alert(data.message)
    if(!data.error){
      window.location.href="login.html"
    }

};


let login = async (e) =>{
    e.preventDefault();
    let user_data = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
    }

    user_data = JSON.stringify(user_data);

    let res = await fetch("https://masai-api-mocker.herokuapp.com/auth/login",{
        method : "POST",
        body : user_data,

        headers : {
            "Content-Type":"application/json",
        },
    });
    let data = await res.json();
    let username = document.getElementById("username").value;
    getUserDetail(username,data.token);
    console.log(data);
};
// document.getElementById("submit").addEventListener("click", login);

let getUserDetail = async (username, token) =>{
    let res = await fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });

    let data = await res.json();
    console.log("User Data:" , data);
    localStorage.setItem("Login",JSON.stringify (data))
    alert("Login Successful...!")
    window.location.href="index.html"

}
const append1=()=>{
    let UserData = JSON.parse(localStorage.getItem("Login")) || []
    console.log(UserData);
    if(UserData.name!==undefined){

      document.getElementById("Name").innerText=`Name: ${UserData.name}`
      document.getElementById("UserEmail").innerText=`Email: ${UserData.email}`
      document.getElementById("UserMobile").innerText=`Mobile: ${UserData.mobile}`
      document.getElementById("UserName").innerText=`User Name: ${UserData.username}`
      document.getElementById("UserDescription").innerText=`Description: ${UserData.description}`
    }else{
      document.getElementById("User-Details").innerHTML=`<h1 id="not-login">User Not Loged In</h1>`
    }
  }
export { debounce,receipe,getReceipe,appendRecepies,register,getUserDetail,login,append1};