using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using jr.Source;
using System.Data.SqlClient;

public partial class Script_y2ServerControl_y2DataTable : System.Web.UI.UserControl
{

    public string json;
    public bool IsTotal=false;//是否合计
    private DataSet mds;
    public string mParam="{}";
    public DataSet ds {
        set {
            mds = value;
        }
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (mParam == "{}")
        {
            DataSet ds = Selection.exeSql("select dConfig from bas_y2TableConfig where href='" + Request.RawUrl.ToString() + "' and userCode='" + CommonApplication.GetUserCode() + "' ");
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                mParam = ds.Tables[0].Rows[0]["dConfig"].ToString().Trim();
            }

        }
    }

    private void Init()
    {
        if (mParam == "{}")
        {
            DataSet ds = Selection.exeSql("select dConfig from bas_y2TableConfig where href='" + Request.RawUrl.ToString() + "' and userCode='" + CommonApplication.GetUserCode() + "' ");
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                mParam = ds.Tables[0].Rows[0]["dConfig"].ToString().Trim();
            }

        }
        if (mds != null && mds.Tables.Count > 0)
        {
            json = JsonConvert.SerializeObject(mds.Tables[0]);//DtSelectTop(100, mds.Tables[0])
            if (IsTotal) {
                if (mds.Tables.Count>1 && mds.Tables[1].Rows.Count > 0) {
                    setSumCols(mds.Tables[1].Rows[0][0].ToString().Trim());
                }
            }
        }
    }



    /// <summary> 
    /// 获取DataTable前几条数据 
    /// </summary> 
    /// <param name="TopItem">前N条数据</param> 
    /// <param name="oDT">源DataTable</param> 
    /// <returns></returns> 
    public static DataTable DtSelectTop(int TopItem, DataTable oDT)
    {
        if (oDT.Rows.Count < TopItem) return oDT;

        DataTable NewTable = oDT.Clone();
        DataRow[] rows = oDT.Select("1=1");
        for (int i = 0; i < TopItem; i++)
        {
            NewTable.ImportRow((DataRow)rows[i]);
        }
        return NewTable;
    }

    //绑定数据
    public void FillGridData(DataSet ds) {
        mds = ds;
        Init();
    }

    public void FillGridData(string sql) {
        mds = Selection.exeSql(sql);
        Init();
    }

    public void FillGridData(string procName, SqlParameter[] arParms) {
        mds = Selection.exeProc(procName, arParms);
        Init();
    }

    //设置参数
    public void SetMParams(string param) {
        mParam = param;
    }

    //sumStr 合计
    public void FillGridDataWithSummaryByColumnNames(string procName, SqlParameter[] arParms,string sumStr) {
        mds = Selection.exeProc(procName, arParms);
        setSumCols(sumStr);
        Init();
    }

    private void setSumCols(string sumStr) {
        string[] array = sumStr.Split(',');
        string str = "";
        for (int i = 0; i < array.Length; i++)
        {
            if (i > 0) str += ",";
            str += "'" + array[i] + "'";
        }
        if (mParam == "{}")
        {
            mParam = "{sumConfig:{sumedCols:[" + str + "],isShow:true}}";
        }
        else
        {
            mParam = mParam.Substring(0, mParam.Length - 1) + ",sumConfig:{sumedCols:[" + str + "],isShow:true}}";
        }
    }
}