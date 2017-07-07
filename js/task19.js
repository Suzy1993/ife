var count = 0;
function left_in(){
	var number = document.getElementById("text").value;
	if (isNaN(number) || (number < 10 || number > 100)) 
		alert("������10-100������");
	else if (count < 60) {
		count++;
		var divElement = document.createElement("div");
		divElement.style.left = "0px";
		divElement.style.height = 3 * number + "px";
		var parentElement = document.getElementById("boxes");
		var childrenElement = parentElement.getElementsByTagName("div");
		var childrenLen = childrenElement.length; 
		for (var i = 0; i < childrenLen; i++) 
			childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' + 22 + "px";
		divElement.setAttribute("class","box");
		divElement.style.top = 300 - 3 * number + "px";
		divElement.onclick = function() {deleteElement(this)};
		parentElement.insertBefore(divElement, childrenElement[0]);
	}
	else	
		alert("����Ԫ�������������Ϊ60��");
}
function right_in(){
	var number = document.getElementById("text").value;
	if (isNaN(number) || (number < 10 || number > 100)) 
		alert("������10-100������");
	else if (count < 60) {
		count++;
		var divElement = document.createElement("div");
		var parentElement = document.getElementById("boxes");
		var childrenElement = parentElement.getElementsByTagName("div");
		var childrenLen = childrenElement.length; 
		if (childrenLen == 0)
			divElement.style.left = "0px";
		else
			divElement.style.left = childrenElement[childrenLen - 1].style.left.slice(0, -2) -'0' + 22 + "px";
		divElement.style.top = 300 - 3 * number + "px";
		divElement.style.height = 3 * number + "px";
		divElement.setAttribute("class","box");
		divElement.onclick = function() {deleteElement(this)};
		parentElement.appendChild(divElement);
	}
	else	
		alert("����Ԫ�������������Ϊ60��");
}
function left_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div");
	var childrenLen = childrenElement.length;
	if (childrenLen != 0) {
		for (var i = 1; i < childrenLen; i++)
			childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' - 22 + "px";
		parentElement.removeChild(childrenElement[0]);
		count--;
	}
}
function right_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div");
	var childrenLen = childrenElement.length;
	if (childrenLen != 0) {
		parentElement.removeChild(childrenElement[childrenLen - 1]);
		count--;
	}
}
function deleteElement(node){
	var parentElement = document.getElementById("boxes");
	var next = node.nextSibling;
	while (next != null) {
		next.style.left = next.style.left.slice(0, -2) -'0' - 22 + "px";
		next = next.nextSibling;
	}
	parentElement.removeChild(node);
	count--;
}
function random(){
	var numbers = [];
	for (var i = 0; i < 60; i++) {
		var number = Math.floor(Math.random() * 90 + 10);
		numbers.push(number);
		var divElement = document.createElement("div");
		var parentElement = document.getElementById("boxes");
		divElement.style.left = i * 20 + i * 2 + "px";
		divElement.style.top = 300 - 3 * number + "px";
		divElement.style.height = 3 * number + "px";
		divElement.setAttribute("class","box");
		parentElement.appendChild(divElement);
	}
	return numbers;
}
function sort(){
	var numbers = random();
	var parentElement = document.getElementById("boxes");
	var i = 0, j = 0;
    var time = setInterval(function() {
        if (i < numbers.length) {
            if (j < numbers.length - i) {
				if (numbers[j] > numbers[j + 1]) {
                    var temp = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = temp;
					parentElement.innerHTML = "";
					for (var k = 0; k < numbers.length; k++) {
						var textNode = document.createTextNode(numbers[k]);
						var divElement = document.createElement("div");
						divElement.appendChild(textNode);
						divElement.style.left = k * 20 + k * 2 + "px";
						divElement.style.top = 300 - 3 * numbers[k] + "px";
						divElement.style.height = 3 * numbers[k] + "px";
						divElement.setAttribute("class","box");
						parentElement.appendChild(divElement);
					}
                }
				j++;
            }
			else{
                i++;
				j = 0;
			}
		}
		else {
			clearInterval(time); // ע�⵱������Ϻ�ʱ�ر�setInterval()������������ú���
			return;
		}
	}, 100);  
}
/*
���������·������������˲����ɣ�ֻ��ֱ�ӿ������յ����������������������
��Ҫ�õ�setInterval()���÷����ɰ���ָ�������ڣ��Ժ���ƣ������ú����������ʽ
ֻҪ��һ�������ڵ��������ÿһ����ÿһ�����ݽ������µ���״ͼչ�ֳ�������ô������̽���һ��һ��չʾ������������˲�����
ÿ���ж����ڵ���Ԫ�أ����������ж�֮����Ҫ���һ��ʱ�䣬��˰�������̵�forѭ�����ת����setInterval()�����е�if�ж����
function sort(){
	var numbers = random();
	var parentElement = document.getElementById("boxes");
	for (var i = 0 ; i < numbers.length; i++) {
		for (var j = 0 ; j < numbers.length - i; j++) {
			if (numbers[j] > numbers[j + 1]) {
				var temp = numbers[j];
				numbers[j] = numbers[j + 1];
				numbers[j + 1] = temp;
				parentElement.innerHTML = "";
				for (var k = 0; k < numbers.length; k++) {
					var divElement = document.createElement("div");
					divElement.style.left = k * 20 + k * 2 + "px";
					divElement.style.top = 300 - 3 * numbers[k] + "px";
					divElement.style.height = 3 * numbers[k] + "px";
					divElement.setAttribute("class","box");
					parentElement.appendChild(divElement);
				}
			}
		}
	}
}
*/