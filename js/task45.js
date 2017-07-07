var imgs = [ // flag标记该图片是否已经布局完毕
    {"src": "images/task45_1.jpg", flag: 0},
    {"src": "images/task45_2.jpg", flag: 0},
    {"src": "images/task45_3.jpg", flag: 0},
    {"src": "images/task45_4.jpg", flag: 0},
    {"src": "images/task45_5.jpg", flag: 0},
    {"src": "images/task45_6.jpg", flag: 0},
    {"src": "images/task45_7.jpg", flag: 0},
    {"src": "images/task45_8.jpg", flag: 0},
    {"src": "images/task45_9.jpg", flag: 0},
    {"src": "images/task45_10.jpg", flag: 0},
    {"src": "images/task45_11.jpg", flag: 0},
    {"src": "images/task45_12.jpg", flag: 0}
];
window.onload = function() {
    var container = document.getElementById("container");
    var width = container.offsetWidth;
    for (var i = 0; i < imgs.length; i++) { // 依次求每个图片的宽高比，设置其ratio属性
        var img = new Image();
        img.src = imgs[i].src;
        imgs[i].ratio = parseFloat(img.width) / parseFloat(img.height);
    }
    var begin = 0; // begin记录每一行布局的第一个图片的索引，用于后续设置宽度和高度；
    var totalHeight = 0; // totalHeight记录前rows-1行的总高度，以便最后一行的高度设置为前rows-1行高度的平均值
    var rows = 0; // rows记录当前正在布局的是第几行，用于后续求前rows-1行高度的平均值
    var flag = true; // 用于记录是否所有图片都已经布局完毕
    while(flag) { // 通过保证每行的总宽高比保持在一个可控的范围之内，使每张图片不会有比较大的拉伸
        var count = 0; // count记录每行的总宽高比
        var number = 0; // number记录当前行的总图片数
        for (var j = 0; j < imgs.length; j++) { 
            // 布局该图片的条件：该图片未布局且加入该图片后当前行的总宽高比小于可控的范围
            if (imgs[j].flag == 0 && count + imgs[j].ratio < 6) { // 规定每行3-6张，最后一行除外，故设可控的范围阈值为6
                number++;
                var image = document.createElement("img");
                image.setAttribute("src", imgs[j].src);
                container.appendChild(image);
                count += imgs[j].ratio;
                imgs[j].flag = 1;
            }
        }
        rows++;
        if (begin + number != imgs.length) { // 不是最后一行
            height = parseFloat(width) / count; // 该行的所有图片高度统一为container的宽度除以总宽高比
            totalHeight += height;
            var images = document.getElementsByTagName("img");
            var totalWidth = 0;
            for (var j = begin; j < begin + number - 1; j++) { // 设置除每行的最后一个图片外所有图片的高度和宽度
                images[j].style.height = height + 'px';
                images[j].style.width = height * imgs[images[j].getAttribute("src").slice(14, -4) - '0' - 1].ratio + "px";
                totalWidth += parseFloat(images[j].style.width);
            }
            //设置每行的最后一个图片的高度
            images[begin + number - 1].style.height = height + 'px';
            // 比值运算存在细微误差，为防止每行的最后一个图片容不下，最后一个图片的宽度设置不是利用其宽高比而是设置为剩余的宽度
            images[begin + number - 1].style.width = parseFloat(width) - totalWidth + "px";
        }
        else { // 最后一行
            height = totalHeight / (rows - 1); // 该行的所有图片高度统一为前rows-1行高度的平均值
            for (var j = begin; j < begin + number; j++) { // 设置该行所有图片的高度和宽度
                images[j].style.height = height + 'px';
                images[j].style.width = height * imgs[images[j].getAttribute("src").slice(14, -4) - '0' - 1].ratio + "px";
            }
            flag = false; // 所有图片布局完毕，跳出循环
        }
        begin = begin + number; // 更新下一行布局的第一个图片的索引
    }
};