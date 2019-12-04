$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = (message.image) ? `<img class="lower-message__image" src= ${ message.image }>` : "";
      var html = `<div class= "message", data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                        </div>
                      <div class="upper-message__date">
                        ${message.date}
                        </div>
                      </div>
                    <div class="lower-message">
                        ${message.content}
                        </div>
                      <div class="lower-message__image">
                        ${img}
                        </div>
                    </div>`
    return html;
  }
    // 非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    $.ajax({
      url: location.href,
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("form")[0].reset("");
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  })
  .always(function() {
    $('.form__submit-btn').prop('disabled', false);
    });
  });
  // 自動更新
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.message:last').data("message-id");
          $.ajax({
            url: "api/messages",
            type: 'GET',
            dataType: 'json',
            data: {last_id: last_message_id}
          })
          .done(function(messages) {
            var insertHTML = '';
              // 取得メッセージを一つずつ抽出
              messages.forEach(function(message){
                  insertHTML = buildHTML(message);
                $('.messages').append(insertHTML);
                $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
              })
          })
          .fail(function() {
            alert('自動更新に失敗しました');
          });
    }else{
    }};
    setInterval(reloadMessages, 5000);
});
