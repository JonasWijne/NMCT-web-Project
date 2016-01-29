app.controller('grid', function ($scope, $log, flickrservice, PubSub, selected) {
    var selectedarr = [];


    function selectitem(){
        if(_.contains(selectedarr,this.photo)){
            var index = selectedarr.indexOf(this.photo);
            selectedarr.splice(index,1);
            this.photo.selected = false
        }
        else{
            selectedarr.push(this.photo);
            this.photo.selected = true
        }
        selected.set_Selected(selectedarr)

    }
    $scope.selectitem = selectitem;


    function showimg(photos) {
        //$log.info(photos);

        $scope.photos = photos;

        $scope.$apply();
        var $el = $('.grid');
        $el.masonry({
            itemSelector: '.grid-item'
        });
        $el.masonry('destroy');
        $el.masonry({
            itemSelector: '.grid-item'
        });
        $el.imagesLoaded()
            .progress(function () {
                $el.masonry({
                    itemSelector: '.grid-item'
                });

            });
    }

    function preloadImages(photos) {
        var images = [];
        _.each(photos, function (img) {
            var url = 'https://farm' + img.farm + '.staticflickr.com/' + img.server + '/' + img.id + '_' + img.secret + '.jpg';
            images.push(url)

        });
        var count = images.length;
        if (count === 0) {
            showimg(images)
        }
        var loaded = 0;
        $(images).each(function () {
            $('<img>').attr('src', this).load(function () {
                loaded++;
                if (loaded === count) {
                    //this is the callback which renders the grid
                    showimg(photos)
                }
            });
        });
    }

    function listener(topic, data) {
        $scope.photos = "";
        flickrservice.getphotos(data.text, preloadImages);
    }

    function init() {
        flickrservice.getphotos("sky", showimg);
    }

    init();

// Subscribe to event
    PubSub.subscribe('search', listener, null);


});