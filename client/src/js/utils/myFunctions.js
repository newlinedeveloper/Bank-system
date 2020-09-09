import {default as swal} from 'sweetalert2'


export default class Function {
    static sweetSuccess(title, text) {
        swal({
            type: "success",
            title: title,
            text: text,
            timer: 2000
        }).then(
            function () {
            },
            // handling the promise rejection
            function (dismiss) {
                if (dismiss === 'timer') {
                }
            }
        )
    }

    static sweetError(title, text) {
        swal({
            type: "error",
            title: title,
            text: text,
            timer: 2000
        }).then(
            function () {
            },
            // handling the promise rejection
            function (dismiss) {
                if (dismiss === 'timer') {
                }
            }
        )
    }
}
