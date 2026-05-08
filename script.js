// Function to toggle loading state
function toggleLoading(isLoading){
    const loadingElement = document.getElementById('load-spinner');
    const repoContainer = document.getElementById('repo-card');

    if(isLoading){
        loadingElement.classList.remove('hidden');
        repoContainer.classList.add('hidden'); // Hide repo card while loading  
    }else{
        loadingElement.classList.add('hidden');
    }
}

function displayRepo(repoData) {
    const repoContainer = document.getElementById('repo-card');
    const errorElement = document.getElementById('error-message');

    errorElement.classList.add('hidden');

    if (repoData) {
        repoContainer.classList.remove('hidden');
        
        // Include the Refresh button inside the backticks!
        repoContainer.innerHTML = `
            <h2 class="text-xl font-bold text-blue-600 mb-2">${repoData.name}</h2>
            <p class="text-gray-700 mb-4">${repoData.description || 'No description available'}</p>
            <div class="flex justify-between text-sm font-medium text-gray-500 mb-4">
                <span>⭐ Stars: ${repoData.stars}</span>
                <span>🍴 Forks: ${repoData.forks}</span>
                <span>🐞 Issues: ${repoData.open_issues_count}</span>
            </div>
            <button onclick="fetchData()" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                Refresh
            </button>
        `;
    } else {
        showEmpty("No Repository found.");
    }
}

function showError(message){
    const errorElement = document.getElementById('error-message');
    const repoContainer = document.getElementById('repo-card');

    repoContainer.classList.add('hidden'); // Hide repo card if showing
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

async function fetchData(){
    // Set UI to Loading
    toggleLoading(true) 
    try{
        const language = document.getElementById('language').value;
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc$page=${Math.floor(Math.random() * 10)}`);
        if(!response.ok) throw new Error("API Limit reached or network error");

        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.items.length);
        const randomRepo = data.items[randomIndex];

        if(data.items.length === 0 || !randomRepo){
            showEmpty("No Repositories found for this language.");
        }else{
            const repoData = {
            name: randomRepo.name,
            description: randomRepo.description,
            stars: randomRepo.stargazers_count,
            forks: randomRepo.forks_count,
            open_issues_count: randomRepo.open_issues_count
                };
            displayRepo(repoData); // 2. Set UI to Success and display the repo
        }

        console.log(randomRepo)
        console.log(data)
        console.log("Name:", randomRepo.name);
        console.log("Description:", randomRepo.description);
        console.log("Stars:", randomRepo.stargazers_count);
        console.log("Forks:", randomRepo.forks_count);
        console.log("Issues:", randomRepo.open_issues_count);
        
        
        }catch(error){
            showError(error.message); // 3. Set UI to Error and display the error message
    }finally
    {
        toggleLoading(false);
    }

}