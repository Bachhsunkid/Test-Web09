$(document).ready(function() {
    // gán các sự kiện cho các element:
    initEvents();
    // Load dữ liệu:
    // loadData();
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
        $("#inputFocus").focus();
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


