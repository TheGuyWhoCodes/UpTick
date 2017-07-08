function loadAll(){
  checkServerStat();
  loadPlexStatus();
}
// function checkServerStat(){
//   var apacheUp = false;
//   var zenUp = false;
//   $(document).ready(function(){
//       $.ajax({url: "http://192.168.1.85:32400/status/sessions/?X-Plex-Token=khuW5n4ZKKepeurjsCDH",
//               dataType: "xml",
//               statusCode: {
//                   200: function (response) {
//                       alert('status 200');
//                       zenUp = true;
//                   },
//                   404: function (response) {
//                       alert('status  404 ');
//                   }
//               }
//        });
//   });
//   $(document).ready(function(){
//       $.ajax({url: "http://192.168.1.90/output.json",
//               dataType: "html",
//               statusCode: {
//                   200: function (response) {
//                       alert('status 200, apache');
//                       apacheUp = true;
//                   },
//                   404: function (response) {
//                       alert('status  404 ');
//                   }
//               }
//        });
//   });
//
// }

function ping(ip, callback) {

    if (!this.inUse) {
        this.status = 'unchecked';
        this.inUse = true;
        this.callback = callback;
        this.ip = ip;
        var _that = this;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            _that.callback('responded');

        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('responded', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + ip;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                _that.callback('timeout');
            }
        }, 1500);
    }
}
var PingModel = function (servers) {
    var self = this;
    var myServers = [];
    ko.utils.arrayForEach(servers, function (location) {
        myServers.push({
            name: location,
            status: ko.observable('unchecked')
        });
    });
    self.servers = ko.observableArray(myServers);
    ko.utils.arrayForEach(self.servers(), function (s) {
        s.status('checking');
        new ping(s.name, function (status, e) {
            s.status(status);
        });
    });
};


function loadPlexStatus(xml){
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          loadPlexStatus(this);
      }
  };
  xhttp.open("GET", "http://192.168.1.85:32400/status/sessions/?X-Plex-Token=khuW5n4ZKKepeurjsCDH", true);
  xhttp.send();
if(xhttp != null){
  var x, i, txt, xmlDoc;
  xmlDoc = xml.responseXML;
  txt = "";
  number = 0;
  x = xmlDoc.getElementsByTagName("Video");
  for (i = 0; i < x.length; i++) {
      number += 1;
      txt += x[i].childNodes[0].nodeValue + "<br>";
  }
  document.getElementById("demo").innerHTML = number;
  document.getElementById("plexStatus").innerHTML = "ur good ";
} else {
  document.getElementById("demo").innerHTML = "its dead jim";
  document.getElementById("plexStatus").innerHTML = "ur fucked ";

}
}
