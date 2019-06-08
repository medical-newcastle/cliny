// Settings
var now = new Date().getTime()
url     = 'https://api.github.com/repos/medical-newcastle/clinx/contents?time=' + now
DELAY   = 210

// Internal variables
db      = []
tdb     = []
MCQ     = {}

cats    = {}
alls    = {}

clicks  = 0
timer   = null
 
/*
  Main Functions
  - posit(query)
  - categorise()
  - parse()
 */

posit = function(query) {
  // State-tracking
  if (typeof tperms == 'undefined') { tperms = clone(perms) }
  else {
    if (tpermissioned()) { } else {
      tperms = clone(perms)
      tdb = []
      for (var i = 0; i < db.length; i++) {
        var item = db[i]
        for (var key in tperms) {
          if (tperms[key] && item.cat.indexOf(key) != -1) { tdb.push(item); break }
        }
      }
    }
  }
  
  // Build a question-bank per filter & retrieve one
  var q = query || ''
  var b = []
  if (q == '') { b = tdb }
  else if (retrieve(q) != null) {
    b = [retrieve(q)]
  } else {
    for (var i = 0; i < db.length; i++) {
      if (db[i].cat.indexOf(q) != -1) { b.push(db[i]) }
    }
  }
  MCQ = b[Math.floor(Math.random() * b.length)]
  $('#query-content').html(MCQ.Q)
  $('#answer').hide()
  hideSource()
  $('#answer-src').hide()
  $('#query').show()
  $('#q-back').removeClass('useable')
  $('#q-size').text(tdb.length)
}

categorise = function() {
  cats  = {}
  alls  = {}
  perms = {}
  for (var i = 0; i < db.length; i++) {
    var item = db[i]
    for (var j = 0; j < item.cat.length; j++) {
      var key = item.cat[j]
      alls[key] = alls[key] || []
      alls[key].push(item.uuid)
      if (j == 0) {
        cats[key] = cats[key] || []
        cats[key].push(item.uuid)
        if (typeof perms[key] == 'undefined') { perms[key] = true }
      }
    }
  }
}

parse = function(datum) {
  var c = datum.split(/##/g)
  for (var i = 0; i < c.length; i++) {
    var s = c[i]
    if (s == '') { } else {
      var cat = s.match(/.*\%\%/)
      var ref = s.match(/\$\+.*\$\$/) || []
      var A   = s.replace(cat,'').replace(ref,'').trim().split(/\n/)
      var Q   = []
      
      cat = cat[0].replace('%%','')
      cat = cat.split(',')
      cat.forEach(function(category,index) { cat[index] = category.trim() })
      
      if (ref[0]) { ref = ref[0].replace('$+','').replace('$$','').trim() }
      
      Q = A.shift()
      A.forEach(function(answer,index) { A[index] = answer.replace(/^- /,'') })
      // console.log(cat); console.log(Q); console.log(A)
      var item = {Q: Q, A: A, cat: cat, ref: ref, uuid: uuid()}
      db.push(item)
    }
  }
  tdb = clone(db)
}
 
/*
  Utility
  - retrieve(id)
  - tpermissioned()
 */
retrieve = function(id) {
  for (var i = 0; i < db.length; i++) {
    if (db[i].uuid == id) { return db[i] }
  }
  return null
}

tpermissioned = function() {
  for (var key in tperms) { if (tperms[key] == perms[key]) { /* Continue */ } else { return false } }
  return true
}
