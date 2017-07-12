'use strict';

(function () {

   var pollNbr = document.querySelector('#polls');
   var apiUrl = appUrl + '/polls';

   function updatePolls (data) {
     var polls = JSON.parse(data);
     //console.log("HERRERERE");
      //console.log(polls);
      var appendPolls; 
      polls.map(function(poll){
        if(poll.title != undefined){
            appendPolls = '<li>';
            console.log(poll.title);
            appendPolls += '<p><strong>' + poll.title + '</strong></p>';
            var options = poll.options
            options.map(function(possibleOption){
                console.log(possibleOption.name);
                appendPolls += '<p>' + possibleOption.name + ': ' + possibleOption.votes + '</p>';
            })
            appendPolls += '</li>';
    //pollNbr.appendChild(appendPolls);
            $( "#polls" ).append(appendPolls);
          }
   });
   
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePolls));


})();
