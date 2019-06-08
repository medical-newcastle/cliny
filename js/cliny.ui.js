/*
  UI Functions
  - reply()
  - reverse()
  - filterise()
  - showFilter()
  - hideFilter()
  - showSource()
  - hideSource()
 */

reply = function() {
  var answers = MCQ.A
  $('#answer-content').html(answers.join('<br>'))
  $('#query').hide()
  $('#answer').show()
  $('#answer-src').show()
  $('#q-back').addClass('useable')
}

reverse = function() {
  $('#answer').hide()
  $('#query').show()
  $('#q-back').removeClass('useable')
}

filterise = function() {
  var template = '<li class="li-selector"><label class="switch"><input type="checkbox" checked="checked" data="DATUM"><span class="slider round"></span></label><div class="selector">CONTENT</div></li>'
  var s = ''
  for (var k in perms) { s += template.replace('CONTENT', k).replace('DATUM', k) }
  $('#q-filter').empty().append(s)
}

showFilter = function() {
  $('#q-util').empty().append('&rHar;')
  $('#q-filter').css('display','block')
}

hideFilter = function() {
  $('#q-util').empty().append('&dHar;')
  $('#q-filter').css('display','none')
}

showSource = function() {
  var ref = ''
  if (typeof MCQ != 'undefined' && typeof MCQ.ref != 'undefined') { console.log(MCQ.ref); ref = MCQ.ref }
  $('#answer-source').html(ref).css('display','block')
  $('#answer-src').text('x')
}

hideSource = function() {
  $('#answer-source').text('').css('display','none')
  $('#answer-src').text('{}')
}
