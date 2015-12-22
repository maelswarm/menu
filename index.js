var clivas = require('clivas')
var keypress = require('keypress')
keypress(process.stdin);

var inputStr = ""

var currentCol;
var currentSel;
var idx = module.exports = {};
idx.columns;
idx.column_cnt = 0;
idx.column_val = 1000;

idx.init = function() {
	//console.log(idx.columns);
	for(var item in idx.columns) {
		//console.log(item);
		for(var item1 in item) {
			//console.log(item1);
		}
		idx.column_cnt++;
	}
	draw();
}

function draw() {

	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	clivas.clear()
	clivas.line("{bold:┎──────────────────────────────────────────────────────────────────────────────────────────────────────────────────}")
	//console.log(idx.columns);



//	for (var key in idx.columns) {
//	if (idx.columns.hasOwnProperty(key)) {
//	var obj = idx.columns[key];
//	for (var prop in obj) {
//	if(obj.hasOwnProperty(prop)){
//	clivas.line(prop + " = " + obj[prop]);
//	}
//	}
//	}
//	}


	clivas.write("{bold:┃ }");
	var cnt = 0;
	var modul = idx.column_val%idx.column_cnt;
	for(var key in idx.columns) {
		if(cnt === modul-1) {
			if(idx.columns[key].type === "search") {
				var i = Math.abs(idx.columns[key].input%idx.columns[key].val.length);
				clivas.write("{bold+"+idx.columns[key].color+":"+idx.columns[key].title[i]+" }");
				clivas.write("{bold:┃ }");
			} else {
				clivas.write("{bold+"+idx.columns[key].color+":"+idx.columns[key].title+" }");
				clivas.write("{bold:┃ }");
			}
		} else if(cnt === modul){
			currentCol = idx.columns[key];
			if(currentCol.type === "toggle") {
				clivas.write("{bold+"+currentCol.color+":"+currentCol.seltitle+" "+currentCol.val+" }");
			} else if(currentCol.type === "list") {
				var i = Math.abs(currentCol.input%currentCol.val.length);
				clivas.write("{bold+"+currentCol.color+":"+currentCol.seltitle+" "+currentCol.val[i]+" }");
			} else if(currentCol.type === "search") {
				var i = Math.abs(currentCol.input%currentCol.title.length);
				clivas.write("{bold+"+currentCol.color+":"+currentCol.seltitle[i]+" }");
			}
			else {
				currentSel = currentCol;
				clivas.write("{bold+"+idx.columns[key].color+":"+idx.columns[key].seltitle+" }");
			}
			clivas.write("{bold:┃ }");
		} else {
			if(idx.columns[key].type === "search") {
				var i = Math.abs(idx.columns[key].input%idx.columns[key].val.length);
				clivas.write("{bold+"+idx.columns[key].color+":"+idx.columns[key].title[i]+" }");
				clivas.write("{bold:│ }");
			} else {
				clivas.write("{bold+"+idx.columns[key].color+":"+idx.columns[key].title+" }");
				clivas.write("{bold:│ }");
			}
		}
		cnt++;
	}
	clivas.line("")
	clivas.line("{bold:┠──────────────────────────────────────────────────────────────────────────────────────────────────────────────────}")
	
	if(currentSel !== undefined) {
		var x = Math.abs(currentSel.input%currentSel.val.length);
		for(var i=0; i<currentSel.val.length; i++) {
			if(x == i) {
				clivas.line("{bold+cyan+blink:>}"+"{bold+cyan: "+currentSel.val[i]+"}");
			}
			else {
				clivas.line("{bold:┃ "+currentSel.val[i]+"}");
			}
		}
	}
	
	clivas.line("{bold:┖──────────────────────────────────────────────────────────────────────────────────────────────────────────────────}")
	
	clivas.line("");
	if(currentCol.type === "toggle") {
	} else if(currentCol.type === "search") {
		process.stdout.clearLine()
		process.stdout.cursorTo(0)
		process.stdout.write(" Search:"+ currentCol.val)
	} else if(currentCol.type === "list") {
	}
}

idx.start = function(params, callback) {
	var stdin = process.openStdin()
	process.stdin.setRawMode(true)
	stdin.on('keypress', function (chunk, key) {
		if (key && key.ctrl && key.name == 'c') {
			callback([key, currentCol]);
		}
		else if(key.name == "right") {
			idx.column_val++;

			draw();
			callback([key, currentCol]);
		}
		else if(key.name == "left") {
			idx.column_val--;

			draw();
			callback([key, currentCol]);
		}
		else if(key.name == "up") {

			if(currentCol.type === "toggle") {
				if(currentCol.val != false) {
					currentCol.val = false;
				} else {
					currentCol.val = true;
				}
			} else if(currentCol.type === "list") {
				++currentCol.input;
			} else if(currentCol.type === "search") {
				++currentCol.input;
			} else if(currentCol.type === "select") {
				++currentCol.input;
			}
			draw();
			callback([key, currentCol]);
		}
		else if(key.name == "down") {

			if(currentCol.type === "toggle") {
				if(currentCol.val != false) {
					currentCol.val = false;
				} else {
					currentCol.val = true;
				}
			} else if(currentCol.type === "list") {
				--currentCol.input;
			} else if(currentCol.type === "search") {
				--currentCol.input;
			} else if(currentCol.type === "select") {
				--currentCol.input;
			}
			draw();
			callback([key, currentCol]);
		}
		else if(key.name == "backspace") {

			if(currentCol.type === "toggle") {
				if(currentCol.val != false) {
					currentCol.val = false;
				} else {
					currentCol.val = true;
				}
			} else if(currentCol.type === "list") {

			} else if(currentCol.type === "search") {
				currentCol.val = currentCol.val.slice(0, currentCol.val.length-1)
				process.stdout.clearLine()
				process.stdout.cursorTo(0)
				process.stdout.write(" Search:"+ currentCol.val)
			}
			draw();
			callback([key, currentCol]);
		}
		else if(key.name == "return") {
			if(currentCol.type === "toggle") {
				if(currentCol.val != false) {
					currentCol.val = false;
				} else {
					currentCol.val = true;
				}
			} else if(currentCol.type === "list") {
			} else if(currentCol.type === "search") {
			}
			draw();
			callback([key, currentCol]);
		}
		else {
			if(currentCol.type === "toggle") {

			} else if(currentCol.type === "list") {

			} else if(currentCol.type === "search") {
				currentCol.val += chunk
				process.stdout.clearLine()
				process.stdout.cursorTo(0)
				process.stdout.write(" Search:"+ currentCol.val)
			}
			callback([key, currentCol]);
		}
	})
}