function BtnEventBind(){
    //Event Handler Bind
    $("#btnScheduleRead").bind('click', GetSchedule);
    $("#txtWorkDate").bind('change', SetWeekChar);
    $("#btnEdit").bind('click', SetEditMode);
    $("#btnAppend").bind('click', GetSchedule);
    $("#btnDelete").bind('click', DeleteSchedule);
    $("#btnOk").bind('click', SetDisplayMode);
    $("#btnLoadConfig").bind('click', LoadStaffConfig);
    $("#btnAddStaff").bind('click', AddStaff);
    $("#btnMeasureTime").bind('click', SetMeasureTime);

    //戻るボタンイベント
    $("#btnStaffReturn").bind("click", function () {
        location.href = '#DailyReport';
    });
    $("#btnEviromentReturn").bind("click", function () {
        location.href = '#DailyReport';
    });
    $("#btnResultReturn").bind("click", function () {
        location.href = '#DailyReport';
    });
    $("#btnSatffSettingEntry").bind("click", function () {
        //CurrentStaff
        var i = 0;
        $("#ConfigList").find("select").each(function (index, elem) {
            if ($(elem).val()) {
                CurrentStaff[i] = $(elem).val();
                i += 1;
            }
        });

        SetWorkTime();

        location.href = '#DailyReport';
    });

    $("#btnStaffSettingCancel").bind("click", function () {
        location.href = '#DailyReport';
    });

    //$("#btnEvironmentMeasureEntry").bind("click", function () {
    //    location.href = '#DailyReport';
    //});
    //$("#btnEvironmentMeasureCancel").bind("click", function () {
    //    location.href = '#DailyReport';
    //});


    //子画面へ進む
    $("#btnStaffSetting").bind("click", function () {
        location.href = '#StaffSetting';
    });
    //$("#btnWorkEnviromentAssessment").bind("click", function () {
    //    //location.href = '#WorkEnviromentAssessment';
    //    $("#/*WorkEnviromentAssessment*/").trigger("updatelayout");
    //});
}