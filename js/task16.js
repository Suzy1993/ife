/**
 * aqiData���洢�û�����Ŀ���ָ������
 * ʾ����ʽ��
 * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
 */
var aqiData = {};

/**
 * ���û������л�ȡ���ݣ���aqiData������һ������
 * Ȼ����Ⱦaqi-list�б���������������
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value.trim();
	var flag = 0;
	for (var i = 0; i < city.length; i++) {
		if (!(city.charAt(i) >= 'a' && city.charAt(i) >= 'z' || city.charAt(i) >= 'A' && city.charAt(i) >= 'Z')) {
			alert("����������Ϊ��Ӣ���ַ�");
			flag = 1;
		}
	}
	var value = document.getElementById("aqi-value-input").value.trim();
	if (!(parseInt(value) == value)) {
		alert("��������ָ������Ϊ����");
		flag = 1;
	}
	if (flag == 0)
		aqiData[city] = value;
}

/**
 * ��Ⱦaqi-table���
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	var trs = document.getElementsByTagName("tr");
	// ʹ��removeChild()ʱ��ע�⣺��Ҫ��trs.length������len�У���Ϊÿ��removeChild()��trs.length���𲽼�С�����ս�����ɾ�������У�ֻ��ɾ��һ�����
	var len = trs.length;
	/*
	����д�ɣ�
	for (var i = 0; i < trs.length; i++) 
		table.removeChild(trs[i]);
	*/
	for (var i = 0; i < len; i++) 
		table.removeChild(trs[0]);// ע��ÿ��ֻҪ�Ƴ���һ��trs[0]���ɣ�����trs[i]
	if (JSON.stringify(aqiData) != "{}") { // �ж϶����Ƿ��ǿն���
		var data11 = document.createTextNode("����");
		var data12 = document.createTextNode("��������");
		var data13 = document.createTextNode("����");
		var td11 = document.createElement("td");
		td11.appendChild(data11);
		var td12 = document.createElement("td");
		td12.appendChild(data12);
		var td13 = document.createElement("td");
		td13.appendChild(data13);
		var tr = document.createElement("tr");
		tr.appendChild(td11);
		tr.appendChild(td12);
		tr.appendChild(td13);
		table.appendChild(tr);
	}
	for	(var p in aqiData) {
		var data1 = document.createTextNode(p);
		var data2 = document.createTextNode(aqiData[p]);
		var data3 = document.createTextNode("ɾ��");
		var buttons = document.createElement("button");
		var td1 = document.createElement("td");
		td1.appendChild(data1);
		var td2 = document.createElement("td");
		td2.appendChild(data2);
		buttons.appendChild(data3);
		var td3 = document.createElement("td");
		td3.appendChild(buttons);
		var tr = document.createElement("tr");
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
}

/**
 * ���add-btnʱ�Ĵ����߼�
 * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
	var buttons = document.getElementsByTagName("button");
	for (var i = 1; i < buttons.length; i++) 	
		// ��Ҫ���ݲ������¼��󶨣���Ҫ�ں�����ǰ�����function()���ô�������ס�������������������ֱ��д��buttons[i].onclick = delBtnHandle(this.getAttribute("id"));
		buttons[i].onclick = function() {delBtnHandle(this);};
}

/**
 * �������ɾ����ť��ʱ��Ĵ����߼�
 * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
 */
function delBtnHandle(param) {
	var node = param.parentNode.previousSibling.previousSibling.firstChild.nodeValue;//��ȡҪɾ���ĳ�����
	delete aqiData[node];// ����renderAqiList()�Ǹ���aqiData��Ⱦ������ɾ����������Ӧ��ɾ��aqiData�е���Ӧ�������ԣ�������ɾ��������Ӧ<tr>
	renderAqiList();
	//ÿ��ɾ��ĳ���������ݺ��������Ⱦ��񣬴�ʱ��Ҫ����Ϊ����ɾ����ť��delBtnHandle�¼�������ÿ�ζ���ҪaddAqiData()����ɾ��
	var buttons = document.getElementsByTagName("button");
	for (var i = 1; i < buttons.length; i++) 	
		// ��Ҫ���ݲ������¼��󶨣���Ҫ�ں�����ǰ�����function()���ô�������ס�������������������ֱ��д��buttons[i].onclick = delBtnHandle(this.getAttribute("id"));
		buttons[i].onclick = function() {delBtnHandle(this);};
}

function init() {
	// ���������add-btn��һ������¼������ʱ����addBtnHandle����
	document.getElementById("add-btn").onclick = addBtnHandle;
	// ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����
	// ������aqi-table�е�����ɾ����ť��delBtnHandle�¼�Ӧ�÷��ڴ˴���������ɾ����ť����addBtnHandle()�в���ӣ���������ڴ˴���ʵ���ϲ���󶨳ɹ�����˰��ƶ���addBtnHandle()��
}

init();
