async function commentFormHandler(event) {
  event.preventDefault()
  console.log('************* from inside comment.js');
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  console.log('comment_text', comment_text);
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length-1];
  console.log('post_id', post_id);

  if (comment_text) {
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('response', response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);