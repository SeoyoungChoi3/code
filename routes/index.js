var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = '';
  var result = [];

  request(url, function(err, resp, body){
    result = matchHobbies(body);
    res.render('Result', {'resultArray' : result});
  }).on('error', function(error){
    console.log("request Error : " + error);
  });
});

function matchHobbies(arr) {
  var matchesObj = [];
  var matchCnt = 0;
  var _matchCnt = 0;

  arr = JSON.parse(arr);

  for(var i = 0; i < arr.length; i++) {
    for(var j = i+1; j < arr.length; j++) {

      _matchCnt = compareChar(arr[i], arr[j], _matchCnt);

      if(matchCnt <= _matchCnt) {
        if(matchCnt < _matchCnt) matchesObj = [];

        matchCnt = _matchCnt;      
        matchesObj.push({'index1': i, 'obj1': arr[i], 'index2': j, 'obj2': arr[j]});
      } 
      _matchCnt = 0;
    }
  }
  return matchesObj;
}

function compareChar(str1, str2, _matchCnt) {
  for(var k = 0; k < 10; k++) {
    var char = str1.charAt(k);
    if(str2.indexOf(char) > -1) {
      _matchCnt++;
    }
  }

  return _matchCnt;
}

module.exports = router;
