function activeLoading() {
    document.getElementById("loading").classList.remove("d-none")
}

function inactiveLoading() {
    document.getElementById("loading").classList.add("d-none")
}

// gọi api tạo tài khoản
function createOrUpdateAccount(e) {
    const urlSearchParams = new URLSearchParams($(e).serialize())
    const data = Object.fromEntries(urlSearchParams.entries())

    activeLoading()

    var settings = {
        "url": "/account/" + data._id!==''?"update":"create",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    }


    $.ajax(settings).done((msg) => {
        inactiveLoading()
        console.log(msg)
    })
}

// gọi api delete account
function deleteAccount(_id) {

    activeLoading()

    var settings = {
        "url": "/account/delete/" +_id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    }


    $.ajax(settings).done((msg) => {
        inactiveLoading()
        console.log(msg)
    })
}

// Nạp các sự kiện
function eventStuff() {
    // kiểm tra input
    $("#account-form").validate({
        rules: {
            email: "required",
            password: {
                required: function(element){
                    return document.querySelector("#account-form ._id").value==="";
                }
            },
            full_name: "required",
        },
        messages: {
            email: "Vui lòng nhập email",
            password: "Vui lòng nhập password",
            full_name: "Vui lòng nhập Họ tên",
        }
    })

    // bắt sự kiện submit
    $("#account-form").on("submit", function (e) {
        e.preventDefault()
        if ($(this).valid()) {
            createOrUpdateAccount(this)
        }
    })

    // bắt sự kiện click nút edit account
    $(".edit-account").on("click", function(e) {
        const dataRowHTML = e.currentTarget.closest(".data-row")

        // set data to form
        document.querySelector("#account-form ._id").value = dataRowHTML.querySelector("._id").innerText.trim()
        document.querySelector("#account-form .email").value = dataRowHTML.querySelector(".email").innerText.trim()
        document.querySelector("#account-form .phone").value = dataRowHTML.querySelector(".phone").innerText.trim()
        document.querySelector("#account-form .full_name").value = dataRowHTML.querySelector(".full_name").innerText.trim()
        document.querySelector("#account-form .address").value = dataRowHTML.querySelector(".address").innerText.trim()
    })

    // bắt sự kiện click nút delete account
    $(".delete-account").on("click", function(e) {
        if (confirm("Are you sure you want to delete?")) {
            const dataRowHTML = e.currentTarget.closest(".data-row")
            const _id = dataRowHTML.querySelector("._id").innerText.trim()
            deleteAccount(_id)
        }
    })
}

// Hàm bên dưới sẽ chạy khi trang đã tải xong nội dung
$(document).ready(function () {
    eventStuff()
})

// let socketClient = io.connect('https://universitysocial.herokuapp.com/')

// socketClient.on('outside', function () {
//     beep()
//     console.log('outside')
// })

// socketClient.on('new-notify', function (data) {
//     beep()
//     $(data.data).prependTo("#qw-notify-list")
// })

// kiểm tra đường dẫn có phải là trang login, đúng thì xoá
// jwt được lưu trữ
if (window.location.pathname === "/account/login") {
    // clear jwt localstorage
}
