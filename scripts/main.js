$(function () {
    $(".navbar-toggler").click(function () {
        $("nav.navbar").toggleClass("navbar-opened");
        if ($("nav.navbar").hasClass("navbar-opened")) {
            $(".languages-container").hide();
        } else {
            $(".languages-container").show();
        }
    });
    var products = [
        '<img src="../images/double.png" alt="" srcset="">',
        '<img src="../images/black.png" alt="" srcset="">',
        '<img src="../images/origin.png" alt="" srcset="">',
        '<img src="../images/red.png" alt="" srcset="">',
        '<img src="../images/silver.png" alt="" srcset="">',
        '<img src="../images/sport.png" alt="" srcset="">',
        '<img src="../images/vintage.png" alt="" srcset="">',
        '<img src="../images/whisky.png" alt="" srcset="">'
    ];
    var jackpot = new Jackpot("jackpot-machine", products);
    jackpot.init();

    $("#play-jackpot").click(function () {
        jackpot.spinAll();
    });

    var wordingsContext = new WordingsContext("fr");

    $(".language-select").click(function(){
        var language = $(this).attr("id");
        wordingsContext.language = language;
        wordingsContext.changeLanguage();
    });
});

function WordingsContext(language) {
    this.language = language;
    this.wordings = {
        "fr": [
            {"wordings-navbar-aboutus": "À propos de nous"},
            {"wordings-navbar-whiskycollection": "Collection Whisky"},
            {"wordings-navbar-allproducts": "Tous nos produits"},
            {"wordings-notfoundpage-description": "La page que vous avez demandée n'existe plus"},
            {"wordings-authentic-thisproductis": "Ce produit est"},
            {"wordings-authentic": "authentique"},
            {"wordings-productdesription": "Description de produit"},
            {"wordings-form-sendbutton": "Envoyer"},
            {"wordings-contactpage-title": "Contactez-nous"},
            {"wordings-authentic-thisproductis": ""},
        ]
    };

    this.changeLanguage = function(){
        
    };
}

function Jackpot(id, products) {
    var that = this;

    this.time = 6500;
    this.howManySymbolsToAppend = Math.round(this.time / 325);
    this.endingLocation = 7;
    this.products = products;
    this.container = $("#" + id);
    this.sliders = [];
    this.reelCount = 3;
    that.height = 91;

    this.init = function () {
        for (var i = 0; i < this.reelCount; i++) {
            var col4 = $('<div class="slider"></div>');
            var slider = $('<div class="roulette"></div>');
            col4.append(slider);
            this.addSymbolsToStrip(slider, true);
            this.container.append(col4);
            this.sliders.push(slider);
        }
    };

    this.addSymbolsToStrip = function (slider, isOnInit) {
        var slots = this.products;
        var chosen = Math.floor(Math.random() * slots.length);

        for (var i = 0; i < that.howManySymbolsToAppend; i++) {
            var ctr = (i === this.endingLocation) ? chosen : Math.floor(Math.random() * products.length);
            var image = $(products[ctr]);
            var slot = $("<div class='slot'></div>");
            if (i === 0 && isOnInit) {
                slot.css({
                    "margin-top": "-45px"
                });
            }
            slot.append(image);
            slider.append(slot);
        }

        return chosen;
    };

    this.spinAll = function () {
        var result = [];
        for (var i = 0; i < this.reelCount; i++) {
            result.push(that.spinOne(that.sliders[i]));
        }
        return result;
    };

    this.spinOne = function (slider) {
        var heightBefore = parseInt(slider.css("height"), 10);
        that.addSymbolsToStrip(slider, false);
        var marginTop = -(heightBefore + ((that.endingLocation) * that.height) + 45);
        slider.stop().animate({
            marginTop: marginTop + "px"
        }, {
            'duration': that.time + Math.round(Math.random() * 1000),
            'easing': "easeOutElastic"
        });

        return slider.find('.slot:nth(' + (slider.find('.slot').length - 12) + ')').find('img').attr('src');
    };
}