window.onload = function() {
	var students = [];
	students[0] = new Student("小明", 80, 90, 70);
	students[1] = new Student("小红", 90, 60, 90);
	students[2] = new Student("小亮", 60, 100, 70);
	createTable(students);
	var imgs = document.getElementsByTagName("img");
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].onclick = function() {
			var id = this.getAttribute("id");
			if (id.indexOf("Up") != -1) // 升序排序
				upSort(students, id.slice(0, -2)); // 从id中获取排序属性
			else // 升序排序
				downSort(students, id.slice(0, -4)); // 从id中获取排序属性
			clearTable(); // 清空表格数据
			createTable(students); // 更新表格中的数据显示
		}
	}
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
function upSort(students, key) { // 根据属性key进行升序排序
	students.sort(function(student1, student2) {
		return student1[key] - student2[key];
	});
	return students;
}
function downSort(students, key) { // 根据属性key进行降序排序
	students.sort(function(student1, student2) {
		return student2[key] - student1[key];
	});
	return students;
}