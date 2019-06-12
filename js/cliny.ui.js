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
_state_of_all_ = typeof _state_of_all != 'undefined' ? _state_of_all_ : true  // Lol

reply = function() {
  var answers = MCQ.A
  $('#answer-content').html(answers.join('<br>'))
  $('#query').hide()
  $('#answer').show()
  $('#answer-src').show()
  $('#q-back').addClass('useable')
  hideFilter()
}

reverse = function() {
  $('#answer').hide()
  $('#query').show()
  $('#q-back').removeClass('useable')
}

filterise = function() {
  var template = '<li class="li-selector"><label class="switch"><input class="in-check DATUM" type="checkbox" checked="checked" data="DATUM"><span class="slider round"></span></label><div class="selector">CONTENT</div></li>'
  var s = ''
  var r = /DATUM/g // not super concerned about being hyper-performant so generating regex here is fine
  for (var k in perms) {
    var t = k
    if (typeof cats != 'undefined' && 
        typeof cats[k] != 'undefined' &&
        typeof cats[k].length == 'number') {
      t = k + ' (' + cats[k].length + ')'
    }
    s += template.replace('CONTENT', t).replace(r, k)
  }
  s = template.replace('CONTENT', 'All').replace(r, 'All') + s
  $('#q-filter').empty().append(s)
  for (var k in perms) {
    $('.li-selector .in-check.' + k).prop('checked', perms[k])
  }
  $('.li-selector .in-check.All').prop('checked', _state_of_all_)
    
  // Remodel behaviours
  $('#q-filter li input').off('change').change(function() {
    if (this.checked == 'checked') { this.checked = true }
  
    var header = this.getAttribute('data')
    if (header == 'All') {
    } else {
    if (this.checked) {
      perms[header] = true
    } else {
      perms[header] = false
    } }
    storageSave(perms, 'cliny.perms')
  })
  $('.in-check.All').off('change').change(function() {
    if (this.checked) {
      _state_of_all_ = true
      $('#q-filter .in-check').prop('checked', true)
      for (var k in perms) { perms[k] = true }
    } else {
      _state_of_all_ = false
      $('#q-filter .in-check').prop('checked', false)
      for (var k in perms) { perms[k] = false }
    }
    storageSave(perms, 'cliny.perms')
  })
}

showFilter = function() {
  $('#q-util').empty().append('&rHar;')
  filterise()
  $('#q-filter').css('display','block')
}

hideFilter = function() {
  $('#q-util').empty().append('&dHar;')
  $('#q-filter').css('display','none')
}

hideSearch = function() {
  setTimeout(function() { $('#q-search').css('display','none') }, 150)
}

showSource = function() {
  var ref = ''
  if (typeof MCQ != 'undefined' && typeof MCQ.ref != 'undefined') { /*console.log(MCQ.ref);*/ ref = MCQ.ref }
  $('#answer-source').html(ref).css('display','block')
  $('#answer-src')
    .text('x')
    .addClass('shown')
    .css('border-top-right-radius','0%')
    .css('border-top-left-radius', '0%')
}

hideSource = function() {
  $('#answer-source').text('').css('display','none')
  $('#answer-src')
    .text('{}')
    .removeClass('shown')
}

showError = function(msg) {
  $('#error')
    .text(msg)
    .css('opacity','1')
    .delay(1100)
    .animate({opacity: 0}, 400)
}
