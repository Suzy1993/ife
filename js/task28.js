function addEventHandler(element, event, hanlder) {
    if (element.addEventListener)
        element.addEventListener(event, hanlder, false);
    else if (element.attachEvent)
        element.attachEvent("on" + event, hanlder);
    else
        element["on" + event] = hanlder;
}

var error = 0.1; // 单次传播失败率降低到10%
var spaceships = [];

window.onload = function() {
	var command = document.getElementById("command");
	var order = document.getElementById("order");
	var universe = document.getElementById("universe");
	addEventHandler(command, "click", function() {
		event.target.disable = "true";
		Commander.newSpaceship(event.target);
	});
	addEventHandler(order, "click", function() {
		event.target.disable = "true";
		switch(event.target.innerHTML) {
			case "开始飞行":
				Commander.beginToFly(event.target);
				break;
			case "停止飞行":
				Commander.stopToFly(event.target);
				break;
			case "销毁":
				Commander.destroy(event.target);
				break;
		}
	});
}

// 每个飞船由以下部分组成：动力系统(powerSystem)、能源系统(energySystem)、信号接收处理系统(signalSystem)、自爆系统(distroySystem)
// 每个飞船有两个状态：飞行中(fly)和停止(stop)
// 飞船定义为一个对象，其方法包括各个系统的功能，其属性包括id、速度speed、能源消耗速率discharge，充电速率charge、动力系统类型powerStyle、能源系统类型energyStyle、状态state、角度deg、能源energy、飞行计时器interval、充电及信号发射计时器energy_signal
var Spaceship = function(id, speed, discharge, charge, powerStyle, energyStyle) {
	this.id = id,
	this.speed = speed,
	this.discharge = discharge,
	this.charge = charge,
	this.powerStyle = powerStyle,
	this.energyStyle = energyStyle,
	this.state = "stop",
	this.deg = 45,
	this.energy = 100,
	this.interval = null,
	this.energy_signal = null
};

// 动力系统，完成飞行和停止飞行两个行为
Spaceship.prototype.powerSystem = function() {
	if (this.state == "fly") {
		var that = this;
		if (this.interval == null) {
			this.interval = setInterval(function() {
				that.energy -= that.discharge; 
				if (that.energy < 0) {
					that.state = "stop";
					clearInterval(that.interval);
					that.interval = null;
				}
				document.getElementById("spaceship" + that.id).getElementsByTagName("span")[0].innerHTML = that.energy + "%";
				that.deg = (that.deg + that.speed) % 360;
				document.getElementById("spaceship" + that.id).style.transform = "rotate(" + that.deg + "deg)";
			}, 1000);
		}
	}
	else {
		clearInterval(this.interval);
		this.interval = null;
	}
};

// 能源系统，按照一定速率提供能源，在宇宙中通过太阳能充电
Spaceship.prototype.energySystem = function() {
	this.energy += this.charge; 
	if (this.energy > 100) 
		this.energy = 100;
	document.getElementById("spaceship" + this.id).getElementsByTagName("span")[0].innerHTML = this.energy + "%";
};

// 自爆系统，自我销毁
Spaceship.prototype.distroySystem = function() {
	for (var i = 0; i < universe.getElementsByTagName("div").length; i++) {
		if (universe.getElementsByTagName("div")[i].innerHTML.toString()[0] == this.id) 
			universe.removeChild(universe.getElementsByTagName("div")[i]); 
	}
	for (var i = 0; i < spaceships.length; i++) { 
		if (spaceships[i].id == this.id) {
			clearInterval(spaceships[i].energy_signal); // 停止定时充电及定时发射信号
			clearInterval(spaceships[i].interval); 
			spaceships.splice(i, 1); 
			var tr = document.getElementById(this.id);
			tr.parentNode.removeChild(tr); // 删除监视器上该飞船的监视信息
			break;
		}
	}
};

// 信号接收处理系统，用于接收行星上的信号
// 还需要在飞船的接收器部分增加一个Adapter，用来把二进制码翻译成原来能够理解的指令格式
Spaceship.prototype.signalSystem = function(command) {
	var id = parseInt(command.slice(0,4), 2);
	var cmd = command.slice(4,8);
	if (this.id == id) {
		switch(cmd) {
			case "0001":
				this.state ="fly";
				this.powerSystem();
				this.energySystem();
				console.log(this.id + "号飞船接收到开始飞行命令");
				break;
			case "0010":
				this.state = "stop";
				this.powerSystem();
				this.energySystem();
				console.log(this.id + "号飞船接收到停止飞行命令");
				break;
			case "1100":
				this.state = "destroy";
				this.distroySystem();
				console.log(this.id + "号飞船接收到销毁命令");
				break;
		}
	}
};

// 为每个飞船增加一个信号发射器，飞船会通过BUS系统定时（如每秒）广播自己的飞行状态
// 通过已经安装在飞船上的Adapter把状态数据翻译成二进制码形式，把飞船自身标示，飞行状态，能量编码成一个16位的二进制串
Spaceship.prototype.signalLaynchSystem = function() {
	var cmd = "";
	switch(this.id) { // 前四位用于飞船自身标示
		case 1: cmd += "0001"; break;
		case 2: cmd += "0010"; break;
		case 3: cmd += "0011"; break;
		case 4: cmd += "0100"; break;
	}
	switch(this.state) { // 接下来4位表示飞行状态，0010为停止，0001为飞行，1100表示即将销毁
		case "fly": cmd += "0001"; break;
		case "stop": cmd += "0010"; break;
		case "destroy": cmd += "1100"; break;
	}
	var num = this.energy.toString(2); // 后八位用于记录飞船剩余能源百分比，
	var len = num.length; 
	if (len < 8) { // 若不足8位需要补齐
		for (var i = 0; i < 8 - len; i++) 
			num = "0" + num; 
	} 
	cmd += num;
	signalReceiver(cmd);
};

// 行星上有一个信号接收器，用于通过BUS系统接受各个飞船发送过来的信号
// 当信号接收器接收到飞船信号后，会把信息传给数据处理中心（DC），数据处理中心依然是调用Adapter模块，把这些二进制数据转为对象格式存储在DC中
function signalReceiver(command) {
	var id = parseInt(command.slice(0,4), 2);
	var state = command.slice(4,8);
	var energy = parseInt(command.slice(8,16), 2);
	var obj = {}; // 把二进制数据转为对象格式存储在DC中
	obj.id = id;
	obj.energy = energy;
	switch(state) {
		case "0001": obj.state = '飞行中'; break;
		case "0010": obj.state = '停止'; break;
		case "1100": obj.state = '即将销毁'; break;
	}
	for (var i = 0; i < spaceships.length; i++) {
		if (spaceships[i].id == obj.id) {
			switch(spaceships[i].powerStyle) {
				case "forward": obj.powerStyle = '前进型'; break;
				case "rise": obj.powerStyle = '奔腾型'; break;
				case "exceed": obj.powerStyle = '超越型'; break;
			}
			switch(spaceships[i].energyStyle) {
				case "strength": obj.energyStyle = '劲量型'; break;
				case "light": obj.energyStyle = '光能型'; break;
				case "forever": obj.energyStyle = '永久型'; break;
			}
			break;
		}
	}
	// 实现一个行星上的监视大屏幕，用来显示所有飞船的飞行状态及能源情况，当数据处理中心飞船数据发生变化时，它会相应在监视器上做出变化
	var table = document.getElementsByTagName("table")[0];
	if (document.getElementById(obj.id) == undefined) { // 若监视器上没有有该飞船的监视信息，则新建一行添加该飞船的监视信息
		var text = document.createTextNode(obj.id + "号");
		var tr = document.createElement("tr");
		tr.setAttribute("id", obj.id);
		var td = document.createElement("td");
		td.appendChild(text);
		tr.appendChild(td);
		text = document.createTextNode(obj.powerStyle);
		td = document.createElement("td");
		td.appendChild(text);
		tr.appendChild(td);
		text = document.createTextNode(obj.energyStyle);
		td = document.createElement("td");
		td.appendChild(text);
		tr.appendChild(td);
		text = document.createTextNode(obj.state);
		td = document.createElement("td");
		td.appendChild(text);
		tr.appendChild(td);
		text = document.createTextNode(obj.energy + "%");
		td = document.createElement("td");
		td.appendChild(text);
		tr.appendChild(td);
		table.appendChild(tr);
	}
	else { // 若监视器上已有该飞船的监视信息，则当该飞船的信息发生变化时，相应在监视器上做出变化
		var tr = document.getElementById(obj.id);
		tr.getElementsByTagName("td")[3].innerHTML = obj.state;
		tr.getElementsByTagName("td")[4].innerHTML = obj.energy + "%";
	}
}

// 指挥官：创建飞船、开启飞船、停止飞船、自爆飞船
var Commander = {
	newSpaceship: function() { 
		var divs = universe.getElementsByTagName("div");
		var orders = order.getElementsByTagName("div");
		var power, energy;
		var speed, charge, discharge;		
		var radio1 = document.getElementsByName("power");
		var radio2 = document.getElementsByName("energy");
		for (var i = 0; i < radio1.length; i++) {
			if (radio1[i].checked) {
				power = radio1[i].value;
				break;
			}
		}
		for (var i = 0; i < radio2.length; i++) {
			if (radio2[i].checked) {
				energy = radio2[i].value;
				break;
			}
		}
		switch(power) {
			case "forward": speed = 30; discharge = 5; break;
			case "rise": speed = 50; discharge = 7; break;
			case "exceed": speed = 80; discharge = 9; break;
		}
		switch(energy) {
			case "strength": charge = 2; break;
			case "light": charge = 3; break;
			case "forever": charge = 4; break;
		}
		if (orders.length < 4 ) {
			var newSpaceship = document.createElement("div");
			var newCommand = document.createElement("div");
			for (var i = 1; i <= 4; i++) {
				if (document.getElementById("spaceship" + i) == undefined)
					break;
			}
			var id = i;
			newSpaceship.innerHTML = id + "号-<span>100%</span>";
			newSpaceship.className = "spaceship";
			universe.appendChild(newSpaceship);
			newSpaceship.setAttribute("id", "spaceship" + id);
			newSpaceship.style.top = 90 - (id - 1) * 25 + "px"; 
			newSpaceship.style.transformOrigin = "center" + " " + (135 + (id - 1) * 25) + "px"; 
			newCommand.innerHTML = "<span>对" + id + "号飞船下达命令：</span><button>开始飞行</button><button>停止飞行</button><button>销毁</button>";
			order.appendChild(newCommand);
			var spaceship = new Spaceship(id, speed, discharge, charge, power, energy);
	    	spaceships.push(spaceship);
			spaceship.energy_signal = setInterval(function() { // 定时充电，定时发射信号
				spaceship.energySystem();
				spaceship.signalLaynchSystem();
			}, 1000);
		} 
		else 
			alert("创建失败，飞船数量已达上限4");
	},
	beginToFly: function(e) { 
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		mediator('{"id":' + id +', "command": "fly"}');
	},
	stopToFly: function(e) { 
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		mediator('{"id":' + id +', "command": "stop"}');
	},
	destroy: function(e) {
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		for (var i = 0; i < order.getElementsByTagName("div").length; i++) {
			if (order.getElementsByTagName("span")[i].innerHTML.toString()[1] == id) 
				order.removeChild(order.getElementsByTagName("div")[i]);
		}
		mediator('{"id":' + id +', "command": "destroy"}');
	}
}

// 新一代的传播介质BUS
// BUS有个弱点，无法直接传递JSON格式，它只能传递二进制码，但指挥官并不能够直接下达二进制编码指令，只能下达JSON格式指令
// 所以需要在行星上的发射器部分增加一个模块Adapter，把原来的指令格式翻译成二进制码
function mediator(jsonStr) {
	var jsonObj = JSON.parse(jsonStr);
	var cmd = ""; 
	switch(jsonObj.id) {
		case 1: cmd += "0001"; break;
		case 2: cmd += "0010"; break;
		case 3: cmd += "0011"; break;
		case 4: cmd += "0100"; break;
	}
	switch(jsonObj.command) { 
		case "fly": cmd += "0001"; break;
		case "stop": cmd += "0010"; break;
		case "destroy": cmd += "1100"; break;
	}
	var errorInterval = setInterval(function() {
		if (Math.random() > error) { 
			clearInterval(errorInterval);
			var spaceship = [];
			for (var i = 0; i < spaceships.length; i++) 
			    spaceship.push(spaceships[i]);
			for (var i = 0; i < spaceship.length; i++) {
			    if (typeof spaceship[i].signalSystem === "function")  
			        spaceship[i].signalSystem(cmd);
			}
		}
	}, 300); 
}