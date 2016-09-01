

//路由
function config($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){//设置状态机制，设置url地址
	$urlRouterProvider.otherwise('/login');//设置初始页面地址，初始化  重定向
										//state 设置每个url的配置
	$stateProvider
		.state('aa',{
			url:'/aa',
			templateUrl:'aa.html'
		})
		.state('login',{
			url:'/login',
			templateUrl:'views/login.html'
		})
		.state('bb',{
			url:'/bb?name',//在地址栏传递的参数
			templateUrl:'views/bb.html',//模板页面
			data:{
				tit:"bb_page"
			},
			resolve:{//懒加载，当用户请求相应的页面时，加载相应的样式表，请求过一次后会将其自动缓存。
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					
					 $ocLazyLoad.load(['css/index.css','css/style.css']);//加载css文件
				}]
			}

		})
		.state('list',{
			url:'/list?id&price',
			templateUrl:'views/list.html',
			
			data:{
				tit:"list_page"
			},
			resolve:{
				loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
					
					$ocLazyLoad.load("css/style.css");//加载css文件
				}]
			}
		})
		.state('product',{
			url:'/product?id&brand',
			templateUrl:'views/product.html',
			
			data:{
				tit:"product_page"
			}
		})
		.state('product.pro1',{//product下的子页面，用.连接
			url:'/pro1',//
			templateUrl:'views/pro1.html'
		})
		.state('product.pro2',{
			url:'/pro2',
			templateUrl:'views/pro2.html'
		})
		.state('product.pro1.pro1_1',{
			url:'/pro1_1',
			templateUrl:'views/pro1_1.html'
		})
		.state('filter',{
			url:"/filter",
			templateUrl:"views/filter.html"
		})
		.state('options',{
			url:'/options',
			templateUrl:'views/options.html'
		})

}
angular.module('myapp')
		.config(config)
		/*.run(function($rootScope,$state){
			$rootScope.$state=$state;
		});*/