
/**
 * Created by rahul on 4/8/16.
 */
$(document).ready(function () {
    var window_height=$(window).height();
    var window_width=$(window).width();
    $('.cards-container').css("top",window_height+600);

    $(window).bind("scroll",function () {
        if ($(window).scrollTop()>100) {
            $('.page-bg').fadeIn(800,function () {

            });
        }
        else if($(window).scrollTop()<100) {
            $('.page-bg').fadeOut(500);
        }


        if ($(window).scrollTop()>200){
            $('.page-title').addClass('fixed-title');
        }
        else {
            $('.page-title').removeClass('fixed-title');
        }

    });
        //Cyclethru text function.
        
        //End of cyclethruc



});