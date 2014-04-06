(function ($) {

    $.fn.countdown = function (settings, option) {
        return this.each(function () {
            var $settings = $.extend({}, $.fn.countdown.defaultSettings, settings || {});         
            var $element = $(this);
            var final_datetime = new Date($settings.finalDate);
            var ms_perday = 24 * 60 * 60 * 1000;
            setInterval(function () {
                var current_datetime = new Date();
                var time_left = final_datetime.getTime() - current_datetime.getTime();

                var est_days_left = time_left / ms_perday;
                var days_left = Math.floor(est_days_left);

                var est_hours_left = (est_days_left - days_left) * 24;
                var hours_left = Math.floor(est_hours_left);

                var est_minutes_left = (est_hours_left - hours_left) * 60;
                var minutes_left = Math.floor(est_minutes_left);

                var est_seconds_left = (est_minutes_left - minutes_left) * 60;
                var seconds_left = Math.floor(est_seconds_left);

                if (time_left > 0) {
                    if (hours_left < 10) {
                        if (hours_left >= 0)
                            hours_left = "0" + hours_left;
                        else
                            hours_left = "00";
                    }
                    if (minutes_left < 10) {
                        if (minutes_left >= 0)
                            minutes_left = "0" + minutes_left;
                        else
                            minutes_left = "00";
                    }
                    if (seconds_left < 10) {
                        if (seconds_left >= 0)
                            seconds_left = "0" + seconds_left;
                        else
                            seconds_left = "00";
                    }
                    if (days_left < 10) {
                        if (days_left >= 0)
                            days_left = "0" + days_left;
                        else
                            days_left = "00";
                    }
                }
                else {
                    days_left = "00";
                    hours_left = "00";
                    minutes_left = "00";
                    seconds_left = "00";
                }

                var $days = "<p>" + days_left + "<br />" + ((days_left < 2) ? "DAY" : "DAYS") + "</p>";
                var $hours = "<p>" + hours_left + "<br />" + ((hours_left < 2) ? "HOUR" : "HOURS") + "</p>";
                var $minutes = "<p>" + minutes_left + "<br />" + ((minutes_left < 2) ? "MINUTE" : "MINUTES") + "</p>";
                var $seconds = "<p>" + seconds_left + "<br />" + ((seconds_left < 2) ? "SECOND" : "SECONDS") + "</p>";

                $element.find("#days").html($days);
                $element.find("#hours").html($hours);
                $element.find("#minutes").html($minutes);
                $element.find("#seconds").html($seconds);

            }, 1000);

        });
    };

    
    function countdown($settings, $element) {
        this.settings = this.getSettings($settings, $element);
        this.$element = $element;
        return this;
    };

    countdown.prototype = {
        getSettings: function (settings, element) {
            var $settings = $.extend({}, settings, { 'format': element.data('format'), 'finalDate': element.data('finalDate') });
            return $settings;
        }
    };
    
    $.fn.countdown.defaultSettings = {
        format: "dd:hh:mm:ss",
        finalDate: "25 May 2013, 14:30:00"
    };

})(jQuery);