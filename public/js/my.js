// ================================================================
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ----------------------------------------------------------------
// project: SmartFarm
// author: tql247
// publish: 2022
// ----------------------------------------------------------------
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ================================================================

// ****************************************************************
//* Các hàm tương tác với controller */ 
// ****************************************************************
// gọi api tạo hoặc sửa tài khoản
function createOrUpdateAccount(e) {
    const urlSearchParams = new URLSearchParams($(e).serialize())
    const data = Object.fromEntries(urlSearchParams.entries())

    activeLoading()

    var settings = {
        "url": "/account/" + (data._id !== '' ? "update" : "create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    }

    $.ajax(settings).done((msg) => {
        inactiveLoading()
    })
}

// gọi api tạo hoặc sửa trang trại
function createOrUpdateFarm(e) {
    const urlSearchParams = new URLSearchParams($(e).serialize())
    const data = Object.fromEntries(urlSearchParams.entries())

    activeLoading()

    var settings = {
        "url": "/farm/" + (data._id !== '' ? "update" : "create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    }

    $.ajax(settings).done((result, success) => {
        if (success) {
            updateFarmDataRow(result)
        }
        else {
            alert('Fail to update')
        }

        inactiveLoading()
    })
}

// gọi api tạo hoặc sửa cảm biến
function createOrUpdateSensor(e) {
    const urlSearchParams = new URLSearchParams($(e).serialize())
    const data = Object.fromEntries(urlSearchParams.entries())

    activeLoading()

    var settings = {
        "url": "/sensor/" + (data._id !== '' ? "update" : "create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    }

    $.ajax(settings).done((result, success) => {
        if (success) {
            // updateFarmDataRow(result)
            console.log(result)
        }
        else {
            alert('Fail to update')
        }

        inactiveLoading()
    })
}

// gọi api tạo hoặc sửa cảm biến
function createOrUpdateMachine(e) {
    const urlSearchParams = new URLSearchParams($(e).serialize())
    const data = Object.fromEntries(urlSearchParams.entries())

    activeLoading()

    var settings = {
        "url": "/machine/" + (data._id !== '' ? "update" : "create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    }

    $.ajax(settings).done((result, success) => {
        if (success) {
            // updateFarmDataRow(result)
            console.log(result)
        }
        else {
            alert('Fail to update')
        }

        inactiveLoading()
    })
}

// gọi api delete account
function deleteAccount(_id) {

    activeLoading()

    var settings = {
        "url": "/account/delete/" + _id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    }


    $.ajax(settings).done((msg) => {
        inactiveLoading()
    })
}

// gọi api delete farm
function deleteFarm(_id) {
    activeLoading()

    var settings = {
        "url": "/farm/delete/" + _id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    }


    $.ajax(settings).done((msg) => {
        inactiveLoading()
    })
}

// gọi api delete sensor
function deleteSensor(_id) {
    activeLoading()

    var settings = {
        "url": "/sensor/delete/" + _id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    }


    $.ajax(settings).done((msg) => {
        inactiveLoading()
    })
}

// gọi api delete sensor
function deleteMachine(_id) {
    activeLoading()

    var settings = {
        "url": "/machine/delete/" + _id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    }


    $.ajax(settings).done((msg) => {
        inactiveLoading()
    })
}

// gọi api lấy ra danh sách trang trại thuộc sở hữu của account
async function getFarmsByOwner(ownerID, locationID) {
    var settings = {
        "url": "/farm/get_by_owner/" + ownerID,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
    }

    $.ajax(settings).done((result, success) => {
        if (success) {
            // console.log(success)
            updateFarmSelectorHTML(result, locationID)
        }
        else {
            alert('Fail to update')
        }
    })
}

// ****************************************************************
//* Các hàm tương tác với giao diện */
// ****************************************************************
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

// Cập nhật lại giá trị mới
function updateFarmDataRow(farm) {
    const dataRowHTML = document.querySelector(`tr.data-row[data-farm-id='${farm._id}']`)
    if (dataRowHTML) {
        dataRowHTML.querySelector("._id").innerText = farm._id
        dataRowHTML.querySelector(".name").innerText = farm.name
        dataRowHTML.querySelector(".address").innerText = farm.address
        dataRowHTML.querySelector(".owner.full_name").innerText = farm.owner.full_name
        dataRowHTML.querySelector(".owner.email").innerText = farm.owner.email
    }
}

// Tạo lại selection
function updateFarmSelectorHTML(farms, locationID) {
    if (farms.length > 0) {
        farmSelector.setChoices(
            farms.map(farm => {
                return {
                    'value': farm._id,
                    'label': farm.name
                }
            })
        )
        
        // Kiểm tra form có phải đang trong chế dộ
        // chỉnh sửa hay không, nếu có
        // tự động chọn giá trị đầu tiên
        // Nếu không cập nhật theo giá trị cài đặt
        farmSelector.setChoiceByValue(locationID || farms[0]._id)
    }
}

// Lấy dữ liệu và Tạo lại selection với giá trị mới
function updateFarmSelectorByOwner(ownerID, locationID = undefined) {
    farmSelector.clearStore()
    getFarmsByOwner(ownerID, locationID)
}

// Dựng các đối tượng, gán giá trị
function buildDisplay() {
    // Gán các kiểu dữ liệu
    // Gán form html
    sensorForm = document.querySelector("#sensor-form")
    machineForm = document.querySelector("#machine-form")
    // gán selector
    accountSelectorElement = document.querySelector(".account-select")
    farmSelectorElement = document.querySelector(".farm-select")
    sensorSelectorElement = document.querySelector(".sensor-select")
    machineSelectorElement = document.querySelector(".machine-select")


    // Biến đổi select tag thành choicesjs
    if (accountSelectorElement) accountSelector = new Choices(accountSelectorElement)
    if (farmSelectorElement) farmSelector = new Choices(farmSelectorElement)
    if (sensorSelectorElement) sensorSelector = new Choices(sensorSelectorElement)
    if (machineSelectorElement) machineSelector = new Choices(machineSelectorElement)

    // Biến đổi html table thành datatable
    var sensorTable = document.querySelector(".sensor-table")
    if (sensorTable) sensorDataTable = new simpleDatatables.DataTable(sensorTable)
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
                required: function (element) {
                    return document.querySelector("#account-form ._id").value === "";
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

    // kiểm tra form tạo/sửa cảm biến đã
    // hợp lệ hay chưa
    $("#sensor-form").validate({
        rules: {
            name: "required",
            located: {
                required: true,
                minLength: 1
            },
            owner: "required",
        },
        messages: {
            name: "Vui lòng nhập tên cảm biến",
            located: "Vui lòng nhập chọn trang trại",
            owner: "Vui lòng nhập chọn chủ trang trại",
        }
    })

    // kiểm tra form tạo/sửa thiết bị đã
    // hợp lệ hay chưa
    $("#machine-form").validate({
        rules: {
            name: "required",
            located: {
                required: true,
                minLength: 1
            },
            owner: "required",
        },
        messages: {
            name: "Vui lòng nhập tên cảm biến",
            located: "Vui lòng nhập chọn trang trại",
            owner: "Vui lòng nhập chọn chủ trang trại",
        }
    })
    // ===> Kết thúc kiểm tra input

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

    // sự kiện thêm hoặc sửa cảm biến
    $("#sensor-form").on("submit", function (e) {
        e.preventDefault()
        if ($(this).valid()) {
            createOrUpdateSensor(this)
        }
    })

    // sự kiện thêm hoặc sửa cảm biến
    $("#machine-form").on("submit", function (e) {
        e.preventDefault()
        if ($(this).valid()) {
            createOrUpdateMachine(this)
        }
    })
    // ===> Kết thúc các sự kiện submit

    // Bắt các sự kiện edit
    // bắt sự kiện click nút edit account
    $(".edit-account").on("click", function (e) {
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
    $(".edit-farm").on("click", function (e) {
        const dataRowHTML = e.currentTarget.closest(".data-row")

        // Đẩy dữ liệu vào form
        document.querySelector("#farm-form ._id").value = dataRowHTML.querySelector("._id").innerText.trim()
        document.querySelector("#farm-form .name").value = dataRowHTML.querySelector(".name").innerText.trim()
        document.querySelector("#farm-form .address").value = dataRowHTML.querySelector(".address").innerText.trim()
        accountSelector.setChoiceByValue(dataRowHTML.querySelector(".owner_id").innerText.trim())
    })

    // bắt sự kiện click nút edit cảm biến
    $(".edit-sensor").on("click", function (e) {
        const dataRowHTML = e.currentTarget.closest(".data-row")

        // Đẩy dữ liệu vào form
        sensorForm.elements["_id"].value = dataRowHTML.querySelector("._id").innerText.trim()
        sensorForm.elements["name"].value = dataRowHTML.querySelector(".name").innerText.trim()
        
        // Gán giá trị selector
        accountSelector.setChoiceByValue(dataRowHTML.dataset.ownerId)
        updateFarmSelectorByOwner(dataRowHTML.dataset.ownerId, dataRowHTML.dataset.locatedId)
    })

    // bắt sự kiện click nút edit thiết bị
    $(".edit-machine").on("click", function (e) {
        const dataRowHTML = e.currentTarget.closest(".data-row")

        // Đẩy dữ liệu vào form
        machineForm.elements["_id"].value = dataRowHTML.querySelector("._id").innerText.trim()
        machineForm.elements["name"].value = dataRowHTML.querySelector(".name").innerText.trim()
        
        // Gán giá trị selector
        accountSelector.setChoiceByValue(dataRowHTML.dataset.ownerId)
        updateFarmSelectorByOwner(dataRowHTML.dataset.ownerId, dataRowHTML.dataset.locatedId)
    })
    // ===> Kết thúc các sự kiện edit

    // Bắt các sự kiện delete
    // bắt sự kiện click nút delete account
    $(".delete-account").on("click", function (e) {
        if (confirm("Are you sure you want to delete?")) {
            const dataRowHTML = e.currentTarget.closest(".data-row")
            const _id = dataRowHTML.querySelector("._id").innerText.trim()
            deleteAccount(_id)
        }
    })

    // bắt sự kiện click nút delete farm
    $(".delete-farm").on("click", function (e) {
        if (confirm("Are you sure you want to delete?")) {
            const dataRowHTML = e.currentTarget.closest(".data-row")
            const _id = dataRowHTML.querySelector("._id").innerText.trim()
            deleteFarm(_id)
        }
    })

    // bắt sự kiện click nút delete sensor
    $(".delete-sensor").on("click", function (e) {
        if (confirm("Are you sure you want to delete?")) {
            const dataRowHTML = e.currentTarget.closest(".data-row")
            const _id = dataRowHTML.querySelector("._id").innerText.trim()
            deleteSensor(_id)
        }
    })

    // bắt sự kiện click nút delete machine
    $(".delete-machine").on("click", function (e) {
        if (confirm("Are you sure you want to delete?")) {
            const dataRowHTML = e.currentTarget.closest(".data-row")
            const _id = dataRowHTML.querySelector("._id").innerText.trim()
            deleteMachine(_id)
        }
    })
    // ===> Kết thúc các sự kiện delete

    // Áp dụng các sự kiện nếu accountSelector tồn tại
    if (accountSelector) {
        // Bắt sự kiện thay đổi giá trị được chọn
        accountSelectorElement.addEventListener('change', function (e) {
            const accountSelected = accountSelector.getValue()
            // console.log('accountSelected')
            // console.log(accountSelected)

            // handle select farm if exist
            if (farmSelector) {
                updateFarmSelectorByOwner(accountSelected.value)
            }
        })
    }
}


// kiểm tra đường dẫn có phải là trang login, đúng thì xoá
// jwt được lưu trữ
if (window.location.pathname === "/account/login") {
    // clear jwt localstorage
}

// Tạo các biến để sử dụng
// Biến lưu selector choicejs
let accountSelectorElement = undefined
let accountSelector = undefined
let farmSelector = undefined
let farmSelectorElement = undefined
let sensorSelector = undefined
let sensorSelectorElement = undefined
let machineSelector = undefined
let machineSelectorElement = undefined
// Biến lưu form
let sensorForm = undefined
let machineForm = undefined

// Hàm bên dưới sẽ chạy khi trang đã tải xong nội dung
$(document).ready(function () {
    buildDisplay()
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

// accountSelector.passedElement.element.addEventListener(
//     'choice',
//     function(event) {
//         console.log('ssss')
//         console.log(event)

//     },
//     false,
// );
