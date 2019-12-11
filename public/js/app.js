console.log('client side javascript loaded!!')

fetch('http://localhost:3000/weather?address=12what').then(function(response){

response.json().then(function(error,data){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(data);
    }
})
});

const weatherForm=document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit',function(e){
const locationData =search.value;
   e.preventDefault();
   //render loading message one

   messageOne.textContent='Loading Location Data for '+locationData+'...';
   console.log(locationData);
   fetch('http://localhost:3000/weather?address='+locationData).then(function(response){
    response.json().then(function(data){
        if(data.error)
        {
            messageOne.textContent=JSON.stringify(data.error);
            messageTwo.textContent='';
        }
        else
        {
            messageOne.textContent=JSON.stringify(data);
            messageTwo.textContent='';

        }
        
    })
});

})