angular.module("myapp").service('apiService',function($rootScope , $http , $location){

	this.getData = function(url ,data ,method){
		method = method.toUpperCase();
		var str = "";
		var arr = [];
		//遍历data对象，转换为key=val&key=val的格式
		for(i in data){
			str = i+"="+data[i];
			arr.push(str) 
		}
		data = arr.join("&");//k=v&k=v
		//判断请求方式
		if(method == "GET"){
			//进行get请求
			return $http.get(url+"?"+data)
		}
		else{
			return $http.post(url+"?"+data)
		}
	}
})


/*$.ajax({
	url:,
	type:'get',
	success:function(res){},
	error:function(){}
})*/