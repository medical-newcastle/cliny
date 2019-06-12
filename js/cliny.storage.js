
storageInitialisation = function() {
  if (!storageTest()) {
    console.log('No ability to use localStorage.')
  } else {
    console.log('Go ahead')
    storageRetrievePerms()
  }
}

storageRetrievePerms = function() {
  var browserPerms = storageUnpack('cliny.perms')
  if (browserPerms) {
    for (var k in perms) {
      if (typeof browserPerms[k] != 'undefined' &&
          typeof browserPerms[k] == 'boolean') {
        perms[k] = browserPerms[k]
      }
    }
  }
}

storageClearPerms = function() {
  localStorage.clear('cliny.perms')
  showError('Cleared filter from browser memory.')
}

storageUnpack = function(key) {
  if (typeof key !== 'string') { showError('Key used is not a string type.'); return }
  var item = localStorage.getItem(key)
  if (item === null) {
    showError('No such key (' + key + ') found in browser memory.')
  } else {
    item = JSON.parse(item)
    return item
  }
  return false
}

storageSave = function(perms, key) {
  localStorage.setItem(key, JSON.stringify(perms))
}

storageTest = function() {
  var t = 'test'
  try {
    localStorage.setItem(t, t)
    localStorage.removeItem(t)
  } catch(err) {
    return false
  }
  return true
}
