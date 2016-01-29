var app = angular.module('app', ['PubSub', 'angular-nicescroll', 'ngAnimate']);
$(".burger_menu").click(function () {
    $("main").toggleClass("menu")
});
app.factory('selected', function () {
    var srcs = [];

    function add_selected(img) {
        srcs.push(img);
        PubSub.publish("selected_update", get_selected())
    }

    function remove_selected(img) {
        srcs = _.filter(srcs, function (arrItem) {
            return arrItem.toLowerCase() !== img;
        });
        PubSub.publish("selected_update", get_selected())
    }

    function get_selected() {
        return srcs
    }

    return {
        add_selected: add_selected,
        remove_selected: remove_selected,
        get_selected: get_selected
}
});
$(window).load(function() {
    $("body").removeClass("preload");
});