
//曜日の選択肢
var youbi = new Array("日", "月", "火", "水", "木", "金", "土");

var EDIT_MODE = {
    DISPLAY: 0,
    EDIT: 1
};

var currentMode;

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
    $("#txtWeekChar").text(todayWeekChar);
}

function InitailizeDailyReportForm() {
    $("th:eq(0)", $("#detal-table tr")).hide();
    $("td:eq(0)", $("#detal-table tr")).hide();
    $("#divEdit").hide();

    //Event Handler Bind
    $("#btnScheduleRead").bind('click', GetSchedule);
    $("#txtWorkDate").bind('change', SetWeekChar);
    $("#btnEdit").bind('click', SetEditMode);
    $("#btnAppend").bind('click', GetSchedule);
    $("#btnDelete").bind('click', DeleteSchedule);
    $("#btnOk").bind('click', SetDisplayMode);
    currentMode = EDIT_MODE.DISPLAY;
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
        newRow = "<tr><td style=\"display: none;\"><input type=\"radio\"/></td><td>2</td><td>3</td><td>4</td><td>5</td><td>1</td><td>2</td><td>3</td><td>4</td><td><button class=\"ui-btn ui-corner-all\">実</button></td></tr>";
    } else {
        newRow = "<tr><td><input type=\"radio\"/></td><td>2</td><td>3</td><td>4</td><td>5</td><td>1</td><td>2</td><td>3</td><td>4</td><td style=\"display: none;\"><button class=\"ui-btn ui-corner-all\">実</button></td></tr>";
    }
    $('#detal-table').append(newRow);
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
    $('#detal-tbody input:radio:checked').each(function (index, element) {
        $(element).parents("tr").remove();
    });
}