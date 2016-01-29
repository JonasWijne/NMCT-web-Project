app.factory('selected', function () {
    var selected = [];

    function set_Selected(arr) {
        selected = arr;
    }

    function get_Selected() {
        return selected;
    }
    function get_Url(photo) {
        return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    }

    return {
        set_Selected: set_Selected,
        get_Selected: get_Selected,
        get_Url:get_Url

    }

});


