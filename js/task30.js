var inputs = document.getElementsByTagName("input");
var divs = document.getElementsByTagName("div");
window.onload = function() {
	nameValidator();
	passwordValidator();
	confirmPasswordValidator();
	emailValidator();
	phoneValidator();
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
function nameValidator() {
	inputs[0].onfocus = function() {
		divs[0].innerHTML = '�������Ϊ4-16���ַ�';
	}
	inputs[0].onblur = function() {
		var len = getLength(inputs[0].value);
		if (len == 0) {
			divs[0].innerHTML = '���Ʋ���Ϊ��';
			description(inputs[0], false);
		} 
		else if (len < 4 || len > 16) {
			divs[0].innerHTML = '�ַ���Ϊ4~16λ';
			description(inputs[0], false); 
		} 
		else {
			divs[0].innerHTML = '���Ƹ�ʽ��ȷ';
			description(inputs[0], true); 
		}	
	}
}
function passwordValidator() {
	inputs[1].onfocus = function() {
		divs[1].innerHTML = '�������Ϊ6-16λ';
	}
	inputs[1].onblur = function() {
		var len = inputs[1].value.length;
		if (len == 0) {
			divs[1].innerHTML = '���벻��Ϊ��';
			description(inputs[1], false); 
		} 
		else if (len < 6 || len > 16) {
			divs[1].innerHTML = '���볤��Ϊ6~16λ';
			description(inputs[1], false); 
		} 
		else {
			divs[1].innerHTML = '�������';
			description(inputs[1], true); 
		}
	}	
}
function confirmPasswordValidator() {
	inputs[2].onfocus = function() {
		divs[2].innerHTML = '�ٴ�������ͬ����';
	}
	inputs[2].onblur = function() {
		var len = inputs[2].value.length;
		if (len == 0) {
			divs[2].innerHTML = 'ȷ�����벻��Ϊ��';
			description(inputs[2], false); 
		}
		else if (inputs[1].value == inputs[2].value) {
			divs[2].innerHTML = '��������һ��';
			description(inputs[2], true); 
		} 
		else {
			divs[2].innerHTML = '�������벻һ��';
			description(inputs[2], false); 
		}
	}	
}
function emailValidator() {
	inputs[3].onfocus = function() {
		divs[3].innerHTML = '�����������ַ';
	}
	inputs[3].onblur = function() {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g;
		if (inputs[3].value.length == 0) {
			divs[3].innerHTML = '���䲻��Ϊ��';
			description(inputs[3], false); 
		} 
		else if (reg.test(inputs[3].value)) {
			divs[3].innerHTML = '�����ʽ��ȷ';
			description(inputs[3], true); 
		} 
		else {
			divs[3].innerHTML = '�����ʽ����';
			description(inputs[3], false); 
		}
	}	
}
function phoneValidator() {
	var reg = /^\d{11}$/g;
	inputs[4].onfocus = function() {
		divs[4].innerHTML = '�������ֻ�����';
	}
	inputs[4].onblur = function() {
		var reg = /^\d{11}$/g;
		if (inputs[4].value.length == 0) {
			divs[4].innerHTML = '�ֻ�����Ϊ��';
			description(inputs[4], false); 
		} 
		else if (reg.test(inputs[4].value)) {
			divs[4].innerHTML = '�ֻ���ʽ��ȷ';
			description(inputs[4], true); 
		} 
		else {
			divs[4].innerHTML = '�ֻ���ʽ����';
			description(inputs[4], false); 
		}
	}	
}
// ���ݼ������ʾ���߿�Ĳ�ͬ��ʽ
function description(input, flag) {
	if (flag)
		input.style.border = '1px solid green';
	else 
		input.style.border = '1px solid red';
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