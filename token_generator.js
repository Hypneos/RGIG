 
function token( tk, a ){
	return {
		noun: tk,
		det: ( a === "" )? "" : a || "a"
	};
}
