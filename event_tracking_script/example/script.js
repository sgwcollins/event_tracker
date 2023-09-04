document.addEventListener("DOMContentLoaded", function () {
  TrackLib.init(true);

  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if(btn.id)
          TrackLib.trackEvent('Button Click', { buttonId: btn.id });
    });
});


});
