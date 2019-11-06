$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <p class="message__user-name">
                    ${message.user_name}
                  </p>
                  <p class="message__date">
                    ${message.date}
                  </p>
                  <p class="message__lower">
                  ${content}
                  ${img}
                  </p>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $(".form__message").val("");
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  })
  .always(function() {
    $('.form__submit-btn').prop('disabled', false);
    });
  });
})