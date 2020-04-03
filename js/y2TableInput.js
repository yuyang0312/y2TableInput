// 键盘事件处理库
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
(function (window) {
    window.y2TIFactory = y2TIFactory;

    // 默认设置
    var defConfig = {
        isIndexCol:true // 是否包含序号列
    }

    // tableInput对象
    function y2TableInput() {

    }

    y2TableInput.prototype.init = init;
    y2TableInput.prototype.getByClass = function (className, tag) {
        if (tag === undefined) tag = '*';
        var eleArray = this.node.getElementsByTagName(tag);
        var array = [];
        for (var i = 0; i < eleArray.length; i++) {
            if (hasClass(eleArray[i], className))
                array.push(eleArray[i]);
        }
        return array;
    }
    /**
     * 获取数据
     * @param {any} dataType 数据类型 1. '◇','◆' 拼接起来 2 json
     * @param {any} needArray 需要的数据及顺序
     */
    y2TableInput.prototype.getData = function (dataType, needArray) {
        if (dataType === undefined) dataType = 1;
        if (needArray === undefined) {
            var needArray = [];
            for (var i = 0; i < this.config.field.length; i++) {
                needArray.push(this.config.field[i]["field"]);
            }
        }
        var str = "";
        if (dataType == 1) {
            for (var i = 0, oLen = this.data.length; i < oLen; i++) {
                for (var j = 0, iLen = needArray.length; j < iLen; j++) {
                    str += this.data[i][needArray[j]];
                    if (j < iLen - 1) {
                        str += '◇';
                    }
                }
                if (i < oLen - 1) {
                    str += '◆';
                }
            }
        }
        return str;
    }
    // 创建表格工厂
    function y2TIFactory(config) {
        var obj = new y2TableInput();
        obj.config = extendObj(defConfig, config);
        Mousetrap.bind('del', function (e) {
            if (obj.editingTr) {
                deleteRow(obj, obj.editingTr.getAttribute("data-Index"));
            }
        });
        config && obj.init();
        return obj;
    }

    function init() {
        var config = this.config;
        this.data = config.data;        
        // 既没有数据有没有设置
        if (isNullOrEmptyArray(config.field) && isNullOrEmptyArray(this.data)) {
            return;
        }
        if (isNullOrEmptyArray(config.field)) {
            config.field = initField(this.data[0]);
        }
        //将一些不规范的数据集重新整理 如select数据源不包含 value lable;
        config.field = sortField(config.field);
        //初始化width宽度
        if (!config.width) {
            initWidth(config)
        }
        //如果没有数据,添加一条空数据 
        if (isNullOrEmptyArray(this.data)) {
            this.data = initData(config);
        }
        // 初始化模板数据
        if (!config.modalData) {
            config.modalData = initModalData(config);
        }
        // 初始化模板行
        if(!config.modalTr){
            config.modalTr = initModalTr(config);
        }
        this.node = createY2TableInput(this);
    }

    function initData(config) {
        var fieldConfig = config.field;
        var obj = {},data=[];
        for (var i = 0; i < fieldConfig.length; i++) {
            obj[fieldConfig[i]["field"]] = "";
        }
        data.push(obj);
        return data;
    }

    function initField(data) {
        var field = [];
        for (var key in data) {
            field.push({ text: key, field: key })
        }
        return field;
    }

    function sortField(field) {
        for (var i = 0; i < field.length; i++) {
            if (field[i]["cType"] === "select") {
                var bindData = field[i]["bindData"];
                if (!isNullOrEmptyArray(bindData) && (!bindData[0].hasOwnProperty("value") || !bindData[0].hasOwnProperty("label")))
                    field[i]["bindData"] = sortBindData(bindData);
            }
        }
        return field;
    }

    function sortBindData(bindData) {
        var array = [];
        for (var key in bindData[0]) {
            array.push(key);
        }
        for (var i = 0; i < bindData.length; i++) {
            if (array.length === 1) {
                bindData[i]["value"] = bindData[i][array[0]];
                bindData[i]["label"] = bindData[i][array[0]];
            } else {
                bindData[i]["value"] = bindData[i][array[0]];
                bindData[i]["label"] = bindData[i][array[1]];
            }
        }
        return bindData;
    }

    //初始化width宽度
    function initWidth(config) {
        if (!config) return;
        var tableWidth = 0;
        for (var i = 0; i < config.field.length; i++) {
            if (!config.field[i].hidden) {
                config.field[i].width = config.field[i].width || "100px";
                config.width = (config.width || 0) + (config.field[i].width.replace('px', '') * 1);
                tableWidth += config.field[i].width.replace('px', '') * 1;
            }
        }
        config.width += 17;
        if (!config.tableWidth) {
            if (config.isIndexCol) {
                tableWidth = tableWidth + 30;
            }
            config.tableWidth = tableWidth + 30;
        }
    }

    function initModalTr(config) {
        var fieldConfig = config.field;
        var tr = y2CreateElement('tr', { className:"y2_tableInput_body_tr" });
        //序号列
        if (config.isIndexCol) {
            var td = y2CreateElement("td", { className: "y2_tableInput_body_index" })
            td.style.width = "30px";
            td.setAttribute("data-readOnly", "true");
            tr.appendChild(td);
        }
        for (var j = 0; j < fieldConfig.length; j++) {
            if (!fieldConfig[j].hidden) {
                var td = y2CreateElement('td');
                td.style.width = fieldConfig[j].width;
                td.setAttribute("data-field", fieldConfig[j]["field"]);
                td.setAttribute("data-colindex", j);
                td.setAttribute("data-ctype", fieldConfig[j]["cType"] || "input");
                td.setAttribute("data-readOnly", fieldConfig[j]["readOnly"] + "");
                td.setAttribute("data-copy", fieldConfig[j]["copy"]);
                var value = changeUN(fieldConfig[j]["defValue"]);
                if (fieldConfig[j]["cType"] === "select") {
                    value = getValueByArray(fieldConfig[j]["bindData"], value);
                }
                setTdValue(td, value);
                tr.appendChild(td);
            }
        }
        return tr;
    }

    function initModalData(config) {
        var fieldConfig = config.field;
        var obj = {};
        for (var j = 0; j < fieldConfig.length; j++) {
            obj[fieldConfig[j]["field"]] = fieldConfig[j]["defValue"] === undefined ? "" : fieldConfig[j]["defValue"];
        }
        return obj;
    }
    // 创建
    function createY2TableInput(y2TI) {
        var config = y2TI.config;
        var div = y2CreateElement("div", { className: "y2_tableInput_wrapper" });
        var head = initHead(y2TI);
        var body = initBody(y2TI);
        var foot = initFoot(y2TI);
        div.style.width = config.width + 'px';
        div.appendChild(head);
        div.appendChild(body);
        div.appendChild(foot);
        return div;

    }

    // 创建表头
    function initHead(y2TI) {
        var headConfig = y2TI.config.field;
        if(headConfig){
            var tr = y2CreateElement('tr', { className: "y2_tableInput_head_tr" }), td = null;
            //序号列
            if (y2TI.config.isIndexCol) {
                var td = y2CreateElement("td", { className: "y2_tableInput_head_index" });
                td.setAttribute("data-readOnly", "true");
                td.style.width = "30px";
                td.innerHTML = "<div style='width:100%'><div>";
                tr.appendChild(td);
            }
            for (var i = 0; i < headConfig.length; i++){
                if (headConfig[i].hidden) continue;
                td = y2CreateElement('td');
                td.style.width = headConfig[i]["width"];
                td.innerText = headConfig[i]["text"];
                tr.appendChild(td);
                var lineLeft = y2CreateElement("div", { className: "y2_tableInput_line y2_tableInput_line_left" });
                var lineRight = y2CreateElement("div", { className: "y2_tableInput_line y2_tableInput_line_right" });
                var ps, targetTd, isstretching;
                // 缩放表格
                td.onmousemove = function (e) {
                    e = e || window.event;        
                    if (!isstretching) {
                        if (e.offsetX < 3 || e.offsetX > (this.clientWidth - 3)) {
                            this.style.cursor = "col-resize";
                            if (e.offsetX < 3) ps = "left";
                            else ps = "right";
                        } else {
                            this.style.cursor = "auto";
                        }
                    }
                }
                //将鼠标移动事件绑定到document 这样即使鼠标移出浏览器也能监听到具体位置
                document.onmousemove = function (e) {
                    e = e || window.event;
                    if (isstretching) {
                        if (ps == "left" && (targetTd.clientWidth + targetTd.offsetLeft - e.clientX > 20)) {
                            lineLeft.style.left = e.clientX + "px";
                        }
                        else if (ps == "right" && e.clientX - targetTd.offsetLeft > 20) {
                            lineRight.style.left = e.clientX + "px";
                        }
                    }
                }

                td.onmousedown = function (e) {
                    e = e || window.event;
                    // 先获取y2_tableInput_wrapper的父元素的offsetLeft的合计
                    var offsetParent = 0;
                    var pNode = this;
                    while (pNode) {
                        offsetParent += pNode.offsetLeft || 0;
                        pNode = pNode.offsetParent;
                    }
                    if (this.style.cursor == "col-resize") {                        
                        lineLeft.style.left = offsetParent + "px";
                        lineRight.style.left = (offsetParent + this.clientWidth) + "px";
                        document.body.appendChild(lineLeft);
                        document.body.appendChild(lineRight);
                        isstretching = true;
                        targetTd = this; 
                    }
                }

                document.onmouseup = function (e) {
                    e = e || window.event;
                    var targetTable = targetTd;
                    if (isstretching) {
                        isstretching = false;
                        while (targetTable && targetTable.nodeName.toLowerCase() != "table") {
                            targetTable = targetTable.parentNode;
                        }
                        targetTable.style.width += (lineRight.style.left.replace('px', '') - lineLeft.style.left.replace('px', '') - 2) - targetTd.style.width.replace("px","") + 'px';
                        targetTd.style.width = (lineRight.style.left.replace('px', '') - lineLeft.style.left.replace('px', '') - 2) + 'px'; // 2 是paddingleft的值
                                              
                        // 移除线条
                        document.body.removeChild(lineLeft);
                        document.body.removeChild(lineRight);
                    }
                } 

            }
            var eleList = y2AppendChild(y2CreateElement('div', { className: "y2_tableInput_head_div" }),
                y2CreateElement('table', { className: "y2_tableInput_head_table " }),
                y2CreateElement('thead', { className: "y2_tableInput_head_thead" }),
                tr);

            // 尾部再加上滚动条宽度的空白
            eleList[1].style.width = y2TI.config.tableWidth + 'px';
            return eleList[0];
        } 
    }

    // 创建表体
    function initBody(y2TI) {
        var fieldConfig = y2TI.config.field,
            data = y2TI.data;
            modalTr = y2TI.config.modalTr;
        var tbody = y2CreateElement("tbody", { className: "y2_tableInput_body" });
        var div = y2AppendChild(y2CreateElement('div', { className: "y2_tableInput_body_div" }),
            y2CreateElement('table', { className: "y2_tableInput_body_table " }),
            tbody);
        for (var i = 0; i < data.length; i++) {
            var tr = modalTr.cloneNode(true);
            tr.setAttribute("data-index", i);           
            var tds = tr.getElementsByTagName("td"),
                datai = data[i],
                startIndex = 0;
            if (y2TI.config.isIndexCol) {
                tds[0].innerHTML = "<div>" + (i + 1) + "</div>";
                startIndex = 1;
            }         
            for (var j = startIndex; j < tds.length; j++) {
                var field = tds[j].getAttribute("data-field");
                var colIndex = tds[j].getAttribute("data-colindex");
                var value = datai[field];
                if (fieldConfig[colIndex]["cType"] === "select") {
                    var text = getValueByArray(fieldConfig[colIndex]["bindData"], value);
                    toggleTdStatus(tds[j], "display", y2TI,text);
                } else {
                    toggleTdStatus(tds[j], "display", y2TI);
                }
                
            }
            tbody.appendChild(tr);
        }      
        div[1].style.width = y2TI.config.tableWidth + 'px';
        div[1].onclick = function (e) {
            onTableClick(e, y2TI);
        }
        return div[0];
    }

    // 创建合计
    function initFoot(y2TI,nowfield) {
        var fieldConfig = y2TI.config.field;
        var tbody = null,tr = null;
        if (y2TI.node && y2TI.getByClass("y2_tableInput_foot_tr", "tr")[0]) {
            tr = y2TI.getByClass("y2_tableInput_foot_tr", "tr")[0];
        } else {
            tbody = y2CreateElement("tbody", { className: "y2_tableInput_foot_tbody" });
            var div = y2AppendChild(y2CreateElement('div', { className: "y2_tableInput_foot_div" }),
                y2CreateElement('table', { className: "y2_tableInput_foot_table " }),
                tbody);
            tr = y2TI.config.modalTr.cloneNode(true);
            tr.className = "y2_tableInput_foot_tr";
            tbody.appendChild(tr);
            div[1].style.width = y2TI.config.tableWidth + 'px';
            div = div[0];
        }
        var tds = tr.getElementsByTagName("td");
        setTdValue(tds[0], "合计");
        for (var i = 1; i < tds.length; i++) {
            var td = tds[i];            
            var field = fieldConfig[td.getAttribute("data-colIndex")];
            if (field.isSum) {
                if (nowfield && nowfield == field.field || !nowfield)
                    setTdValue(td,getSum(field.field, y2TI.data));
            } else {
                setTdValue(td,"");
            }
        }
        return div;
    }

    function getSum(fieldName, data) {
        var sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i][fieldName] * 1 || 0;
        }
        return (sum || 0).toFixed(2);
    }

    /**
     * 增加行
     * @param {any} y2TI：对象
     * @param {any} type:增加类型 0:最末尾插入,1:本行下方插入
     * @param {any} index:当前行位置
     */
    function addRow(y2TI, type, index) {
        var newTr = y2TI.config.modalTr.cloneNode(true);
        var tbody = y2TI.getByClass("y2_tableInput_body", "tbody")[0];
        newTr.setAttribute("data-index", tbody.getElementsByTagName("tr").length);
        toggelEditingTr(newTr, y2TI);
        if (y2TI.config.isIndexCol) {
            newTr.getElementsByTagName("td")[0].innerHTML = "<div>" + (tbody.getElementsByTagName("tr").length + 1) + "</div>";
        }
        if (type === 0) {
            y2TI.data.push(deepCloneObj(y2TI.config.modalData));
            tbody.appendChild(newTr);
        }

        //检查是否有复制上列值
        var tds = newTr.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++) {
            if (tds[i].getAttribute("data-copy") == "1") {
                var value = y2TI.data[y2TI.data.length - 2][tds[i].getAttribute("data-field")];
                y2TI.data[y2TI.data.length - 1][tds[i].getAttribute("data-field")] = value;
                setTdValue(tds[i], value);
            }
        }
        return newTr;
    }

    /**
    * 删减行
    * @param {any} y2TI：对象
    * @param {any} index:当前行位置
    */
    function deleteRow(y2TI, index) {
        if (index === undefined) return;
        var tbody = y2TI.getByClass("y2_tableInput_body", "tbody")[0];
        var trs = tbody.getElementsByTagName("tr");        
        y2TI.data.splice(index, 1);
        tbody.removeChild(trs[index]);
        if (y2TI.data.length === 0) {
            addRow(y2TI, 0)
        }
        sortTable(tbody);
    }

    /**
     * 整理顺序
     * @param {any} tbody
     */
    function sortTable(tbody) {
        var trs = tbody.getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {            
            var tr = trs[i];
            if (tr.getAttribute("data-index") != i) {               
                tr.setAttribute("data-index", i);
                var first = tr.getElementsByTagName("td")[0];
                if (first && hasClass(first, "y2_tableInput_body_index")){
                    first.innerHTML = i + 1;
                }
            }
        }
    }


    /**
     * 切换单元格状态
     * @param {any} td 单元格
     * @param {any} status 状态 "display":显示 , "input" 输入
     * @param {any} text 显示值 用于显示和输入不一致的控件 如 select
     */
    function toggleTdStatus(td, status, y2TI, text) {
        var tr = td.parentNode;
        var readOnly = td.getAttribute("data-readOnly");
        var dataStatus = td.getAttribute("data-status");
        if (dataStatus != status) {
            var index = tr.getAttribute("data-Index")
            text = text || changeUN(y2TI.data[index][td.getAttribute("data-field")]);
            td.setAttribute("data-status", status);
            if (status === "display") {
                setTdValue(td,text)
            }
            if (status === "input" && readOnly != "true") {
                focusOn(td, text, y2TI);
            }
        }
    }

    function setTdValue(td,value) {
        td.innerHTML = "";
        var div = y2CreateElement("div", { className: "y2_tableInput_body_display" });
        div.innerHTML = value;
        td.appendChild(div);
    }

    function onTableClick(e, y2TI) {
        onTdClick(e, y2TI);
    }

    function onTdClick(e, y2TI) {
        var e = e || window.event;
        var target = e.srcElement || e.target;
        while (target && target.nodeName.toLowerCase() !== "td") {
            target = target.parentNode;
        }
        if (hasClass(target, "y2_tableInput_body_display")) target = target.parentNode;
        toggelEditingTr(target.parentNode,y2TI);
        if (!hasClass(target, "y2_tableInput_body_index")) {
            toggleTdStatus(target, "input", y2TI);
        }
    }

    // 将tr设置为选中状态
    function toggelEditingTr(tr,y2TI) {
        if (y2TI.editingTr) {
           removeClass(y2TI.editingTr,"y2_tableInput_editingTr");
        }
        addClass(tr, "y2_tableInput_editingTr");
        y2TI.editingTr = tr;
    }

    /**
     * 将焦点置于目标元素，使得该元素处于可编辑状态
     * @param {any} target 目标td
     */
    function focusOn(target, value, y2TI) {
        var field = target.getAttribute("data-field");
        var colIndex = target.getAttribute("data-colIndex");
        var ctype = target.getAttribute("data-ctype");
        var ele = null;
        target.innerHTML = "";
        toggelEditingTr(target.parentNode, y2TI)
        switch (ctype) {
            case "input":
                ele = y2CreateElement("input", { className: "y2Input" });
                ele.value = value;
                ele.onkeydown = function (e) {
                    var e = e || window.event;
                    var keyCode = e.keyCode;
                    if (keyCode == "13" || keyCode == "9") {
                        setValue(target, this.value, y2TI);
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "r", 1, y2TI);
                        event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    } else if (keyCode == "37") {// 左
                        var poistion = getTxt1CursorPosition(this)
                        if (poistion == 0) {
                            setValue(target, this.value, y2TI);
                            toggleTdStatus(target, "display", y2TI);
                            moveCursor(target, "l", 1, y2TI);
                        }
                    } else if (keyCode == "38") {// 上
                        setValue(target, this.value, y2TI);
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "t", 1, y2TI);
                    } else if (keyCode == "39") {// 右
                        var poistion = getTxt1CursorPosition(this)
                        if (!this.value || this.value.length === poistion) {
                            setValue(target, this.value, y2TI);
                            toggleTdStatus(target, "display", y2TI);
                            moveCursor(target, "r", 1, y2TI);
                        }
                    } else if (keyCode == "40") {// 下
                        setValue(target, this.value, y2TI);
                        toggleTdStatus(target, "display", y2TI);
                        moveCursor(target, "b", 1, y2TI);
                    }
                   
                }
                ele.onblur = function () {
                    setValue(target, this.value, y2TI);
                    toggleTdStatus(target, "display", y2TI);
                }
                target.appendChild(ele);
                ele.focus();
                break;
            case 'select':
                var bindData = null;
                for (var i = 0, fieldConfig = y2TI.config.field; i < fieldConfig.length; i++) {
                    if (fieldConfig[i].field == field) {
                        bindData = fieldConfig[i].bindData || [];
                        break;
                    }
                }
                
                ele = buildSelect(bindData);
                target.appendChild(ele);
                $(ele).select2();
                $(ele).val(value).trigger("change");;
                $(ele).on("select2:close", function (e) {
                    var value = $(ele).select2("val");
                    var text = $(ele).select2('data')[0] && $(ele).select2('data')[0].text;
                    setValue(target, value, y2TI);
                    toggleTdStatus(target, "display", y2TI ,text);
                    moveCursor(target, "r", 1, y2TI);
                }) 
                $(ele).select2("open");
                break;
            default:
                ele = y2CreateElement("input", { className: "y2Input" })
                break;
        }      
    }

    /**
     * 更新data值
     * @param {any} target 目标td
     * @param {any} value 值
     * @param {any} data 要更新的数据集
     * 
     */
    function setValue(target, value, y2TI) {
        var tr = target.parentNode;
        var index = tr.getAttribute("data-Index");
        
        var colIndex = target.getAttribute("data-colIndex");
        var field = target.getAttribute("data-field");
        var fieldConfig = y2TI.config.field[colIndex];
        if (fieldConfig.validation) {
            var flag = validate(fieldConfig.validation, value);
            if (!flag) {
                return false;
            }
        }
        y2TI.data[index][field] = value;
        //自定义事件
        if (fieldConfig["event"]) {
            for (var eventName in fieldConfig["event"]) {
                if (eventName == "change") {
                    var tds = tr.getElementsByTagName("td");
                    var data = fieldConfig["event"]["change"](target, deepCloneObj(y2TI.data[index]));
                    for (var key in y2TI.data[index]) {
                        if (data[key] != y2TI.data[index][key]) {
                            //y2TI.data[index][key] = data[key];
                            var diffIndex = getIndexByKey(y2TI.config.field, key,"field");
                            var diffField = y2TI.config.field[diffIndex];
                            var diffTarget = null;
                            for (var i = 0; i < tds.length; i++) {
                                if (tds[i].getAttribute("data-colIndex") == diffIndex) {
                                    diffTarget = tds[i];
                                    break;
                                }
                            }
                            if (diffTarget) {
                                setValue(diffTarget, data[key], y2TI);
                                setTdValue(diffTarget, data[key]);
                            }
                        }
                    }
                }
            }
        }        
        initFoot(y2TI, field)
    }



    /**
     * 验证数据格式
     * @param {any} validation
     * @param {any} value
     */
    function validate(validation,value){
        if (!validation["allowEmpty"] && value === "") {
            return false;
        }
        if (!validation["type"] || validation["type"] == "any") {
            return true;
        }
        if (validation["type"] === "int") {
            return ~~value === value;
        }
        if (validation["type"] === "numeric") {
            var patten = /^-?\d+\.?\d*$/;
            var flag = patten.test(value);
            if (validation["length"] * 1 && flag) {
                var array = (value + "").split(".");
                if (array[1]) {
                    flag = array[1].length <= validation["length"] * 1;
                }               
            }                
            return flag;
        }
    }

    /**
     * 移动光标
     * @param {any} now  现在所处位置
     * @param {any} direction  移动方向 lrtb 上下左右 
     * @param {any} count   移动格数 
     * @param {any} data   数据
     */
    function moveCursor(now, direction, count, y2TI) {
        var target = null;
        while (now && now.nodeName.toLowerCase() != "td") {
            now = now.parentNode;
        }
        if (now) {
            var tr = now.parentNode;
            // 左
            if (direction === "l") {
                target = getEditableTd(now, 'l', y2TI);
            }
            // 右
            if (direction === "r") {
                target = getEditableTd(now, 'r', y2TI);
            }
            // 上
            if (direction === "t") {               
                if (getPrevNode(tr)) {
                    var tds = getPrevNode(tr).getElementsByTagName("td");
                    for (var i = 0; i < tds.length; i++) {
                        if (tds[i].getAttribute("data-field") == now.getAttribute("data-field")) {
                            target = tds[i];
                            break;
                        }
                    }
                }
            }
            // 下
            if (direction === "b") {
                if (!getNextNode(tr)) addRow(y2TI,0);
                var tds = getNextNode(tr).getElementsByTagName("td");
                for (var i = 0; i < tds.length; i++) {
                    if (tds[i].getAttribute("data-field") == now.getAttribute("data-field")) {
                        target = tds[i];
                        break;
                    }
                }                
            }
            target && toggleTdStatus(target, "input", y2TI);
        }
    }

    /**
     * 获取相邻可编辑单元格
     * @param {any} td 本单元格
     * @param {any} direction 方向
     */
    function getEditableTd(td, direction, y2TI) {
        var target = null;
        if (td) {
            var tr = td.parentNode;
            if (direction === "l") {
                if (getPrevNode(td)) {
                    target = getPrevNode(td);
                } else {
                    if (getPrevNode(tr)) {
                        var prevTds = getPrevNode(tr).getElementsByTagName("td");
                        for (var i = prevTds.length; i > -1; i--) {
                            if (prevTds[i].getAttribute("data-readOnly") !== "true") {
                                target = prevTds[i];
                                break;
                            }
                        }
                    }
                }
            } else if (direction === "r") {
                if (getNextNode(td)) {
                    target = getNextNode(td);
                } else {
                    if (getNextNode(tr)) {
                        var nextTds = getNextNode(tr).getElementsByTagName("td");
                        for (var i = 0; i < nextTds.length; i++) {
                            if (nextTds[i].getAttribute("data-readOnly") !== "true") {
                                target = nextTds[i];
                                break;
                            }
                        }
                    } else {
                        var newRow = addRow(y2TI, 0);
                        var nextTds = newRow.getElementsByTagName("td");
                        for (var i = 0; i < nextTds.length; i++) {
                            if (nextTds[i].getAttribute("data-readOnly") !== "true") {
                                target = nextTds[i];
                                break;
                            }
                        }
                    }
                }
            }
            if (target.getAttribute("data-readOnly") === "true") {
                target = getEditableTd(target, direction);
            }
        }
        return target;
    }

    // 根据类型创建控件
    function buildControl(config){
        switch(config.type){
           case "input":
                
        }
    }


    /**
     * 创建控件区域
     * 
     */

    function buildSelect(bindData,y2TI) {
        var ele = y2CreateElement("select", { className: "y2Select" });
        if (bindData) {
            for (var i = 0; i < bindData.length; i++) {
                var option = y2CreateElement("option");
                option.value = lrTrim(bindData[i]["value"]);
                option.innerHTML = lrTrim(bindData[i]["label"]);
                ele.appendChild(option);
            }
        }
        //ele.onselect = function () {
        //    alert(1)
        //}
        return ele;
    }
    /**
     *  基础方法
     * 
     * 
     * 
     * 
     * 
     */

    /**
     * 根据属性值获取index
     * @param {any} array 数组
     * @param {any} key  属性值
     * @param {any} name 属性名
     */
    function getIndexByKey(array, key, name) {
        var index = -1;
        for (var i = 0; i < array.length; i++) {
            if (lrTrim(array[i][name]) == lrTrim(key)) {
                index = i;
                break;
            }
        }
        return index;
    }

    function isNullOrEmptyArray(array) {
        return !(array && array.length > 0)
    }
    // 从数组中根据value获取label
    function getValueByArray(array, value) {
        var label = "";
        if (!isNullOrEmptyArray(array)) {
            for (var i = 0; i < array.length; i++)
            {
                if (lrTrim(array[i]["value"]) == lrTrim(value)) {
                    label = array[i]["label"];
                    break;
                }
            }
        }
        return label;
    }
    // 去除前后空格
    function lrTrim(str) {
        return str.replace(/^\s+|\s+$/g, "")
    }

    function changeUN(o) {
        if (o === undefined || o === null) return "";
        return o;
    }

    function extendObj() { // 扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = args[0]; // 调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                if ("object" == typeof args[n][i] && temp[i] && !temp[i].length) {
                    extendObj(temp[i], args[n][i]);
                } else {
                    temp[i] = args[n][i];
                }
            }
        }
        return temp;
    }

    //光标在字符串位置
    function getTxt1CursorPosition(ele) {
        var cursurPosition = 0;
        if (ele.selectionStart) {//非IE
            cursurPosition = ele.selectionStart;
        } else {//IE
            try {
                var range = document.selection.createRange();
                range.moveStart("character", -ele.value.length);
                cursurPosition = range.text.length;

            } catch (e) {
                cursurPosition = 0;
            }
        }
        return cursurPosition;//打印当前索引
    }

    //对象深克隆
    function deepCloneObj(obj) {
        var result = {}, oClass = isClass(obj);
        for (key in obj) {
            var copy = obj[key];
            if (isClass(copy) == "Object") {
                result[key] = arguments.callee(copy);
            } else if (isClass(copy) == "Array") {
                result[key] = arguments.callee(copy);
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    }

    function isClass(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }

    //获取上一个兄弟节点
    function getPrevNode(n) {
        return n.previousElementSibling || n.previousSibling;
    }

    //获取下一个兄弟节点
    function getNextNode(n) {
        return n.nextElementSibling || n.nextSibling;
    }


    // 创建元素
    function y2CreateElement(tag,attr,props){
        var ele = document.createElement(tag);
        if(attr)
            for(var key in attr){
                ele[key] = attr[key]
            }  
        if(props)      
            for(var key in props){
                ele.setAttribute(key,props);
            }
        return ele;
    }

    // 链式添加元素 
    function y2AppendChild() {
        var result,array = [];
        if (arguments.length > 0) {
            result = arguments[arguments.length - 1];
            array.push(result);
            for (var i = arguments.length - 2; i >= 0; i--) {                
                arguments[i].appendChild(result);
                result = arguments[i];
                array.unshift(result);
            }
        }
        return array; 
    }

    function hasClass(elements, cName) {
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    };
    function addClass(elements, cName) {
        if (!hasClass(elements, cName)) {
            elements.className += " " + cName;
        };
    };
    //转换class
    function toggleClass(elements, cName) {
        if (hasClass(elements, cName)) removeClass(elements, cName);
        else addClass(elements, cName);
    }
    function removeClass(elements, cName) {
        if (hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
        };
    };
})(window)