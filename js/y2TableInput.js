(function (window) {
    window.y2TIFactory = y2TIFactory;

    // 默认设置
    var defConfig = {
        head:[]
    }

    // tableInput对象
    function y2TableInput() {

    }

    y2TableInput.prototype.init = init;

    // 创建表格工厂
    function y2TIFactory(config) {
        var obj = new y2TableInput();
        config && obj.init(config);
        return obj;
    }

    function init(config,data){
        config = extendObj(defConfig, config);
        //初始化width宽度
        if (!config.width) {
            initWidth(config)
        }
        // 初始化
        if(!config.modalTr){

        }
        this.node = createY2TableInput(config);
    }
    //初始化width宽度
    function initWidth(config) {
        if (!config) return;
        for (var i = 0; i < config.head.length; i++) {
            config.head[i].width = config.head[i].width || "100px";
            config.width = (config.width || 0) + (config.head[i].width.replace('px', '') * 1);
        }
        config.width += 17;
    }

    // 创建
    function createY2TableInput(config) {
        var div = y2CreateElement("div", { className: "y2_tableInput_wrapper" });
        var head = initHead(config.head);
        var body = initBody(config.head);
        div.style.width = config.width + 'px';
        div.appendChild(head);
        div.appendChild(body)
        return div;

    }

    // 创建表头
    function initHead(headConfig){
        if(headConfig){
            var tr = y2CreateElement('tr',{className:"y2_tableInput_head_tr"}),td = null;
            for(var i = 0; i < headConfig.length; i++){
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

            return eleList[0];
        } 
    }

    // 创建表体
    function initBody(bodyConfig, data) {
        var tbody = y2CreateElement("tbody", { className: "y2_tableInput_body"})
        if (bodyConfig) {
            var tr = y2CreateElement('tr'), td = null;
            tbody.appendChild(tr);
            if (data && data.length > 0) {

            } else {
                // 填一条空数据
                for (var i = 0; i < bodyConfig.length; i++) {
                    td = y2CreateElement('td');
                    td.style.width = bodyConfig[i].width;
                    td.setAttribute("data-ctype", "input");
                    td.setAttribute("data-editable", "y");
                    td.onclick = function (e) {
                        tdOnClick(e);
                    }
                    tr.appendChild(td);
                }
            }
        } else {


        }
       
        return y2AppendChild(y2CreateElement('div', { className: "y2_tableInput_body_div" }),
            y2CreateElement('table', { className: "y2_tableInput_body_table " }),
            tbody)[0];
    }

    function tdOnClick(e) {
        var e = e || window.event;
        var target = e.srcElement || e.target;
        focusOn(target);
    }

    /**
     * 将焦点置于目标元素，使得该元素处于可编辑状态
     * @param {any} target 目标td
     */
    function focusOn(target) {
        console.log(target);
        var ctype = target.getAttribute("data-ctype");
        var ele = null;
        var value = target.innerHTML;
        target.innerHTML = "";
        switch (ctype) {
            case "input":
                ele = y2CreateElement("input", { className: "y2Input" });
                ele.value = value;
                ele.onkeydown = function (e) {
                    var e = e || window.event;
                    var keyCode = e.keyCode;
                    if (keyCode == "13") {
                        var value = this.value;                        
                        this.parentNode.removeChild(this);
                        target.innerHTML = value;
                        moveCursor(target, "r", 1);
                    }
                }
                target.appendChild(ele);
                ele.focus();
                break;
            default:
                ele = y2CreateElement("input", { className: "y2Input" })
                break;
        }
    }

    /**
     * 移动光标
     * @param {any} now  现在所处位置
     * @param {any} direction  移动方向 lrtb 上下左右 
     * @param {any} count   移动格数 
     */
    function moveCursor(now, direction, count) {
        var target = null;
        while (now && now.nodeName.toLowerCase() != "td") {
            now = now.parentNode;
        }
        if (now) {
            // 左
            if (direction === "l") {
                if (getPrevNode(now)) {
                    target = getPrevNode(now);
                } else {
                    var tr = now.parentNode;
                    if (getPrevNode(tr)) {
                        var prevTds = getPrevNode(tr).getElementsByTagName("td");
                        for (var i = prevTds.length; i > -1; i--) {
                            if (prevTds[i].getAttribute("data-editable") === "y") {
                                target = prevTds[i];
                                break;
                            }
                        }
                    }
                }
            }
            // 右
            if (direction === "r") {
                if (getNextNode(now)) {
                    target = getNextNode(now);
                } else {
                    var tr = now.parentNode;
                    if (getNextNode(tr)) {
                        var nextTds = getNextNode(tr).getElementsByTagName("td");
                        for (var i = 0; i < nextTds.length; i++) {
                            if (nextTds[i].getAttribute("data-editable") === "y") {
                                target = nextTds[i];
                                break;
                            }
                        }
                    }
                }
            }
            
            target && focusOn(target);
        }
    }

    // 根据类型创建控件
    function buildControl(config){
        switch(config.type){
           case "input":
                
        }
    }


    /**
     *  基础方法
     * 
     * 
     * 
     * 
     * 
     */
     
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
})(window)