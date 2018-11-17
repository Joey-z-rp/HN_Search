const del   = require('del');
const fs    = require('fs');
const gulp  = require('gulp');
const shell = require('gulp-shell');
const path  = require('path');

gulp.task('start', ['clean', 'devBuild', 'checkCompletion', 'runNodemon']);

gulp.task(
    'devBuild',
    ['clean'],
    shell.task('webpack --config ./webpackConfig/development.js --watch'),
);

gulp.task(
    'build',
    ['clean'],
    shell.task('webpack --config ./webpackConfig/production.js'),
);

gulp.task('clean', () => del(['build']));

gulp.task('checkCompletion', ['clean'], checkCompletion);

gulp.task('runNodemon', ['checkCompletion'], shell.task('nodemon ./build/server.js'));

function checkCompletion(cb) {
    const server = path.resolve(__dirname, './build/server.js');
    const client = path.resolve(__dirname, './build/public/app.js');

    const timer = setInterval(() => {
        if (fs.existsSync(server) && fs.existsSync(client)) {
            clearInterval(timer);
            return cb();
        }
    }, 500);
}