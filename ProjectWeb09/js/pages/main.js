$(document).ready(function() {
    // Load dữ liệu:
    loadData();
    // gán các sự kiện cho các element:
    validateData();
    initEvents();
})

var employeeId = null;
var formMode = "add";

$(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
    alert("Ctrl-S pressed");
    event.preventDefault();
    return false;
});

function initEvents() {
    $(document).on('keydown', function(e) {
        if (e.keyCode == 27)
        $("#dialogId").hide();
      });
    $(window).keypress(function(event) {
        if (event.which == 119 && event.ctrlKey){
            $("#btnAdd").click(function (e) { 
                saveData();
            });
          return false;
        }
      });
    //in dam dong duoc chon trong table
    //Trinh Xuan Bach 22/10/2022
    $("table tbody tr").click(function () { 
        // Xóa tất cả các trạng thái được chọn của các dòng dữ liệu khác:
        $(this).siblings().removeClass('row-selected');
        // In đậm dòng được chọn:
        // this.classList.add("row-selected");
        employeeId = $(this).data('id');
        // console.log(employeeId);
    });

    //Hiển thị form nhân viên
    $("#addEmployee").click(function () { 
        formMode = "add";
        //Loai bo cac error truoc do 
        $(".input, select").removeClass("input-error");
        $(".input, select").next().hide();
        //Xoa du lieu trong input
        $("input[employeeEmail]").val("");
        //Hiển thị form
        $("#dialogId").show();
        //focus ô đầu tiên
        $("input[employeeID]").focus();
    });
    //dong dialog
    $("#btnClose").click(function(){
        $("#dialogId").hide();
    });
    
    //khi click vao nut thu nho thi thu nho sidebar
    //Trinh Xuan Bach 22/10/2022
    $(".header__menu").click(function(){
        $(".sidebar").addClass("sidebar-mini");
        $(".sidebar__title").addClass("sidebar__title-mini");
        $(".sidebar__item").addClass("sidebar__item-mini");
        $(".item__container").addClass("item__container-mini");
        $(".sidebar__title").addClass("sidebar__title-mini");
        $(".header__left").addClass("header__left-mini");
        $(".header__logo").addClass("header__logo-mini");
        $(".header__sidebar").addClass("header__sidebar-mini");
        $(".header__right").addClass("header__right-mini");
        $(".content").addClass("content-mini");
        $(".header__menu").hide();
        $(".header__menu-mini").show();
    });
    //khi click vao nut mo rong thi mo rong sidebar
    //Trinh Xuan Bach 22/10/2022
    $(".header__menu-mini").click(function (e) { 
        $(".sidebar").removeClass("sidebar-mini");
        $(".sidebar__title").removeClass("sidebar__title-mini");
        $(".sidebar__item").removeClass("sidebar__item-mini");
        $(".item__container").removeClass("item__container-mini");
        $(".sidebar__title").removeClass("sidebar__title-mini");
        $(".header__left").removeClass("header__left-mini");
        $(".header__logo").removeClass("header__logo-mini");
        $(".header__sidebar").removeClass("header__sidebar-mini");
        $(".header__right").removeClass("header__right-mini");
        $(".content").removeClass("content-mini");
        $(".header__menu").show();
        $(".header__menu-mini").hide();
    });
    //button chuc nang
    $("button.icon").click(function(e){
        //an cac button cu
        //hien thi droplist
        try{
            $(this).parent().parent().css("z-index","0");
            $(this).next().toggle();
            $(this).parent().parent().css("z-index","2");
            e.stopPropagation();
        }catch(ex){
            console.log(ex);
        }
        finally{
            // $(this).parent().parent().css("z-index","0");
        }
    });
    /**
     * Đóng các element khi click out
     * Trịnh xuân bách - 22/10/2022
     */
    $("body").click(function(e){
        $("button.icon").parent().parent().css("z-index","0");
        $(".dropdown-list").hide();
    });
    /**
     * Nút sửa thông tin nhân viên
     * Trịnh xuân bách - 22/10/2022
     */
    $("#btnAdd").click(function (e) { 
        saveData();
    });

    $(".feature span").click(function (e) { 
        formMode = "edit";
        saveData();
    });
    /**
     * binding dữ liệu khi double click vào 1 bản ghi
     * Trịnh xuân bách - 23/10/2022
     */
    $(document).on('dblclick', 'table tbody tr', function() {
        formMode = "edit";
         //Loai bo cac error truoc do 
         $(".input, select").removeClass("input-error");
         $(".input, select").next().hide();
         //Xoa du lieu trong input
         $("input[employeeEmail]").val("");
        // Hiển thị form:
        $("#dialogId").show();
        // Focus vào ô input đầu tiên:
        $("#dialogId")[0].focus();

        // Binding dữ liệu tương ứng với bản ghi vừa chọn:
        let data = $(this).data('entity');
        employeeId = $(this).data('id');
        
        console.log(employeeId)
        // Duyệt tất cả các input:
        let inputs = $("#dialogId input[type=radio], #dialogId input[type=date], #dialogId input[type=text], #dialogId select");
        for (const input of inputs) {
            // Đọc thông tin propValue và gán lên dialog:
            const propValue = $(input).attr("propValue");
            let value = data[propValue];
            //Xu li binding gioi tinh

            //Xu li binding cho datetime
            // console.log(input.type);
            if(input.type == "date"){
                value = formatDate(value);
                input.value = value;
            }
            // console.log(propValue);
            else{
                input.value = value;
            }
        }
    });


    $(".openPopup").on("click", function() {
        $('#output').text($('#output').text()+'Clicked! ');
    });
}


/**
 * Lấy dữ liệu từ API rồi fill vào table
 * Trịnh Xuân Bách - 22/10/2022
 */
function loadData(){
    try{
        $.ajax({
            type: "GET",
            async: false,
            url: "https://amis.manhnv.net/api/v1/employees",
            success: function(res) {
                $(".content__table table tbody").empty();
                // Xử lý dữ liệu từng đối tượng:
                let ths = $(".content__table table thead th");
                for (const emp of res) {
                    // duyệt từng cột trong tiêu đề:
                    var trElement = $(`<tr></tr>`);
                    for (const th of ths) {
                        // Lấy ra propValue tương ứng với các cột:
                        const propValue = $(th).attr("propValue");
                        // Lấy giá trị tương ứng với tên của propValue trong đối tượng:
                        let value = emp[propValue];
                        let classAlign = "";
                        //Thêm class cần cho từng td
                        switch(propValue){
                            case "CheckBox":
                                classAlign = "td-center tblcb__sticky-left";
                                value =`<input type="checkbox">`;
                                break;
                            case "EmployeeCode":
                                classAlign = "td-left tblid__sticky-left";
                                break;
                            case "EmployeeName":
                                classAlign = "td-left tblname__sticky-left";
                                break;
                            case "GenderName":
                                classAlign = "td-left";
                                break;
                            case "DateOfBirth":
                                value = formatDate(value);
                                classAlign = "td-center";
                                break;
                            case "IdentityNumber":
                                classAlign = "td-left";
                                break;
                            case "PositionName":
                                classAlign = "td-left";
                                break;
                            case "BankAccountNumber":
                                classAlign = "td-left";
                                break;
                            case "BankName":
                                classAlign = "td-left";
                                break;
                            case "BankBranchName":
                                classAlign = "td-left";
                                break;
                            case "Feature":
                                classAlign = "td-center feature tblfeature__sticky-right";
                                value =`<span>Sửa</span> 
                                    <div class="dropdown"> 
                                        <button class="icon">
                                            <div class="icon-dropdown "></div>
                                        </button>
                                        <div class="dropdown-list" hidden >
                                            <div class="dropdown-list__choose" >
                                                Xóa
                                            </div>
                                            <div class="dropdown-list__choose">
                                                Nhân bản
                                            </div>
                                        </div>
                                    </div>`;
                                break;
                            default:
                                break;
                        }
                        // Tạo thHTML:
                        let thHTML = `<td class='${classAlign}'>${value||""}</td>`;
                        // Đẩy vào trHMTL:
                        trElement.append(thHTML);
                    }
                    //Them vao id va doi tuong emp vao td
                    $(trElement).data("id", emp.EmployeeId); 
                    $(trElement).data("entity", emp);
                    $(".content__table table tbody").append(trElement)
                }
            },
            error: function(res) {
                console.log(res);
            }
        });
    }catch(error){
        console.log(error);
    }
}

/**
 * Gọi API thêm dữ liệu
 * Trịnh Xuân Bách - 22/10/2022
 */
function saveData() {
    console.log(formMode);
    // Thu thập dữ liệu:
    let inputs = $("#dialogId input[type=radio], #dialogId input[type=date], #dialogId input[type=text], #dialogId select");
    //tạo đối tượng employee để lưu trữ thông tin
    var employee = {};
    // build object:
    for (const input of inputs) {
        // Đọc thông tin propValue:
        const propValue = $(input).attr("propValue");
        // Lấy ra value:
        if (propValue) {
            let value = input.value;
            employee[propValue] = value;
        }
    }
    console.log(employeeId);
    console.log(employee);
    // Gọi api thực hiện cất dữ liệu:
    if (formMode == "edit") {
        $.ajax({
            type: "PUT",
            url: "https://amis.manhnv.net/api/v1/Employees/" + employeeId,
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                alert("Sửa dữ liệu thành công!");
                // load lại dữ liệu:
                loadData();
                // Ẩn form chi tiết:
                $("#dialogId").hide();
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "https://amis.manhnv.net/api/v1/Employees/",
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                alert("Thêm mới dữ liệu thành công!");
                // load lại dữ liệu:
                loadData();
                // Ẩn form chi tiết:
                $("#dialogId").hide();
            }
        });
    }
}

/**
 * Thực hiện validate dữ liệu
 * Author: Trinh Xuan Bach - 18/10/2022
 */
function validateData(){
    /**
     * Validate mã nhân viên, tên nhân viên, đơn vị trong dialog nhân vien
     * Trịnh Xuân Bách - 22/10/2022
     */
    $("input[employeeID],input[employeeName],select[employeeDepartment]").blur(function () { 
        //lay value
        var value = this.value;
        //kiem tra value
        // ĐẶt trạng thái tương ứng
        if(!value || value==0){
            // Nếu value rỗng hoặc null thì hiển thị trạng thái lỗi:
            $(this).addClass("input-error");
            $(this).next().show();
            // $(this).hide("span[employeeIdError]")
        }
        else{
            // Nếu có value thì bỏ cảnh báo lỗi:
            $(this).removeClass("input-error");
            $(this).next().hide()
        }
    });
    /**
     * Validate định dạng Email khi người dùng có nhập
     * Trịnh Xuân Bách - 22/10/2022
     */
    $("input[employeeEmail]").blur(function() {
        // Kiểm tra email:
        var email = this.value;
        var isEmail = checkEmailFormat(email);
        //Neu khong dung dinh dang
        if(email === ""){
            $(this).removeClass("input-error");
            $(this).next().hide()
            return;
        }
        if (!isEmail) {
            $(this).addClass("input-error");
            $(this).next().show();
        } else { //neu da dung dinh dang
            $(this).removeClass("input-error");
            $(this).next().hide()
        }
    });
}

/**
 * Format date theo dd/mm/yyy
 * @param {*} date
 * @returns 
 */
function formatDate(date) {
    try {
        if (date) {
            date = new Date(date);
            // Lấy ra ngày:
            dateValue = date.getDate();
            dateValue = dateValue < 10 ? `0${dateValue}` : dateValue;

            // lấy ra tháng:
            let month = date.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;

            // lấy ra năm:
            let year = date.getFullYear();

            return `${dateValue}/${month}/${year}`;
        } else {
            return "";
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Regex validate email
 * Trinh Xuan Bach - 20/10/2022
 * @param {*} email 
 * @returns 
 */
 function checkEmailFormat(email) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email.match(re);
}