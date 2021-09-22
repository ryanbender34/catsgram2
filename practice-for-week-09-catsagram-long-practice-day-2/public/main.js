export const createMainContent = () => {
    // Create h1
    const h1 = document.createElement("h1");
    h1.innerText = "Catstagram";

    // Create img
    const img = document.createElement("img");
    img.style.margin = "20px";
    img.style.maxWidth = "750px";

    //create button
    const button = document.createElement('button');
    button.setAttribute('class', 'btn');
    button.innerText = 'Next Cat'
    button.style.padding = "10px 20px";

    //container
    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.appendChild(button);
    container.appendChild(img);

    //fetch next image
    button.addEventListener('click', e => {
        fetchImage();
    })

    fetchImage();


};

const fetchImage = async () => {
    // Fetch image from API and set img url
    try {
        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        const kittenImg = document.querySelector("img");
        kittenImg.src = kittenData[0].url;
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
};
