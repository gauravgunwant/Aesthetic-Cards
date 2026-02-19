let formFields = document.querySelectorAll("input");
let formText = document.querySelectorAll("textarea");
let submitBtn = document.querySelector(".submit");
let cardContainer = document.querySelector(".cards-container");

let details = JSON.parse(localStorage.getItem("users")) || [];

submitBtn.addEventListener("click",function(e){
    // console.log(formFields[0].children);
    // formFields.forEach(function(e){
    //     console.log(e.value);
    // })
    // console.log(formText[0].value);
    e.preventDefault();

    let fullName = document.querySelector("#full-name");
    let occuputation = document.querySelector("#occupation");
    let pfpUrl = document.querySelector("#pfp-url");
    let aboutMe = document.querySelector("#about-me");

    
    let newObj = {
        name: fullName.value,
        occu : occuputation.value,
        pfp: pfpUrl.value,
        about: aboutMe.value,
    };

    details.push(newObj);
    console.log(details);

   
    cardContainer.innerHTML = "";
    details.forEach(user => cardAdder(user));

    localStorage.setItem("users", JSON.stringify(details));


    // clear krne ke liye rakha hai
    formFields.forEach(function(e){
        e.value = "";
    })

    formText[0].value = "";

   
})


function cardAdder(obj){

    let createDiv = document.createElement('div');
    createDiv.classList.add("card");
    
    let profileTop = document.createElement("div");
    profileTop.classList.add("profile-top");

    let imgAdd = document.createElement("img");
    
    
    profileTop.appendChild(imgAdd);
    
    let pfpInfo = document.createElement('div');
    pfpInfo.classList.add("profile-info");
    
    profileTop.appendChild(pfpInfo);
    
    let ph3 = document.createElement("h3");
    
    
    let pp = document.createElement("p");
    
    
    
    pfpInfo.appendChild(ph3);
    pfpInfo.appendChild(pp);
    
    let about = document.createElement("div");
    about.classList.add("about");
    
    let ah4 = document.createElement("h4");
    ah4.textContent = "About";
    let ap = document.createElement("p");
    
    
    about.appendChild(ah4);
    about.appendChild(ap);
    
    
    createDiv.appendChild(profileTop);
    createDiv.appendChild(about);
    cardContainer.appendChild(createDiv);


    imgAdd.src = obj.pfp;
    ph3.textContent = obj.name;
    pp.textContent = obj.occu;
    ap.textContent = obj.about;

}
// loading from local storage!
details.forEach(user => cardAdder(user));


let debouncer = function(func, delay){
    let timer;
    return function(){
        clearTimeout(timer);

        timer = setTimeout(function(){
            let cntx = this;
            let args = arguments;
            func.apply(cntx,args);
        },delay)
    }
}

let searchF = document.querySelector("#sFilter");

let searchHandler = function() {
    cardContainer.innerHTML = "";  
    let newDetails = details.filter(function(ele){
        return ele.name.toLowerCase().startsWith(searchF.value.toLowerCase());   
    })

    if(searchF.value === ""){
        details.forEach(user => cardAdder(user));
        return;
    }

    cardContainer.innerHTML ="";
    newDetails.forEach(function(ele){
        cardAdder(ele);
    })

    console.log(newDetails);
}

let dHandler = debouncer(searchHandler,300);
searchF.addEventListener("input", dHandler);



// function defaultLoader(obj){
 
//     if(obj.length!==0){
//         details.forEach(i => {
//             let createDiv = document.createElement('div');
//             createDiv.classList.add("card");
            
//             let profileTop = document.createElement("div");
//             profileTop.classList.add("profile-top");

//             let imgAdd = document.createElement("img");
            
            
//             profileTop.appendChild(imgAdd);
            
//             let pfpInfo = document.createElement('div');
//             pfpInfo.classList.add("profile-info");
            
//             profileTop.appendChild(pfpInfo);
            
//             let ph3 = document.createElement("h3");
            
            
//             let pp = document.createElement("p");
            
            
            
//             pfpInfo.appendChild(ph3);
//             pfpInfo.appendChild(pp);
            
//             let about = document.createElement("div");
//             about.classList.add("about");
            
//             let ah4 = document.createElement("h4");
//             ah4.textContent = "About";
//             let ap = document.createElement("p");
            
            
//             about.appendChild(ah4);
//             about.appendChild(ap);
            
            
//             createDiv.appendChild(profileTop);
//             createDiv.appendChild(about);
//             cardContainer.appendChild(createDiv);

        
//             imgAdd.src = i.pfp;
//             ph3.textContent = i.name;
//             pp.textContent = i.occu;
//             ap.textContent = i.about;
//         });
        
        
//     }

// }
// defaultLoader(details);