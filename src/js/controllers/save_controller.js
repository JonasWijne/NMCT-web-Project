app.controller("save", function ($scope, imgsrc, selected, googleservice) {
    function save() {
        var srcs = selected.get_Selected();
        //console.log(srcs);

        for (var i = 0; i < srcs.length; i++) {
            var obj = srcs[i];
            obj.url = selected.get_Url(obj);
            console.log(obj);

        }
    }
    function test(){
        var selectedarr = selected.get_Selected();
        //console.log(selectedarr);
        if(selectedarr.length >= 1) {
            googleservice.check_Auth();
        } else {
            console.log("no img selected");
        }
    }

    $scope.save = test


});

