var v = require("./video");
var d = require("./data");


var data = d.getData()

data.then(function (result) {
  v.createVid(result);
})