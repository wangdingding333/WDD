//定义模块
define(['config'], function() {
	require(['jquery'], function() {
		//1.楼梯效果
		$(window).on('scroll', function() {
			var $top = $(window).scrollTop();
			var $lou = $('.sidebar-left');
			var $tops = $('.sidebar-right .tops')
			if ($top >= 700) {
				$lou.show();
				$tops.show();
			} else {
				$lou.hide();
				$tops.hide();
			}
			//4.通过滚轮事件，给对应的左侧的楼梯导航添加对应的class=active
			$('.louceng').each(function(index, element) {
				var $loucengtop = $(element).offset().top + 200;
				if ($loucengtop > $top) {
					$('.sidebar-left li').removeClass('active');
					$('.sidebar-left li').eq(index).addClass('active');
					return false;
				}
			});
		});
		//2.点击楼梯导航，让对应的楼层进行位置的跳转
		$('.sidebar-left li').not('#end').on('click', function() {
			$(this).addClass('active').siblings('li').removeClass('active');
			var $top = $('.louceng').eq($(this).index()).offset().top;
			$('html,body').animate({
				scrollTop: $top
			});
			return false;
		});

		//3.回到顶部
		$('#end').on('click', function() {
			$('html,body').animate({
				scrollTop: 0
			});
			return false;
		})


		//右边侧边栏
		$('.tops').on('click', function() {
			$('html,body').animate({
				scrollTop: 0
			});
			return false;
		})
		
		//2.二级菜单的消失与隐藏
		var $sub=$('.subnav li');
		var $subnav=$('.popbox');
		$sub.hover(function(){
			$subnav.show();
		},function(){
			$subnav.hide();
		})
		
		var $navli=$('.n1 a');
		var $subli=$('.subli');
		$navli.hover(function(){
			$subli.animate({
				opacity:1,
				display:'block'
			},600)
		},function(){
			$subli.animate({
				opacity:0,
				display:'none'
			},600)
		})
		//3.幻灯片效果
		var $box = $('.bigbox');
		var $banner = $('.lun-ol');
		var $pics = $('.lun-ol li');
		var $prev = $('.a-left');
		var $next = $('.a-right');
		var $qindex = 0; //前一个索引
		var $index = 0; //当前索引

		//鼠标经过显示左右箭头
		$box.hover(function() {
			$('.arro').show();
		}, function() {
			$('.arro').hide();
		})

		//点击右箭头
		$next.on('click',function(){
			$banner.css('left',0).animate({
				left:-1240
			})
		})
		
		$prev.on('click',function(){
			$banner.css('left',-1240).animate({
				left:0
			})
		})

		//4.图片懒加载功能
		
		/* $("img.lazy").lazyload({
			effect: "fadeIn"
		}); */


	})
});
