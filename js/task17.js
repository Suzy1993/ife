/* ���ݸ�ʽ��ʾ
var aqiSourceData = {
  "����": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// �������������������ģ�����ɲ�������
function getDateStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getMonth() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = ''
	for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"����": randomBuildData(500),
	"�Ϻ�": randomBuildData(300),
	"����": randomBuildData(200),
	"����": randomBuildData(100),
	"�ɶ�": randomBuildData(300),
	"����": randomBuildData(500),
	"����": randomBuildData(100),
	"����": randomBuildData(100),
	"����": randomBuildData(500)
};

// ������Ⱦͼ�������
var chartData = {};

// ��¼��ǰҳ��ı�ѡ��
var pageState = {
	nowSelectCity: -1,
	nowGraTime: "day"
}
	
/**
 * ��Ⱦͼ��
 */
function renderChart(data, type) {
	var ic = document.getElementById("aqi-chart-wrap"); // ��Ϊͼ������� 
	ic.innerHTML = ""; // ɾ��������������Ԫ��
	var max = 0; // �����п�������ָ�����ݵ����ֵ
	for (var date in data) {
		if (data[date] > max)
			max = data[date];
	}
	var topOffsetPercent = 180 / max; // ���������ֵΪ��׼��ÿ������ʾ�������ٷֱ� 
	var i = 0;
	for (var date in data) { // ѭ�����п�������ָ������ 
		var bar = document.createElement("div"); // ����һ��divԪ��bar 
		bar.id = date + "_" + data[date]; // Ϊ�ոմ�����divԪ��bar���id���ԣ������ʱ�䣬��������ָ������д�뵽id�У�������ʾ��Щ��Ϣ��ʱ�����ã� 
		bar.style.height = Math.round(topOffsetPercent * data[date]) + "px"; // �߶ȵļ��㣬�ٷֱȵĻ������Ե�ǰʱ��Ŀ�������ָ�����ݣ�Math.round��������ȡֵ
		// ����Ԫ�ص�left
		if (type == "day") {
			bar.style.width = "10px"; // ÿ���div���Ϊ10px����
			bar.style.left = (i * 10) + "px"; // ÿ���div���Ϊ10px����ô��i��Ԫ�ؾ�Ӧ����i*10
		}
		else if (type == "week") {
			bar.style.width = "20px"; // ÿ�ܵ�div���Ϊ20px���� 
			bar.style.left = (i * 20) + 325 + "px"; // ÿ�ܵ�div���Ϊ20px��Ϊ��������ͼ������ʾ������ic�Ŀ��Ϊ910px��һ��13�ܣ��ɵ�(910-20*13)/2=325����ô��i��Ԫ�ؾ�Ӧ����i*20+325
		}
		else {
			bar.style.width = "40px"; // ÿ�µ�div���Ϊ40px���� 
			bar.style.left = (i * 40) + 395 + "px"; // ÿ�µ�div���Ϊ40px��Ϊ��������ͼ������ʾ������ic�Ŀ��Ϊ910px��һ��3�£��ɵ�(910-40*3)/2=395����ô��i��Ԫ�ؾ�Ӧ����i*40+395
		}
		bar.style.position = "absolute"; // ���Զ�λ 
		bar.style.overflow = "hidden"; // ������������ 
		bar.setAttribute("title", date + "��" + data[date]); // ����ƶ�����״ͼ��ĳ������ʱ����title������ʾ������ӵľ������ں�����
		bar.setAttribute("class", "bgColor" + Math.floor(Math.random() * 10)); // Ϊÿ�����β������������ɫ
		bar.style.display = "block"; // ��״��ʾ 
		// ���������ϱ߿�ľ��룬ͼ��߶�200��ȥ��ǰ�����״ͼͼ��߶� 
		bar.style.top = 200 - Math.round(topOffsetPercent * data[date]) + "px"; 
		ic.appendChild(bar); // ��������barԪ����ӵ�ic������ȥ 
		i++;
	} 	
}

/**
 * �ա��ܡ��µ�radio�¼����ʱ�Ĵ�����
 */
function graTimeChange() {
	// ȷ���Ƿ�ѡ����˱仯 
	var radios = document.getElementsByName("gra-time");
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			type = radios[i].value;
			break;
		}
	}
	if (pageState.nowGraTime != type) { // �Ƚ�ѡ�е�radio�Ƿ���pageState.nowGraTime��ͬ������ͬ���ʾ�����˱仯��ֻ��ѡ����仯��������ȾͼƬ
		pageState.nowGraTime = type;
		// ���ö�Ӧ����
		var data = [];
		var city = pageState.nowSelectCity;
		if (city == -1)
			city = document.getElementById("city-select").value;;
		if (type == "day")
			data = chartData[city][0];
		else if (type == "week")
			data = chartData[city][1];
		else 
			data = chartData[city][2];
		// ����ͼ����Ⱦ����
		renderChart(data, type);
	}
}

/**
 * select�����仯ʱ�Ĵ�����
 */
function citySelectChange() {
	// ȷ���Ƿ�ѡ����˱仯 
	var city = document.getElementById("city-select").value;
	if (pageState.nowSelectCity != city) { // �Ƚ�ѡ�е�select�Ƿ���pageState.nowSelectCity��ͬ������ͬ���ʾ�����˱仯��ֻ��ѡ����仯��������ȾͼƬ
		pageState.nowSelectCity = city;
		// ���ö�Ӧ����
		var data = [];
		if (pageState.nowGraTime == "day")
			data = chartData[city][0];
		else if (pageState.nowGraTime == "week")
			data = chartData[city][1];
		else 
			data = chartData[city][2];
		// ����ͼ����Ⱦ����
		renderChart(data, type);
	}
}

/**
 * ��ʼ���ա��ܡ��µ�radio�¼��������ʱ�����ú���graTimeChange
 */
function initGraTimeForm() {
	var radios = document.getElementsByName("gra-time");
	for (var i = 0; i < radios.length; i++) 
		radios[i].onchange = graTimeChange;
}

/**
 * ��ʼ������Select����ѡ����е�ѡ��
 */
function initCitySelector() {
	// ��ȡaqiSourceData�еĳ��У�Ȼ������idΪcity-select�������б��е�ѡ��
	var selects = document.getElementById("city-select");
	selects.removeChild(document.getElementsByTagName("option")[0]);
	for (var property in aqiSourceData) {
		var city = document.createTextNode(property);
		var options = document.createElement("option");
		options.appendChild(city);
		selects.appendChild(options);
	}
	// ��select�����¼�����ѡ����仯ʱ���ú���citySelectChange
	selects.onchange = citySelectChange;
}

/**
 * ��ʼ��ͼ����Ҫ�����ݸ�ʽ
 */
function initAqiChartData() {
	// ��ԭʼ��Դ���ݴ����ͼ����Ҫ�����ݸ�ʽ
	// ����õ����ݴ浽 chartData ��
	for (var property in aqiSourceData) {
		var dayData = aqiSourceData[property];
		var datas = [];
		datas.push(dayData); // ��ÿ������ݴ���ó��ж�Ӧ��������
		var weekData = [];
		var weekavg = 0;
		var weeksum = 0;
		var count = 0;
		for (var days in dayData) {
			var day = new Date(days).getDay(); // ��ȡ�����ڶ�Ӧ���ڼ�
			weeksum += dayData[days];
			count++;
			if (day == 0) { // �������ڶ�Ӧ�����գ���ͳ��һ�ܵ�ƽ��ֵ
				weekavg = parseInt(weeksum / count);
				weekData.push(weekavg);
				weekavg = 0;
				weeksum = 0;
				count = 0;
			}
		}
		datas.push(weekData); // ��ÿ�ܵ����ݴ���ó��ж�Ӧ��������
		var preMonth = 0; // preMonth��¼��һ�������������·�
		var monthData = [];
		var monthavg = 0;
		var monthsum = 0;
		for (var days in dayData) {
			var month = new Date(days).getMonth(); // ��ȡ���������ڼ���
			monthsum += dayData[days];
			count++;
			if (month != preMonth) { // ���������������·�����һ�������������·ݲ�ͬ����ͳ��һ�µ�ƽ��ֵ
				monthavg = parseInt(monthsum / count);
				monthData.push(monthavg);
				monthavg = 0;
				monthsum = 0;
				count = 0;
				preMonth = month;
			}
		}
		monthavg = parseInt(monthsum / count);//���һ���µ�ƽ��ֵҪ����ͳ��
		monthData.push(monthavg);
		datas.push(monthData); // ��ÿ�µ����ݴ���ó��ж�Ӧ��������
		chartData[property] = datas; // ���ó���ÿ�졢ÿ�ܡ�ÿ�µ����ݴ���chartData��
	}
}

/**
 * ��ʼ������
 */
function init() {
	initGraTimeForm()
	initCitySelector();
	initAqiChartData();
}

init();