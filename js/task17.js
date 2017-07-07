/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = ''
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(500),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"西安": randomBuildData(500),
	"福州": randomBuildData(100),
	"厦门": randomBuildData(100),
	"沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: -1,
	nowGraTime: "day"
}
	
/**
 * 渲染图表
 */
function renderChart(data, type) {
	var ic = document.getElementById("aqi-chart-wrap"); // 作为图表的容器 
	ic.innerHTML = ""; // 删除容器的所有子元素
	var max = 0; // 求所有空气质量指数数据的最大值
	for (var date in data) {
		if (data[date] > max)
			max = data[date];
	}
	var topOffsetPercent = 180 / max; // 计算以最大值为基准的每像素显示比例，百分比 
	var i = 0;
	for (var date in data) { // 循环所有空气质量指数数据 
		var bar = document.createElement("div"); // 创建一个div元素bar 
		bar.id = date + "_" + data[date]; // 为刚刚创建的div元素bar添加id属性（这里把时间，空气质量指数数据写入到id中，后面显示这些信息的时候有用） 
		bar.style.height = Math.round(topOffsetPercent * data[date]) + "px"; // 高度的计算，百分比的基数乘以当前时间的空气质量指数数据，Math.round四舍五入取值
		// 设置元素的left
		if (type == "day") {
			bar.style.width = "10px"; // 每天的div宽度为10px像素
			bar.style.left = (i * 10) + "px"; // 每天的div宽度为10px，那么第i个元素就应该是i*10
		}
		else if (type == "week") {
			bar.style.width = "20px"; // 每周的div宽度为20px像素 
			bar.style.left = (i * 20) + 325 + "px"; // 每周的div宽度为20px，为了让柱形图居中显示，由于ic的宽度为910px，一共13周，可得(910-20*13)/2=325，那么第i个元素就应该是i*20+325
		}
		else {
			bar.style.width = "40px"; // 每月的div宽度为40px像素 
			bar.style.left = (i * 40) + 395 + "px"; // 每月的div宽度为40px，为了让柱形图居中显示，由于ic的宽度为910px，一共3月，可得(910-40*3)/2=395，那么第i个元素就应该是i*40+395
		}
		bar.style.position = "absolute"; // 绝对定位 
		bar.style.overflow = "hidden"; // 超出部分隐藏 
		bar.setAttribute("title", date + "：" + data[date]); // 鼠标移动到柱状图的某个柱子时，用title属性提示这个柱子的具体日期和数据
		bar.setAttribute("class", "bgColor" + Math.floor(Math.random() * 10)); // 为每个柱形产生随机背景颜色
		bar.style.display = "block"; // 块状显示 
		// 距离容器上边框的距离，图表高度200减去当前这个柱状图图表高度 
		bar.style.top = 200 - Math.round(topOffsetPercent * data[date]) + "px"; 
		ic.appendChild(bar); // 将创建的bar元素添加到ic容器中去 
		i++;
	} 	
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
	// 确定是否选项发生了变化 
	var radios = document.getElementsByName("gra-time");
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			type = radios[i].value;
			break;
		}
	}
	if (pageState.nowGraTime != type) { // 比较选中的radio是否与pageState.nowGraTime不同，若不同则表示发生了变化，只有选项发生变化才重新渲染图片
		pageState.nowGraTime = type;
		// 设置对应数据
		var data = [];
		var city = pageState.nowSelectCity;
		if (city == -1)
			city = document.getElementById("city-select").value;;
		if (type == "day")
			data = chartData[city][0];
		else if (type == "week")
			data = chartData[city][1];
		else 
			data = chartData[city][2];
		// 调用图表渲染函数
		renderChart(data, type);
	}
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
	// 确定是否选项发生了变化 
	var city = document.getElementById("city-select").value;
	if (pageState.nowSelectCity != city) { // 比较选中的select是否与pageState.nowSelectCity不同，若不同则表示发生了变化，只有选项发生变化才重新渲染图片
		pageState.nowSelectCity = city;
		// 设置对应数据
		var data = [];
		if (pageState.nowGraTime == "day")
			data = chartData[city][0];
		else if (pageState.nowGraTime == "week")
			data = chartData[city][1];
		else 
			data = chartData[city][2];
		// 调用图表渲染函数
		renderChart(data, type);
	}
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radios = document.getElementsByName("gra-time");
	for (var i = 0; i < radios.length; i++) 
		radios[i].onchange = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var selects = document.getElementById("city-select");
	selects.removeChild(document.getElementsByTagName("option")[0]);
	for (var property in aqiSourceData) {
		var city = document.createTextNode(property);
		var options = document.createElement("option");
		options.appendChild(city);
		selects.appendChild(options);
	}
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	selects.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式
	// 处理好的数据存到 chartData 中
	for (var property in aqiSourceData) {
		var dayData = aqiSourceData[property];
		var datas = [];
		datas.push(dayData); // 将每天的数据存入该城市对应的数组中
		var weekData = [];
		var weekavg = 0;
		var weeksum = 0;
		var count = 0;
		for (var days in dayData) {
			var day = new Date(days).getDay(); // 获取该日期对应星期几
			weeksum += dayData[days];
			count++;
			if (day == 0) { // 若该日期对应星期日，则统计一周的平均值
				weekavg = parseInt(weeksum / count);
				weekData.push(weekavg);
				weekavg = 0;
				weeksum = 0;
				count = 0;
			}
		}
		datas.push(weekData); // 将每周的数据存入该城市对应的数组中
		var preMonth = 0; // preMonth记录上一个日期所属的月份
		var monthData = [];
		var monthavg = 0;
		var monthsum = 0;
		for (var days in dayData) {
			var month = new Date(days).getMonth(); // 获取该日期属于几月
			monthsum += dayData[days];
			count++;
			if (month != preMonth) { // 若该日期所属的月份与上一个日期所属的月份不同，则统计一月的平均值
				monthavg = parseInt(monthsum / count);
				monthData.push(monthavg);
				monthavg = 0;
				monthsum = 0;
				count = 0;
				preMonth = month;
			}
		}
		monthavg = parseInt(monthsum / count);//最后一个月的平均值要单独统计
		monthData.push(monthavg);
		datas.push(monthData); // 将每月的数据存入该城市对应的数组中
		chartData[property] = datas; // 将该城市每天、每周、每月的数据存入chartData中
	}
}

/**
 * 初始化函数
 */
function init() {
	initGraTimeForm()
	initCitySelector();
	initAqiChartData();
}

init();