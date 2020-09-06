async function addPostFormHandler(event) {
  event.preventDefault();
  console.log('************* from inside add-post.js');
  const title = document.querySelector('input[name="new-post-title"]').value;
  console.log('title', title);
  const content = document.querySelector('textarea[name="new-post-content"]').value;
  console.log('content', content);
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('response', response);
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', addPostFormHandler);