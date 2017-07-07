var nameObj = {
    label: '名称',
    type: 'text', 
    rules: '必填，长度为4-16个字符',  
    success: '格式正确',
    fail1: '名称不能为空',
    fail2: '字符数为4~16位',
    producer: function() {
        var labelText = document.createTextNode(this.label);
        var label = document.createElement("label");
        label.appendChild(labelText);
        document.getElementsByTagName("body")[0].appendChild(label);
        var input = document.createElement("input");
        input.setAttribute("type", this.type);
        document.getElementsByTagName("body")[0].appendChild(input);
        var div = document.createElement("div");
        document.getElementsByTagName("body")[0].appendChild(div);
    },
    validator: function() {
    	var that = this;
		var inputs = document.getElementsByTagName("input");
		var divs = document.getElementsByTagName("div");
	    inputs[0].onfocus = function() {
			divs[0].innerHTML = that.rules;
		}
		inputs[0].onblur = function() {
			var len = getLength(inputs[0].value);
			if (len == 0) {
				divs[0].innerHTML = that.fail1;
				description(inputs[0], false);
			} 
			else if (len < 4 || len > 16) {
				divs[0].innerHTML = that.fail2;
				description(inputs[0], false); 
			} 
			else {
				divs[0].innerHTML = that.success;
				description(inputs[0], true); 
			}	
		}
    }
};
var passwordObj = {
	label: '密码',
    type: 'password', 
    rules: '必填，长度为6-16位',  
    success: '密码可用',
    fail1: '密码不能为空',
    fail2: '密码长度为6~16位',
    producer: function() {
        var labelText = document.createTextNode(this.label);
        var label = document.createElement("label");
        label.appendChild(labelText);
        document.getElementsByTagName("body")[0].appendChild(label);
        var input = document.createElement("input");
        input.setAttribute("type", this.type);
        document.getElementsByTagName("body")[0].appendChild(input);
        var div = document.createElement("div");
        document.getElementsByTagName("body")[0].appendChild(div);
    },
    validator: function() {
    	var that = this;
		var inputs = document.getElementsByTagName("input");
		var divs = document.getElementsByTagName("div");
	    inputs[1].onfocus = function() {
			divs[1].innerHTML = that.rules;
		}
		inputs[1].onblur = function() {
			var len = inputs[1].value.length;
			if (len == 0) {
				divs[1].innerHTML = that.fail1;
				description(inputs[1], false); 
			} 
			else if (len < 6 || len > 16) {
				divs[1].innerHTML = that.fail2;
				description(inputs[1], false); 
			} 
			else {
				divs[1].innerHTML = that.success;
				description(inputs[1], true); 
			}
		}
    }
}
var confrmPasswordObj = {
	label: '确认密码',
    type: 'password', 
    rules: '再次输入相同密码',  
    success: '密码输入一致',
    fail1: '确认密码不能为空',
    fail2: '密码输入不一致',
    producer: function() {
        var labelText = document.createTextNode(this.label);
        var label = document.createElement("label");
        label.appendChild(labelText);
        document.getElementsByTagName("body")[0].appendChild(label);
        var input = document.createElement("input");
        input.setAttribute("type", this.type);
        document.getElementsByTagName("body")[0].appendChild(input);
        var div = document.createElement("div");
        document.getElementsByTagName("body")[0].appendChild(div);
    },
    validator: function() {
    	var that = this;
		var inputs = document.getElementsByTagName("input");
		var divs = document.getElementsByTagName("div");
	    inputs[2].onfocus = function() {
			divs[2].innerHTML = that.rules;
		}
		inputs[2].onblur = function() {
			var len = inputs[2].value.length;
			if (len == 0) {
				divs[2].innerHTML = that.fail1;
				description(inputs[2], false); 
			}
			else if (inputs[1].value == inputs[2].value) {
				divs[2].innerHTML = that.success;
				description(inputs[2], true); 
			} 
			else {
				divs[2].innerHTML = that.fail2;
				description(inputs[2], false); 
			}	
		}
    }
}
var emailObj = {
	label: '邮箱',
    type: 'text', 
    rules: '请输入邮箱地址',  
    success: '邮箱格式正确',
    fail1: '邮箱不能为空',
    fail2: '邮箱格式错误',
    producer: function() {
        var labelText = document.createTextNode(this.label);
        var label = document.createElement("label");
        label.appendChild(labelText);
        document.getElementsByTagName("body")[0].appendChild(label);
        var input = document.createElement("input");
        input.setAttribute("type", this.type);
        document.getElementsByTagName("body")[0].appendChild(input);
        var div = document.createElement("div");
        document.getElementsByTagName("body")[0].appendChild(div);
    },
    validator: function() {
    	var that = this;
		var inputs = document.getElementsByTagName("input");
		var divs = document.getElementsByTagName("div");
	    inputs[3].onfocus = function() {
			divs[3].innerHTML = that.rules;
		}
		inputs[3].onblur = function() {
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g;
			if (inputs[3].value.length == 0) {
				divs[3].innerHTML = that.fail1;
				description(inputs[3], false); 
			} 
			else if (reg.test(inputs[3].value)) {
				divs[3].innerHTML = that.success;
				description(inputs[3], true); 
			} 
			else {
				divs[3].innerHTML = that.fail2;
				description(inputs[3], false); 
			}	
		}
    }
}
var phoneObj = {
	label: '手机',
    type: 'text', 
    rules: '请输入手机号码',  
    success: '手机格式正确',
    fail1: '手机不能为空',
    fail2: '手机格式错误',
    producer: function() {
        var labelText = document.createTextNode(this.label);
        var label = document.createElement("label");
        label.appendChild(labelText);
        document.getElementsByTagName("body")[0].appendChild(label);
        var input = document.createElement("input");
        input.setAttribute("type", this.type);
        document.getElementsByTagName("body")[0].appendChild(input);
        var div = document.createElement("div");
        document.getElementsByTagName("body")[0].appendChild(div);
    },
    validator: function() {
    	var that = this;
		var inputs = document.getElementsByTagName("input");
		var divs = document.getElementsByTagName("div");
	    inputs[4].onfocus = function() {
			divs[4].innerHTML = that.rules;
		}
		inputs[4].onblur = function() {
			var reg = /^\d{11}$/g;
			if (inputs[4].value.length == 0) {
				divs[4].innerHTML = that.fail1;
				description(inputs[4], false); 
			} 
			else if (reg.test(inputs[4].value)) {
				divs[4].innerHTML = that.success;
				description(inputs[4], true); 
			} 
			else {
				divs[4].innerHTML = that.fail2;
				description(inputs[4], false); 
			}
		}
    }
}
// 方法一：用正则表达式判断字符是否是汉字
function getLength(value) {
	var len = 0;
	var reg = new RegExp("[u4E00-u9FFF]+","g");
	for (var i = 0; i < value.length; i++) {
		if (reg.test(value.charAt(i))) 
　　　　　	len += 2;
　　　	else  
			len++;
	}
	return len;
}
// 方法二：用Unicode字符范围判断字符是否是汉字
function getLength(value) {
	var len = 0;
	for (var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 255) 
　　　　　	len += 2;
　　　	else  
			len++;
	}
	return len;
}
// 根据检测结果显示表单边框的不同样式
function description(input, flag) {
	if (flag)
		input.style.border = '1px solid green';
	else 
		input.style.border = '1px solid red';
}
window.onload = function() {
	var inputs = document.getElementsByTagName("input");
	var divs = document.getElementsByTagName("div");
	nameObj.producer();
	nameObj.validator();
	passwordObj.producer();
	passwordObj.validator();
	confrmPasswordObj.producer();
	confrmPasswordObj.validator();
	emailObj.producer();
	emailObj.validator();
	phoneObj.producer();
	phoneObj.validator();
	var buttonText = document.createTextNode("提交");
    var button = document.createElement("button");
    button.style.marginLeft = "150px";
    button.appendChild(buttonText);
    document.getElementsByTagName("body")[0].appendChild(button);
	document.getElementsByTagName('button')[0].onclick = function() {
		for (var i = 0; i < inputs.length; i++) { // 点击提交按钮时，需要对页面中所有输入进行校验，为避免重复写代码，使得每个表单先获得焦点再失去焦点来触发校验
			inputs[i].focus();
			inputs[i].blur();
		}
		for (var i = 0; i < divs.length; i++) {		
			if (divs[i].style.borderColor != 'green') {
				alert('提交失败');
				return;
			}
		}
		alert('提交成功');
	}
}