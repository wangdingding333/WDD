define(['config'],function(){
	require(['jqcookie'],function(){
		
		//0.表单验证
		(function(){
			//var tel=$('.tel');
			//var psw=$('.psw');
			var sign=$('#sign-up');
			var telflag=true;
			var passwordflag=true;
			
			$(document).ready(function(){
				//$tel.focus();
				$tel.on('focus',function(){
					//console.log($(this).val());
					if($(this).val()==''){
						$span1.html('请输入正确的手机号');
						$span1.css({"color":"red"});
					}
				});
				
				$tel.on('blur',function(){
					if($(this).val()!==''){
						var regtel=/^1[35784]\d{9}$/;//正则表达式
						if(regtel.test($(this).val())){
							$span1.html('手机号验证通过');
							$span1.css({"color":"green"});
							telflag=true;
						}else{
							$span1.html('手机号格式不正确');
							$span1.css({"color":"red"});
							telflag=false;
						}
					}else{
						$span1.html('手机号不能为空');
						$span1.css({"color":"red"});
						telflag=false;
					}
				});
				
				$psw.on('blur',function(){
					if($(this).val()!=''){
						if(passwordflag){
							$span2.html('密码验证通过');
							$span2.css({"color":"green"});
							passwordflag=true;
						}else{
							$span2.html('密码太low了');
							passwordflag=false;
						}
					}else{
						$span2.html('密码不能为空');
						$span2.css({"color":"red"});
						passwordflag=false;
					}
				})
				
				$psw.on('input',function(){
					var regnum=/\d+/;//数字
					var reglow=/[a-z]+/;//字母
					var regup=/[A-Z]+/;//大写
					var other=/[^0-9a-zA-Z]/;//混合数据
					var num=0;
					if($(this).val().length>8 && $(this).val().length<16){
						if(regnum.test($(this).val())){
							num++;
						}
						if(reglow.test($(this).val())){
							num++;
						}
						if(regup.test($(this).val())){
							num++;
						}
						if(other.test($(this).val())){
							num++;
						}
						switch(num){
							case 1: $span2.html('密码强度：弱'); $span2.css({"color":"red"}); passwordflag=false; break;
							case 2:
							case 3: $span2.html('密码强度：中'); $span2.css({"color":"orange"});passwordflag=true; break;
							case 4: $span2.html('密码强度：强'); $span2.css({"color":"green"});passwordflag=true; break;
						}
					}else{
						$span2.html('密码长度为8-16位之间');
						$span2.css({"color":"red"});
						passwordflag=false;
					}
				})
				
				/* $('.quc-checkbox').on('change',function(){
					if($('.end').find('input:checkbox').prop('checked')){
						$('.quc-checkbox').attr("disabled",false); 
					}
				}) */
				
				
				//表单提交
				$formbox.on('submit',function(){
					if($tel.val()==''){
						$span1.html('手机号不能为空');
						$span1.css({"color":"red"});
						telflag=false;
					}
					if($psw.val()==''){
						$span2.html('密码不能为空');
						$span2.css({"color":"red"});
						passwordflag=false;
					}
					
					if(!telflag || !passwordflag){
						return false;
					}
					
				})
				
				
				
			})
		})();
		
		
		
		
		
		
		
		
		//1.注册
		var $tel=$('.tel');
		var $span1=$('.span1');
		var $psw=$('.psw');
		var $span2=$('.span2');
		var $formbox=$('#formbox');
		var $tellock=true;
		
		$tel.on('blur',function(){
			$.ajax({
				type:'post',
				url:'http://10.31.162.161/html-5/360store/php/registor.php',
				data:{
					tel:$tel.val()
				}
			}).done(function(data){
				//console.log(data);
				if(!data){
					/* telflag=true;
					$span1.html('手机号可用');
					$span1.css({"color":"green"}); */
					$tellock=true;
				}else{
					$span1.html('该手机号为空或已被注册');
					$span1.css({"color":"red"});
					$tellock=false;
				}
			})
		})
		
		$formbox.on('submit',function(){
			if(!$tellock){
				return false;
			}
		})
		
		//2.登录
		var $user=$('.user');
		var $passw=$('.passw');
		var $loging=$('.loging');
		
		
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
					$passw.val();
				}else{
					alert('登录成功');
					location.href='http://10.31.162.161/html-5/360store/src/index.html';
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