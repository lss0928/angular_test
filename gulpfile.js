var gulp = require("gulp");
var connect = require("gulp-connect");
var respond = require("gulp-respond");

gulp.task("connect",function(){
	connect.server({
		port:8005
	})
})

gulp.task("default",['connect'])