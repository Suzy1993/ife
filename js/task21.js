document.getElementById("tag").onkeypress = function(e) {
	var ev = e || window.event; // ����������¼������ȡ�ļ��ݡ���FireFox��Opera�У�e�Ǵ��ڵģ�e||window.event����e����IE�У�e�ǲ����ڣ�e||window.event����window.event
	var key = ev.keyCode || ev.which || ev.charCode; // Ϊ�˼�������������¼�����İ��������ԡ�IEֻ��keyCode���ԣ�FireFox����which��charCode���ԣ�Opera����keyCode��which����
	switch(key) { // �ж�������Ƿ��ǿո񡢻س�������
		case 32: // �ո�
		case 13: // �س�
		case 44: // Ӣ�Ķ���
		{  
			var input = document.getElementById("tag").value;
			var tabs = input.split(/[\s\n\r,��]/); // ȥ������Ŀո񡢻س�������
			for (var i = 0; i < tabs.length; i++) { // ɾ���յ�Tab
				if (tabs[i] == "" || typeof(tabs[i]) == "undefined") {
					tabs.splice(i, 1);
					i--;
				}
			}
			var norepeatTabs = norepeat(tabs); // Tag�������ظ��ģ������ظ������Tag���Զ�����
			if (norepeatTabs.length > 10) // �������10��Tag������10��ʱ������¼����Ⱥ�˳�򣬰���ǰ���ɾ��
				norepeatTabs.splice(0, norepeatTabs.length - 10);
			show(norepeatTabs);  //��ʾtag
		}
	}
};
function norepeat(contents) {
	var norepeatContents = [];
	for (var i = 0; i < contents.length; i++) {
		if(norepeatContents.indexOf(contents[i]) == -1)
			norepeatContents.push(contents[i]);
	}
	return norepeatContents;
}
function show(tabs) { // �����û�����ո񣬶��ţ��س�ʱ�����Զ��ѵ�ǰ�����������Ϊһ��tag�������������
	var content = "";
	for (var i = 0; i < tabs.length; i++)
		content += "<div class='tags' onmouseover='mouseover(this)' onmouseout='mouseout(this)' onclick='deleteTags(this)'>"+ tabs[i] + "</div>";
	document.getElementById("tags").innerHTML = content;
}
function mouseover(obj) { // �������ͣ��tag��ʱ��tagǰ����ɾ�����֣�����ɫ��Ϊ��ɫ
	obj.innerHTML = "ɾ��" + obj.innerHTML;
	obj.style.background = "blue";
}
function mouseout(obj) { // ������Ƴ�tagʱ��tagǰȥ��ɾ�����֣�����ɫ�Ļغ�ɫ
	obj.innerHTML = obj.innerHTML.slice(2);
	obj.style.background = "red";
}
function deleteTags(obj) { // ���tag��ɾ��
	document.getElementById("tags").removeChild(obj);
}
function showHobbies() {
	var hobby = document.getElementsByTagName("textarea")[0].value; 
	var hobbies = hobby.split(/[\s\n\r��,��\t]/); // ���ջس������ţ�ȫ�ǰ�Ǿ��ɣ����ٺţ��ո�ȫ�ǰ�ǡ�Tab�Ⱦ��ɣ��ȼ����������һ�����İ���
	for (var i = 0; i < hobbies.length; i++) { // ɾ���յİ���
		if (hobbies[i] == "" || typeof(hobbies[i]) == "undefined") {
			hobbies.splice(i, 1);
			i--;
		}
	}
	var norepeatHobbies = norepeat(hobbies); // ���ò����ظ���ȥ��
	if (norepeatHobbies.length > 10) // �������10����Ȥ���ã�����10��ʱ������¼����Ⱥ�˳�򣬰���ǰ���ɾ��
		norepeatHobbies.splice(0, norepeatHobbies.length - 10);
	var content = "";
	for (var i = 0; i < hobbies.length; i++) // ��һ�����İ�����ʾ��textarea�·�
		content += "<div class='tags''>"+ hobbies[i] + "</div>";
	document.getElementById("hobbies").innerHTML = content;
}