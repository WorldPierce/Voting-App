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
            appendPolls += '<a href="#" class="toggle"><p><strong>' + poll.title + '</strong></p></a><div title="'+poll.title+'"class="drop">';
            var options = poll.options
            options.map(function(possibleOption){
                console.log(possibleOption.name);
                appendPolls += '<p>' + possibleOption.name + ': ' + possibleOption.votes + '</p>';
            })
            appendPolls += '</div></li>';
    //pollNbr.appendChild(appendPolls);
            $( "#polls" ).append(appendPolls);
          }
   });
   
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updatePolls));


})();

(function($) {
  var tabs =  $(".tabs li a");
  tabs.click(function() {
    var content = this.hash.replace('/','');
    tabs.removeClass("active");
    $(this).addClass("active");
    $("#content").find('div').hide();
    $(content).fadeIn(200);
  });
})(jQuery);


$('#polls').on('click', '.toggle', function(e) {
    // do something
    $(this).toggleClass('active').next().slideToggle("fast");
    e.preventDefault();
});