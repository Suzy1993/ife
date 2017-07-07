window.onload = function() {
	var ul1 = [], ul2 = [];
	var span1 = [], span2 = [];
	var selectNode; // 记录选择的节点
	bind_span1();
	bind_span2();
	var buttons = document.getElementsByTagName('button');
	var type = document.getElementsByClassName("types")[0];
	var nodes;
	var node;
	// 按照内容进行节点查找，并且把找到的节点进行特殊样式呈现，如果找到的节点处于被父节点折叠隐藏的状态，则需要做对应的展开
	buttons[0].onclick = function() { 
		var flag = 0; // 标记是否已找到
		var first = 0; //可能存在多个待查找内容，只是第一次还原所有span的文字颜色（一级列表菜单）及还原所有a的文字颜色（二级列表菜单）
		// 还原所有span为未找到状态（一级列表菜单）
		var span = document.getElementsByTagName('span');
		for (var i = 0; i < span.length; i++)
			span[i].style.background = "white";
		// 还原所有a为未找到状态（二级列表菜单）
		var a = document.getElementsByTagName('a');
		for (var i = 0; i < a.length; i++)
			a[i].style.background = "white";
		var value = document.getElementsByTagName('input')[0].value; // 获取待查找的值
		nodes = []; // 清空深度优先遍历的结果列表再进行遍历
		deepTraversal(type);
		for (var i = 0; i < nodes.length; i++) { 
			// 从遍历结果列表中找到待查找节点
			if (nodes[i].firstChild != null && nodes[i].firstChild.nodeValue == value) { // 注意判断nodes[i].firstChild是否为空，因为文本节点等节点没有子节点
				if (first == 0) { 
					//隐藏所有的ul子列表
					var ul = document.getElementsByClassName("types")[0].getElementsByTagName("ul");
					for (var j = 0; j < ul.length; j++)
						ul[j].style.display = "none";
					// 还原所有span的文字颜色（一级列表菜单）
					var span = document.getElementsByTagName("span");
					for (var j = 0; j < span.length; j++)
						span[j].style.color = "#999999";
					// 还原所有a的文字颜色（二级列表菜单）
					var a = document.getElementsByTagName('a');
					for (var j = 0; j < a.length; j++)
						a[j].style.color = "#999999";
					first = 1;
				}
				if (nodes[i].parentNode.getAttribute("class") == "file") { // 一级列表菜单
					nodes[i].parentNode.parentNode.style.display = "block"; // 显示一级列表菜单
					nodes[i].parentNode.parentNode.previousSibling.style.color = "red"; // 将一级列表菜单的文字颜色改为红色
				}
				else if (nodes[i].parentNode.getAttribute("class") == "document") { // 二级列表菜单
					nodes[i].parentNode.parentNode.style.display = "block"; // 显示一级列表菜单
					nodes[i].parentNode.parentNode.parentNode.parentNode.style.display = "block"; // 显示二级列表菜单
					nodes[i].parentNode.parentNode.previousSibling.style.color = "red"; // 将一级列表菜单的文字颜色改为红色
					nodes[i].parentNode.parentNode.parentNode.parentNode.previousSibling.style.color = "red"; // 将二级列表菜单的文字颜色改为红色
				}
				nodes[i].style.background = "blue"; // 把找到的节点进行特殊样式呈现：背景颜色为蓝色
				flag = 1; //标记已找到
			}
		}
		if (flag == 0) 
			alert("Not found！");
	}
	// 添加输入的内容，作为已选择节点的子节点
	buttons[1].onclick = function() {
		if (selectNode == null) { // 若尚未选择节点，则提示选择
			alert("Please select a node！");
			return;
		}
		var value = document.getElementsByTagName('input')[0].value; // 获取待添加的值
		var next = selectNode.nextSibling;
		for (var i = 0; i < next.children.length; i++) { // 若选择节点的子列表中已存在待添加的内容，则提示已存在
			if (next.children[i].firstChild.firstChild.nodeValue == value) {
				alert("Already exists");
				return;
			}
		}
		nodes = []; // 清空深度优先遍历的结果列表再进行遍历
		deepTraversal(type);
		if (selectNode.parentNode.getAttribute("class") == "type") { // 一级列表菜单
			var parent = selectNode.nextSibling;
			var textNode = document.createTextNode(value);
			var spanNode = document.createElement("span");
			spanNode.appendChild(textNode);
			var ulNode = document.createElement("ul");
			var liNode = document.createElement("li");
			liNode.setAttribute("class", "file")
			liNode.appendChild(spanNode);
			liNode.appendChild(ulNode);
			parent.appendChild(liNode);
			// 节点变动需要重新绑定click事件
			bind_span1(); //正常对于一级列表只需要bind_span1()
			bind_span2(); //考虑到bind_span2()对bind_span1()有覆盖作用，需要为二级链表绑定bind_span2()，否则二级链表也会绑定bind_span1()
		}
		else if (selectNode.parentNode.getAttribute("class") == "file") { // 二级列表菜单
			var parent = selectNode.nextSibling;
			var textNode = document.createTextNode(value);
			var aNode = document.createElement("a");
			var liNode = document.createElement("li");
			aNode.setAttribute("href", "#");
			aNode.appendChild(textNode);
			liNode.setAttribute("class", "document");
			liNode.appendChild(aNode);
			parent.appendChild(liNode);
			bind_span2();
		}
		alert("Add Successfully！");
	}
	buttons[2].onclick = function() {
		var flag = 0; // 标记待删除内容是否已找到
		var value = document.getElementsByTagName('input')[0].value;
		nodes = []; // 清空深度优先遍历的结果列表再进行遍历
		deepTraversal(type);
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].firstChild != null && nodes[i].firstChild.nodeValue == value) { // 注意判断nodes[i].firstChild是否为空，因为文本节点等节点没有子节点
				var parent = nodes[i].parentNode;
				for (var j = 0; j < parent.children.length; j++)
					parent.removeChild(parent.children[j]);
				parent.parentNode.removeChild(parent);
				flag = 1;
			}
		}
		// 节点变动需要重新绑定click事件
		bind_span1();
		bind_span2();
		if (flag == 1)
			alert("Delete Successfully！");
		else
			alert("Not found！");
	}
	function bind_span1() { // 为一级列表菜单绑定click事件
		ul1 = []; // 清空.types所有后代的ul元素列表
		span1 = []; // 清空.types所有后代的span元素列表
		var types = document.getElementsByClassName("types");
		/*
		注意：
		js的onclick只能绑定一次，再次绑定会把之前的覆盖，jQuery的click()可以绑定多次，再次绑定会在前一个程序执行完后触发
		因此不必特意选择.types孙辈的所有span元素，只需选择后代的所有span元素即可）
		*/
		//选择.types所有后代的span元素和ul元素
		for (var i = 0; i < types.length; i++) {
			var span = types[i].getElementsByTagName("span");
			var ul = types[i].getElementsByTagName("ul");
			for (var j = 0; j < span.length; j++)
				span1.push(span[j]);
			for (var j = 0; j < ul.length; j++)
				ul1.push(ul[j]);
		}
		for (var i = 0; i < span1.length; i++) { 
			span1[i].onclick = function() { // 为.types中每一个选择的span添加click事件
				selectNode = this; // 保存当前选择的节点
				for (var j = 0; j < span1.length; j++) // 还原所有的span的文字颜色
					span1[j].style.color = "#999999";
				this.style.color = "red"; // 改变选择的span的文字颜色
				for (var j = 0; j < ul1.length; j++) // 隐藏.types所有后代的ul元素
					ul1[j].style.display = "none";
				this.nextSibling.style.display = "block"; // 显示选择的span对应的ul
			};
		}
	}
	function bind_span2() { // 为二级列表菜单绑定click事件
		ul2 = []; // 清空.files所有后代的ul元素列表
		span2 = []; // 清空.files所有后代的span元素列表
		var files = document.getElementsByClassName("files");
		//选择.files所有后代的span元素和ul元素
		for (var i = 0; i < files.length; i++) {
			var span = files[i].getElementsByTagName("span");
			var ul = files[i].getElementsByTagName("ul");
			for (var j = 0; j < span.length; j++)
				span2.push(span[j]);
			for (var j = 0; j < ul.length; j++)
				ul2.push(ul[j]);
		}
		for (var i = 0; i < span2.length; i++) {
			span2[i].onclick = function() { // 为.files中每一个选择的span添加click事件
				selectNode = this; // 保存当前选择的节点
				for (var j = 0; j < span2.length; j++) // 还原所有的span的文字颜色
					span2[j].style.color = "#999999";
				this.style.color = "red"; // 改变选择的span的文字颜色
				for (var j = 0; j < ul2.length; j++) // 隐藏.types所有后代的ul元素
					ul2[j].style.display = "none";
				this.nextSibling.style.display = "block"; // 显示选择的span对应的ul
			};
		}
	}
	/*
	//jQuery实现：
	function bind_span1() {
		var span1=$(".types").children().children("span");//选择.types孙辈的所有span元素，不能用find，这样会选中所有后代的span元素
		var ul1=$(".types").find("ul");//选择所有后代的ul元素
		span1.bind("click",function(){//为每一个选择的span添加click事件
			span1.css("color","#999999");//还原所有的span的文字颜色
			$(this).css("color","red");//改变选择的span的文字颜色
			ul1.each(function(){//隐藏.types所有后代的ul元素
				$(this).css("display","none");
			});
			$(this).next().css("display","block");//显示选择的span对应的ul
		});
	}
	function bind_span2() {
		var span2=$(".files").find("span");//选择.files所有后代的span元素
		var ul2=$(".files").find("ul");//选择.files所有后代的ul元素
		span2.bind("click",function(){//为每一个选择的span添加click事件
			span2.css("color","#999999");//还原所有的span的文字颜色
			$(this).css("color","red");//改变选择的span的文字颜色
			ul2.each(function(){//隐藏.files所有后代的ul元素
				$(this).css("display","none");
			});
			$(this).next().css("display","block");//显示选择的span对应的ul
		});
	}
	*/
	// 深度优先遍历
	function deepTraversal(rootNode) {
		if (rootNode != null) {  
	        nodes.push(rootNode);  
	        var children = rootNode.children;  
	        for (var i = 0; i < children.length; i++)  
	            deepTraversal(children[i]);  
	    }  
	}
}