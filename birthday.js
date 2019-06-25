console.log('SIDAN STARTAD')

let data = null;
let test = null;
let arr = []
var firebaseRef = firebase.database().ref();
let name = '';
let guest = '';

const onLoad = () => {
    
    firebaseRef.on("value", function(snapshot) {
         data = snapshot.val()
         data = Object.values(data)
    });


}

onLoad();



const form = (event) => {
    event.preventDefault();
 
    
    arr = [{
        name:document.querySelector('#name').value.toLowerCase().trim(),
        guest:document.querySelector('#guest').value.toLowerCase().trim(),
        email:document.querySelector('#email').value.toLowerCase().trim(),
        text:document.querySelector('textarea').value.toLowerCase().trim()
    }]
    name = arr[0].name;
    guest = arr[0].guest;
       
       

    checkForDup();
    
   
     
} 


const checkForDup = () => {


    if(data !== null){
        let nameList = data.map(i => i.name)

        if(nameList.includes(name)){
            console.log('hitta match')
            let matchingObj = data.filter(i => i.name === name)
    
            name = matchingObj[0].name
            guest = matchingObj[0].guest
    
            document.querySelector('.registeredUser').children[0].innerHTML = 'Du har redan anmält'
            document.querySelector('.deleteUser').classList.remove("hidden");
            
            } else {
            firebaseRef.child(arr[0].name).set(arr[0])
            
 
            }
    } else {

        console.log('guest')
        firebaseRef.child(arr[0].name).set(arr[0])
        

    }
    document.querySelector('.registeredUser').classList.remove("hidden");
    document.querySelector('#nameOne').innerHTML = '1.' + name
    document.querySelector('#nameTwo').innerHTML = '2.' + guest
    } 
   



const deletUser = () => {
    let verification = prompt("skriv in din mail för verifiering:", "din mail");
    let matchingObj = data.filter(i => i.name === name)


if(verification == matchingObj[0].email){
    firebase.database().ref().child(arr[0].name).remove()
  .then(function() {
    alert("bokning raderad")
    document.querySelector('.deleteUser').classList.add("hidden");
    document.querySelector('.registeredUser').children[0].innerHTML = 'Du har anmält'
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });

  document.querySelector('.registeredUser').classList.add("hidden");
    } else {
        alert('Fel email')
    }




 

}