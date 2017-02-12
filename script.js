
let output_element;
let button_element;

function token( tk, a ){
	return {
		tk: tk,
		a: a || "a "
	};
}

let excuses = [
	"Another one"
];
const excuses_pow2 = Math.pow( 2, excuses.length - 1 );


let setting = [
	token( "established", "an" ),
	token( "historical", "an" ),
	token( "modern" ),
	token( "fantasy" ),
	token( "science-fiction" ),
	token( "space" ),
	token( "alternate history", "an" ),
	token( "retro" ),
	token( "retro-futurist" ),
	token( "apocalyptic", "an" ),
	token( "post-apocalyptic" ),
	token( "post-post-apocalyptic" ),
	token( "war time" ),
	token( "near-future" ),
	token( "near-past" ),
	token( "cyberpunk" ),
	token( "mythologic" ),
	token( "classical antiquity" ),
	token( "virtual space" ),
];

let setting_qualifier = [
	token( "light" ),
	token( "hard", "an" ),
	token( "serious" ),
	token( "comedic" ),
	token( "parodic" ),
	token( "tragic" ),
	token( "depressing" ),
	token( "hopeful", "an" ),
	token( "anachronistic", "an" ),
	token( "fractured" ), // weird, but works for me
	token( "idealized", "an" ),
	token( "imaginary", "an" )
];

let genre = [
	token( "puzzle" ),
	token( "<abbr title=\"Role-Playing Game\">RPG</abbr>", "an" ),
	token( "strategy", "a" ),
	token( "racing" ),
	token( "platforming" ),
	token( "management" ),
	token( "simulation" ),
	token( "action", "an" ),
	token( "adventure", "an" ),
];

// not really genres, not mechanics either ...
// token( "<abbr title=\"Shoot Them'up\">SHMUP</abbr>" ),
// token( "<abbr title=\"First Person Shooter (-ish)\">FPS</abbr>", "an" ),

let mechanic = [
	token( "casual", "" ),
	token( "turn based" ),
	token( "real time" ),
	token( "leveling" ),
	token( "research tree" ),
	token( "research web" ),
	token( "unfolding gameplay", "an" ),
	token( "negociation" ),
	token( "gambling" ),
	token( "trading" ),
	token( "player customisation" ),
	token( "vehicle building" ),
	token( "procedural generation" ),
	token( "permadeath" ),
	token( "prestige" ),
	token( "branching story" ),
	token( "collecting" ),
	token( "team building" ),
	token( "ressource management" ),
	token( "stats" ),
	token( "AI interactions", "an" ),
	token( "minigame" )
];

let theme = [
	"family",
	"parenthood",
	"growing-up",
	"love",
	"friendship",
	"self-determination",
	"respect",
	"growing old",
	"mental illness",
	"death",
	"loss",
	"art",
	"creation",
	"personal gain",
	"balance",
	"choice",
	"religion",
	"faith",
	"honesty",
	"greed",
	"addiction",
	"sharing",
	"birth",
	"differences",
	"society",
	"technology",
	"nature",
	"education",
	"economy",
	"state",
	"unknown",
	"magic",
	"consequences"
];

let theme_combinator = [
	"and",
	"versus",
	"after",
	"within",
	"without",
	"in exchange of",
	"<abbr title=\"with regards to\">wrt</abbr>", // full 'with respect to' / 'with regards to' feel weird.
];

let focus = [
	token( "exploration", "an" ),
	token( "construction" ),
	token( "crafting" ),
	token( "system mastery" ),
	token( "story" ),
	token( "choice" ),
	token( "characters" ),
	token( "the player" ),
	token( "time trials" ),
	token( "emergent gameplay", "an" ),
	token( "gameplay depth" ),
	token( "kid accessibility" ), //should not, but changes everything ! love it
	token( "dexterity" ),
	token( "complexity" ),
	token( "teaching" ),
	token( "learning" ),
	token( "fun" ),
	token( "flow" ),
	token( "emotions" ),
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
	let g  = ( Math.random() > ( 1 / genre.length ) ) && random( genre );
	let g2 = ( Math.random() < 0.05 ) && random( genre );
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

