<?php
	//引入数据库连接
	include "conn.php";
	//1.获取前端传入的用户名和密码
	if(isset($_POST['user']) && isset($_POST['password'])){
		$user=$_POST['user'];
		$pass=sha1($_POST['password']);
		echo $user;
		$result=mysql_query("select * from user where tel='$user' and password='$pass'");
		if(mysql_fetch_array($result)){
			echo true;//登陆成功
		}else{
			echo false;//登陆失败
		}
	}
?>