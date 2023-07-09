const form = document.querySelector('form')
const inp = document.getElementById('input')
const list = document.getElementById('movieList')

function searchMovie(URL){
    return new Promise((resolve, reject) => {
        axios.get(URL)
            .then((response)=>{
                resolve(response.data)
            })
            .catch((err)=>{
                reject(err)
            })
    })
}

function addingToList(imgArray){
    list.innerText = '';
    imgArray.forEach(imgUrl => {
        const image = document.createElement('img');
        image.setAttribute('src', imgUrl);
        list.append(image);
    });
}

function handler(){
    if(inp.value){
        const inpText = inp.value;
        inp.value = '';
        const URL = `https://api.tvmaze.com/search/shows?q=${inpText}`;
        
        searchMovie(URL)
        .then((movieData)=>{
            const imgArray = movieData.map((obj)=>{
                // returning array of images url
                    return obj.show.image.medium;
                })
                
                addingToList(imgArray);
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    else{
        list.innerText = "Please Enter Movie Name";
        list.style.color = "red";
        list.style.textAlign = 'center';
        list.style.fontSize = '25px';
    }
}

form.addEventListener('submit', (e)=>{
    // this prevents to reload the page after form submission
    e.preventDefault();
    handler();
})