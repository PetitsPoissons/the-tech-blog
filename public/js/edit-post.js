async function editFormHandler(event) {
  event.preventDefault();
  const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
  const title = document.querySelector('input[name="edit-post-title"]').value.trim();
  const content = document.querySelector('textarea[name="edit-post-content"]').value.trim();
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#edit-btn').addEventListener('submit', editFormHandler);