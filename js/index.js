/**
 * Created by Administrator on 2016/9/20.
 */

$(function (){
    var fontSize = parseInt(document.documentElement.clientWidth);
    s = fontSize+"px";
    $("html").css("fontSize",s);
    console.log("当前宽度"+s+"更改后"+$("html").css("fontSize"))
});
//·········································································
$(function (){
    ban();
    mallList();
});
//············AJAX调轮播图·····························································
function ban(){
    $.ajax({
        url:"http://datainfo.duapp.com/shopdata/getBanner.php?callback=?",
        type:"get",
        success:function(e){

            for(var i =0 ; i< e.length;i++){
                var imgArr= eval(e[i].goodsBenUrl);
                //console.info(imgArr[0])
                var backImg="background:url('"+imgArr[0]+"');background-size:cover;";
                var slide = "<div class='swiper-slide'><div class='swiper-slide' style="+backImg+"></div></div>"
                var pagination="<div class='swiper-pagination'></div>";
                $(".swiper-wrapper").append(slide);
                $(".swiper-container").append(pagination);
            }
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                // 如果需要分页器
                pagination: '.swiper-pagination'

            });
            //console.info(e)

        }
    })
}
//            <div class="swiper-slide">Slide 1</div>
//            <div class="swiper-slide">Slide 2</div>
//            <div class="swiper-slide">Slide 3</div>
//            <!-- 如果需要分页器 -->
//            <div class="swiper-pagination"></div>

//            ·····商品列表开始······

var pageIndex=0;
function  mallList() {
    $.ajax({
        url: "http://datainfo.duapp.com/shopdata/getGoods.php",
        type: "get",
        dataType:'jsonp',
        data: {pageCode: pageIndex,linenumber: 5},
        success: function (e) {
            for (var i = 0; i < e.length; i++) {
                var shopImgArr = e[i].goodsListImg;
                var goodsName = e[i].goodsName;
                var price = e[i].price;
                var discount = e[i].discount;
                //                        console.log(shopImgArr)
                var shopNumber = "<dt class='shopNumber'><div class='shopNumberName' style='font-weight: 500;font-size: 18px;'>" + goodsName + "</div><p style='color: red;font-size: 18px'>¥" + price + "</p><p>" + discount + "折</p></dt>"
                var shopImg = "<dl class='shopContent'><dd class='shopImg'><img src='" + shopImgArr + "' width='100%' height='100%'  alt=''></dd>" + shopNumber + "</dl>"
                //                        console.log(shopImg);
                $("#wrapper").prepend(shopImg);

            }

            console.log(e)
        }
    })
}

$(function (){
    var iscroll = new iScroll('container', {
        onScrollMove: function () {
            if (this.wrapperH - this.y > this.scrollerH) {
                this.pushState = true;
            }
        },
        onScrollEnd: function () {
            if (this.pushState) {
                this.pushState = false;

                mallList();
                pageIndex++;
                this.refresh();
            }

        }
    });
});
//            <dl class="shopContent">
//                    <dd class="shopImg"><img src="7.jpg" width="100%" height="100%"  alt=""></dd>
//                    <dt class='shopNumber'>0元大抽奖！走秀携古尔莎为你开启，价值28880元的土耳其..</dt>
//            </dl>


