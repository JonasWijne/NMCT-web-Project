app.service('googleservice', function (imgsrc, selected) {

    var CLIENT_ID = '923135994270-2jia7dviutguqd3188lf8dgie76jg2ef.apps.googleusercontent.com';

    var SCOPES = ['https://www.googleapis.com/auth/drive'];

    /**
     * Check if current user has authorized this application.
     */
    function check_Auth() {
        gapi.auth.authorize(
            {
                'client_id': CLIENT_ID,
                'scope': SCOPES.join(' '),
                'immediate': true
            }, handleAuthResult);
    }

    function handle_Auth() {
        gapi.auth.authorize(
            {
                client_id: CLIENT_ID,
                scope: SCOPES,
                immediate: false
            }
            , handleAuthResult);

    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            //console.log("authorized");
            loadDriveApi();
        } else {
            console.log("not authorized");
            handle_Auth()

        }
    }

    function loadDriveApi() {
        var selectedarr = selected.get_Selected();


        for (var i = 0; i < selectedarr.length; i++) {
            var photo = selectedarr[i];
            gapi.client.load('drive', 'v2').then(imgsrc.convert(photo, insertFile));
        }

    }

    function setupFile(file) {
        console.log(file);
    }

    function insertFile(file, photo) {
        const boundary = "_-_-_-_-_-_-_-_-_-_-_-_-_";
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
        var metadata = {
            'title': photo.title,
            'mimeType': 'image/jpg',
            //"parents": [{"kind": "drive#fileLink", "id": "0B2r4UWr933wTVnhaVm9fTElSaW8"}]
        };
        var base64Data = btoa(window.atob(file.replace('data:image/jpeg;base64,', '')));
        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: image/jpg' + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;
        var request = gapi.client.request({
            'path': '/upload/drive/v2/files',
            'method': 'POST',
            'params': {'uploadType': 'multipart'},
            'headers': {
                'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
            },
            'body': multipartRequestBody
        });
        request.execute(function (arg) {
            console.log(arg);
        });
    }

    return {
        check_Auth: check_Auth
    }

});