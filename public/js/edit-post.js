async function editPostFormHandler(event) {
  event.preventDefault();
  console.log('************* from inside edit-post.js');
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
  console.log('post_id', post_id);
  const title = document.querySelector('input[name="edit-post-title"]').value.trim();
  console.log('title', title);
  const content = document.querySelector('textarea[name="edit-post-content"]').value.trim();
  console.log('content', content);
  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log('response', response);
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);