using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using jr.Source;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

public partial class Bas_MobileConfigEdit : System.Web.UI.Page
{
    string MaterialSpecies = "";
    string hasDepot = "";
    public string ccgc = "";
    public string guid = "";
    public string cszd = "";
    protected void Page_Load(object sender, EventArgs e)
    {

        FillTableInput("");
    }



    protected void FillTableInput(string name)
    {

        SqlParameter[] arParms = new SqlParameter[3];
        arParms[0] = new SqlParameter("@guid", SqlDbType.VarChar, 32);
        arParms[0].Value = "17966DCFABE5470B9051FFF441511C9F";
        arParms[1] = new SqlParameter("@usercode", SqlDbType.VarChar, 10);
        arParms[1].Value = CommonApplication.GetUserCode();
        arParms[2] = new SqlParameter("@propName", SqlDbType.VarChar, 255);
        arParms[2].Value = name;
        TableInput1.FillTable("bp_sys_getPageConfigParam", arParms);
       //TableInput1.FillTableByHeaderString("项目◆");
        //设置列控件类型        
        TableInput1.ColumnControlType = "1,1,1,1,3,1,1,1,1";//列中控件类型字符串组合(1-输入框,2-时间框,3-下拉框),中间以逗号分隔
        ////绑定下拉框数据源        
        string sql1 = "select Code,Name from xc_Code where flag='MobileParam' and Valid='Y'";
        TableInput1.FillSelectBySql(sql1);//重量单位下拉框数据源
        //设置列读写类型        
        TableInput1.ColumnPropertys = "0,0,1,1,1,1,1,1,1";// 列读写属性字符串组合(0-只读,1-读写),中间以逗号分隔
        TableInput1.ColumnHiddens = "1,0,0,0,0,0,0,0，0";
        TableInput1.ColumnValidations = "0,0,0,13,0,0,0,0,0"; // 验证方式
        //设置列掩藏类型
        //设置列默认值        
        TableInput1.ColumnDefaultValues = "◆我◆是◆5◆车◆王◆";//列默认值字符串组合(空-无默认值,其它-默认值),中间以◆分隔
        //复制列
        TableInput1.ColumnCopys = "0,1,1,0,0,0,0,0,0,0,0,0,0";
        //设置合计列        
        TableInput1.ColumnSummaryString = "总订单数量◇3";//列合计字符串(显示合计名称1◇第几列◆显示合计名称2◇第几列),中间以◆分隔
        //设置计算列        

        TableInput1.ColumnComputeFormulaString = "2,{5}={2}+{3}◆3,{5}={2}+{3}";
        //TableInput1.ColumnComputeFormulaString = "7,{8}=Math.round({7}/" + xs + ")◆7,{9}=Math.round({7}/" + xs + "/" + ps + ")◆7,{10}=Math.ceil({7}/" + xs + "/" + ps + "/" + juanshu + ")◆7,{11}=({7}/" + xs + "/" + ps + "/" + juanshu + ")";
        //设置复选
        //2◇../public/ChoosePlanProduct.aspx◇2,-1,5,6◆5◇../public/ChoosePlanProduct.aspx◇2,5,6
        //打开选择窗口的列 ◇ 连接窗口的地址 ◇ 返回值填充列(2[第0个返回值填充第2列],-1[第1个返回值不填充任何列],5[第2个返回值填充第5列],6[[第3个返回值填充第6列]])
        //TableInput1.ColumnChooseString = "3◇../../public/ChoosePlanProduct.aspx◇3,6,7,-1,-1,-1,-1";
        //设置列宽度
        //在TableInput1外面套一个父元素DIV,指定宽度,如果不指定,宽度默认为页面宽度,TableInput1的父元素width要大于TableInput1的宽度，否则会被压缩
        TableInput1.ColumnWidths = "50px,80px,130px,80px,60px,60px,70px,70px,70px,50px,70px,70px,70px";


    }
    
}
