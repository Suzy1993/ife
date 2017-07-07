var buttons = document.getElementsByTagName('button');
var divs = document.getElementsByTagName('div');
var city = document.getElementById("city");
var nodes, node; // 全局nodes记录深度优先遍历的得到的节点列表，全局node记录当前选中的节点
for (var i = 0; i < divs.length; i++) {
	divs[i].onclick = function(event) { // event的作用：取消事件冒泡 
		select(event, this);
	};
}
// 当选中某个节点元素后，点击增加按钮，则在该节点下增加一个子节点，节点内容为输入框中内容，插入在其子节点的最后一个位置
buttons[0].onclick = function() {
	var value = document.getElementsByTagName('input')[0].value;
	deepTraversal(city);
	var textNode = document.createTextNode(value);
	var divNode = document.createElement("div");
	divNode.setAttribute("class", "direction"); // 为增加的节点添加样式
	divNode.appendChild(textNode);
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i] == node) {
			nodes[i].appendChild(divNode);
			divNode.onclick = function(event) { // 为增加的节点添加点击呈现一个特殊被选中的样式的事件
				select(event, this);
			};
			break;
		}
	}
	clear();
}
// 当选中某个节点元素后，点击删除按钮，则将该节点及其所有子节点删除掉
buttons[1].onclick = function() {
	deepTraversal(city);
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i] == node) {
			for (var j = 0; j < nodes[i].children.length; j++)
				nodes[i].removeChild(nodes[i].children[j]);
			nodes[i].parentNode.removeChild(nodes[i]);
			break;
		}
	}
	clear();
}
// 点击某个节点元素selectNode，则该节点元素呈现一个特殊被选中的样式：背景颜色变为蓝色
function select(e, selectNode) {  
	// 取消事件冒泡    
	if (e && e.stopPropagation)
		e.stopPropagation(); // 非IE浏览器
	else  
		window.event.cancelBubble=true; // IE浏览器
	deepTraversal(city);
	node = selectNode;
	for (var i = 0; i < nodes.length; i++) 
		if (nodes[i] == selectNode)
			nodes[i].style.background = "blue";
	clear();
}
// 重置所有div的背景颜色为白色
function clear() {
	node = null; // 清空深度优先遍历的得到的节点列表
	nodes = []; // 设置所有节点为未选中状态
	for (var i = 0; i < divs.length; i++) 
		divs[i].style.background = "white";
}
// 深度优先遍历
function deepTraversal(root) {
	if (root != null) {  
        nodes.push(root);  
        var children = root.children;  
        for (var i = 0; i < children.length; i++)  
            deepTraversal(children[i]);  
    }  
}