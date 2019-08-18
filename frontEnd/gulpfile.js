var gulp = require("gulp");
var merge = require('merge-stream');
var replace = require('gulp-string-replace');
var del = require('del');

gulp.task('clean-dist', () => {
    return del(['dist/**/*']);
});

gulp.task('dist', ()=>
{

    var bootstrapCss = gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
                        .pipe(gulp.dest('dist/css'));

    var uibootstrapCss = gulp.src('node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css')
                        .pipe(gulp.dest('dist/css'));

    var sweetalertCss = gulp.src('node_modules/sweetalert2/dist/sweetalert2.min.css')
                        .pipe(gulp.dest('dist/css'));

    var angularJs = gulp.src('node_modules/angular/angular.min.js')
                    .pipe(gulp.dest('dist/js'));

    var uiBootstrapJs = gulp.src('node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js')
                    .pipe(gulp.dest('dist/js'));

    var ngUiJs = gulp.src('node_modules/@uirouter/angularjs/release/angular-ui-router.min.js')
                    .pipe(gulp.dest('dist/js'));

    var sweetalertJs = gulp.src('node_modules/sweetalert2/dist/sweetalert2.min.js')
                    .pipe(gulp.dest('dist/js'));

    var appJs = gulp.src('app/app.js')
                    .pipe(gulp.dest('dist/app'));

    var loginJs = gulp.src('app/controller/login/login.js')
                    .pipe(gulp.dest('dist/app/controller/login'));

    var index = gulp.src('index.html')
                            .pipe(replace('node_modules/bootstrap/dist/css/bootstrap.min.css', 'dist/css/bootstrap.min.css'))
							.pipe(replace('node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css', 'dist/css/ui-bootstrap-csp.css'))
							.pipe(replace('node_modules/sweetalert2/dist/sweetalert2.min.css', 'dist/css/sweetalert2.min.css'))
                            .pipe(replace('node_modules/angular/angular.min.js', 'dist/js/angular.min.js'))
                            .pipe(replace('node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js', 'dist/js/ui-bootstrap.js'))
                            .pipe(replace('node_modules/@uirouter/angularjs/release/angular-ui-router.min.js', 'dist/js/angular-ui-router.min.js'))
                            .pipe(replace('node_modules/sweetalert2/dist/sweetalert2.min.js', 'dist/js/sweetalert2.min.js'))
                            .pipe(replace('app/app.js', 'dist/app/app.js'))
							.pipe(replace('app/controller/login.js', 'dist/app/controller/login/login.js'))
                            .pipe(gulp.dest('dist'));

    return merge(bootstrapCss, uibootstrapCss, sweetalertCss, angularJs, uiBootstrapJs, ngUiJs, sweetalertJs, appJs, loginJs, index);
});
