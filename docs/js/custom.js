new fullpage('#fullpage', {
    sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
  });

var changeVideo = function(){
    $('.changeVideo').click(function(e){
        e.preventDefault();
        var videoUrl = $(this).attr('data-video'),
            video = $('#exampleModal').find('video');

            video.attr('src',videoUrl)
            $('#exampleModal').modal('show')


    })
}
changeVideo();