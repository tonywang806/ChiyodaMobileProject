
//曜日の選択肢
var youbi = new Array("日", "月", "火", "水", "木", "金", "土");

//担当者の選択肢
var staff = new Array("", "今村", "和田", "潮田", "鈴木");

var CurrentStaff = new Array();

var EDIT_MODE = {
    DISPLAY: 0,
    EDIT: 1
};

var currentMode;
var staffCount = 3;

//作業日にディフォルト値を設定
function InitailizeSearchConditions() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    //出力用
    var today = now.getFullYear() + "-" + month + "-" + day;
    var you = now.getDay(); //曜日(0～6=日～土)
    var todayWeekChar = "(" + youbi[you] + ")";

    $("#txtWorkDate").val(today).select();

    var weekLab = "<label id=\"txtWeekChar\"></label>";
    $("#txtWorkDate").parents("div").append(weekLab);
    $("#txtWeekChar").text(todayWeekChar);
    $("#selectWorkType").val("off").slider("refresh");
}

function InitailizeDailyReportForm() {
    $("th:eq(0)", $("#detal-table tr")).hide();
    $("td:eq(0)", $("#detal-table tr")).hide();
    $("#divEdit").hide();

    BtnEventBind();

    staff.forEach(function (elem, index) {
        $('#selectCaptain').append($('<option>').html(elem));
        $('#selectOperator1').append($('<option>').html(elem));
        $('#selectOperator2').append($('<option>').html(elem));
    });
   
    currentMode = EDIT_MODE.DISPLAY;
}

function GotoResultEntry() {
    location.href = '#ResultEntry';
}

//曜日表示
function SetWeekChar() {
    if ($("#txtWorkDate").text === "") {
        $("#txtWeekChar").val("");
    } else {
        var today = new Date($("#txtWorkDate").val());
        var you = today.getDay(); //曜日(0～6=日～土)
        var todayWeekChar = "(" + youbi[you] + ")";

        $("#txtWeekChar").text(todayWeekChar);
    }
}

//予定計画・明細部操作

//行追加
function GetSchedule() {
    var newRow = "";
    if (currentMode === EDIT_MODE.DISPLAY) {
        newRow = "<tr draggable=\"true\"><td style=\"display: none;\"><input type=\"checkbox\"/></td><td>2</td><td>3</td><td>4</td><td>5</td><td>1</td><td>2</td><td>3</td><td>4</td><td><button class=\"ui-btn ui-corner-all\" onClick=\"GotoResultEntry();\">実</button></td></tr>";
    } else {
        newRow = "<tr draggable=\"true\"><td><input type=\"checkbox\"/></td><td>2</td><td>3</td><td>4</td><td>5</td><td>1</td><td>2</td><td>3</td><td>4</td><td style=\"display: none;\"><button class=\"ui-btn ui-corner-all\" onClick=\"GotoResultEntry();\">実</button></td></tr>";
    }

    $(newRow).appendTo("#detal-table").enhanceWithin();
}

//編集モード設定
function SetEditMode() {

    $("th:eq(9)", $("#detal-table tr")).hide();
    $("td:eq(9)", $("#detal-table tr")).hide();
    $("#divDisplay").hide();

    $("th:eq(0)", $("#detal-table tr")).show();
    $("td:eq(0)", $("#detal-table tr")).show();
    $("#divEdit").show();

    currentMode = EDIT_MODE.EDIT;
}

//表示モード設定
function SetDisplayMode() {
    $("th:eq(0)", $("#detal-table tr")).hide();
    $("td:eq(0)", $("#detal-table tr")).hide();
    $("#divEdit").hide();

    $("th:eq(9)", $("#detal-table tr")).show();
    $("td:eq(9)", $("#detal-table tr")).show();
    $("#divDisplay").show();

    currentMode = EDIT_MODE.DISPLAY;
}

//行削除
function DeleteSchedule() {
    $('#detal-tbody input:checkbox:checked').each(function (index, element) {
        $(element).parents("tr").remove();
    });
}

function LoadStaffConfig() {
    $("#selectCaptain").val(staff[1]).select().selectmenu('refresh');
    $("#selectOperator1").val(staff[2]).select().selectmenu('refresh');
}

function AddStaff() {

    var staffSelectBoxName = "selectOperator" + staffCount;

    var newStaffConfig = "<li>";
    newStaffConfig = newStaffConfig + "<label style=\"font-weight:bold\">機員" + staffCount + "</label>";
    newStaffConfig = newStaffConfig+"<div class=\"ui-grid-b\">";
    newStaffConfig = newStaffConfig+"<div class=\"ui-block-a\"><select id=\""+ staffSelectBoxName+"\"></select></div>";
    newStaffConfig = newStaffConfig+"<div class=\"ui-block-b\"><input type=\"checkbox\" id=\"checkOperator" + staffCount + "Rest\" /><label for=\"checkOperator" + staffCount +"Rest\">休暇</label></div>";
    newStaffConfig = newStaffConfig+"<div class=\"ui-block-c\"><input type=\"checkbox\" id=\"checkOperator" + staffCount + "HalfRest\" /><label for=\"checkOperator" + staffCount + "HalfRest\">半休</label></div>";
    newStaffConfig = newStaffConfig + "</div></li >";

    $(newStaffConfig).appendTo("#ConfigList").enhanceWithin();

    staffCount += 1;

    staff.forEach(function (elem, index) {
        $("#"+staffSelectBoxName).append($('<option>').html(elem));
    });
}

function SetWorkTime() {
    $(CurrentStaff).each(function (index, elem) {

    });
}

function SetMeasureTime() {
    var now = new Date();
    var currentTime = "";



    if (now.getHours() < 10) {
        currentTime = "0"+now.getHours();
    } else {
        currentTime = now.getHours();
    }

    if (now.getMinutes() < 10) {
        currentTime = currentTime + ":0" + now.getMinutes();
    } else {
        currentTime = currentTime + ":" + now.getMinutes();
    }
    
    //alert(currentTime);
    $("#txtMeasureTime").val(currentTime);
    //$("#txtMeasureTime").val("7:11");
}