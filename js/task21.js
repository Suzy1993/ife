document.getElementById("tag").onkeypress = function(e) {
	var ev = e || window.event; // 进行浏览器事件对象获取的兼容。在FireFox或Opera中，e是存在的，e||window.event返回e；在IE中，e是不存在，e||window.event返回window.event
	var key = ev.keyCode || ev.which || ev.charCode; // 为了兼容浏览器按键事件对象的按键码属性。IE只有keyCode属性，FireFox中有which和charCode属性，Opera中有keyCode和which属性
	switch(key) { // 判断输入的是否是空格、回车、逗号
		case 32: // 空格
		case 13: // 回车
		case 44: // 英文逗号
		{  
			var input = document.getElementById("tag").value;
			var tabs = input.split(/[\s\n\r,，]/); // 去掉输入的空格、回车、逗号
			for (var i = 0; i < tabs.length; i++) { // 删除空的Tab
				if (tabs[i] == "" || typeof(tabs[i]) == "undefined") {
					tabs.splice(i, 1);
					i--;
				}
			}
			var norepeatTabs = norepeat(tabs); // Tag不能有重复的，遇到重复输入的Tag，自动忽视
			if (norepeatTabs.length > 10) // 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
				norepeatTabs.splice(0, norepeatTabs.length - 10);
			show(norepeatTabs);  //显示tag
		}
	}
};
function norepeat(contents) {
	var norepeatContents = [];
	for (var i = 0; i < contents.length; i++) {
		if(norepeatContents.indexOf(contents[i]) == -1)
			norepeatContents.push(contents[i]);
	}
	return norepeatContents;
}
function show(tabs) { // 遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面
	var content = "";
	for (var i = 0; i < tabs.length; i++)
		content += "<div class='tags' onmouseover='mouseover(this)' onmouseout='mouseout(this)' onclick='deleteTags(this)'>"+ tabs[i] + "</div>";
	document.getElementById("tags").innerHTML = content;
}
function mouseover(obj) { // 当鼠标悬停在tag上时，tag前增加删除二字，背景色改为蓝色
	obj.innerHTML = "删除" + obj.innerHTML;
	obj.style.background = "blue";
}
function mouseout(obj) { // 当鼠标移出tag时，tag前去除删除二字，背景色改回红色
	obj.innerHTML = obj.innerHTML.slice(2);
	obj.style.background = "red";
}
function deleteTags(obj) { // 点击tag可删除
	document.getElementById("tags").removeChild(obj);
}
function showHobbies() {
	var hobby = document.getElementsByTagName("textarea")[0].value; 
	var hobbies = hobby.split(/[\s\n\r，,、\t]/); // 按照回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等间隔符，拆解成一个个的爱好
	for (var i = 0; i < hobbies.length; i++) { // 删除空的爱好
		if (hobbies[i] == "" || typeof(hobbies[i]) == "undefined") {
			hobbies.splice(i, 1);
			i--;
		}
	}
	var norepeatHobbies = norepeat(hobbies); // 爱好不能重复，去重
	if (norepeatHobbies.length > 10) // 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉
		norepeatHobbies.splice(0, norepeatHobbies.length - 10);
	var content = "";
	for (var i = 0; i < hobbies.length; i++) // 将一个个的爱好显示在textarea下方
		content += "<div class='tags''>"+ hobbies[i] + "</div>";
	document.getElementById("hobbies").innerHTML = content;
}