
async function fetchData(){
    try{
        const language = document.getElementById('language').value;
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc$page=${Math.floor(Math.random() * 10)}`);

        if(!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.items.length);
        const randomRepo = data.items[randomIndex];

        console.log(randomRepo)
        console.log(data)


    }catch(error){
        console.error(error);
    }
}