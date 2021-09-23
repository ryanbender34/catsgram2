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

    //create btn container

    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.flexDirection = 'row-reverse';
    btnContainer.style.gap = '12px';

    //create upVote btn

    const upButton = document.createElement('button');
    upButton.setAttribute('class', 'up-btn');
    upButton.innerText = 'Up Vote';
    upButton.style.padding = "6px 10px";
    upButton.style.marginBottom = '14px';
    upButton.style.backgroundColor = 'green';
    upButton.style.color = 'white';
    upButton.style.border = 'none';
    upButton.style.borderRadius = '4px';

    btnContainer.appendChild(upButton);

    //create downVote btn

    const downButton = document.createElement('button');
    downButton.setAttribute('class', 'down-btn');
    downButton.innerText = 'Down Vote';
    downButton.style.padding = "6px 10px";
    downButton.style.marginBottom = '14px';
    downButton.style.backgroundColor = 'red';
    downButton.style.color = 'white';
    downButton.style.border = 'none';
    downButton.style.borderRadius = '4px';

    btnContainer.appendChild(downButton);

    //Create vote counter

    let voteCounter = 0;
    const count = document.createElement('p');
    count.innerHTML = 'Popularity Score: ' + `<span id="count">${voteCounter}</span>`;

    //Up vote count

    upButton.addEventListener('click', e => {
        console.log('test');
        voteCounter++;
        storeCount(voteCounter);
        count.innerHTML = 'Popularity Score: ' + `<span id="count">${voteCounter}</span>`;
        // console.log(voteCounter);
    });
    
    //Down vote count
    
    downButton.addEventListener('click', e => {
        voteCounter--;
        storeCount(voteCounter);
        count.innerHTML = 'Popularity Score: ' + `<span id="count">${voteCounter}</span>`;
    });

    //create form
    const form = document.createElement('form');
    const inputLabel = document.createElement('label');
    inputLabel.innerText = 'Comment:';
    inputLabel.style.marginRight = '4px';
    inputLabel.setAttribute('name', 'comment');
    const commentInput = document.createElement('input');
    commentInput.setAttribute('id', 'comment');
    commentInput.setAttribute('type', 'text');
    commentInput.setAttribute('placeholder', 'Add a comment...');
    const formBtn = document.createElement('button');
    formBtn.innerText = 'Submit';
    formBtn.style.marginLeft = "4px";

    form.appendChild(inputLabel);
    form.appendChild(commentInput);
    form.appendChild(formBtn);


    //create comment container
    const commentContainer = document.createElement('ul');
    commentContainer.style.border = '2px solid lightgray';
    commentContainer.style.borderRadius = '4px';
    commentContainer.style.height = '250px';
    commentContainer.style.width = '50%';

    //comment functionality

    const addLi = e => {
        e.preventDefault();
        if (commentInput.value.length) {
            const value = commentInput.value;
            const newLi = document.createElement('li');
            newLi.innerText = value;
            commentContainer.appendChild(newLi);
            commentInput.value = '';
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            newLi.appendChild(deleteBtn);
            const ul = document.querySelector('ul');
            storeComment(ul);
            console.log(commentContainer.children[0].innerText);

            //delete functionality

            const deleteLi = e => {
                newLi.remove();
            }

            deleteBtn.addEventListener('click', deleteLi);
        }
    }

    formBtn.addEventListener('click', addLi);

    //container
    const container = document.querySelector(".container");
    container.appendChild(h1);
    container.appendChild(button);
    container.appendChild(img);
    container.appendChild(count);
    container.appendChild(btnContainer);
    container.appendChild(form);
    container.appendChild(commentContainer);

    //fetch next image
    button.addEventListener('click', e => {
        fetchImage();
        voteCounter = 0;
        count.innerText = 'Popularity Score: ' + voteCounter;
        commentContainer.innerHTML = '';
        clearCount();
    })
    
    restoreImage();
    restoreCount();
    restoreComment();
    // restoreImage();
    // storeImage(fetchImage());
    // let count = document.getElementById('count');
    
    
};

function storeImage(image) {
    // const catImg = `catImg=${image}`;
    localStorage.setItem('image', image);
}

function restoreImage() {
    let image = localStorage.getItem('image');
    if (image) {
        // storeImage(image);
        //set src of img tag 
        let kittenImg = document.querySelector('img');
        kittenImg.src = image;
    } else {
        fetchImage();
    }
}

function storeCount(count) {
    localStorage.setItem('count', count);
}

function restoreCount() {
    let count = localStorage.getItem('count');
    if(count) {
        let countVal = document.querySelector('#count');
        countVal.innerText = count;
    }
}

function clearCount() {
    localStorage.removeItem('count');
}

function storeComment(commentList) {
    // let commentNo = 2;
    // if(comment) {
    //     localStorage.setItem(`comment${commentNo}`, comment);
    //     commentNo += 1;
    // }
    // console.log(commentList);
    localStorage.setItem('commentList', JSON.stringify(Array.from(commentList.children).map(li => {
        return li.outerHTML;
    })));
    // console.log(commentList.children);
    console.log(Array.from(commentList.children).map(li => {
        return li.outerHTML;
    }))
}

function restoreComment() {
let commentL = JSON.parse(localStorage.getItem('commentList'));
console.log(commentL);
if(commentL) {
    let commentContainer = document.querySelector('ul');
    // commentContainer = commentL;
    commentContainer.innerHTML = commentL.join('');
    // console.log(commentL);
    //adding event listeners

    // deleteBtn.addEventListener('click', deleteLi);
    const allLi = document.querySelectorAll('li');
    allLi.forEach(newLi => {
        newLi.addEventListener('click', (e) => {
            if(e.target.innerText === 'Delete') {
                newLi.remove();
            };

        });
    })
}
}

const fetchImage = async () => {
    // Fetch image from API and set img url
    try {
        const kittenResponse = await fetch("https://api.thecatapi.com/v1/images/search?size=small");
        // Converts to JSON
        const kittenData = await kittenResponse.json();
        // console.log(kittenData);
        const kittenImg = document.querySelector("img");
        kittenImg.src = kittenData[0].url;
        storeImage(kittenData[0].url);
    } catch (e) {
        console.log("Failed to fetch image", e);
    }
};
