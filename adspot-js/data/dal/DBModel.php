<?php
/**
 * 数据库封装类，处理参数化查询。
 * 
 * @author xiaozhou
 */

 class DBModel{
 	
 	protected  $conn = null;
 	
 	/**
 	 * 连接数据库
 	 * @param  $host 数据库连接地址
 	 * @param  $db   数据库名
 	 * @param  $user 数据库用户名
 	 * @param  $password  数据库密码
 	 */
 	function __construct($con){
 		$this->conn = $con;
 	}
 	
 	/**
 	 * 转义特殊字符
 	 * @param unknown_type $str
 	 */
 	function safeStr($str){
 		return mysql_real_escape_string($str, $this->conn);
 	}
 	
 }

?>