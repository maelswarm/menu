# menu #

A cli menu for your node.

## Install ##

```
npm install menu
```

## Usage ##

An example node is app.js.

## API ##

Menu is built around tabs. <br><br>
There are currently four types: <br>
	Toggle: This tab functions like a button. <br>
	List: This tab selects a single value from its list. <br>
	Search: This tab takes a string input, and has the function of a list tab. <br>
	Select: This tab creates a selectable drop-down list. <br><br>
	
These tabs are declared as such...

var content = {<br>
		tab1: {title:"column1", seltitle: "COLUMN1", type:"toggle", val:"true", color:"blue"},<br>
		tab2: {title:["column2", "column22"], seltitle: ["COLUMN2", "COLUMN22"], type:"search", input: 0, val:"abcdefgh", color:"red"},<br>
		tab3: {title:"column3", seltitle: "COLUMN3", type:"list", input: 0, val:["a", "b", "c"], color:"white"},<br>
		tab4: {title:"column4", seltitle: "COLUMN4", type:"select", input: 0, val:["1","2","3","4","5","6"], color:"green"}<br>
}


TODO
