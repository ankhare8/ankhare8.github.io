$(document).ready(function () {
    document.addEventListener("touchstart", function(){}, true);
    let conditionTimerID;
    let currCondition;
    
    const conditions = ['laproscopic surgery', 'hernia surgery', 'appendix surgery', 'gallbladder surgery', 'dad jokes']
    $('#condition').text(conditions[0]);
    let nextIndex = 1;

    conditionTimerID = setInterval(function(){
        currCondition = conditions[nextIndex];
        $('#condition').text(currCondition);
        nextIndex += 1;
        if ((nextIndex) === conditions.length){
            nextIndex = 0;
        }
    }, 2000);


    $(document).scroll(function () {
        var $nav = $("nav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      });

    $("button.navbar-toggler").click(function(){
        $(".bar").toggleClass("x");
    });

    $('#toggleMap').click(function (){
        console.log('click');
        $('#map').toggleClass('hidden');
        $('.affiliates').toggleClass('w-100')
    });

    $('.afilliate').bind('keydown click', function(){
        $('.afilliate').removeClass('active');
        $(this).addClass('active')
    })
})