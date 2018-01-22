$(function () {
    $(".navbar-toggler").click(function () {
        $("nav.navbar").toggleClass("navbar-opened");
        if ($("nav.navbar").hasClass("navbar-opened")) {
            // $(".navbar-brand img").attr("src", "assets/images/evaflor-logo.png");
            $(".languages-container").hide();
            // $(this).css('color', '#000');
        } else {
            // $(".navbar-brand img").attr("src", "assets/images/evaflor-logo-white.png");
            $(".languages-container").show();
            // $(this).css('color', '#fff');
        }
    });
});