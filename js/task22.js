var buttons = document.getElementsByTagName('input');
var rootNode = document.getElementsByClassName('root')[0];
var nodes = [];
var interval = null;
buttons[0].onclick = traversal;
buttons[1].onclick = function() {
	clear();
	preOrder(rootNode);
	display();
}
buttons[2].onclick = function() {
	clear();
	inOrder(rootNode);
	display(); 
}
buttons[3].onclick = function() {
	clear();
	postOrder(rootNode);
	display();
}
// 重置所有div的背景颜色为白色
function clear() {
	nodes = [];
	clearInterval(interval);
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) 
		divs[i].style.backgroundColor = "white";
}
// 此方法针对不同的DOM结构需作一定的修改，且只实现了后序遍历，中序遍历和前序遍历不易实现
function traversal() {	
	var i = 0, j = 0, k = 0, m = 0;
	var ones = document.getElementsByClassName("one");
	var interval = setInterval(function() {
		if (i < ones.length) {
			var twos = ones[i].getElementsByClassName("two");
			if (j < twos.length) {
				var threes = twos[j].getElementsByClassName("three");
				if (k < threes.length) {
					var fours = threes[k].getElementsByClassName("four");
					if (m < fours.length) {
						// setTimeout()会等待指定事件，在等待期间下面的代码m++会执行，fours[m]会改变，因此用temp暂时保存fours[m]
						var temp = fours[m]; 
						temp.style.background = "red";
						setTimeout(function() {
							temp.style.background = "white";
						}, 2000);
						m++;
					}
					else {
						var temp = threes[k];
						temp.style.background = "red";
						setTimeout(function() {
							temp.style.background = "white";
						}, 2000);
						k++;
						m = 0;
					}
				}
				else {
					var temp = twos[j];					
					temp.style.background = "red";
					setTimeout(function() {
						temp.style.background = "white";
					}, 2000);
					j++;
					k = 0;
				}
			}
			else {
				var temp = ones[i];	
				temp.style.background = "red";
				setTimeout(function() {
					temp.style.background = "white";
				}, 2000);
				i++;
				j = 0;
			}
		}
		else {
			document.getElementsByClassName("root")[0].style.background = "red";
			setTimeout(function() {
				document.getElementsByClassName("root")[0].style.background = "white";
			}, 2000);
			clearInterval(interval); 
			return;
		}
	}, 2000);
}
function preOrder(node) {
	if (node != null) {
		nodes.push(node);
		preOrder(node.firstElementChild);
		// 在页面中展现一颗二叉树的结构，但需要考虑某些div只有一个子节点的情况
		if (node.firstElementChild != node.lastElementChild) 
			preOrder(node.lastElementChild);
	}
}
function inOrder(node) {
	if (node != null) {
		inOrder(node.firstElementChild);
		nodes.push(node);
		if (node.firstElementChild != node.lastElementChild)
			inOrder(node.lastElementChild);
	}
}
function postOrder(node) {
	if (node != null) {
		postOrder(node.firstElementChild);
		if (node.firstElementChild != node.lastElementChild)
			postOrder(node.lastElementChild);
		nodes.push(node);
	}
}
function display() {
	var i = 0;
	// 当前被遍历到的节点做一个特殊显示：背景颜色变为红色
	nodes[i].style.background = 'red'; 
	// 每隔1s再遍历下一个节点
	interval = setInterval(function() {
		i++;
		if (i < nodes.length) {
			nodes[i - 1].style.background = 'white';
			nodes[i].style.background = 'red';
		} 
		else {
			nodes[nodes.length - 1].style.background = 'white';
			clearInterval(interval);
		}
	}, 1000);
}