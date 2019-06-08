/*
  Query Functions
  - focus()
 */

focus = function() {
  var s = ''
  var t = '<li><div onclick="QUERICAL">CONTENT</div></li>'
  var Q = $('#q-bar input').val()
  if (Q == '') {
  
  } else {
    var L = search(Q)
        L = L.concat(interrogate(Q))
        L = uniarr(L)
    for (var i = 0; i < L.length; i++) {
      L[i] = retrieve(L[i])
      L[i].indexable = L[i].cat[0]
    }
    L.sort( chainsort([
      sort_by('indexable', true, null),
      sort_by('Q',         true, null),
    ]) )
    for (var i = 0; i < L.length; i++) {
      s += t.replace('CONTENT', L[i].Q).replace('QUERICAL', 'posit(\'' + L[i].uuid + '\')')
    }
  }
  $('#q-search').empty().append(s)
}
 
/*
  Utility
  - interrogate(term)
  - search(term)
 */
interrogate = function(term) {
  term  = term.toLowerCase()
  var L = []
  for (var i = 0; i < db.length; i++) {
    var item = db[i]
    if (item.Q.toLowerCase().match(term)) {
      if (L.indexOf(item.uuid) == -1) { L.push(item.uuid) }
    }
  }
  return L
}

search = function(term) {
  term  = term.toLowerCase()
  var L = []
  for (var key in alls) {
    if (key.toLowerCase().match(term)) {
      var category = alls[key]
      for (var i = 0; i < category.length; i++) {
        if (L.indexOf(category[i]) == -1) { L.push(category[i]) }
      }
    }
  }
  return L
}
