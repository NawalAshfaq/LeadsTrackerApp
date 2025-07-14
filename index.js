import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js"
import { getDatabase ,
        ref ,
        push ,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js"

const firebaseConfig = {
    databaseURL : "https://leads-tracker-app-a957a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database , "leads") 

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")



function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
   listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
  
}
ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot){
    const snapshotExists = snapshot.exists() //return true/false
    if(snapshotExists){
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues) //turn object into array
    render(leads)
}
})



inputBtn.addEventListener("click", function() {
push(referenceInDB , inputEl.value)
 inputEl.value ="" 
})


deleteBtn.addEventListener("dblclick" , function(){
    remove(referenceInDB)        //delete database
    ulEl.innerHTML = ""  //delete items which we render on the page
})






