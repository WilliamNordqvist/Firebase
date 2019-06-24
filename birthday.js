console.log('SIDAN STARTAD')

let data = null;
let arr = []
var firebaseRef = firebase.database().ref();

const onLoad = () => {
    
    firebaseRef.on("value", function(snapshot) {
         data = snapshot.val()
         data = Object.values(data)
       console.log(data);
    });

}

onLoad();



const form = (event) => {
    event.preventDefault();
    
    arr = [{
        name:document.querySelector('#name').value,
        guest:document.querySelector('#guest').value,
        email:document.querySelector('#email').value,
        text:document.querySelector('textarea').value
    }]
     
    
 
    let name = document.querySelector('#name').value
    let guest = document.querySelector('#guest').value   
       console.log(arr)   
       

    checkForDup();
    
   
     
} 


const checkForDup = () => {
    let nameList = data.map(i => i.name.toLocaleUpperCase())

    if(nameList.includes(arr[0].name.toLocaleUpperCase())){
        console.log('hitta match')
    } else {
        firebaseRef.child(arr[0].name).set(arr[0])

        document.querySelector('.registeredUser').classList.remove("hidden");
        document.querySelector('#nameOne').innerHTML = '1.' + arr[0].name
        document.querySelector('#nameTwo').innerHTML = '2.' + arr[0].guest
    }
}
