<%@ Control Language="C#" AutoEventWireup="true" CodeFile="y2DataTable.ascx.cs" Inherits="Script_y2ServerControl_y2DataTable" %>

<script type="text/javascript" src='<%=ResolveUrl("../y2js/zDialog/zDrag.js")%>' ></script>
<script type="text/javascript" src='<%=ResolveUrl("../y2js/zDialog/zDialog.js")%>'></script>
<script type="text/javascript" src='<%=ResolveUrl("../JQuery/jquery-1.5.1.min.js")%>' ></script>
<script  type="text/javascript" src='<%=ResolveUrl("../y2js/y2DataTable.js")%>' charset="utf-8"></script>
<link rel="stylesheet" href='<%=ResolveUrl("../y2js/y2DataTable.css")%>'>
    <div runat="server" id="wt" style="width:99%"></div>
    <input runat="server" id="txtDGHiddenSelectItems" type="hidden"/>
<script>
    //console.time("a");
    var y2json = <%=json%>;
    var y2param =<%=mParam%>;
    var bodyheight = document.documentElement.scrollHeight - 170;
    var bodywidth = document.documentElement.scrollWidth - 10;
    if (y2json && y2json.length > 0) {
        if (!y2param) y2param = {};
        if (!y2param.hasOwnProperty('wrapHeight')) y2param['wrapHeight'] = bodyheight;
        y2param.data = y2json;
        y2param['path'] = {img:'../Script/y2js/zDialog/images/'}
        var y2ascxData = DataTableFactory.initTable(y2param);
        document.getElementById('<%= wt.ClientID %>').appendChild(y2ascxData._Dom);
        document.getElementById('<%= wt.ClientID %>').style.width = bodywidth;
        
    } else {
        var div = document.getElementById('<%= wt.ClientID %>');
        div.style.padding = '50px';
        div.style.color = 'red';
        div.style.fontSize = '14pt';
        div.style.height = bodyheight;
        div.innerHTML = "没有查询到数据！";
    }
    //console.timeEnd("a");
</script>