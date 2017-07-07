window.onload = function() {
	var students = [];
	students[0] = new Student("小明", 80, 90, 70);
	students[1] = new Student("小红", 90, 60, 90);
	students[2] = new Student("小亮", 60, 100, 70);
	students[3] = new Student("小智", 70, 80, 80);
	students[4] = new Student("小慧", 100, 70, 60);
	students[5] = new Student("小宇", 60, 100, 80);
	students[6] = new Student("小燕", 70, 90, 90);
	students[7] = new Student("小昭", 80, 80, 100);
	students[8] = new Student("小诗", 90, 70, 60);
	students[9] = new Student("小豪", 100, 60, 70);
	createTable(students);
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].onclick = function() {
			var id = this.getAttribute("id");
			if (id.indexOf("Up") != -1) 
				upSort(students, id.slice(0, -2));
			else
				downSort(students, id.slice(0, -4));
			clearTable();
			createTable(students);
		}
	}
	var flag = 0;
	document.onscroll = function() {
		var table = document.getElementsByTagName("table")[0];
		var th = table.getElementsByTagName('tr')[0];
	    if (table.offsetTop <= document.body.scrollTop) {
	        th.style.position = 'fixed'; // 固定表头
	        th.style.top = '0px'; // 设置表头位于可视窗口最顶端
	        if (flag == 0) {
		        for (var i = 0; i < imgs.length; i++) {
		        	imgs[i].style.position = 'fixed'; // 固定排序按钮
		        	if (i % 2 == 0)
		        		imgs[i].style.top = '8px'; // 设置升序排序按钮的上偏移
		        	else
		        		imgs[i].style.top = '18px'; // 设置降序排序按钮的上偏移
		        }
		        flag = 1;
	        }
	        if (document.body.scrollTop > table.offsetHeight + 622) {
	            th.style.position = 'relative'; // 还原表头的相对定位
		        if (flag == 1) {
			        for (var i = 0; i < imgs.length; i++) {
			        	imgs[i].style.position = 'absolute'; // 还原排序按钮的绝对定位
			        	if (i % 2 == 0)
			        		imgs[i].style.top = '654px'; // 还原降序排序按钮的上偏移
			        	else
			        		imgs[i].style.top = '664px'; // 还原升序排序按钮的上偏移
			        }
			        flag = 0;
			    }
		    }
	    } 
	    else {
	        th.style.position = 'relative'; // 还原表头的相对定位
	        if (flag == 1) {
			    for (var i = 0; i < imgs.length; i++) {
			        imgs[i].style.position = 'absolute'; // 还原排序按钮的绝对定位
			        if (i % 2 == 0)
			        	imgs[i].style.top = '654px'; // 还原降序排序按钮的上偏移
			        else
			        	imgs[i].style.top = '664px'; // 还原升序排序按钮的上偏移
			    }
			    flag = 0;
			}
		}
	};
}
function Student(name, math, Chinese, English) {
    this.name = name;
    this.math = math;
    this.Chinese = Chinese;
    this.English = English;
    this.total = math + Chinese + English;
}
function createTable(students) {
	var table = document.getElementsByTagName("table")[0];
	var tr = "";
	for (var i = 0; i < students.length; i++) 
		tr += '<tr><td>' + students[i].name + '</td><td>' + students[i].math + '</td><td>' + students[i].Chinese + '</td><td>' + students[i].English + '</td><td>' + students[i].total +'</td></tr>'
    table.innerHTML += tr;
}
function clearTable(students) {
	var table = document.getElementsByTagName("table")[0];
	table.innerHTML = "<tr><th>姓名</th><th>数学</th><th>语文</th><th>英语</th><th>总分</th></tr>";
}
function upSort(students, key) {
	students.sort(function(student1, student2) {
		return student1[key] - student2[key];
	});
	return students;
}
function downSort(students, key) {
	students.sort(function(student1, student2) {
		return student2[key] - student1[key];
	});
	return students;
}