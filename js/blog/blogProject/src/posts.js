const postsContainer = document.getElementById('postsContainer');
const pageTitle = document.getElementById('pageTitle');

const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');

async function onClickComments(e) {
    const postId = e.target.id;
    const postCard = e.target.closest('.postCard');
    const commentsArea = postCard.querySelector('.commentsArea');

    e.target.textContent = e.target.textContent === 'Show Comments' ? 'Hide Comments' : 'Show Comments';

    if (commentsArea.style.display === 'block') {
        commentsArea.style.display = 'none';
        commentsArea.innerHTML = '';
        return;
    }

    commentsArea.style.display = 'block';
    commentsArea.innerHTML = '<p>Loading comments...</p>';

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }

        const comments = await response.json();
        commentsArea.innerHTML = comments
            .map(c => `
                <div class="commentCard">
                    <h4>${c.name} (${c.email})</h4>
                    <p>${c.body}</p>
                </div>
            `)
            .join('');
    } catch (e) {
        console.error('Error fetching comments:', e);
        commentsArea.innerHTML = '<p>Error loading comments.</p>';
    }
}

async function fetchPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }

        const posts = await response.json();
        pageTitle.textContent = `Posts by User ${userId}`;

        posts.forEach(post => {
            const div = document.createElement('div');
            div.classList.add('postCard');

            div.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button id="${post.id}" class="commentsButton">Show Comments</button>
                <div class="commentsArea" style="display: none;"></div>
            `;

            postsContainer.appendChild(div);
        });

        document.querySelectorAll('.commentsButton').forEach(button => {
            button.addEventListener('click', onClickComments);
        });

    } catch (e) {
        console.error('Error fetching posts:', e);
        postsContainer.innerHTML = '<p>Error loading posts.</p>';
    }
}

fetchPosts();