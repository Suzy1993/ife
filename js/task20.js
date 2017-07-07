function left_in(){
	var content = document.getElementsByTagName("textarea")[0].value; // 获取多行文本框的输入内容
	// [\u4e00-\u9fa5]+表示至少匹配一个汉字
	// 除数字、字母、汉字外的字符都作为分隔符
	var contents = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // 获取父元素的所有子div
	var childrenLen = childrenElement.length; // 随着新内容的添加，childrenElement.length会递增，为了避免影响循环次数，将其保存在childrenLen中
	var contentsLen = contents.length; // 建议所有的length属性都先保存在一个变量中
	if (contents[contentsLen - 1] == "") { // 若内容的末尾是分隔符，则最后一个内容将是空串，此时要去掉最后一个内容，并将contentsLen减一
		contents.length = contentsLen - 1; // 通过减小数组长度删除最后一个内容
		contentsLen = contents.length; // 更新数组长度
	}
	for (var i = 0; i < childrenLen; i++) // 更新原有的所有子div的左偏移
		childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' + 120 * contentsLen + "px";
	for (var i = 0; i < contentsLen; i++) { // 循环添加每一个内容
		var textNode = document.createTextNode(contents[i]); // 创建文本节点
		var divElement = document.createElement("div"); // 创建div
		divElement.appendChild(textNode); // 文本节点添加到div
		divElement.style.left = (contentsLen - i - 1) * 120 + "px"; // 设置每一个内容的左偏移
		divElement.setAttribute("class","box"); // 为当前内容添加样式类
		divElement.onclick = function() {deleteElement(this)}; // 为当前内容添加删除方法
		parentElement.insertBefore(divElement, childrenElement[0]); // 将当前内容添加到第一个子div的前面，注意childrenElement[0]会随着内容的添加而改变
	}
}
function right_in(){
	var content = document.getElementsByTagName("textarea")[0].value; // 获取多行文本框的输入内容
	// [\u4e00-\u9fa5]+表示至少匹配一个汉字
	// 除数字、字母、汉字外的字符都作为分隔符
	var contents = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // 获取父元素的所有子div
	var childrenLen = childrenElement.length; // 随着新内容的添加，childrenElement.length会递增，为了避免影响循环次数，将其保存在childrenLen中
	var contentsLen = contents.length; // 建议所有的length属性都先保存在一个变量中
	if (contents[contentsLen - 1] == "") { // 若内容的末尾是分隔符，则最后一个内容将是空串，此时要去掉最后一个内容，并将contentsLen减一
		contents.length = contentsLen - 1; // 通过减小数组长度删除最后一个内容
		contentsLen = contents.length; // 更新数组长度
	}
	for (var i = 0; i < contentsLen; i++) { // 循环添加每一个内容
		var textNode = document.createTextNode(contents[i]); // 创建文本节点
		var divElement = document.createElement("div"); // 创建div
		divElement.appendChild(textNode); // 文本节点添加到div
		if (childrenLen == 0) // 若没有原有的子div，则设置每个内容的左偏移为其索引的120倍关系
			divElement.style.left = 120 * i + "px";
		else // 若原有子div存在，则以最后一个子div的左偏移为基准，设置每个内容的左偏移为其索引加一的120倍关系
			divElement.style.left = childrenElement[childrenLen - 1].style.left.slice(0, -2) -'0' + 120 * (i + 1) + "px";
		divElement.setAttribute("class","box"); // 为当前内容添加样式类
		divElement.onclick = function() {deleteElement(this)}; // 为当前内容添加删除方法
		parentElement.appendChild(divElement); // 将当前内容添加到最后
	}
}
function left_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // 获取父元素的所有子div
	var childrenLen = childrenElement.length; // 随着新内容的添加，childrenElement.length会递增，为了避免影响循环次数，将其保存在childrenLen中
	if (childrenLen != 0) {
		for (var i = 1; i < childrenLen; i++) // 从第一个内容开始，每个内容的左偏移减少120px
			childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' - 120 + "px";
		alert(childrenElement[0].firstChild.nodeValue); // 弹窗显示删除的内容中的数值
		parentElement.removeChild(childrenElement[0]); // 移除第一个内容
	}
}
function right_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // 获取父元素的所有子div
	var childrenLen = childrenElement.length; // 随着新内容的添加，childrenElement.length会递增，为了避免影响循环次数，将其保存在childrenLen中
	if (childrenLen != 0) {
		alert(childrenElement[childrenLen - 1].firstChild.nodeValue); // 弹窗显示删除的内容中的数值
		parentElement.removeChild(childrenElement[childrenLen - 1]); // 移除最后一个内容
	}
}
function deleteElement(node){
	var parentElement = document.getElementById("boxes");
	var next = node.nextSibling;
	while (next != null) { // 从待删除内容的下一个内容开始，每个内容的左偏移减少120px
		next.style.left = next.style.left.slice(0, -2) -'0' - 120 + "px";
		next = next.nextSibling;
	}
	alert(node.firstChild.nodeValue); // 弹窗显示删除的元素中的数值
	parentElement.removeChild(node); // 移除待删除内容
}
function search(){
	var search_text = document.getElementById("text").value; // 获取文本输入框的内容
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // 获取父元素的所有子div
	var childrenLen = childrenElement.length; // 随着新内容的添加，childrenElement.length会递增，为了避免影响循环次数，将其保存在childrenLen中
	for (var i = 0; i < childrenLen; i++) { // 遍历所有内容，若待查询词为当前内容的子串，则文字颜色修改为蓝色，否则改回白色
		if (childrenElement[i].firstChild.nodeValue.indexOf(search_text) != -1) 
			childrenElement[i].style.color="blue";
		else	
			childrenElement[i].style.color="white";
	}
}