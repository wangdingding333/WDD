define(['config'],function(){
	require(['jquery','jqcookie'],function(){
		
		//1.获取sid
		var picid = location.search.substring(1).split('=')[1];
		
		
		//2.将当前的id传给后端获取对应的数据
		$.ajax({
			url: '../php/detail.php',
			data: {
				sid: picid
			},
			dataType: 'json'
		}).done(function(data) {//data:后端返回的和id对应的数据
			//console.log(data);
			$('#smallpic').attr('src', data.url);
			$('#bpic').attr('src', data.url);
			$('#smallpic').attr('sid', data.sid);
			$('.title').html(data.title);
			$('.price i').html(data.price);
			var arr = data.urls.split(',');
			var str = '';
			$.each(arr, function(index, value) {
				str += '<li><img src="' + value + '"/></li>';
				//str+=`<li><img src="${value}"/></li>`;
			});
			$('#list ul').html(str);
			
		});
		
		//3.放大镜效果
		
			
			$('#sf').width($('#spic').width()*$('#bf').width()/$('#bpic').width());
			$('#sf').height($('#spic').height()*$('#bf').height()/$('#bpic').height());
			var bili = $('#bpic').width() / $('#spic').width();
			$('#spic').hover(function(){
				$('#sf').css('visibility','visible');
				$('#bf').css('visibility','visible');
				$(this).on('mousemove',function(ev){
					var $left=ev.pageX-$('.goodsinfo').offset().left-$('#sf').width()/2;
					var $top=ev.pageY-$('.goodsinfo').offset().top-$('#sf').height()/2;
					if($left<0){
						$left=0;
					}else if($left>=$('#spic').width()-$('#sf').width()){
						$left=$('#spic').width()-$('#sf').width();
					}
					if($top<0){
						$top=0;
					}else if($top>=$('#spic').height()-$('#sf').height()){
						$top=$('#spic').height()-$('#sf').height();
					}
					$('#sf').css('left',$left);
					$('#sf').css('top',$top);
					$('#bpic').css('left',-$left*bili);
					$('#bpic').css('top',-$top*bili);
				});
			},function(){
				$('#sf').css('visibility','hidden');
				$('#bf').css('visibility','hidden');
			});
			
			//点击小图切换
			$('#list ul').on('click','li',function(){
				var $imgurl=$(this).find('img').attr('src');
				$('#smallpic').attr('src',$imgurl);
				$('#bpic').attr('src',$imgurl);
			});
					
			//点击箭头进行切换
			var $num=6;//放大镜显示6张。
			$('#right').on('click',function(){
				var $list=$('#list ul li');//8
				if($list.length>$num){
					$num++;
					$('#left').css('color','#333');
					if($list.length==$num){
						$('#right').css('color','#fff');
					}
					$('#list ul').animate({
						left:-($num-6)*$list.eq(0).innerWidth()
					})
				}
			});
			
			$('#left').on('click',function(){
				var $list=$('#list ul li');//8
				if($num>6){
					$num--;
					$('#right').css('color','#333');
					if($num<=6){
						$('#left').css('color','#fff');
					}
					$('#list ul').animate({
						left:-($num-6)*$list.eq(0).innerWidth()
					})
				}
			});
		
		
		//购物车的添加
		//存放商品的sid和商品的数量--数组实现
		//如果商品是第一次存，则存放商品的sid和商品的数量。
		//第二次存，从第二次改变数量
		
		//先判断是否是第一次存
		//1.提前获取cookie里面的id和num
		//点击按钮将商品的数量和id存放到cookie中
		var arrsid=[];
		var arrnum=[];
		function cookietoarray(){
			if($.cookie('cookiesid') && $.cookie('cookienum')){//判断商品是否第一次加入
				arrsid=$.cookie('cookiesid').split(',');
				arrnum=$.cookie('cookienum').split(',');
			}
		}
		//2.点击加入购物车按钮，可以判断商品是否第一次添加
		$('.join a').on('click',function(){
			//alert(1);
			//return false;
			location.reload(true);
			var $sid = $(this).parents('.weaper-center').find('#smallpic').attr('sid');
			cookietoarray();//获取已经存在的cookie值。
			//console.log($sid);
			if($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
				//先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
				var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());
				arrnum[$.inArray($sid, arrsid)] = num;
				$.cookie('cookienum', arrnum.toString(), {expires:10});
			
			} else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
				arrsid.push($sid); //将当前的id存入数组
				$.cookie('cookiesid', arrsid.toString(), {expires:10}); 
				arrnum.push($('#count').val());
				$.cookie('cookienum', arrnum.toString(), {expires:10}); 
			}
			
		});
		
		
		
		
		
	})
})