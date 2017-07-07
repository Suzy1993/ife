function left_in(){
	var content = document.getElementsByTagName("textarea")[0].value; // ��ȡ�����ı������������
	// [\u4e00-\u9fa5]+��ʾ����ƥ��һ������
	// �����֡���ĸ����������ַ�����Ϊ�ָ���
	var contents = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // ��ȡ��Ԫ�ص�������div
	var childrenLen = childrenElement.length; // ���������ݵ���ӣ�childrenElement.length�������Ϊ�˱���Ӱ��ѭ�����������䱣����childrenLen��
	var contentsLen = contents.length; // �������е�length���Զ��ȱ�����һ��������
	if (contents[contentsLen - 1] == "") { // �����ݵ�ĩβ�Ƿָ����������һ�����ݽ��ǿմ�����ʱҪȥ�����һ�����ݣ�����contentsLen��һ
		contents.length = contentsLen - 1; // ͨ����С���鳤��ɾ�����һ������
		contentsLen = contents.length; // �������鳤��
	}
	for (var i = 0; i < childrenLen; i++) // ����ԭ�е�������div����ƫ��
		childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' + 120 * contentsLen + "px";
	for (var i = 0; i < contentsLen; i++) { // ѭ�����ÿһ������
		var textNode = document.createTextNode(contents[i]); // �����ı��ڵ�
		var divElement = document.createElement("div"); // ����div
		divElement.appendChild(textNode); // �ı��ڵ���ӵ�div
		divElement.style.left = (contentsLen - i - 1) * 120 + "px"; // ����ÿһ�����ݵ���ƫ��
		divElement.setAttribute("class","box"); // Ϊ��ǰ���������ʽ��
		divElement.onclick = function() {deleteElement(this)}; // Ϊ��ǰ�������ɾ������
		parentElement.insertBefore(divElement, childrenElement[0]); // ����ǰ������ӵ���һ����div��ǰ�棬ע��childrenElement[0]���������ݵ���Ӷ��ı�
	}
}
function right_in(){
	var content = document.getElementsByTagName("textarea")[0].value; // ��ȡ�����ı������������
	// [\u4e00-\u9fa5]+��ʾ����ƥ��һ������
	// �����֡���ĸ����������ַ�����Ϊ�ָ���
	var contents = content.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // ��ȡ��Ԫ�ص�������div
	var childrenLen = childrenElement.length; // ���������ݵ���ӣ�childrenElement.length�������Ϊ�˱���Ӱ��ѭ�����������䱣����childrenLen��
	var contentsLen = contents.length; // �������е�length���Զ��ȱ�����һ��������
	if (contents[contentsLen - 1] == "") { // �����ݵ�ĩβ�Ƿָ����������һ�����ݽ��ǿմ�����ʱҪȥ�����һ�����ݣ�����contentsLen��һ
		contents.length = contentsLen - 1; // ͨ����С���鳤��ɾ�����һ������
		contentsLen = contents.length; // �������鳤��
	}
	for (var i = 0; i < contentsLen; i++) { // ѭ�����ÿһ������
		var textNode = document.createTextNode(contents[i]); // �����ı��ڵ�
		var divElement = document.createElement("div"); // ����div
		divElement.appendChild(textNode); // �ı��ڵ���ӵ�div
		if (childrenLen == 0) // ��û��ԭ�е���div��������ÿ�����ݵ���ƫ��Ϊ��������120����ϵ
			divElement.style.left = 120 * i + "px";
		else // ��ԭ����div���ڣ��������һ����div����ƫ��Ϊ��׼������ÿ�����ݵ���ƫ��Ϊ��������һ��120����ϵ
			divElement.style.left = childrenElement[childrenLen - 1].style.left.slice(0, -2) -'0' + 120 * (i + 1) + "px";
		divElement.setAttribute("class","box"); // Ϊ��ǰ���������ʽ��
		divElement.onclick = function() {deleteElement(this)}; // Ϊ��ǰ�������ɾ������
		parentElement.appendChild(divElement); // ����ǰ������ӵ����
	}
}
function left_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // ��ȡ��Ԫ�ص�������div
	var childrenLen = childrenElement.length; // ���������ݵ���ӣ�childrenElement.length�������Ϊ�˱���Ӱ��ѭ�����������䱣����childrenLen��
	if (childrenLen != 0) {
		for (var i = 1; i < childrenLen; i++) // �ӵ�һ�����ݿ�ʼ��ÿ�����ݵ���ƫ�Ƽ���120px
			childrenElement[i].style.left = childrenElement[i].style.left.slice(0, -2) -'0' - 120 + "px";
		alert(childrenElement[0].firstChild.nodeValue); // ������ʾɾ���������е���ֵ
		parentElement.removeChild(childrenElement[0]); // �Ƴ���һ������
	}
}
function right_out(){
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // ��ȡ��Ԫ�ص�������div
	var childrenLen = childrenElement.length; // ���������ݵ���ӣ�childrenElement.length�������Ϊ�˱���Ӱ��ѭ�����������䱣����childrenLen��
	if (childrenLen != 0) {
		alert(childrenElement[childrenLen - 1].firstChild.nodeValue); // ������ʾɾ���������е���ֵ
		parentElement.removeChild(childrenElement[childrenLen - 1]); // �Ƴ����һ������
	}
}
function deleteElement(node){
	var parentElement = document.getElementById("boxes");
	var next = node.nextSibling;
	while (next != null) { // �Ӵ�ɾ�����ݵ���һ�����ݿ�ʼ��ÿ�����ݵ���ƫ�Ƽ���120px
		next.style.left = next.style.left.slice(0, -2) -'0' - 120 + "px";
		next = next.nextSibling;
	}
	alert(node.firstChild.nodeValue); // ������ʾɾ����Ԫ���е���ֵ
	parentElement.removeChild(node); // �Ƴ���ɾ������
}
function search(){
	var search_text = document.getElementById("text").value; // ��ȡ�ı�����������
	var parentElement = document.getElementById("boxes");
	var childrenElement = parentElement.getElementsByTagName("div"); // ��ȡ��Ԫ�ص�������div
	var childrenLen = childrenElement.length; // ���������ݵ���ӣ�childrenElement.length�������Ϊ�˱���Ӱ��ѭ�����������䱣����childrenLen��
	for (var i = 0; i < childrenLen; i++) { // �����������ݣ�������ѯ��Ϊ��ǰ���ݵ��Ӵ�����������ɫ�޸�Ϊ��ɫ������Ļذ�ɫ
		if (childrenElement[i].firstChild.nodeValue.indexOf(search_text) != -1) 
			childrenElement[i].style.color="blue";
		else	
			childrenElement[i].style.color="white";
	}
}