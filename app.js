#!/usr/bin/env node

process.stdin.setEncoding('utf8');

var content = {
		col1: {title:"column1", seltitle: "COLUMN1", type:"toggle", val:"true", color:"blue"},
		col2: {title:["column2", "column22", "column222"], seltitle: ["COLUMN2", "COLUMN22", "COLUMN222"], type:"search", input: 0, val:"blade runner", color:"red"},
		col3: {title:"column3", seltitle: "COLUMN3", type:"list", input: 0, val:["a", "b", "c"], color:"white"},
		col4: {title:"column4", seltitle: "COLUMN4", type:"select", input: 0, val:["1","2","3","4","5","6"], color:"green"}
}

var options;

var menu = require('./index.js');
menu.columns = content;
menu.init();
function go() {
	menu.start(options, function(result) {
		if(result[0].ctrl && result[0].name ==="c") {
			process.exit();
		}
	})
}
go();

//console.log(content.col1.title)