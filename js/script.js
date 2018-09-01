var fired = false;
var fired_second = false;
var removed = false;
var fired_once = false;

function clearForm() {
  $('#name-text').val() = '';
  $('#phone-input').val() = '';
  $('#email-input').val() = '';
  $('#subject-input').val() = '';
  $('#body').val() = '';
}

window.onbeforeunload = function(){ window.scrollTo(0,0); }
  jQuery(document).ready(function() {


    $(window).scroll(function() {

      var scrollPercent = (jQuery(window).scrollTop() / (jQuery(document).height() - jQuery(window).height())) * 100;

        if (scrollPercent >= 25 && !fired) {
          $('.mid-2.1').css('visibility', 'visible').addClass("animated fadeInUp");
          $('.mid-2.2').css('visibility', 'visible').addClass("animated fadeInUp");
          fired = true;
        }

        if (scrollPercent >= 65 && !fired_second) {

          $('#contact-form').css('visibility', 'visible').addClass("animated slideInRight");
          $('.mid-2.left').css('visibility', 'visible').addClass("animated fadeIn");

          fired_second = true;
        }

    });

    if (!fired_once) {
      $('.counter').one().counterUp({
        time: 1400,
      });
      $('.counter_2').one().counterUp({
        time: 1260,
      });
      fired_once = true;
    }

    jQuery('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = this.hash;
      var $target = jQuery(target);
      jQuery('html, body').animate({
        'scrollTop': $target.offset().top - 60
      }, 600, 'swing',);
    });

    // Set up an event listener for the contact form.
    $('#rfq-form').submit(function(event) {
        // Stop the browser from submitting the form.
      event.preventDefault();

      var name = $('#name-text').val();
      var phone = $('#phone-input').val();
      var email = $('#email-input').val();
      var subject = $('#subject-input').val();
      var body = $('#body').val();

        // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: $('#rfq-form').attr('action'),
        data: {name: name, phone: phone, email: email, subject: subject, body: body},
        headers: {contentType: "application/json"},
        dataType: "json",
        cache: false,
        success: function(response) {
          console.log(response);
          clearForm();

        },
        error: function(response) {
          console.log(response);
          clearForm();
        }
      })

    });

    $('header').addClass("animated fadeInDown");

    $('.mid-4').css('visibility', 'visible').addClass('animated pulse');

  });
