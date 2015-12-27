#!/usr/bin/env node

process.stdin.setEncoding('utf8');

var options;
var content = {
		tab1: {title:"column1", seltitle: "COLUMN1", type:"toggle", val:"true", color:"blue"},
		tab2: {title:["column2", "column22"], seltitle: ["COLUMN2", "COLUMN22"], type:"search", input: 0, val:"abcdefgh", color:"red"},
		tab3: {title:"column3", seltitle: "COLUMN3", type:"list", input: 0, val:["a", "b", "c"], color:"white"},
		tab4: {title:"column4", seltitle: "COLUMN4", type:"select", input: 0, val:["1","2","3","4","5","6"], color:"green"}
}

var menu = require('./index.js');
menu.init(content);

function work() {
	menu.start(options, function(result) {
		var key = result[0];
		var column = result[1];
		
		if(key.name=="return" && column.type == "search") {
			menu.draw();
			menu.clivas.line("\n"+column.val+" was entered!")
		} else if(key.ctrl && key.name ==="c") {
			process.exit();
		} else if(key.name ==="backspace") {
			menu.draw();
		} else if(key.name ==="left") {
			menu.draw();
		} else if(key.name ==="up") {
			menu.draw();
		} else if(key.name ==="down") {
			menu.draw();
		} else if(key.name ==="right") {
			menu.draw();
		} else {
			menu.draw();
		}
	})
} work();