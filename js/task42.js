var table = document.getElementsByTagName("table")[0];
var tds = table.getElementsByTagName("td");
var month = document.getElementById("month");
var year = document.getElementById("year");
var changeDay = document.getElementById("changeDay");
var changeMonth = document.getElementById("changeMonth");
var changeYear = document.getElementById("changeYear");
var left = document.getElementById("left"); 
var right = document.getElementById("right");
var input = document.getElementById("date");
var dateBegin = document.getElementById("dateBegin");
var dateEnd = document.getElementById("dateEnd");
var calendar = document.getElementById("calendar");
var certain = document.getElementById("certain");
var cancel = document.getElementById("cancel");

window.onload = function() {
	// 初始化日历月份下拉选和切换月份下拉选
	var monthText = "";
	var text = "";
	for (var i = 1; i <= 12; i++) {
		monthText += "<option value=" + i + "月>" + i +"月</option>"; 
		text += "<option value=" + i + ">" + i +"</option>";
	}
	month.innerHTML = monthText;
	changeMonth.innerHTML = text;

	// 初始化日历年份下拉选和切换年份下拉选
	var yearText = "";
	for (var i = 1990; i <= 2090; i++)
		yearText += "<option value=" + i + ">" + i +"</option>";
	year.innerHTML = yearText;
	changeYear.innerHTML = yearText;

	// 日历月份下拉选的值一旦变化，立即更新日期列表，默认选中1日
	month.onchange = function() {
		showDate(parseInt(year.value), month.value.slice(0, -1), 1);
	}
	// 日历年份下拉选的值一旦变化，立即更新日期列表，默认选中1日
	year.onchange = function() {
		showDate(parseInt(year.value), month.value.slice(0, -1), 1);
	}

	// 切换日期下拉选的下拉列表初始化为1990年1月的日期选项
	showchangeDay(1990, 1); 
	// 切换月份下拉选的值一旦变化，立即更新切换日期下拉选的下拉列表
	changeMonth.onchange = function() { 
		showchangeDay(changeYear.value, changeMonth.value);
	}
	// 切换年份下拉选的值一旦变化，立即更新切换日期下拉选的下拉列表
	changeYear.onchange = function() { 
		showchangeDay(changeYear.value, changeMonth.value);
	}

 	// 切换到上月
	left.onclick = function() {
		if (month.value.slice(0, -1) > "1") // 当月不是1月
			month.value = month.value.slice(0, -1) -'0' - 1 + "月";
		else { // 当月是1月，需切换到前一年的12月
			month.value = "12月";
			year.value = parseInt(year.value) - 1;
		}
		showDate(parseInt(year.value), month.value.slice(0, -1), 1); // 显示上月的日期列表，默认选中1日
	}
	// 切换到下月
	right.onclick = function() {
		if (month.value.slice(0, -1) != "12") // 当月不是12月
			month.value = month.value.slice(0, -1) -'0' + 1 + "月";
		else { // 当月是12月，需切换到后一年的1月
			month.value = "1月";
			year.value = parseInt(year.value) + 1;
		}
		showDate(parseInt(year.value), month.value.slice(0, -1), 1); // 显示上月的日期列表，默认选中1日
	}

	// 显示当前日期
	var date = new Date();
	year.value = date.getFullYear(); // 更新年份下拉选的选中值
	month.value = date.getMonth() + 1 + "月"; // 更新月份下拉选的选中值
	showDate(date.getFullYear(), date.getMonth() + 1, date.getDate()); // 显示当月的日期列表，并选中当日

	// 为选择一个日期的日历组件当前显示的每一个日期添加单击切换事件
	function bindOneDate() {
		for (var i = 0; i < tds.length; i++) {
			tds[i].onclick = function() {
				var value = ""; 
				switch(this.getAttribute("name")) { // 根据单击日期的name属性判断该日期是上月、当月还是下月的日期
					case "last": // 上月
						if (month.value == "1月") { // 当月是1月，需同时更新日历年份下拉选和日历月份下拉选的选中值，显示上月的日期列表，并选中当日
							value = value + (parseInt(year.value) - 1) + "-12-" + this.firstChild.nodeValue;
							year.value = parseInt(year.value) - 1;
							month.value = "12月";
							showDate(parseInt(year.value) - 1, 12, this.firstChild.nodeValue);
						}
						else { // 当月不是1月，只需更新日历月份下拉选的选中值，显示上月的日期列表，并选中当日
							value = value + parseInt(year.value) + "-" + (month.value.slice(0, -1) - '0' - 1) + "-" + this.firstChild.nodeValue;	
							month.value = month.value.slice(0, -1) - '0' - 1 + "月";
							showDate(parseInt(year.value), month.value.slice(0, -1), this.firstChild.nodeValue);
						}
						break;
					case "current": // 当月，不需更新日历年份下拉选和日历月份下拉选的选中值
						value = value + parseInt(year.value) + "-" + month.value.slice(0, -1) + "-"  + this.firstChild.nodeValue; 
						showDate(parseInt(year.value), month.value.slice(0, -1), this.firstChild.nodeValue); // 选中当日
						break;
					case "next": // 下月
						if (month.value == "12月") { // 当月是12月，需同时更新日历年份下拉选和日历月份下拉选的选中值，显示下月的日期列表，并选中当日
							value = value + (parseInt(year.value) + 1) + "-1-" + this.firstChild.nodeValue;
							year.value = parseInt(year.value) + 1;
							month.value = "1月";
							showDate(parseInt(year.value) + 1, 1, this.firstChild.nodeValue);
						}
						else { // 当月不是12月，只需更新日历月份下拉选的选中值，显示下月的日期列表，并选中当日
							value = value + parseInt(year.value) + "-" + (month.value.slice(0, -1) - '0' + 1) + "-" + this.firstChild.nodeValue;
							month.value = month.value.slice(0, -1) - '0' + 1 + "月";	
							showDate(parseInt(year.value), month.value.slice(0, -1), this.firstChild.nodeValue);
						}
						break;
				}
				input.value = value; // 将切换到的日期填入文本框
				calendar.style.display = "none"; // 隐藏日历面板
			}
		}
	}

	// 为选择一段日期的日历组件当前显示的每一个日期添加单击切换事件
	function bindSomeDate() {
		var selectNum = 0;
		var firstDate;
		for (var i = 0; i < tds.length; i++) {
			tds[i].onclick = function() {
				//清空起止日期的显示文本框
				dateBegin.value = "";
				dateEnd.value = "";
				if (this.getAttribute("name") != "current") {
					alert("请选择当月日期");
					return;
				}
				selectNum++;
				var value = ""; 
				switch(this.getAttribute("name")) { // 根据单击日期的name属性判断该日期是上月、当月还是下月的日期
					case "last": // 上月
						if (month.value == "1月") { // 当月是1月，需同时更新日历年份下拉选和日历月份下拉选的选中值，显示上月的日期列表，并选中当日
							value = value + (parseInt(year.value) - 1) + "-12-" + this.firstChild.nodeValue;
							year.value = parseInt(year.value) - 1;
							month.value = "12月";
							showDate(parseInt(year.value) - 1, 12, this.firstChild.nodeValue);
						}
						else { // 当月不是1月，只需更新日历月份下拉选的选中值，显示上月的日期列表，并选中当日
							value = value + parseInt(year.value) + "-" + (month.value.slice(0, -1) - '0' - 1) + "-" + this.firstChild.nodeValue;	
							month.value = month.value.slice(0, -1) - '0' - 1 + "月";
							showDate(parseInt(year.value), month.value.slice(0, -1), this.firstChild.nodeValue);
						}
						break;
					case "current": // 当月，不需更新日历年份下拉选和日历月份下拉选的选中值
						value = value + parseInt(year.value) + "-" + month.value.slice(0, -1) + "-"  + this.firstChild.nodeValue; 
						showDate(parseInt(year.value), month.value.slice(0, -1), this.firstChild.nodeValue); // 选中当日
						break;
					case "next": // 下月
						if (month.value == "12月") { // 当月是12月，需同时更新日历年份下拉选和日历月份下拉选的选中值，显示下月的日期列表，并选中当日
							value = value + (parseInt(year.value) + 1) + "-1-" + this.firstChild.nodeValue;
							year.value = parseInt(year.value) + 1;
							month.value = "1月";
							showDate(parseInt(year.value) + 1, 1, this.firstChild.nodeValue);
						}
						else { // 当月不是12月，只需更新日历月份下拉选的选中值，显示下月的日期列表，并选中当日
							value = value + parseInt(year.value) + "-" + (month.value.slice(0, -1) - '0' + 1) + "-" + this.firstChild.nodeValue;
							month.value = month.value.slice(0, -1) - '0' + 1 + "月";	
							showDate(parseInt(year.value), month.value.slice(0, -1), this.firstChild.nodeValue);
						}
						break;
				}
				if (selectNum == 1) // 选择的是第一个日期
					firstDate = value;
				else { // 选择的是第二个日期，两个日期中，较早的为起始时间，较晚的为结束时间
					if (judgeDate(firstDate, value) == -1) { // 第一个日期较早，为起始时间
						dateBegin.value = firstDate;
						dateEnd.value = value;
					}
					else{ // 第二个日期较早，为起始时间
						dateBegin.value = value;
						dateEnd.value = firstDate;
					}
					selectNum = 0; // 还原为未选择任何日期的状态
				}
			}
		}
	}

	//为切换按钮添加单击事件
	document.getElementsByTagName("button")[0].onclick = function() {
		showDate(changeYear.value, changeMonth.value, changeDay.value); // 显示当月的日期列表，并选中当日
		year.value = changeYear.value; // 更新年份下拉选的选中值
		month.value = changeMonth.value + "月"; // 更新月份下拉选的选中值
		input.value = changeYear.value + "-" + changeMonth.value + "-" + changeDay.value; // 将切换日期填入文本框
		for (var i = 0; i < tds.length; i++) { // 查找当月的当日对应的列表选项，将其背景色修改为选中色
			if (changeDay.value == tds[i].firstChild.nodeValue && tds[i].getAttribute("name") == "current")
				tds[i].style.background = "#dddddd";
		}
		calendar.style.display = "block"; // 显示日历面板
		certain.style.display = "none"; // 隐藏确认按钮
		cancel.style.display = "none"; // 隐藏取消按钮
		bindOneDate();
	}

	// 点击选择一个日期的日期显示框，会浮出日历面板，再点击则隐藏
	input.onclick = function() {
		if (calendar.style.display == "none") {
			calendar.style.display = "block";
			certain.style.display = "none"; // 隐藏确认按钮
			cancel.style.display = "none"; // 隐藏取消按钮
			bindOneDate();
		}
		else
			calendar.style.display = "none";
	}
	// 点击选择一段日期的起始日期显示框，会浮出日历面板，再点击则隐藏
	dateBegin.onclick = function() {
		if (calendar.style.display == "none") {
			calendar.style.display = "block";
			certain.style.display = "block"; // 显示确认按钮
			cancel.style.display = "block"; // 显示取消按钮
			bindSomeDate();
		}
		else
			calendar.style.display = "none";
	}
	// 点击选择一段日期的终止日期显示框，会浮出日历面板，再点击则隐藏
	dateEnd.onclick = function() {
		if (calendar.style.display == "none") {
			calendar.style.display = "block";
			certain.style.display = "block"; // 显示确认按钮
			cancel.style.display = "block"; // 显示取消按钮
			bindSomeDate();
		}
		else
			calendar.style.display = "none";
	}

	// 为确定按钮添加单击事件，选择的时间段用特殊样式标示：背景色为#cccccc
	certain.onclick = function() {
		var flag = 0;
		if (dateBegin.value != "" && dateEnd.value != "") {
			for (var i = 0; i < tds.length; i++) {
				if (judge(dateBegin.value, tds[i])) {
					tds[i].style.background = "#cccccc";
					flag = 1;
				}
				if (judge(dateEnd.value, tds[i])) {
					tds[i].style.background = "#cccccc";
					flag = 0;
				}
				if (flag == 1)
					tds[i].style.background = "#cccccc";
			}
		}
		else
			alert("请选择起止日期");
	}

	// 为取消按钮添加单击事件
	cancel.onclick = function() {
		dateBegin.value = "";
		dateEnd.value = "";
		bindSomeDate();
		for (var i = 0; i < tds.length; i++) 
			tds[i].style.background = "#ffffff";
	}

	//判断td所对应的日期是否在选择的时间段内
	function judge(value, td) {
		var values = value.split("-");
		if (td.firstChild.nodeValue != values[2])
			return false;
		if (td.getAttribute("name") != "current") // 仅能选择当月的一段日期
			return false;
		return true;
	}

	// 判断两个日期中哪个较早
	function judgeDate(date1, date2) {
		var date_1 = date1.split("-");
		var date_2 = date2.split("-");
		if (parseInt(date_1[2]) == parseInt(date_2[2]))
			return 0;
		else if (parseInt(date_1[2]) > parseInt(date_2[2]))
			return 1;
		else
			return -1;
	}

	// 显示指定月份的当月日期下拉列表
	function showchangeDay(year, month) {
		changeDay.innerHTML = "";
		var dayText = "";
		var days = new Date(year, month, 0).getDate(); // 获取该月一共有多少天：下个月的第0天即为当月的最后一天
		for (var i = 1; i <= days; i++)
			dayText += "<option value=" + i + ">" + i +"</option>";
		changeDay.innerHTML = dayText;
	}

	// 显示指定日期的当月日期列表，并选中指定日期
	function showDate(year, month, day) {
		var firstDay = new Date();
		firstDay.setFullYear(year, month - 1, 1);
		var weekday = firstDay.getDay(); // 获取该月第一天是星期几
		var tdBegin = 0; 
		if (weekday == 0) // 若该月第一天是星期日，本月的列表填充不是从weekday开始，而是从weekday + tdBegin开始
 			tdBegin = 7;
		for (var i = 0; i < 42; i++) {
			tds[i].innerHTML = ""; // 清空日期列表
			tds[i].style.color = "#000000"; // 还原所有选项的文字颜色
			tds[i].style.background = "#ffffff"; // 还原所有选项的背景颜色
		}
		var days = new Date(year, month, 0).getDate(); // 获取该月一共有多少天：下个月的第0天即为当月的最后一天
		//要显示的列表填充，根据上月、本月、下月分别设置对应的name属性，为上月、下月的日期显示文字设置不同颜色
		for (var i = 0; i < (weekday + tdBegin); i++) { // 上月的列表填充，从0到weekday + tdBegin - 1
			var temp = new Date();
			temp.setFullYear(year, month - 1, -i); // 第3个参数为0获取上月的最后一天，为1获取上月的倒数第二天，依次类推
			tds[(weekday + tdBegin) - i - 1].innerHTML = temp.getDate(); // 在相应位置填入当前日期
			tds[(weekday + tdBegin) - i - 1].style.color = "#aaaaaa"; // 上月的日期显示文字设置不同颜色#aaaaaa
			tds[(weekday + tdBegin) - i - 1].setAttribute("name", "last"); // 上月的name属性设置为last
		}
		for (var i = 1; i <= days; i++) { // 本月的列表填充，从weekday + tdBegin开始
			var temp = new Date();
			temp.setFullYear(year, month - 1, i);
			tds[weekday + tdBegin].innerHTML = temp.getDate(); // 在相应位置填入当前日期
			tds[weekday + tdBegin].setAttribute("name", "current"); // 本月的name属性设置为current
			if (temp.getDate() == day)
				tds[weekday + tdBegin].style.background = "#dddddd";
			weekday++;
		}
		for (var i = 0; i < 42 - (weekday + tdBegin); i++) { // 下月的列表填充，从0到42 - (weekday + tdBegin) - 1
			var temp = new Date();
			temp.setFullYear(year, month - 1, days + i + 1); // days为本月天数，第3个参数为days + 1获取下月的第一天，为days + 2获取下月的第二天，依次类推
			tds[(weekday + tdBegin) + i].innerHTML = temp.getDate(); // 在相应位置填入当前日期
			tds[(weekday + tdBegin) + i].style.color = "#aaaaaa"; // 下月的日期显示文字设置不同颜色#aaaaaa
			tds[(weekday + tdBegin) + i].setAttribute("name", "next"); // 下月的name属性设置为next
		}
	}
}