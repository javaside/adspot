<?php 

	function _post($name){
		return empty($_POST[$name]) ? null : $_POST[$name];
	}
?>