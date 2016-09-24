/**
 * Created by Administrator on 2016/9/13.
 */
var gulp = require("gulp")



gulp.task("bowerTojs",function(){
    gulp.src(['bower_components/iscroll/src/*.js'])
        .pipe(gulp.dest('js/iscroll'));
    gulp.src(['bower_components/zepto/*.min.js'])
        .pipe(gulp.dest('js/zepto'));
    gulp.src(['bower_components/Swiper/dist/*/*.*'])
        .pipe(gulp.dest('js/swiper'));
})