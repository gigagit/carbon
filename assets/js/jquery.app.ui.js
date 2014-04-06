var launchDateTime, txtMailTo;
$(document).ready(function () {
    init_FormValidator();
    CaptchaHandler();

    $.ajax({
        type: "GET",
        url: "xml/webconfig.php",
        dataType: "xml",
        success: loadConfig
    });

    $("#myCarousel").carousel();
    $("#footer a").tooltip();

    $("#btn_Send").click(function () {
        var txtName = $('#txtName');
        var txtEmail = $('#txtEmail');
        var txtMessage = $('#txtMessage');

        if ($('#form_contact_us').valid()) {
            $(document).ajaxStart(
                 function () {
                     $("#btn_Send").button('loading');
                 }
             );

            $(document).ajaxSuccess(
                function () {
                    $("#btn_Send").button('reset');
                    $("#form_contact_us")[0].reset();
                }
            );

            var ajaxRequest = $.ajax({
                url: "contact.php",
                type: "POST",
                data: { formType: 'contact', txtName: txtName.val(), txtEmail: txtEmail.val(), txtMessage: txtMessage.val(), txtMailTo: txtMailTo }
            });

            ajaxRequest.done(
            function (response) {
                var $message = '<i class="fa fa-check-circle"></i> ' + response;
                $("#contact_form_message").addClass("alert alert-success");
                $("#contact_form_message").html($message);
            });

            ajaxRequest.error(
            function (data) {
                var $message = '<i class="fa fa-times-circle"></i> ' + data.responseText;
                $("#contact_form_message").addClass("alert alert-error");
                $("#contact_form_message").html($message);
                $("#btn_Send").button('reset');
            });
        }
    });

    $('input, textarea').placeholder();
});


$(window).resize(function () {
    $('#form_contact_us label.error').remove();
});

jQuery(function ($) {
    $.supersized({
        slide_interval: 3000,
        transition: 1,
        transition_speed: 5000,
        slide_links: 'blank',
        slides: [
            { image: 'assets/slider/1.jpg' },
            { image: 'assets/slider/2.jpg' },
            { image: 'assets/slider/3.jpg' },
            { image: 'assets/slider/4.jpg' },
            { image: 'assets/slider/5.jpg' }
        ]
    });
});

function CaptchaHandler() {
    var array_vals = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    var array_operators = new Array('+', '+');
    var index = parseInt(Math.random() * 10);
    index = (index == 0) ? index : (index - 1);
    var hidden_val_1 = array_vals[index];
    index = parseInt(Math.random() * 10);
    index = (index == 0) ? index : (index - 1);
    var hidden_val_2 = array_vals[index];
    index = parseInt(Math.random() * 10) % 2;
    var hidden_operator = array_operators[index];
    var result = 0;
    switch (hidden_operator) {
        case '*':
            result = hidden_val_1 * hidden_val_2;
            break;
        default:
            result = hidden_val_1 + hidden_val_2;
            break;
    }

    jQuery('label[for="txtCaptcha"]').html('<strong>What is ' + hidden_val_1 + ' ' + hidden_operator + ' ' + hidden_val_2 + ' = ?</strong>');

    var txtCaptchaResult = '<input type="hidden" id="txtCaptchaResult" />';
    jQuery("body").append(txtCaptchaResult);
    jQuery("#txtCaptchaResult").val(result);
}


function init_FormValidator() {
    $('#form_contact_us').validate({
        rules: {
            txtCaptcha: {
                equalTo: '#txtCaptchaResult'
            }
        },
        messages: {
            txtName: '<i class="fa fa-times-circle"></i> required.',
            txtEmail: {
                required: '<i class="fa fa-times-circle"></i> required.',
                email: '<i class="fa fa-warning"></i> invalid.</b>'
            },
            txtMessage: '<i class="fa fa-times-circle"></i> required.',
            txtCaptcha: {
                required: '<i class="fa fa-times-circle"></i> required.',
                equalTo: '<i class="fa fa-times-circle"></i> wrong.'
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
            //$('<div class="clearfix"></div>').insertBefore(error);
            //$('<div class="clearfix"></div>').insertAfter(error);
            var position_left = element.position().left + (element.width() - error.width());
            var position_top = element.position().top + 3;
            error.css({ left: position_left + 10, top: position_top, position: 'absolute', 'z-index': 1100, opacity: 0.5 }).animate({ left: position_left, opacity: 1 });
        },
        invalidHandler: function (event, validator) {
            // 'this' refers to the form
            var errors = validator.numberOfInvalids();
        }
    });
}

function loadConfig(data) {
    $(data).find('launch-date-time').each(function () { launchDateTime = $(this).text(); });
    $(data).find('progress-status-percentage').each(function () {
        $('#progress-status').html($(this).text() + ' done');
        $('#progress-status').width($(this).text()).parent().css({ opacity: 0.75 });
    });
    $(data).find('email-for-queries').each(function () { txtMailTo = $(this).text(); });
    $(data).find('facebook-page').each(function () {
        var link = $(this).text();
        $('#facebook-page').click(function () {
            location.href = link;
        });
    });
    $(data).find('twitter-page').each(function () {
        var link = $(this).text();
        $('#twitter-page').click(function () {
            location.href = link;
        });
    });

    $('#counter').countdown({
        finalDate: launchDateTime // DD MMMM YYYY, hh:mm:ss //'30 June 2013, 11:00:00'
    });
}