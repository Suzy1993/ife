/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value.trim();
	var flag = 0;
	for (var i = 0; i < city.length; i++) {
		if (!(city.charAt(i) >= 'a' && city.charAt(i) >= 'z' || city.charAt(i) >= 'A' && city.charAt(i) >= 'Z')) {
			alert("城市名必须为中英文字符");
			flag = 1;
		}
	}
	var value = document.getElementById("aqi-value-input").value.trim();
	if (!(parseInt(value) == value)) {
		alert("空气质量指数必须为整数");
		flag = 1;
	}
	if (flag == 0)
		aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	var trs = document.getElementsByTagName("tr");
	// 使用removeChild()时需注意：需要将trs.length保存在len中，因为每次removeChild()后trs.length会逐步减小，最终将不能删除所有行，只能删除一半的行
	var len = trs.length;
	/*
	不能写成：
	for (var i = 0; i < trs.length; i++) 
		table.removeChild(trs[i]);
	*/
	for (var i = 0; i < len; i++) 
		table.removeChild(trs[0]);// 注意每次只要移除第一行trs[0]即可，不是trs[i]
	if (JSON.stringify(aqiData) != "{}") { // 判断对象是否是空对象
		var data11 = document.createTextNode("城市");
		var data12 = document.createTextNode("空气质量");
		var data13 = document.createTextNode("操作");
		var td11 = document.createElement("td");
		td11.appendChild(data11);
		var td12 = document.createElement("td");
		td12.appendChild(data12);
		var td13 = document.createElement("td");
		td13.appendChild(data13);
		var tr = document.createElement("tr");
		tr.appendChild(td11);
		tr.appendChild(td12);
		tr.appendChild(td13);
		table.appendChild(tr);
	}
	for	(var p in aqiData) {
		var data1 = document.createTextNode(p);
		var data2 = document.createTextNode(aqiData[p]);
		var data3 = document.createTextNode("删除");
		var buttons = document.createElement("button");
		var td1 = document.createElement("td");
		td1.appendChild(data1);
		var td2 = document.createElement("td");
		td2.appendChild(data2);
		buttons.appendChild(data3);
		var td3 = document.createElement("td");
		td3.appendChild(buttons);
		var tr = document.createElement("tr");
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
	var buttons = document.getElementsByTagName("button");
	for (var i = 1; i < buttons.length; i++) 	
		// 需要传递参数的事件绑定：需要在函数名前面加上function()，用大括号括住函数名及其参数，不能直接写成buttons[i].onclick = delBtnHandle(this.getAttribute("id"));
		buttons[i].onclick = function() {delBtnHandle(this);};
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(param) {
	var node = param.parentNode.previousSibling.previousSibling.firstChild.nodeValue;//获取要删除的城市名
	delete aqiData[node];// 由于renderAqiList()是根据aqiData渲染表格，因此删除城市数据应该删除aqiData中的相应城市属性，而不是删除表格的相应<tr>
	renderAqiList();
	//每次删除某个城市数据后会重新渲染表格，此时需要重新为所有删除按钮绑定delBtnHandle事件，否则每次都需要addAqiData()才能删除
	var buttons = document.getElementsByTagName("button");
	for (var i = 1; i < buttons.length; i++) 	
		// 需要传递参数的事件绑定：需要在函数名前面加上function()，用大括号括住函数名及其参数，不能直接写成buttons[i].onclick = delBtnHandle(this.getAttribute("id"));
		buttons[i].onclick = function() {delBtnHandle(this);};
}

function init() {
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	// 本来给aqi-table中的所有删除按钮绑定delBtnHandle事件应该放在此处，但由于删除按钮是在addBtnHandle()中才添加，因此若放在此处则实际上不会绑定成功，因此绑定移动到addBtnHandle()中
}

init();
