var nameObj = {
    label: '����',
    type: 'text', 
    rules: '�������Ϊ4-16���ַ�',  
    success: '��ʽ��ȷ',
    fail1: '���Ʋ���Ϊ��',
    fail2: '�ַ���Ϊ4~16λ',
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
	label: '����',
    type: 'password', 
    rules: '�������Ϊ6-16λ',  
    success: '�������',
    fail1: '���벻��Ϊ��',
    fail2: '���볤��Ϊ6~16λ',
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
	label: 'ȷ������',
    type: 'password', 
    rules: '�ٴ�������ͬ����',  
    success: '��������һ��',
    fail1: 'ȷ�����벻��Ϊ��',
    fail2: '�������벻һ��',
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
	label: '����',
    type: 'text', 
    rules: '�����������ַ',  
    success: '�����ʽ��ȷ',
    fail1: '���䲻��Ϊ��',
    fail2: '�����ʽ����',
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
	label: '�ֻ�',
    type: 'text', 
    rules: '�������ֻ�����',  
    success: '�ֻ���ʽ��ȷ',
    fail1: '�ֻ�����Ϊ��',
    fail2: '�ֻ���ʽ����',
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
// ����һ����������ʽ�ж��ַ��Ƿ��Ǻ���
function getLength(value) {
	var len = 0;
	var reg = new RegExp("[u4E00-u9FFF]+","g");
	for (var i = 0; i < value.length; i++) {
		if (reg.test(value.charAt(i))) 
����������	len += 2;
������	else  
			len++;
	}
	return len;
}
// ����������Unicode�ַ���Χ�ж��ַ��Ƿ��Ǻ���
function getLength(value) {
	var len = 0;
	for (var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 255) 
����������	len += 2;
������	else  
			len++;
	}
	return len;
}
// ���ݼ������ʾ���߿�Ĳ�ͬ��ʽ
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
	var buttonText = document.createTextNode("�ύ");
    var button = document.createElement("button");
    button.style.marginLeft = "150px";
    button.appendChild(buttonText);
    document.getElementsByTagName("body")[0].appendChild(button);
	document.getElementsByTagName('button')[0].onclick = function() {
		for (var i = 0; i < inputs.length; i++) { // ����ύ��ťʱ����Ҫ��ҳ���������������У�飬Ϊ�����ظ�д���룬ʹ��ÿ�����Ȼ�ý�����ʧȥ����������У��
			inputs[i].focus();
			inputs[i].blur();
		}
		for (var i = 0; i < divs.length; i++) {		
			if (divs[i].style.borderColor != 'green') {
				alert('�ύʧ��');
				return;
			}
		}
		alert('�ύ�ɹ�');
	}
}