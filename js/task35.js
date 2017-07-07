var line = document.getElementById("line");
var textarea = document.getElementsByTagName("textarea")[0];
var commands = ['GO', 'TUN LEF', 'TUN RIG', 'TUN BAC', 'TRA LEF','TRA TOP','TRA RIG','TRA BOT','MOV LEF','MOV TOP','MOV RIG','MOV BOT'];
var commandWithParams = ['TRA LEF','TRA TOP','TRA RIG','TRA BOT','MOV LEF','MOV TOP','MOV RIG','MOV BOT'];
textarea.onkeypress = function(e) {
	var ev = e || window.event; 
	var key = ev.keyCode || ev.which || ev.charCode;
	line.innerHTML = "";
	var cmds = this.value.trim().split('\n');
	for (var i = 0; i < cmds.length; i++) { // textarea左侧有一列可以显示当前行数的列（代码行数列），列数保持和textarea中一致
		var lineText = document.createTextNode(i + 1);
		var div = document.createElement("div");
		div.appendChild(lineText);
		div.setAttribute("class", "line");
		div.style.top = 20 * i + "px";
		div.style.marginTop = - textarea.scrollTop + "px"; // 当textarea发生上下滚动时，代码行数列同步滚动
		line.appendChild(div);
	}
	if (key == 13) { // 输入的是回车
		var lineClass = document.getElementsByClassName('line'); 
		for (var i = 0; i < cmds.length; i++) { // 判断指令是否合法，不合法的指令给出提示（背景色为红色）
			var cmd0 = cmds[i].trim().split(" ");
			var cmd = [];
			for (var j = 0; j < cmd0.length; j++) {
				if (cmd0[j] != "")
					cmd.push(cmd0[j]);
			}
			if (!(cmd.length == 1 && cmd[0] == "GO" || cmd.length == 2 && cmd[0] == "GO" && cmd[1] >= '0' && cmd[1] <= '9' || cmd.length == 2 && commands.indexOf(cmd[0] + " " + cmd[1]) != -1 || cmd.length == 3 && commandWithParams.indexOf(cmd[0] + " " + cmd[1]) != -1 && cmd[2] >= '0' && cmd[2] <= '9'))
				lineClass[i].style.background = "red";
		}
	}
}
textarea.onscroll = function() { // 当textarea发生上下滚动时，代码行数列同步滚动
	var lineClass = document.getElementsByClassName('line'); 
	for (var i = 0; i < lineClass.length; i++)
		lineClass[i].style.marginTop = -textarea.scrollTop + "px";
}
document.getElementsByTagName("button")[0].onclick = function() {
	var cmds = textarea.value.trim().split('\n');
	var flag = 0; // 标记是否存在合法指令，若不存在则给出提示
	for (var i = 0; i < cmds.length; i++) {
		var cmd0 = cmds[i].trim().split(" ");
		var cmd = [];
		for (var j = 0; j < cmd0.length; j++) {
			if (cmd0[j] != "")
				cmd.push(cmd0[j]);
		}
		if (cmd.length > 3)
			continue;
		if (cmd.length == 1 && cmd[0] == "GO") {
			flag = 1; 
			go(1); 
		}
		if (cmd.length == 2 && cmd[0] == "GO" && cmd[1] >= '0' && cmd[1] <= '9') {
			flag = 1; 
			go(cmd[1]); 
		}
		else {
			if (cmd.length == 2)
				cmd[2] = 1;
			if (!(cmd[2] >= '0' && cmd[2] <= '9')) 
				continue;
			if (cmd.length == 3 && (cmd[0] + " " + cmd[1] == "TUN LEF" || cmd[0] + " " + cmd[1] == "TUN RIG" || cmd[0] + " " + cmd[1] == "TUN BAC"))
				continue;
			switch(cmd[0] + " " + cmd[1]) {
				case "TUN LEF": flag = 1; tun_lef(); break;
				case "TUN RIG": flag = 1; tun_rig(); break;
				case "TUN BAC": flag = 1; tun_bac(); break;
				case "TRA LEF": flag = 1; tra_lef(cmd[2]); break;
				case "TRA TOP": flag = 1; tra_top(cmd[2]); break;
				case "TRA RIG": flag = 1; tra_rig(cmd[2]); break;
				case "TRA BOT": flag = 1; tra_bot(cmd[2]); break;
				case "MOV LEF": flag = 1; mov_lef(cmd[2]); break;
				case "MOV TOP": flag = 1; mov_top(cmd[2]); break;
				case "MOV RIG": flag = 1; mov_rig(cmd[2]); break;
				case "MOV BOT": flag = 1; mov_bot(cmd[2]); break;
			}
		}
	}
	if (flag == 0)
		alert("请输入如下合法的命令！\nGO：向蓝色边所面向的方向前进一格\nTUN LEF：向左转（逆时针旋转90度）\nTUN RIG：向右转（顺时针旋转90度）\nTUN BAC：向右转（旋转180度）\nTRA LEF：向屏幕的左侧移动一格，方向不变\nTRA TOP：向屏幕的上面移动一格，方向不变\nTRA RIG：向屏幕的右侧移动一格，方向不变\nTRA BOT：向屏幕的下面移动一格，方向不变\nMOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格\nMOV TOP：方向转向屏幕上面，向屏幕的上面移动一格\nMOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格\nMOV BOT：方向转向屏幕下面，向屏幕的下面移动一格");
}
document.getElementsByTagName("button")[1].onclick = function() {
	textarea.value = ""; // 清空多行文本框的内容
	line.innerHTML = ""; // 清空代码行数列的内容
}
function go(step) {
	var square = document.getElementById("square"); 
	var deg = square.style.transform.slice(7, -4);
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	switch(deg) {
		case "0":
			for (var i = 0; i < step; i++) {
				if (x == 0) {
					alert("已到最上方！");
					break;
				}
				else {
					x--;
					document.getElementById("box" + x + y).appendChild(square);
				}
			}
			break;
		case "90":
			for (var i = 0; i < step; i++) {
				if (y == 9) {
					alert("已到最右方！");
					break;
				}
				else {
					y++;
					document.getElementById("box" + x + y).appendChild(square);
				}
			}
			break;
		case "180":
			for (var i = 0; i < step; i++) {
				if (x == 9) {
					alert("已到最下方！");
					break;
				}
				else {
					x++;
					document.getElementById("box" + x + y).appendChild(square);
				}
			}
			break;
		case "270":
			for (var i = 0; i < step; i++) {
				if (y == 0) {
					alert("已到最左方！");
					break;
				}
				else {
					y--;
					document.getElementById("box" + x + y).appendChild(square);
				}
			}
			break;
	}
}
function tun_lef() {
	var square = document.getElementById("square");
	var deg = (square.style.transform.slice(7, -4) - '0' + 270) % 360;
	square.style.transform = "rotate("+ deg +"deg)";
}
function tun_rig() {
	var square = document.getElementById("square");
	var deg = (square.style.transform.slice(7, -4) - '0' + 90) % 360;
	square.style.transform = "rotate("+ deg +"deg)";
}
function tun_bac() {
	var square = document.getElementById("square");
	var deg = (square.style.transform.slice(7, -4) - '0' + 180) % 360;
	square.style.transform = "rotate("+ deg +"deg)";
}
function tra_lef(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	for (var i = 0; i < step; i++) {
		if (y == 0) {
			alert("已到最左方！");
			break;
		}
		else {
			y--;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}
function tra_top(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	for (var i = 0; i < step; i++) {
		if (x == 0) {
			alert("已到最上方！");
			break;
		}
		else {
			x--;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}
function tra_rig(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	for (var i = 0; i < step; i++) {
		if (y == 9) {
			alert("已到最右方！");
			break;
		}
		else {
			y++;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}
function tra_bot(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	for (var i = 0; i < step; i++) {
		if (x == 9) {
			alert("已到最下方！");
			break;
		}
		else {
			x++;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}
function mov_lef(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(270deg)";
	for (var i = 0; i < step; i++) {
		if (y == 0) {
			alert("已到最左方！");
			break;
		}
		else {
			y--;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}
function mov_top(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(0deg)";
	for (var i = 0; i < step; i++) {
		if (x == 0) {
			alert("已到最上方！");
			break;
		}
		else {
			x--;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}
function mov_rig(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(90deg)";
	for (var i = 0; i < step; i++) {
		if (y == 9) {
			alert("已到最右方！");
			break;
		}
		else {
			y++;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}
function mov_bot(step) {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(180deg)";
	for (var i = 0; i < step; i++) {
		if (x == 9) {
			alert("已到最下方！");
			break;
		}
		else {
			x++;
			document.getElementById("box" + x + y).appendChild(square);
		}
	}
}