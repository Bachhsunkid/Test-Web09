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

}


