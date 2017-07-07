document.getElementsByTagName("button")[0].onclick = function() {
	var value = document.getElementById("command").value;
	switch(value) {
		case "GO": go(); break;
		case "TUN LEF": tun_lef(); break;
		case "TUN RIG": tun_rig(); break;
		case "TUN BAC": tun_bac(); break;
		case "TRA LEF": tra_lef(); break;
		case "TRA TOP": tra_top(); break;
		case "TRA RIG": tra_rig(); break;
		case "TRA BOT": tra_bot(); break;
		case "MOV LEF": mov_lef(); break;
		case "MOV TOP": mov_top(); break;
		case "MOV RIG": mov_rig(); break;
		case "MOV BOT": mov_bot(); break;
		default: alert("请输入正确命令！\nGO：向蓝色边所面向的方向前进一格\nTUN LEF：向左转（逆时针旋转90度）\nTUN RIG：向右转（顺时针旋转90度）\nTUN BAC：向右转（旋转180度）\nTRA LEF：向屏幕的左侧移动一格，方向不变\nTRA TOP：向屏幕的上面移动一格，方向不变\nTRA RIG：向屏幕的右侧移动一格，方向不变\nTRA BOT：向屏幕的下面移动一格，方向不变\nMOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格\nMOV TOP：方向转向屏幕上面，向屏幕的上面移动一格\nMOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格\nMOV BOT：方向转向屏幕下面，向屏幕的下面移动一格"); break;
	}
}
function go() {
	var square = document.getElementById("square"); 
	var deg = square.style.transform.slice(7, -4);
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	switch(deg) {
		case "0":
			if (x == 0)
				alert("已到最上方！");
			else {
				x--;
				document.getElementById("box" + x + y).appendChild(square);
			}
			break;
		case "90":
			if (y == 9)
				alert("已到最右方！");
			else {
				y++;
				document.getElementById("box" + x + y).appendChild(square);
			}
			break;
		case "180":
			if (x == 9)
				alert("已到最下方！");
			else {
				x++;
				document.getElementById("box" + x + y).appendChild(square);
			}
			break;
		case "270":
			if (y == 0)
				alert("已到最左方！");
			else {
				y--;
				document.getElementById("box" + x + y).appendChild(square);
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
function tra_lef() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	if (y == 0)
		alert("已到最左方！");
	else {
		y--;
		document.getElementById("box" + x + y).appendChild(square);
	}
}
function tra_top() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	if (x == 0)
		alert("已到最上方！");
	else {
		x--;
		document.getElementById("box" + x + y).appendChild(square);
	}
}
function tra_rig() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	if (y == 9)
		alert("已到最右方！");
	else {
		y++;
		document.getElementById("box" + x + y).appendChild(square);
	}
}
function tra_bot() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	if (x == 9)
		alert("已到最下方！");
	else {
		x++;
		document.getElementById("box" + x + y).appendChild(square);
	}
}
function mov_lef() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(270deg)";
	if (y == 0)
		alert("已到最左方！");
	else {
		y--;
		document.getElementById("box" + x + y).appendChild(square);
	}
}
function mov_top() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(0deg)";
	if (x == 0)
		alert("已到最上方！");
	else {
		x--;
		document.getElementById("box" + x + y).appendChild(square);
	}
}
function mov_rig() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(90deg)";
	if (y == 9)
		alert("已到最右方！");
	else {
		y++;
		document.getElementById("box" + x + y).appendChild(square);
	}
}
function mov_bot() {
	var square = document.getElementById("square"); 
	var x = square.parentNode.getAttribute("id").slice(3, 4);
	var y = square.parentNode.getAttribute("id").slice(4, 5);
	square.style.transform = "rotate(180deg)";
	if (x == 9)
		alert("已到最下方！");
	else {
		x++;
		document.getElementById("box" + x + y).appendChild(square);
	}
}