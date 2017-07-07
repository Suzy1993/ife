function addEventHandler(element, event, hanlder) {
    if (element.addEventListener)
        element.addEventListener(event, hanlder, false);
    else if (element.attachEvent)
        element.attachEvent("on" + event, hanlder);
    else
        element["on" + event] = hanlder;
}

var speed = 20; // 所有飞船的动力系统飞行速度是一致的：每秒20px
var discharge = 5; // 飞行过程中会按照一定速率消耗能源：每秒减5%
var charge = 2; // 在宇宙中通过太阳能按照一定速率充电：每秒增加2%
var error = 0.3; // 在发射过程中，有30%的信息传送失败（丢包）概率
var spaceships = [];

window.onload = function() {
	var command = document.getElementById('command');
	var order = document.getElementById('order');
	var universe = document.getElementById('universe');
	addEventHandler(command, 'click', function() {
		event.target.disable = 'true';
		switch(event.target.innerHTML) {
			case '新的飞船起飞':
				Commander.newSpaceship(event.target);
				break;
			case '开始飞行':
				Commander.beginToFly(event.target);
				break;
			case '停止飞行':
				Commander.stopToFly(event.target);
				break;
			case '销毁':
				Commander.destroy(event.target);
				break;
		}
	});
}

// 每个飞船由以下部分组成：动力系统(powerSystem)、能源系统(energySystem)、信号接收处理系统(signalSystem)、自爆系统(distroySystem)
// 每个飞船有两个状态：飞行中(fly)和停止(stop)
// 飞船定义为一个对象，其方法包括各个系统的功能，其属性包括id、状态state、角度deg、能源energy、飞行计时器interval、充电计时器energy_interval
var Spaceship = function(id) {
	this.id = id,
	this.state = 'stop',
	this.deg = 45,
	this.energy = 100,
	this.interval = null,
	this.energy_interval = null
};

// 动力系统，完成飞行和停止飞行两个行为
Spaceship.prototype.powerSystem = function() {
	if (this.state == 'fly') {
		var that = this;
		if (this.interval == null) {
			this.interval = setInterval(function() {
				that.energy -= discharge; // 消耗能源
				if (that.energy < 0) { // 能源耗尽时，飞船会自动停止飞行
					that.state = 'stop';
					clearInterval(that.interval);
					that.interval = null;
				}
				document.getElementById("spaceship" + that.id).getElementsByTagName('span')[0].innerHTML = that.energy + '%';
				that.deg = (that.deg + speed) % 360; // 按照一定的速度飞行(旋转角度的改变)
				document.getElementById("spaceship" + that.id).style.transform = 'rotate(' + that.deg + 'deg)';
			}, 1000);
		}
	}
	if (this.state == 'stop') {
		clearInterval(this.interval);
		this.interval = null;
	}
};

// 能源系统，按照一定速率提供能源，在宇宙中通过太阳能充电
Spaceship.prototype.energySystem = function() {
	this.energy += charge; // 提供能源
	if (this.energy > 100) 
		this.energy = 100;
	document.getElementById("spaceship" + this.id).getElementsByTagName('span')[0].innerHTML = this.energy + '%';
};

// 自爆系统，自我销毁
Spaceship.prototype.distroySystem = function() {
	for (var i = 0; i < universe.getElementsByTagName('div').length; i++) {
		if (universe.getElementsByTagName('div')[i].innerHTML.toString()[0] == this.id) 
			universe.removeChild(universe.getElementsByTagName('div')[i]); // 飞船的自我销毁方法会立即销毁飞船自身
	}
	for (var i = 0; i < spaceships.length; i++) { 
		if (spaceships[i].id == this.id) {
			clearInterval(spaceships[i].interval); // 停止飞行
			clearInterval(spaceships[i].energy_interval); // 停止定时充电
			spaceships.splice(i, 1); // 删除该飞船
			break;
		}
	}
};

// 信号接收处理系统，接受到通过Mediator传达过来的指挥官的广播信号，需要通过读取id信息判断这个指令是不是发给自己的
Spaceship.prototype.signalSystem = function(id, cmd) {
	if (this.id == id) {
		switch(cmd) {
			case 'fly':
				this.state ='fly';
				this.powerSystem();
				this.energySystem();
				console.log(this.id + '号飞船接收到开始飞行命令');
				break;
			case 'stop':
				this.state = 'stop';
				this.powerSystem();
				this.energySystem();
				console.log(this.id + '号飞船接收到停止飞行命令');
				break;
			case 'destroy':
				this.distroySystem();
				console.log(this.id + '号飞船接收到销毁命令');
				break;
		}
	}
};

// 指挥官：创建飞船、开启飞船、停止飞船、自爆飞船
var Commander = {
	newSpaceship: function() { // 创建一个新的飞船进入轨道，最多可以创建4个飞船，刚被创建的飞船会停留在某一个轨道上静止不动
		var divs = universe.getElementsByTagName('div');
		var commands = command.getElementsByTagName('div');
		if (commands.length < 4 ) {
			var newSpaceship = document.createElement('div');
			var newCommand = document.createElement('div');
			for (var i = 1; i <= 4; i++) { // 从1-4依次查找尚未创建的飞船号，创建对应飞船
				if (document.getElementById("spaceship" + i) == undefined)
					break;
			}
			var id = i;
			newSpaceship.innerHTML = id + '号-<span>100%</span>';
			newSpaceship.className = 'spaceship';
			universe.appendChild(newSpaceship);
			newSpaceship.setAttribute("id", "spaceship" + id);
			newSpaceship.style.top = 135 - (id - 1) * 50 + 'px';
			newSpaceship.style.transformOrigin = 'center' + ' ' + (170 + (id - 1) * 50) + 'px'; // 设置旋转元素的基点位置：以行星的圆心为原点(170 = 300 / 2 + 40 / 2)
			newCommand.innerHTML = '<span>对' + id + '号飞船下达命令：</span><button>开始飞行</button><button>停止飞行</button><button>销毁</button>';
			command.insertBefore(newCommand,command.lastElementChild);
			display('指挥官：创建' + id + '号飞船成功<br>');
			var spaceship = new Spaceship(id);
	    	spaceships.push(spaceship);
			spaceship.energy_interval = esetInterval(function() { // 每创建一个飞船就启动该飞船的能源系统为其充电
				spaceship.energySystem();
			}, 1000);
		} 
		else 
			display('指挥官：创建失败，飞船数量已达上限4');
	},
	beginToFly: function(e) { // 命令某个飞船开始飞行，飞行后飞船会围绕行星做环绕运动
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		display('指挥官：命令' + id + '号飞船开始飞行');
		mediator('{"id":"' + id +'", "command": "fly"}');
	},
	stopToFly: function(e) { // 命令某个飞船停止飞行
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		display('指挥官：命令' + id + '号飞船停止飞行');
		mediator('{"id":"' + id +'", "command": "stop"}');
	},
	destroy: function(e) { // 命令某个飞船销毁，销毁后飞船消失
		var id = e.parentNode.firstChild.innerHTML.toString()[1];
		display('指挥官：命令' + id + '号飞船销毁');
		for (var i = 0; i < command.getElementsByTagName('div').length; i++) {
			if (command.getElementsByTagName('span')[i].innerHTML.toString()[1] == id) 
				command.removeChild(command.getElementsByTagName('div')[i]);
		}
		mediator('{"id":"' + id +'", "command": "destroy"}');
	}
}

function display(signal) {
	var order = document.getElementById('order');
	order.innerHTML += signal;
}

// 指挥官通过信号发射器发出的命令是通过一种叫做Mediator的介质进行广播
function mediator (jsonStr) { 
	var jsonObj = JSON.parse(jsonStr); // JSON字符串转JSON对象
	// 指挥官下达销毁飞船指令后，默认在指挥官那里就已经默认这个飞船已经被销毁，但由于有信息传递丢失的可能性
	// 所以存在实际上飞船未收到销毁指令，而指挥官又创建了新的飞船，造成宇宙中的飞船数量多于创建的4个上限
	if (Math.random() <= error) // 在发射过程中，有30%的信息传送失败（丢包）概率，模拟这个丢包率
		display('，信息传送失败<br>');
	else {
		setTimeout(function() {
			display('，信息传送成功<br>');
			var spaceship = [];
			for (var i = 0; i < spaceships.length; i++) 
		        spaceship.push(spaceships[i]);
		    for (var i = 0; i < spaceship.length; i++) {
		        if (typeof spaceship[i].signalSystem === 'function') 
		            spaceship[i].signalSystem(jsonObj.id, jsonObj.command); // 每个飞船能接受到指挥官发出给所有飞船的所有指令，因此需要通过读取id信息判断这个指令是不是发给自己的
		    }
		}, 1000); // 每次信息正常传送的时间需要1秒
	}
}