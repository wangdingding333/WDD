define(['config'],function(){
	require(['jquery','jqcookie'],function(){
		
		//1.封装函数实现商品列表创建
		function goodslist(sid,num){//sid:商品的编号，num：商品的编号
			$.ajax({
				url:'http://10.31.162.161/html-5/360store/php/360data.php',
				dataType:'json'
			}).done(function(data){
				//console.log(data);
				$.each(data,function(index,value){
					if(sid==value.sid){//比当前传入的sid和数据里的sid比较，相同获取整条数据
						var clonegoodslist=$('.cartdata:hidden').clone(true,true);
						clonegoodslist.find('.s2 img').attr('src',value.url);
						clonegoodslist.find('.s2 img').attr('sid',value.sid);
						clonegoodslist.find('.p-info').html(value.title);
						clonegoodslist.find('.price i').html(value.price);
						clonegoodslist.find('.quantity input').val(num);
						clonegoodslist.find('.sum i').html((num*value.price).toFixed(2));
						clonegoodslist.css('display','block');
						$('.cartlist').append(clonegoodslist);//追加
						totalprice();//计算总价
					}
				})
			});
		}
		//2.通过cookie熏染商品列表
		if($.cookie('cookiesid') && $.cookie('cookienum')){
			var sid=$.cookie('cookiesid').split(',');
			var num=$.cookie('cookienum').split(',');
			
			$.each(sid,function(index,value){
				goodslist(sid[index],num[index]);
			})
		}
		
		//3.如果商品列表存在，隐藏初始画面
		empty();
		function empty(){
			if($.cookie('cookiesid') || $.cookie('cookienum')){
				$('.emptylist').hide();
				$('.title').show();
			}else{
				$('.emptylist').show();
				$('.title').hide();
			}
		}
		//4.计算商品数量和总价
		
	
		function totalprice(){
			var allprice=0;
			var allcount=0;
			$('.cartdata:visible').each(function(){
				if($(this).find('input:checkbox').prop('checked')){
					allprice+=parseFloat($(this).find('.sum i').html());
					allcount+=parseFloat($(this).find('.quantity input').val());
				}
			});
			$('.right strong').html('￥'+ allprice);
			$('.right span i').html(allcount);
		}
		
		//5.全选按钮
		$('.title input').on('change',function(){
			$('.cartdata:visible').find('input:checkbox').prop('checked',$(this).prop('checked'));
			$('.title input').prop('checked',$(this).prop('checked'));
			totalprice();
		});
		var $inputs=$('.cartdata:visible').find('input:checkbox');
		$('.cartlist').on('input',$inputs,function(){//事件委托
			if($('.cartdata:visible').find('input:checkbox').size()==$('.cartdata:visible').find('input:checked').length){
				$('.title input').prop('checked',true);
			}else{
				$('.title input').prop('checked',false);
			}
			totalprice();
		});
		
		//6.改变商品数量
		$('.add').on('click',function(){
			var addvalue=$(this).parents('.cartdata').find('.quantity input').val();
			addvalue++;
			if(addvalue>99){
				addvalue=99;
			}
			$(this).parents('.cartdata').find('.quantity input').val(addvalue);
			$(this).parents('.cartdata').find('.sum i').html(calcsingleprice($(this)));
			totalprice();
			changecookie($(this));
			
		});
		
		
		$('.rem').on('click',function(){
			var addvalue=$(this).parents('.cartdata').find('.quantity input').val();
			addvalue--;
			if(addvalue<=0){
				addvalue=1;
			}
			$(this).parents('.cartdata').find('.quantity input').val(addvalue);
			$(this).parents('.cartdata').find('.sum i').html(calcsingleprice($(this)));
			totalprice();
			changecookie($(this));
		});
		
		
		$('.quantity input').on('input',function(){
			var reg=/^\d+$/g;
			if(reg.test($(this).val())){
				var $value=$(this).val();
				if($value>99){
					$(this).val(99);
				}else if($value <= 0){
					$(this).val(1);
				}else{
					$(this).val($value);
				}
			}else{
				$(this).val(1);
			}
			$(this).parents('.cartdata').find('.sum i').html(calcsingleprice($(this)));
			totalprice();
			changecookie($(this));
		});
		
		//封装函数实现价格的计算
		function calcsingleprice(obj){
			var $singleprice=parseFloat(obj.parents('.cartdata').find('.price i').html());
			var $addvalue=parseInt(obj.parents('.cartdata').find('.quantity input').val());
			return ($singleprice*$addvalue).toFixed(2);
		}
		
		
		//将cookie值取出，转换成数组。
		var sidarr=[];//商品的编号
		var numarr=[];//商品的数量
		function cookietoarray(){
			if($.cookie('cookiesid') && $.cookie('cookienum')){
				sidarr=$.cookie('cookiesid').split(',');
				numarr=$.cookie('cookienum').split(',');
			}
		}
		
		//将改变的值存放到cookie里面。
		//将当前改变数量的商品列表下面找到对应的id和cookie里面的sid比较找到位置，通过位置找到数量数组中的位置，进行重新赋值
		function changecookie(obj){
			cookietoarray();
			var sid=obj.parents('.cartdata').find('.s2 img').attr('sid');
			numarr[$.inArray(sid,sidarr)]=obj.parents('.cartdata').find('.quantity input').val();
			$.cookie('cookienum',numarr.toString(),{expires:10});
		}
		
		//7.删除
		$('.cartlist').on('click','.action a',function(){//$(this)-->.b-action a
			if(window.confirm('你确定要删除吗？')){
				$(this).parents('.cartdata').remove();
				deletecookie($(this).parents('.cartdata').find('.s2 img').attr('sid'),sidarr);
			}
		});
		
		
		function deletecookie(sid){
			cookietoarray();
			var $index=$.inArray(sid,sidarr);
			console.log($index);
			sidarr.splice($index,1);
			numarr.splice($index,1);
			$.cookie('cookiesid',sidarr.toString(),{expires:10});
			$.cookie('cookienum',numarr.toString(),{expires:10});
		}
		
		
		
		
		
		
		
		
		
		
		
	})
})