'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const browserify = require('browserify');
const tap = require('gulp-tap');
const buffer = require('gulp-buffer');
const uglify = require('gulp-uglify');
const spritesmith = require('gulp.spritesmith');
// const pug = require('gulp-pug');
const twig = require('gulp-twig');
const browserSync = require("browser-sync");


let srcDir = './src/',
	buildDir = './http/',
	templateType = 'twig'; // should be ether pug or twig 


let path = {
	build: {
		sprite: buildDir + 'img',
		sprite_style: srcDir + 'css',
		css: buildDir + 'css',
		fonts: buildDir + 'css/fonts',
		images: buildDir + 'img',
		js: buildDir + 'js',
		html: buildDir + '/html',
		files: buildDir,
	},

	src: {
		sprite: srcDir + 'sprite/**/*.png',
		css: srcDir + 'css/*.scss',
		fonts: srcDir + 'fonts/*.*',
		images: srcDir + 'img/**/*.*',
		js: srcDir + 'js/*.js',
		html: srcDir + (templateType === 'pug' ? 'html/*.+(jade|pug)' : 'html/*.twig'),
		files: [srcDir + 'files/**/*.*', srcDir + 'files/**/.*'],
	},

	watch: {
		sprite: srcDir + 'sprite/**/*.png',
		css: srcDir + 'css/**/*.scss',
		fonts: srcDir + 'fonts/*.*',
		images: srcDir + 'img/**/*.*',
		js: srcDir + 'js/**/*.*',
		html: srcDir + 'html/**/*.*',
		files: [srcDir + 'files/**/*.*', srcDir + 'files/**/.*'],
	},

	clean: buildDir + '*'
};

function files() {
	return gulp.src(path.src.files)
		.pipe(gulp.dest(path.build.files))
		.pipe(browserSync.reload({stream: true}));
}

gulp.task("files", files);

function sprite(cb) {
	let spriteData =
		gulp.src(path.src.sprite)
			.pipe(spritesmith({
				imgName: 'sprite.png',
				retinaImgName: 'sprite@2x.png',
				retinaSrcFilter: path.src.sprite.replace(/\.png/i, '@2x.png'),
				imgPath: '../img/sprite.png?t' + (new Date()).getTime(),
				retinaImgPath: '../img/sprite@2x.png?t' + (new Date()).getTime(),
				cssFormat: 'scss_retina',
				cssName: '_sprite.scss',

				padding: 2
			}))


	spriteData.img.pipe(gulp.dest(path.build.sprite));
	spriteData.css.pipe(gulp.dest(path.build.sprite_style))
		.pipe(browserSync.reload({stream: true}));

	cb();
}

gulp.task("sprite", sprite);

function css() {
	return gulp.src(path.src.css)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.reload({stream: true}));
}

gulp.task("css", css);

function fonts() {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(browserSync.reload({stream: true}));
}

gulp.task("fonts", fonts);

function images() {
	return gulp.src(path.src.images)
		.pipe(gulp.dest(path.build.images))
		.pipe(browserSync.reload({stream: true}));
}

gulp.task("images", images);


function js() {
	return gulp.src(path.src.js, {read: false})
		.pipe(tap(function (file) {
			file.contents = browserify(file.path, {debug: true}).bundle();
		}))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(babel({
			presets: ['@babel/env'],
			"plugins": ["@babel/plugin-proposal-class-properties"]
		}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.reload({stream: true}));
}

gulp.task("js", js);

function html() {
	switch (templateType) {
		case 'twig':
			return gulp.src(path.src.html)
				.pipe(twig())
				.pipe(gulp.dest(path.build.html))
				.pipe(browserSync.reload({stream: true}));

		case 'pug':
			return gulp.src(path.src.html)
				.pipe(pug({pretty: '\t'}))
				.pipe(gulp.dest(path.build.html))
				.pipe(browserSync.reload({stream: true}));
	}
}

gulp.task("html", html);


gulp.task('build', gulp.parallel(css, fonts, images, js, html, sprite, files));

function webserver() {
	browserSync({
		server: {
			baseDir: './http',
			index: "/html",
			directory: true
		}
	});
}

gulp.task('webserver', webserver);

function watchFiles() {
	gulp.watch(path.watch.sprite, sprite);
	gulp.watch(path.watch.fonts, fonts);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.css, css);
	gulp.watch(path.watch.files, files);
}

gulp.task("watch", gulp.parallel('build', watchFiles));


gulp.task("dev", gulp.parallel(['webserver', 'watch']));