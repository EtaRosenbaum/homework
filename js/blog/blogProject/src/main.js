import './style.css';


const blogContainer = document.querySelector('.blogContainer');



async function fetchBlogs() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const blogList = await response.json();
    //console.log(blogList);
    addCards(blogList);
  } catch (e) {
    console.error('error fetching blogs', e);
  }

}

function onClickBlogs(e) {
  const userId = e.target.id;
  window.location.href = `posts.html?userId=${userId}`;
}


function addCards(blogsArray) {
  blogsArray.forEach(user => {
    const blogCard = document.createElement('div');
    blogCard.classList.add('blogCard');

    blogCard.innerHTML = `
    <div class="blogCards">
    <h2>Username: ${user.name}</h2>
    <p><strong>Website:</strong> <p>${user.website}</p></p>
    <p><strong>Company:</strong> ${user.company.name}</p>
    </div>

    <div class= "cardContent">
    <p><strong>"${user.company.catchPhrase}"</strong></p>
    <button id="${user.id}" class="blogsButton">Posts</button>
    </div>

    <div class="postArea"></div>
    `;

    blogContainer.appendChild(blogCard);
  });
  document.querySelectorAll('.blogsButton').forEach(button => {
    button.addEventListener('click', onClickBlogs);
  });
}

fetchBlogs();
