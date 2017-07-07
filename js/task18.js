function left_in(){
	var number = document.getElementById("text").value;
	if (isNaN(number)) 
		alert("请输入数字");
	else {
		var textNode = document.createTextNode(number);
		var divElement = document.createElement("div");
		divElement.appendChild(textNode);
		divElement.style.left = "0px";
		var parentElement = document.getElementById("boxes");
		var childrenElement = parentElement.getElementsByTagName("div");
		var childrenLen = childrenElement.length; 
		for (var i = 0; i < childrenLen; i++) 
			childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' + 120 + "px";
		divElement.setAttribute("class","box");
		divElement.onclick = function() {deleteElement(this)};
		parentElement.insertBefore(divElement, childrenElement[0]);
	}
}
function right_in(){
	var number = document.getElementById("text").value;
	if (isNaN(number)) 
		alert("请输入数字");
	else {
		var textNode = document.createTextNode(number);
		var divElement = document.createElement("div");
		divElement.appendChild(textNode);
		var parentElement = document.getElementById("boxes");
		var childrenElement = parentElement.getElementsByTagName("div");
		var childrenLen = childrenElement.length; 
		if (childrenLen == 0)
			divElement.style.left = "0px";
		else
			divElement.style.left = childrenElement[childrenLen - 1].style.left.slice(0, -2) -'0' + 120 + "px";
		divElement.setAttribute("class","box");
		divElement.onclick = function() {deleteElement(this)};
		parentElement.appendChild(divElement);
	}
}
function left_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div");
	var childrenLen = childrenElement.length;
	if (childrenLen != 0) {
		for (var i = 1; i < childrenLen; i++)
			childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' - 120 + "px";
		alert(childrenElement[0].firstChild.nodeValue);
		parentElement.removeChild(childrenElement[0]);
	}
}
function right_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div");
	var childrenLen = childrenElement.length;
	if (childrenLen != 0) {
		alert(childrenElement[childrenLen - 1].firstChild.nodeValue);
		parentElement.removeChild(childrenElement[childrenLen - 1]);
	}
}
function deleteElement(node){
	var parentElement = document.getElementById("boxes");
	var next = node.nextSibling;
	while (next != null) {
		next.style.left = next.style.left.slice(0, -2) -'0' - 120 + "px";
		next = next.nextSibling;
	}
	parentElement.removeChild(node);
	alert(node.firstChild.nodeValue);
}