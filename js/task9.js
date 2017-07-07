$(document).ready(function(){
	$('#datetimepicker').datetimepicker({
		format:"Y-m-d",      //格式化日期
		timepicker:false,    //关闭时间选项
	});
	var span1=$(".types").children().children("span");//选择.types孙辈的所有span元素，不能用find，这样会选中所有后代的span元素
	var ul1=$(".types").find("ul");//选择所有后代的ul元素
	span1.bind("click",function(){//为每一个选择的span添加click事件
		span1.css("color","#999999");//还原所有的span的文字颜色
		$(this).css("color","white");//改变选择的span的文字颜色
		ul1.each(function(){//隐藏.types所有后代的ul元素
			$(this).css("display","none");
		});
		$(this).next().css("display","block");//显示选择的span对应的ul
	});
	var span2=$(".files").find("span");//选择.files所有后代的span元素
	var ul2=$(".files").find("ul");//选择.files所有后代的ul元素
	span2.bind("click",function(){//为每一个选择的span添加click事件
		span2.css("color","#999999");//还原所有的span的文字颜色
		$(this).css("color","white");//改变选择的span的文字颜色
		ul2.each(function(){//隐藏.files所有后代的ul元素
			$(this).css("display","none");
		});
		$(this).next().css("display","block");//显示选择的span对应的ul
	});
	$("#tab li").bind("click",function(){//为每一个标签添加click事件
		$(".item").hide();//隐藏所有的面板
		$("#"+$(this).attr("name")).show();//显示单击的标签对应的面板
		$("#tab li").css({//为所有的标签添加白色的上、左、右边框，灰色的下边框，并设置#eeeeee背景色
			"border-top":"1px solid white",
			"border-left":"1px solid white",
			"border-right":"1px solid white",
			"border-bottom":"1px solid grey",
			"background":"#eeeeee"
		});
		$(this).css({//为单击的标签添加灰色的上、左、右边框，白色的下边框，并设置white背景色
			"border-top":"1px solid grey",
			"border-left":"1px solid grey",
			"border-right":"1px solid grey",
			"border-bottom":"1px solid white",
			"background":"white"
		});
	});
	$("#tab li:first-child").click();//默认单击了第一个标签
});