<%@ Control Language="C#" CodeFile="y2TableInput.ascx.cs" Inherits="jr.Public.y2TableInput" %>

<link rel="stylesheet" href="../../Script/y2js/y2TableInput.css" />
<script src="../../Script/y2js/y2TableInput.js"></script>
<script src="../../Script/plugins/jquery-1.10.2.min.js"></script>
<link href="../../Script/plugins/select2/select2.css" rel="stylesheet" />
<script src="../../Script/plugins/select2/select2.js"></script>
<div id="rq"></div>
<input type="hidden" id ="hid_allRecords" runat="server"/>
<input type="hidden" id ="hid_jsonRecords" runat="server"/>
<script>
    var y2data = <%=GetData()%>; // 数据 
    var hidden = "<%=GetColHiddens()%>"; // 隐藏列
    var colControlType = "<%=GetColControlType()%>" // 类型
    var defaultValues = "<%=GetColDefaultValues()%>";  // 默认值
    var selectString = <%=GetselectSourseString() %>; // 下拉选择
    var colPropertys = "<%=GetColPropertys()%>"; // 读写属性
    var colCopys = "<%=GetColCopys()%>";// 复制列
    var colSummaryString =  "<%=GetColSummaryString()%>"; //合计列
    var colValidations = "<%=GetColValidations()%>"; //验证规则 0-不验证,1-不空,2-整数,3-实数,12-不空且整数,13-不空且实数
    var colComputeFormulaString = "<%=GetColComputeFormulaString()%>"; //"2,{4}={2}+{3}◆3,{4}={2}+{3}"
    var colChooseString = "<%=GetColChooseString()%>";
    var colWidths = "<%=GetColWidths()%>";
    // 处理以前的版本参数
    function forwardCompatible() {
        hidden = hidden.split(",");
        if (defaultValues) defaultValues = defaultValues.split('◆');  else defaultValues = [];
        if (colPropertys) colPropertys = colPropertys.split(",");
        if (colCopys) colCopys = colCopys.split(",");
        if (colSummaryString) colSummaryString = colSummaryString.split('◆');
        if (colControlType) colControlType = colControlType.split(",");
        if (colValidations) colValidations = colValidations.split(",");
        if (colComputeFormulaString) colComputeFormulaString = colComputeFormulaString.split("◆");
        if (colChooseString) colChooseString = colChooseString.split("◆");
        if (colWidths) colWidths = colWidths.split(",");
        var field = [];
        if (y2data.length > 0) {
            var index = 0 , selectIndex = 0;
            for (var key in y2data[0]) {     
                var obj = { text: key, field: key };
                field.push(obj);
            }

            for (var i = 0; i < field.length; i++) {    
                var obj = field[i];
                if (hidden) {
                    obj["hidden"] = hidden[i] == "1" ? true : false;
                }                
                if (colControlType) {
                    switch (colControlType[i]) {
                        case "1":
                            obj["cType"] = "input";
                            break;
                        case "2":
                            obj["cType"] = "date";
                            break;
                        case "3":
                            obj["cType"] = "select";
                            obj["bindData"] = selectString[selectIndex++];
                            break;
                        default:
                            obj["cType"] = "input";
                            break;
                    }
                }
                if (defaultValues) {
                    obj["defValue"] = defaultValues[i];
                }
                if (colPropertys) {
                    obj["readOnly"] = colPropertys[i] === "0";
                }
                if (colCopys) {
                    obj["copy"] = colCopys[i];
                }
                if (colWidths) {
                    obj["width"] = colWidths[i];
                }
                if (colValidations) {
                    var validationType = "any";
                    if (colValidations[i] == "2" || colValidations[i] == "12") {
                        validationType = "int";
                    }
                    if (colValidations[i] == "3" || colValidations[i] == "13") {
                        validationType = "numeric";
                    }
                    obj["validation"] = {
                        allowEmpty: (colValidations[i] == "0" || colValidations[i] == "2" || colValidations[i] == "3"),
                        type: validationType
                    }
                }
                if (colSummaryString) {
                     hasSum = true;
                    for (var j = 0; j < colSummaryString.length; j++) {
                        if (colSummaryString[j].split('◇')[1] == i) {
                            obj["isSum"] = true;
                        }
                    }
                }
                if (colChooseString) {
                    for (var j = 0; j < colChooseString.length; j++) {
                        var colChooseArray = colChooseString[j].split("◇");
                        if (i == colChooseArray[0]) {
                            field[i]["cType"] = "choosePage";
                            field[i]["chooseConfig"] = {
                                path: colChooseArray[1],
                                reString:colChooseArray[2]
                            }
                        }
                    }
                }
                if (colComputeFormulaString) {
                    for (var j = 0; j < colComputeFormulaString.length; j++) {
                        if (colComputeFormulaString[j].split(",")[0] == i) {
                            var compute = colComputeFormulaString[j].split(",")[1];
                            obj["event"] = {
                                change: function (target, data) {
                                    var tr = target;
                                    while (tr && tr.nodeName.toLowerCase() !== "tr") {
                                        tr = tr.parentNode;
                                    }
                                    var tds = tr.getElementsByTagName("td");
                                    var computeArray = compute.split("=");
                                    var newData = [];
                                    for (var k = 0; k < field.length; k++) {
                                        if (data.hasOwnProperty(field[k]["field"])) {
                                            newData[k] = data[field[k]["field"]];
                                        }
                                    }
                                    var left = computeArray[0].replace("{", "").replace("}", "");
                                    left = field[left]["field"];
                                    var right = replaceMyData(computeArray[1], newData); 
                                    try { data[left] = eval(right); } catch (e) { }
                                    return data;
                                }
                            }
                        }
                    }
                }
            }
        }
        return field;
       
    }

    function replaceMyData(key,data){
    !data&&(data={});
    if(key && key.match){
        if(key.match(/\{(.*)\}/gi)){
            var array = key.match(/\{(.*?)\}/gi);
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                key = key.replace(item,data[item.replace(/\{(.*?)\}/,'$1')] === 0 ? 0 : (data[item.replace(/\{(.*?)\}/,'$1')] || 0))
            }
        }
    }   
    return key || "";
    }
    
    var y2field = forwardCompatible();
    var rq = document.getElementById('rq');
    var config = {
        field:y2field,
        data: y2data,
        hasSum:hasSum
    }
    var m1 = y2TIFactory(config);
    function getData() {
        if (m1.validateAll()) {
            var value = m1.getData();
            var json = m1.getData('json');
            document.getElementById("<%=hid_allRecords.ClientID  %>").value = value;
            document.getElementById("<%=hid_jsonRecords.ClientID  %>").value = json;
            return value;
        } else {
            return false;
        }
    }
    rq.appendChild(m1.node);
</script>

