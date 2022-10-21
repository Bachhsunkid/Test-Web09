$(document).ready(function() {
    // gán các sự kiện cho các element:
    initEvents();
    // Load dữ liệu:
    loadData();
})

function initEvents() {
    $(document).on('click', '.content__table table tr', function() {
        // Xóa tất cả các trạng thái được chọn của các dòng dữ liệu khác:
        $(this).siblings().removeClass('row-selected');
        // In đậm dòng được chọn:
        this.classList.add("row-selected");
        // employeeId = $(this).data('id');
    });

    function btnSaveOnClick(){
        //validate dữ liệu
        var isValid = validateData();
        //Thu thập dữ liệu

        //gọi API thực hiện cất dữ liệu

        //Kiểm tra kết quả trả về rồi đưa ra thông báo
    }
    //Hiển thị form nhân viên
    $("#addEmployee").click(function () { 
        //Hiển thị form
        $("#dialogId").show();
        //focus ô đầu tiên
        $("input[employeeID]").focus();
    });

    $("#btnClose").click(function(){
        $("#dialogId").hide();
    });

    $("td .feature .icon").click(function(){
        $(this).next().hide();
        $(this).next().show();
    });
    //validate ma nhan vien
    $("input[employeeID]").blur(function () { 
        //lay value
        var value = this.value;
        //kiem tra value
        // ĐẶt trạng thái tương ứng
        if(!value){
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
    
    //validate ten nhan vien
    $("input[employeeName]").blur(function () { 
        //lay value
        var value = this.value;
        //kiem tra value
        // ĐẶt trạng thái tương ứng
        if(!value){
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
    $("select[employeeDepartment]").blur(function () { 
        //lay value
        var value = this.value;
        //kiem tra value
        // ĐẶt trạng thái tương ứng
        if(value==0){
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
    //xu li validate du lieu email
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

function loadData(){
    try{
    //Xoa du lieu cu

    // goi api load du lieu
    $.ajax({
        type: "GET",
        url: "https://amis.manhnv.net/api/v1/employees",
        data: "data",
        success: function (response) {
            console.log(response)
            let count = 1;
            for (const emp of response) {
                const employeeCode = emp.employeeCode;
                const employeeName = emp.employeeName;
                const employeeGender = emp.GenderName;
                const employeeDOB = emp.DateOfBirth;
                 

                var trHTML = $(`<tr>



                                
                                </tr>`);
                count++;
            }
        }
    });
    //xu li du lieu

    // hien thi len table
    }catch(error){
        console.log(error);
    }
}







/**
 * Thực hiện validate dữ liệu
 * Author: Trinh Xuan Bach - 18/10/2022
 */
function validateData(){
    //các thông tin bắt buộc nhập
        
    //Các thông tin cần đúng định dạng

    //Ngày tháng:
}


