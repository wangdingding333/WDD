define(['config'],function(){
	require(['jquery'],function(){
		//轮播图
		var $box=$('.lunbo');
		var $btn=$('.yuan span');
		var $pics=$('.lunbo a');
		var $left=$('.j-left');
		var $right=$('.j-right');
		var $timer=null;
		var $autoplaytimer=null;
		var $num=0;//创建索引
		
		//1.鼠标移入小圆点背景变色
		$btn.hover(function(){//移入
			$num=$(this).index();
			$timer=setInterval(function(){
				change();
			},500)
			
		},function(){//移出
			clearInterval($timer);
		})
		
		//点击向右切换
		$right.on('click',function(){
			$num++;
			if($num>$btn.length-1){
				$num=0;
			}
			change();
			return false;
		})
		//点击向左切换
		$left.on('click',function(){
			$num--;
			if($num<0){
				$num=$btn.length-1;
			}
			change();
			return false;
		})
		
		
		//封装轮播函数
		function change(){
			$btn.eq($num).addClass('active').siblings('span').removeClass('active');
			$pics.eq($num).animate({
				opacity:1
			}).siblings('a').animate({
				opacity:0
			});
		}
		
		//
		$autoplaytimer=setInterval(function(){
			$right.click();
		},5000)
		
		//鼠标移入区域，暂停定时器
		$box.hover(function(){
			clearInterval($autoplaytimer);
		},function(){
			$autoplaytimer=setInterval(function(){
				$right.click();
			},5000)
		})
		
	});
});