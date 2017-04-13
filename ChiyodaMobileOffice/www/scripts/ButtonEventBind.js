function BtnEventBind(){
    //Event Handler Bind
    $("#btnScheduleRead").bind('click', function () { GetSchedule(EDIT_MODE.DISPLAY); });
    $("#txtWorkDate").bind('change', SetWeekChar);
    $("#btnEdit").bind('click', SetEditMode);
    $("#btnAppend").bind('click', function () { GetSchedule(EDIT_MODE.EDIT); });
    $("#btnDelete").bind('click', DeleteSchedule);
    $("#btnOk").bind('click', SetDisplayMode);
    $("#btnLoadConfig").bind('click', LoadStaffConfig);
    $("#btnAddStaff").bind('click', AddStaff);
    $("#btnMeasureTime").bind('click', SetMeasureTime);
    $("#btnAddPressConditions").bind('click',AddPressConditions)

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

    $("#btnDetailResultReturn").bind("click", function () {
        location.href = '#ResultEntry';
    });

    //$("#btnEvironmentMeasureCancel").bind("click", function () {
    //    location.href = '#DailyReport';
    //});


    //子画面へ進む
    $("#btnStaffSetting").bind("click", function () {
        location.href = '#StaffSetting';
    });

    $("#btnDetailResultEntry").bind("click", function () {
        //alert($("#tblDetails input:radio:checked"))
        if ($("#tblDetails input:radio:checked").length>0) {
            location.href = '#DetailResultEntryPage';
        } else {
            alert("ロットを選択してください。");
        }
    });
    //$("#btnWorkEnviromentAssessment").bind("click", function () {
    //    //location.href = '#WorkEnviromentAssessment';
    //    $("#/*WorkEnviromentAssessment*/").trigger("updatelayout");
    //});
}