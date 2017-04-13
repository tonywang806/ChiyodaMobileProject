
//曜日の選択肢
var youbi = new Array("日", "月", "火", "水", "木", "金", "土");

//担当者の選択肢
var staff = new Array("", "今村", "和田", "潮田", "鈴木");

//停止理由の選択肢
var reason = new Array("", "10朝", "11掃除", "12引", "13休", "14Q", "15会", "16品", "17欠", "18応",
    "20先", "21営", "22材", "23温", "30予", "31処", "32校", "33VM", "40原", "41版不", "42イ", "43印不",
    "44中", "45立", "46R", "51切", "60故");

var CurrentStaff = new Array();

var EDIT_MODE = {
    DISPLAY: 0,
    EDIT: 1
};

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

    reason.forEach(function (elem, index) {
        $("#detailStopReason").append($('<option>').html(elem));
    });

    //$("#tabs").tabs();
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
function GetSchedule(currentMode) {
    var liCount = $("#orderList li").length + 1;
    var newRow = "";
    if (currentMode === EDIT_MODE.EDIT) {
        newRow = "<li>";
        newRow = newRow + "<table class=\"detal-table\">";
        newRow = newRow + "<thead>";
        newRow = newRow + "<tr>";
        newRow = newRow + "<th width=\"30px\"></th>";
        newRow = newRow + "<th width=\"30px\">順</th>";
        newRow = newRow + "<th width=\"120px\">受注NO</th>";
        newRow = newRow + "<th colspan=\"4\">品名</th>";
        newRow = newRow + "</tr>";
        newRow = newRow + "</thead>";
        newRow = newRow + "<tbody>";
        newRow = newRow + "<tr>";
        newRow = newRow + "<td><input type=\"checkbox\" /></td>";
        newRow = newRow + "<td><input type=\"number\" value=\"" + liCount+ "\" /></td>";
        newRow = newRow + "<td><input type=\"text\"  /></td>";
        newRow = newRow + "<td colspan=\"4\"></td>";
        newRow = newRow + "</tr>";
        newRow = newRow + "</tbody>";
        newRow = newRow + "<thead>";
        newRow = newRow + "<tr>";
        newRow = newRow + "<th colspan=\"3\">得意先</th>";
        newRow = newRow + "<th>作業区分</th>";
        newRow = newRow + "<th>色数</th>";
        newRow = newRow + "<th>方向</th>";
        newRow = newRow + "<th>原反規格</th>";
        newRow = newRow + "</tr>";
        newRow = newRow + "</thead>";
        newRow = newRow + "<tbody>";
        newRow = newRow + "<tr>";
        newRow = newRow + "<td colspan=\"3\"></td>";
        newRow = newRow + "<td></td>";
        newRow = newRow + "<td></td>";
        newRow = newRow + "<td></td>";
        newRow = newRow + "<td></td>";
        newRow = newRow + "</tr>";
        newRow = newRow + "</tbody>";
        newRow = newRow + "</table><br />";
        newRow = newRow + "</li>";
    } else {
        newRow = "<li>";
        newRow = newRow + "<table class=\"detal-table\">";
        newRow = newRow + "<thead>";
        newRow = newRow  + "<tr>";
        newRow = newRow + "<th width=\"30px\"></th>";
        newRow = newRow + "<th width=\"30px\">順</th>";
        newRow = newRow  + "<th width=\"120px\">受注NO</th>";
        newRow = newRow  + "<th colspan=\"4\">品名</th>";
        newRow = newRow  + "</tr>";
        newRow = newRow  + "</thead>";
        newRow = newRow  + "<tbody>";
        newRow = newRow  + "<tr>";
        newRow = newRow  + "<td><input type=\"checkbox\" /></td>";
        newRow = newRow + "<td><input type=\"number\" readonly  value=\"" + liCount + "\" /></td>";
        newRow = newRow  + "<td><input type=\"text\" readonly value=\"17-02-7012-00\" /></td>";
        newRow = newRow  + "<td colspan=\"4\">CPSーギンガ20GN</td>";
        newRow = newRow  + "</tr>";
        newRow = newRow  + "</tbody>";
        newRow = newRow  + "<thead>";
        newRow = newRow  + "<tr>";
        newRow = newRow  + "<th colspan=\"3\">得意先</th>";
        newRow = newRow  + "<th>作業区分</th>";
        newRow = newRow  + "<th>色数</th>";
        newRow = newRow  + "<th>方向</th>";
        newRow = newRow  + "<th>原反規格</th>";
        newRow = newRow  + "</tr>";
        newRow = newRow  + "</thead>";
        newRow = newRow  + "<tbody>";
        newRow = newRow  + "<tr>";
        newRow = newRow  + "<td colspan=\"3\">中央化学</td>";
        newRow = newRow  + "<td>建材</td>";
        newRow = newRow  + "<td></td>";
        newRow = newRow  + "<td>他(一定)</td>";
        newRow = newRow  + "<td>20μ×1040</td>";
        newRow = newRow  + "</tr>";
        newRow = newRow  + "</tbody>";
        newRow = newRow + "</table><br />";
        newRow = newRow  + "</li>";
    }

    $(newRow).appendTo("#orderList").enhanceWithin();
}

//編集モード設定
function SetEditMode() {

    $("#divDisplay").hide();

    //alert($("#orderList input[type=\"number\"]"));

    $("#orderList input[type=\"number\"]").each(function (index, elem) {
        elem.removeAttribute("readonly");
    });

    $("#orderList input[type=\"text\"]").each(function (index, elem) {
        elem.removeAttribute("readonly");
    });

    $("#divEdit").show();
}

//表示モード設定
function SetDisplayMode() {

    $("#divEdit").hide();

    $("#orderList input[type=\"number\"]").each(function (index, elem) {
        $(elem).attr("readonly",true);
    });

    $("#orderList input[type=\"text\"]").each(function (index, elem) {
        $(elem).attr("readonly",true);
    });

    $("#divDisplay").show();
}


//行削除
function DeleteSchedule() {
    $('#orderList input:checkbox:checked').each(function (index, element) {
        $(element).parents("li").remove();
    });
}

function LoadStaffConfig() {
    $("#selectCaptain").val(staff[1]).select().selectmenu('refresh');
    $("#selectOperator1").val(staff[2]).select().selectmenu('refresh');
}

function AddStaff() {

    var staffSelectBoxName = "selectOperator" + staffCount;
    var staffOperatorName = "Operator" + staffCount;

    var newStaffConfig = "<li>";
    newStaffConfig = newStaffConfig + "<label style=\"font-weight:bold\">機員" + staffCount + "</label>";
    newStaffConfig = newStaffConfig+"<div class=\"ui-grid-b\">";
    newStaffConfig = newStaffConfig+"<div class=\"ui-block-a\"><select id=\""+ staffSelectBoxName+"\"></select></div>";
    newStaffConfig = newStaffConfig+"<div class=\"ui-block-b\"><input type=\"checkbox\" id=\"checkOperator" + staffCount + "Rest\" /><label for=\"checkOperator" + staffCount +"Rest\">休暇</label></div>";
    newStaffConfig = newStaffConfig+"<div class=\"ui-block-c\"><input type=\"checkbox\" id=\"checkOperator" + staffCount + "HalfRest\" /><label for=\"checkOperator" + staffCount + "HalfRest\">半休</label></div>";
    newStaffConfig = newStaffConfig + "</div>";

    newStaffConfig = newStaffConfig + "<table><tr><td>勤務時間</td><td>：</td><td>"
    newStaffConfig = newStaffConfig + "<input type= \"time\" id= \"clockOutTimeStart_" + staffOperatorName+"\"/></td>"
    newStaffConfig = newStaffConfig + "<td>～</td>"
    newStaffConfig = newStaffConfig + "<td><input type=\"time\" id=\"clockOutTimeEnd_" + staffOperatorName+"\"/></td></tr></table>"
    newStaffConfig = newStaffConfig + "</li>";

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

function AddPressConditions() {
    var liCount = $("#pressConditionsList li").length + 1;
    var newRow = "";

    newRow = "<li>";
    newRow = newRow + "<h3>ユニット <span>" + liCount+"</span></h3>";
    newRow = newRow + "<table class=\"detal-table\">";
    newRow = newRow + "<thead>";
    newRow = newRow + "<tr>";
    newRow = newRow + "<th>色</th>";
    newRow = newRow + "<th colspan=\"2\">インキ名</th>";
    newRow = newRow + "</tr>";
    newRow = newRow + "</thead>";
    newRow = newRow + "<tbody>";
    newRow = newRow + "<tr>";
    newRow = newRow + "<td><input type=\"text\" id=\"txtProductColor\"/></td>";
    newRow = newRow + "<td colspan=\"2\"><input type=\"text\" id=\"txtProductInkName\"/></td>";
    newRow = newRow + "</tr>";
    newRow = newRow + "</tbody>";
    newRow = newRow + "<thead>";
    newRow = newRow + "<tr>";
    newRow = newRow + "<th>粘度(秒)</th>";
    newRow = newRow + "<th>乾燥温度(℃)</th>";
    newRow = newRow + "<th>印圧(Kgf)</th>";
    newRow = newRow + "</tr>";
    newRow = newRow + "</thead>";
    newRow = newRow + "<tbody>";
    newRow = newRow + "<tr>";
    newRow = newRow + "<td><input type=\"number\" /></td>";
    newRow = newRow + "<td><input type=\"number\" /></td>";
    newRow = newRow + "<td><input type=\"number\" /></td>";
    newRow = newRow + "</tr>";
    newRow = newRow + "</tbody>";
    newRow = newRow + "</table>";
    newRow = newRow + "</li>";

    $(newRow).appendTo("#pressConditionsList").enhanceWithin();
}

function SetCheckWorkEditable() {
    if ($("#HasCheck").val() === "0") {
        if (!$("#CheckInfoArea").hasClass("ui-state-disabled")) {
            $("#CheckInfoArea").addClass("ui-state-disabled");
        };

    } else {
        
        if ($("#CheckInfoArea").hasClass("ui-state-disabled")) {
            $("#CheckInfoArea").removeClass("ui-state-disabled");
        };
    }
}

function SetAppendMeterailsEditable() {
    if ($("#HasAppendMeterails").val() === "0") {
        if (!$("#detailAppendMeterailsArea").hasClass("ui-state-disabled")) {
            $("#detailAppendMeterailsArea").addClass("ui-state-disabled");
        };

    } else {
        if ($("#detailAppendMeterailsArea").hasClass("ui-state-disabled")) {
            $("#detailAppendMeterailsArea").removeClass("ui-state-disabled");
        };
    }
}