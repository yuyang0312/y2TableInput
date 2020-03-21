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
        var div = y2AppendChild(y2CreateElement("div", { className: "y2_tableInput_wrapper" }),
            initHead(config.head),
            initBody(config.body));
        div[0].style.width = config.width + 'px';
        return div[0];

    }

    // 创建表头
    function initHead(headConfig){
        if(headConfig){
            var tr = y2CreateElement('tr',{className:"y2_tableInput_head_tr"}),td = null;
            for(var i = 0; i < headConfig.length; i++){
                td = y2CreateElement('td');
                console.log(headConfig[i]["width"]);
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
                            console.log(e.offsetX)
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
                        //console.log(ps, e.clientX - targetTd.offsetLeft );
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
                    if (this.style.cursor == "col-resize") {                        
                        lineLeft.style.left = (this.offsetLeft) + "px";
                        lineRight.style.left = (this.offsetLeft + this.clientWidth) + "px";
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
                        console.log(targetTable)
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
            if (data && data.length > 0) {

            } else {
                // 填一条空数据
                for (var i = 0; i < bodyConfig.length; i++) {
                    td = y2CreateElement('td');

                }
            }
        } else {


        }
        return tbody;
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