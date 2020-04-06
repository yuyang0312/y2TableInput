<%@ Control Language="C#" CodeFile="TableInput.ascx.cs" Inherits="jr.Public.TableInput" %>

<script language="javascript" type="text/javascript">
    /*
    *====================================================================================================================
    */
    //定义全局的表格行列值
    var tableWidth=140;//表格宽度
    var col = 5;
    var row = 2;
    row = <%=GetRowsCount()%>;
    col= <%=GetColsCount()%>;
    //currrowindex 选定行
    var currRowIndex = 0;
    //isFirstRowChoose第一次选中行变成编辑状态,否则变成非编辑状态
    var isRowFirstChoose=true;
    //表单域数组(这部分作废)-----------------
    var elementNames = new Array(col);
    var k = 0;
    for(k=0;k<col;k++)
        elementNames[k] = k;
    //---------------------------------------
    //标题头数组
    var headersString="<%=GetHeaders()%>";
    var headers = new Array(col);
    for(k=0;k<col;k++)
    {
        headers[k] = "第" + (k+1) + "列";
    }
    if(headersString!="")
        headers=headersString.split("◆");
    //----------------------------------------
    //columnWidths : 装载要创建的列长度()
    var colWidthString="<%=GetColWidths()%>";
    var isSetWidth=0;//是否设置长度(0-不设置取默认值100px,1-设置)
    var colWidths = new Array(col)
    for(k=0;k<col;k++)
        colWidths[k] = "100px";
    if(colWidthString!="")
    {
        colWidths=colWidthString.split(",");
        isSetWidth=1;
    }
    //alert("isset:"+isSetWidth+";array:"+colWidths);
    //----------------------------------------
    //装载要创建的列中控件类型数组(1-输入框,2-时间框,3-下拉框,4-复选框)
    var colControlTypeString="<%=GetColControlType()%>";
    var colControlType =new Array(col)
    for(k=0;k<col;k++)
        colControlType[k]="1";
    if(colControlTypeString!="")
        colControlType=colControlTypeString.split(",");
    //----------------------------------------
    //下拉框数据源
    var SelectIndex = 0;  //下拉框,每行生成下拉框的索引
    var CheckBoxIndex=0   //生成复选框索引
    var selectSourseString="<%=GetselectSourseString()%>";
    console.log(selectSourseString);
    var selectSourse =new Array(col)
    for(k=0;k<col;k++)
        selectSourse[k]=" , ;";
    if(selectSourseString!="")
    {
        selectSourse=selectSourseString.split("◆");
        for(k=selectSourse.length-1;k<col;k++)
            selectSourse[k]=" , ;";
    }
    //console.log(selectSourse);
    //----------------------------------------
    //复选框
    var checkboxSourseString="<%=GetcheckboxSourseString()%>";
    
//var checkboxSourseString="1,1;12,12;◆1,1;12,12;13,13;14,14;◆1,1;12,12;◆1,1;12,12;◆1,1;12,12;◆1,1;12,12;◆1,1;12,12;◆1,1;12,12;◆3,3";
var checkboxSourse =new Array(col)
for(k=0;k<col;k++)
    checkboxSourse[k]=" , ;";
if(checkboxSourse!="")
{
    checkboxSourse=checkboxSourseString.split("◆");
    for(k=checkboxSourse.length-1;k<col;k++)
        checkboxSourse[k]=" , ;";
}
// alert(checkboxSourse[0]);


//----------------------------------------
//columnpropertys : 装载要创建的列读写属性(0-只读,1-读写)
var colPropertyString="<%=GetColPropertys()%>";
var colPropertys = new Array(col)
for(k=0;k<col;k++)
    colPropertys[k] = 1;
colPropertys[0] = 0;
if(colPropertyString!="")
    colPropertys=colPropertyString.split(",");
//----------------------------------------
//columnHiddens : 装载要创建的列掩藏属性(0-不掩藏,1-掩藏)
var colHiddensString="<%=GetColHiddens()%>";
var colHiddens = new Array(col)
for(k=0;k<col;k++)
    colHiddens[k] = 0;
//colHiddens[0] = 0;
if(colHiddensString!="")
    colHiddens=colHiddensString.split(",");
//----------------------------------------
//columnValidations : 装载要创建的列验证属性(0-不验证,1-不空,2-整数,3-实数,12-不空且整数,13-不空且实数)
var colValidationString="<%=GetColValidations()%>";
    var colValidations = new Array(col)
    for(k=0;k<col;k++)
        colValidations[k] = 0;
    colValidations[4] = 12;
    colValidations[5] = 13;
    if(colValidationString!="")
        colValidations=colValidationString.split(",");
    //----------------------------------------
    //coldefaultvalues : 代表每次增加行的时候需要装入的默认值
    var colDefaultValuesString="<%=GetColDefaultValues()%>";
var colDefaultValues = new Array(col);
for(k=0;k<col;k++)
{
    colDefaultValues[k] = "";
    //if(k%2==0)
    //colDefaultValues[k] = "";
    //else
    //colDefaultValues[k] = "j"; //代表这个不是默认值
}
if(colDefaultValuesString!="")
    colDefaultValues=colDefaultValuesString.split("◆");

//----------------------------------------
//columnCopys : 装载要创建的列复制(复制同列上一行输入值)属性(0-不复制,1-复制)
var colCopysString="<%=GetColCopys()%>";
var columnCopys = new Array(col)
for(k=0;k<col;k++)
    columnCopys[k] = 0;
//columnCopys[1] = 1;
//columnCopys[5] = 1;
if(colCopysString!="")
    columnCopys=colCopysString.split(",");

//----------------------------------------
//columnCodes : 装载要创建的列自动编码(列上一行输入值加1)属性(0-不自动编码,1-自动编码)
var colCodesString="<%=GetColCodes()%>";
var columnCodes = new Array(col)
for(k=0;k<col;k++)
    columnCodes[k] = 0;
if(colCodesString!="")
    columnCodes=colCodesString.split(",");
//----------------------------------------
//columnTabIndexs : 装载要创建的列[Tab]键
var colTabIndexsString="<%=GetColTabIndexs()%>";
var colTabIndexs = new Array(col)
for(k=0;k<col;k++)
    colTabIndexs[k] = 0;
if(colTabIndexsString!="")
    colTabIndexs=colTabIndexsString.split(",");
    
//----------------------------------------
//colSummary : 装载要创建的创建列合计属性(0-不合计,1-合计)
//var colSummaryString="合计2,2◆提单合计,5◆外销发票合计,6";
var colSummaryString="<%=GetColSummaryString()%>";
var isSummary=0;//是否合计(0-不合计,1－合计,增加合计行)
var colSummaryNum=0;
var colSummary = new Array(col);
var colSummaryName = new Array(col);
for(k=0;k<col;k++)
{
    colSummary[k] =0;
    colSummaryName[k] ="";
}
if(colSummaryString!="")
{
    var tmpstr1=colSummaryString.split("◆"); 
    colSummaryNum=tmpstr1.length;
    for(var i=0;i<tmpstr1.length;i++)
    {
        var tmpstr2= tmpstr1[i].split("◇");   
        var colSummaryIndex=tmpstr2[1]-1;   
        colSummary[colSummaryIndex]=1;
        colSummaryName[colSummaryIndex]=tmpstr2[0];
    }
    isSummary=1;
}
//----------------------------------------
//colChoose : 装载要创建列打开选择窗口属性(0-不选择,1-选择)
//var colChooseString="2#../public/ChoosePlanProduct.aspx#2,-1,5,6◆5#../public/ChooseFactory.aspx#2,5,6";//打开选择窗口的列 # 连接窗口的地址 # 返回值填充列(2[第0个返回值填充第2列],-1[第1个返回值不填充任何列],5[第2个返回值填充第5列],6[[第3个返回值填充第6列]])
var colChooseString="<%=GetColChooseString()%>";

var ccolChooseNum=0;
var colChoose = new Array(col);
var colChooseURL = new Array(col);
var colChooseFill= new Array(col);
for(k=0;k<col;k++)
{
    colChoose[k] =0;
    colChooseURL[k] ="";
    colChooseFill[k] ="";
}
if(colChooseString!="")
{
    var tmpstr1=colChooseString.split("◆"); 
    ccolChooseNum=tmpstr1.length;
    for(var i=0;i<tmpstr1.length;i++)
    {
        var tmpstr2= tmpstr1[i].split("◇");   
        var colChooseIndex=tmpstr2[0]-1; 
        if(colChooseIndex>=0 && colChooseIndex<col)
        { 
            colChoose[colChooseIndex]=1;
            colChooseURL[colChooseIndex]=tmpstr2[1];
            colChooseFill[colChooseIndex]=tmpstr2[2];
        }
    }
}
//Ajax 刷新数据
var colAjaxString="<%=GetColAjaxString()%>";
var colAjaxJson=eval(colAjaxString)||"";
var SourceArr=[];
var sqlArr=[];
var TargetArr=[];
for(var aj=0;aj<colAjaxJson.length;aj++){
    SourceArr.push(colAjaxJson[aj]["Source"]);
    sqlArr.push(colAjaxJson[aj]["sql"]);
    TargetArr.push(colAjaxJson[aj]["Target"]);
}
//明细
var colDetailString="<%=GetColDetailString()%>";
var colOperationString="<%=GetColOperationString()%>";


    //----------------------------------------
    //colCompute : 装载要创建列计算(数量*单价=金额)属性(0-不计算,1-计算)
    //var colComputeString="5,6,7";//
    var colComputeString="<%=GetColComputeString()%>";
    var colCompute = new Array(col);
    var colComputeGroup = new Array(col);
    for(k=0;k<col;k++)
    {
        colCompute[k] =0;
        colComputeGroup[k] ="";
    }
    if(colComputeString!="")
    {
        var tmpstr1=colComputeString.split("◆");  
        for(var i=0;i<tmpstr1.length;i++)
        {
            var tmpstr2= tmpstr1[i].split(",");
            var type="0"; 
            for(var j=0;j<tmpstr2.length;j++)
            {
                var colindex=tmpstr2[j];        
                //检查列索引是否存在或越界
                if(colindex<0 || colindex>col)
                {
                    type="1";
                    break;
                }
            }
            if(type=="1")
                break;  
            var qualityColIndex=tmpstr2[0]-1;
            var priceColIndex= tmpstr2[1]-1;
            var moneyColIndex= tmpstr2[2]-1;
            colCompute[qualityColIndex]=1;
            colCompute[priceColIndex]=1;
            colCompute[moneyColIndex]=2;
            colComputeGroup[qualityColIndex]=tmpstr2;
            colComputeGroup[priceColIndex]=tmpstr2; 
            colComputeGroup[moneyColIndex]=tmpstr2;         
        }  
    }
    //----------------------------------------
    //colComputeFormula : 装载要创建列计算(动态公式)属性(0-不计算,1-计算)
    var colComputeFormulaString="<%=GetColComputeFormulaString()%>";
var colComputeFormula = new Array(col);
var colComputeFormulaIndex;
var colComputeFormulaText;
for(k=0;k<col;k++)
{
    colComputeFormula[k] =0;
}
if(colComputeFormulaString!="")
{
    var tmpstr1=colComputeFormulaString.split("◆");
    colComputeFormulaIndex=new  Array(tmpstr1.length); 
    colComputeFormulaText=new  Array(tmpstr1.length); 
    for(var i=0;i<tmpstr1.length;i++)
    {
        var tmpstr2= tmpstr1[i].split(",");
        colComputeFormulaIndex[i]=tmpstr2[0];
        colComputeFormulaText[i]=tmpstr2[1];
        for(k=0;k<col;k++)
        {
            if(k==tmpstr2[0]-1)
            {
                colComputeFormula[k] =1;
            }
        }           
    }  
}
//----------------------------------------
//colSelectIndexString : 当前选中行的指定列的ID，默认指定序号列的ID
var colSelectIndexString="<%=GetColSelectIdString()%>";
    var colSelectIdIndex=0;
    if(colSelectIndexString!="")
    {
        if(!isNaN(parseInt(colSelectIndexString)))
            colSelectIdIndex=parseInt(colSelectIndexString);
        else
            colSelectIdIndex=0;    
    } 
    if(colSelectIdIndex<0 || colSelectIdIndex>col)
    {
        colSelectIdIndex=0;
    }

    //----------------------------------------
    //dataarray : 需要修改的数据集,修改之前预先装入,供用户参考
    var dataString="<%=GetData()%>";
var dataArray = new Array(row*col);
var m=0,n=0;
for(m=0;m<row;m++)
{
    for(n=0;n<col;n++)
    {
        dataArray[m*col + n] ="array(" + m + "," + n + ")";  //注意这里代表2维数组
    }
}
if(dataString!="")
    dataArray=dataString.split("◆");
/* 
*====================================================================================================================
*/
//var oPopup = window.createPopup();
//创建一个公共的可编辑的表格
//参数：  
//   formName : 表单名
//   action : 代表当前要执行的提交动作 : 1:add 2:del 3:modefy 4:query
//   formAction : 表格对应Form的Action
//   tableId ：表格ID
//   colNum：表单列数目
//   rowNum：初始表格的行数目
function CreateTable(formName,action,formAction,tableId,colNum,rowNum)
{ 
    var startStr = new String("");
    var endStr = new String("");
    var colStr = new String("");
    //startStr = "<form name=\"" + formName + "\" method=post action=\"" + formAction + "\">"; 
    //startStr = "<form name=\"" + formName + "\"  target=\"_self\" method=post action=\"" + formAction + "\">"; 
    

    colStr = createTrs(colNum,rowNum);
    startStr += "<table id=\"" + tableId +"\" border=\"1\" cellspacing=\"0\" style=\"width:"+tableWidth+"px\" cellpadding=\"0\">";
    endStr = "</table>";
    //创建用来获取最后表格输出数据的隐藏域

    var hiddens = CreateHiddens(colNum,action);
    endStr += hiddens;

    var summarysTable = CreateSummarysTable(colNum,tableWidth);
    endStr += summarysTable;
    var summarys = CreateSummarys(colNum);
    endStr += summarys;

    //endStr += "</form>";
    //输出表格
    //document.forms(0).elements("t").value = (startStr + colStr + endStr);
    document.write(startStr + colStr + endStr);

    ChangeInputAllTR(tableId);

    if(dataString=="")
    {
        //InsertRow('tableId');
        //document.getElementById ("btnAddRow").onclick ;    
        var AddButton="<%=GetAddButtonClientId()%>";
        if(document.all(AddButton)!=null)
        {  
            //document.all(AddButton).click() ;
            InsertRow('tableId');
        }    
    }
    SummaryShow(tableId);

}
//----------------------------------------
//创建用来获取最后表格输出数据的隐藏域
function CreateHiddens(cols,action)
{
    var str = new String("");
    var i=0;
    for(i=0;i<cols;i++)
    {
        str +="<input type=\"hidden\" name=\"col" + (i+1) + "\" id=\"col" + (i+1) + "\" >";
    }
    str+="<input type=hidden name=\"action\" value=\"" + action + "\">";

    str+="<input type=hidden name=\"selectId\" id=\"selectId\" >";
    return str;
}
//----------------------------------------
//创建用来获取最后表格输出数据的统计域
function CreateSummarysTable(cols,tableWidth)
{
    var str = new String("");
    var i=0;
    if(isSummary==1)
    {
        str +="<table id=\"SummaryTable\"  border=\"1\" cellspacing=\"0\" cellpadding=\"0\" style=\"table-layout:fixed;width:"+tableWidth+"px\" >";
        str +="<tr>";
        str += "<td align=center class=\"NoTD\">"
        str += "合计";
        str += "</td>";
        for(i=1;i<=cols;i++)
        {
            str += "<td align=left class=\"CaptionTD\"";
  
            //  if(isSetWidth== 0)
            //  {
            //    colStr += " class=\"CaptionTD\" ";
            //  }
            str +=" style =\""
            //设置长度
            if(isSetWidth== 1)
            {
                str +=" width :"+colWidths[i-1]+";";    
            }
            //控制控件的掩藏属性
            if(colHiddens[i-1] == 1)
            {      
                //colStr += " style =\"display :none ;\" ";
                str += " display :none ; ";
            } 
  
            str +=" \""   
            str += ">"; 
  
            if(colSummary[i-1]==1)
            {
                str +="<span  id=\"spanSummary" + i + "\" style=\"width:95%;text-align:left;\" ></span>";     
            }
  
            str += "</td>";
  
        }
        //str +="</tr>";
        str+="<td style=\"width:100px\"></td>";
        str +="</table>";
    }
    return str;
}

function CreateSummarys(cols)
{
    var str = new String("");
    var i=0;
    for(i=0;i<cols;i++)
    {
        if(colSummary[i]==1)
        {
            //str +="<span  id=\"colspanSummary" + (i+1) + "\" class=\"spanstyle\"></span>";
            str +="<input type=\"hidden\" id=\"Summary"+(i+1)+"\" name=\"Summary" + (i+1) + "\" >";
        }
    }
    return str;
}
//----------------------------------------
//创建表格行列
function createTrs(colNum,rowNum)
{
    var colStr = new String("");
    var i = 0;
    var j = 0;
    //colStr += "<tr bgColor='#6CADD9'>"
    colStr += "<tr class=\"headerTR\">"
    //创建表头行
    //colStr += "<td onClick=orderTb1(this,1); onMouseOver=\"showTip('单击对本列排序');\" onMouseOut=\"hideTip();\"><center>"
    //colStr += "序号";
    //colStr += "</center></td>";
    colStr += "<td align=center class=\"NoTD\">"
    colStr += "序号";
    colStr += "</td>";
    for(i=1;i<=colNum;i++)
    {
        //colStr += "<td align=center onClick=orderTb1(this,1); onMouseOver=\"showTip('单击对本列排序');\" onMouseOut=\"hideTip();\" >";
        //colStr += "<td align=center>";
  
        colStr += "<td align=center class=\"CaptionTD\"";
  
        //  if(isSetWidth== 0)
        //  {
        //    colStr += " class=\"CaptionTD\" ";
        //  }
        colStr +=" style =\""
        //设置长度
        if(isSetWidth== 1)
        {
            colStr +=" width :"+colWidths[i-1]+";";    
        }
        //控制控件的掩藏属性
        if(colHiddens[i-1] == 1)
        {      
            //colStr += " style =\"display :none ;\" ";
            colStr += " display :none ; ";
        } else{
            tableWidth+= parseFloat(colWidths[i-1]);
        }
  
        colStr +=" \""   
        colStr += ">";
  
        colStr += headers[i-1];
        colStr += "</td>";
    }
    colStr += "<td align=center style=\"width:100px\" class=\"NoTD\">"
    colStr += "操作";
    colStr += "</td>"; 
    //创建表体行
    for(i=0;i<rowNum;i++)
    {
        colStr += "<tr ";  
        //colStr += "onDblClick=\"TR_dblClick(this);\" ";  //表格行中的事件支持部分
        //colStr += "onBlur=\"ResetTR(this);\" >";
        colStr += " onBlur=\"ResetTR(this);\" ";
        if(i%2==0)
            colStr +="class=\"TIItemStyle\" ";
        else
            colStr +="class=\"TIAlternatingItemStyle\" ";
        colStr +=">";
        //创建每行的所有单元格
        //colStr += "<td  onClick=SelectRow(this); bgColor='#E6E6E6' style =\"width:60px ;\">";
        colStr += "<td  onClick=SelectRow(this); class=\"NoTD\"  >";
        colStr += i+1;
        colStr +="</td>";

        for(j=1;j<=colNum;j++)
        {
            //colStr += "<td onMouseOut=\"this.bgColor='#FFFFFF';\" onMouseOver=\"this.bgColor='#BFEDF9';\" >";
            //colStr += "<td onMouseOut=\"this.bgColor=this.parentElement.bgColor;\" onMouseOver=\"this.bgColor='#BFEDF9';\" onClick=\"SelectRow(this);\">";
   
            colStr += "<td onMouseOut=\"this.bgColor=this.parentElement.bgColor;\" onMouseOver=\"this.bgColor='#DFE8F6';\" onClick=\"SelectRow(this);\" ";   
            //控制控件的掩藏属性
            if(colHiddens[j-1] == 1)
            {      
                colStr += " style =\"display :none ;\" ";
            }    
            colStr +=" >";
    
            colStr += dataArray[i*colNum+j-1];
   
            colStr +="</td>";
   
        }
 
        colStr+="<td style=\"text-align:center\" class=\"Add_Del\">";
        
        (!colOperationString||colOperationString.charAt(0)=="1")&&(colStr+="<i title=\"添加\" onclick=\"InsertRow('tableId',this);\"  class=\"iconfont\">&#xe6e0;</i>");
            
        (!colOperationString||colOperationString.charAt(1)=="1")&&(colStr+="<i id=\"btnDelRow1\" title=\"删除\" onclick=\"DeleteOneRow('tableId',"+(i+1)+");\"  class =\"iconfont\"/>&#xe6f8;</i>");
        if((!colOperationString||colOperationString.charAt(2))=="1"&&colDetailString){
           
            colStr+="<i title=\"明细\" id=\"btnDelRow1\" onclick=\"ToTarget(this)\" class =\"iconfont\"/>&#xe70b;</i>";
        }
        colStr+="</td>";
        colStr +="</tr>";  
 
    }
    return colStr;
}
//----------------------------------------
//把某行转变为输入状态
function ChangeInput(objTR)
{
    var str = new String("");
    var i = 0;
    SelectIndex=0;
    CheckBoxIndex=0;
    //序号列
    //str = "<span style=\"width:100px;\" value=\"" + objTR.cells[0].innerText + "\" ></span>"  
    //objTR.cells[0].innerHTML = str;

    //数据列
    for(i=1;i<objTR.cells.length;i++)
    { 
        
        if(objTR.cells[i].className!="Add_Del"){
            if(colControlType[i-1]==4){
                str="";
                var temp1 = checkboxSourse[CheckBoxIndex++].split(";");
                
                //alert(checkboxSourse[SelectIndex]);
                temp1[0]&&temp1[0].split(",")[0]&&(str+="<input type=\"checkbox\" class=\"checkbox\"  style=\"width:auto; margin-top:0;\" id=\"ck"+objTR.rowIndex+"-"+SelectIndex+"\" name=\"ck"+objTR.rowIndex+"-"+SelectIndex+"\""+(objTR.cells[i].innerText.trim()!="0"?" checked=\"checked\"":"")+" ><label for=\"ck"+objTR.rowIndex+"-"+SelectIndex+"\" style=\" \">"+temp1[0].split(",")[0]+"</label>");
               
                
            }else if(colControlType[i-1]!="3")
            {
                //str = "<input type=text name=\"" + elementNames[i-1] + "\" style=\"width:" + objTR.cells[i].width + "\" "; 
                str = "<input type=\"text\"   name=\"" + elementNames[i-1] + "\" class=\"inputTex\" onkeydown=\"inputkeydown(null,this)\"" ;  
           
    
                //替换双引号
                var innertext= objTR.cells[i].innerText;        
                innertext=innertext.replace(/"/g,"&quot;"); 
                str += "value=\"" + innertext + "\"";  
                //str += "value=\"" + objTR.cells[i].innerText + "\"";    
    
                //控制控件的读写属性
                if(colPropertys[i-1] == 0)
                {
                    //str += " disabled ";
                    str += " readonly ";
                }
                //    //控制控件的掩藏属性
                //    if(colHiddens[i-1] == 1)
                //    {
                //      //str += " disabled ";
                //      str += " style =\"display :none ;\" ";
                //    }
                //控制控件的TabIndex
                if(colTabIndexs[i-1] != 0)
                {
                    var newtabindex=0;
                    if(isNaN(colTabIndexs[i-1])==false && trim(colTabIndexs[i-1])!="")
                    {   
                        if(parseInt(colTabIndexs[i-1])>0)
                        {
                            var rowindex=objTR.rowIndex;
                            newtabindex=parseInt(colTabIndexs[i-1])+(rowindex-1)*objTR.cells.length+100;   
                        }
                        else
                        {
                            newtabindex=parseInt(colTabIndexs[i-1]);
                        }      
                    }
                    if(newtabindex!=0)
                        str += " tabindex =\""+newtabindex+"\" ";
                }
    
                if(colControlType[i-1]=="2")
                {
                    str +=" onclick=\"setday(this)\" readonly ";
                }
    
                if(colChoose[i-1]==1)
                {      
                    //str +=" onclick=\"Choose(this,"+i+")\" ";
                    str +=" ondblclick=\"Choose(this,"+i+")\"  style=\"width:70%;\"";
                }for(var aj=0;aj<SourceArr.length;aj++){
                    if(SourceArr[aj]==i){
                        //alert(i);
                        str +=" onchange=\"getAjaxData(this,"+aj+")\" ";
                    
                    }
                }
    
                if(colValidations[i-1]==2||colValidations[i-1]==12)
                {  
                    //str +="OnChange=\"IsInteger();";
                    str +="onblur=\"IsInteger();";
                    if(colCompute[i-1]==1||colComputeFormula[i-1]==1)  
                        str +="ComputeCol(this,"+i+");";
                    if(colSummary[i-1]==1)  
                        str +="SummaryCol(this,"+i+");"; 
           
                    str +="\"";
                }
                else if(colValidations[i-1]==3||colValidations[i-1]==13) 
                { 
                    //str +="OnChange=\"isDouble();";
                    str +="onblur=\"isDouble();";
                    if(colCompute[i-1]==1||colComputeFormula[i-1]==1)  
                        str +="ComputeCol(this,"+i+");";
                    if(colSummary[i-1]==1)  
                        str +="SummaryCol(this,"+i+");"; 
                    str +="\"";
                }
                else
                {   
       
                    if(colCompute[i-1]==1||colComputeFormula[i-1]==1)  
                    {           
                        str +="OnChange=\"ComputeCol(this,"+i+");";
                        if(colSummary[i-1]==1)  
                            str +="SummaryCol(this,"+i+");";            
                        str +="\"";
                    }
                    else
                    {
                        if(colSummary[i-1]==1)  
                            str +="OnChange=\"SummaryCol(this,"+i+");\" "; 
                    }
                }  

                if(i==objTR.cells.length-2)
                {
                    if((objTR.parentElement.rows.length-1)==objTR.rowIndex)
                    {
                        str +="data-enter='1'";
                    }
                }
    
                //测试
                str += "/>";  
                if(colChoose[i-1]==1)
                { 
                    str +="<label style=\"display:inline-block;cursor:pointer;font-size:16px\" onclick=\"Choose(this,"+i+")\" class=\"iconfont\">&#XE684;</label>";
                }
            }
            else
            {
                //str ="<select >";
      
                str ="<select ";
                //控制控件的读写属性
                if(colPropertys[i-1] == 0)
                {        
                    str += " disabled ";
                }
                //控制控件的TabIndex
                if(colTabIndexs[i-1] != 0)
                {
                    var newtabindex=0;
                    if(isNaN(colTabIndexs[i-1])==false && trim(colTabIndexs[i-1])!="")
                    {   
                        if(parseInt(colTabIndexs[i-1])>0)
                        {
                            var rowindex=objTR.rowIndex;
                            newtabindex=parseInt(colTabIndexs[i-1])+(rowindex-1)*objTR.cells.length+100;   
                        }
                        else
                        {
                            newtabindex=parseInt(colTabIndexs[i-1]);
                        }      
                    }
                    if(newtabindex!=0)
                        str += " tabindex =\""+newtabindex+"\" ";
                }
                for(var aj=0;aj<SourceArr.length;aj++){
                    if(SourceArr[aj]==i){
                        //alert(i);
                        str +=" onchange=\"getAjaxData(this,"+aj+")\" ";
                    
                    }
                }
                str +=" >";
                
                var temp1 = selectSourse[SelectIndex].split(";");      
                for(j=0;j<temp1.length-1;j++)
                {
                    var temp2=temp1[j].split(",");
                    str +=" <option value=\""+ temp2[0]+"\"";
         
                    //alert("selectvalue:"+temp2[0]+"innertext"+objTR.cells[i].innerText);
                    if(temp2[0]==objTR.cells[i].innerText)
                        //str +=" selected=\"selected\""
                    {
                        //alert("selectvalue:"+temp2[0]+"innertext"+objTR.cells[i].innerText);
                        str +=" selected=\"selected\""
                    }
                    str +=" >";
                    str +=temp2[1]+"</option>";   
                }
                str +="</select>";      
                SelectIndex=SelectIndex+1;
            } 
            
            objTR.cells[i].innerHTML = str;  
        }
    }
    objTR.ondblclick=doNothing;  //使行保持原始状态
}
//----------------------------------------
//把行恢复为非输入状态

//keydown 事件
function inputkeydown(e,that){
    var event =e||window.event;
    var targettr=that.parentNode.parentNode;
    if(event.keyCode==40){
        
        if(!targettr.nextSibling){
            InsertRow('tableId',that);
        }
        var next=targettr.nextSibling;
        var input=next.getElementsByTagName("input");
        for(var i=0;i<input.length;i++){
            if(input[i].getAttribute("name")==that.getAttribute("name")){
                input[i].focus();
            }
        }
        
    }else if(event.keyCode==38){
        
        var per=targettr.previousSibling;
        var input=per.getElementsByTagName("input");
        for(var i=0;i<input.length;i++){
            if(input[i].getAttribute("name")==that.getAttribute("name")){
                input[i].focus();
            }
        }
    
    }if(that.getAttribute("data-enter")=='1'){
        enterAddRow();
    }
}
function ResetTR(objTR)
{
    var str = new String("");
    var i = 0;
    for(i=0;i<objTR.cells.length;i++)
    {
        var objChild;
        var tmpStr = "";
        tmpStr = objTR.cells[i].innerHTML;
        //里面包含控件
        if(objTR.cells[i].firstChild!=null && objTR.cells[i].firstChild.value!=undefined)
        {
            tmpStr = objTR.cells[i].firstChild.value;
            if(tmpStr=="")
                tmpStr = " "
            objTR.cells[i].innerHTML = tmpStr + " ";
            continue;
        }
  
        //里面不包含控件
        if(tmpStr==" " || tmpStr=="")
        {
            if(objTR.cells[i].innerHTML!="")
                tmpStr += objTR.cells[i].innerHTML;
            else
                tmpStr += " ";
        }
        objTR.cells[i].innerHTML = tmpStr;
        if(objTR.cells[i].innerhtml=="")
            objTR.cells[i].innerHTML=" ";
    }
}
//----------------------------------------
//对表格指定列进行排序
function orderTB(objTB,index,type){
    for(var i=1;i<(objTB.rows.length-1);i++){
        for(var j=i+1;j<objTB.rows.length;j++){
            var tmp1,tmp2;
   
            //if(objTB.rows[j].cells[index].firstChild.value==undefined)
            if(objTB.rows[j].cells[index].firstChild==null || objTB.rows[j].cells[index].firstChild.value==undefined)
                tmp1 = objTB.rows[j].cells[index].innerText;
            else
                tmp1 = objTB.rows[j].cells[index].firstChild.value;
   
            //if(objTB.rows[i].cells[index].firstChild.value==undefined)
            if(objTB.rows[i].cells[index].firstChild==null || objTB.rows[i].cells[index].firstChild.value==undefined)
                tmp2 = objTB.rows[i].cells[index].innerText;
            else
                tmp2 = objTB.rows[i].cells[index].firstChild.value;
            if(tmp1>tmp2)
            {
                objTB.moveRow(j,i);
            }
        }
    }
}
//----------------------------------------
function orderTb1(objTD,type)
{
    var objTR =objTD.parentElement;
    var objTable = objTR.parentElement;
    var colIndex = objTD.cellIndex;
    orderTB(objTable,colIndex); 
}
//----------------------------------------
//在表格末尾增加一行
function InsertRow(tableId,target)
{

    var objTable = document.getElementById(tableId);
    var col = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length);  //列数
    var row = objTable.rows.length;  // 行数
    var objRow=document.createElement("tr");

    if(target){
        var nowRow=target.parentNode.parentNode;
        
        if(nowRow.nextSibling){
            nowRow.parentNode.insertBefore(objRow,nowRow.nextSibling);
        }else{
            nowRow.parentNode.appendChild(objRow);
        }
        //console.log(nowRow.parentNode);
        //console.log(nowRow.nextSibling);
      
        //console.log(target);
    }else{
        var nowRow=objTable.lastChild.lastChild;
        currRowIndex=nowRow.firstChild.innerHTML;
        if(nowRow.nextSibling){
            nowRow.parentNode.insertBefore(objRow,nowRow.nextSibling);
        }else{
            nowRow.parentNode.appendChild(objRow);
        }
       

        
    }
    //var col = objTable.cells.length;


    //alert("row:"+row+"  col:"+col);
    //非空验证
    if(CheckNullTR(objTable.rows[currRowIndex])==false) 
    {
        var firstnullcol=FirstNullColIndex(objTable.rows[currRowIndex]);
        if(firstnullcol!=0)
        {        
            if(objTable.rows[currRowIndex].cells[firstnullcol].firstChild!=null)
                objTable.rows[currRowIndex].cells[firstnullcol].firstChild.focus();
            return false;
        }
    }
    ////数字验证
    //if(event.keyCode==13)
    //{
    //    return event.srcElement.onblur();
    //}
   
    //console.log(nowRow.parentNode);
    //console.log(nowRow.nextSibling);
    var i = 0;

    //取得最大序号
   
    
    if(row==1)
        max1=0;
    else max1=nowRow.firstChild.innerHTML;
    var objCell = objRow.insertCell();//插入列
    objRow.cells[0].innerText = parseFloat(max1)+1;  
    for(i=1;i<=col-1;i++)
    { 
        var objCell = objRow.insertCell();
        //objRow.cells[0].innerText = parseFloat(max1)+1;  
        objCell.innerHTML = "  ";  
        if(i==col-1){
            objCell.style.textAlign ="center";
            objCell.className="Add_Del";

            (!colOperationString||colOperationString.charAt(0)=="1")&&(colStr="<i onclick=\"InsertRow('tableId',this);\" title=\"添加\" class=\"iconfont\">&#xe6e0;</i>");
            (!colOperationString||colOperationString.charAt(1)=="1")&&(colStr+="<i  title=\"删除\" id=\"btnDelRow1\" onclick=\"DeleteOneRow('tableId',"+(row)+");\"  class =\"iconfont\"/>&#xe6f8;</i>");
            
            if((!colOperationString||colOperationString.charAt(2)=="1")&&colDetailString){
                colStr+="<i title=\"明细\" id=\"btnDelRow1\" onclick=\"ToTarget(this)\" class =\"iconfont\"/>&#xe70b;</i>";
            }
            objCell.innerHTML = colStr;  
        }
        //装入默认值
        if(colDefaultValues[i-1]!=""&&colDefaultValues[i-1]!=undefined)
            objCell.innerHTML=colDefaultValues[i-1];
    
        //列复制(复制同列上一行输入值)
        if(columnCopys[i-1] == 1)
        {      
            //alert("row:"+row+";i:"+i);
            if(row!=1 && nowRow.cells[i].firstChild!=null)
            {            
                var colup=nowRow.cells[i].firstChild.value;
                objCell.innerHTML=colup;
            }
        }
  
        //列自动编码(同列上一行输入值加1)
        if(columnCodes[i-1] == 1)
        {      
            //alert("row:"+row+";i:"+i);
            if(row!=1 &&nowRow.cells[i].firstChild!=null)
            {            
                var numup=nowRow.cells[i].firstChild.value;            
                var numnext;
                var newnum;
                newnum="10"+numup;
                //alert('isnan:'+isNaN(numup));            
                if(isNaN(newnum)==false && trim(newnum)!="")
                {   
                    if(numup.substring(0,1)=="0")                   //第一位是0的号码认定为固定长度的字符串
                    {
                        newnum=parseInt(newnum)+1;     
                        numnext=newnum.toString(); 
                        //alert(numnext);
                        numnext=numnext.substring(2,numnext.length);
                    }
                    else                                            //不是0的按整形往下编
                    {
                        numnext=parseInt(numup)+1; 
                    }
                }
                else
                {
                    numnext="";
                }
                objCell.innerHTML=numnext;
            }
        }
 
        //alert("colHiddens"+i+":"+colHiddens[i-1]); 
        //掩藏列  
        if(colHiddens[i-1] == 1)
        {  
            objCell.style.display = 'none';      
        }
        objCell.onmouseover = Td_MouseOver_Handle;
        objCell.onmouseout = Td_MouseOut_Handle;
        objCell.onclick=TD_Click_Handle;
        objRow.cells[0].onclick = TD_Click_Handle;
        objRow.cells[0].onmouseover = doNothing;
        objRow.cells[0].onmouseout = doNothing;
    
    }

    if((objRow.rowIndex-1)%2==0)
        objRow.className="TIItemStyle";
    else
        objRow.className="TIAlternatingItemStyle";

    //为新增的行提供事件绑定支持
    //objRow.attachEvent('ondblclick', dblClick_Handle);
    var objTD=objRow.cells[0];
    SelectRow(objTD);
    ChangeInput(objRow);
    objRow.ondblclick = dblClick_Handle;
    objRow.onblur = click_Handle;

    //解除上一行回车增加行事件绑定支持
    if(objRow.rowIndex-1>0)
    {
        if(objTable.rows[objRow.rowIndex-1].cells[col-1].firstChild!=null)
            objTable.rows[objRow.rowIndex-1].cells[col-1].firstChild.onkeydown=doNothing;
    }

    ////按添加按钮时设置焦点(如果是回车添加就不用设置焦点，回车会自动跳转到下一个焦点)
    if(event&&event.keyCode!=13)
    {
        for(i=1;i<=col-1;i++)
        {    
            if(colHiddens[i-1] != 1)
            {
                if(objTable.rows[currRowIndex].cells[i].firstChild!=null)
                {                
                    objTable.rows[currRowIndex].cells[i].firstChild.focus();//设置焦点后回车又转到下一个焦点去了             
                    break;
                }
            }
        }
    }

    //重新统计合计
    OrderNew(tableId,col);
    SummaryShow(tableId);
}
//----------------------------------------
//删除最后1行
function DeleteRow(tableId)
{
    var objTable = document.getElementById(tableId);
    var col = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length);
    var row = objTable.rows.length;
    if(objTable.rows.length==1)
    {
        alert("对不起，你不能删除表格头!!!");
        return;
    }
    if(confirm("确定删除?"))
    {
  
        objTable.deleteRow();  
        row = objTable.rows.length;
        currRowIndex = row-1;
        if(currRowIndex>0)
            SelectRow(objTable.rows[currRowIndex].cells[0]);
        //增加上一行回车增加行事件绑定支持
        if(row-1>0)
        {
            if(objTable.rows[row-1].cells[col-2].firstChild!=null)
                objTable.rows[row-1].cells[col-2].firstChild.onkeydown=enterAddRow;
        }
        SummaryShow(tableId);
    }
}

//----------------------------------------
//删除指定的行
function DeleteOneRow(tableId,rowIndex)
{
    var objTable = document.getElementById(tableId);
    var col = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length);
    var row = objTable.rows.length;
    if(objTable.rows.length==1 || rowIndex==0)
    {
        alert("对不起，你首先必须选择要删除的行！！！");
        return;
    }
    // alert(rowIndex);
    if(confirm("确定删除?"))
    {
        objTable.deleteRow(rowIndex);
        
        //删除最后一行后,增加上一行回车增加行事件绑定支持
        if(rowIndex==row-1)
        {
            row = objTable.rows.length;
            if(row-1>0)
            {
                if(objTable.rows[row-1].cells[col-2].firstChild!=null)
                    objTable.rows[row-1].cells[col-2].firstChild.onkeydown=enterAddRow;
            }
        }
        currRowIndex = 0;
        SummaryShow(tableId);
        OrderNew(tableId,col);
        currRowIndex = rowIndex-1;
    }
}

//----------------------------------------
//选定指定行
function SelectRow(objTD)
{
    
    var objTR =objTD.parentElement;
    var objTable = objTR.parentElement;
    if(objTable){
        if(currRowIndex!=objTR.rowIndex)
        {
            if(CheckNullTR(objTable.rows[currRowIndex])==false) 
            {
                var firstnullcol=FirstNullColIndex(objTable.rows[currRowIndex]);
                if(firstnullcol!=0)
                {        
                    if(objTable.rows[currRowIndex].cells[firstnullcol].firstChild!=null)
                        objTable.rows[currRowIndex].cells[firstnullcol].firstChild.focus();
                    return false;
                }
            }
        }
        //if(CheckNullTR(objTable.rows[currRowIndex])==false) 
        //return false;
    
        for(var i=1;i<objTable.rows.length;i++){
            //console.log(i);
            //console.log(objTable);
            objTable.rows[i].cells[0].className = "NoTD";
        }
        //objTable.rows[i].cells[0].bgColor = "#E6E6E6";

        objTR.cells[0].className="selectTD";
        //objTR.cells[0].bgColor="#BFEDF9";
        //objTD.bgColor="#BFEDF9";

        //获取当前选中行指定列的值
        if(objTR.cells[colSelectIdIndex].firstChild==null|| objTR.cells[colSelectIdIndex].firstChild.value==undefined)
        {      
    
            document.getElementById ("selectId").value = trim(objTR.cells[colSelectIdIndex].innerText); 
        }
        else
        {
    
            document.getElementById ("selectId").value =objTR.cells[colSelectIdIndex].firstChild.value;
        }               

        if(currRowIndex!=objTR.rowIndex)
        {
            isRowFirstChoose=true;
            //ResetTR(objTable.rows[currRowIndex]);
        }
        //ResetTRbyTD(objTD);

        currRowIndex = objTR.rowIndex;
    }
}
//----------------------------------------
//选定指定行变成非输入状态
function ResetTRbyTD(objTD)
{
    var objTR =objTD.parentElement;

    if(isRowFirstChoose==true)
    {
        ChangeInput(objTR);
        isRowFirstChoose=false;
    }
    else
    {
        ResetTR(objTR);
        isRowFirstChoose=true;
    }
}
//----------------------------------------
//所有行变成输入状态
function ChangeInputAllTR(tableId)
{  
    var objTable = document.getElementById(tableId);
    var row = objTable.rows.length;
    var objTR;  
    for(k=1;k<row;k++)
    {     
        objTR=objTable.rows[k];
        ChangeInput(objTable.rows[k]);
    }
}
//----------------------------------------
//统计行显示
function SummaryShow(tableId)
{  
    var objTable = document.getElementById(tableId); 
    var col = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length);  
    for(k=1;k<col;k++)
    {     
        if(colSummary[k-1]==1)
        {
            if(objTable.rows.length>1)
            {
                if(objTable.rows[1].cells[k].firstChild!=null)
                {
                    var firstchild=objTable.rows[1].cells[k].firstChild;
                    SummaryCol(firstchild,k);
                }
            }
            else
            {
                var total=0; 
                //document.getElementById("colspanSummary" + k).innerText=colSummaryName[k-1]+": "+total+" ;";
                document.getElementById("spanSummary" + k).innerText=total;
                document.getElementById("Summary" + k).innerText=total;
            }
        }
    }
}
//----------------------------------------
//行双击输入状态
function TR_dblClick(objTR)
{
    var objTD=objTR.cells[0];
    SelectRow(objTD);
    
}
//----------------------------------------
//删除指定的行
function DeleteOneRow(tableId,rowIndex)
{
    var objTable = document.getElementById(tableId);
    var col = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length);
    var row = objTable.rows.length;
    if(objTable.rows.length==1 || rowIndex==0)
    {
        alert("对不起，你首先必须选择要删除的行！！！");
        return;
    }
    // alert(rowIndex);
    if(confirm("确定删除?"))
    {
        objTable.deleteRow(rowIndex);
        
        //删除最后一行后,增加上一行回车增加行事件绑定支持
        if(rowIndex==row-1)
        {
            row = objTable.rows.length;
            if(row-1>0)
            {
                if(objTable.rows[row-1].cells[col-2].firstChild!=null)
                    objTable.rows[row-1].cells[col-2].firstChild.onkeydown=enterAddRow;
            }
        }
        currRowIndex = 0;
        SummaryShow(tableId);
        OrderNew(tableId,col);
        currRowIndex = rowIndex-1;
    }
}
//----------------------------------------
//删除指定的行后序号重新排列
function OrderNew(tableId,col)
{  
    var objTable = document.getElementById(tableId);
    var row = objTable.rows.length;
    if(row===1){
        InsertRow(tableId);
        
        
    }
    var objTR;  
    for(k=1;k<row;k++)
    {     
        objTR=objTable.rows[k];
        objTR.cells[0].innerText=k;
        objTR.style.textAlign="center";
        objTR.cells[col-1].className="Add_Del";
        (!colOperationString||colOperationString.charAt(0)=="1")&&(colStr="<i onclick=\"InsertRow('tableId',this);\" title=\"添加\" class=\"iconfont\">&#xe6e0;</i>");
        (!colOperationString||colOperationString.charAt(1)=="1")&&(colStr+="<i  title=\"删除\" id=\"btnDelRow1\" onclick=\"DeleteOneRow('tableId',"+(k)+");\"  class =\"iconfont\"/>&#xe6f8;</i>");
            
        if(colDetailString&&(!colOperationString||colOperationString.charAt(2)=="1")){
            colStr+="<i title=\"明细\" id=\"btnDelRow1\" onclick=\"ToTarget(this)\" class =\"iconfont\"/>&#xe70b;</i>";
        }
        objTR.cells[col-1].innerHTML= colStr;
        //objTR.cells[col-1].innerHTML="<button id=\"btnAddRow1\" onclick=\"InsertRow('tableId');\"  class =\"buttonInput\"/>添加行</button><button id=\"btnDelRow1\" onclick=\"DeleteOneRow('tableId',"+(k)+");\"  class =\"buttonInput\"/>删除行</button><button id=\"btnDelRow1\"   class =\"buttonInput\"/>明细</button>";
    }
}
var Ajax = {
    get: function (url, fn) {
        var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
        obj.open('GET', url, true);
        obj.onreadystatechange = function () {
            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
                fn.call(this, obj.responseText);  //从服务器获得数据
                //console.log(obj);
            }
        };
        obj.send();
    },
    post: function (url, data, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
        var obj = new XMLHttpRequest();
        obj.open("POST", url, true);
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // 添加http头，发送信息至服务器时内容编码类型
        obj.onreadystatechange = function () {
            if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
                fn.call(this, obj.responseText);
                //console.log(obj);

            }
        };
        obj.send(data);
    }
}
//----------------------------------------
//复选框选择
function Choose(firstchild,index)
{  
    var n_fc=firstchild;
    var objTD=firstchild.parentElement;         
    var objTR =objTD.parentElement;
    var objTable = objTR.parentElement;
    //var col = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length); 
    var row = objTable.rows.length; 
    //var colindex=objTD.cellIndex-1;//cellIndex是当前列在表中可见的索引,当包含掩藏列时,cellIndex就不是实际列的索引
    var colindex=index-1;  
    if(colChoose[colindex]==1)
    {
        var currentURL=colChooseURL[colindex];
        for(n=1;n<=col;n++)
        {		   
            var expression1="{"+n+"}";
            var expression2="";
            if(objTable.rows[objTR.rowIndex].cells[n].firstChild!=null)
            {              
                expression2=objTable.rows[objTR.rowIndex].cells[n].firstChild.value;
            } 		    		    
            currentURL=currentURL.replace(expression1,expression2);		    
        }
  
        var temp = window.showModalDialog(currentURL,"newwin", "dialogWidth=850px;dialogHeight=800px;center:1;status:0");    
        if(temp==null||temp.length<=0)
        {        
            return false;
        }
     
        var tmepnum=0;
        if(temp!=null)
            tmepnum=temp.length;
        var colfill=colChooseFill[colindex].split(",");
        var colfillnum=colfill.length;
        var min=colfillnum;
        if(colfillnum>tmepnum)
            min=tmepnum;
        //alert("返回列:"+tmepnum+"填充列:"+colfillnum+"最小值:"+min);
        for(var i=0;i<min;i++)
        {        
            if(colfill[i]!=-1)
            {           
                var currcell=colfill[i];
                //alert("行"+(objTR.rowIndex)+"列:"+currcell+"第"+i+"个返回值:"+temp[i]);
                if(objTable.rows[objTR.rowIndex].cells[currcell].firstChild!=null)
                {              
                    objTable.rows[objTR.rowIndex].cells[currcell].firstChild.value=temp[i];
               
                    if(ComputeCol[currcell-1]==1||colComputeFormula[currcell-1]==1)
                    {
                        var firstchild=objTable.rows[objTR.rowIndex].cells[currcell].firstChild;                     
                        ComputeCol(firstchild,currcell);
                    }              
                    if(colSummary[currcell-1]==1)
                    {
                        var firstchild=objTable.rows[objTR.rowIndex].cells[currcell].firstChild;                     
                        SummaryCol(firstchild,currcell);
                    }
                }   
            }
        }    
        TI_CallBack(objTD);
    }  
}

function TI_CallBack(){}
//异步获取数据
function getAjaxData(firstchild,col)
{  
    var objTD=firstchild.parentElement;         
    var objTR =objTD.parentElement;
    var objTable = objTR.parentElement;
    //var col = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length); 
    var Data="sql="+sqlArr[col].replace('$#@[]@#$',"'"+firstchild.value+"'")+"&num="+TargetArr[col].length;
    Ajax.post("Handler2.ashx",Data, function (data) {
        json = eval("(" + data + ")");
        //alert(data);
        for(var t=0;t<TargetArr[col].length;t++){
            objTable.rows[objTR.rowIndex].cells[TargetArr[col][t]].firstChild.value=json[t]||"";
        }
          
    })
}  


//----------------------------------------
//鼠标选择指定列
function  TD_Click_Handle()
{
    SelectRow(this)
}
//----------------------------------------
//鼠标移入事件支持
function Td_MouseOver_Handle()
{
    //this.bgColor = "#00ccff";
}
//----------------------------------------
//鼠标移出事件支持
function Td_MouseOut_Handle()
{
    //this.bgColor = "#ffffff";
}
//----------------------------------------
//鼠标双击事件支持
function dblClick_Handle()
{
    //ChangeInput(this);// 切换到输入状态
    this.ondblclick=doNothing;
}
//----------------------------------------
//鼠标单击事件支持
function click_Handle()
{
    //ResetTR(this);
}
//----------------------------------------
//保持行的原始状态
function doNothing()
{
    return;
}
//----------------------------------------
//回车新增行
function enterAddRow()
{   
    if(event.keyCode==13){
        InsertRow('tableId'); 
        //event.keyCode==9;       
    }
}
//----------------------------------------
//function showTip(msg)
//{
//    with (oPopup.document.body)
//    {
//        style.backgroundColor="lightyellow";
//        style.border="solid black 1px";
//        style.fontSize = 12;
//        innerHTML=msg;
//    }
//    oPopup.show(event.x, event.y, 95, 16, document.body);
//}
////----------------------------------------
//function hideTip()
//{
//    if(oPopup!=undefined)
//        oPopup.hide();
//}
//==============================格式化字符串函数(删除前后空格)========================================================
function trim(str)
{
    var tmpStr = new String(str);
    var startIndex = 0,endIndex = 0;
    for(var i=0;i<tmpStr.length;i++)
    {
        if(tmpStr.charAt(i)==" ")
        {
            continue;
        }
        else
        {
            startIndex = i;
            break;
        }
    }
    for(var i=tmpStr.length;i>=0;i--) //注意开始最大下标必须减1
    {
        if(tmpStr.charAt(i-1)==" ")
        {
   
            continue;
        }
        else
        {
            endIndex = i;
            break;
        }
    }
    tmpstr = tmpStr.substring(startIndex,endIndex);
    return tmpStr;
}
//==============================数据验证(整数/实数验证/空验证)========================================================
//验证输入是否是整数
function IsInteger(){
    var inputNum=trim(event.srcElement.value);
    var flag = true;
    if(inputNum=="")
    {
        flag = false;
        alert("输入不能为空,且必须为整数！");
        event.srcElement.value=0;
        event.srcElement.focus();
        return flag;            
    }
    if(inputNum.indexOf("-")==0 &&inputNum.length>1)
    {
        inputNum=inputNum.replace("-",""); 
    }
    for(var i=0;i<inputNum.length;i++) {
        if(isDigit(inputNum.substring(i,i+1))==false){
            flag = false;
            alert("输入必须为整数！");
            event.srcElement.value=0;
            event.srcElement.focus();
            break;
        }
    }
    return(flag);
}
//验证数字， 用于作位的验证
function isDigit(theNum) {
    var theMask = '0123456789';
    if(theMask.indexOf(theNum)==-1) {
        return false;
    } else {
        return true;
    }
}
//验证输入是否是实数 
function isDouble() {
    var theNum=event.srcElement.value;
    var regex1 =/^(-?\d+)(\.\d+)?$/;
    var regex2=/^(-?[0]\d+)(\.\d+)?$/;
    if((regex1.test(theNum)&&!regex2.test(theNum))==true){
        return true;
    }else{
        alert("输入必须为数字！");
        event.srcElement.value=0;
        event.srcElement.focus();
        return false;
    }  
}
//行空验证
function CheckNullTR(objTR) {       
    //var i = 0;
    //var existsnull=0;
    //var strColNullName="";
    //for(i=1;i<=col;i++)
    //{            
    //    var tmpStr = "";
    //    tmpStr = (objTR.cells[i]&&objTR.cells[i].innerHTML)||"";
    //    //里面包含控件
    //    if(objTR.cells[i].firstChild!=null && objTR.cells[i].firstChild.value!=undefined)
    //    {
    //        tmpStr =trim(objTR.cells[i].firstChild.value);   
    //        if(tmpStr!="")       
    //            continue;
    //    }              
    //        //里面不包含控件
    //    else
    //    {
    //        tmpStr =trim(objTR.cells[i].innerHTML);
    //    }            
    //    if(tmpStr=="")
    //    {
    //        if(colValidations[i-1]==1 || colValidations[i-1]==12 || colValidations[i-1]==13)
    //        {
    //            strColNullName+=headers[i-1]+",";
    //            existsnull=1;  
    //        }   
    //    }                 
    //}
    //if(existsnull==1)
    //{
    //    strColNullName=strColNullName.substring(0,strColNullName.length-1);
    //    alert("第"+objTR.cells[0].innerHTML+"条记录："+strColNullName+"不能为空，请输入！");
    //    return false;
    //}
    return true;
}
//=====================================行中第一个为空的列索引=================================================
//行中第一个为空的列索引
function FirstNullColIndex(objTR) {       
    var colindex=0;
    var i = 0;        
    for(i=1;i<=col;i++)
    {            
        if(colValidations[i-1]==1 || colValidations[i-1]==12 ||colValidations[i-1]==13)
        { 
            var tmpStr = "";
            tmpStr = objTR.cells[i].innerHTML;
            //里面包含控件
            if(objTR.cells[i].firstChild!=null && objTR.cells[i].firstChild.value!=undefined)
            {
                tmpStr =trim(objTR.cells[i].firstChild.value);   
                if(tmpStr!="")       
                    continue;
            }              
                //里面不包含控件
            else
            {
                tmpStr =trim(objTR.cells[i].innerHTML);
            }            
            if(tmpStr=="")
            {
                colindex=i;
                return colindex;
            } 
        }                
    }
        
    return colindex;
}
//=====================================列合计=================================================
//列合计
function SummaryCol(firstchild,index) { 
    var objTD=firstchild.parentElement;          
    var objTR =objTD.parentElement;
    var objTable = objTR.parentElement;
    //var colindex=objTD.cellIndex;
    var colindex=index;
    var row = objTable.rows.length;
    var total=0;       
    if(colSummary[colindex-1]==1)
    {
        for(i=1;i<row;i++)
        {
            if(objTable.rows[i].cells[colindex].firstChild==null || objTable.rows[i].cells[colindex].firstChild.value==undefined)
            {
                continue;
            }
            else
            {               
                var num=trim(objTable.rows[i].cells[colindex].firstChild.value);
                if(trim(num)=="" || parseFloat(num)==NaN)
                {
                    continue;
                }
                else
                {
                    if(!isNaN(num))
                    {                   
                        if(isNaN(parseFloat(num))==false)//多个空格
                            total +=parseFloat(num); 
                    }
                }                       
            }         
        }
        total =total.toFixed(2);
        //alert(colSummaryName[colindex-1]+";"+total);          
        //document.getElementById("colspanSummary" + colindex).innerText=colSummaryName[colindex-1]+": "+total+" ;";
        document.getElementById("spanSummary" + colindex).innerText=total;
        document.getElementById ("Summary" + colindex).value=total;
    }      
}
//=====================================列计算=================================================
function ComputeCol(firstchild,index) { 
    if(colComputeFormula[index-1]==1)
    {    
        ComputeFormulaCol(firstchild,index);
    }
    else
    {
        ComputeMultiplyCol(firstchild,index);
    }   
}
//列计算(金额=数量*单价)
function ComputeMultiplyCol(firstchild,index) { 
    var objTD=firstchild.parentElement;          
    var objTR =objTD.parentElement;
    var objTable = objTR.parentElement;
    //var colindex=objTD.cellIndex;
    var colindex=index-1;        
    if(colCompute[colindex]==1)
    {          
        //var allcols=colComputeGroup[colindex].split(",");   
        var allcols=colComputeGroup[colindex];
        var qualitycol=allcols[0];
        var pricecol=allcols[1];
        var moneycol=allcols[2];
        var quality=0;
        var price=0;
        var money=0;
        if(objTable.rows[objTR.rowIndex].cells[qualitycol].firstChild!=null)
        {              
            quality=objTable.rows[objTR.rowIndex].cells[qualitycol].firstChild.value;
            if(quality=="" || isNaN(quality))
                quality=0;              
        }
        if(objTable.rows[objTR.rowIndex].cells[pricecol].firstChild!=null)
        {              
            price=objTable.rows[objTR.rowIndex].cells[pricecol].firstChild.value;
            if(price=="" || isNaN(price))
                price=0;
        } 
        money=parseFloat(quality)*parseFloat(price);  
        var number='<%=colEffectiveNumber%>';
        money =money.toFixed(parseInt(number)||2);      
        if(objTable.rows[objTR.rowIndex].cells[moneycol].firstChild!=null)
        {    
            objTable.rows[objTR.rowIndex].cells[moneycol].firstChild.focus();
            objTable.rows[objTR.rowIndex].cells[moneycol].firstChild.value=money;
            objTable.rows[objTR.rowIndex].cells[moneycol].firstChild.select();//原先是resultcol ？？
            if(colSummary[moneycol-1]==1)
            {
                var firstchild=objTable.rows[objTR.rowIndex].cells[moneycol].firstChild;                     
                SummaryCol(firstchild,moneycol);
            }    
            
            
        }          
          
        //alert(qualitycol+";"+pricecol+";"+moneycol+";"+quality+";"+price+";"+money+";");
    }            
}
//列计算(动态公式)
function ComputeFormulaCol(firstchild,index) { 
    var objTD=firstchild.parentElement;          
    var objTR =objTD.parentElement;
    var objTable = objTR.parentElement;
    var colindex=index-1;        
    if(colComputeFormula[colindex]==1)
    {    
        for(k=0;k<colComputeFormulaIndex.length;k++)
        {
            if(colComputeFormulaIndex[k]==colindex+1)
            {
                var FormulaText=colComputeFormulaText[k]+";"
                for(n=1;n<=col;n++)
                {		   
                    var expression1="{"+n+"}";
                    var expression2;
                    var index1=FormulaText.indexOf("=");
                    var index2=FormulaText.indexOf(expression1);
                    var index3=FormulaText.lastIndexOf(expression1);
                    var resultcol;
                    if(objTable.rows[objTR.rowIndex].cells[n].firstChild!=null)
                    {              
                        expression2=objTable.rows[objTR.rowIndex].cells[n].firstChild.value; 
                        if(expression2==""){
                            expression2="0";
                        }
                        if(isNaN(expression2))
                        {      
                            if(colValidations[n-1]=="2"||colValidations[n-1]=="3"||colValidations[n-1]=="12"||colValidations[n-1]=="13")
                                expression2="0"; 
                            else
                                expression2="\""+expression2+"\"";  
                        }
              
                        var objInput=objTable.rows[objTR.rowIndex].cells[n].firstChild;
                    }                     
                    if(index2<index1&&index2!=-1)
                    {
                        resultcol=n;
                        FormulaText=FormulaText.replace(expression1,"");
                    }
                    if(index2>index1||index3>index1)
                    {
                        expression1=expression1.replace("{","\\{").replace("}","\\}");
                        var reg = new RegExp(expression1,"g");		    
                        FormulaText=FormulaText.replace(reg,expression2);
                    }                                       
                }                   
                FormulaText=FormulaText.replace("=","");	
                var result=eval(FormulaText);
                if(!isNaN(result))
                {                        
                    if(isNaN(parseFloat(result))==false)
                    {
                        var re = /^[1-9]+[0-9]*]*$/; //判断是否为整数，如果不为整数为实数则保留2位
                        if (!re.test(result)) 
                        {
                            result =result.toFixed(2);
                        }
                    }
                    if(!isFinite(result))
                    {
                        result =0;
                    }
                }
                else
                {
                    if(colValidations[resultcol-1]=="2"||colValidations[resultcol-1]=="3"||colValidations[resultcol-1]=="12"||colValidations[resultcol-1]=="13")
                        result=0;
                }               
                if(resultcol!=null)
                {
                    objTable.rows[objTR.rowIndex].cells[resultcol].firstChild.focus();
                    objTable.rows[objTR.rowIndex].cells[resultcol].firstChild.value=result;
                    objTable.rows[objTR.rowIndex].cells[resultcol].firstChild.select();
                    if(colSummary[resultcol-1]==1)
                    {
                        var firstchild=objTable.rows[objTR.rowIndex].cells[resultcol].firstChild;                     
                        SummaryCol(firstchild,resultcol);
                    }
                    
                   
                }   
            }
        }                                
    }            
}
//====================================================================================================================
//submit 方法
//function getData(tableId,form)
function getData(tableId)
{
    var objTable = document.getElementById(tableId);
    var cols = objTable.rows[0].cells.length  ||(objTable.cells.length/objTable.rows.length)-1;
    var rows = objTable.rows.length-1;

    //当前行空验证
    if(CheckNullTR(objTable.rows[currRowIndex])==false) 
    {
        var firstnullcol=FirstNullColIndex(objTable.rows[currRowIndex]);
        if(firstnullcol!=0)
        {        
            if(objTable.rows[currRowIndex].cells[firstnullcol].firstChild!=null)
                objTable.rows[currRowIndex].cells[firstnullcol].firstChild.focus();
            return false;
        }
    }

    //为每个隐藏域设置值
    var i=0,j=0;
    for(i=1;i<cols-1;i++)
    {
        // alert(i);
        document.getElementById ("col" + i)&&(document.getElementById ("col" + i).value="");
        for(j=1;j<=rows;j++)
        {   
            if(objTable.rows[j].cells[i].firstChild==null || objTable.rows[j].cells[i].firstChild.value==undefined)
            {
                document.getElementById ("col" + i).value += trim(objTable.rows[j].cells[i].innerText);
                //alert(objTable.rows[j].cells[i].innerText);
                //document.forms(form).elements("col" + i).value += trim(objTable.rows[j].cells[i].innerText);
            }else if(objTable.rows[j].cells[i].firstChild.className=="checkbox"){
                document.getElementById ("col" + i).value +=objTable.rows[j].cells[i].firstChild.checked?1:0;
            }
            else
            {
                document.getElementById ("col" + i).value +=trim(objTable.rows[j].cells[i].firstChild.value);
                
            }
            //document.forms(form).elements("col" + i).value += trim(objTable.rows[j].cells[i].firstChild.value);
   
            document.getElementById ("col" + i).value += "◇";
            //document.forms(form).elements("col" + i).value +=  "#";
        }
    }

    var allRecord="<%=GetAllRecordsClientId()%>";
    var rowcount="<%=GetRowCountClientId()%>";
    document.all(rowcount).value =rows;
    //alert(document.all(rowcount).value);
    //alert(allRecord);
    document.all(allRecord).value="";
    //document.getElementById ("allRecords").value="";//此取ID方法不可行，因为allRecords有层次结构，hid_allRecords的ID是动态变化的，hid_allRecords在用户控件里，它的ID变成TableInput_hid_allRecords
    //如果使用用户控件的页面有母版页的话，它的ID是动态变化的
    for(j=1;j<=rows;j++)
    { 
        for(i=1;i<cols;i++)
        {

            //document.getElementById ("allRecords").value +=document.getElementById ("col" + i).value+"◆";
            if(document.getElementById ("col" + i)){
               
                var str=document.getElementById ("col" + i).value;
                var temp=str.split("◇"); 
                document.all(allRecord).value += temp[j-1]+"◇";
            }
        }
  
        if(document.all(allRecord).value.length>0)
        {
            document.all(allRecord).value=document.all(allRecord).value.substring(0,document.all(allRecord).value.length-1);
        }
        document.all(allRecord).value +="◆";
    }
    //alert(document.all(allRecord).value);

    //document.forms(form).submit();
}

function ToTarget(i){
    var colDetailStringArr,argumentsArr;
    var url="";
    if(colDetailString){
        colDetailStringArr=colDetailString.split('◇');
        colDetailStringArr[1]&&(argumentsArr=colDetailStringArr[1].split(","));
        url+=colDetailStringArr[0]+"?";
        for(var t=0;t<argumentsArr.length;t++){
            var arguments=argumentsArr[t].split('=');
            arguments[0]&&(url+=arguments[0]+"=");
            var value=Number(arguments[1]);
            arguments[1]&&(url+=i.parentElement.parentElement.cells(value).firstChild.value+"&");
        }
    }
    window.open(url,"_blank");
    //alert(i.parentElement.parentElement.cells(cellnum).firstChild.value);
    
}
//====================================================================================================================
</script>

<div class="tableinputdiv" style="text-align: center;">
    <center>
<table id="table1" border="0" style="border :0px solid #fff;" >
    <tr>
        <td style="height :30px;display:none;" >
            <input id="btnAddRow" type="button" onclick="InsertRow('tableId',this);" value="添加行" style ="display :none ;" runat="server" class ="buttonInput"/>
            <input id="btnDelLastRow" type="button" onclick="DeleteRow('tableId');" style ="display :none ;" value="删除末行" runat="server" class ="buttonInput"/>
            <input type="button" onclick="getData('tableId','specForm');" value="提交" style ="display :none ;" class ="buttonInput"/>
            <input id="btnDelRow" type="button" onclick="DeleteOneRow('tableId',currRowIndex)" style ="display :none ;" value="删除行" runat="server" class ="buttonInput"/>
            <input type="button" onclick="orderTB(document.getElementById('tableId'),3);" value="指定列排序" style ="display :none ;" class ="buttonInput"/>
        </td>
    </tr>
</table>
<input id="hid_allRecords" runat="server" type="text" style ="display :none ;" />
<input id="hid_allCols" runat="server" type="text" style ="display :none ;" />
<input id="hid_rowCount" runat="server" type="text"  style ="display :none ;"/>
<input id="hid_colCount" runat="server" type="text"  style ="display :none ;"/>
<script language="javascript1.2" type ="text/javascript">
    CreateTable('specForm','1','','tableId',col,row);
</script>
<script  type ="text/javascript" language="javascript"   event="onkeydown"   for="document">   
    if(event.keyCode==13   &&   event.srcElement.type!='button'   &&   event.srcElement.type!='submit'   &&   event.srcElement.type!='reset'   &&   event.srcElement.type!=''   &&   event.srcElement.type!='textarea')     
    {event.keyCode=9;}   
</script>
         <script>
             (function (r, v, f) {
                 function w(a, b, g) { a.addEventListener ? a.addEventListener(b, g, !1) : a.attachEvent("on" + b, g) } function A(a) { if ("keypress" == a.type) { var b = String.fromCharCode(a.which); a.shiftKey || (b = b.toLowerCase()); return b } return p[a.which] ? p[a.which] : t[a.which] ? t[a.which] : String.fromCharCode(a.which).toLowerCase() } function F(a) { var b = []; a.shiftKey && b.push("shift"); a.altKey && b.push("alt"); a.ctrlKey && b.push("ctrl"); a.metaKey && b.push("meta"); return b } function x(a) {
                     return "shift" == a || "ctrl" == a || "alt" == a ||
              "meta" == a
                 } function B(a, b) { var g, c, d, f = []; g = a; "+" === g ? g = ["+"] : (g = g.replace(/\+{2}/g, "+plus"), g = g.split("+")); for (d = 0; d < g.length; ++d) c = g[d], C[c] && (c = C[c]), b && "keypress" != b && D[c] && (c = D[c], f.push("shift")), x(c) && f.push(c); g = c; d = b; if (!d) { if (!n) { n = {}; for (var q in p) 95 < q && 112 > q || p.hasOwnProperty(q) && (n[p[q]] = q) } d = n[g] ? "keydown" : "keypress" } "keypress" == d && f.length && (d = "keydown"); return { key: c, modifiers: f, action: d } } function E(a, b) { return null === a || a === v ? !1 : a === b ? !0 : E(a.parentNode, b) } function c(a) {
                     function b(a) {
                         a =
                         a || {}; var b = !1, l; for (l in n) a[l] ? b = !0 : n[l] = 0; b || (y = !1)
                     } function g(a, b, u, e, c, g) { var l, m, k = [], f = u.type; if (!h._callbacks[a]) return []; "keyup" == f && x(a) && (b = [a]); for (l = 0; l < h._callbacks[a].length; ++l) if (m = h._callbacks[a][l], (e || !m.seq || n[m.seq] == m.level) && f == m.action) { var d; (d = "keypress" == f && !u.metaKey && !u.ctrlKey) || (d = m.modifiers, d = b.sort().join(",") === d.sort().join(",")); d && (d = e && m.seq == e && m.level == g, (!e && m.combo == c || d) && h._callbacks[a].splice(l, 1), k.push(m)) } return k } function f(a, b, c, e) {
                         h.stopCallback(b,
                         b.target || b.srcElement, c, e) || !1 !== a(b, c) || (b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0)
                     } function d(a) { "number" !== typeof a.which && (a.which = a.keyCode); var b = A(a); b && ("keyup" == a.type && z === b ? z = !1 : h.handleKey(b, F(a), a)) } function p(a, c, u, e) {
                         function l(c) { return function () { y = c; ++n[a]; clearTimeout(r); r = setTimeout(b, 1E3) } } function g(c) { f(u, c, a); "keyup" !== e && (z = A(c)); setTimeout(b, 10) } for (var d = n[a] = 0; d < c.length; ++d) {
                             var m = d + 1 === c.length ? g : l(e ||
                             B(c[d + 1]).action); q(c[d], m, e, a, d)
                         }
                     } function q(a, b, c, e, d) { h._directMap[a + ":" + c] = b; a = a.replace(/\s+/g, " "); var f = a.split(" "); 1 < f.length ? p(a, f, b, c) : (c = B(a, c), h._callbacks[c.key] = h._callbacks[c.key] || [], g(c.key, c.modifiers, { type: c.action }, e, a, d), h._callbacks[c.key][e ? "unshift" : "push"]({ callback: b, modifiers: c.modifiers, action: c.action, seq: e, level: d, combo: a })) } var h = this; a = a || v; if (!(h instanceof c)) return new c(a); h.target = a; h._callbacks = {}; h._directMap = {}; var n = {}, r, z = !1, t = !1, y = !1; h._handleKey = function (a,
                     c, d) { var e = g(a, c, d), k; c = {}; var h = 0, l = !1; for (k = 0; k < e.length; ++k) e[k].seq && (h = Math.max(h, e[k].level)); for (k = 0; k < e.length; ++k) e[k].seq ? e[k].level == h && (l = !0, c[e[k].seq] = 1, f(e[k].callback, d, e[k].combo, e[k].seq)) : l || f(e[k].callback, d, e[k].combo); e = "keypress" == d.type && t; d.type != y || x(a) || e || b(c); t = l && "keydown" == d.type }; h._bindMultiple = function (a, b, c) { for (var d = 0; d < a.length; ++d) q(a[d], b, c) }; w(a, "keypress", d); w(a, "keydown", d); w(a, "keyup", d)
                 } if (r) {
                     var p = {
                         8: "backspace", 9: "tab", 13: "enter", 16: "shift", 17: "ctrl",
                         18: "alt", 20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 38: "up", 39: "right", 40: "down", 45: "ins", 46: "del", 91: "meta", 93: "meta", 224: "meta"
                     }, t = { 106: "*", 107: "+", 109: "-", 110: ".", 111: "/", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'" }, D = { "~": "`", "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/", "|": "\\" }, C = {
                         option: "alt", command: "meta", "return": "enter",
                         escape: "esc", plus: "+", mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
                     }, n; for (f = 1; 20 > f; ++f) p[111 + f] = "f" + f; for (f = 0; 9 >= f; ++f) p[f + 96] = f.toString(); c.prototype.bind = function (a, b, c) { a = a instanceof Array ? a : [a]; this._bindMultiple.call(this, a, b, c); return this }; c.prototype.unbind = function (a, b) { return this.bind.call(this, a, function () { }, b) }; c.prototype.trigger = function (a, b) { if (this._directMap[a + ":" + b]) this._directMap[a + ":" + b]({}, a); return this }; c.prototype.reset = function () {
                         this._callbacks = {};
                         this._directMap = {}; return this
                     }; c.prototype.stopCallback = function (a, b) { return -1 < (" " + b.className + " ").indexOf(" mousetrap ") || E(b, this.target) ? !1 : "INPUT" == b.tagName || "SELECT" == b.tagName || "TEXTAREA" == b.tagName || b.isContentEditable }; c.prototype.handleKey = function () { return this._handleKey.apply(this, arguments) }; c.addKeycodes = function (a) { for (var b in a) a.hasOwnProperty(b) && (p[b] = a[b]); n = null }; c.init = function () {
                         var a = c(v), b; for (b in a) "_" !== b.charAt(0) && (c[b] = function (b) {
                             return function () {
                                 return a[b].apply(a,
                                 arguments)
                             }
                         }(b))
                     }; c.init(); r.Mousetrap = c; "undefined" !== typeof module && module.exports && (module.exports = c); "function" === typeof define && define.amd && define(function () { return c })
                 }
             })("undefined" !== typeof window ? window : null, "undefined" !== typeof window ? document : null);

    </script>
    <script>
        var body=document.getElementsByTagName("body")[0];
        Mousetrap(body).bind('ctrl+down', function () {InsertRow('tableId'); });
     
        Mousetrap(body).bind('ctrl+up',function(){DeleteRow('tableId');});
        //var table=document.getElementById('tableId');
        //var tr=table.getElementsByTagName('tr');
        
        //for(var i=0;i<tr.length;i++){
        //    (function(i){
        //        //alert(i);
        //        Mousetrap(tr[i]).bind('ctrl+q',function(){DeleteOneRow('tableId',tr[i].firstChild.innerHTML);});
        //    })(i);
        //}
        //Mousetrap(body).bind('ctrl+s',function(){confirm("确定asd保存?")});
    </script>

        </center>
</div>

