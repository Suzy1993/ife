window.onload = function() {
	document.getElementsByTagName("button")[0].onclick = function() {
		// 前两行配合margin:-150px 0 0 -200px使得浮出层的中心默认在屏幕正中
		// 前四行重置浮出层的左偏移、上偏移、宽度、高度
		document.getElementById("box").style.left = "50%";
		document.getElementById("box").style.top = "50%";
		document.getElementById("box").style.width = "400px";
		document.getElementById("box").style.height = "300px";
		document.getElementById("box").style.display = "block";
		document.getElementById("cover").style.display = "block";
		document.getElementsByTagName("body")[0].style.background = "grey";
		document.getElementsByTagName("button")[0].disabled = true;
	}
	document.getElementById("close").onclick = function() {
		document.getElementById("box").style.display = "none";
		document.getElementById("cover").style.display = "none";
		document.getElementsByTagName("body")[0].style.background = "white";
		document.getElementsByTagName("button")[0].disabled = false;
	}
	document.getElementById("cover").onclick = function() { // 当浮出层显示时，点击浮出层以外的部分，默认为关闭浮出层
		document.getElementById("box").style.display = "none";
		document.getElementById("cover").style.display = "none";
		document.getElementsByTagName("body")[0].style.background = "white";
		document.getElementsByTagName("button")[0].disabled = false;
	}
	var box = document.getElementById("box");
	var head = document.getElementById("head");
	head.onmousedown =  function(event) { // 实现浮出层的拖拽移动浮出窗口位置
		var disX = event.clientX - box.offsetLeft;
		var disY = event.clientY - box.offsetTop;
		document.onmousemove = function(event) {
			offX = event.clientX - disX;
			offY = event.clientY - disY;	
			// 由于设置margin:-150px 0 0 -200px，left需要加上200，top需要加上150
			box.style.left = offX + 200 + 'px';
			box.style.top = offY + 150 + 'px';
		}
		document.onmouseup = function() {
			document.onmousemove = null;
		}
	}
	var top = document.getElementById("top");
	var right = document.getElementById("right");
	var bottom = document.getElementById("bottom");
	var left = document.getElementById("left");
	var drag = document.getElementById("drag");	
	var min = 30; // 设置拖拽缩放的最小宽度和高度
	// offsetLeft获取的是相对于父元素的左边距
	// left获取的是相对于第一个具有定位属性的祖先元素的左边距
	top.onmousedown =  function(event) { 
		stopBubble(event);
		var e = event || window.event;
		var boxY = box.offsetTop - e.clientY;
		var rightY = bottom.offsetTop + e.clientY;
		document.onmousemove = function(event) {
			var e = event || window.event;
			var offY = rightY - e.clientY;	
			var height = offY + drag.offsetHeight;
			if (height < min)
				height = min;
			box.style.height = height + "px";
			if (height > min)
				box.style.top = boxY + e.clientY + 150 + "px"; // 由于设置margin:-150px 0 0 -200px，top需要加上150
		}
		document.onmouseup = function() { 
			document.onmousemove = null;
		}
	}
	right.onmousedown =  function(event) { 
		stopBubble(event);
		var e = event || window.event;
		var disX = e.clientX - right.offsetLeft;
		document.onmousemove = function(event) {
			var e = event || window.event;
			var offX = e.clientX - disX;	
			var width = offX + drag.offsetWidth;
			if (width < min)
				width = min;
			box.style.width = width + "px";
		}
		document.onmouseup = function() {
			document.onmousemove = null;
		}
	}
	bottom.onmousedown =  function(event) { 
		stopBubble(event);
		var e = event || window.event;
		var disY = e.clientY - bottom.offsetTop;
		document.onmousemove = function(event) {
			var e = event || window.event;
			var offY = e.clientY - disY;	
			var height = offY + drag.offsetHeight;
			if (height < min)
				height = min;
			box.style.height = height + "px";
		}
		document.onmouseup = function() {
			document.onmousemove = null;
		}
	}
	left.onmousedown =  function(event) { 
		stopBubble(event);
		var e = event || window.event;
		var boxX = box.offsetLeft - e.clientX;
		var rightX = right.offsetLeft + e.clientX;
		document.onmousemove = function(event) {
			var e = event || window.event;
			var offX = rightX - e.clientX;	
			var width = offX + drag.offsetWidth;
			if (width < min)
				width = min;
			box.style.width = width + "px";
			if (width > min)
				box.style.left = boxX + e.clientX + 200 + "px"; // 由于设置margin:-150px 0 0 -200px，left需要加上200
		}
		document.onmouseup = function() { 
			document.onmousemove = null;
		}
	}
	function stopBubble(e){ // 防止事件冒泡
	    if(e && e.stopPropagation)  
	        e.stopPropagation(); // 非IE浏览器  
	    else  
	        window.event.cancelBubble = true; // IE浏览器  
	}  
}