<%@ Page Language="C#" MasterPageFile="~/Admin.master" AutoEventWireup="true" CodeFile="y2Demo.aspx.cs" Inherits="Bas_MobileConfigEdit" Title="Untitled Page" %>
<%@ Register Assembly="BolanControl" Namespace="Bolan.Control" TagPrefix="cc1" %>
<%@ Register Src="../../Script/y2ServerControl/y2TableInput.ascx" TagName="TableInput" TagPrefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <style>
        .tdbg1 a {
            margin-right:20px;
        }
    </style>
			<div  style="overflow:visible;width:1200px;text-align:left">
                        <uc1:TableInput ID="TableInput1" runat="server" />
            </div>
			
</asp:Content>

