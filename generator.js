
let output_element;
let button_element;


let excuses = [
	"Another one"
];
const excuses_pow2 = Math.pow( 2, excuses.length - 1 );



let theme_combinator = [
	"and",
	"versus",
	"after",
	"within",
	"without",
	"in exchange of",
	"<abbr title=\"with regards to\">wrt</abbr>", // full 'with respect to' / 'with regards to' feel weird.
];

//*/


/*

let combinatorial_explosion
	= ( genre.length )
	+ " * " + ( genre.length + 1 )
	+ " * " + ( mechanic.length + 1 )
	+ " * " + ( mechanic.length + 1 )
	+ " * " + ( setting_qualifier.length + 1 )
	+ " * " + ( setting.length + 1 )
	+ " * " + ( theme.length + 1 )
	+ " * " + ( theme_combinator.length + 1 )
	+ " * " + ( theme.length + 1 )
	+ " * " + ( focus.length + 1 )
	+ " * " + ( focus.length + 1 )
	+ " * " + 2.0;

/*/

let combinatorial_explosion
	= ( genre.length + 1 )
	* ( genre.length + 1 )
	* ( mechanic.length + 1 )
	* ( mechanic.length + 1 )
	* ( setting_qualifier.length + 1 )
	* ( setting.length + 1 )
	* ( theme.length + 1 )
	* ( theme_combinator.length + 1 )
	* ( theme.length + 1 )
	* ( focus.length + 1 )
	* ( focus.length + 1 )
	* 2.0;

//*/


function random( arr ){
	return arr[ Math.floor( Math.random() * arr.length ) ];
}

function capitalize( str ){
	return str.slice( 0, 1 ).toUpperCase() + str.slice( 1 );
}

var tries = 0

function generate(){
	let g  = ( Math.random() < 0.9 ) && random( genre );
	let g2 = ( Math.random() < 0.1 ) && random( genre );
	let m  = ( Math.random() < 0.7 ) && random( mechanic );
	let m2 = ( m ) && ( Math.random() < 0.3 ) && random( mechanic );
	let s  = ( Math.random() < 0.7 ) && random( setting );
	let sq = ( Math.random() < 0.7 ) && random( setting_qualifier );
	let t  = ( Math.random() < 0.8 ) && random( theme );
	let t2 = ( t ) && ( Math.random() < 0.5 ) && random( theme );
	let f  = ( Math.random() < 0.7 ) && random( focus );
	let f2 = ( f ) && ( Math.random() < 0.4 ) && random( focus );
	
	if( g == g2 ) g2 = false;
	if( m == m2 ) m2 = false;
	if( f == f2 ) f2 = false;
	
	let str;
	
	if( g )
		str = capitalize( g.a ) + " " + "<genre>" + g.tk + "</genre> game";
	else
		str = "A game"
	
	// console.log( g, g2, m, m2, sq, s, f, f2, t, t2 );
	
	if( g2 || m ) str += " with"
	
	if( g2 ){
		str += " light <genre>" + g2.tk + "</genre> elements";
	}
	
	if( g2 && m ){
		if( m2 ){
			str += ", ";
		}else{
			str += " and ";
		}
	}
	
	if( m ){
		
		if( m2 ){
			str += " <mechanic>" + m.tk + "</mechanic> and <mechanic>" + m2.tk + "</mechanic> mechanics";
		}else{
			str += " " + m.a + " <mechanic>" + m.tk + "</mechanic> mechanic";
		}
		
	}
	
	if( s || t || f ){ // anything else
		str += ',';
	}
	
	if( s ){
		if( sq ){
			str += " in " + sq.a + " <setting>" + sq.tk + " " + s.tk + "</setting> setting";
		}else{
			str +=  " in " + s.a + " <setting>" + s.tk + "</setting> setting";
		}
	}
	
	if( t ){
		str += " about <theme>" + t;
		if( t2 ){
			str += " " + random( theme_combinator ) + " " + t2;
		}
		str += "</theme>"
	}
	
	if( f ){
		str += " with a focus on <focus>" + f.tk + "</focus>";
	}
	
	if( f2 ){
		str += " and <focus>" + f2.tk + "</focus>";
	}
	
	
	if( Math.random() < 0.0001 )
		str += "<br/><annoying>with a TWIST !</annoying>";
	else
		str += ".";
		
	output_element.innerHTML = str;
	
	let excuse_id = excuses.length - ( 1 + Math.floor( Math.max( 0, Math.log( Math.random() * excuses_pow2 ) ) / Math.LN2 ) );
	button_element.innerHTML = excuses[ excuse_id ];

}

function initialize(){
	
	document.getElementById( "braging" ).innerText = 
		"With " + combinatorial_explosion + " unique ideas !";
	
	output_element = document.getElementById("output");
	
	button_element = document.getElementById("button");
	button_element.style.visibility = "visible";
	button_element.onclick = generate;
	
	generate();
}

window.onload = initialize;

