
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
	* 2.0 // absence of theme
	* 2.0;

//*/


function random( arr ){
	return arr[ Math.floor( Math.random() * arr.length ) ];
}

function capitalize( str ){
	if( str ) return str.slice( 0, 1 ).toUpperCase() + str.slice( 1 );
	return "?"
}

var tries = 0

function generate(){
	let g  = ( Math.random() < 0.9 ) && random( genre );
	let g2 = ( Math.random() < 0.2 ) && random( genre );
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
		str = capitalize( g.det ) + " " + "<genre>" + g.noun + "</genre> game";
	else
		str = "A game"
	
	// console.log( g, g2, m, m2, sq, s, f, f2, t, t2 );
	
	if( g2 || m ) str += " with"
	
	if( g2 ){
		str += " light <genre>" + g2.noun + "</genre> elements";
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
			str += " <mechanic>" + m.noun + "</mechanic> and <mechanic>" + m2.noun + "</mechanic> mechanics";
		}else{
			str += " " + m.det + " <mechanic>" + m.noun + "</mechanic> mechanics";
		}
		
	}
	
	if( s || t || f ){ // anything else
		str += ',';
	}
	
	if( s ){
		if( sq ){
			str += " in " + sq.det + " <setting>" + sq.noun + " " + s.noun + "</setting> setting";
		}else{
			str +=  " in " + s.det + " <setting>" + s.noun + "</setting> setting";
		}
	}
	
	if( t ){
		str += " about <theme>";
		if( t2 ){
			str += t + " " + random( theme_combinator ) + " " + t2;
		}else{
			if( Math.random() < 0.1 ) str += "absence of ";
			str += t;
			}
		
		str += "</theme>"
	}
	
	if( f ){
		str += " with a focus on <focus>" + f.noun + "</focus>";
	}
	
	if( f2 ){
		str += " and <focus>" + f2.noun + "</focus>";
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

