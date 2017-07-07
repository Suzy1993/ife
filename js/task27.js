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
// 飞船定义为一个对象，其方法包括各个系统的功能，其属性包括id、速度speed、能源消耗速率discharge，充电速率charge、状态state、角度deg、能源energy、飞行计时器interval、充电计时器energy_interval
var Spaceship = function(id, speed, discharge, charge) {
	this.id = id,
	this.speed = speed,
	this.discharge = discharge,
	this.charge = charge,
	this.state = "stop",
	this.deg = 45,
	this.energy = 100,
	this.interval = null,
	this.energy_interval = null
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
			clearInterval(spaceships[i].interval);
			clearInterval(spaceships[i].energy_interval);
			spaceships.splice(i, 1);
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
				this.distroySystem();
				console.log(this.id + "号飞船接收到销毁命令");
				break;
		}
	}
};

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
			newSpaceship.style.top = 90 - (id - 1) * 25 + "px"; // 设置飞船的上偏移(90 = 4 * 25 - 20 / 2)
			newSpaceship.style.transformOrigin = "center" + " " + (135 + (id - 1) * 25) + "px"; // 设置飞船旋转的基点位置：以行星的圆心为原点(135 = 250 / 2 + 20 / 2)
			newCommand.innerHTML = "<span>对" + id + "号飞船下达命令：</span><button>开始飞行</button><button>停止飞行</button><button>销毁</button>";
			order.appendChild(newCommand);
			var spaceship = new Spaceship(id, speed, discharge, charge);
	    	spaceships.push(spaceship);
			spaceship.energy_interval = setInterval(function() { 
				spaceship.energySystem();
			}, 1000);
		} 
		else 
			alert("创建失败，飞船数量已达上限4");
	},
	beginToFly: function(e) { 
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		mediator('{"id":"' + id +'", "command": "fly"}');
	},
	stopToFly: function(e) { 
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		mediator('{"id":"' + id +'", "command": "stop"}');
	},
	destroy: function(e) {
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		for (var i = 0; i < order.getElementsByTagName("div").length; i++) {
			if (order.getElementsByTagName("span")[i].innerHTML.toString()[1] == id) 
				order.removeChild(order.getElementsByTagName("div")[i]);
		}
		mediator('{"id":"' + id +'", "command": "destroy"}');
	}
}

// 新一代的传播介质BUS
// BUS有个弱点，无法直接传递JSON格式，它只能传递二进制码，但指挥官并不能够直接下达二进制编码指令，只能下达JSON格式指令
// 所以需要在行星上的发射器部分增加一个模块Adapter，把原来的指令格式翻译成二进制码
function mediator (jsonStr) { 
	var jsonObj = JSON.parse(jsonStr); // JSON字符串转JSON对象
	var cmd = ""; // 必须初始化，否则最终的字符串开头是undefined
	switch(jsonObj.id) { // 前四位标示飞船编号
		case "1": cmd += "0001"; break;
		case "2": cmd += "0010"; break;
		case "3": cmd += "0011"; break;
		case "4": cmd += "0100"; break;
	}
	switch(jsonObj.command) { // 后四位标示具体指令（0001：开始飞行，0010：停止飞行，1100：自我销毁）
		case "fly": cmd += "0001"; break;
		case "stop": cmd += "0010"; break;
		case "destroy": cmd += "1100"; break;
	}
	var errorInterval = setInterval(function() { // 增加了多次重试的功能，可以保证信息一定能够传递出去
		if (Math.random() > error) { // 在发射过程中，有10%的信息传送失败（丢包）概率，模拟这个丢包率
			clearInterval(errorInterval);
			var spaceship = [];
			for (var i = 0; i < spaceships.length; i++) 
			    spaceship.push(spaceships[i]);
			for (var i = 0; i < spaceship.length; i++) {
			    if (typeof spaceship[i].signalSystem === "function") 
			        spaceship[i].signalSystem(cmd);
			}
		}
	}, 300); // 传播速度提升到300ms
}