var schools = {
	"北京": ["清华大学", "北京大学", "北京邮电大学"],
	"上海": ["复旦大学", "同济大学", "上海财经大学"],
	"广州": ["中山大学", "华南理工大学"]
}
var radios = document.getElementsByName("type");
var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var lastType = "在校生"; // 记录单选框上一次的值，以判断是否切换单选框的不同选项
for (var i = 0; i < radios.length; i++) {
	radios[i].onclick = function() {
		if (this.value != lastType) {
			lastType = this.value;
			if (this.value == "在校生") { // 当选择在校生时，出现两个select下拉菜单，一个选择城市，一个选择学校
				form1.style.display = "block";
				form2.style.display = "none";
			}
			else { // 当选择非在校生时，出现一个文本输入框
				form1.style.display = "none";
				form2.style.display = "block";
			}
		}	
	}
}
var city = document.getElementById("city");
city.onchange = function() { // 当城市发生变化时，学校一起发生变化
	var select = document.getElementById("school");
	select.innerHTML = "";
	var selectCity = this.value;
	var schoolArr = schools[selectCity];
	for (var j = 0; j < schoolArr.length; j++) {
		var text = document.createTextNode(schoolArr[j]);
		var option = document.createElement("option");
		option.appendChild(text);
		option.setAttribute("value", schoolArr[j]);
		select.appendChild(option);
	}
}