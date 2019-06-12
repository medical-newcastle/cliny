clipboard = function() {
  var a = $('#query-content')
  var d = $('#answer').css('display')
  if (d == 'none') { } else {
    a = $('#answer-content')
  }
   
  var $t = $('<textarea>').attr({id: 'hidden-input'})
  $('body').append($t)
  $t.val(a.html().replace(/<br\s*[\/]?>/gi, "\r\n")).select()
  document.execCommand('copy')
  $t.remove()
  
  $('#copied').animate({ opacity: 1 }, 30, 'easeOutSine').delay(450).animate({ opacity: 0 }, 180, 'easeInCubic')
}
