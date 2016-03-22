$(document).ready(function(){
    console.log("DOM ready!");
    
    $( "dt" )
  .filter( ":odd" )
    .hide()
  .end()
  .filter( ":even" )
    .click(function() {
      $( this )
        .toggleClass( "active" )
        .next()
          .stop( true, true )
          .slideToggle();
    });


 $("#about-link").click(function(){
         $('#about-content').fadeToggle( "fast", "linear" );
            });
 
});
