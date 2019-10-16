const { src, dest, parallel } = require('gulp');
const babel = require('gulp-babel');

function es5() {
    return src('src/FormValidator.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dist'));
}

exports.default = es5;
