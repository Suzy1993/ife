$(document).ready(function(){
	$('#datetimepicker').datetimepicker({
		format:"Y-m-d",      //��ʽ������
		timepicker:false,    //�ر�ʱ��ѡ��
	});
	var span1=$(".types").children().children("span");//ѡ��.types�ﱲ������spanԪ�أ�������find��������ѡ�����к����spanԪ��
	var ul1=$(".types").find("ul");//ѡ�����к����ulԪ��
	span1.bind("click",function(){//Ϊÿһ��ѡ���span���click�¼�
		span1.css("color","#999999");//��ԭ���е�span��������ɫ
		$(this).css("color","white");//�ı�ѡ���span��������ɫ
		ul1.each(function(){//����.types���к����ulԪ��
			$(this).css("display","none");
		});
		$(this).next().css("display","block");//��ʾѡ���span��Ӧ��ul
	});
	var span2=$(".files").find("span");//ѡ��.files���к����spanԪ��
	var ul2=$(".files").find("ul");//ѡ��.files���к����ulԪ��
	span2.bind("click",function(){//Ϊÿһ��ѡ���span���click�¼�
		span2.css("color","#999999");//��ԭ���е�span��������ɫ
		$(this).css("color","white");//�ı�ѡ���span��������ɫ
		ul2.each(function(){//����.files���к����ulԪ��
			$(this).css("display","none");
		});
		$(this).next().css("display","block");//��ʾѡ���span��Ӧ��ul
	});
	$("#tab li").bind("click",function(){//Ϊÿһ����ǩ���click�¼�
		$(".item").hide();//�������е����
		$("#"+$(this).attr("name")).show();//��ʾ�����ı�ǩ��Ӧ�����
		$("#tab li").css({//Ϊ���еı�ǩ��Ӱ�ɫ���ϡ����ұ߿򣬻�ɫ���±߿򣬲�����#eeeeee����ɫ
			"border-top":"1px solid white",
			"border-left":"1px solid white",
			"border-right":"1px solid white",
			"border-bottom":"1px solid grey",
			"background":"#eeeeee"
		});
		$(this).css({//Ϊ�����ı�ǩ��ӻ�ɫ���ϡ����ұ߿򣬰�ɫ���±߿򣬲�����white����ɫ
			"border-top":"1px solid grey",
			"border-left":"1px solid grey",
			"border-right":"1px solid grey",
			"border-bottom":"1px solid white",
			"background":"white"
		});
	});
	$("#tab li:first-child").click();//Ĭ�ϵ����˵�һ����ǩ
});