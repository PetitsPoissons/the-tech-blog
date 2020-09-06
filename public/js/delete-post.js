async function delPostFormHandler(event) {
  event.preventDefault();
  console.log('************* from inside delete-post.js');
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
  console.log('post_id', post_id);
  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE'
  });
  console.log('response', response);
  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#del-btn').addEventListener('click', delPostFormHandler);