<?php
	
	include "conn.php";
	//二.后端获取手机号码和数据库进行匹配 --sql语句
	if(isset($_POST['tel'])){
		$tel=$_POST['tel'];
		$result=mysql_query("select * from user where tel='$tel'");
		//echo $result;
		//如果$result存在值，tel已经存在
		if(mysql_fetch_array($result)){//存在
			echo true;
		}else{//不存在
			echo false;
		}
	}
	
	
	
	//一.确认点击的是提交按钮
	if(isset($_POST['submit'])){
		$tel=$_POST['tel'];
		$pass=sha1($_POST['password']);
		$query="insert user values(NULL,'$tel','$pass',NOW())";
		mysql_query($query);
		
		//3.跳转到登陆页面
		header('location:http://10.31.162.161/html-5/360store/src/login.html');
	}
	

?>