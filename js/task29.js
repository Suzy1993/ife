document.getElementsByTagName("button")[0].onclick = function() {
	var len = getLength(document.getElementsByTagName("input")[0].value);
	if (len == 0)
		document.getElementsByTagName("div")[0].innerHTML = "名称不能为空";
	else if (len < 4 || len > 16)
		document.getElementsByTagName("div")[0].innerHTML = "字符数为4~16位";
	else
		document.getElementsByTagName("div")[0].innerHTML = "名称格式正确";
};
// 方法一：用正则表达式判断字符是否是汉字
function getLength(value) {
	var len = 0;
	var reg = new RegExp("[u4E00-u9FFF]+","g");
	for (var i = 0; i < value.length; i++) {
		if (reg.test(value.charAt(i))) 
　　　　　	len += 2;
　　　	else  
			len++;
	}
	return len;
}
// 方法二：用Unicode字符范围判断字符是否是汉字
function getLength(value) {
	var len = 0;
	for (var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 255) 
　　　　　	len += 2;
　　　	else  
			len++;
	}
	return len;
}