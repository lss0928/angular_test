login	
angular.module("myapp")//控制器
		.controller('aa',aa)//aa.html
		.controller('loginCtrl',loginCtrl)//aa.html
		.controller('box1',box1)//添加任务
		.controller('box2',box2)
		.directive('pageTitle',pageTitle)
		.controller("index1",index)//(控制器名称,定义的函数名称) bb.html
		.controller("child1",child1)
		.controller("child2",child2)
		.controller("sibling",sibling)			
		.directive('createDom',createDom)
		.controller('listCtrl',listCtrl)
		.controller('infoCtrl',infoCtrl)//list.html的子页面
		.controller('filterCtrl',filterCtrl)
		.controller('productCtrl',productCtrl)
		.controller('pro1Ctrl',pro1Ctrl)
		.controller('pro1_1Ctrl',pro1_1Ctrl)
		.controller('pro2Ctrl',pro2Ctrl)
		.controller('optionsCtrl',optionsCtrl)
		//angular中返回 module方法，module方法返回controller方法

		//aa.html页面的最大的控制器
		function aa($scope,$rootScope){
			$rootScope.bClass = "bounce";
			console.log("aa+bounce")
			$scope.productShow=false;
			$scope.showThree=false;
			
			$scope.toggleProduct=function(){
				$scope.productShow=!$scope.productShow;
			
			}
			$scope.toggleThree=function(){
				$scope.showThree=!$scope.showThree;

			}
			
		}
		//添加任务
		function box1($scope,$rootScope){
			$scope.task = [
							{id:0,txt:"11111",bg:true},
							{id:1,txt:"22222",bg:false}
						];
			$scope.btn = function(){//提交任务
				$scope.task.push({
					id:new Date()*1,
					txt:$scope.txt,
					bg:false
				})	
			}
			$scope.finish = function($index){
				//console.log($index)	
				$scope.task[$index].bg = !$scope.task[$index].bg;//传当前索引$index 是ng-repeat 特有的 
				//$scope.task[this.$index].bg = !$scope.taskthis.[this.$index].bg;//不传参的情况下
			}
			$scope.clean = function(){	
				/*for(var i in $scope.task){
					$scope.task[i].bg = false;
				}*/
				$scope.task.forEach(function(v){
					v.bg = false;
				})
			}
		}
		//添加用户信息
		function box2($scope){
			$scope.arr =[
						{"id":"0","name":"张三","age":"20","sex":"男","email":"11111111"},
						{"id":"1","name":"李斯","age":"22","sex":"女","email":"22222222222"},
						{"id":"2","name":"王五","age":"23","sex":"男","email":"333333333"}
					];		
			//添加	
			$scope.add = function(){
				//判空
				if(!($scope.name && $scope.sex && $scope.age && $scope.email)){
					alert("请添写完整");
					return false;
				}					
				$scope.arr.push({//追加
					id:new Date()*1,
					name:$scope.name,
					sex:$scope.sex,
					age:$scope.age,
					email:$scope.email,
					_color:false
				});
				//恢复颜色	
				$scope.arr.forEach(function(v){
					v._color = false;
				})
				$scope.name = $scope.sex = $scope.age = $scope.email = "";//清空文本框

				//console.log($scope.arr)
			}
			//修改
			$scope.update = function(updateId){
				//判空
				if(!($scope.name && $scope.sex && $scope.age && $scope.email)){
					alert("请添写完整");
					return false;
				}	
				for(var i in $scope.arr){
					if($scope.arr[i].id == updateId){
						$scope.arr[i]={//替换数组中的此项
							id:updateId,
							name:$scope.name,
							sex:$scope.sex,
							age:$scope.age,
							email:$scope.email,
							_color:false
						}
					}
				}
				//恢复颜色	
				$scope.arr.forEach(function(v){
					v._color = false;
				})
				$scope.name = $scope.sex = $scope.age = $scope.email = "";//清空文本框

			}
			//删除
			$scope.del = function(id){//删除
				var idx = this.$index;
					$scope.arr.splice(idx,1);//将数组中的此项删除
			}
			Array.prototype.remove =function(idx){//扩展一个删除数组中的指定项方法
				/*for(var i=0 i<this.length;i++){

				}*/
			}
			//编辑
			$scope.edit = function(){//编辑,回显到表单中
				var obj = $scope.arr[this.$index];	

				$scope.updateId = obj.id;//将要编辑的数据的id赋值给updateId
				$scope.name = obj.name;
				$scope.sex = obj.sex;
				$scope.age = obj.age;
				$scope.email = obj.email;
				$scope.arr.forEach(function(v){
					v._color = false;
				})
				obj._color = true;
				//console.log(obj)
			}
			
		}
		//自定义指令,改变页面的title
		function pageTitle($rootScope,$location){
			//console.log($location.search());//获取当前页面地址栏参数  {id: "20", name: "jone", addr: "北京"}
			return {
				link:function(scope,ele){
					$rootScope.$on('$stateChangeStart',function(event,toState){
						//console.log(toState);//{url: "/bb", templateUrl: "views/bb.html", controller: "bb", data: Object, name: "bb"}
						if(toState && toState.data && toState.data.tit){
							ele.html(toState.data.tit)
						}	
					})					
				}
			}
		}
		//登录
		function loginCtrl($rootScope,$scope,apiService,$http,$location){
			console.log($rootScope)
			//获取用户名 密码
			$scope.postData = {};
			$scope.login = function(){
				//console.log($scope.postData)
				//http请求
				apiService.getData('data/login.json',$scope.postData,'get')
							.success(function(data){ 
								//console.log(data)
								//遍历返回的json
								for(i in data ){
									if(data[i].name == $scope.postData.username && data[i].password == $scope.postData.password){
										console.log("登录成功")
										$location.url('/bb?name='+$scope.postData.username)//跳转到bb页面

									}else{//bug输出很多次
										console.log('用户名或密码错误')
									}
								}
							})
			}
			$scope.myHtml = '<h2>ng-bind-html用法</h2>';
			$scope.myTemplate1 = 'ng-bind-myTemplate1用法';
			$scope.myTemplate2 = 'ng-bind-myTemplate2用法';
			$scope.tabMenu = ['tab1','tab2','tab3','tab4']
			$scope.clickTab = function(){

				$scope.tabSelect = 'tab'+(this.$index+1)
				console.log($scope.tabSelect)
			}
		}
		function index($scope,$rootScope,$location){
			//获取地址栏参数 $location.search()返回一个对象
			$scope.username = $location.search().name;
			console.log($location.search())
			$rootScope.bClass = "zoomIn";
			console.log("bb+zoomIn")

			$rootScope.e="全局";
			$scope.a=10;
			$scope.data="hello World";
			$scope.json=[
			{"name":"张三1","age":20,"flag":true,"class":"aa1"},
			{"name":"张三2","age":30,"flag":false,"class":"aa2"}];
			$scope.json.push({"name":"张三3","age":25,"flag":true,"class":"aa3"});
			$scope.sub=function(){
				var c="我是父级局部变量";
				//父级向子级广播数据
				$scope.$broadcast("parentData",c);//需要事件触发
				
			}
			//监听子级的局部数据
			$scope.$on("childData",function(err,data){
				$scope.childData=data;
			});
		}
		
		
		function child1($scope,$rootScope){
			
			//console.log($rootScope.e);//全局变量，任何地方都可以访问到
			$scope.str=$scope.json;//子级可以访问父级中的数据

			//监听父级的局部数据
			$scope.$on("parentData",function(err,data){
				alert(data)
			})

			var d="子级局部变量";
			$scope.$emit("childData",d);//子级向父级传播
		}
		function child2($scope){
			$scope.child="child";
			//从父级获取
			$scope.$on("parentData",function(err,data){
				
				$scope.child=data;//点击以后才能赋值给$scope.child
			})
		}
		//创建自定义指令
		function createDom($rootScope){ //驼峰命名，使用自定义指令时，对应写成create-dom

			return {
				restrict:"AEC",//  A 属性 <div create-dom ></div>   C 类名（很少用）<div class="create-dom"></div> E 标签<create-dom></create-dom>
				template:"<h3>自定义指令createDom</h3>",
				link:function(scope,ele){
					//console.log("scope="+scope);//父级的数据
					//console.log(ele);//绑定自定义指令的元素div
					var str='';
					for(i in scope.json){
						str+='<li>姓名：'+scope.json[i].name+'   年龄：'+scope.json[i].age+'</li>'
					}
					ele.append(str)
					ele.on("click",function(){//绑定事件
						//console.log(this)
						ele[0].style.color="red"; //ele是jQuery对象
						//或者ele.css("color","red")
					})
					

				}
			}
		}

		
			

		function sibling($scope,$rootScope){
			$scope.show=false;

			$scope.toggle=function(){
				$scope.show=!$scope.show;
			}
			//console.log($rootScope.e);//全局变量可以再任何地方访问
		}



		//bb.html
		function listCtrl($scope,$rootScope,$location){
			$rootScope.bClass = "rollIn";//添加动页面切换画
			console.log($rootScope)
			$scope.data={};
			$scope.search = $location.search().id;

			$scope.getData=function(){
				
				//console.log($scope.data)
			}
		}

		function infoCtrl($scope){//list.html的子页面
			//console.log("infoCtrl")
			
		}
		function filterCtrl($scope,$rootScope){
			//console.log("filterCtrl")
			$rootScope.bClass = "rotatePage";
			console.log("filter+rotatePage")
		}
		function productCtrl($scope,$rootScope){
			
			$rootScope.bClass = "bounceInLeft";
			console.log("product+bounceInLeft")
		}
		function pro1Ctrl($scope){
			
			
		}
		function pro1_1Ctrl($scope){
			
			
		}
		function pro2Ctrl($scope){
			
			
		}

		function optionsCtrl($scope,$rootScope){
			console.log("ng-options");
			$rootScope.bClass = "hinge";//折页
			$rootScope.bClass = "rotateInUpRight";//右上角旋转进入到
			$rootScope.bClass = "rotateIn";//旋转进入到
			$rootScope.bClass = "lightSpeedIn";//缓慢加速进入
			$rootScope.bClass = "flipInY";//轻弹
			$rootScope.bClass = "fadeInUpBig";//向上淡入
			

			$scope.colors = [
				{id:1,name:'black',shade:'dark'},
				{id:2,name:'white',shade:'light',notAnOption:true},
				{id:3,name:'red',shade:'dark'},
				{id:4,name:'blue',shade:'dark',notAnOption:false},
				{id:5,name:'yellow',shade:'light',notAnOption:true},
				{id:5,name:'yellow',shade:'light',notAnOption:true}
			];
			$scope.myColor = $scope.colors[2];
		}


		//过滤

		angular.module("myapp")
				.filter("unique",function(){

					return function(arr){
						var obj = {};//无兼容问题
						var arr2 = [];
						for(var i = 0 ,len = arr.length ; i<len ; i++){
							if( !obj[arr[i]] ){
								obj[arr[i]] = true;
								arr2.push(arr[i]);
							}
						}
						return arr2;
					}
					
				})
