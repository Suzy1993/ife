var buttons = document.getElementsByTagName('button');
var city = document.getElementById('city');
var nodes = [];
var interval = null;
var value;
buttons[0].onclick = function() {
	value = document.getElementsByTagName('input')[0].value;
	clear();
	deepTraversal(city);
	display();
}
buttons[1].onclick = function() {
	value = document.getElementsByTagName('input')[0].value;
	clear();
	wideTraversal(city);
	display(); 
}
// 重置所有div的背景颜色为白色
function clear() {
	nodes = [];
	clearInterval(interval);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) 
		divs[i].style.background = "white";
}
//深度优先遍历的递归写法
function deepTraversal(node) {
	if (node != null) {  
        nodes.push(node);  
        var children = node.children;  
        for (var i = 0; i < children.length; i++)  
            deepTraversal(children[i]);  
    }  
}
/*
深度优先遍历的非递归写法
function deepTraversal(node) {
	if (node != null) {
		var stack = [];
		stack.push(node);
		while (stack.length != 0) {
			var item = stack.pop();
			nodes.push(item);
			var children = item.children;
			for (var i = children.length - 1; i >= 0; i--)
				stack.push(children[i]);
		}
	}  
}
*/
/*
广度优先遍历的递归写法：
报错：Maximum call stack size exceeded(…)
function wideTraversal(node) {
	var i = 0;
	if (!(node == null)) {
		nodes.push(node);
		wideTraversal(node.nextElementSibling);
		node = nodes[i++];
		wideTraversal(node.firstElementChild);
	}
}
*/
//广度优先遍历的非递归写法
function wideTraversal(selectNode) {
	if (selectNode != null) {
		var queue = [];
		queue.unshift(selectNode);
		while (queue.length != 0) {
			var item = queue.shift();
			nodes.push(item);
			var children = item.children;
			for (var i = 0; i < children.length; i++)
				queue.push(children[i]);
		}
	}
}
function display() {
	var i = 0;
	var flag = 0;
	// 当前被遍历到的节点做一个特殊显示：背景颜色变为红色
	nodes[i].style.background = 'red'; 
	if (nodes[i].firstChild.nodeValue == value) {
		nodes[i].style.background = 'blue';
		flag = 1;
	}
	// 每隔1s再遍历下一个节点
	interval = setInterval(function() {
		i++;
		if (i < nodes.length) {
			if (nodes[i - 1].firstChild.nodeValue != value)
				nodes[i - 1].style.background = 'white';
			nodes[i].style.background = 'red';
			if (nodes[i].firstChild.nodeValue == value) {
				nodes[i].style.background = 'blue';
				flag = 1;
			}
		} 
		else {
			nodes[nodes.length - 1].style.background = 'white';
			if (flag == 0)
				alert("Not found!");
			clearInterval(interval);
			return;
		}
	}, 1000);
}