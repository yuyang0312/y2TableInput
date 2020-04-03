namespace jr.Public
{

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
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json;
    using Microsoft.ApplicationBlocks.Data;
	using System.Data.SqlClient;
	using jr.Source;

	[Serializable] 
	public partial class y2TableInput : System.Web.UI.UserControl
	{
		private SqlParameter[] parParms;		//SQL参数
		/// <summary>
		/// 执行
		/// </summary>
		private CommandType _cmdType = CommandType.StoredProcedure;
		private string sProcedureName="";//存贮过程名称
		private SqlParameter[] selectParms;		//下拉框SQL参数
		private string sSelectProcedureName;//下拉框存贮过程名称
		private string sSelectSql;//下拉框SQL语句
		private string sCheckboxSql;//复选框sql
		public int rowcount = 0;//行数
		public int colcount = 0;//列数
		public string headersString = "";//列名字符串组合
		public string dataString = ""; //每行每列的值字符串组合
		public string colControlType = "";//列中控件类型字符串组合(1-输入框,2-时间框,3-下拉框),中间以逗号分隔
		public string colPropertys = "";//列读写属性字符串组合(0-只读,1-读写),中间以逗号分隔
		public string colValidations = "";//列验证属性字符串组合(0-不验证,1-不空,2-整数,3-实数,12-不空且整数,13-不空且实数),中间以逗号分隔
		public string colEffectiveNumber = "";//有效数字
		public string colDefaultValues = "";//列默认值字符串组合(□-无默认值,其它-默认值),中间以◆分隔
		public string colSummaryString = "";//列合计字符串(显示合计名称1,第几列◆显示合计名称2,第几列),中间以◆分隔
		public string colChooseString = "";//列复选(打开选择窗口属性)字符串(打开选择窗口的列 # 连接窗口的地址 # 返回值填充列(2[第0个返回值填充第2列],-1[第1个返回值不填充任何列],5[第2个返回值填充第5列],6[[第3个返回值填充第6列]])),中间以◆分隔
		public string colAjaxString = "";//Ajax参数
		public string colDetailString = "";//明细链接
		public string colOperationString = "";//操作 000 对应 增删明细（1-显示，0-不显示）
		public JArray selectArray = new JArray();//下拉框数据源字符串
		public string checkboxString = "";//复选框
		public string colHiddens = "";//列掩藏属性字符串组合(0-不掩藏,1-掩藏),中间以逗号分隔
		public string colCopys = "";//列掩藏属性字符串组合(0-不掩藏,1-掩藏),中间以逗号分隔
		public string colCodes = "";//列自动编码属性字符串组合(0-不自动编码,1-自动编码),中间以逗号分隔
		public string colWidths = "";//列长度属性字符串组合(px或者%都可以),中间以逗号分隔
		public string colComputeString = "";//列计算属性字符串组合(计算列,计算列,结果列◆计算列,计算列,结果列),数量*单价=金额
        public string colEventString = "";//添加事件
		public string colComputeFormulaString = "";//列计算属性字符串组合(计算列,计算公式◆计算列,计算公式),动态公式
		public string colSelectIdString = "";//当前选中行的指定获取第几列的ID值，默认为0即序号列的ID值
		public string colTabIndexs = "";//列Tab索引属性字符串组合(0-默认,-1-排除,大于1-索引值),中间以逗号分隔
		public char isPost = '0';        

		private static String connectionString = ConfigurationSettings.AppSettings["main_db"];    
			  
		protected void Page_Load(object sender, EventArgs e)
		{            
			GetViewState();

			

			if (IsPostBack)
			{
				//Response.Write("ispostback");
				//Response.Write("<br>value:" + hid_allRecords.Value.Trim());
				//Response.Write("<br>value:" + hid_allRecords.Text.Trim());
				//isPost = '1'; 
				//string id=GetClientId ();
				//if (Request[id] != null)//控件一定要放在Form里面
				//{
				//    //hid_allRecords.Value = Request[id].ToString().Trim();
				//    hid_allRecords.Value = Request[id].ToString().Trim();
				//}
				////dataString = hid_allRecords.Value.Trim();

				//string temp = hid_allRecords.Value.Trim();

				//rowcount = Convert.ToInt32(hid_rowCount.Value.Trim());
				//rowcount = Convert.ToInt32(hid_rowCount.Value.Trim() == "" ? "0" : hid_rowCount.Value.Trim());

				//dataString = temp.Replace('◇', '◆');
			}           

		}

		public void GetDataSourse()
		{
			DataSet ds = new DataSet();//Selection.exeProc(sProcedureName, parParms);
			if (CommandType.StoredProcedure == _cmdType)
			{
				ds = Selection.exeProc(sProcedureName, parParms);
			}
			else
			{
				ds = Selection.exeSql(sProcedureName);
			}
			if (ds.Tables[0].Rows.Count >= 0)
			{
				rowcount = ds.Tables[0].Rows.Count;
				colcount = ds.Tables[0].Columns.Count;
				dataString = "";
                dataString = JsonConvert.SerializeObject(ds.Tables[0]);
                //hid_rowCount.Value = rowcount.ToString();

                //for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                //{
                //	for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                //	{
                //		dataString = dataString + ds.Tables[0].Rows[i][j].ToString().Trim() + "◆";
                //	}
                //}
                //dataString = dataString.Replace("\"", "＂");//双引号替换为半角双引号，前台都是用脚本写的，双引号易导致错误
                //dataString = dataString.Replace("\r\n", " ");//双引号替换为半角双引号，前台都是用脚本写的，双引号易导致错误
                //dataString = dataString.Replace("\"", "\\\"");
                //Response.Write("dataString:" + dataString);
            }
			if (ds.Tables[0].Columns.Count > 0)
			{
				for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
				{
					headersString = headersString + ds.Tables[0].Columns[i].ToString().Trim() + "◆";
				}
				//headersString = headersString.Replace("\"", "\\\"");
				headersString = headersString.Replace("\"", "＂");
			}

			//hid_rowCount.Value = rowcount.ToString();
			//hid_colCount.Value = colcount.ToString();
			//hid_allRecords.Value = dataString;

			SetViewState();
		}
		
		public void FillTable(String procedureName, SqlParameter[] arParms)
		{
			FillTable(_cmdType, procedureName, arParms);
		}
		public void FillTable(CommandType cmdType, String procedureName, params SqlParameter[] arParms)
		{
			this.ProcedureName = procedureName;
			this.arParms = arParms;
			_cmdType = cmdType;
			GetDataSourse();
			SetViewState();
		}

		public void FillTableByHeaderString(String headers)
		{
			headersString = headers;
			string [] temp=headers.Split('◆');
			rowcount = 0;
			colcount = temp.Length;
			//hid_rowCount.Value = rowcount.ToString();
			//hid_colCount.Value = colcount.ToString();
			//hid_allRecords.Value = dataString;
			SetViewState();
		}

		public void FillSelectByProc(String procedureName, SqlParameter[] arParms)
		{
			this.SelectProcedureName = procedureName;
			this.arSelectParms = arParms;
			GetSelectDataSourse();
		}

		public void FillSelectByProcWithHead(String procedureName, SqlParameter[] arParms)
		{
			FillSelectByProc(procedureName,arParms);
		}

		public void FillSelectBySql(String sql)
		{
			this.SelectSql = sql;            
			GetSelectDataSourse();
		}

		public void FillSelectBySqlWithHead(String sql)
		{
			FillSelectBySql(sql);
		}

		public void GetSelectDataSourse()
		{
			//string sql = "exec bp_i_GetAgentCorp 5";
			//DataSet ds = Selection.exeSql(sql);
			DataSet ds = new DataSet();
			if (sSelectProcedureName != null)
			{
				ds = Selection.exeProc(sSelectProcedureName, selectParms);				
			}
			if (sSelectSql != null)
			{
				ds = Selection.exeSql(sSelectSql);
			}
            for (int i = 0; i < ds.Tables.Count; i++) {
                JArray jo = (JArray)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(ds.Tables[i]));
                selectArray.Add(jo);
            }
            SetViewState();

		}

		//复选框数据
		public void FillCheckBoxBySql(String sql)
		{
			this.CheckboxSql = sql;
			GetChexkboxDataSourse();
		}

		public void GetChexkboxDataSourse()
		{
			//string sql = "exec bp_i_GetAgentCorp 5";
			//DataSet ds = Selection.exeSql(sql);
			DataSet ds = new DataSet();
			if (sCheckboxSql != null)
			{
				ds = Selection.exeSql(sCheckboxSql);
				if (ds.Tables[0].Rows.Count > 0)
				{
					for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
					{
						for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
						{
							checkboxString = checkboxString + ds.Tables[0].Rows[i][j].ToString().Trim() + ",";
						}
						checkboxString = checkboxString.Substring(0, checkboxString.Length - 1);
						checkboxString = checkboxString + ";";
					}
					//selectString = selectString + "◆";//放到ds.Tables[0].Rows.Count >0 外面上
				}
				checkboxString = checkboxString + "◆";
			}

			SetViewState();

		}

		//复选框数据

		public int GetRowsCount()
		{
			//if (isPost == '0')
			   // GetDataSourse();
			return rowcount;
		}

		public int GetColsCount()
		{
			//if (isPost == '0')
				//GetDataSourse();
			return colcount;
		}

		public string GetHeaders()
		{
			//GetDataSourse();            
			headersString = headersString.Replace("\"", "＂");
			headersString = headersString.Replace("\"", "\\\"");
			return headersString;
		}       

		public string GetData()
		{
			//if (isPost == '0')
				//GetDataSourse();
			//dataString = dataString.Replace("\"", "＂");//双引号替换为半角双引号，前台都是用脚本写的，双引号易导致错误
			//dataString = dataString.Replace("\"", "\\\"");
			//Response.Write("dataString:" + dataString);
			return dataString;
		}

		public string GetColWidths()
		{
			return colWidths;
		}

		public string GetColControlType()
		{
			//ColumnControlType = "1,1,2,3,1,1,2,2,1";
			return colControlType;
		}

		public string GetColPropertys()
		{
			//ColumnPropertys = "0,1,1,1,1,1,1,1,1,1";
			return colPropertys;
		}

		public string GetColHiddens()
		{
			//ColumnHiddens = "1,0,0,0,0,0,0,0,0,0";
			return colHiddens;
		}

		public string GetColCopys()
		{
			return colCopys;
		}

		public string GetColCodes()
		{
			return colCodes;
		}

		public string GetColTabIndexs()
		{
			return colTabIndexs;
		}

		public string GetColComputeString()
		{
			return colComputeString;
		}

		public string GetColComputeFormulaString()
		{
			return colComputeFormulaString;
		}

		public string GetColValidations()
		{
			//ColumnValidations = "0,0,0,0,0,0,0,0,0,0";
			return colValidations;
		}

		public string GetColEffectiveNumber() {
			return colEffectiveNumber;
		}

		public string GetColDefaultValues()
		{
			//ColumnDefaultValues = "1◆2◆◆◆◆◆◆◆◆";
			return colDefaultValues;
		}

		public string GetColSummaryString()
		{            
			return colSummaryString;
		}

		public string GetColChooseString()
		{
			return colChooseString;
		}
		public string GetColAjaxString()
		{
			return colAjaxString;
		}
		public string GetColDetailString()
		{
			return colDetailString;
		}
		public string GetColOperationString()
		{
			return colOperationString;
		}
		public string GetColSelectIdString()
		{
			return colSelectIdString;
		}

		public string GetselectSourseString()
		{
			//GetSelectDataSourse();
			//GetSelectDataSourse();
			return JsonConvert.SerializeObject(selectArray);
		}
		public string GetcheckboxSourseString()
		{
			//GetSelectDataSourse();
			//GetSelectDataSourse();
			return checkboxString;
		}


		public SqlParameter[] arParms
		{
			set
			{
				parParms = value;
			}
		}

		public String ProcedureName
		{
			set
			{
				sProcedureName = value;
			}
		}

		public SqlParameter[] arSelectParms
		{
			set
			{
				selectParms = value;
			}
		}

		public String SelectProcedureName
		{
			set
			{
				sSelectProcedureName = value;
			}
		}

		public String SelectSql
		{
			set
			{
				sSelectSql = value;
			}
		}
		public String CheckboxSql
		{
			set
			{
				sCheckboxSql = value;
			}
		}

		public String ColumnWidths
		{
			set
			{
				colWidths = value.ToString();
				SetViewState();
			}
			get
			{
				return colWidths.ToString();
			}
		}

		public String ColumnControlType
		{
			set
			{
				colControlType = value.ToString();
				SetViewState();
			}
			get
			{
				return colControlType.ToString();
			}
		}

		public String ColumnPropertys
		{
			set
			{
				colPropertys = value.ToString();
				SetViewState();
			}
			get
			{
				return colPropertys.ToString();
			}
		}

		public String ColumnHiddens
		{
			set
			{
				colHiddens = value.ToString();
				SetViewState();
			}
			get
			{
				return colHiddens.ToString();
			}
		}

		public String ColumnCopys
		{
			set
			{
				colCopys = value.ToString();
				SetViewState();
			}
			get
			{
				return colCopys.ToString();
			}
		}

		public String ColumnCodes
		{
			set
			{
				colCodes = value.ToString();
				SetViewState();
			}
			get
			{
				return colCodes.ToString();
			}
		}

		public String ColumnTabs
		{
			set
			{
				colTabIndexs = value.ToString();
				SetViewState();
			}
			get
			{
				return colTabIndexs.ToString();
			}
		}

		public String ColumnValidations
		{
			set
			{
				colValidations = value.ToString();
				SetViewState();
			}
			get
			{
				return colValidations.ToString();
			}
		}

		public string ColumnEffectiveNumber{
		   set
		   {
			   colEffectiveNumber = value.ToString();
			   SetViewState();
			}
			get {
				return colEffectiveNumber.ToString();
			}
		} 

		public String ColumnDefaultValues
		{
			set
			{
				colDefaultValues = value.ToString();
				SetViewState();
			}
			get
			{
				return colDefaultValues.ToString();
			}
		}

		public String ColumnSummaryString
		{
			set
			{
				colSummaryString = value.ToString();
				SetViewState();
			}
			get
			{
				return colSummaryString.ToString();
			}
		}

		public String ColumnComputeString
		{
			set
			{
				colComputeString = value.ToString();
				SetViewState();
			}
			get
			{
				return colComputeString.ToString();
			}
		}

		public String ColumnComputeFormulaString
		{
			set
			{
				colComputeFormulaString = value.ToString();
				SetViewState();
			}
			get
			{
				return colComputeFormulaString.ToString();
			}
		}

		public String ColumnChooseString
		{
			set
			{
				colChooseString = value.ToString();
				SetViewState();
			}
			get
			{
				return colChooseString.ToString();
			}
		}

		public String ColumnAjaxString
		{
			set
			{
				colAjaxString = value.ToString();
				SetViewState();
			}
			get
			{
				return colAjaxString.ToString();
			}
		}
		public String ColumnDetailString
		{
			set
			{
				colDetailString = value.ToString();
				SetViewState();
			}
			get
			{
				return colDetailString.ToString();
			}
		}
		public String ColumnOperationString
		{
			set
			{
				colOperationString = value.ToString();
				SetViewState();
			}
			get
			{
				return colOperationString.ToString();
			}
		}

		public String SelectIdIndex
		{
			set
			{
				colSelectIdString = value.ToString();
				SetViewState();
			}
			get
			{
				return colSelectIdString.ToString();
			}
		}

		protected void SetViewState()
		{
			ViewState["rowcount"] = rowcount.ToString().Trim();
			ViewState["colcount"] = colcount.ToString().Trim();
			ViewState["sProcedureName"] = sProcedureName;
			//Cache["parParms"] = parParms;

			ViewState["headersString"] = headersString;
			ViewState["colWidths"] = colWidths;
			ViewState["colControlType"] = colControlType;
			ViewState["colPropertys"] = colPropertys;
			ViewState["colValidations"] = colValidations;
			ViewState["colEffectiveNumber"] = colEffectiveNumber;
			ViewState["colDefaultValues"] = colDefaultValues;
			ViewState["colSummaryString"] = colSummaryString;
			ViewState["colChooseString"] = colChooseString;
			ViewState["colAjaxString"] = colAjaxString;
			ViewState["colDetailString"] = colDetailString;
			ViewState["colOperationString"] = colOperationString;
			ViewState["selectArray"] = JsonConvert.SerializeObject(selectArray);
			ViewState["checkboxString"] = checkboxString;
			ViewState["colHiddens"] = colHiddens;
			ViewState["colCopys"] = colCopys;
			ViewState["colCodes"] = colCodes;
			ViewState["colTabIndexs"] = colTabIndexs;
			ViewState["colComputeString"] = colComputeString;
			ViewState["colComputeFormulaString"] = colComputeFormulaString;
			ViewState["colSelectIdString"] = colSelectIdString;
		}

		public void ClearViewState()
		{
			ViewState["rowcount"] = "";
			ViewState["colcount"] = "";
			ViewState["sProcedureName"] = "";
			//Cache["parParms"] = parParms;

			ViewState["headersString"] = "";
			ViewState["colWidths"] = "";
			ViewState["colControlType"] = "";
			ViewState["colPropertys"] = "";
			ViewState["colValidations"] = "";
			ViewState["colEffectiveNumber"] = "";
			ViewState["colDefaultValues"] = "";
			ViewState["colSummaryString"] = "";
			ViewState["colChooseString"] = "";
			ViewState["colAjaxString"] = "";
			ViewState["colDetailString"] = "";
			ViewState["colOperationString"] = "";
			ViewState["selectArray"] = "";
			ViewState["checkboxString"] = "";
			ViewState["colHiddens"] = "";
			ViewState["colCopys"] = "";
			ViewState["colCodes"] = "";
			ViewState["colTabIndexs"] = "";
			ViewState["colComputeString"] = "";
			ViewState["colComputeFormulaString"] = "";
			ViewState["colSelectIdString"] = "";
		}

		protected void GetViewState()
		{          
			if (ViewState["rowcount"] != null)
			{
				rowcount = Convert.ToInt32(ViewState["rowcount"].ToString().Trim());                
			}
			if (ViewState["colcount"] != null)
			{
				colcount = Convert.ToInt32(ViewState["colcount"].ToString().Trim());
			}
			if (ViewState["sProcedureName"] != null)
			{
				sProcedureName = ViewState["sProcedureName"].ToString().Trim();
			}
			//if (ViewState["parParms"] != null)
			//{
			//    parParms = (SqlParameter[])ViewState["parParms"];
			//}


			if (ViewState["headersString"] != null)
			{
				headersString = ViewState["headersString"].ToString().Trim();
			}
			if (ViewState["colWidths"] != null)
			{
				colWidths = ViewState["colWidths"].ToString().Trim();
			}
			if (ViewState["colControlType"] != null)
			{
				colControlType = ViewState["colControlType"].ToString().Trim();
			}
			if (ViewState["colPropertys"] != null)
			{
				colPropertys = ViewState["colPropertys"].ToString().Trim();
			}
			if (ViewState["colValidations"] != null)
			{
				colValidations = ViewState["colValidations"].ToString().Trim();
			}
			if (ViewState["colEffectiveNumber"] != null)
			{
				colEffectiveNumber = ViewState["colEffectiveNumber"].ToString().Trim();
			}
			if (ViewState["colDefaultValues"] != null)
			{
				colDefaultValues = ViewState["colDefaultValues"].ToString().Trim();
			}
			if (ViewState["colSummaryString"] != null)
			{
				colSummaryString = ViewState["colSummaryString"].ToString().Trim();
			}
			if (ViewState["colChooseString"] != null)
			{
				colChooseString = ViewState["colChooseString"].ToString().Trim();
			}
			if (ViewState["colAjaxString"] != null)
			{
				colAjaxString = ViewState["colAjaxString"].ToString().Trim();
			}
			if (ViewState["colDetailString"] != null)
			{
				colDetailString = ViewState["colDetailString"].ToString().Trim();
			}
			if (ViewState["colOperationString"] != null)
			{
				colOperationString = ViewState["colOperationString"].ToString().Trim();
			}
			if (ViewState["selectArray"] != null)
			{
                selectArray =  (JArray)JsonConvert.DeserializeObject(ViewState["selectArray"].ToString().Trim());
			}
			if (ViewState["checkboxString"] != null)
			{
				checkboxString = ViewState["checkboxString"].ToString().Trim();
			}
			if (ViewState["colHiddens"] != null)
			{
				colHiddens = ViewState["colHiddens"].ToString().Trim();
			}
			if (ViewState["colCopys"] != null)
			{
				colCopys = ViewState["colCopys"].ToString().Trim();
			}
			if (ViewState["colCodes"] != null)
			{
				colCodes = ViewState["colCodes"].ToString().Trim();
			}
			if (ViewState["colTabIndexs"] != null)
			{
				colTabIndexs = ViewState["colTabIndexs"].ToString().Trim();
			}
			if (ViewState["colComputeString"] != null)
			{
				colComputeString = ViewState["colComputeString"].ToString().Trim();
			}
			if (ViewState["colComputeFormulaString"] != null)
			{
				colComputeFormulaString = ViewState["colComputeFormulaString"].ToString().Trim();
			}
			if (ViewState["colSelectIdString"] != null)
			{
				colSelectIdString = ViewState["colSelectIdString"].ToString().Trim();
			}
		}

		/// <summary>
		/// document.getElementById ("allRecords").value="";//此取ID方法不可行，因为allRecords有层次结构，hid_allRecords的ID是动态变化的
		/// hid_allRecords在用户控件里，它的ID变成TableInput_hid_allRecords,如果使用用户控件的页面有母版页的话，它的ID是动态变化的
		/// </summary>
		/// <returns></returns>
		protected string GetAllRecordsClientId()
		{
            //return hid_allRecords.ClientID;
            //return hid_allRecords.UniqueID;
            return "";
		}

		protected string GetRowCountClientId()
		{
            //return hid_rowCount.ClientID;
            //return hid_rowCount.UniqueID;
            return "";
        }

		protected string GetAddButtonClientId()
		{
            //return btnAddRow.UniqueID;
            return "";
        }
	}
}
