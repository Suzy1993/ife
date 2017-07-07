window.onload = function() {
    fall("myFall", 4, 330, 10); // 栏目数，每一栏的宽度，图片的间距是用户输入的参数
    var imgs = document.getElementsByTagName("img");
    var bottom = document.getElementById("bottom");
    var top = document.getElementById("top");
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].onclick = function() { // 点击一张图片后，全屏显示该图
        	bottom.style.display = "block"; // 显示遮罩
        	top.style.display = "block"; // 显示该图的全屏 
        	top.style.background = "url(" + this.getAttribute("src") + ")"; // 获取该图的路径，将其作为div的背景
        	top.style.backgroundSize = "cover"; // 保持图像本身的宽高比例,将图片缩放到正好完全覆盖定义背景的区域
        }
    }
    bottom.onclick = function() { // 点击黑色部分退出全屏浏览
    	top.style.display = "none"; // 隐藏该图的全屏
    	this.style.display = "none"; // 隐藏遮罩
    }
};
// fallId表示实现瀑布布局的<ul>的id，cols表示栏目数，colWidth表示每一栏的宽度，margin表示图片的间距
function fall(fallId, cols, colWidth, margin) { 
    var liArr = []; // liArr数组存放的是每一栏的当前高度，liArr数组的长度为cols
    var fall = document.getElementById(fallId);
    var lis = fall.getElementsByTagName("li");
    var imgs = document.getElementsByTagName("img");
    for (var i = 0;i < imgs.length; i++) {
        lis[i].style.width = colWidth + "px"; // 设置li的宽度为每一栏的宽度
        imgs[i].style.width = colWidth - margin + "px"; // 设置图片的宽度为每一栏的宽度减去图片的间距
        imgs[i].style.margin = margin / 2 + "px"; // 设置图片的外边距为图片间距的一半，以实现指定的图片间距
    }
    for (var i = 0; i < lis.length; i++) { //遍历所有li
        if (i < cols) { // 对前cols个li，排列在第一行，其高度为该栏的当前高度
            liArr[i] = lis[i].scrollHeight;
            // 设置该栏该元素的左边距和上边距
            lis[i].style.left = i * colWidth + "px";
            lis[i].style.top = "0px";
        }
        else { // 对随后的每一个li，每次添加时，都将其放在高度最小的一栏，以保证每一栏的高度尽可能相近。
            // 查找高度最小的一栏，用min记录当前的最小高度，index记录最小高度的栏所对应的索引
            var min = liArr[0], index = 0;
            for (var j = 1; j < liArr.length; j++) {
                if (min > liArr[j]) {
                	min = liArr[j];
                    index = j;
                }
            }
            // 更新最小高度的栏的新高度：最小高度+该li的高度
            liArr[index] = min + lis[i].scrollHeight;
            // 设置该栏该元素的左边距和上边距
            lis[i].style.left = index * colWidth + "px";
            lis[i].style.top = min + "px";
        }
    }
}