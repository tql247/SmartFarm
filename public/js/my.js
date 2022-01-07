// project: SmartFarm
// author: tql247
// publish: 2022
// Copyright
// ----------------------------------------------------------------

// Bật màn hình/layer loading
function activeLoading() {
    document.getElementById("loading").classList.remove("d-none")
    document.getElementById("app").classList.add("d-none")
}

// Tắt màn hình/layer loading
function inactiveLoading() {
    document.getElementById("loading").classList.add("d-none")
    document.getElementById("app").classList.remove("d-none")
}

// gọi api tạo hoặc sửa tài khoản
function createOrUpdateAccount(e) {
    const urlSearchParams = new URLSearchParams($(e).serialize())
    const data = Object.fromEntries(urlSearchParams.entries())

    activeLoading()

    var settings = {
        "url": "/account/" + (data._id!==''?"update":"create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    }

    console.log(settings)


    $.ajax(settings).done((msg) => {
        inactiveLoading()
        console.log(msg)
    })
}

// gọi api tạo hoặc sửa trang trại
function createOrUpdateFarm(e) {
    const urlSearchParams = new URLSearchParams($(e).serialize())
    const data = Object.fromEntries(urlSearchParams.entries())

    activeLoading()

    var settings = {
        "url": "/farm/" + (data._id!==''?"update":"create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    }

    console.log(settings)

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
    // kiểm tra form tạo/sửa tài khoản đã
    // hợp lệ hay chưa
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

    // kiểm tra form tạo/sửa nông trại đã
    // hợp lệ hay chưa
    $("#farm-form").validate({
        rules: {
            name: "required",
            address: "required",
            owner: "required",
        },
        messages: {
            name: "Vui lòng nhập tên",
            address: "Vui lòng nhập địa chỉ",
            owner: "Vui lòng chọn chủ nông trang",
        }
    })

    // bắt sự kiện submit
    // sự kiện thêm hoặc sửa tài khoản
    $("#account-form").on("submit", function (e) {
        e.preventDefault()
        if ($(this).valid()) {
            createOrUpdateAccount(this)
        }
    })

    // sự kiện thêm hoặc sửa trang trại
    $("#farm-form").on("submit", function (e) {
        e.preventDefault()
        if ($(this).valid()) {
            createOrUpdateFarm(this)
        }
    })


    // bắt sự kiện click nút edit account
    $(".edit-account").on("click", function(e) {
        const dataRowHTML = e.currentTarget.closest(".data-row")

        // Đẩy dữ liệu vào form
        document.querySelector("#account-form ._id").value = dataRowHTML.querySelector("._id").innerText.trim()
        document.querySelector("#account-form .email").value = dataRowHTML.querySelector(".email").innerText.trim()
        document.querySelector("#account-form .phone").value = dataRowHTML.querySelector(".phone").innerText.trim()
        document.querySelector("#account-form .full_name").value = dataRowHTML.querySelector(".full_name").innerText.trim()
        document.querySelector("#account-form .address").value = dataRowHTML.querySelector(".address").innerText.trim()
        document.querySelector("#account-form .role").value = dataRowHTML.querySelector(".role").innerText.trim()
    })

    // bắt sự kiện click nút edit farm
    $(".edit-farm").on("click", function(e) {
        const dataRowHTML = e.currentTarget.closest(".data-row")

        // Đẩy dữ liệu vào form
        document.querySelector("#farm-form ._id").value = dataRowHTML.querySelector("._id").innerText.trim()
        document.querySelector("#farm-form .name").value = dataRowHTML.querySelector(".name").innerText.trim()
        document.querySelector("#farm-form .address").value = dataRowHTML.querySelector(".address").innerText.trim()
        accountSelector.setChoiceByValue(dataRowHTML.querySelector(".owner ._id").innerText.trim())
    })

    // bắt sự kiện click nút delete account
    $(".delete-account").on("click", function(e) {
        if (confirm("Are you sure you want to delete?")) {
            const dataRowHTML = e.currentTarget.closest(".data-row")
            const _id = dataRowHTML.querySelector("._id").innerText.trim()
            deleteAccount(_id)
        }
    })

    // Biến đổi select tag thành choicesjs
    var accountSelectorElement = document.querySelector(".account-select")
    if (accountSelectorElement) accountSelector = new Choices('.account-select')
}


// kiểm tra đường dẫn có phải là trang login, đúng thì xoá
// jwt được lưu trữ
if (window.location.pathname === "/account/login") {
    // clear jwt localstorage
}

// Tạo các biến để sử dụng
let accountSelector = undefined

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

