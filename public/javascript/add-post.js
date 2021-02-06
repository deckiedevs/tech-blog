const addPostBtn = document.querySelector('#add-post-btn');
const createPostEl = document.querySelector('#create-post-card');

function toggleHide(event) {
    createPostEl.classList.remove('hide');
    addPostBtn.classList.add('hide');
};

async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        addPostBtn.classList.remove('hide');
        createPostEl.classList.add('hide');
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
addPostBtn.addEventListener('click', toggleHide)