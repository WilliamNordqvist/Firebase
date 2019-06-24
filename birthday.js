onload();
console.log('SIDAN STARTAD')


let data = null;
let arr = []

const form = (event) => {
    event.preventDefault();
    document.querySelector('.registeredUser').classList.remove("hidden");

    arr = [{
        name:document.querySelector('#name').value,
        guest:document.querySelector('#guest').value,
        email:document.querySelector('#email').value,
        text:document.querySelector('textarea').value
    }]
    
    
 
    let name = document.querySelector('#name').value
    let guest = document.querySelector('#guest').value   
       console.log(arr)   
       
       if(Object.entries(arr).length !== 0){
        document.querySelector('#nameOne').innerHTML = '1.' + arr[0].name
        document.querySelector('#nameTwo').innerHTML = '2.' + arr[0].guest

        
    }

    console.log(arr)
    
    firebaseRef.child(arr[0].name).set(arr[0])
     
} 

const onLoad = () => {
    var firebaseRef = firebase.database().ref();
    firebaseRef.on("value", function(snapshot) {
         data = snapshot.val()
         data = Object.values(data)
       console.log(data);
    });

    data

}

