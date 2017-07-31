#!/usr/bin/env node

const fs = require('fs'),
    colors = require('colors'),
    { argv: { _ : { '0': name } } } = require('optimist'),
    dir = `${process.cwd()}/src`;

const showErr = (msg) => {
    console.log(msg.red);
    process.exit(1);
}

if (name == null) {
    showErr(`please input page's name`);
}

fs.stat(dir, (err, stats) => {
    if (err) {
        showErr(`no such file or directory, stat ${dir}`);
    }
    fs.readdir(dir, (err, files) => {
        const rename = files.some(file => file === name);
        if (rename) {
            showErr(`you already had a page named ${name}`);
        }
        require('../lib/index')(name, dir);
    });
});
