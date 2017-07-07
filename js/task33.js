document.getElementsByTagName("button")[0].onclick = function() {
	var value = document.getElementById("command").value;
	switch(value) {
		case "GO":
			go();
			break;
		case "TUN LEF":
			tun_lef();
			break;
		case "TUN RIG":
			tun_rig();
			break;
		case "TUN BAC":
			tun_bac();
			break;
		default:
			alert("请输入正确命令！\nGO：向蓝色边所面向的方向前进一格\nTUN LEF：向左转（逆时针旋转90度）\nTUN RIG：向右转（顺时针旋转90度）\nTUN BAC：向右转（旋转180度）")
			break;
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