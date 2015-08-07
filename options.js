function saveOptions() {
  var ignoreRegexes = [].map.call(
      document.querySelectorAll('.ignoreRegexes input'), function(el) {
    return el.value;
  }).filter(function(regex) {
    return !!regex;
  });

  var access_token = document.querySelector('input.access-token').value;
  chrome.storage.sync.set({
    ignoreRegexes: ignoreRegexes,
    access_token: access_token
  });
}

function addInputBox(value) {
  var container = document.querySelector('.ignoreRegexes');
  var input = document.createElement('input');
  input.placeholder = 'e.g.: ^company-name/';
  input.type = 'text';
  input.value = value || '';
  container.appendChild(input);
  input.addEventListener('change', function() {
    saveOptions();
  });
  input.addEventListener('focus', function() {
    var lastInput = document.querySelector('.ignoreRegexes input:last-of-type');
    if(lastInput == input) {
      addInputBox();
    }
  });
  input.addEventListener('blur', function() {
    var lastInput = document.querySelector('.ignoreRegexes input:last-of-type');
    if(!input.value.trim() && input != lastInput) {
      input.parentElement.removeChild(input);
    }
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    ignoreRegexes: [],
    access_token: ''
  }, function(items) {
    items.ignoreRegexes.forEach(function(regex) {
      addInputBox(regex);
    });
    addInputBox();
    document.querySelector('input.access-token').value = items.access_token;
  });
}

restoreOptions();

document.querySelector('.access-token').addEventListener('change', function() {
  saveOptions();
});
