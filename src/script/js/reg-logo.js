define(['config'],function(){
	require(['jquery','jqcookie','validate'],function(){
		
		//0.表单验证
		
		
		
		
		
		
		
		
		
		//1.注册
		var $tel=$('.tel');
		var $span1=$('.span1');
		var $psw=$('.psw');
		var $span2=$('.span2');
		var $formbox=$('#formbox');
		var $tellock=true;
		
		$tel.focusout(function(){
			$.ajax({
				type:'post',
				url:'http://10.31.162.161/html-5/360store/php/registor.php',
				data:{
					tel:$tel.val()
				}
			}).done(function(data){
				//console.log(data);
				if(!data){
					$span1.html('手机号可用');
					$span1.css({"color":"green"});
					$tellock=true;
				}else{
					$span1.html('该手机号已被注册');
					$span1.css({"color":"red"});
					$tellock=false;
				}
			})
		})
		
		$formbox.submit(function(){
			if(!$tellock){
				return false;
			}
		})
		
		//2.登录
		var $user=$('.user');
		var $passw=$('.passw');
		var $loging=$('.loging');
		
		/* if($user.val()='' || $passw.val('')){
			
		} */
		$loging.on('click',function(){
			$.ajax({
				type:'post',
				url:'http://10.31.162.161/html-5/360store/php/login.php',
				data:{
					user:$user.val(),
					password:$passw.val()
				}
			}).done(function(date){
				if(!date){
					alert('登录失败');
					$passw.val('');
				}else{
					alert('登录成功');
					location.href='http://10.31.162.161/html-5/360store/src/index1.html';
					$.cookie('username',$user.val(),{expires:10});
				}
			})
		})
		
		//3.将cookie的值取出放进首页用户名
		var esc=$('.zhuce');
		var admin=$('.dl');
		var admins=$('.esc a');
		var escs=$('.admin a');
		
		
		if($.cookie('username')){
			esc.css({"display":"none"});
			admin.css({"display":"none"});
			admins.html('欢迎您'+ $.cookie('username'));
			admins.css({"color":"red"});
			escs.html('退出登录');
			
		}
		
		escs.on('click',function(){
			if(window.confirm('你确定要退出吗？')){
				$.cookie('username','',{expirse:-10});
			}
		})
		//4.将购物车的数值添加到首页悬浮购物车内
		//遍历cookie内的cookie数组转换字符串 求和
		var car=$('.car-a span');
		if($.cookie('cookienum')){
			var arr=$.cookie('cookienum').split(',');
			//console.log(arr);
			var sum=0;
			$(arr).each(function(index,value){
				//console.log(value);
				sum+=Number(value);
			})
			//console.log(sum);
			car.html(sum);
			car.css({"color":"red"});
		}else{
			car.html('0');
		}
		

		
		
		
		
	});
});