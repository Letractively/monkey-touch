
//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}
	
	game_canvas=document.getElementById( "GameCanvas" );
	
	game_console=document.getElementById( "GameConsole" );

	try{
	
		bbInit();
		bbMain();
		
		if( game_runner!=null ) game_runner();
		
	}catch( err ){
	
		alertError( err );
	}
}

var game_canvas;
var game_console;
var game_runner;

//${CONFIG_BEGIN}
CFG_CONFIG="debug";
CFG_HOST="winnt";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MOJO_AUTO_SUSPEND_ENABLED="false";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="false";
CFG_PARSER_FUNC_ATTRS="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n[fonts/monkey_12_P_1.png];type=image/png;width=512;height=512;\n[fonts/monkey_12_h_P_1.png];type=image/png;width=512;height=512;\n[fonts/monkey_18_P_1.png];type=image/png;width=512;height=512;\n[fonts/monkey_18_h_P_1.png];type=image/png;width=512;height=512;\n[fonts/monkey_20_P_1.png];type=image/png;width=512;height=512;\n[graphics/game1/bg.png];type=image/png;width=640;height=480;\n[graphics/game1/game1.png];type=image/png;width=256;height=256;\n[graphics/game1/game1_alien1_blue.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien1_green.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien1_red.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien1_yellow.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien2_blue.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien2_green.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien2_red.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien2_yellow.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien3_blue.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien3_green.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien3_red.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alien3_yellow.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alienbullet_blue.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alienbullet_green.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alienbullet_red.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_alienbullet_yellow.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_icon.png];type=image/png;width=58;height=58;\n[graphics/game1/game1_player.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_player_bullet.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_shield.png];type=image/png;width=50;height=53;\n[graphics/game1/game1_thumb.png];type=image/png;width=100;height=100;\n[graphics/game10/game10.png];type=image/png;width=128;height=256;\n[graphics/game10/game10_icon.png];type=image/png;width=58;height=58;\n[graphics/game10/game10_thumb.png];type=image/png;width=100;height=100;\n[graphics/game11/game11.png];type=image/png;width=128;height=256;\n[graphics/game11/game11_icon.png];type=image/png;width=58;height=58;\n[graphics/game11/game11_thumb.png];type=image/png;width=100;height=100;\n[graphics/game12/game12.png];type=image/png;width=128;height=256;\n[graphics/game12/game12_icon.png];type=image/png;width=58;height=58;\n[graphics/game12/game12_thumb.png];type=image/png;width=100;height=100;\n[graphics/game13/game13.png];type=image/png;width=128;height=256;\n[graphics/game13/game13_icon.png];type=image/png;width=58;height=58;\n[graphics/game13/game13_thumb.png];type=image/png;width=100;height=100;\n[graphics/game14/game14.png];type=image/png;width=128;height=256;\n[graphics/game14/game14_icon.png];type=image/png;width=58;height=58;\n[graphics/game14/game14_thumb.png];type=image/png;width=100;height=100;\n[graphics/game15/game15.png];type=image/png;width=128;height=256;\n[graphics/game15/game15_icon.png];type=image/png;width=58;height=58;\n[graphics/game15/game15_thumb.png];type=image/png;width=100;height=100;\n[graphics/game16/game16.png];type=image/png;width=128;height=256;\n[graphics/game16/game16_icon.png];type=image/png;width=58;height=58;\n[graphics/game16/game16_thumb.png];type=image/png;width=100;height=100;\n[graphics/game17/game17.png];type=image/png;width=128;height=256;\n[graphics/game17/game17_icon.png];type=image/png;width=58;height=58;\n[graphics/game17/game17_thumb.png];type=image/png;width=100;height=100;\n[graphics/game18/game18.png];type=image/png;width=128;height=256;\n[graphics/game18/game18_icon.png];type=image/png;width=58;height=58;\n[graphics/game18/game18_thumb.png];type=image/png;width=100;height=100;\n[graphics/game19/game19.png];type=image/png;width=128;height=256;\n[graphics/game19/game19_icon.png];type=image/png;width=58;height=58;\n[graphics/game19/game19_thumb.png];type=image/png;width=100;height=100;\n[graphics/game2/game2.png];type=image/png;width=128;height=256;\n[graphics/game2/game2_icon.png];type=image/png;width=58;height=58;\n[graphics/game2/game2_thumb.png];type=image/png;width=100;height=100;\n[graphics/game20/game20.png];type=image/png;width=128;height=256;\n[graphics/game20/game20_icon.png];type=image/png;width=58;height=58;\n[graphics/game20/game20_thumb.png];type=image/png;width=100;height=100;\n[graphics/game3/game3.png];type=image/png;width=128;height=256;\n[graphics/game3/game3_icon.png];type=image/png;width=58;height=58;\n[graphics/game3/game3_thumb.png];type=image/png;width=100;height=100;\n[graphics/game4/game4.png];type=image/png;width=128;height=256;\n[graphics/game4/game4_icon.png];type=image/png;width=58;height=58;\n[graphics/game4/game4_thumb.png];type=image/png;width=100;height=100;\n[graphics/game5/game5.png];type=image/png;width=128;height=256;\n[graphics/game5/game5_icon.png];type=image/png;width=58;height=58;\n[graphics/game5/game5_thumb.png];type=image/png;width=100;height=100;\n[graphics/game6/game6.png];type=image/png;width=128;height=256;\n[graphics/game6/game6_icon.png];type=image/png;width=58;height=58;\n[graphics/game6/game6_thumb.png];type=image/png;width=100;height=100;\n[graphics/game7/game7.png];type=image/png;width=128;height=256;\n[graphics/game7/game7_icon.png];type=image/png;width=58;height=58;\n[graphics/game7/game7_thumb.png];type=image/png;width=100;height=100;\n[graphics/game8/game8.png];type=image/png;width=128;height=256;\n[graphics/game8/game8_icon.png];type=image/png;width=58;height=58;\n[graphics/game8/game8_thumb.png];type=image/png;width=100;height=100;\n[graphics/game9/game9.png];type=image/png;width=128;height=256;\n[graphics/game9/game9_icon.png];type=image/png;width=58;height=58;\n[graphics/game9/game9_thumb.png];type=image/png;width=100;height=100;\n[graphics/gameicon.png];type=image/png;width=58;height=58;\n[graphics/title.png];type=image/png;width=640;height=480;\n";
//${METADATA_END}

function getMetaData( path,key ){
	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

function loadString( path ){
	var xhr=new XMLHttpRequest();
	xhr.open( "GET","data/"+path,false );
	xhr.send( null );
	if( (xhr.status==200) || (xhr.status==0) ) return xhr.responseText;
	return "";
}

function loadImage( path,onloadfun ){
	var ty=getMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;

	var image=new Image();
	
	image.meta_width=parseInt( getMetaData( path,"width" ) );
	image.meta_height=parseInt( getMetaData( path,"height" ) );
	image.onload=onloadfun;
	image.src="data/"+path;
	
	return image;
}

function loadAudio( path ){
	var audio=new Audio( "data/"+path );
	return audio;
}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	if( game_console ){
		game_console.value+=str+"\n";
		game_console.scrollTop = game_console.scrollHeight - game_console.clientHeight;
	}
	if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	print( str );
}

function debugStop(){
	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_array( arr,index ){
	if( index>=0 && index<arr.length ) return arr;
	error( "Array index out of range" );
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_starts_with( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_ends_with( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_from_chars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}


function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}

// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

var gl=null;	//global WebGL context - a bit rude!

KEY_LMB=1;
KEY_RMB=2;
KEY_MMB=3;
KEY_TOUCH0=0x180;

function eatEvent( e ){
	if( e.stopPropagation ){
		e.stopPropagation();
		e.preventDefault();
	}else{
		e.cancelBubble=true;
		e.returnValue=false;
	}
}

function keyToChar( key ){
	switch( key ){
	case 8:
	case 9:
	case 13:
	case 27:
	case 32:
		return key;
	case 33:
	case 34:
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
	case 40:
	case 45:
		return key | 0x10000;
	case 46:
		return 127;
	}
	return 0;
}

//***** gxtkApp class *****

function gxtkApp(){

	if( typeof( CFG_OPENGL_GLES20_ENABLED )!="undefined" && CFG_OPENGL_GLES20_ENABLED=="true" ){
		this.gl=game_canvas.getContext( "webgl" );
		if( !this.gl ) this.gl=game_canvas.getContext( "experimental-webgl" );
	}else{
		this.gl=null;
	}

	this.graphics=new gxtkGraphics( this,game_canvas );
	this.input=new gxtkInput( this );
	this.audio=new gxtkAudio( this );

	this.loading=0;
	this.maxloading=0;

	this.updateRate=0;
	this.startMillis=(new Date).getTime();
	
	this.dead=false;
	this.suspended=false;
	
	var app=this;
	var canvas=game_canvas;
	
	function gxtkMain(){
	
		var input=app.input;
	
		canvas.onkeydown=function( e ){
			input.OnKeyDown( e.keyCode );
			var chr=keyToChar( e.keyCode );
			if( chr ) input.PutChar( chr );
			if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
		}

		canvas.onkeyup=function( e ){
			input.OnKeyUp( e.keyCode );
		}

		canvas.onkeypress=function( e ){
			if( e.charCode ){
				input.PutChar( e.charCode );
			}else if( e.which ){
				input.PutChar( e.which );
			}
		}

		canvas.onmousedown=function( e ){
			switch( e.button ){
			case 0:input.OnKeyDown( KEY_LMB );break;
			case 1:input.OnKeyDown( KEY_MMB );break;
			case 2:input.OnKeyDown( KEY_RMB );break;
			}
			eatEvent( e );
		}
		
		canvas.onmouseup=function( e ){
			switch( e.button ){
			case 0:input.OnKeyUp( KEY_LMB );break;
			case 1:input.OnKeyUp( KEY_MMB );break;
			case 2:input.OnKeyUp( KEY_RMB );break;
			}
			eatEvent( e );
		}
		
		canvas.onmouseout=function( e ){
			input.OnKeyUp( KEY_LMB );
			input.OnKeyUp( KEY_MMB );
			input.OnKeyUp( KEY_RMB );
			eatEvent( e );
		}

		canvas.onmousemove=function( e ){
			var x=e.clientX+document.body.scrollLeft;
			var y=e.clientY+document.body.scrollTop;
			var c=canvas;
			while( c ){
				x-=c.offsetLeft;
				y-=c.offsetTop;
				c=c.offsetParent;
			}
			input.OnMouseMove( x,y );
			eatEvent( e );
		}

		canvas.onfocus=function( e ){
			if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="true" ){
				app.InvokeOnResume();
			}
		}
		
		canvas.onblur=function( e ){
			if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="true" ){
				app.InvokeOnSuspend();
			}
		}
		
		canvas.ontouchstart=function( e ){
			for( var i=0;i<e.changedTouches.length;++i ){
				var touch=e.changedTouches[i];
				var x=touch.pageX;
				var y=touch.pageY;
				var c=canvas;
				while( c ){
					x-=c.offsetLeft;
					y-=c.offsetTop;
					c=c.offsetParent;
				}
				input.OnTouchStart( touch.identifier,x,y );
			}
			eatEvent( e );
		}
		
		canvas.ontouchmove=function( e ){
			for( var i=0;i<e.changedTouches.length;++i ){
				var touch=e.changedTouches[i];
				var x=touch.pageX;
				var y=touch.pageY;
				var c=canvas;
				while( c ){
					x-=c.offsetLeft;
					y-=c.offsetTop;
					c=c.offsetParent;
				}
				input.OnTouchMove( touch.identifier,x,y );
			}
			eatEvent( e );
		}
		
		canvas.ontouchend=function( e ){
			for( var i=0;i<e.changedTouches.length;++i ){
				input.OnTouchEnd( e.changedTouches[i].identifier );
			}
			eatEvent( e );
		}
		
		window.ondevicemotion=function( e ){
			var tx=e.accelerationIncludingGravity.x/9.81;
			var ty=e.accelerationIncludingGravity.y/9.81;
			var tz=e.accelerationIncludingGravity.z/9.81;
			var x,y;
			switch( window.orientation ){
			case   0:x=+tx;y=-ty;break;
			case 180:x=-tx;y=+ty;break;
			case  90:x=-ty;y=-tx;break;
			case -90:x=+ty;y=+tx;break;
			}
			input.OnDeviceMotion( x,y,tz );
			eatEvent( e );
		}

		canvas.focus();

		app.InvokeOnCreate();
		app.InvokeOnRender();
	}

	game_runner=gxtkMain;
}

var timerSeq=0;

gxtkApp.prototype.SetFrameRate=function( fps ){

	var seq=++timerSeq;
	
	if( !fps ) return;
	
	var app=this;
	var updatePeriod=1000.0/fps;
	var nextUpdate=(new Date).getTime()+updatePeriod;
	
	function timeElapsed(){
		if( seq!=timerSeq ) return;

		var time;		
		var updates=0;

		for(;;){
			nextUpdate+=updatePeriod;

			app.InvokeOnUpdate();
			if( seq!=timerSeq ) return;
			
			if( nextUpdate>(new Date).getTime() ) break;
			
			if( ++updates==7 ){
				nextUpdate=(new Date).getTime();
				break;
			}
		}
		app.InvokeOnRender();
		if( seq!=timerSeq ) return;
			
		var delay=nextUpdate-(new Date).getTime();
		setTimeout( timeElapsed,delay>0 ? delay : 0 );
	}
	
	setTimeout( timeElapsed,updatePeriod );
}

gxtkApp.prototype.IncLoading=function(){
	++this.loading;
	if( this.loading>this.maxloading ) this.maxloading=this.loading;
	if( this.loading==1 ) this.SetFrameRate( 0 );
}

gxtkApp.prototype.DecLoading=function(){
	--this.loading;
	if( this.loading!=0 ) return;
	this.maxloading=0;
	this.SetFrameRate( this.updateRate );
}

gxtkApp.prototype.GetMetaData=function( path,key ){
	return getMetaData( path,key );
}

gxtkApp.prototype.Die=function( err ){
	this.dead=true;
	this.audio.OnSuspend();
	alertError( err );
}

gxtkApp.prototype.InvokeOnCreate=function(){
	if( this.dead ) return;
	
	try{
		gl=this.gl;
		this.OnCreate();
		gl=null;
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnUpdate=function(){
	if( this.dead || this.suspended || !this.updateRate || this.loading ) return;
	
	try{
		gl=this.gl;
		this.input.BeginUpdate();
		this.OnUpdate();		
		this.input.EndUpdate();
		gl=null;
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnSuspend=function(){
	if( this.dead || this.suspended ) return;
	
	try{
		gl=this.gl;
		this.suspended=true;
		this.OnSuspend();
		this.audio.OnSuspend();
		gl=null;
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnResume=function(){
	if( this.dead || !this.suspended ) return;
	
	try{
		gl=this.gl;
		this.audio.OnResume();
		this.OnResume();
		this.suspended=false;
		gl=null;
	}catch( ex ){
		this.Die( ex );
	}
}

gxtkApp.prototype.InvokeOnRender=function(){
	if( this.dead || this.suspended ) return;
	
	try{
		gl=this.gl;
		this.graphics.BeginRender();
		if( this.loading ){
			this.OnLoading();
		}else{
			this.OnRender();
		}
		this.graphics.EndRender();
		gl=null;
	}catch( ex ){
		this.Die( ex );
	}
}

//***** GXTK API *****

gxtkApp.prototype.GraphicsDevice=function(){
	return this.graphics;
}

gxtkApp.prototype.InputDevice=function(){
	return this.input;
}

gxtkApp.prototype.AudioDevice=function(){
	return this.audio;
}

gxtkApp.prototype.AppTitle=function(){
	return document.URL;
}

gxtkApp.prototype.LoadState=function(){
	var state=localStorage.getItem( ".mojostate@"+document.URL );
	if( state ) return state;
	return "";
}

gxtkApp.prototype.SaveState=function( state ){
	localStorage.setItem( ".mojostate@"+document.URL,state );
}

gxtkApp.prototype.LoadString=function( path ){
	return loadString( path );
}

gxtkApp.prototype.SetUpdateRate=function( fps ){
	this.updateRate=fps;
	
	if( !this.loading ) this.SetFrameRate( fps );
}

gxtkApp.prototype.MilliSecs=function(){
	return ((new Date).getTime()-this.startMillis)|0;
}

gxtkApp.prototype.Loading=function(){
	return this.loading;
}

gxtkApp.prototype.OnCreate=function(){
}

gxtkApp.prototype.OnUpdate=function(){
}

gxtkApp.prototype.OnSuspend=function(){
}

gxtkApp.prototype.OnResume=function(){
}

gxtkApp.prototype.OnRender=function(){
}

gxtkApp.prototype.OnLoading=function(){
}

//***** gxtkGraphics class *****

function gxtkGraphics( app,canvas ){
	this.app=app;
	this.canvas=canvas;
	this.gc=canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	if( this.gc ) this.gc.save();
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Mode=function(){
	if( this.gc ) return 1;
	return 0;
}

gxtkGraphics.prototype.Width=function(){
	return this.canvas.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.canvas.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var app=this.app;
	
	function onloadfun(){
		app.DecLoading();
	}

	app.IncLoading();

	var image=loadImage( path,onloadfun );
	if( image ) return new gxtkSurface( image,this );

	app.DecLoading();
	return null;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<6 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tgc=this.tmpCanvas.getContext( "2d" );
	
	tgc.globalCompositeOperation="copy";

	tgc.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tgc.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tgc.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

//***** Class gxtkInput *****

function gxtkInput( app ){
	this.app=app;
	this.keyStates=new Array( 512 );
	this.charQueue=new Array( 32 );
	this.charPut=0;
	this.charGet=0;
	this.mouseX=0;
	this.mouseY=0;
	this.joyX=0;
	this.joyY=0;
	this.joyZ=0;
	this.touchIds=new Array( 32 );
	this.touchXs=new Array( 32 );
	this.touchYs=new Array( 32 );
	this.accelX=0;
	this.accelY=0;
	this.accelZ=0;
	
	var i;
	
	for( i=0;i<512;++i ){
		this.keyStates[i]=0;
	}
	
	for( i=0;i<32;++i ){
		this.touchIds[i]=-1;
		this.touchXs[i]=0;
		this.touchYs[i]=0;
	}
}

gxtkInput.prototype.BeginUpdate=function(){
}

gxtkInput.prototype.EndUpdate=function(){
	for( var i=0;i<512;++i ){
		this.keyStates[i]&=0x100;
	}
	this.charGet=0;
	this.charPut=0;
}

gxtkInput.prototype.OnKeyDown=function( key ){
	if( (this.keyStates[key]&0x100)==0 ){
		this.keyStates[key]|=0x100;
		++this.keyStates[key];
		//
		if( key==KEY_LMB ){
			this.keyStates[KEY_TOUCH0]|=0x100;
			++this.keyStates[KEY_TOUCH0];
		}else if( key==KEY_TOUCH0 ){
			this.keyStates[KEY_LMB]|=0x100;
			++this.keyStates[KEY_LMB];
		}
		//
	}
}

gxtkInput.prototype.OnKeyUp=function( key ){
	this.keyStates[key]&=0xff;
	//
	if( key==KEY_LMB ){
		this.keyStates[KEY_TOUCH0]&=0xff;
	}else if( key==KEY_TOUCH0 ){
		this.keyStates[KEY_LMB]&=0xff;
	}
	//
}

gxtkInput.prototype.PutChar=function( chr ){
	if( this.charPut-this.charGet<32 ){
		this.charQueue[this.charPut & 31]=chr;
		this.charPut+=1;
	}
}

gxtkInput.prototype.OnMouseMove=function( x,y ){
	this.mouseX=x;
	this.mouseY=y;
	this.touchXs[0]=x;
	this.touchYs[0]=y;
}

gxtkInput.prototype.OnTouchStart=function( id,x,y ){
	for( var i=0;i<32;++i ){
		if( this.touchIds[i]==-1 ){
			this.touchIds[i]=id;
			this.touchXs[i]=x;
			this.touchYs[i]=y;
			this.OnKeyDown( KEY_TOUCH0+i );
			return;
		} 
	}
}

gxtkInput.prototype.OnTouchMove=function( id,x,y ){
	for( var i=0;i<32;++i ){
		if( this.touchIds[i]==id ){
			this.touchXs[i]=x;
			this.touchYs[i]=y;
			if( i==0 ){
				this.mouseX=x;
				this.mouseY=y;
			}
			return;
		}
	}
}

gxtkInput.prototype.OnTouchEnd=function( id ){
	for( var i=0;i<32;++i ){
		if( this.touchIds[i]==id ){
			this.touchIds[i]=-1;
			this.OnKeyUp( KEY_TOUCH0+i );
			return;
		}
	}
}

gxtkInput.prototype.OnDeviceMotion=function( x,y,z ){
	this.accelX=x;
	this.accelY=y;
	this.accelZ=z;
}

//***** GXTK API *****

gxtkInput.prototype.SetKeyboardEnabled=function( enabled ){
	return 0;
}

gxtkInput.prototype.KeyDown=function( key ){
	if( key>0 && key<512 ){
		return this.keyStates[key] >> 8;
	}
	return 0;
}

gxtkInput.prototype.KeyHit=function( key ){
	if( key>0 && key<512 ){
		return this.keyStates[key] & 0xff;
	}
	return 0;
}

gxtkInput.prototype.GetChar=function(){
	if( this.charPut!=this.charGet ){
		var chr=this.charQueue[this.charGet & 31];
		this.charGet+=1;
		return chr;
	}
	return 0;
}

gxtkInput.prototype.MouseX=function(){
	return this.mouseX;
}

gxtkInput.prototype.MouseY=function(){
	return this.mouseY;
}

gxtkInput.prototype.JoyX=function( index ){
	return this.joyX;
}

gxtkInput.prototype.JoyY=function( index ){
	return this.joyY;
}

gxtkInput.prototype.JoyZ=function( index ){
	return this.joyZ;
}

gxtkInput.prototype.TouchX=function( index ){
	return this.touchXs[index];
}

gxtkInput.prototype.TouchY=function( index ){
	return this.touchYs[index];
}

gxtkInput.prototype.AccelX=function(){
	return this.accelX;
}

gxtkInput.prototype.AccelY=function(){
	return this.accelY;
}

gxtkInput.prototype.AccelZ=function(){
	return this.accelZ;
}


//***** gxtkChannel class *****
function gxtkChannel(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

//***** gxtkAudio class *****
function gxtkAudio( app ){
	this.app=app;
	this.okay=typeof(Audio)!="undefined";
	this.nextchan=0;
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.OnSuspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.pause();
	}
}

gxtkAudio.prototype.OnResume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.play();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	var audio=loadAudio( path );
	if( audio ) return new gxtkSample( audio );
	return null;
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;

	var chan=this.channels[channel];

	if( chan.state!=0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;
	
	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state!=0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state!=0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.Discard=function(){
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}
var diddy = new Object();

diddy.systemMillisecs=function(){
	return new Date().getTime();
};

diddy.flushKeys=function(){
	for( var i = 0; i < 512; ++i )
	{
		bb_input_device.keyStates[i]=0;
	}
};

diddy.getUpdateRate=function(){
	return bb_app_device.updateRate;
};

diddy.showMouse=function()
{
	document.getElementById("GameCanvas").style.cursor='default';
}
diddy.setGraphics=function(w, h)
{
	var canvas=document.getElementById( "GameCanvas" );
	canvas.width  = w;
	canvas.height = h;
	//return window.innerHeight;
}
diddy.setMouse=function(x, y)
{
}
diddy.showKeyboard=function()
{
}
diddy.launchBrowser=function(address, windowName)
{
	window.open(address, windowName);
}
diddy.launchEmail=function(email, subject, text)
{
	location.href="mailto:"+email+"&subject="+subject+"&body="+text+"";
}

diddy.startVibrate=function(millisecs)
{
}
diddy.stopVibrate=function()
{
}

diddy.getDayOfMonth=function(){
	return new Date().getDate();
}

diddy.getDayOfWeek=function(){
	return new Date().getDay()+1;
}

diddy.getMonth=function(){
	return new Date().getMonth()+1;
}

diddy.getYear=function(){
	return new Date().getFullYear();
}

diddy.getHours=function(){
	return new Date().getHours();
}

diddy.getMinutes=function(){
	return new Date().getMinutes();
}

diddy.getSeconds=function(){
	return new Date().getSeconds();
}

diddy.getMilliSeconds=function(){
	return new Date().getMilliseconds();
}

diddy.startGps=function(){

}
diddy.getLatitiude=function(){
	return ""
}
diddy.getLongitude=function(){
	return ""
}
diddy.showAlertDialog=function(title, message)
{
}
diddy.getInputString=function()
{
	return "";
}
// Browser detect from http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();

diddy.getBrowserName=function(){
	return BrowserDetect.browser;
};

diddy.getBrowserVersion=function(){
	return BrowserDetect.version;
};

diddy.getBrowserOS=function(){
	return BrowserDetect.OS;
};

diddy.getPixel=function(x, y){
	var tcanvas=document.getElementById("GameCanvas").getContext("2d")
	if (tcanvas==null)
		return 0;
	var img = tcanvas.getImageData(x, y, 1, 1); 
	var pix = img.data;
//	game_console.value = "alpha="+pix[3]+"\n"
	return (pix[3]<<24) | (pix[0]<<16) | (pix[1]<<8) | pix[2];
};


diddy.hideMouse=function()
{
	document.getElementById("GameCanvas").style.cursor= "url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
}
function bb_app_App(){
	Object.call(this);
}
function bb_app_App_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<105>";
	bb_app_device=bb_app_AppDevice_new.call(new bb_app_AppDevice,this);
	pop_err();
	return this;
}
bb_app_App.prototype.m_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
bb_app_App.prototype.m_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
bb_app_App.prototype.m_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
bb_app_App.prototype.m_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
bb_app_App.prototype.m_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
bb_app_App.prototype.m_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
function bb_framework_DiddyApp(){
	bb_app_App.call(this);
	this.f_exitScreen=null;
	this.f_screenFade=null;
	this.f_images=null;
	this.f_sounds=null;
	this.f_inputCache=null;
	this.f_debugKeyOn=false;
	this.f_drawFPSOn=false;
	this.f_FPS=60;
	this.f_virtualResOn=true;
	this.f_aspectRatioOn=false;
	this.f_aspectRatio=.0;
	this.f_deviceChanged=0;
	this.f_mouseX=0;
	this.f_mouseY=0;
	this.f_useFixedRateLogic=false;
	this.f_frameRate=200.0;
	this.f_ms=0.0;
	this.f_numTicks=.0;
	this.f_lastNumTicks=.0;
	this.f_lastTime=.0;
	this.f_multi=.0;
	this.f_heightBorder=.0;
	this.f_widthBorder=.0;
	this.f_vsx=.0;
	this.f_vsy=.0;
	this.f_vsw=.0;
	this.f_vsh=.0;
	this.f_virtualScaledW=.0;
	this.f_virtualScaledH=.0;
	this.f_virtualXOff=.0;
	this.f_virtualYOff=.0;
	this.f_currentScreen=null;
	this.f_debugOn=false;
	this.f_musicFile="";
	this.f_musicOkay=0;
	this.f_musicVolume=100;
	this.f_mojoMusicVolume=1.0;
	this.f_soundVolume=100;
	this.f_mouseHit=0;
	this.f_debugKey=112;
	this.f_tmpMs=.0;
	this.f_maxMs=50;
	this.f_nextScreen=null;
}
bb_framework_DiddyApp.prototype=extend_class(bb_app_App);
function bb_framework_DiddyApp_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<153>";
	bb_app_App_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<156>";
	bb_framework_game=this;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<157>";
	dbg_object(this).f_exitScreen=bb_framework_ExitScreen_new.call(new bb_framework_ExitScreen);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<158>";
	dbg_object(this).f_screenFade=bb_framework_ScreenFade_new.call(new bb_framework_ScreenFade);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<159>";
	dbg_object(this).f_images=bb_framework_ImageBank_new.call(new bb_framework_ImageBank);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<160>";
	dbg_object(this).f_sounds=bb_framework_SoundBank_new.call(new bb_framework_SoundBank);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<161>";
	dbg_object(this).f_inputCache=bb_inputcache_InputCache_new.call(new bb_inputcache_InputCache);
	pop_err();
	return this;
}
bb_framework_DiddyApp.prototype.m_SetScreenSize=function(t_w,t_h,t_useAspectRatio){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<195>";
	bb_framework_SCREEN_WIDTH=t_w;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<196>";
	bb_framework_SCREEN_HEIGHT=t_h;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<197>";
	bb_framework_SCREEN_WIDTH2=bb_framework_SCREEN_WIDTH/2.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<198>";
	bb_framework_SCREEN_HEIGHT2=bb_framework_SCREEN_HEIGHT/2.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<200>";
	bb_framework_SCREENX_RATIO=bb_framework_DEVICE_WIDTH/bb_framework_SCREEN_WIDTH;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<201>";
	bb_framework_SCREENY_RATIO=bb_framework_DEVICE_HEIGHT/bb_framework_SCREEN_HEIGHT;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<203>";
	if(bb_framework_SCREENX_RATIO!=1.0 || bb_framework_SCREENY_RATIO!=1.0){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<204>";
		this.f_virtualResOn=true;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<205>";
		this.f_aspectRatioOn=t_useAspectRatio;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<206>";
		this.f_aspectRatio=t_h/t_w;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<208>";
	if((bb_graphics_DeviceWidth())!=bb_framework_SCREEN_WIDTH || (bb_graphics_DeviceHeight())!=bb_framework_SCREEN_HEIGHT){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<209>";
		this.f_deviceChanged=1;
	}
	pop_err();
}
bb_framework_DiddyApp.prototype.m_ResetFixedRateLogic=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<445>";
	this.f_ms=1000.0/this.f_frameRate;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<446>";
	this.f_numTicks=0.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<447>";
	this.f_lastNumTicks=1.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<448>";
	this.f_lastTime=(bb_app_Millisecs());
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<449>";
	if(bb_framework_dt!=null){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<450>";
		dbg_object(bb_framework_dt).f_delta=1.0;
	}
	pop_err();
}
bb_framework_DiddyApp.prototype.m_OnCreate=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<166>";
	bb_framework_DEVICE_WIDTH=(bb_graphics_DeviceWidth());
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<167>";
	bb_framework_DEVICE_HEIGHT=(bb_graphics_DeviceHeight());
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<169>";
	this.m_SetScreenSize(bb_framework_DEVICE_WIDTH,bb_framework_DEVICE_HEIGHT,false);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<170>";
	this.f_deviceChanged=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<173>";
	this.f_mouseX=((bb_input_MouseX()/bb_framework_SCREENX_RATIO)|0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<174>";
	this.f_mouseY=((bb_input_MouseY()/bb_framework_SCREENY_RATIO)|0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<177>";
	bb_random_Seed=diddy.systemMillisecs();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<179>";
	bb_framework_dt=bb_framework_DeltaTimer_new.call(new bb_framework_DeltaTimer,(this.f_FPS));
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<181>";
	bb_app_SetUpdateRate(this.f_FPS);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<184>";
	bb_framework_Particle_Cache();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<187>";
	if(this.f_useFixedRateLogic){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<188>";
		this.m_ResetFixedRateLogic();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<190>";
	pop_err();
	return 0;
}
bb_framework_DiddyApp.prototype.m_DrawDebug=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<353>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<354>";
	bb_framework_FPSCounter_Draw(0,0,0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<355>";
	var t_y=10;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<356>";
	var t_gap=10;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<357>";
	bb_graphics_DrawText("Screen             = "+dbg_object(this.f_currentScreen).f_name,0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<358>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<359>";
	bb_graphics_DrawText("Delta              = "+bb_functions_FormatNumber(dbg_object(bb_framework_dt).f_delta,2,0,0),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<360>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<361>";
	bb_graphics_DrawText("Frame Time         = "+String(dbg_object(bb_framework_dt).f_frametime),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<362>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<363>";
	bb_graphics_DrawText("Screen Width       = "+String(bb_framework_SCREEN_WIDTH),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<364>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<365>";
	bb_graphics_DrawText("Screen Height      = "+String(bb_framework_SCREEN_HEIGHT),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<366>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<367>";
	bb_graphics_DrawText("VMouseX            = "+String(dbg_object(this).f_mouseX),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<368>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<369>";
	bb_graphics_DrawText("VMouseY            = "+String(dbg_object(this).f_mouseY),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<370>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<371>";
	bb_graphics_DrawText("MouseX             = "+String(bb_input_MouseX()),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<372>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<373>";
	bb_graphics_DrawText("MouseY             = "+String(bb_input_MouseY()),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<374>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<375>";
	bb_graphics_DrawText("Music File         = "+this.f_musicFile,0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<376>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<377>";
	bb_graphics_DrawText("MusicOkay          = "+String(this.f_musicOkay),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<378>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<379>";
	bb_graphics_DrawText("Music State        = "+String(bb_audio_MusicState()),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<380>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<381>";
	bb_graphics_DrawText("Music Volume       = "+String(dbg_object(this).f_musicVolume),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<382>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<383>";
	bb_graphics_DrawText("Mojo Music Volume  = "+String(dbg_object(this).f_mojoMusicVolume),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<384>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<385>";
	bb_graphics_DrawText("Sound Volume       = "+String(dbg_object(this).f_soundVolume),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<386>";
	t_y+=t_gap;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<387>";
	bb_graphics_DrawText("Sound Channel      = "+String(bb_framework_SoundPlayer_channel),0.0,(t_y),0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<388>";
	t_y+=t_gap;
	pop_err();
}
bb_framework_DiddyApp.prototype.m_DrawFPS=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<393>";
	bb_graphics_DrawText(String(bb_framework_FPSCounter_totalFPS),0.0,0.0,0.0,0.0);
	pop_err();
}
bb_framework_DiddyApp.prototype.m_OnRender=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<214>";
	bb_framework_FPSCounter_Update();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<215>";
	if(this.f_virtualResOn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<216>";
		bb_graphics_PushMatrix();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<217>";
		if(this.f_aspectRatioOn){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<218>";
			if((bb_graphics_DeviceWidth())!=bb_framework_DEVICE_WIDTH || (bb_graphics_DeviceHeight())!=bb_framework_DEVICE_HEIGHT || ((this.f_deviceChanged)!=0)){
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<219>";
				bb_framework_DEVICE_WIDTH=(bb_graphics_DeviceWidth());
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<220>";
				bb_framework_DEVICE_HEIGHT=(bb_graphics_DeviceHeight());
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<221>";
				this.f_deviceChanged=0;
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<223>";
				var t_deviceRatio=bb_framework_DEVICE_HEIGHT/bb_framework_DEVICE_WIDTH;
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<224>";
				if(t_deviceRatio>=this.f_aspectRatio){
					err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<225>";
					this.f_multi=bb_framework_DEVICE_WIDTH/bb_framework_SCREEN_WIDTH;
					err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<226>";
					this.f_heightBorder=(bb_framework_DEVICE_HEIGHT-bb_framework_SCREEN_HEIGHT*this.f_multi)*0.5;
					err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<227>";
					this.f_widthBorder=0.0;
				}else{
					err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<229>";
					this.f_multi=bb_framework_DEVICE_HEIGHT/bb_framework_SCREEN_HEIGHT;
					err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<230>";
					this.f_widthBorder=(bb_framework_DEVICE_WIDTH-bb_framework_SCREEN_WIDTH*this.f_multi)*0.5;
					err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<231>";
					this.f_heightBorder=0.0;
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<234>";
				this.f_vsx=bb_math_Max2(0.0,this.f_widthBorder);
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<235>";
				this.f_vsy=bb_math_Max2(0.0,this.f_heightBorder);
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<236>";
				this.f_vsw=bb_math_Min2(bb_framework_DEVICE_WIDTH-this.f_widthBorder*2.0,bb_framework_DEVICE_WIDTH);
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<237>";
				this.f_vsh=bb_math_Min2(bb_framework_DEVICE_HEIGHT-this.f_heightBorder*2.0,bb_framework_DEVICE_HEIGHT);
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<239>";
				this.f_virtualScaledW=bb_framework_SCREEN_WIDTH*this.f_multi;
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<240>";
				this.f_virtualScaledH=bb_framework_SCREEN_HEIGHT*this.f_multi;
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<242>";
				this.f_virtualXOff=(bb_framework_DEVICE_WIDTH-this.f_virtualScaledW)*0.5;
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<243>";
				this.f_virtualYOff=(bb_framework_DEVICE_HEIGHT-this.f_virtualScaledH)*0.5;
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<245>";
				this.f_virtualXOff=this.f_virtualXOff/this.f_multi;
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<246>";
				this.f_virtualYOff=this.f_virtualYOff/this.f_multi;
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<249>";
			bb_graphics_SetScissor(0.0,0.0,bb_framework_DEVICE_WIDTH,bb_framework_DEVICE_HEIGHT);
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<250>";
			bb_graphics_Cls(0.0,0.0,0.0);
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<252>";
			bb_graphics_SetScissor(this.f_vsx,this.f_vsy,this.f_vsw,this.f_vsh);
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<254>";
			bb_graphics_Scale(this.f_multi,this.f_multi);
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<256>";
			bb_graphics_Translate(this.f_virtualXOff,this.f_virtualYOff);
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<258>";
			bb_graphics_Scale(bb_framework_SCREENX_RATIO,bb_framework_SCREENY_RATIO);
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<263>";
	this.f_currentScreen.m_Render();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<265>";
	if(this.f_virtualResOn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<266>";
		if(this.f_aspectRatioOn){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<267>";
			bb_graphics_SetScissor(0.0,0.0,bb_framework_DEVICE_WIDTH,bb_framework_DEVICE_HEIGHT);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<269>";
		bb_graphics_PopMatrix();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<272>";
	this.f_currentScreen.m_ExtraRender();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<273>";
	if(dbg_object(this.f_screenFade).f_active){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<273>";
		this.f_screenFade.m_Render();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<274>";
	this.f_currentScreen.m_DebugRender();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<275>";
	if(this.f_debugOn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<276>";
		this.m_DrawDebug();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<278>";
	if(this.f_drawFPSOn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<279>";
		this.m_DrawFPS();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<281>";
	pop_err();
	return 0;
}
bb_framework_DiddyApp.prototype.m_ReadInputs=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<285>";
	if(this.f_aspectRatioOn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<286>";
		var t_mouseOffsetX=bb_input_MouseX()-bb_framework_DEVICE_WIDTH*0.5;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<287>";
		var t_x=t_mouseOffsetX/this.f_multi/1.0+bb_framework_SCREEN_WIDTH*0.5;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<288>";
		this.f_mouseX=((t_x)|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<289>";
		var t_mouseOffsetY=bb_input_MouseY()-bb_framework_DEVICE_HEIGHT*0.5;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<290>";
		var t_y=t_mouseOffsetY/this.f_multi/1.0+bb_framework_SCREEN_HEIGHT*0.5;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<291>";
		this.f_mouseY=((t_y)|0);
	}else{
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<293>";
		this.f_mouseX=((bb_input_MouseX()/bb_framework_SCREENX_RATIO)|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<294>";
		this.f_mouseY=((bb_input_MouseY()/bb_framework_SCREENY_RATIO)|0);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<296>";
	this.f_mouseHit=bb_input_MouseHit(0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<297>";
	this.f_inputCache.m_ReadInput();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<298>";
	this.f_inputCache.m_HandleEvents(this.f_currentScreen);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<300>";
	if(this.f_debugKeyOn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<301>";
		if((bb_input_KeyHit(this.f_debugKey))!=0){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<302>";
			this.f_debugOn=!this.f_debugOn;
		}
	}
	pop_err();
}
bb_framework_DiddyApp.prototype.m_OverrideUpdate=function(){
	push_err();
	pop_err();
}
bb_framework_DiddyApp.prototype.m_SetMojoMusicVolume=function(t_volume){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<415>";
	if(t_volume<0.0){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<415>";
		t_volume=0.0;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<416>";
	if(t_volume>1.0){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<416>";
		t_volume=1.0;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<417>";
	this.f_mojoMusicVolume=t_volume;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<418>";
	bb_audio_SetMusicVolume(this.f_mojoMusicVolume);
	pop_err();
}
bb_framework_DiddyApp.prototype.m_CalcAnimLength=function(t_ms){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<432>";
	var t_=(t_ms)/(1000.0/(this.f_FPS));
	pop_err();
	return t_;
}
bb_framework_DiddyApp.prototype.m_Update=function(t_fixedRateLogicDelta){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<342>";
	bb_framework_dt.m_UpdateDelta();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<343>";
	if(this.f_useFixedRateLogic){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<344>";
		dbg_object(bb_framework_dt).f_delta=t_fixedRateLogicDelta;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<347>";
	if(dbg_object(this.f_screenFade).f_active){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<347>";
		this.f_screenFade.m_Update2();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<348>";
	this.f_currentScreen.m_Update2();
	pop_err();
}
bb_framework_DiddyApp.prototype.m_OnUpdate=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<308>";
	this.m_ReadInputs();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<310>";
	this.m_OverrideUpdate();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<311>";
	if(this.f_useFixedRateLogic){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<312>";
		var t_now=bb_app_Millisecs();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<313>";
		if((t_now)<this.f_lastTime){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<314>";
			this.f_numTicks=this.f_lastNumTicks;
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<316>";
			this.f_tmpMs=(t_now)-this.f_lastTime;
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<317>";
			if(this.f_tmpMs>(this.f_maxMs)){
				err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<317>";
				this.f_tmpMs=(this.f_maxMs);
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<318>";
			this.f_numTicks=this.f_tmpMs/this.f_ms;
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<321>";
		this.f_lastTime=(t_now);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<322>";
		this.f_lastNumTicks=this.f_numTicks;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<323>";
		for(var t_i=1;(t_i)<=Math.floor(this.f_numTicks);t_i=t_i+1){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<324>";
			this.m_Update(1.0);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<327>";
		var t_re=this.f_numTicks % 1.0;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<328>";
		if(t_re>0.0){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<329>";
			this.m_Update(t_re);
		}
	}else{
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<332>";
		this.m_Update(0.0);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<335>";
	pop_err();
	return 0;
}
bb_framework_DiddyApp.prototype.m_OnSuspend=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<466>";
	this.f_currentScreen.m_Suspend();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<467>";
	pop_err();
	return 0;
}
bb_framework_DiddyApp.prototype.m_OnResume=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<471>";
	this.f_currentScreen.m_Resume();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<472>";
	pop_err();
	return 0;
}
function bb_main_MyGame(){
	bb_framework_DiddyApp.call(this);
}
bb_main_MyGame.prototype=extend_class(bb_framework_DiddyApp);
function bb_main_MyGame_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/main.monkey<115>";
	bb_framework_DiddyApp_new.call(this);
	err_info="D:/Dropbox/monkeytouch/main.monkey<115>";
	pop_err();
	return this;
}
bb_main_MyGame.prototype.m_LoadImages=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/main.monkey<140>";
	for(var t_g=1;t_g<=20;t_g=t_g+1){
		err_info="D:/Dropbox/monkeytouch/main.monkey<141>";
		var t_path="";
		err_info="D:/Dropbox/monkeytouch/main.monkey<142>";
		t_path="/game"+String(t_g)+"/game"+String(t_g)+".txt";
		err_info="D:/Dropbox/monkeytouch/main.monkey<143>";
		dbg_object(bb_framework_game).f_images.m_LoadAtlas(t_path,1,true);
	}
	err_info="D:/Dropbox/monkeytouch/main.monkey<146>";
	dbg_object(bb_framework_game).f_images.m_Load2("title.png","",false,false);
	pop_err();
}
bb_main_MyGame.prototype.m_LoadSounds=function(){
	push_err();
	pop_err();
}
bb_main_MyGame.prototype.m_LoadFonts=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/main.monkey<152>";
	bb_main_TitleFont=bb_bitmapfont_BitmapFont_new.call(new bb_bitmapfont_BitmapFont,"fonts/monkey_18_h.txt",true);
	err_info="D:/Dropbox/monkeytouch/main.monkey<153>";
	bb_main_InfoFont=bb_bitmapfont_BitmapFont_new.call(new bb_bitmapfont_BitmapFont,"fonts/monkey_18.txt",true);
	err_info="D:/Dropbox/monkeytouch/main.monkey<154>";
	bb_main_SmallFont=bb_bitmapfont_BitmapFont_new.call(new bb_bitmapfont_BitmapFont,"fonts/monkey_12.txt",true);
	err_info="D:/Dropbox/monkeytouch/main.monkey<155>";
	bb_main_HighlightFont=bb_bitmapfont_BitmapFont_new.call(new bb_bitmapfont_BitmapFont,"fonts/monkey_12_h.txt",true);
	pop_err();
}
bb_main_MyGame.prototype.m_OnCreate=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/main.monkey<120>";
	bb_framework_DiddyApp.prototype.m_OnCreate.call(this);
	err_info="D:/Dropbox/monkeytouch/main.monkey<121>";
	bb_functions_SetGraphics(640,480);
	err_info="D:/Dropbox/monkeytouch/main.monkey<122>";
	this.m_SetScreenSize(640.0,480.0,true);
	err_info="D:/Dropbox/monkeytouch/main.monkey<124>";
	this.m_LoadImages();
	err_info="D:/Dropbox/monkeytouch/main.monkey<125>";
	this.m_LoadSounds();
	err_info="D:/Dropbox/monkeytouch/main.monkey<126>";
	this.m_LoadFonts();
	err_info="D:/Dropbox/monkeytouch/main.monkey<128>";
	bb_main_TitleScr.m_PreStart();
	err_info="D:/Dropbox/monkeytouch/main.monkey<130>";
	pop_err();
	return 0;
}
function bb_app_AppDevice(){
	gxtkApp.call(this);
	this.f_app=null;
	this.f_updateRate=0;
}
bb_app_AppDevice.prototype=extend_class(gxtkApp);
function bb_app_AppDevice_new(t_app){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<45>";
	dbg_object(this).f_app=t_app;
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<46>";
	bb_graphics_SetGraphicsContext(bb_graphics_GraphicsContext_new.call(new bb_graphics_GraphicsContext,this.GraphicsDevice()));
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<47>";
	bb_input_SetInputDevice(this.InputDevice());
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<48>";
	bb_audio_SetAudioDevice(this.AudioDevice());
	pop_err();
	return this;
}
function bb_app_AppDevice_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<42>";
	pop_err();
	return this;
}
bb_app_AppDevice.prototype.OnCreate=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<52>";
	bb_graphics_SetFont(null,32);
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<53>";
	var t_=this.f_app.m_OnCreate();
	pop_err();
	return t_;
}
bb_app_AppDevice.prototype.OnUpdate=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<57>";
	var t_=this.f_app.m_OnUpdate();
	pop_err();
	return t_;
}
bb_app_AppDevice.prototype.OnSuspend=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<61>";
	var t_=this.f_app.m_OnSuspend();
	pop_err();
	return t_;
}
bb_app_AppDevice.prototype.OnResume=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<65>";
	var t_=this.f_app.m_OnResume();
	pop_err();
	return t_;
}
bb_app_AppDevice.prototype.OnRender=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<69>";
	bb_graphics_BeginRender();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<70>";
	var t_r=this.f_app.m_OnRender();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<71>";
	bb_graphics_EndRender();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<72>";
	pop_err();
	return t_r;
}
bb_app_AppDevice.prototype.OnLoading=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<76>";
	bb_graphics_BeginRender();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<77>";
	var t_r=this.f_app.m_OnLoading();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<78>";
	bb_graphics_EndRender();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<79>";
	pop_err();
	return t_r;
}
bb_app_AppDevice.prototype.SetUpdateRate=function(t_hertz){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<83>";
	gxtkApp.prototype.SetUpdateRate.call(this,t_hertz);
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<84>";
	this.f_updateRate=t_hertz;
	pop_err();
	return 0;
}
function bb_graphics_GraphicsContext(){
	Object.call(this);
	this.f_device=null;
	this.f_defaultFont=null;
	this.f_font=null;
	this.f_firstChar=0;
	this.f_matrixSp=0;
	this.f_ix=1.0;
	this.f_iy=.0;
	this.f_jx=.0;
	this.f_jy=1.0;
	this.f_tx=.0;
	this.f_ty=.0;
	this.f_tformed=0;
	this.f_matDirty=0;
	this.f_color_r=.0;
	this.f_color_g=.0;
	this.f_color_b=.0;
	this.f_alpha=.0;
	this.f_blend=0;
	this.f_scissor_x=.0;
	this.f_scissor_y=.0;
	this.f_scissor_width=.0;
	this.f_scissor_height=.0;
	this.f_matrixStack=new_number_array(192);
}
function bb_graphics_GraphicsContext_new(t_device){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<210>";
	dbg_object(this).f_device=t_device;
	pop_err();
	return this;
}
function bb_graphics_GraphicsContext_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<207>";
	pop_err();
	return this;
}
var bb_graphics_context;
function bb_graphics_SetGraphicsContext(t_gc){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<250>";
	bb_graphics_context=t_gc;
	pop_err();
	return 0;
}
var bb_input_device;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<40>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_audio_device;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/audio.monkey<60>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
var bb_app_device;
var bb_framework_game;
function bb_framework_Screen(){
	Object.call(this);
	this.f_name="";
	this.f_autoFadeIn=false;
	this.f_autoFadeInTime=50.0;
	this.f_autoFadeInSound=false;
	this.f_autoFadeInMusic=false;
}
function bb_framework_Screen_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<575>";
	pop_err();
	return this;
}
bb_framework_Screen.prototype.m_Render=function(){
}
bb_framework_Screen.prototype.m_ExtraRender=function(){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_DebugRender=function(){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnTouchHit=function(t_x,t_y,t_pointer){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnTouchClick=function(t_x,t_y,t_pointer){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnTouchFling=function(t_releaseX,t_releaseY,t_velocityX,t_velocityY,t_velocitySpeed,t_pointer){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnTouchReleased=function(t_x,t_y,t_pointer){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnTouchDragged=function(t_x,t_y,t_dx,t_dy,t_pointer){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnTouchLongPress=function(t_x,t_y,t_pointer){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnAnyKeyHit=function(){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnKeyHit=function(t_key){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnAnyKeyDown=function(){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnKeyDown=function(t_key){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnAnyKeyReleased=function(){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnKeyReleased=function(t_key){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnMouseHit=function(t_x,t_y,t_button){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnMouseDown=function(t_x,t_y,t_button){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_OnMouseReleased=function(t_x,t_y,t_button){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_Start=function(){
}
bb_framework_Screen.prototype.m_PreStart=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<586>";
	dbg_object(bb_framework_game).f_currentScreen=this;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<587>";
	if(this.f_autoFadeIn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<588>";
		this.f_autoFadeIn=false;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<589>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(this.f_autoFadeInTime,false,this.f_autoFadeInSound,this.f_autoFadeInMusic);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<591>";
	this.m_Start();
	pop_err();
}
bb_framework_Screen.prototype.m_PostFadeOut=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<607>";
	dbg_object(bb_framework_game).f_nextScreen.m_PreStart();
	pop_err();
}
bb_framework_Screen.prototype.m_PostFadeIn=function(){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_Update2=function(){
}
bb_framework_Screen.prototype.m_Suspend=function(){
	push_err();
	pop_err();
}
bb_framework_Screen.prototype.m_Resume=function(){
	push_err();
	pop_err();
}
function bb_framework_ExitScreen(){
	bb_framework_Screen.call(this);
}
bb_framework_ExitScreen.prototype=extend_class(bb_framework_Screen);
function bb_framework_ExitScreen_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<559>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<560>";
	this.f_name="exit";
	pop_err();
	return this;
}
bb_framework_ExitScreen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<564>";
	bb_functions_ExitApp();
	pop_err();
}
bb_framework_ExitScreen.prototype.m_Render=function(){
	push_err();
	pop_err();
}
bb_framework_ExitScreen.prototype.m_Update2=function(){
	push_err();
	pop_err();
}
function bb_framework_ScreenFade(){
	Object.call(this);
	this.f_active=false;
	this.f_ratio=0.0;
	this.f_counter=.0;
	this.f_fadeTime=.0;
	this.f_fadeMusic=false;
	this.f_fadeOut=false;
	this.f_fadeSound=false;
}
function bb_framework_ScreenFade_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<477>";
	pop_err();
	return this;
}
bb_framework_ScreenFade.prototype.m_Render=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<547>";
	if(!this.f_active){
		pop_err();
		return;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<548>";
	bb_graphics_SetAlpha(1.0-this.f_ratio);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<549>";
	bb_graphics_SetColor(0.0,0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<550>";
	bb_graphics_DrawRect(0.0,0.0,bb_framework_DEVICE_WIDTH,bb_framework_DEVICE_HEIGHT);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<551>";
	bb_graphics_SetAlpha(1.0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<552>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	pop_err();
}
bb_framework_ScreenFade.prototype.m_CalcRatio=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<528>";
	this.f_ratio=this.f_counter/this.f_fadeTime;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<529>";
	if(this.f_ratio<0.0){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<530>";
		this.f_ratio=0.0;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<531>";
		if(this.f_fadeMusic){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<532>";
			bb_framework_game.m_SetMojoMusicVolume(0.0);
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<535>";
	if(this.f_ratio>1.0){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<536>";
		this.f_ratio=1.0;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<537>";
		if(this.f_fadeMusic){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<538>";
			bb_framework_game.m_SetMojoMusicVolume((dbg_object(bb_framework_game).f_musicVolume)/100.0);
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<541>";
	if(this.f_fadeOut){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<542>";
		this.f_ratio=1.0-this.f_ratio;
	}
	pop_err();
}
bb_framework_ScreenFade.prototype.m_Start2=function(t_fadeTime,t_fadeOut,t_fadeSound,t_fadeMusic){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<487>";
	if(this.f_active){
		pop_err();
		return;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<488>";
	this.f_active=true;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<489>";
	dbg_object(this).f_fadeTime=bb_framework_game.m_CalcAnimLength((t_fadeTime)|0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<490>";
	dbg_object(this).f_fadeOut=t_fadeOut;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<491>";
	dbg_object(this).f_fadeMusic=t_fadeMusic;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<492>";
	dbg_object(this).f_fadeSound=t_fadeSound;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<493>";
	if(t_fadeOut){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<494>";
		this.f_ratio=1.0;
	}else{
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<496>";
		this.f_ratio=0.0;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<498>";
		if(dbg_object(this).f_fadeMusic){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<499>";
			bb_framework_game.m_SetMojoMusicVolume(0.0);
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<502>";
	this.f_counter=0.0;
	pop_err();
}
bb_framework_ScreenFade.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<506>";
	if(!this.f_active){
		pop_err();
		return;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<507>";
	this.f_counter+=dbg_object(bb_framework_dt).f_delta;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<508>";
	this.m_CalcRatio();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<509>";
	if(this.f_fadeSound){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<510>";
		for(var t_i=0;t_i<=31;t_i=t_i+1){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<511>";
			bb_audio_SetChannelVolume(t_i,this.f_ratio*((dbg_object(bb_framework_game).f_soundVolume)/100.0));
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<514>";
	if(this.f_fadeMusic){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<515>";
		bb_framework_game.m_SetMojoMusicVolume(this.f_ratio*((dbg_object(bb_framework_game).f_musicVolume)/100.0));
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<517>";
	if(this.f_counter>this.f_fadeTime){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<518>";
		this.f_active=false;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<519>";
		if(this.f_fadeOut){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<520>";
			dbg_object(bb_framework_game).f_currentScreen.m_PostFadeOut();
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<522>";
			dbg_object(bb_framework_game).f_currentScreen.m_PostFadeIn();
		}
	}
	pop_err();
}
function bb_framework_GameImage(){
	Object.call(this);
	this.f_w2=.0;
	this.f_h2=.0;
	this.f_w=0;
	this.f_h=0;
	this.f_name="";
	this.f_image=null;
	this.f_midhandled=0;
	this.f_altasName="";
	this.f_subX=0;
	this.f_subY=0;
}
function bb_framework_GameImage_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1002>";
	pop_err();
	return this;
}
bb_framework_GameImage.prototype.m_CalcSize=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1051>";
	if(this.f_image!=null){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1052>";
		this.f_w=this.f_image.m_Width();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1053>";
		this.f_h=this.f_image.m_Height();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1054>";
		this.f_w2=((this.f_w/2)|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1055>";
		this.f_h2=((this.f_h/2)|0);
	}
	pop_err();
}
bb_framework_GameImage.prototype.m_MidHandle=function(t_midhandle){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1060>";
	if(t_midhandle){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1061>";
		this.f_image.m_SetHandle(this.f_w2,this.f_h2);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1062>";
		dbg_object(this).f_midhandled=1;
	}else{
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1064>";
		this.f_image.m_SetHandle(0.0,0.0);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1065>";
		dbg_object(this).f_midhandled=0;
	}
	pop_err();
}
bb_framework_GameImage.prototype.m_MidHandle2=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1074>";
	var t_=dbg_object(this).f_midhandled==1;
	pop_err();
	return t_;
}
bb_framework_GameImage.prototype.m_Load=function(t_file,t_midhandle){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1026>";
	this.f_name=bb_functions_StripAll(t_file.toUpperCase());
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1027>";
	this.f_image=bb_functions_LoadBitmap(t_file,0);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1028>";
	this.m_CalcSize();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1029>";
	this.m_MidHandle(t_midhandle);
	pop_err();
}
function bb_map_Map(){
	Object.call(this);
	this.f_root=null;
}
function bb_map_Map_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
bb_map_Map.prototype.m_Compare=function(t_lhs,t_rhs){
}
bb_map_Map.prototype.m_RotateLeft=function(t_node){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<251>";
	var t_child=dbg_object(t_node).f_right;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<252>";
	dbg_object(t_node).f_right=dbg_object(t_child).f_left;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<253>";
	if((dbg_object(t_child).f_left)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<254>";
		dbg_object(dbg_object(t_child).f_left).f_parent=t_node;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<256>";
	dbg_object(t_child).f_parent=dbg_object(t_node).f_parent;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<257>";
	if((dbg_object(t_node).f_parent)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<258>";
		if(t_node==dbg_object(dbg_object(t_node).f_parent).f_left){
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<259>";
			dbg_object(dbg_object(t_node).f_parent).f_left=t_child;
		}else{
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<261>";
			dbg_object(dbg_object(t_node).f_parent).f_right=t_child;
		}
	}else{
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<264>";
		this.f_root=t_child;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<266>";
	dbg_object(t_child).f_left=t_node;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<267>";
	dbg_object(t_node).f_parent=t_child;
	pop_err();
	return 0;
}
bb_map_Map.prototype.m_RotateRight=function(t_node){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<271>";
	var t_child=dbg_object(t_node).f_left;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<272>";
	dbg_object(t_node).f_left=dbg_object(t_child).f_right;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<273>";
	if((dbg_object(t_child).f_right)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<274>";
		dbg_object(dbg_object(t_child).f_right).f_parent=t_node;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<276>";
	dbg_object(t_child).f_parent=dbg_object(t_node).f_parent;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<277>";
	if((dbg_object(t_node).f_parent)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<278>";
		if(t_node==dbg_object(dbg_object(t_node).f_parent).f_right){
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<279>";
			dbg_object(dbg_object(t_node).f_parent).f_right=t_child;
		}else{
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<281>";
			dbg_object(dbg_object(t_node).f_parent).f_left=t_child;
		}
	}else{
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<284>";
		this.f_root=t_child;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<286>";
	dbg_object(t_child).f_right=t_node;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<287>";
	dbg_object(t_node).f_parent=t_child;
	pop_err();
	return 0;
}
bb_map_Map.prototype.m_InsertFixup=function(t_node){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<212>";
	while(((dbg_object(t_node).f_parent)!=null) && dbg_object(dbg_object(t_node).f_parent).f_color==-1 && ((dbg_object(dbg_object(t_node).f_parent).f_parent)!=null)){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<213>";
		if(dbg_object(t_node).f_parent==dbg_object(dbg_object(dbg_object(t_node).f_parent).f_parent).f_left){
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).f_parent).f_parent).f_right;
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).f_color==-1){
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<216>";
				dbg_object(dbg_object(t_node).f_parent).f_color=1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<217>";
				dbg_object(t_uncle).f_color=1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<218>";
				dbg_object(dbg_object(t_uncle).f_parent).f_color=-1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<219>";
				t_node=dbg_object(t_uncle).f_parent;
			}else{
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<221>";
				if(t_node==dbg_object(dbg_object(t_node).f_parent).f_right){
					err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<222>";
					t_node=dbg_object(t_node).f_parent;
					err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<223>";
					this.m_RotateLeft(t_node);
				}
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<225>";
				dbg_object(dbg_object(t_node).f_parent).f_color=1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<226>";
				dbg_object(dbg_object(dbg_object(t_node).f_parent).f_parent).f_color=-1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<227>";
				this.m_RotateRight(dbg_object(dbg_object(t_node).f_parent).f_parent);
			}
		}else{
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).f_parent).f_parent).f_left;
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).f_color==-1){
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<232>";
				dbg_object(dbg_object(t_node).f_parent).f_color=1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<233>";
				dbg_object(t_uncle2).f_color=1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<234>";
				dbg_object(dbg_object(t_uncle2).f_parent).f_color=-1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<235>";
				t_node=dbg_object(t_uncle2).f_parent;
			}else{
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<237>";
				if(t_node==dbg_object(dbg_object(t_node).f_parent).f_left){
					err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<238>";
					t_node=dbg_object(t_node).f_parent;
					err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<239>";
					this.m_RotateRight(t_node);
				}
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<241>";
				dbg_object(dbg_object(t_node).f_parent).f_color=1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<242>";
				dbg_object(dbg_object(dbg_object(t_node).f_parent).f_parent).f_color=-1;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<243>";
				this.m_RotateLeft(dbg_object(dbg_object(t_node).f_parent).f_parent);
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<247>";
	dbg_object(this.f_root).f_color=1;
	pop_err();
	return 0;
}
bb_map_Map.prototype.m_Set=function(t_key,t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<29>";
	var t_node=this.f_root;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<30>";
	var t_parent=null;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<30>";
	var t_cmp=0;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<32>";
	while((t_node)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<33>";
		t_parent=t_node;
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<34>";
		t_cmp=this.m_Compare(t_key,dbg_object(t_node).f_key);
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<35>";
		if(t_cmp>0){
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<36>";
			t_node=dbg_object(t_node).f_right;
		}else{
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<37>";
			if(t_cmp<0){
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<38>";
				t_node=dbg_object(t_node).f_left;
			}else{
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<40>";
				dbg_object(t_node).f_value=t_value;
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<45>";
	t_node=bb_map_Node_new.call(new bb_map_Node,t_key,t_value,-1,t_parent);
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<47>";
	if((t_parent)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<48>";
		if(t_cmp>0){
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<49>";
			dbg_object(t_parent).f_right=t_node;
		}else{
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<51>";
			dbg_object(t_parent).f_left=t_node;
		}
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<53>";
		this.m_InsertFixup(t_node);
	}else{
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<55>";
		this.f_root=t_node;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<57>";
	pop_err();
	return true;
}
bb_map_Map.prototype.m_FindNode=function(t_key){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<157>";
	var t_node=this.f_root;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<159>";
	while((t_node)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<160>";
		var t_cmp=this.m_Compare(t_key,dbg_object(t_node).f_key);
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<161>";
		if(t_cmp>0){
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<162>";
			t_node=dbg_object(t_node).f_right;
		}else{
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<163>";
			if(t_cmp<0){
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<164>";
				t_node=dbg_object(t_node).f_left;
			}else{
				err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<169>";
	pop_err();
	return t_node;
}
bb_map_Map.prototype.m_Contains=function(t_key){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<25>";
	var t_=this.m_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
bb_map_Map.prototype.m_Get=function(t_key){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<101>";
	var t_node=this.m_FindNode(t_key);
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<102>";
	if((t_node)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<102>";
		pop_err();
		return dbg_object(t_node).f_value;
	}
	pop_err();
	return null;
}
bb_map_Map.prototype.m_Keys=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<113>";
	var t_=bb_map_MapKeys_new.call(new bb_map_MapKeys,this);
	pop_err();
	return t_;
}
bb_map_Map.prototype.m_FirstNode=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<137>";
	if(!((this.f_root)!=null)){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<137>";
		pop_err();
		return null;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<139>";
	var t_node=this.f_root;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<140>";
	while((dbg_object(t_node).f_left)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<141>";
		t_node=dbg_object(t_node).f_left;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<143>";
	pop_err();
	return t_node;
}
function bb_map_StringMap(){
	bb_map_Map.call(this);
}
bb_map_StringMap.prototype=extend_class(bb_map_Map);
function bb_map_StringMap_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<551>";
	bb_map_Map_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
bb_map_StringMap.prototype.m_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<554>";
	var t_=string_compare(t_lhs,t_rhs);
	pop_err();
	return t_;
}
function bb_framework_ImageBank(){
	bb_map_StringMap.call(this);
	this.f_path="graphics/";
}
bb_framework_ImageBank.prototype=extend_class(bb_map_StringMap);
function bb_framework_ImageBank_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<743>";
	bb_map_StringMap_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<743>";
	pop_err();
	return this;
}
bb_framework_ImageBank.prototype.m_LoadAtlasString=function(t_fileName){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<761>";
	var t_str=bb_app_LoadString(this.f_path+t_fileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<763>";
	bb_assert_AssertNotEqualInt(t_str.length,0,"Error loading Atlas "+this.f_path+t_fileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<764>";
	pop_err();
	return t_str;
}
bb_framework_ImageBank.prototype.m_SaveAtlasToBank=function(t_pointer,t_fileName){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<769>";
	var t_atlasGameImage=bb_framework_GameImage_new.call(new bb_framework_GameImage);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<770>";
	dbg_object(t_atlasGameImage).f_name="_diddyAtlas_"+bb_functions_StripAll(t_fileName).toUpperCase();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<771>";
	dbg_object(t_atlasGameImage).f_image=t_pointer;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<772>";
	t_atlasGameImage.m_CalcSize();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<773>";
	this.m_Set(dbg_object(t_atlasGameImage).f_name,t_atlasGameImage);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<774>";
	pop_err();
	return dbg_object(t_atlasGameImage).f_name;
}
bb_framework_ImageBank.prototype.m_LoadSparrowAtlas=function(t_fileName,t_midHandle){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<866>";
	var t_str=this.m_LoadAtlasString(t_fileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<868>";
	var t_parser=bb_xml_XMLParser_new.call(new bb_xml_XMLParser);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<869>";
	var t_doc=t_parser.m_ParseString(t_str);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<870>";
	var t_rootElement=t_doc.m_Root();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<871>";
	var t_spriteFileName=t_rootElement.m_GetAttribute("imagePath","");
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<873>";
	var t_pointer=bb_graphics_LoadImage(this.f_path+t_spriteFileName,1,bb_graphics_Image_DefaultFlags);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<874>";
	bb_assert_AssertNotNull((t_pointer),"Error loading bitmap atlas "+this.f_path+t_spriteFileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<876>";
	var t_atlasGameImageName=this.m_SaveAtlasToBank(t_pointer,t_fileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<878>";
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<878>";
	var t_=t_rootElement.m_GetChildrenByName("SubTexture").m_ObjectEnumerator();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<878>";
	while(t_.m_HasNext()){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<878>";
		var t_node=t_.m_NextObject();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<879>";
		var t_x=parseInt((string_trim(t_node.m_GetAttribute("x",""))),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<880>";
		var t_y=parseInt((string_trim(t_node.m_GetAttribute("y",""))),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<881>";
		var t_width=parseInt((string_trim(t_node.m_GetAttribute("width",""))),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<882>";
		var t_height=parseInt((string_trim(t_node.m_GetAttribute("height",""))),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<883>";
		var t_name=string_trim(t_node.m_GetAttribute("name",""));
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<885>";
		var t_gi=bb_framework_GameImage_new.call(new bb_framework_GameImage);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<886>";
		dbg_object(t_gi).f_name=t_name.toUpperCase();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<887>";
		dbg_object(t_gi).f_image=t_pointer.m_GrabImage(t_x,t_y,t_width,t_height,1,bb_graphics_Image_DefaultFlags);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<888>";
		t_gi.m_CalcSize();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<889>";
		t_gi.m_MidHandle(t_midHandle);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<891>";
		dbg_object(t_gi).f_altasName=t_atlasGameImageName;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<892>";
		dbg_object(t_gi).f_subX=t_x;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<893>";
		dbg_object(t_gi).f_subY=t_y;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<895>";
		this.m_Set(dbg_object(t_gi).f_name,t_gi);
	}
	pop_err();
}
bb_framework_ImageBank.prototype.m_LoadLibGdxAtlas=function(t_fileName,t_midHandle){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<778>";
	var t_str=this.m_LoadAtlasString(t_fileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<779>";
	var t_all=t_str.split("\n");
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<780>";
	var t_spriteFileName=string_trim(dbg_array(t_all,0)[0]);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<781>";
	var t_pointer=bb_graphics_LoadImage(this.f_path+t_spriteFileName,1,bb_graphics_Image_DefaultFlags);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<782>";
	bb_assert_AssertNotNull((t_pointer),"Error loading bitmap atlas "+this.f_path+t_spriteFileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<783>";
	var t_atlasGameImageName=this.m_SaveAtlasToBank(t_pointer,t_fileName);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<785>";
	var t_line="";
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<786>";
	var t_i=4;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<787>";
	var t_xy=["",""];
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<788>";
	var t_debug=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<789>";
	while(true){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<791>";
		t_line=string_trim(dbg_array(t_all,t_i)[t_i]);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<792>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<792>";
			print("name = "+t_line);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<793>";
		if(t_line==""){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<793>";
			break;
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<794>";
		var t_name=t_line;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<796>";
		t_i+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<797>";
		t_line=string_trim(dbg_array(t_all,t_i)[t_i]);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<798>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<798>";
			print("rotate = "+t_line);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<799>";
		var t_rotate=t_line;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<801>";
		t_i+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<802>";
		t_line=string_trim(dbg_array(t_all,t_i)[t_i]);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<803>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<803>";
			print("x and y = "+t_line);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<804>";
		t_xy=t_line.slice(t_line.lastIndexOf(":")+1).split(",");
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<805>";
		var t_x=parseInt((string_trim(dbg_array(t_xy,0)[0])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<806>";
		var t_y=parseInt((string_trim(dbg_array(t_xy,1)[1])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<808>";
		t_i+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<809>";
		t_line=string_trim(dbg_array(t_all,t_i)[t_i]);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<810>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<810>";
			print("width and height = "+t_line);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<811>";
		t_xy=t_line.slice(t_line.lastIndexOf(":")+1).split(",");
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<812>";
		var t_width=parseInt((string_trim(dbg_array(t_xy,0)[0])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<813>";
		var t_height=parseInt((string_trim(dbg_array(t_xy,1)[1])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<815>";
		t_i+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<816>";
		t_line=string_trim(dbg_array(t_all,t_i)[t_i]);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<817>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<817>";
			print("origX and origY = "+t_line);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<818>";
		t_xy=t_line.slice(t_line.lastIndexOf(":")+1).split(",");
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<819>";
		var t_origX=parseInt((string_trim(dbg_array(t_xy,0)[0])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<820>";
		var t_origY=parseInt((string_trim(dbg_array(t_xy,1)[1])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<822>";
		t_i+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<823>";
		t_line=string_trim(dbg_array(t_all,t_i)[t_i]);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<824>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<824>";
			print("offsets = "+t_line);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<825>";
		t_xy=t_line.slice(t_line.lastIndexOf(":")+1).split(",");
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<826>";
		var t_offsetX=parseInt((string_trim(dbg_array(t_xy,0)[0])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<827>";
		var t_offsetY=parseInt((string_trim(dbg_array(t_xy,1)[1])),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<829>";
		t_i+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<830>";
		t_line=string_trim(dbg_array(t_all,t_i)[t_i]);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<831>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<831>";
			print("index = "+t_line);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<832>";
		var t_index=parseInt((string_trim(t_line.slice(t_line.lastIndexOf(":")+1))),10);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<833>";
		t_i+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<834>";
		var t_gi=bb_framework_GameImage_new.call(new bb_framework_GameImage);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<835>";
		if(t_index>-1){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<836>";
			t_name=t_name+String(t_index);
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<838>";
		if(t_debug){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<839>";
			print("name    = "+t_name);
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<840>";
			print("x       = "+String(t_x));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<841>";
			print("y       = "+String(t_y));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<842>";
			print("width   = "+String(t_width));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<843>";
			print("height  = "+String(t_height));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<844>";
			print("origX   = "+String(t_origX));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<845>";
			print("origY   = "+String(t_origY));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<846>";
			print("offsetX = "+String(t_offsetX));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<847>";
			print("offsetY = "+String(t_offsetY));
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<848>";
			print("index   = "+String(t_index));
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<851>";
		dbg_object(t_gi).f_name=t_name.toUpperCase();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<852>";
		dbg_object(t_gi).f_image=t_pointer.m_GrabImage(t_x,t_y,t_width,t_height,1,bb_graphics_Image_DefaultFlags);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<853>";
		t_gi.m_CalcSize();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<854>";
		t_gi.m_MidHandle(t_midHandle);
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<856>";
		dbg_object(t_gi).f_altasName=t_atlasGameImageName;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<857>";
		dbg_object(t_gi).f_subX=t_x;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<858>";
		dbg_object(t_gi).f_subY=t_y;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<860>";
		this.m_Set(dbg_object(t_gi).f_name,t_gi);
	}
	pop_err();
}
bb_framework_ImageBank.prototype.m_LoadAtlas=function(t_fileName,t_format,t_midHandle){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<751>";
	if(t_format==0){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<752>";
		this.m_LoadSparrowAtlas(t_fileName,t_midHandle);
	}else{
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<753>";
		if(t_format==1){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<754>";
			this.m_LoadLibGdxAtlas(t_fileName,t_midHandle);
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<756>";
			error("Invalid atlas format");
		}
	}
	pop_err();
}
bb_framework_ImageBank.prototype.m_Load2=function(t_name,t_nameoverride,t_midhandle,t_ignoreCache){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<901>";
	var t_storeKey=t_nameoverride.toUpperCase();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<902>";
	if(t_storeKey==""){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<902>";
		t_storeKey=bb_functions_StripAll(t_name.toUpperCase());
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<903>";
	if(!t_ignoreCache && this.m_Contains(t_storeKey)){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<903>";
		var t_=this.m_Get(t_storeKey);
		pop_err();
		return t_;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<907>";
	if(this.m_Contains(t_storeKey)){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<907>";
		dbg_object(this.m_Get(t_storeKey)).f_image.m_Discard();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<909>";
	var t_i=bb_framework_GameImage_new.call(new bb_framework_GameImage);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<910>";
	t_i.m_Load(this.f_path+t_name,t_midhandle);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<911>";
	dbg_object(t_i).f_name=t_storeKey;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<912>";
	this.m_Set(dbg_object(t_i).f_name,t_i);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<913>";
	pop_err();
	return t_i;
}
bb_framework_ImageBank.prototype.m_Find=function(t_name){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<952>";
	t_name=t_name.toUpperCase();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<955>";
	if(dbg_object(bb_framework_game).f_debugOn){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<956>";
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<956>";
		var t_=this.m_Keys().m_ObjectEnumerator();
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<956>";
		while(t_.m_HasNext()){
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<956>";
			var t_key=t_.m_NextObject();
			err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<957>";
			print(t_key+" is stored in the image map.");
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<961>";
	var t_i=this.m_Get(t_name);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<962>";
	bb_assert_AssertNotNull((t_i),"Image '"+t_name+"' not found in the ImageBank");
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<963>";
	pop_err();
	return t_i;
}
function bb_framework_GameSound(){
	Object.call(this);
}
function bb_map_Map2(){
	Object.call(this);
}
function bb_map_Map2_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<7>";
	pop_err();
	return this;
}
function bb_map_StringMap2(){
	bb_map_Map2.call(this);
}
bb_map_StringMap2.prototype=extend_class(bb_map_Map2);
function bb_map_StringMap2_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<551>";
	bb_map_Map2_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<551>";
	pop_err();
	return this;
}
function bb_framework_SoundBank(){
	bb_map_StringMap2.call(this);
}
bb_framework_SoundBank.prototype=extend_class(bb_map_StringMap2);
function bb_framework_SoundBank_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1208>";
	bb_map_StringMap2_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1208>";
	pop_err();
	return this;
}
function bb_inputcache_InputCache(){
	Object.call(this);
	this.f_keyHitEnumerator=null;
	this.f_keyDownEnumerator=null;
	this.f_keyReleasedEnumerator=null;
	this.f_keyHitWrapper=null;
	this.f_keyDownWrapper=null;
	this.f_keyReleasedWrapper=null;
	this.f_touchData=new_object_array(32);
	this.f_monitorTouch=false;
	this.f_monitorMouse=false;
	this.f_touchDownCount=0;
	this.f_touchHitCount=0;
	this.f_touchReleasedCount=0;
	this.f_maxTouchDown=-1;
	this.f_maxTouchHit=-1;
	this.f_maxTouchReleased=-1;
	this.f_minTouchDown=-1;
	this.f_minTouchHit=-1;
	this.f_minTouchReleased=-1;
	this.f_touchHit=new_number_array(32);
	this.f_touchHitTime=new_number_array(32);
	this.f_touchDown=new_number_array(32);
	this.f_touchDownTime=new_number_array(32);
	this.f_touchReleasedTime=new_number_array(32);
	this.f_touchReleased=new_number_array(32);
	this.f_touchX=new_number_array(32);
	this.f_touchY=new_number_array(32);
	this.f_currentTouchDown=new_number_array(32);
	this.f_currentTouchHit=new_number_array(32);
	this.f_currentTouchReleased=new_number_array(32);
	this.f_mouseDownCount=0;
	this.f_mouseHitCount=0;
	this.f_mouseReleasedCount=0;
	this.f_mouseX=0;
	this.f_mouseY=0;
	this.f_mouseHit=new_number_array(3);
	this.f_mouseHitTime=new_number_array(3);
	this.f_mouseDown=new_number_array(3);
	this.f_mouseDownTime=new_number_array(3);
	this.f_mouseReleasedTime=new_number_array(3);
	this.f_mouseReleased=new_number_array(3);
	this.f_currentMouseDown=new_number_array(3);
	this.f_currentMouseHit=new_number_array(3);
	this.f_currentMouseReleased=new_number_array(3);
	this.f_keyDownCount=0;
	this.f_keyHitCount=0;
	this.f_keyReleasedCount=0;
	this.f_monitorKeyCount=0;
	this.f_monitorKey=new_bool_array(512);
	this.f_keyHit=new_number_array(512);
	this.f_keyHitTime=new_number_array(512);
	this.f_keyDown=new_number_array(512);
	this.f_keyDownTime=new_number_array(512);
	this.f_keyReleasedTime=new_number_array(512);
	this.f_keyReleased=new_number_array(512);
	this.f_currentKeysDown=new_number_array(512);
	this.f_currentKeysHit=new_number_array(512);
	this.f_currentKeysReleased=new_number_array(512);
	this.f_flingThreshold=250.0;
	this.f_longPressTime=1000;
}
function bb_inputcache_InputCache_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<176>";
	this.f_keyHitEnumerator=bb_inputcache_KeyEventEnumerator_new.call(new bb_inputcache_KeyEventEnumerator,this,3);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<177>";
	this.f_keyDownEnumerator=bb_inputcache_KeyEventEnumerator_new.call(new bb_inputcache_KeyEventEnumerator,this,1);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<178>";
	this.f_keyReleasedEnumerator=bb_inputcache_KeyEventEnumerator_new.call(new bb_inputcache_KeyEventEnumerator,this,2);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<179>";
	this.f_keyHitWrapper=bb_inputcache_EnumWrapper_new.call(new bb_inputcache_EnumWrapper,this.f_keyHitEnumerator);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<180>";
	this.f_keyDownWrapper=bb_inputcache_EnumWrapper_new.call(new bb_inputcache_EnumWrapper,this.f_keyDownEnumerator);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<181>";
	this.f_keyReleasedWrapper=bb_inputcache_EnumWrapper_new.call(new bb_inputcache_EnumWrapper,this.f_keyReleasedEnumerator);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<182>";
	for(var t_i=0;t_i<this.f_touchData.length;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<183>";
		dbg_array(this.f_touchData,t_i)[t_i]=bb_inputcache_TouchData_new.call(new bb_inputcache_TouchData)
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<189>";
	this.f_monitorTouch=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<190>";
	this.f_monitorMouse=true;
	pop_err();
	return this;
}
bb_inputcache_InputCache.prototype.m_ReadInput=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<283>";
	var t_newval=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<284>";
	var t_now=bb_app_Millisecs();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<287>";
	if(this.f_monitorTouch){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<288>";
		this.f_touchDownCount=0;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<289>";
		this.f_touchHitCount=0;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<290>";
		this.f_touchReleasedCount=0;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<291>";
		this.f_maxTouchDown=-1;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<292>";
		this.f_maxTouchHit=-1;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<293>";
		this.f_maxTouchReleased=-1;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<294>";
		this.f_minTouchDown=-1;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<295>";
		this.f_minTouchHit=-1;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<296>";
		this.f_minTouchReleased=-1;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<297>";
		for(var t_i=0;t_i<32;t_i=t_i+1){
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<299>";
			t_newval=bb_input_TouchHit(t_i);
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<300>";
			if(!((dbg_array(this.f_touchHit,t_i)[t_i])!=0) && ((t_newval)!=0)){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<301>";
				dbg_array(this.f_touchHitTime,t_i)[t_i]=t_now
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<303>";
			dbg_array(this.f_touchHit,t_i)[t_i]=t_newval
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<305>";
			t_newval=bb_input_TouchDown(t_i);
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<306>";
			if(((t_newval)!=0) && !((dbg_array(this.f_touchDown,t_i)[t_i])!=0)){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<307>";
				dbg_array(this.f_touchDownTime,t_i)[t_i]=t_now
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<310>";
			if(((dbg_array(this.f_touchDown,t_i)[t_i])!=0) && !((t_newval)!=0)){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<311>";
				dbg_array(this.f_touchReleasedTime,t_i)[t_i]=t_now
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<312>";
				dbg_array(this.f_touchReleased,t_i)[t_i]=1
			}else{
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<314>";
				dbg_array(this.f_touchReleased,t_i)[t_i]=0
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<316>";
			dbg_array(this.f_touchDown,t_i)[t_i]=t_newval
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<318>";
			dbg_array(this.f_touchX,t_i)[t_i]=bb_input_TouchX(t_i)
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<319>";
			dbg_array(this.f_touchY,t_i)[t_i]=bb_input_TouchY(t_i)
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<321>";
			if((dbg_array(this.f_touchDown,t_i)[t_i])!=0){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<322>";
				dbg_array(this.f_currentTouchDown,this.f_touchDownCount)[this.f_touchDownCount]=t_i
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<323>";
				this.f_touchDownCount+=1;
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<324>";
				if(this.f_minTouchDown<0){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<324>";
					this.f_minTouchDown=t_i;
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<325>";
				this.f_maxTouchDown=t_i;
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<327>";
			if((dbg_array(this.f_touchHit,t_i)[t_i])!=0){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<328>";
				dbg_array(this.f_currentTouchHit,this.f_touchHitCount)[this.f_touchHitCount]=t_i
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<329>";
				this.f_touchHitCount+=1;
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<330>";
				if(this.f_minTouchHit<0){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<330>";
					this.f_minTouchHit=t_i;
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<331>";
				this.f_maxTouchHit=t_i;
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<333>";
			if((dbg_array(this.f_touchReleased,t_i)[t_i])!=0){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<334>";
				dbg_array(this.f_currentTouchReleased,this.f_touchReleasedCount)[this.f_touchReleasedCount]=t_i
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<335>";
				this.f_touchReleasedCount+=1;
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<336>";
				if(this.f_minTouchReleased<0){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<336>";
					this.f_minTouchReleased=t_i;
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<337>";
				this.f_maxTouchReleased=t_i;
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<343>";
	if(this.f_monitorMouse){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<344>";
		this.f_mouseDownCount=0;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<345>";
		this.f_mouseHitCount=0;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<346>";
		this.f_mouseReleasedCount=0;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<347>";
		this.f_mouseX=dbg_object(bb_framework_game).f_mouseX;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<348>";
		this.f_mouseY=dbg_object(bb_framework_game).f_mouseY;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<349>";
		for(var t_i2=0;t_i2<3;t_i2=t_i2+1){
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<351>";
			t_newval=bb_input_MouseHit(t_i2);
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<352>";
			if(!((dbg_array(this.f_mouseHit,t_i2)[t_i2])!=0) && ((t_newval)!=0)){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<353>";
				dbg_array(this.f_mouseHitTime,t_i2)[t_i2]=t_now
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<355>";
			dbg_array(this.f_mouseHit,t_i2)[t_i2]=t_newval
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<357>";
			t_newval=bb_input_MouseDown(t_i2);
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<358>";
			if(((t_newval)!=0) && !((dbg_array(this.f_mouseDown,t_i2)[t_i2])!=0)){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<359>";
				dbg_array(this.f_mouseDownTime,t_i2)[t_i2]=t_now
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<362>";
			if(((dbg_array(this.f_mouseDown,t_i2)[t_i2])!=0) && !((t_newval)!=0)){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<363>";
				dbg_array(this.f_mouseReleasedTime,t_i2)[t_i2]=t_now
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<364>";
				dbg_array(this.f_mouseReleased,t_i2)[t_i2]=1
			}else{
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<366>";
				dbg_array(this.f_mouseReleased,t_i2)[t_i2]=0
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<368>";
			dbg_array(this.f_mouseDown,t_i2)[t_i2]=t_newval
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<370>";
			if((dbg_array(this.f_mouseDown,t_i2)[t_i2])!=0){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<371>";
				dbg_array(this.f_currentMouseDown,this.f_mouseDownCount)[this.f_mouseDownCount]=t_i2
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<372>";
				this.f_mouseDownCount+=1;
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<374>";
			if((dbg_array(this.f_mouseHit,t_i2)[t_i2])!=0){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<375>";
				dbg_array(this.f_currentMouseHit,this.f_mouseHitCount)[this.f_mouseHitCount]=t_i2
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<376>";
				this.f_mouseHitCount+=1;
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<378>";
			if((dbg_array(this.f_mouseReleased,t_i2)[t_i2])!=0){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<379>";
				dbg_array(this.f_currentMouseReleased,this.f_mouseReleasedCount)[this.f_mouseReleasedCount]=t_i2
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<380>";
				this.f_mouseReleasedCount+=1;
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<386>";
	this.f_keyDownCount=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<387>";
	this.f_keyHitCount=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<388>";
	this.f_keyReleasedCount=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<389>";
	if(this.f_monitorKeyCount>0){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<390>";
		for(var t_i3=8;t_i3<=222;t_i3=t_i3+1){
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<391>";
			if(dbg_array(this.f_monitorKey,t_i3)[t_i3]){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<393>";
				t_newval=bb_input_KeyHit(t_i3);
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<394>";
				if(!((dbg_array(this.f_keyHit,t_i3)[t_i3])!=0) && ((t_newval)!=0)){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<395>";
					dbg_array(this.f_keyHitTime,t_i3)[t_i3]=t_now
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<397>";
				dbg_array(this.f_keyHit,t_i3)[t_i3]=t_newval
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<399>";
				t_newval=bb_input_KeyDown(t_i3);
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<400>";
				if(((t_newval)!=0) && !((dbg_array(this.f_keyDown,t_i3)[t_i3])!=0)){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<401>";
					dbg_array(this.f_keyDownTime,t_i3)[t_i3]=t_now
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<404>";
				if(((dbg_array(this.f_keyDown,t_i3)[t_i3])!=0) && !((t_newval)!=0)){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<405>";
					dbg_array(this.f_keyReleasedTime,t_i3)[t_i3]=t_now
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<406>";
					dbg_array(this.f_keyReleased,t_i3)[t_i3]=1
				}else{
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<408>";
					dbg_array(this.f_keyReleased,t_i3)[t_i3]=0
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<410>";
				dbg_array(this.f_keyDown,t_i3)[t_i3]=t_newval
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<412>";
				if((dbg_array(this.f_keyDown,t_i3)[t_i3])!=0){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<413>";
					dbg_array(this.f_currentKeysDown,this.f_keyDownCount)[this.f_keyDownCount]=t_i3
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<414>";
					this.f_keyDownCount+=1;
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<416>";
				if((dbg_array(this.f_keyHit,t_i3)[t_i3])!=0){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<417>";
					dbg_array(this.f_currentKeysHit,this.f_keyHitCount)[this.f_keyHitCount]=t_i3
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<418>";
					this.f_keyHitCount+=1;
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<420>";
				if((dbg_array(this.f_keyReleased,t_i3)[t_i3])!=0){
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<421>";
					dbg_array(this.f_currentKeysReleased,this.f_keyReleasedCount)[this.f_keyReleasedCount]=t_i3
					err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<422>";
					this.f_keyReleasedCount+=1;
				}
			}
		}
	}
	pop_err();
}
bb_inputcache_InputCache.prototype.m_HandleEvents=function(t_screen){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<431>";
	for(var t_i=0;t_i<this.f_touchHitCount;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<432>";
		var t_pointer=dbg_array(this.f_currentTouchHit,t_i)[t_i];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<433>";
		var t_x=((dbg_array(this.f_touchX,t_pointer)[t_pointer])|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<434>";
		var t_y=((dbg_array(this.f_touchY,t_pointer)[t_pointer])|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<435>";
		dbg_array(this.f_touchData,t_pointer)[t_pointer].m_Reset(t_x,t_y);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<436>";
		t_screen.m_OnTouchHit(t_x,t_y,t_pointer);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<440>";
	for(var t_i2=0;t_i2<this.f_touchReleasedCount;t_i2=t_i2+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<441>";
		var t_pointer2=dbg_array(this.f_currentTouchReleased,t_i2)[t_i2];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<442>";
		var t_x2=((dbg_array(this.f_touchX,t_pointer2)[t_pointer2])|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<443>";
		var t_y2=((dbg_array(this.f_touchY,t_pointer2)[t_pointer2])|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<444>";
		dbg_array(this.f_touchData,t_pointer2)[t_pointer2].m_Update3(t_x2,t_y2);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<445>";
		if(!dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_movedTooFar && !dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_firedLongPress){
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<446>";
			t_screen.m_OnTouchClick(t_x2,t_y2,t_pointer2);
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<451>";
			if(dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_touchVelocityX*dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_touchVelocityX+dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_touchVelocityY*dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_touchVelocityY>=this.f_flingThreshold*this.f_flingThreshold){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<453>";
				t_screen.m_OnTouchFling(t_x2,t_y2,dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_touchVelocityX,dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_touchVelocityY,dbg_object(dbg_array(this.f_touchData,t_pointer2)[t_pointer2]).f_touchVelocitySpeed,t_pointer2);
			}
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<456>";
		t_screen.m_OnTouchReleased(t_x2,t_y2,t_pointer2);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<459>";
	for(var t_i3=0;t_i3<this.f_touchDownCount;t_i3=t_i3+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<460>";
		var t_pointer3=dbg_array(this.f_currentTouchDown,t_i3)[t_i3];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<461>";
		var t_x3=((dbg_array(this.f_touchX,t_pointer3)[t_pointer3])|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<462>";
		var t_y3=((dbg_array(this.f_touchY,t_pointer3)[t_pointer3])|0);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<463>";
		dbg_array(this.f_touchData,t_pointer3)[t_pointer3].m_Update3(t_x3,t_y3);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<464>";
		t_screen.m_OnTouchDragged(t_x3,t_y3,dbg_object(dbg_array(this.f_touchData,t_pointer3)[t_pointer3]).f_distanceMovedX,dbg_object(dbg_array(this.f_touchData,t_pointer3)[t_pointer3]).f_distanceMovedY,t_pointer3);
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<466>";
		if(!dbg_object(dbg_array(this.f_touchData,t_pointer3)[t_pointer3]).f_testedLongPress && dbg_object(bb_framework_dt).f_currentticks-(dbg_object(dbg_array(this.f_touchData,t_pointer3)[t_pointer3]).f_firstTouchTime)>=(this.f_longPressTime)){
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<467>";
			dbg_object(dbg_array(this.f_touchData,t_pointer3)[t_pointer3]).f_testedLongPress=true;
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<468>";
			if(!dbg_object(dbg_array(this.f_touchData,t_pointer3)[t_pointer3]).f_movedTooFar){
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<470>";
				t_screen.m_OnTouchLongPress(t_x3,t_y3,t_pointer3);
				err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<471>";
				dbg_object(dbg_array(this.f_touchData,t_pointer3)[t_pointer3]).f_firedLongPress=true;
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<477>";
	if(this.f_keyHitCount>0){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<477>";
		t_screen.m_OnAnyKeyHit();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<478>";
	for(var t_i4=0;t_i4<this.f_keyHitCount;t_i4=t_i4+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<479>";
		var t_key=dbg_array(this.f_currentKeysHit,t_i4)[t_i4];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<480>";
		t_screen.m_OnKeyHit(t_key);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<484>";
	if(this.f_keyDownCount>0){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<484>";
		t_screen.m_OnAnyKeyDown();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<485>";
	for(var t_i5=0;t_i5<this.f_keyDownCount;t_i5=t_i5+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<486>";
		var t_key2=dbg_array(this.f_currentKeysDown,t_i5)[t_i5];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<487>";
		t_screen.m_OnKeyDown(t_key2);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<491>";
	if(this.f_keyReleasedCount>0){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<491>";
		t_screen.m_OnAnyKeyReleased();
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<492>";
	for(var t_i6=0;t_i6<this.f_keyReleasedCount;t_i6=t_i6+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<493>";
		var t_key3=dbg_array(this.f_currentKeysReleased,t_i6)[t_i6];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<494>";
		t_screen.m_OnKeyReleased(t_key3);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<497>";
	for(var t_i7=0;t_i7<this.f_mouseHitCount;t_i7=t_i7+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<498>";
		var t_button=dbg_array(this.f_currentMouseHit,t_i7)[t_i7];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<499>";
		var t_x4=this.f_mouseX;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<500>";
		var t_y4=this.f_mouseY;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<501>";
		t_screen.m_OnMouseHit(t_x4,t_y4,t_button);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<504>";
	for(var t_i8=0;t_i8<this.f_mouseDownCount;t_i8=t_i8+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<505>";
		var t_button2=dbg_array(this.f_currentMouseDown,t_i8)[t_i8];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<506>";
		var t_x5=this.f_mouseX;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<507>";
		var t_y5=this.f_mouseY;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<508>";
		t_screen.m_OnMouseDown(t_x5,t_y5,t_button2);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<511>";
	for(var t_i9=0;t_i9<this.f_mouseReleasedCount;t_i9=t_i9+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<512>";
		var t_button3=dbg_array(this.f_currentMouseReleased,t_i9)[t_i9];
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<513>";
		var t_x6=this.f_mouseX;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<514>";
		var t_y6=this.f_mouseY;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<515>";
		t_screen.m_OnMouseReleased(t_x6,t_y6,t_button3);
	}
	pop_err();
}
function bb_inputcache_InputEventEnumerator(){
	Object.call(this);
	this.f_ic=null;
	this.f_eventType=0;
}
function bb_inputcache_InputEventEnumerator_new(t_ic,t_eventType){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<580>";
	dbg_object(this).f_ic=t_ic;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<581>";
	dbg_object(this).f_eventType=t_eventType;
	pop_err();
	return this;
}
function bb_inputcache_InputEventEnumerator_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<572>";
	pop_err();
	return this;
}
function bb_inputcache_KeyEventEnumerator(){
	bb_inputcache_InputEventEnumerator.call(this);
	this.f_event=null;
}
bb_inputcache_KeyEventEnumerator.prototype=extend_class(bb_inputcache_InputEventEnumerator);
function bb_inputcache_KeyEventEnumerator_new(t_ic,t_eventType){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<596>";
	bb_inputcache_InputEventEnumerator_new.call(this,t_ic,t_eventType);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<597>";
	dbg_object(this).f_event=bb_inputcache_KeyEvent_new2.call(new bb_inputcache_KeyEvent);
	pop_err();
	return this;
}
function bb_inputcache_KeyEventEnumerator_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<590>";
	bb_inputcache_InputEventEnumerator_new2.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<590>";
	pop_err();
	return this;
}
function bb_inputcache_InputEvent(){
	Object.call(this);
	this.f_eventType=0;
}
function bb_inputcache_InputEvent_new(t_eventType){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<547>";
	dbg_object(this).f_eventType=t_eventType;
	pop_err();
	return this;
}
function bb_inputcache_InputEvent_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<521>";
	pop_err();
	return this;
}
function bb_inputcache_KeyEvent(){
	bb_inputcache_InputEvent.call(this);
}
bb_inputcache_KeyEvent.prototype=extend_class(bb_inputcache_InputEvent);
function bb_inputcache_KeyEvent_new(t_eventType){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<566>";
	bb_inputcache_InputEvent_new.call(this,t_eventType);
	pop_err();
	return this;
}
function bb_inputcache_KeyEvent_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<552>";
	bb_inputcache_InputEvent_new2.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<552>";
	pop_err();
	return this;
}
function bb_inputcache_EnumWrapper(){
	Object.call(this);
	this.f_wrappedEnum=null;
}
function bb_inputcache_EnumWrapper_new(t_wrappedEnum){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<637>";
	dbg_object(this).f_wrappedEnum=t_wrappedEnum;
	pop_err();
	return this;
}
function bb_inputcache_EnumWrapper_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<631>";
	pop_err();
	return this;
}
function bb_inputcache_TouchData(){
	Object.call(this);
	this.f_firstTouchX=0;
	this.f_firstTouchY=0;
	this.f_lastTouchX=0;
	this.f_lastTouchY=0;
	this.f_firstTouchTime=0;
	this.f_testedLongPress=false;
	this.f_firedLongPress=false;
	this.f_flingSamplesX=new_number_array(10);
	this.f_flingSamplesY=new_number_array(10);
	this.f_flingSamplesTime=new_number_array(10);
	this.f_flingSampleCount=0;
	this.f_flingSampleNext=0;
	this.f_movedTooFar=false;
	this.f_touchVelocityX=.0;
	this.f_touchVelocityY=.0;
	this.f_touchVelocitySpeed=.0;
	this.f_distanceMovedX=0;
	this.f_distanceMovedY=0;
}
function bb_inputcache_TouchData_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<657>";
	pop_err();
	return this;
}
bb_inputcache_TouchData.prototype.m_AddFlingSample=function(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<704>";
	dbg_array(this.f_flingSamplesX,this.f_flingSampleNext)[this.f_flingSampleNext]=t_x
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<705>";
	dbg_array(this.f_flingSamplesY,this.f_flingSampleNext)[this.f_flingSampleNext]=t_y
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<706>";
	dbg_array(this.f_flingSamplesTime,this.f_flingSampleNext)[this.f_flingSampleNext]=((dbg_object(bb_framework_dt).f_currentticks)|0)
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<707>";
	if(this.f_flingSampleCount<10){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<707>";
		this.f_flingSampleCount+=1;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<708>";
	this.f_flingSampleNext+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<709>";
	if(this.f_flingSampleNext>=10){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<709>";
		this.f_flingSampleNext=0;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<712>";
	var t_first=this.f_flingSampleNext-this.f_flingSampleCount;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<713>";
	var t_last=this.f_flingSampleNext-1;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<714>";
	while(t_first<0){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<715>";
		t_first+=10;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<717>";
	while(t_last<0){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<718>";
		t_last+=10;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<722>";
	if(this.f_flingSampleCount>0){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<724>";
		var t_secs=(dbg_array(this.f_flingSamplesTime,t_last)[t_last]-dbg_array(this.f_flingSamplesTime,t_first)[t_first])/1000.0;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<725>";
		this.f_touchVelocityX=(dbg_array(this.f_flingSamplesX,t_last)[t_last]-dbg_array(this.f_flingSamplesX,t_first)[t_first])/t_secs;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<726>";
		this.f_touchVelocityY=(dbg_array(this.f_flingSamplesY,t_last)[t_last]-dbg_array(this.f_flingSamplesY,t_first)[t_first])/t_secs;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<727>";
		this.f_touchVelocitySpeed=Math.sqrt(this.f_touchVelocityX*this.f_touchVelocityX+this.f_touchVelocityY*this.f_touchVelocityY);
	}
	pop_err();
}
bb_inputcache_TouchData.prototype.m_Reset=function(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<682>";
	this.f_firstTouchX=t_x;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<683>";
	this.f_firstTouchY=t_y;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<684>";
	this.f_lastTouchX=t_x;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<685>";
	this.f_lastTouchY=t_y;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<686>";
	this.f_firstTouchTime=((dbg_object(bb_framework_dt).f_currentticks)|0);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<687>";
	this.f_testedLongPress=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<688>";
	this.f_firedLongPress=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<689>";
	for(var t_i=0;t_i<10;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<690>";
		dbg_array(this.f_flingSamplesX,t_i)[t_i]=0
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<691>";
		dbg_array(this.f_flingSamplesY,t_i)[t_i]=0
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<692>";
		dbg_array(this.f_flingSamplesTime,t_i)[t_i]=0
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<694>";
	this.f_flingSampleCount=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<695>";
	this.f_flingSampleNext=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<696>";
	this.f_movedTooFar=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<697>";
	this.f_touchVelocityX=0.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<698>";
	this.f_touchVelocityY=0.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<699>";
	this.f_touchVelocitySpeed=0.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<700>";
	this.m_AddFlingSample(t_x,t_y);
	pop_err();
}
bb_inputcache_TouchData.prototype.m_Update3=function(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<733>";
	this.f_distanceMovedX=t_x-this.f_lastTouchX;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<734>";
	this.f_distanceMovedY=t_y-this.f_lastTouchY;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<735>";
	this.f_lastTouchX=t_x;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<736>";
	this.f_lastTouchY=t_y;
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<738>";
	this.m_AddFlingSample(t_x,t_y);
	err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<740>";
	if(!this.f_movedTooFar){
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<742>";
		var t_dx=t_x-this.f_firstTouchX;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<743>";
		var t_dy=t_y-this.f_firstTouchY;
		err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<744>";
		if((t_dx*t_dx+t_dy*t_dy)>400.0){
			err_info="D:/Code/MonkeyPro/modules/diddy/inputcache.monkey<745>";
			this.f_movedTooFar=true;
		}
	}
	pop_err();
}
function bbMain(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/main.monkey<82>";
	bb_framework_game=(bb_main_MyGame_new.call(new bb_main_MyGame));
	err_info="D:/Dropbox/monkeytouch/main.monkey<83>";
	dbg_object(bb_framework_game).f_debugKeyOn=true;
	err_info="D:/Dropbox/monkeytouch/main.monkey<84>";
	dbg_object(bb_framework_game).f_drawFPSOn=true;
	err_info="D:/Dropbox/monkeytouch/main.monkey<85>";
	dbg_object(bb_framework_game).f_FPS=60;
	err_info="D:/Dropbox/monkeytouch/main.monkey<86>";
	pop_err();
	return 1;
}
function bb_graphics_Image(){
	Object.call(this);
	this.f_surface=null;
	this.f_width=0;
	this.f_height=0;
	this.f_frames=[];
	this.f_flags=0;
	this.f_tx=.0;
	this.f_ty=.0;
	this.f_source=null;
}
var bb_graphics_Image_DefaultFlags;
function bb_graphics_Image_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<64>";
	pop_err();
	return this;
}
bb_graphics_Image.prototype.m_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<110>";
	dbg_object(this).f_tx=t_tx;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<111>";
	dbg_object(this).f_ty=t_ty;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<112>";
	dbg_object(this).f_flags=dbg_object(this).f_flags&-2;
	pop_err();
	return 0;
}
bb_graphics_Image.prototype.m_ApplyFlags=function(t_iflags){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<180>";
	this.f_flags=t_iflags;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<182>";
	if((this.f_flags&2)!=0){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<183>";
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<183>";
		var t_=this.f_frames;
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<183>";
		var t_2=0;
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<183>";
		while(t_2<t_.length){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<183>";
			var t_f=dbg_array(t_,t_2)[t_2];
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<183>";
			t_2=t_2+1;
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<184>";
			dbg_object(t_f).f_x+=1;
		}
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<186>";
		this.f_width-=2;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<189>";
	if((this.f_flags&4)!=0){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<190>";
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<190>";
		var t_3=this.f_frames;
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<190>";
		var t_4=0;
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<190>";
		while(t_4<t_3.length){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<190>";
			var t_f2=dbg_array(t_3,t_4)[t_4];
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<190>";
			t_4=t_4+1;
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<191>";
			dbg_object(t_f2).f_y+=1;
		}
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<193>";
		this.f_height-=2;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<196>";
	if((this.f_flags&1)!=0){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<197>";
		this.m_SetHandle((this.f_width)/2.0,(this.f_height)/2.0);
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<200>";
	if(this.f_frames.length==1 && dbg_object(dbg_array(this.f_frames,0)[0]).f_x==0 && dbg_object(dbg_array(this.f_frames,0)[0]).f_y==0 && this.f_width==this.f_surface.Width() && this.f_height==this.f_surface.Height()){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<201>";
		this.f_flags|=65536;
	}
	pop_err();
	return 0;
}
bb_graphics_Image.prototype.m_Load3=function(t_path,t_nframes,t_iflags){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<133>";
	this.f_surface=dbg_object(bb_graphics_context).f_device.LoadSurface(t_path);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<134>";
	if(!((this.f_surface)!=null)){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<134>";
		pop_err();
		return null;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<136>";
	this.f_width=((this.f_surface.Width()/t_nframes)|0);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<137>";
	this.f_height=this.f_surface.Height();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<139>";
	this.f_frames=new_object_array(t_nframes);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<141>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<142>";
		dbg_array(this.f_frames,t_i)[t_i]=bb_graphics_Frame_new.call(new bb_graphics_Frame,t_i*this.f_width,0)
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<145>";
	this.m_ApplyFlags(t_iflags);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<147>";
	pop_err();
	return this;
}
bb_graphics_Image.prototype.m_Grab=function(t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_source){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<152>";
	dbg_object(this).f_source=t_source;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<153>";
	this.f_surface=dbg_object(t_source).f_surface;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<155>";
	this.f_width=t_iwidth;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<156>";
	this.f_height=t_iheight;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<158>";
	this.f_frames=new_object_array(t_nframes);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<160>";
	var t_ix=t_x;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<160>";
	var t_iy=t_y;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<162>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<163>";
		if(t_ix+this.f_width>dbg_object(t_source).f_width){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<164>";
			t_ix=0;
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<165>";
			t_iy+=this.f_height;
		}
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<167>";
		if(t_ix+this.f_width>dbg_object(t_source).f_width || t_iy+this.f_height>dbg_object(t_source).f_height){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<168>";
			error("Image frame outside surface");
		}
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<170>";
		dbg_array(this.f_frames,t_i)[t_i]=bb_graphics_Frame_new.call(new bb_graphics_Frame,t_ix+dbg_object(dbg_array(dbg_object(t_source).f_frames,0)[0]).f_x,t_iy+dbg_object(dbg_array(dbg_object(t_source).f_frames,0)[0]).f_y)
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<171>";
		t_ix+=this.f_width;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<174>";
	this.m_ApplyFlags(t_iflags);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<176>";
	pop_err();
	return this;
}
bb_graphics_Image.prototype.m_GrabImage=function(t_x,t_y,t_width,t_height,t_frames,t_flags){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<105>";
	if(dbg_object(this).f_frames.length!=1){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<105>";
		pop_err();
		return null;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<106>";
	var t_=(bb_graphics_Image_new.call(new bb_graphics_Image)).m_Grab(t_x,t_y,t_width,t_height,t_frames,t_flags,this);
	pop_err();
	return t_;
}
bb_graphics_Image.prototype.m_Width=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<77>";
	pop_err();
	return this.f_width;
}
bb_graphics_Image.prototype.m_Height=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<81>";
	pop_err();
	return this.f_height;
}
bb_graphics_Image.prototype.m_Frames=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<89>";
	var t_=this.f_frames.length;
	pop_err();
	return t_;
}
bb_graphics_Image.prototype.m_Discard=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<116>";
	if(((this.f_surface)!=null) && !((this.f_source)!=null)){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<117>";
		this.f_surface.Discard();
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<118>";
		this.f_surface=null;
	}
	pop_err();
	return 0;
}
function bb_graphics_Frame(){
	Object.call(this);
	this.f_x=0;
	this.f_y=0;
}
function bb_graphics_Frame_new(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<56>";
	dbg_object(this).f_x=t_x;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<57>";
	dbg_object(this).f_y=t_y;
	pop_err();
	return this;
}
function bb_graphics_Frame_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<51>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<277>";
	var t_=(bb_graphics_Image_new.call(new bb_graphics_Image)).m_Load3(t_path,t_frameCount,t_flags);
	pop_err();
	return t_;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<281>";
	var t_atlas=(bb_graphics_Image_new.call(new bb_graphics_Image)).m_Load3(t_path,1,0);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<282>";
	if((t_atlas)!=null){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<282>";
		var t_=t_atlas.m_GrabImage(0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<552>";
	if(!((t_font)!=null)){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<553>";
		if(!((dbg_object(bb_graphics_context).f_defaultFont)!=null)){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<554>";
			dbg_object(bb_graphics_context).f_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<556>";
		t_font=dbg_object(bb_graphics_context).f_defaultFont;
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<557>";
		t_firstChar=32;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<559>";
	dbg_object(bb_graphics_context).f_font=t_font;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<560>";
	dbg_object(bb_graphics_context).f_firstChar=t_firstChar;
	pop_err();
	return 0;
}
var bb_graphics_renderDevice;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<331>";
	dbg_object(bb_graphics_context).f_ix=t_ix;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<332>";
	dbg_object(bb_graphics_context).f_iy=t_iy;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<333>";
	dbg_object(bb_graphics_context).f_jx=t_jx;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<334>";
	dbg_object(bb_graphics_context).f_jy=t_jy;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<335>";
	dbg_object(bb_graphics_context).f_tx=t_tx;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<336>";
	dbg_object(bb_graphics_context).f_ty=t_ty;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<337>";
	dbg_object(bb_graphics_context).f_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<338>";
	dbg_object(bb_graphics_context).f_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<327>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[0],dbg_array(t_m,1)[1],dbg_array(t_m,2)[2],dbg_array(t_m,3)[3],dbg_array(t_m,4)[4],dbg_array(t_m,5)[5]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<286>";
	dbg_object(bb_graphics_context).f_color_r=t_r;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<287>";
	dbg_object(bb_graphics_context).f_color_g=t_g;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<288>";
	dbg_object(bb_graphics_context).f_color_b=t_b;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<289>";
	dbg_object(bb_graphics_context).f_device.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<297>";
	dbg_object(bb_graphics_context).f_alpha=t_alpha;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<298>";
	dbg_object(bb_graphics_context).f_device.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<306>";
	dbg_object(bb_graphics_context).f_blend=t_blend;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<307>";
	dbg_object(bb_graphics_context).f_device.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_DeviceWidth(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<269>";
	var t_=dbg_object(bb_graphics_context).f_device.Width();
	pop_err();
	return t_;
}
function bb_graphics_DeviceHeight(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<273>";
	var t_=dbg_object(bb_graphics_context).f_device.Height();
	pop_err();
	return t_;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<315>";
	dbg_object(bb_graphics_context).f_scissor_x=t_x;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<316>";
	dbg_object(bb_graphics_context).f_scissor_y=t_y;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<317>";
	dbg_object(bb_graphics_context).f_scissor_width=t_width;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<318>";
	dbg_object(bb_graphics_context).f_scissor_height=t_height;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<319>";
	dbg_object(bb_graphics_context).f_device.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<254>";
	if(!((dbg_object(bb_graphics_context).f_device.Mode())!=0)){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<254>";
		pop_err();
		return 0;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<255>";
	bb_graphics_renderDevice=dbg_object(bb_graphics_context).f_device;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<256>";
	dbg_object(bb_graphics_context).f_matrixSp=0;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<257>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<258>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<259>";
	bb_graphics_SetAlpha(1.0);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<260>";
	bb_graphics_SetBlend(0);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<261>";
	bb_graphics_SetScissor(0.0,0.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<265>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
var bb_framework_DEVICE_WIDTH;
var bb_framework_DEVICE_HEIGHT;
var bb_framework_SCREEN_WIDTH;
var bb_framework_SCREEN_HEIGHT;
var bb_framework_SCREEN_WIDTH2;
var bb_framework_SCREEN_HEIGHT2;
var bb_framework_SCREENX_RATIO;
var bb_framework_SCREENY_RATIO;
function bb_input_MouseX(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<92>";
	var t_=bb_input_device.MouseX();
	pop_err();
	return t_;
}
function bb_input_MouseY(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<96>";
	var t_=bb_input_device.MouseY();
	pop_err();
	return t_;
}
var bb_random_Seed;
function bb_framework_DeltaTimer(){
	Object.call(this);
	this.f_targetfps=60.0;
	this.f_lastticks=.0;
	this.f_delta=.0;
	this.f_frametime=.0;
	this.f_currentticks=.0;
}
function bb_framework_DeltaTimer_new(t_fps){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<729>";
	this.f_targetfps=t_fps;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<730>";
	this.f_lastticks=(bb_app_Millisecs());
	pop_err();
	return this;
}
function bb_framework_DeltaTimer_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<721>";
	pop_err();
	return this;
}
bb_framework_DeltaTimer.prototype.m_UpdateDelta=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<734>";
	this.f_currentticks=(bb_app_Millisecs());
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<735>";
	this.f_frametime=this.f_currentticks-this.f_lastticks;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<736>";
	this.f_delta=this.f_frametime/(1000.0/this.f_targetfps);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<737>";
	this.f_lastticks=this.f_currentticks;
	pop_err();
}
function bb_app_Millisecs(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<149>";
	var t_=bb_app_device.MilliSecs();
	pop_err();
	return t_;
}
var bb_framework_dt;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<141>";
	var t_=bb_app_device.SetUpdateRate(t_hertz);
	pop_err();
	return t_;
}
function bb_framework_Sprite(){
	Object.call(this);
	this.f_image=null;
	this.f_x=.0;
	this.f_y=.0;
	this.f_alpha=1.0;
	this.f_hitBoxX=0;
	this.f_hitBoxY=0;
	this.f_hitBoxWidth=0;
	this.f_hitBoxHeight=0;
	this.f_visible=false;
}
bb_framework_Sprite.prototype.m_SetHitBox=function(t_hitX,t_hitY,t_hitWidth,t_hitHeight){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1566>";
	this.f_hitBoxX=t_hitX;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1567>";
	this.f_hitBoxY=t_hitY;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1568>";
	this.f_hitBoxWidth=t_hitWidth;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1569>";
	this.f_hitBoxHeight=t_hitHeight;
	pop_err();
}
function bb_framework_Sprite_new(t_img,t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1388>";
	dbg_object(this).f_image=t_img;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1389>";
	dbg_object(this).f_x=t_x;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1390>";
	dbg_object(this).f_y=t_y;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1391>";
	dbg_object(this).f_alpha=1.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1392>";
	this.m_SetHitBox(((-dbg_object(t_img).f_w2)|0),((-dbg_object(t_img).f_h2)|0),dbg_object(t_img).f_w,dbg_object(t_img).f_h);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1393>";
	dbg_object(this).f_visible=true;
	pop_err();
	return this;
}
function bb_framework_Sprite_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1345>";
	pop_err();
	return this;
}
function bb_framework_Particle(){
	bb_framework_Sprite.call(this);
}
bb_framework_Particle.prototype=extend_class(bb_framework_Sprite);
var bb_framework_Particle_MAX_PARTICLES;
function bb_framework_Particle_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1574>";
	bb_framework_Sprite_new2.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1574>";
	pop_err();
	return this;
}
var bb_framework_Particle_particles;
function bb_framework_Particle_Cache(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1589>";
	for(var t_i=0;t_i<=bb_framework_Particle_MAX_PARTICLES-1;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<1590>";
		dbg_array(bb_framework_Particle_particles,t_i)[t_i]=bb_framework_Particle_new.call(new bb_framework_Particle)
	}
	pop_err();
}
function bb_framework_FPSCounter(){
	Object.call(this);
}
var bb_framework_FPSCounter_startTime;
var bb_framework_FPSCounter_fpsCount;
var bb_framework_FPSCounter_totalFPS;
function bb_framework_FPSCounter_Update(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<706>";
	if(bb_app_Millisecs()-bb_framework_FPSCounter_startTime>=1000){
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<707>";
		bb_framework_FPSCounter_totalFPS=bb_framework_FPSCounter_fpsCount;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<708>";
		bb_framework_FPSCounter_fpsCount=0;
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<709>";
		bb_framework_FPSCounter_startTime=bb_app_Millisecs();
	}else{
		err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<711>";
		bb_framework_FPSCounter_fpsCount+=1;
	}
	pop_err();
}
function bb_framework_FPSCounter_Draw(t_x,t_y,t_ax,t_ay){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/framework.monkey<716>";
	bb_graphics_DrawText("FPS: "+String(bb_framework_FPSCounter_totalFPS),(t_x),(t_y),t_ax,t_ay);
	pop_err();
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<346>";
	var t_sp=dbg_object(bb_graphics_context).f_matrixSp;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<347>";
	var t_=t_sp+0;
	dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_)[t_]=dbg_object(bb_graphics_context).f_ix
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<348>";
	var t_2=t_sp+1;
	dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_2)[t_2]=dbg_object(bb_graphics_context).f_iy
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<349>";
	var t_3=t_sp+2;
	dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_3)[t_3]=dbg_object(bb_graphics_context).f_jx
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<350>";
	var t_4=t_sp+3;
	dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_4)[t_4]=dbg_object(bb_graphics_context).f_jy
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<351>";
	var t_5=t_sp+4;
	dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_5)[t_5]=dbg_object(bb_graphics_context).f_tx
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<352>";
	var t_6=t_sp+5;
	dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_6)[t_6]=dbg_object(bb_graphics_context).f_ty
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<353>";
	dbg_object(bb_graphics_context).f_matrixSp=t_sp+6;
	pop_err();
	return 0;
}
function bb_math_Max(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<56>";
	if(t_x>t_y){
		err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<56>";
		pop_err();
		return t_x;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<57>";
	pop_err();
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<83>";
	if(t_x>t_y){
		err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<83>";
		pop_err();
		return t_x;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<84>";
	pop_err();
	return t_y;
}
function bb_math_Min(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<51>";
	if(t_x<t_y){
		err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<51>";
		pop_err();
		return t_x;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<52>";
	pop_err();
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<78>";
	if(t_x<t_y){
		err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<78>";
		pop_err();
		return t_x;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<79>";
	pop_err();
	return t_y;
}
function bb_graphics_DebugRenderDevice(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<240>";
	if(!((bb_graphics_renderDevice)!=null)){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<240>";
		error("Rendering operations can only be performed inside OnRender");
	}
	pop_err();
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<390>";
	bb_graphics_DebugRenderDevice();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<392>";
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<367>";
	var t_ix2=t_ix*dbg_object(bb_graphics_context).f_ix+t_iy*dbg_object(bb_graphics_context).f_jx;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<368>";
	var t_iy2=t_ix*dbg_object(bb_graphics_context).f_iy+t_iy*dbg_object(bb_graphics_context).f_jy;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<369>";
	var t_jx2=t_jx*dbg_object(bb_graphics_context).f_ix+t_jy*dbg_object(bb_graphics_context).f_jx;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<370>";
	var t_jy2=t_jx*dbg_object(bb_graphics_context).f_iy+t_jy*dbg_object(bb_graphics_context).f_jy;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<371>";
	var t_tx2=t_tx*dbg_object(bb_graphics_context).f_ix+t_ty*dbg_object(bb_graphics_context).f_jx+dbg_object(bb_graphics_context).f_tx;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<372>";
	var t_ty2=t_tx*dbg_object(bb_graphics_context).f_iy+t_ty*dbg_object(bb_graphics_context).f_jy+dbg_object(bb_graphics_context).f_ty;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<373>";
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
	return 0;
}
function bb_graphics_Transform2(t_m){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<363>";
	bb_graphics_Transform(dbg_array(t_m,0)[0],dbg_array(t_m,1)[1],dbg_array(t_m,2)[2],dbg_array(t_m,3)[3],dbg_array(t_m,4)[4],dbg_array(t_m,5)[5]);
	pop_err();
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<381>";
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<377>";
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<357>";
	var t_sp=dbg_object(bb_graphics_context).f_matrixSp-6;
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<358>";
	var t_=t_sp+0;
	var t_2=t_sp+1;
	var t_3=t_sp+2;
	var t_4=t_sp+3;
	var t_5=t_sp+4;
	var t_6=t_sp+5;
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_)[t_],dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_2)[t_2],dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_3)[t_3],dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_4)[t_4],dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_5)[t_5],dbg_array(dbg_object(bb_graphics_context).f_matrixStack,t_6)[t_6]);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<359>";
	dbg_object(bb_graphics_context).f_matrixSp=t_sp;
	pop_err();
	return 0;
}
function bb_graphics_ValidateMatrix(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<233>";
	if((dbg_object(bb_graphics_context).f_matDirty)!=0){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<234>";
		dbg_object(bb_graphics_context).f_device.SetMatrix(dbg_object(bb_graphics_context).f_ix,dbg_object(bb_graphics_context).f_iy,dbg_object(bb_graphics_context).f_jx,dbg_object(bb_graphics_context).f_jy,dbg_object(bb_graphics_context).f_tx,dbg_object(bb_graphics_context).f_ty);
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<235>";
		dbg_object(bb_graphics_context).f_matDirty=0;
	}
	pop_err();
	return 0;
}
function bb_graphics_DrawRect(t_x,t_y,t_w,t_h){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<405>";
	bb_graphics_DebugRenderDevice();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<407>";
	bb_graphics_ValidateMatrix();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<408>";
	bb_graphics_renderDevice.DrawRect(t_x,t_y,t_w,t_h);
	pop_err();
	return 0;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<453>";
	bb_graphics_DebugRenderDevice();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<455>";
	var t_f=dbg_array(dbg_object(t_image).f_frames,t_frame)[t_frame];
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<457>";
	if((dbg_object(bb_graphics_context).f_tformed)!=0){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<458>";
		bb_graphics_PushMatrix();
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<460>";
		bb_graphics_Translate(t_x-dbg_object(t_image).f_tx,t_y-dbg_object(t_image).f_ty);
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<462>";
		bb_graphics_ValidateMatrix();
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<464>";
		if((dbg_object(t_image).f_flags&65536)!=0){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<465>";
			dbg_object(bb_graphics_context).f_device.DrawSurface(dbg_object(t_image).f_surface,0.0,0.0);
		}else{
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<467>";
			dbg_object(bb_graphics_context).f_device.DrawSurface2(dbg_object(t_image).f_surface,0.0,0.0,dbg_object(t_f).f_x,dbg_object(t_f).f_y,dbg_object(t_image).f_width,dbg_object(t_image).f_height);
		}
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<470>";
		bb_graphics_PopMatrix();
	}else{
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<472>";
		bb_graphics_ValidateMatrix();
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<474>";
		if((dbg_object(t_image).f_flags&65536)!=0){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<475>";
			dbg_object(bb_graphics_context).f_device.DrawSurface(dbg_object(t_image).f_surface,t_x-dbg_object(t_image).f_tx,t_y-dbg_object(t_image).f_ty);
		}else{
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<477>";
			dbg_object(bb_graphics_context).f_device.DrawSurface2(dbg_object(t_image).f_surface,t_x-dbg_object(t_image).f_tx,t_y-dbg_object(t_image).f_ty,dbg_object(t_f).f_x,dbg_object(t_f).f_y,dbg_object(t_image).f_width,dbg_object(t_image).f_height);
		}
	}
	pop_err();
	return 0;
}
function bb_graphics_Rotate(t_angle){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<385>";
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<484>";
	bb_graphics_DebugRenderDevice();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<486>";
	var t_f=dbg_array(dbg_object(t_image).f_frames,t_frame)[t_frame];
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<488>";
	bb_graphics_PushMatrix();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<490>";
	bb_graphics_Translate(t_x,t_y);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<491>";
	bb_graphics_Rotate(t_rotation);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<492>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<494>";
	bb_graphics_Translate(-dbg_object(t_image).f_tx,-dbg_object(t_image).f_ty);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<496>";
	bb_graphics_ValidateMatrix();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<498>";
	if((dbg_object(t_image).f_flags&65536)!=0){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<499>";
		dbg_object(bb_graphics_context).f_device.DrawSurface(dbg_object(t_image).f_surface,0.0,0.0);
	}else{
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<501>";
		dbg_object(bb_graphics_context).f_device.DrawSurface2(dbg_object(t_image).f_surface,0.0,0.0,dbg_object(t_f).f_x,dbg_object(t_f).f_y,dbg_object(t_image).f_width,dbg_object(t_image).f_height);
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<504>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<577>";
	bb_graphics_DebugRenderDevice();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<579>";
	if(!((dbg_object(bb_graphics_context).f_font)!=null)){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<579>";
		pop_err();
		return 0;
	}
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<581>";
	var t_w=dbg_object(bb_graphics_context).f_font.m_Width();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<582>";
	var t_h=dbg_object(bb_graphics_context).f_font.m_Height();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<584>";
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<585>";
	t_y-=Math.floor((t_h)*t_yalign);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<587>";
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<588>";
		var t_ch=t_text.charCodeAt(t_i)-dbg_object(bb_graphics_context).f_firstChar;
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<589>";
		if(t_ch>=0 && t_ch<dbg_object(bb_graphics_context).f_font.m_Frames()){
			err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<590>";
			bb_graphics_DrawImage(dbg_object(bb_graphics_context).f_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	pop_err();
	return 0;
}
function bb_assert_AssertError(t_msg){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<129>";
	print(t_msg);
	err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<130>";
	error(t_msg);
	pop_err();
}
function bb_assert_Assert(t_val,t_msg){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<12>";
	if(!t_val){
		err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<12>";
		bb_assert_AssertError(t_msg);
	}
	pop_err();
}
function bb_functions_RSet(t_str,t_n,t_char){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<222>";
	var t_rep="";
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<223>";
	for(var t_i=1;t_i<=t_n;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<224>";
		t_rep=t_rep+t_char;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<226>";
	t_str=t_rep+t_str;
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<227>";
	var t_=t_str.slice(t_str.length-t_n);
	pop_err();
	return t_;
}
function bb_functions_FormatNumber(t_number,t_decimal,t_comma,t_padleft){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<273>";
	bb_assert_Assert(t_decimal>-1 && t_comma>-1 && t_padleft>-1,"Negative numbers not allowed in FormatNumber()");
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<275>";
	var t_str=String(t_number);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<276>";
	var t_dl=t_str.indexOf(".",0);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<277>";
	if(t_decimal==0){
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<277>";
		t_decimal=-1;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<278>";
	t_str=t_str.slice(0,t_dl+t_decimal+1);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<280>";
	if((t_comma)!=0){
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<281>";
		while(t_dl>t_comma){
			err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<282>";
			t_str=t_str.slice(0,t_dl-t_comma)+","+t_str.slice(t_dl-t_comma);
			err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<283>";
			t_dl-=t_comma;
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<287>";
	if((t_padleft)!=0){
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<288>";
		var t_paddedLength=t_padleft+t_decimal+1;
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<289>";
		if(t_paddedLength<t_str.length){
			err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<289>";
			t_str="Error";
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<290>";
		t_str=bb_functions_RSet(t_str,t_paddedLength," ");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<292>";
	pop_err();
	return t_str;
}
function bb_audio_MusicState(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/audio.monkey<117>";
	var t_=bb_audio_device.MusicState();
	pop_err();
	return t_;
}
function bb_framework_SoundPlayer(){
	Object.call(this);
}
var bb_framework_SoundPlayer_channel;
function bb_input_MouseHit(t_button){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<104>";
	var t_=bb_input_device.KeyHit(1+t_button);
	pop_err();
	return t_;
}
function bb_input_TouchHit(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<121>";
	var t_=bb_input_device.KeyHit(384+t_index);
	pop_err();
	return t_;
}
function bb_input_TouchDown(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<117>";
	var t_=bb_input_device.KeyDown(384+t_index);
	pop_err();
	return t_;
}
function bb_input_TouchX(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<109>";
	var t_=bb_input_device.TouchX(t_index);
	pop_err();
	return t_;
}
function bb_input_TouchY(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<113>";
	var t_=bb_input_device.TouchY(t_index);
	pop_err();
	return t_;
}
function bb_input_MouseDown(t_button){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<100>";
	var t_=bb_input_device.KeyDown(1+t_button);
	pop_err();
	return t_;
}
function bb_input_KeyHit(t_key){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<77>";
	var t_=bb_input_device.KeyHit(t_key);
	pop_err();
	return t_;
}
function bb_input_KeyDown(t_key){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/input.monkey<73>";
	var t_=bb_input_device.KeyDown(t_key);
	pop_err();
	return t_;
}
function bb_audio_SetMusicVolume(t_volume){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/audio.monkey<121>";
	bb_audio_device.SetMusicVolume(t_volume);
	pop_err();
	return 0;
}
function bb_audio_SetChannelVolume(t_channel,t_volume){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/audio.monkey<89>";
	bb_audio_device.SetVolume(t_channel,t_volume);
	pop_err();
	return 0;
}
function bb_functions_SetGraphics(t_w,t_h){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<117>";
	diddy.setGraphics(t_w,t_h);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<118>";
	bb_framework_DEVICE_WIDTH=(t_w);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<119>";
	bb_framework_DEVICE_HEIGHT=(t_h);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<120>";
	bb_framework_SCREEN_HEIGHT=(t_h);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<121>";
	bb_framework_SCREEN_WIDTH=(t_w);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<122>";
	bb_framework_SCREEN_WIDTH2=bb_framework_SCREEN_WIDTH/2.0;
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<123>";
	bb_framework_SCREEN_HEIGHT2=bb_framework_SCREEN_HEIGHT/2.0;
	pop_err();
}
function bb_app_LoadString(t_path){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/app.monkey<137>";
	var t_=bb_app_device.LoadString(t_path);
	pop_err();
	return t_;
}
function bb_assert_AssertNotEqualInt(t_val,t_expected,t_msg){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<48>";
	if(t_val==t_expected){
		err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<48>";
		bb_assert_AssertError(t_msg+" "+String(t_val)+"="+String(t_expected));
	}
	pop_err();
}
function bb_xml_XMLParser(){
	Object.call(this);
	this.f_str="";
	this.f_tagsLength=0;
	this.f_quotesLength=0;
	this.f_pisLength=0;
	this.f_tags=[];
	this.f_tagType=[];
	this.f_quotes=[];
	this.f_pis=[];
	this.f_tagCount=0;
	this.f_quoteCount=0;
	this.f_piCount=0;
}
function bb_xml_XMLParser_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<14>";
	pop_err();
	return this;
}
bb_xml_XMLParser.prototype.m_CacheControlCharacters=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<33>";
	this.f_tagsLength=128;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<34>";
	this.f_quotesLength=128;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<35>";
	this.f_pisLength=128;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<36>";
	this.f_tags=new_number_array(this.f_tagsLength);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<37>";
	this.f_tagType=new_number_array(this.f_tagsLength);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<38>";
	this.f_quotes=new_number_array(this.f_quotesLength);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<39>";
	this.f_pis=new_number_array(this.f_quotesLength);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<40>";
	this.f_tagCount=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<41>";
	this.f_quoteCount=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<42>";
	this.f_piCount=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<43>";
	var t_inTag=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<44>";
	var t_inQuote=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<45>";
	var t_inComment=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<46>";
	var t_inCdata=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<47>";
	var t_inDoctype=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<48>";
	var t_inPi=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<49>";
	var t_strlen=this.f_str.length;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<50>";
	for(var t_i=0;t_i<t_strlen;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<52>";
		if(t_inComment){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<53>";
			if(this.f_str.charCodeAt(t_i)==62 && this.f_str.charCodeAt(t_i-1)==45 && this.f_str.charCodeAt(t_i-2)==45){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<54>";
				if(this.f_tagCount==this.f_tagsLength){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<55>";
					this.f_tagsLength*=2;
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<56>";
					this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<57>";
					this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<59>";
				dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<60>";
				dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=1
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<61>";
				this.f_tagCount+=1;
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<62>";
				t_inComment=false;
			}
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<65>";
			if(t_inCdata){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<66>";
				if(this.f_str.charCodeAt(t_i)==62 && this.f_str.charCodeAt(t_i-1)==93 && this.f_str.charCodeAt(t_i-2)==93){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<67>";
					if(this.f_tagCount==this.f_tagsLength){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<68>";
						this.f_tagsLength*=2;
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<69>";
						this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<70>";
						this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
					}
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<72>";
					dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<73>";
					dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=2
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<74>";
					this.f_tagCount+=1;
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<75>";
					t_inCdata=false;
				}
			}else{
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<78>";
				if(t_inQuote){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<79>";
					if(this.f_str.charCodeAt(t_i)==34){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<80>";
						if(this.f_quoteCount==this.f_quotesLength){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<81>";
							this.f_quotesLength*=2;
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<82>";
							this.f_quotes=resize_number_array(this.f_quotes,this.f_quotesLength);
						}
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<84>";
						dbg_array(this.f_quotes,this.f_quoteCount)[this.f_quoteCount]=t_i
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<85>";
						this.f_quoteCount+=1;
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<86>";
						t_inQuote=false;
					}
				}else{
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<89>";
					if(this.f_str.charCodeAt(t_i)==34){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<90>";
						if(this.f_quoteCount==this.f_quotesLength){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<91>";
							this.f_quotesLength*=2;
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<92>";
							this.f_quotes=resize_number_array(this.f_quotes,this.f_quotesLength);
						}
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<94>";
						dbg_array(this.f_quotes,this.f_quoteCount)[this.f_quoteCount]=t_i
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<95>";
						this.f_quoteCount+=1;
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<96>";
						t_inQuote=true;
					}else{
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<98>";
						if(t_inPi){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<99>";
							if(this.f_str.charCodeAt(t_i)==62 && this.f_str.charCodeAt(t_i-1)==63){
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<100>";
								if(this.f_piCount==this.f_pisLength){
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<101>";
									this.f_pisLength*=2;
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<102>";
									this.f_pis=resize_number_array(this.f_pis,this.f_pisLength);
								}
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<104>";
								dbg_array(this.f_pis,this.f_piCount)[this.f_piCount]=t_i
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<105>";
								this.f_piCount+=1;
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<106>";
								t_inPi=false;
							}
						}else{
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<109>";
							if(t_inDoctype){
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<110>";
								if(this.f_str.charCodeAt(t_i)==62){
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<111>";
									if(this.f_tagCount==this.f_tagsLength){
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<112>";
										this.f_tagsLength*=2;
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<113>";
										this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<114>";
										this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
									}
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<116>";
									dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<117>";
									dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=3
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<118>";
									this.f_tagCount+=1;
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<119>";
									t_inDoctype=false;
								}
							}else{
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<122>";
								if(this.f_str.charCodeAt(t_i)==60){
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<124>";
									if(t_inTag){
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<124>";
										bb_assert_AssertError("Invalid less than!");
									}
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<126>";
									if(this.f_str.charCodeAt(t_i+1)==33){
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<128>";
										if(this.f_str.charCodeAt(t_i+2)==45 && this.f_str.charCodeAt(t_i+3)==45){
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<129>";
											if(this.f_tagCount==this.f_tagsLength){
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<130>";
												this.f_tagsLength*=2;
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<131>";
												this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<132>";
												this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
											}
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<134>";
											dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<135>";
											dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=1
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<136>";
											this.f_tagCount+=1;
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<137>";
											t_inComment=true;
										}else{
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<145>";
											if(this.f_str.charCodeAt(t_i+2)==91 && (this.f_str.charCodeAt(t_i+3)==67 || this.f_str.charCodeAt(t_i+3)==99) && (this.f_str.charCodeAt(t_i+4)==68 || this.f_str.charCodeAt(t_i+4)==100) && (this.f_str.charCodeAt(t_i+5)==65 || this.f_str.charCodeAt(t_i+5)==97) && (this.f_str.charCodeAt(t_i+6)==84 || this.f_str.charCodeAt(t_i+6)==116) && (this.f_str.charCodeAt(t_i+7)==65 || this.f_str.charCodeAt(t_i+7)==97) && this.f_str.charCodeAt(t_i+8)==91){
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<146>";
												if(this.f_tagCount==this.f_tagsLength){
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<147>";
													this.f_tagsLength*=2;
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<148>";
													this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<149>";
													this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
												}
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<151>";
												dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<152>";
												dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=2
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<153>";
												this.f_tagCount+=1;
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<154>";
												t_inCdata=true;
											}else{
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<162>";
												if((this.f_str.charCodeAt(t_i+2)==68 || this.f_str.charCodeAt(t_i+2)==100) && (this.f_str.charCodeAt(t_i+3)==79 || this.f_str.charCodeAt(t_i+3)==111) && (this.f_str.charCodeAt(t_i+4)==67 || this.f_str.charCodeAt(t_i+4)==99) && (this.f_str.charCodeAt(t_i+5)==84 || this.f_str.charCodeAt(t_i+5)==116) && (this.f_str.charCodeAt(t_i+6)==89 || this.f_str.charCodeAt(t_i+6)==121) && (this.f_str.charCodeAt(t_i+7)==80 || this.f_str.charCodeAt(t_i+7)==112) && (this.f_str.charCodeAt(t_i+8)==69 || this.f_str.charCodeAt(t_i+8)==101)){
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<163>";
													if(this.f_tagCount==this.f_tagsLength){
														err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<164>";
														this.f_tagsLength*=2;
														err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<165>";
														this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
														err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<166>";
														this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
													}
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<168>";
													dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<169>";
													dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=3
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<170>";
													this.f_tagCount+=1;
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<171>";
													t_inDoctype=true;
												}else{
													err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<173>";
													bb_assert_AssertError("Invalid prolog.");
												}
											}
										}
									}else{
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<176>";
										if(this.f_str.charCodeAt(t_i+1)==63){
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<177>";
											if(this.f_piCount==this.f_pisLength){
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<178>";
												this.f_pisLength*=2;
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<179>";
												this.f_pis=resize_number_array(this.f_pis,this.f_pisLength);
											}
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<181>";
											dbg_array(this.f_pis,this.f_piCount)[this.f_piCount]=t_i
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<182>";
											this.f_piCount+=1;
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<183>";
											t_inPi=true;
										}else{
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<186>";
											if(this.f_tagCount==this.f_tagsLength){
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<187>";
												this.f_tagsLength*=2;
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<188>";
												this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
												err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<189>";
												this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
											}
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<191>";
											dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<192>";
											dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=0
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<193>";
											this.f_tagCount+=1;
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<194>";
											t_inTag=true;
										}
									}
								}else{
									err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<197>";
									if(this.f_str.charCodeAt(t_i)==62){
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<198>";
										if(!t_inTag){
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<198>";
											bb_assert_AssertError("Invalid greater than!");
										}
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<199>";
										if(this.f_tagCount==this.f_tagsLength){
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<200>";
											this.f_tagsLength*=2;
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<201>";
											this.f_tags=resize_number_array(this.f_tags,this.f_tagsLength);
											err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<202>";
											this.f_tagType=resize_number_array(this.f_tagType,this.f_tagsLength);
										}
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<204>";
										dbg_array(this.f_tags,this.f_tagCount)[this.f_tagCount]=t_i
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<205>";
										dbg_array(this.f_tagType,this.f_tagCount)[this.f_tagCount]=0
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<206>";
										this.f_tagCount+=1;
										err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<207>";
										t_inTag=false;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<210>";
	if(t_inQuote){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<210>";
		bb_assert_AssertError("Unclosed quote!");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<211>";
	if(t_inTag){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<211>";
		bb_assert_AssertError("Unclosed tag!");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<212>";
	if(t_inComment){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<212>";
		bb_assert_AssertError("Unclosed comment!");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<213>";
	if(t_inCdata){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<213>";
		bb_assert_AssertError("Unclosed cdata!");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<214>";
	if(t_inPi){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<214>";
		bb_assert_AssertError("Unclosed processing instruction!");
	}
	pop_err();
}
bb_xml_XMLParser.prototype.m_TrimString=function(t_startIdx,t_endIdx,t_trimmed){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<351>";
	var t_trimStart=t_startIdx;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<351>";
	var t_trimEnd=t_endIdx;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<352>";
	while(t_trimEnd>t_trimStart){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<353>";
		var t_ch=this.f_str.charCodeAt(t_trimEnd-1);
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<354>";
		if(t_ch==13 || t_ch==10 || t_ch==32 || t_ch==9){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<355>";
			t_trimEnd-=1;
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<357>";
			break;
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<360>";
	while(t_trimStart<t_trimEnd){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<361>";
		var t_ch2=this.f_str.charCodeAt(t_trimStart);
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<362>";
		if(t_ch2==13 || t_ch2==10 || t_ch2==32 || t_ch2==9){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<363>";
			t_trimStart+=1;
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<365>";
			break;
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<368>";
	dbg_array(t_trimmed,0)[0]=t_trimStart
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<369>";
	dbg_array(t_trimmed,1)[1]=t_trimEnd
	pop_err();
}
bb_xml_XMLParser.prototype.m_GetTagContents=function(t_startIndex,t_endIndex){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<220>";
	if(t_startIndex==t_endIndex){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<220>";
		bb_assert_AssertError("Empty tag detected.");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<222>";
	var t_e=bb_xml_XMLElement_new.call(new bb_xml_XMLElement);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<223>";
	var t_a=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<223>";
	var t_singleQuoted=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<223>";
	var t_doubleQuoted=false;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<223>";
	var t_key="";
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<223>";
	var t_value="";
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<226>";
	t_a=t_startIndex;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<227>";
	while(t_a<t_endIndex){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<228>";
		if(this.f_str.charCodeAt(t_a)==32 || this.f_str.charCodeAt(t_a)==9 || this.f_str.charCodeAt(t_a)==10 || this.f_str.charCodeAt(t_a)==13 || t_a==t_endIndex-1){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<229>";
			if(t_a==t_endIndex-1){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<230>";
				dbg_object(t_e).f_name=this.f_str.slice(t_startIndex,t_endIndex);
			}else{
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<232>";
				dbg_object(t_e).f_name=this.f_str.slice(t_startIndex,t_a);
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<234>";
			t_a+=1;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<235>";
			break;
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<237>";
		t_a+=1;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<239>";
	t_startIndex=t_a;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<243>";
	if(dbg_object(t_e).f_name==""){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<243>";
		bb_assert_AssertError("Error reading tag name.");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<246>";
	while(t_startIndex<t_endIndex){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<248>";
		while(t_startIndex<t_endIndex && (this.f_str.charCodeAt(t_startIndex)==32 || this.f_str.charCodeAt(t_startIndex)==9 || this.f_str.charCodeAt(t_startIndex)==10 || this.f_str.charCodeAt(t_startIndex)==13)){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<249>";
			t_startIndex+=1;
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<253>";
		t_singleQuoted=false;
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<254>";
		t_doubleQuoted=false;
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<255>";
		t_key="";
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<256>";
		t_value="";
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<259>";
		t_a=t_startIndex;
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<260>";
		while(t_a<t_endIndex){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<261>";
			if(this.f_str.charCodeAt(t_a)==61 || this.f_str.charCodeAt(t_a)==32 || this.f_str.charCodeAt(t_a)==9 || this.f_str.charCodeAt(t_a)==10 || this.f_str.charCodeAt(t_a)==13 || t_a==t_endIndex-1){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<262>";
				if(t_a==t_endIndex-1){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<263>";
					t_key=this.f_str.slice(t_startIndex,t_endIndex);
				}else{
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<265>";
					t_key=this.f_str.slice(t_startIndex,t_a);
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<267>";
				t_a+=1;
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<268>";
				break;
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<270>";
			t_a+=1;
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<272>";
		t_startIndex=t_a;
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<275>";
		if(t_key==""){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<276>";
			if(t_a<t_endIndex){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<277>";
				bb_assert_AssertError("Error reading attribute key.");
			}else{
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<279>";
				break;
			}
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<284>";
		if(this.f_str.charCodeAt(t_a-1)==61){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<285>";
			t_singleQuoted=false;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<286>";
			t_doubleQuoted=false;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<287>";
			while(t_a<t_endIndex){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<289>";
				if(this.f_str.charCodeAt(t_a)==39 && !t_doubleQuoted){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<291>";
					if(t_a==t_startIndex){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<292>";
						t_singleQuoted=true;
					}else{
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<294>";
						if(!t_singleQuoted && !t_doubleQuoted){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<295>";
							bb_assert_AssertError("Unexpected single quote detected in attribute value.");
						}else{
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<298>";
							t_singleQuoted=false;
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<299>";
							t_value=this.f_str.slice(t_startIndex+1,t_a);
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<300>";
							t_a+=1;
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<301>";
							break;
						}
					}
				}else{
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<305>";
					if(this.f_str.charCodeAt(t_a)==34 && !t_singleQuoted){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<307>";
						if(t_a==t_startIndex){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<308>";
							t_doubleQuoted=true;
						}else{
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<310>";
							if(!t_singleQuoted && !t_doubleQuoted){
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<311>";
								bb_assert_AssertError("Unexpected double quote detected in attribute value.");
							}else{
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<314>";
								t_doubleQuoted=false;
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<315>";
								t_value=this.f_str.slice(t_startIndex+1,t_a);
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<316>";
								t_a+=1;
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<317>";
								break;
							}
						}
					}else{
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<321>";
						if(t_a==t_endIndex-1 || !t_singleQuoted && !t_doubleQuoted && (this.f_str.charCodeAt(t_a)==32 || this.f_str.charCodeAt(t_a)==9 || this.f_str.charCodeAt(t_a)==10 || this.f_str.charCodeAt(t_a)==13)){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<322>";
							if(t_a==t_endIndex-1){
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<323>";
								t_value=this.f_str.slice(t_startIndex,t_endIndex);
							}else{
								err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<325>";
								t_value=this.f_str.slice(t_startIndex,t_a);
							}
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<327>";
							t_a+=1;
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<328>";
							break;
						}
					}
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<330>";
				t_a+=1;
			}
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<332>";
			t_startIndex=t_a;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<333>";
			t_value=bb_xml_UnescapeXMLString(t_value);
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<335>";
			if(t_singleQuoted || t_doubleQuoted){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<335>";
				bb_assert_AssertError("Unclosed quote detected.");
			}
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<339>";
		t_e.m_SetAttribute(t_key,t_value);
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<341>";
		if(t_a>=t_endIndex){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<341>";
			break;
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<343>";
	pop_err();
	return t_e;
}
bb_xml_XMLParser.prototype.m_ParseString=function(t_str){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<374>";
	dbg_object(this).f_str=t_str;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<376>";
	var t_doc=bb_xml_XMLDocument_new.call(new bb_xml_XMLDocument,"");
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<377>";
	var t_elements=bb_collections_ArrayList_new.call(new bb_collections_ArrayList);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<378>";
	var t_thisE=null;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<378>";
	var t_newE=null;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<379>";
	var t_index=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<379>";
	var t_a=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<379>";
	var t_b=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<379>";
	var t_c=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<379>";
	var t_nextIndex=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<380>";
	var t_trimmed=new_number_array(2);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<383>";
	this.m_CacheControlCharacters();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<386>";
	if(this.f_tagCount==0){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<386>";
		bb_assert_AssertError("Something seriously wrong... no tags!");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<389>";
	t_index=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<390>";
	t_a=dbg_array(this.f_pis,t_index)[t_index]+2;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<391>";
	var t_=t_index+1;
	t_b=dbg_array(this.f_pis,t_)[t_]-1;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<392>";
	while(t_index<this.f_piCount){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<393>";
		this.m_TrimString(t_a,t_b,t_trimmed);
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<394>";
		if(dbg_array(t_trimmed,0)[0]!=dbg_array(t_trimmed,1)[1]){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<395>";
			t_newE=this.m_GetTagContents(dbg_array(t_trimmed,0)[0],dbg_array(t_trimmed,1)[1]);
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<396>";
			dbg_object(t_newE).f_pi=true;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<397>";
			dbg_object(t_doc).f_pi.m_Add(t_newE);
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<398>";
			t_newE=null;
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<400>";
			bb_assert_AssertError("Empty processing instruction.");
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<402>";
		t_index+=2;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<406>";
	t_index=0;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<407>";
	while(t_index+1<this.f_tagCount){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<409>";
		if(dbg_array(this.f_tagType,t_index)[t_index]==1){
		}else{
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<413>";
			if(dbg_array(this.f_tagType,t_index)[t_index]==2){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<415>";
				t_a=dbg_array(this.f_tags,t_index)[t_index]+9;
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<416>";
				var t_2=t_index+1;
				t_b=dbg_array(this.f_tags,t_2)[t_2]-2;
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<419>";
				t_newE=bb_xml_XMLElement_new.call(new bb_xml_XMLElement);
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<420>";
				dbg_object(t_newE).f_cdata=true;
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<421>";
				dbg_object(t_newE).f_value=t_str.slice(t_a,t_b);
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<422>";
				dbg_object(t_newE).f_parent=t_thisE;
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<423>";
				t_thisE.m_AddChild(t_newE);
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<424>";
				t_newE=null;
			}else{
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<429>";
				t_a=dbg_array(this.f_tags,t_index)[t_index]+1;
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<430>";
				var t_3=t_index+1;
				t_b=dbg_array(this.f_tags,t_3)[t_3];
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<433>";
				this.m_TrimString(t_a,t_b,t_trimmed);
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<436>";
				if(dbg_array(t_trimmed,0)[0]==dbg_array(t_trimmed,1)[1]){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<436>";
					bb_assert_AssertError("Empty tag.");
				}
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<439>";
				if(t_str.charCodeAt(dbg_array(t_trimmed,0)[0])==47){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<441>";
					if(t_thisE==null){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<441>";
						bb_assert_AssertError("Closing tag found outside main document tag.");
					}
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<444>";
					dbg_array(t_trimmed,0)[0]+=1
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<447>";
					if(dbg_array(t_trimmed,1)[1]-dbg_array(t_trimmed,0)[0]!=dbg_object(t_thisE).f_name.length){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<447>";
						bb_assert_AssertError("Closing tag \""+t_str.slice(dbg_array(t_trimmed,0)[0],dbg_array(t_trimmed,1)[1])+"\" does not match opening tag \""+dbg_object(t_thisE).f_name+"\"");
					}
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<450>";
					for(var t_nameIdx=0;t_nameIdx<dbg_object(t_thisE).f_name.length;t_nameIdx=t_nameIdx+1){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<451>";
						if(t_str.charCodeAt(dbg_array(t_trimmed,0)[0]+t_nameIdx)!=dbg_object(t_thisE).f_name.charCodeAt(t_nameIdx)){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<451>";
							bb_assert_AssertError("Closing tag \""+t_str.slice(dbg_array(t_trimmed,0)[0],dbg_array(t_trimmed,1)[1])+"\" does not match opening tag \""+dbg_object(t_thisE).f_name+"\"");
						}
					}
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<455>";
					if(!t_elements.m_IsEmpty()){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<456>";
						t_thisE=t_elements.m_RemoveLast();
					}else{
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<459>";
						break;
					}
				}else{
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<463>";
					if(t_str.charCodeAt(dbg_array(t_trimmed,1)[1]-1)==47){
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<465>";
						dbg_array(t_trimmed,1)[1]-=1
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<468>";
						t_newE=this.m_GetTagContents(dbg_array(t_trimmed,0)[0],dbg_array(t_trimmed,1)[1]);
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<471>";
						if(dbg_object(t_doc).f_root==null){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<471>";
							dbg_object(t_doc).f_root=t_newE;
						}
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<472>";
						if(t_thisE!=null){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<473>";
							t_thisE.m_AddChild(t_newE);
						}else{
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<476>";
							break;
						}
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<478>";
						t_newE=null;
					}else{
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<483>";
						t_newE=this.m_GetTagContents(dbg_array(t_trimmed,0)[0],dbg_array(t_trimmed,1)[1]);
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<485>";
						if(dbg_object(t_doc).f_root==null){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<485>";
							dbg_object(t_doc).f_root=t_newE;
						}
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<488>";
						if(t_thisE!=null){
							err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<489>";
							t_thisE.m_AddChild(t_newE);
						}
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<493>";
						t_elements.m_AddLast(t_thisE);
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<496>";
						t_thisE=t_newE;
						err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<497>";
						t_newE=null;
					}
				}
			}
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<502>";
		t_index+=1;
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<503>";
		if(t_index<this.f_tagCount){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<504>";
			t_a=dbg_array(this.f_tags,t_index)[t_index]+1;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<505>";
			var t_4=t_index+1;
			t_b=dbg_array(this.f_tags,t_4)[t_4];
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<506>";
			this.m_TrimString(t_a,t_b,t_trimmed);
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<507>";
			if(dbg_array(t_trimmed,0)[0]!=dbg_array(t_trimmed,1)[1]){
				err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<508>";
				if(t_thisE!=null){
					err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<509>";
					dbg_object(t_thisE).f_value=dbg_object(t_thisE).f_value+bb_xml_UnescapeXMLString(t_str.slice(dbg_array(t_trimmed,0)[0],dbg_array(t_trimmed,1)[1]));
				}
			}
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<517>";
		t_index+=1;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<519>";
	if(dbg_object(t_doc).f_root==null){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<519>";
		bb_assert_AssertError("Error parsing XML: no document tag found.");
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<520>";
	pop_err();
	return t_doc;
}
function bb_xml_XMLDocument(){
	Object.call(this);
	this.f_root=null;
	this.f_pi=bb_collections_ArrayList_new.call(new bb_collections_ArrayList);
}
function bb_xml_XMLDocument_new(t_rootName){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<536>";
	if(t_rootName!=""){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<536>";
		this.f_root=bb_xml_XMLElement_new2.call(new bb_xml_XMLElement,t_rootName,null);
	}
	pop_err();
	return this;
}
function bb_xml_XMLDocument_new2(t_root){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<540>";
	dbg_object(this).f_root=t_root;
	pop_err();
	return this;
}
bb_xml_XMLDocument.prototype.m_Root=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<560>";
	pop_err();
	return this.f_root;
}
function bb_xml_XMLElement(){
	Object.call(this);
	this.f_parent=null;
	this.f_name="";
	this.f_children=bb_collections_ArrayList_new.call(new bb_collections_ArrayList);
	this.f_attributes=bb_collections_ArrayList2_new.call(new bb_collections_ArrayList2);
	this.f_pi=false;
	this.f_cdata=false;
	this.f_value="";
}
function bb_xml_XMLElement_new(){
	push_err();
	pop_err();
	return this;
}
function bb_xml_XMLElement_new2(t_name,t_parent){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<616>";
	dbg_object(this).f_parent=t_parent;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<617>";
	dbg_object(this).f_name=t_name;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<618>";
	if(t_parent!=null){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<618>";
		dbg_object(t_parent).f_children.m_Add(this);
	}
	pop_err();
	return this;
}
bb_xml_XMLElement.prototype.m_SetAttribute=function(t_name,t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<658>";
	for(var t_i=0;t_i<this.f_attributes.m_Size();t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<659>";
		var t_att=this.f_attributes.m_Get2(t_i);
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<660>";
		if(dbg_object(t_att).f_name==t_name){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<661>";
			var t_old=dbg_object(t_att).f_value;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<662>";
			dbg_object(t_att).f_value=t_value;
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<663>";
			pop_err();
			return t_old;
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<666>";
	this.f_attributes.m_Add2(bb_xml_XMLAttribute_new.call(new bb_xml_XMLAttribute,t_name,t_value));
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<667>";
	pop_err();
	return "";
}
bb_xml_XMLElement.prototype.m_AddChild=function(t_child){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<636>";
	if(this.f_children.m_Contains2(t_child)){
		pop_err();
		return;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<637>";
	this.f_children.m_Add(t_child);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<638>";
	dbg_object(t_child).f_parent=this;
	pop_err();
}
bb_xml_XMLElement.prototype.m_GetAttribute=function(t_name,t_defaultValue){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<650>";
	for(var t_i=0;t_i<this.f_attributes.m_Size();t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<651>";
		var t_att=this.f_attributes.m_Get2(t_i);
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<652>";
		if(dbg_object(t_att).f_name==t_name){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<652>";
			pop_err();
			return dbg_object(t_att).f_value;
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<654>";
	pop_err();
	return t_defaultValue;
}
bb_xml_XMLElement.prototype.m_GetChildrenByName=function(t_findName){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<746>";
	var t_rv=bb_collections_ArrayList_new.call(new bb_collections_ArrayList);
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<747>";
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<747>";
	var t_=this.f_children.m_ObjectEnumerator();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<747>";
	while(t_.m_HasNext()){
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<747>";
		var t_element=t_.m_NextObject();
		err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<748>";
		if(dbg_object(t_element).f_name==t_findName){
			err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<748>";
			t_rv.m_Add(t_element);
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<750>";
	pop_err();
	return t_rv;
}
function bb_collections_ICollection(){
	Object.call(this);
}
function bb_collections_ICollection_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<17>";
	pop_err();
	return this;
}
bb_collections_ICollection.prototype.m_ToArray=function(){
}
bb_collections_ICollection.prototype.m_Add=function(t_o){
}
bb_collections_ICollection.prototype.m_Contains2=function(t_o){
}
bb_collections_ICollection.prototype.m_IsEmpty=function(){
}
bb_collections_ICollection.prototype.m_Size=function(){
}
bb_collections_ICollection.prototype.m_Enumerator=function(){
}
bb_collections_ICollection.prototype.m_ObjectEnumerator=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<42>";
	var t_=this.m_Enumerator();
	pop_err();
	return t_;
}
function bb_collections_IList(){
	bb_collections_ICollection.call(this);
	this.f_modCount=0;
	this.f_rangeChecking=true;
}
bb_collections_IList.prototype=extend_class(bb_collections_ICollection);
function bb_collections_IList_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<159>";
	bb_collections_ICollection_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<159>";
	pop_err();
	return this;
}
bb_collections_IList.prototype.m_RemoveLast=function(){
}
bb_collections_IList.prototype.m_RemoveAt=function(t_index){
}
bb_collections_IList.prototype.m_RangeCheck=function(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<173>";
	var t_size=this.m_Size();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<175>";
	if(t_index<0 || t_index>=t_size){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<175>";
		bb_assert_AssertError("IList.RangeCheck: Index out of bounds: "+String(t_index)+" is not 0<=index<"+String(t_size));
	}
	pop_err();
}
bb_collections_IList.prototype.m_AddLast=function(t_o){
}
bb_collections_IList.prototype.m_Enumerator=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<198>";
	var t_=(bb_collections_ListEnumerator_new.call(new bb_collections_ListEnumerator,this));
	pop_err();
	return t_;
}
bb_collections_IList.prototype.m_Get2=function(t_index){
}
function bb_collections_ArrayList(){
	bb_collections_IList.call(this);
	this.f_elements=[];
	this.f_size=0;
}
bb_collections_ArrayList.prototype=extend_class(bb_collections_IList);
function bb_collections_ArrayList_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<432>";
	bb_collections_IList_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<433>";
	dbg_object(this).f_elements=new_object_array(10);
	pop_err();
	return this;
}
function bb_collections_ArrayList_new2(t_initialCapacity){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<436>";
	bb_collections_IList_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<437>";
	bb_assert_AssertGreaterThanOrEqualInt(t_initialCapacity,0,"ArrayList.New: Illegal Capacity:");
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<438>";
	dbg_object(this).f_elements=new_object_array(t_initialCapacity);
	pop_err();
	return this;
}
function bb_collections_ArrayList_new3(t_c){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<441>";
	bb_collections_IList_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<442>";
	this.f_elements=t_c.m_ToArray();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<443>";
	this.f_size=this.f_elements.length;
	pop_err();
	return this;
}
bb_collections_ArrayList.prototype.m_EnsureCapacity=function(t_minCapacity){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<414>";
	var t_oldCapacity=this.f_elements.length;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<415>";
	if(t_minCapacity>t_oldCapacity){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<416>";
		var t_newCapacity=((t_oldCapacity*3/2)|0)+1;
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<417>";
		if(t_newCapacity<t_minCapacity){
			err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<417>";
			t_newCapacity=t_minCapacity;
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<418>";
		this.f_elements=resize_object_array(this.f_elements,t_newCapacity);
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<419>";
		this.f_modCount+=1;
	}
	pop_err();
}
bb_collections_ArrayList.prototype.m_Add=function(t_o){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<449>";
	if(this.f_size+1>this.f_elements.length){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<449>";
		this.m_EnsureCapacity(this.f_size+1);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<450>";
	dbg_array(this.f_elements,this.f_size)[this.f_size]=(t_o)
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<451>";
	this.f_size+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<452>";
	this.f_modCount+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<453>";
	pop_err();
	return true;
}
bb_collections_ArrayList.prototype.m_Contains2=function(t_o){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<482>";
	for(var t_i=0;t_i<this.f_size;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<483>";
		if(dbg_array(this.f_elements,t_i)[t_i]==(t_o)){
			err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<483>";
			pop_err();
			return true;
		}
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<485>";
	pop_err();
	return false;
}
bb_collections_ArrayList.prototype.m_IsEmpty=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<515>";
	var t_=this.f_size==0;
	pop_err();
	return t_;
}
bb_collections_ArrayList.prototype.m_RangeCheck=function(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<425>";
	if(t_index<0 || t_index>=this.f_size){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<425>";
		bb_assert_AssertError("ArrayList.RangeCheck: Index out of bounds: "+String(t_index)+" is not 0<=index<"+String(this.f_size));
	}
	pop_err();
}
bb_collections_ArrayList.prototype.m_RemoveAt=function(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<668>";
	if(this.f_rangeChecking){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<668>";
		this.m_RangeCheck(t_index);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<669>";
	var t_oldValue=object_downcast((dbg_array(this.f_elements,t_index)[t_index]),bb_xml_XMLElement);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<670>";
	for(var t_i=t_index;t_i<this.f_size-1;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<671>";
		var t_=t_i+1;
		dbg_array(this.f_elements,t_i)[t_i]=dbg_array(this.f_elements,t_)[t_]
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<673>";
	var t_2=this.f_size-1;
	dbg_array(this.f_elements,t_2)[t_2]=null
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<674>";
	this.f_size-=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<675>";
	this.f_modCount+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<676>";
	pop_err();
	return t_oldValue;
}
bb_collections_ArrayList.prototype.m_RemoveLast=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<590>";
	var t_=this.m_RemoveAt(this.f_size-1);
	pop_err();
	return t_;
}
bb_collections_ArrayList.prototype.m_AddLast=function(t_o){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<585>";
	var t_=this.m_Add(t_o);
	pop_err();
	return t_;
}
bb_collections_ArrayList.prototype.m_Enumerator=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<501>";
	var t_=(bb_collections_ArrayListEnumerator_new.call(new bb_collections_ArrayListEnumerator,this));
	pop_err();
	return t_;
}
bb_collections_ArrayList.prototype.m_Size=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<562>";
	pop_err();
	return this.f_size;
}
bb_collections_ArrayList.prototype.m_ToArray=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<576>";
	var t_arr=new_object_array(this.f_size);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<577>";
	for(var t_i=0;t_i<this.f_size;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<578>";
		dbg_array(t_arr,t_i)[t_i]=dbg_array(this.f_elements,t_i)[t_i]
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<580>";
	pop_err();
	return t_arr;
}
bb_collections_ArrayList.prototype.m_Get2=function(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<616>";
	if(this.f_rangeChecking){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<616>";
		this.m_RangeCheck(t_index);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<617>";
	var t_=object_downcast((dbg_array(this.f_elements,t_index)[t_index]),bb_xml_XMLElement);
	pop_err();
	return t_;
}
function bb_assert_AssertGreaterThanOrEqualInt(t_val,t_expected,t_msg){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<99>";
	if(t_val<t_expected){
		err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<99>";
		bb_assert_AssertError(t_msg+" "+String(t_val)+"<"+String(t_expected));
	}
	pop_err();
}
function bb_xml_UnescapeXMLString(t_str){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<810>";
	t_str=string_replace(t_str,"&quot;","\"");
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<811>";
	t_str=string_replace(t_str,"&apos;","'");
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<812>";
	t_str=string_replace(t_str,"&gt;",">");
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<813>";
	t_str=string_replace(t_str,"&lt;","<");
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<814>";
	t_str=string_replace(t_str,"&amp;","&");
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<815>";
	pop_err();
	return t_str;
}
function bb_xml_XMLAttribute(){
	Object.call(this);
	this.f_name="";
	this.f_value="";
}
function bb_xml_XMLAttribute_new(t_name,t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<587>";
	dbg_object(this).f_name=t_name;
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<588>";
	dbg_object(this).f_value=t_value;
	pop_err();
	return this;
}
function bb_xml_XMLAttribute_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/xml.monkey<580>";
	pop_err();
	return this;
}
function bb_collections_ICollection2(){
	Object.call(this);
}
function bb_collections_ICollection2_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<17>";
	pop_err();
	return this;
}
bb_collections_ICollection2.prototype.m_ToArray=function(){
}
bb_collections_ICollection2.prototype.m_Size=function(){
}
bb_collections_ICollection2.prototype.m_Add2=function(t_o){
}
function bb_collections_IList2(){
	bb_collections_ICollection2.call(this);
	this.f_rangeChecking=true;
	this.f_modCount=0;
}
bb_collections_IList2.prototype=extend_class(bb_collections_ICollection2);
function bb_collections_IList2_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<159>";
	bb_collections_ICollection2_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<159>";
	pop_err();
	return this;
}
bb_collections_IList2.prototype.m_Get2=function(t_index){
}
bb_collections_IList2.prototype.m_RangeCheck=function(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<173>";
	var t_size=this.m_Size();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<175>";
	if(t_index<0 || t_index>=t_size){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<175>";
		bb_assert_AssertError("IList.RangeCheck: Index out of bounds: "+String(t_index)+" is not 0<=index<"+String(t_size));
	}
	pop_err();
}
function bb_collections_ArrayList2(){
	bb_collections_IList2.call(this);
	this.f_elements=[];
	this.f_size=0;
}
bb_collections_ArrayList2.prototype=extend_class(bb_collections_IList2);
function bb_collections_ArrayList2_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<432>";
	bb_collections_IList2_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<433>";
	dbg_object(this).f_elements=new_object_array(10);
	pop_err();
	return this;
}
function bb_collections_ArrayList2_new2(t_initialCapacity){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<436>";
	bb_collections_IList2_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<437>";
	bb_assert_AssertGreaterThanOrEqualInt(t_initialCapacity,0,"ArrayList.New: Illegal Capacity:");
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<438>";
	dbg_object(this).f_elements=new_object_array(t_initialCapacity);
	pop_err();
	return this;
}
function bb_collections_ArrayList2_new3(t_c){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<441>";
	bb_collections_IList2_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<442>";
	this.f_elements=t_c.m_ToArray();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<443>";
	this.f_size=this.f_elements.length;
	pop_err();
	return this;
}
bb_collections_ArrayList2.prototype.m_Size=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<562>";
	pop_err();
	return this.f_size;
}
bb_collections_ArrayList2.prototype.m_RangeCheck=function(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<425>";
	if(t_index<0 || t_index>=this.f_size){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<425>";
		bb_assert_AssertError("ArrayList.RangeCheck: Index out of bounds: "+String(t_index)+" is not 0<=index<"+String(this.f_size));
	}
	pop_err();
}
bb_collections_ArrayList2.prototype.m_Get2=function(t_index){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<616>";
	if(this.f_rangeChecking){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<616>";
		this.m_RangeCheck(t_index);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<617>";
	var t_=object_downcast((dbg_array(this.f_elements,t_index)[t_index]),bb_xml_XMLAttribute);
	pop_err();
	return t_;
}
bb_collections_ArrayList2.prototype.m_EnsureCapacity=function(t_minCapacity){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<414>";
	var t_oldCapacity=this.f_elements.length;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<415>";
	if(t_minCapacity>t_oldCapacity){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<416>";
		var t_newCapacity=((t_oldCapacity*3/2)|0)+1;
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<417>";
		if(t_newCapacity<t_minCapacity){
			err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<417>";
			t_newCapacity=t_minCapacity;
		}
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<418>";
		this.f_elements=resize_object_array(this.f_elements,t_newCapacity);
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<419>";
		this.f_modCount+=1;
	}
	pop_err();
}
bb_collections_ArrayList2.prototype.m_Add2=function(t_o){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<449>";
	if(this.f_size+1>this.f_elements.length){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<449>";
		this.m_EnsureCapacity(this.f_size+1);
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<450>";
	dbg_array(this.f_elements,this.f_size)[this.f_size]=(t_o)
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<451>";
	this.f_size+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<452>";
	this.f_modCount+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<453>";
	pop_err();
	return true;
}
bb_collections_ArrayList2.prototype.m_ToArray=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<576>";
	var t_arr=new_object_array(this.f_size);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<577>";
	for(var t_i=0;t_i<this.f_size;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<578>";
		dbg_array(t_arr,t_i)[t_i]=dbg_array(this.f_elements,t_i)[t_i]
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<580>";
	pop_err();
	return t_arr;
}
function bb_assert_AssertNotNull(t_val,t_msg){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<22>";
	if(t_val==null){
		err_info="D:/Code/MonkeyPro/modules/diddy/assert.monkey<22>";
		bb_assert_AssertError(t_msg);
	}
	pop_err();
}
function bb_functions_StripExt(t_path){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<246>";
	var t_i=t_path.lastIndexOf(".");
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<247>";
	if(t_i!=-1 && t_path.indexOf("/",t_i+1)==-1){
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<247>";
		var t_=t_path.slice(0,t_i);
		pop_err();
		return t_;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<248>";
	pop_err();
	return t_path;
}
function bb_functions_StripDir(t_path){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<240>";
	var t_i=t_path.lastIndexOf("/");
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<241>";
	if(t_i!=-1){
		err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<241>";
		var t_=t_path.slice(t_i+1);
		pop_err();
		return t_;
	}
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<242>";
	pop_err();
	return t_path;
}
function bb_functions_StripAll(t_path){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<252>";
	var t_=bb_functions_StripDir(bb_functions_StripExt(t_path));
	pop_err();
	return t_;
}
function bb_map_Node(){
	Object.call(this);
	this.f_key="";
	this.f_right=null;
	this.f_left=null;
	this.f_value=null;
	this.f_color=0;
	this.f_parent=null;
}
function bb_map_Node_new(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<364>";
	dbg_object(this).f_key=t_key;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<365>";
	dbg_object(this).f_value=t_value;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<366>";
	dbg_object(this).f_color=t_color;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<367>";
	dbg_object(this).f_parent=t_parent;
	pop_err();
	return this;
}
function bb_map_Node_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<361>";
	pop_err();
	return this;
}
bb_map_Node.prototype.m_NextNode=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<385>";
	var t_node=null;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<386>";
	if((this.f_right)!=null){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<387>";
		t_node=this.f_right;
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<388>";
		while((dbg_object(t_node).f_left)!=null){
			err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<389>";
			t_node=dbg_object(t_node).f_left;
		}
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<391>";
		pop_err();
		return t_node;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<393>";
	t_node=this;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<394>";
	var t_parent=dbg_object(this).f_parent;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<395>";
	while(((t_parent)!=null) && t_node==dbg_object(t_parent).f_right){
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<396>";
		t_node=t_parent;
		err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<397>";
		t_parent=dbg_object(t_parent).f_parent;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<399>";
	pop_err();
	return t_parent;
}
function bb_collections_IEnumerator(){
	Object.call(this);
}
bb_collections_IEnumerator.prototype.m_HasNext=function(){
}
bb_collections_IEnumerator.prototype.m_NextObject=function(){
}
function bb_collections_IEnumerator_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<64>";
	pop_err();
	return this;
}
function bb_functions_LoadBitmap(t_path,t_flags){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<158>";
	var t_pointer=bb_graphics_LoadImage(t_path,1,t_flags);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<160>";
	bb_assert_AssertNotNull((t_pointer),"Error loading bitmap "+t_path);
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<162>";
	pop_err();
	return t_pointer;
}
function bb_bitmapfont_BitmapFont(){
	Object.call(this);
	this.f_borderChars=[];
	this.f_faceChars=[];
	this.f_shadowChars=[];
	this.f_packedImages=[];
	this.f__drawShadow=true;
	this.f__kerning=null;
	this.f__drawBorder=true;
	this.implments={bb_fontinterface_Font:1};
}
bb_bitmapfont_BitmapFont.prototype.m_LoadPacked=function(t_info,t_fontName,t_dynamicLoad){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<622>";
	var t_header=t_info.slice(0,t_info.indexOf(",",0));
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<624>";
	var t_separator="";
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<625>";
	var t_2=t_header;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<626>";
	if(t_2=="P1"){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<627>";
		t_separator=".";
	}else{
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<628>";
		if(t_2=="P1.01"){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<629>";
			t_separator="_P_";
		}
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<631>";
	t_info=t_info.slice(t_info.indexOf(",",0)+1);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<632>";
	this.f_borderChars=new_object_array(65536);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<633>";
	this.f_faceChars=new_object_array(65536);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<634>";
	this.f_shadowChars=new_object_array(65536);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<635>";
	this.f_packedImages=new_object_array(256);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<636>";
	var t_maxPacked=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<637>";
	var t_maxChar=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<639>";
	var t_prefixName=t_fontName;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<640>";
	if(string_ends_with(t_prefixName.toLowerCase(),".txt")){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<640>";
		t_prefixName=t_prefixName.slice(0,-4);
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<642>";
	var t_charList=t_info.split(";");
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<643>";
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<643>";
	var t_=t_charList;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<643>";
	var t_3=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<643>";
	while(t_3<t_.length){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<643>";
		var t_chr=dbg_array(t_,t_3)[t_3];
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<643>";
		t_3=t_3+1;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<645>";
		var t_chrdata=t_chr.split(",");
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<646>";
		if(t_chrdata.length<2){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<646>";
			break;
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<647>";
		var t_char=null;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<648>";
		var t_charIndex=parseInt((dbg_array(t_chrdata,0)[0]),10);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<649>";
		if(t_maxChar<t_charIndex){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<649>";
			t_maxChar=t_charIndex;
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<651>";
		var t_32=dbg_array(t_chrdata,1)[1];
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<652>";
		if(t_32=="B"){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<653>";
			dbg_array(this.f_borderChars,t_charIndex)[t_charIndex]=bb_bitmapchar_BitMapChar_new.call(new bb_bitmapchar_BitMapChar)
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<654>";
			t_char=dbg_array(this.f_borderChars,t_charIndex)[t_charIndex];
		}else{
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<655>";
			if(t_32=="F"){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<656>";
				dbg_array(this.f_faceChars,t_charIndex)[t_charIndex]=bb_bitmapchar_BitMapChar_new.call(new bb_bitmapchar_BitMapChar)
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<657>";
				t_char=dbg_array(this.f_faceChars,t_charIndex)[t_charIndex];
			}else{
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<658>";
				if(t_32=="S"){
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<659>";
					dbg_array(this.f_shadowChars,t_charIndex)[t_charIndex]=bb_bitmapchar_BitMapChar_new.call(new bb_bitmapchar_BitMapChar)
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<660>";
					t_char=dbg_array(this.f_shadowChars,t_charIndex)[t_charIndex];
				}
			}
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<662>";
		dbg_object(t_char).f_packedFontIndex=parseInt((dbg_array(t_chrdata,2)[2]),10);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<663>";
		if(dbg_array(this.f_packedImages,dbg_object(t_char).f_packedFontIndex)[dbg_object(t_char).f_packedFontIndex]==null){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<664>";
			dbg_array(this.f_packedImages,dbg_object(t_char).f_packedFontIndex)[dbg_object(t_char).f_packedFontIndex]=bb_graphics_LoadImage(t_prefixName+t_separator+String(dbg_object(t_char).f_packedFontIndex)+".png",1,bb_graphics_Image_DefaultFlags)
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<665>";
			if(t_maxPacked<dbg_object(t_char).f_packedFontIndex){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<665>";
				t_maxPacked=dbg_object(t_char).f_packedFontIndex;
			}
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<667>";
		dbg_object(dbg_object(t_char).f_packedPosition).f_x=(parseInt((dbg_array(t_chrdata,3)[3]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<668>";
		dbg_object(dbg_object(t_char).f_packedPosition).f_y=(parseInt((dbg_array(t_chrdata,4)[4]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<669>";
		dbg_object(dbg_object(t_char).f_packedSize).f_x=(parseInt((dbg_array(t_chrdata,5)[5]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<670>";
		dbg_object(dbg_object(t_char).f_packedSize).f_y=(parseInt((dbg_array(t_chrdata,6)[6]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<671>";
		dbg_object(dbg_object(dbg_object(t_char).f_drawingMetrics).f_drawingOffset).f_x=(parseInt((dbg_array(t_chrdata,8)[8]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<672>";
		dbg_object(dbg_object(dbg_object(t_char).f_drawingMetrics).f_drawingOffset).f_y=(parseInt((dbg_array(t_chrdata,9)[9]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<673>";
		dbg_object(dbg_object(dbg_object(t_char).f_drawingMetrics).f_drawingSize).f_x=(parseInt((dbg_array(t_chrdata,10)[10]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<674>";
		dbg_object(dbg_object(dbg_object(t_char).f_drawingMetrics).f_drawingSize).f_y=(parseInt((dbg_array(t_chrdata,11)[11]),10));
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<675>";
		dbg_object(dbg_object(t_char).f_drawingMetrics).f_drawingWidth=(parseInt((dbg_array(t_chrdata,12)[12]),10));
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<678>";
	this.f_borderChars=this.f_borderChars.slice(0,t_maxChar+1);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<679>";
	this.f_faceChars=this.f_faceChars.slice(0,t_maxChar+1);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<680>";
	this.f_shadowChars=this.f_shadowChars.slice(0,t_maxChar+1);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<681>";
	this.f_packedImages=this.f_packedImages.slice(0,t_maxPacked+1);
	pop_err();
	return 0;
}
bb_bitmapfont_BitmapFont.prototype.m_LoadFontData=function(t_Info,t_fontName,t_dynamicLoad){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<520>";
	if(string_starts_with(t_Info,"P1")){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<521>";
		this.m_LoadPacked(t_Info,t_fontName,t_dynamicLoad);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<522>";
		pop_err();
		return 0;
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<524>";
	var t_tokenStream=t_Info.split(",");
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<525>";
	var t_index=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<526>";
	this.f_borderChars=new_object_array(65536);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<527>";
	this.f_faceChars=new_object_array(65536);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<528>";
	this.f_shadowChars=new_object_array(65536);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<530>";
	var t_prefixName=t_fontName;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<531>";
	if(string_ends_with(t_prefixName.toLowerCase(),".txt")){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<531>";
		t_prefixName=t_prefixName.slice(0,-4);
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<533>";
	var t_char=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<534>";
	while(t_index<t_tokenStream.length){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<536>";
		var t_strChar=dbg_array(t_tokenStream,t_index)[t_index];
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<537>";
		if(string_trim(t_strChar)==""){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<539>";
			t_index+=1;
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<540>";
			break;
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<542>";
		t_char=parseInt((t_strChar),10);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<544>";
		t_index+=1;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<546>";
		var t_kind=dbg_array(t_tokenStream,t_index)[t_index];
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<548>";
		t_index+=1;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<550>";
		var t_1=t_kind;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<551>";
		if(t_1=="{BR"){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<552>";
			t_index+=3;
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<553>";
			dbg_array(this.f_borderChars,t_char)[t_char]=bb_bitmapchar_BitMapChar_new.call(new bb_bitmapchar_BitMapChar)
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<554>";
			dbg_object(dbg_object(dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_x=(parseInt((dbg_array(t_tokenStream,t_index)[t_index]),10));
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<555>";
			var t_=t_index+1;
			dbg_object(dbg_object(dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_y=(parseInt((dbg_array(t_tokenStream,t_)[t_]),10));
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<556>";
			var t_2=t_index+2;
			dbg_object(dbg_object(dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_drawingMetrics).f_drawingSize).f_x=(parseInt((dbg_array(t_tokenStream,t_2)[t_2]),10));
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<557>";
			var t_3=t_index+3;
			dbg_object(dbg_object(dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_drawingMetrics).f_drawingSize).f_y=(parseInt((dbg_array(t_tokenStream,t_3)[t_3]),10));
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<558>";
			var t_4=t_index+4;
			dbg_object(dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_drawingMetrics).f_drawingWidth=(parseInt((dbg_array(t_tokenStream,t_4)[t_4]),10));
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<559>";
			if(t_dynamicLoad==false){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<560>";
				dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_image=bb_graphics_LoadImage(t_prefixName+"_BORDER_"+String(t_char)+".png",1,bb_graphics_Image_DefaultFlags);
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<561>";
				dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_image.m_SetHandle(-dbg_object(dbg_object(dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_x,-dbg_object(dbg_object(dbg_object(dbg_array(this.f_borderChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_y);
			}else{
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<563>";
				dbg_array(this.f_borderChars,t_char)[t_char].m_SetImageResourceName(t_prefixName+"_BORDER_"+String(t_char)+".png");
			}
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<565>";
			t_index+=5;
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<566>";
			t_index+=1;
		}else{
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<568>";
			if(t_1=="{SH"){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<569>";
				t_index+=3;
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<570>";
				dbg_array(this.f_shadowChars,t_char)[t_char]=bb_bitmapchar_BitMapChar_new.call(new bb_bitmapchar_BitMapChar)
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<571>";
				dbg_object(dbg_object(dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_x=(parseInt((dbg_array(t_tokenStream,t_index)[t_index]),10));
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<572>";
				var t_5=t_index+1;
				dbg_object(dbg_object(dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_y=(parseInt((dbg_array(t_tokenStream,t_5)[t_5]),10));
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<573>";
				var t_6=t_index+2;
				dbg_object(dbg_object(dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_drawingMetrics).f_drawingSize).f_x=(parseInt((dbg_array(t_tokenStream,t_6)[t_6]),10));
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<574>";
				var t_7=t_index+3;
				dbg_object(dbg_object(dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_drawingMetrics).f_drawingSize).f_y=(parseInt((dbg_array(t_tokenStream,t_7)[t_7]),10));
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<575>";
				var t_8=t_index+4;
				dbg_object(dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_drawingMetrics).f_drawingWidth=(parseInt((dbg_array(t_tokenStream,t_8)[t_8]),10));
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<576>";
				var t_filename=t_prefixName+"_SHADOW_"+String(t_char)+".png";
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<577>";
				if(t_dynamicLoad==false){
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<578>";
					dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_image=bb_graphics_LoadImage(t_filename,1,bb_graphics_Image_DefaultFlags);
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<579>";
					dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_image.m_SetHandle(-dbg_object(dbg_object(dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_x,-dbg_object(dbg_object(dbg_object(dbg_array(this.f_shadowChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_y);
				}else{
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<581>";
					dbg_array(this.f_shadowChars,t_char)[t_char].m_SetImageResourceName(t_filename);
				}
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<588>";
				t_index+=5;
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<589>";
				t_index+=1;
			}else{
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<591>";
				if(t_1=="{FC"){
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<592>";
					t_index+=3;
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<593>";
					dbg_array(this.f_faceChars,t_char)[t_char]=bb_bitmapchar_BitMapChar_new.call(new bb_bitmapchar_BitMapChar)
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<594>";
					dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_x=(parseInt((dbg_array(t_tokenStream,t_index)[t_index]),10));
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<595>";
					var t_9=t_index+1;
					dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_y=(parseInt((dbg_array(t_tokenStream,t_9)[t_9]),10));
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<596>";
					var t_10=t_index+2;
					dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingSize).f_x=(parseInt((dbg_array(t_tokenStream,t_10)[t_10]),10));
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<597>";
					var t_11=t_index+3;
					dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingSize).f_y=(parseInt((dbg_array(t_tokenStream,t_11)[t_11]),10));
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<598>";
					var t_12=t_index+4;
					dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingWidth=(parseInt((dbg_array(t_tokenStream,t_12)[t_12]),10));
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<599>";
					if(t_dynamicLoad==false){
						err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<600>";
						dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_image=bb_graphics_LoadImage(t_prefixName+"_"+String(t_char)+".png",1,bb_graphics_Image_DefaultFlags);
						err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<601>";
						dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_image.m_SetHandle(-dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_x,-dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_y);
					}else{
						err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<603>";
						dbg_array(this.f_faceChars,t_char)[t_char].m_SetImageResourceName(t_prefixName+"_"+String(t_char)+".png");
					}
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<605>";
					t_index+=5;
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<606>";
					t_index+=1;
				}else{
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<609>";
					print("Error loading font! Char = "+String(t_char));
				}
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<613>";
	this.f_borderChars=this.f_borderChars.slice(0,t_char+1);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<614>";
	this.f_faceChars=this.f_faceChars.slice(0,t_char+1);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<615>";
	this.f_shadowChars=this.f_shadowChars.slice(0,t_char+1);
	pop_err();
	return 0;
}
function bb_bitmapfont_BitmapFont_new(t_fontDescriptionFilePath,t_dynamicLoad){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<45>";
	var t_text=bb_app_LoadString(t_fontDescriptionFilePath);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<46>";
	if(t_text==""){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<46>";
		print("FONT "+t_fontDescriptionFilePath+" WAS NOT FOUND!!!");
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<47>";
	this.m_LoadFontData(t_text,t_fontDescriptionFilePath,t_dynamicLoad);
	pop_err();
	return this;
}
function bb_bitmapfont_BitmapFont_new2(t_fontDescriptionFilePath){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<55>";
	var t_text=bb_app_LoadString(t_fontDescriptionFilePath);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<56>";
	if(t_text==""){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<56>";
		print("FONT "+t_fontDescriptionFilePath+" WAS NOT FOUND!!!");
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<57>";
	this.m_LoadFontData(t_text,t_fontDescriptionFilePath,true);
	pop_err();
	return this;
}
function bb_bitmapfont_BitmapFont_new3(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<28>";
	pop_err();
	return this;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawShadow=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<66>";
	pop_err();
	return this.f__drawShadow;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawShadow2=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<70>";
	this.f__drawShadow=t_value;
	pop_err();
	return 0;
}
bb_bitmapfont_BitmapFont.prototype.m_Kerning=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<747>";
	if(this.f__kerning==null){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<747>";
		this.f__kerning=bb_drawingpoint_DrawingPoint_new.call(new bb_drawingpoint_DrawingPoint);
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<748>";
	pop_err();
	return this.f__kerning;
}
bb_bitmapfont_BitmapFont.prototype.m_Kerning2=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<752>";
	this.f__kerning=t_value;
	pop_err();
}
bb_bitmapfont_BitmapFont.prototype.m_GetTxtWidth=function(t_text,t_fromChar,t_toChar){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<292>";
	var t_twidth=.0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<293>";
	var t_MaxWidth=0.0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<294>";
	var t_char=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<295>";
	var t_lastchar=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<297>";
	for(var t_i=t_fromChar;t_i<=t_toChar;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<298>";
		t_char=t_text.charCodeAt(t_i-1);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<299>";
		if(t_char>=0 && t_char<this.f_faceChars.length && t_char!=10 && t_char!=13){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<300>";
			if(dbg_array(this.f_faceChars,t_char)[t_char]!=null){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<301>";
				t_lastchar=t_char;
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<302>";
				t_twidth=t_twidth+dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingWidth+dbg_object(this.m_Kerning()).f_x;
			}
		}else{
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<304>";
			if(t_char==10){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<305>";
				if(bb_math_Abs2(t_MaxWidth)<bb_math_Abs2(t_twidth)){
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<305>";
					t_MaxWidth=t_twidth-dbg_object(this.m_Kerning()).f_x-dbg_object(dbg_object(dbg_array(this.f_faceChars,t_lastchar)[t_lastchar]).f_drawingMetrics).f_drawingWidth+dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_lastchar)[t_lastchar]).f_drawingMetrics).f_drawingSize).f_x;
				}
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<306>";
				t_twidth=0.0;
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<307>";
				t_lastchar=t_char;
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<310>";
	if(t_lastchar>=0 && t_lastchar<this.f_faceChars.length){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<311>";
		if(t_lastchar==32){
		}else{
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<313>";
			if(dbg_array(this.f_faceChars,t_lastchar)[t_lastchar]!=null){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<314>";
				t_twidth=t_twidth-dbg_object(dbg_object(dbg_array(this.f_faceChars,t_lastchar)[t_lastchar]).f_drawingMetrics).f_drawingWidth;
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<315>";
				t_twidth=t_twidth+dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,t_lastchar)[t_lastchar]).f_drawingMetrics).f_drawingSize).f_x;
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<318>";
	if(bb_math_Abs2(t_MaxWidth)<bb_math_Abs2(t_twidth)){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<318>";
		t_MaxWidth=t_twidth-dbg_object(this.m_Kerning()).f_x;
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<319>";
	pop_err();
	return t_MaxWidth;
}
bb_bitmapfont_BitmapFont.prototype.m_GetTxtWidth2=function(t_text){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<283>";
	var t_=this.m_GetTxtWidth(t_text,1,t_text.length);
	pop_err();
	return t_;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawCharsText=function(t_text,t_x,t_y,t_target,t_align,t_startPos){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<699>";
	var t_drx=t_x;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<699>";
	var t_dry=t_y;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<700>";
	var t_oldX=t_x;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<701>";
	var t_xOffset=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<704>";
	if(t_align!=1){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<705>";
		var t_lineSepPos=t_text.indexOf("\n",t_startPos);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<706>";
		if(t_lineSepPos<0){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<706>";
			t_lineSepPos=t_text.length;
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<707>";
		var t_4=t_align;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<708>";
		if(t_4==2){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<708>";
			t_xOffset=((this.m_GetTxtWidth(t_text,t_startPos,t_lineSepPos)/2.0)|0);
		}else{
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<709>";
			if(t_4==3){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<709>";
				t_xOffset=((this.m_GetTxtWidth(t_text,t_startPos,t_lineSepPos))|0);
			}
		}
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<713>";
	for(var t_i=t_startPos;t_i<=t_text.length;t_i=t_i+1){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<714>";
		var t_char=t_text.charCodeAt(t_i-1);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<715>";
		if(t_char>=0 && t_char<=t_target.length){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<716>";
			if(t_char==10){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<717>";
				t_dry+=dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,32)[32]).f_drawingMetrics).f_drawingSize).f_y+dbg_object(this.m_Kerning()).f_y;
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<718>";
				this.m_DrawCharsText(t_text,t_oldX,t_dry,t_target,t_align,t_i+1);
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<719>";
				pop_err();
				return 0;
			}else{
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<720>";
				if(dbg_array(t_target,t_char)[t_char]!=null){
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<721>";
					if(dbg_array(t_target,t_char)[t_char].m_CharImageLoaded()==false){
						err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<722>";
						dbg_array(t_target,t_char)[t_char].m_LoadCharImage();
					}
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<724>";
					if(dbg_object(dbg_array(t_target,t_char)[t_char]).f_image!=null){
						err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<725>";
						bb_graphics_DrawImage(dbg_object(dbg_array(t_target,t_char)[t_char]).f_image,t_drx-(t_xOffset),t_dry,0);
					}else{
						err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<726>";
						if(dbg_object(dbg_array(t_target,t_char)[t_char]).f_packedFontIndex>0){
							err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<727>";
							var t_=dbg_object(dbg_array(t_target,t_char)[t_char]).f_packedFontIndex;
							bb_graphics_DrawImageRect(dbg_array(this.f_packedImages,t_)[t_],(-t_xOffset)+t_drx+dbg_object(dbg_object(dbg_object(dbg_array(t_target,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_x,t_dry+dbg_object(dbg_object(dbg_object(dbg_array(t_target,t_char)[t_char]).f_drawingMetrics).f_drawingOffset).f_y,((dbg_object(dbg_object(dbg_array(t_target,t_char)[t_char]).f_packedPosition).f_x)|0),((dbg_object(dbg_object(dbg_array(t_target,t_char)[t_char]).f_packedPosition).f_y)|0),((dbg_object(dbg_object(dbg_array(t_target,t_char)[t_char]).f_packedSize).f_x)|0),((dbg_object(dbg_object(dbg_array(t_target,t_char)[t_char]).f_packedSize).f_y)|0),0);
						}
					}
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<729>";
					t_drx+=dbg_object(dbg_object(dbg_array(this.f_faceChars,t_char)[t_char]).f_drawingMetrics).f_drawingWidth+dbg_object(this.m_Kerning()).f_x;
				}
			}
		}
	}
	pop_err();
	return 0;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawCharsText2=function(t_text,t_x,t_y,t_mode,t_align){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<686>";
	if(t_mode==1){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<687>";
		this.m_DrawCharsText(t_text,t_x,t_y,this.f_borderChars,t_align,1);
	}else{
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<688>";
		if(t_mode==0){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<689>";
			this.m_DrawCharsText(t_text,t_x,t_y,this.f_faceChars,t_align,1);
		}else{
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<691>";
			this.m_DrawCharsText(t_text,t_x,t_y,this.f_shadowChars,t_align,1);
		}
	}
	pop_err();
	return 0;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawBorder=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<79>";
	pop_err();
	return this.f__drawBorder;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawBorder2=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<83>";
	this.f__drawBorder=t_value;
	pop_err();
	return 0;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawText=function(t_text,t_x,t_y,t_align){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<187>";
	if(this.m_DrawShadow()){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<187>";
		this.m_DrawCharsText2(t_text,t_x,t_y,2,t_align);
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<188>";
	if(this.m_DrawBorder()){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<188>";
		this.m_DrawCharsText2(t_text,t_x,t_y,1,t_align);
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<189>";
	this.m_DrawCharsText2(t_text,t_x,t_y,0,t_align);
	pop_err();
	return 0;
}
bb_bitmapfont_BitmapFont.prototype.m_SplitLines=function(t__text,t__width){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<248>";
	var t_Tai_textdata=t__text.split(" ");
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<254>";
	var t_Tai_tmptext="";
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<255>";
	var t_Tai_words=t_Tai_textdata.length;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<256>";
	var t_Tai_textlines=new_string_array(t_Tai_words);
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<258>";
	var t_Tai_line=0;
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<260>";
	for(var t_Tai_word=0;t_Tai_word<=t_Tai_words-1;t_Tai_word=t_Tai_word+1){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<262>";
		t_Tai_tmptext=t_Tai_tmptext+(dbg_array(t_Tai_textdata,t_Tai_word)[t_Tai_word]+" ");
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<264>";
		if(this.m_GetTxtWidth2(t_Tai_tmptext)<(t__width)){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<265>";
			dbg_array(t_Tai_textlines,t_Tai_line)[t_Tai_line]=t_Tai_tmptext
		}else{
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<267>";
			t_Tai_line+=1;
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<268>";
			t_Tai_tmptext=dbg_array(t_Tai_textdata,t_Tai_word)[t_Tai_word]+" ";
		}
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<273>";
	pop_err();
	return t_Tai_textlines;
}
bb_bitmapfont_BitmapFont.prototype.m_GetFontHeight=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<343>";
	if(dbg_array(this.f_faceChars,32)[32]==null){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<343>";
		pop_err();
		return 0;
	}
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<344>";
	var t_=((dbg_object(dbg_object(dbg_object(dbg_array(this.f_faceChars,32)[32]).f_drawingMetrics).f_drawingSize).f_y)|0);
	pop_err();
	return t_;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawText2=function(t_text,t_x,t_y,t_align,t_Tai_width){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<210>";
	var t_Tai_TextLines=[];
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<212>";
	if(this.m_GetTxtWidth2(t_text)>(t_Tai_width)){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<214>";
		t_Tai_TextLines=this.m_SplitLines(t_text,t_Tai_width);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<217>";
		var t_Tai_Drop=this.m_GetFontHeight();
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<219>";
		var t_Tai_Count=0;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<221>";
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<221>";
		var t_=t_Tai_TextLines;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<221>";
		var t_2=0;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<221>";
		while(t_2<t_.length){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<221>";
			var t_Tai_CurLine=dbg_array(t_,t_2)[t_2];
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<221>";
			t_2=t_2+1;
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<222>";
			if(t_Tai_CurLine!=""){
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<223>";
				if(this.m_DrawShadow()){
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<223>";
					this.m_DrawCharsText2(t_Tai_CurLine,t_x,t_y+(t_Tai_Count*t_Tai_Drop),2,t_align);
				}
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<224>";
				if(this.m_DrawBorder()){
					err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<224>";
					this.m_DrawCharsText2(t_Tai_CurLine,t_x,t_y+(t_Tai_Count*t_Tai_Drop),1,t_align);
				}
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<225>";
				this.m_DrawCharsText2(t_Tai_CurLine,t_x,t_y+(t_Tai_Count*t_Tai_Drop),0,t_align);
				err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<226>";
				t_Tai_Count+=1;
			}
		}
	}else{
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<231>";
		if(this.m_DrawShadow()){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<231>";
			this.m_DrawCharsText2(t_text,t_x,t_y,2,t_align);
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<232>";
		if(this.m_DrawBorder()){
			err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<232>";
			this.m_DrawCharsText2(t_text,t_x,t_y,1,t_align);
		}
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<233>";
		this.m_DrawCharsText2(t_text,t_x,t_y,0,t_align);
	}
	pop_err();
	return 0;
}
bb_bitmapfont_BitmapFont.prototype.m_DrawText3=function(t_text,t_x,t_y){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapfont.monkey<197>";
	this.m_DrawText(t_text,t_x,t_y,1);
	pop_err();
	return 0;
}
function bb_bitmapchar_BitMapChar(){
	Object.call(this);
	this.f_packedFontIndex=0;
	this.f_packedPosition=bb_drawingpoint_DrawingPoint_new.call(new bb_drawingpoint_DrawingPoint);
	this.f_packedSize=bb_drawingpoint_DrawingPoint_new.call(new bb_drawingpoint_DrawingPoint);
	this.f_drawingMetrics=bb_bitmapcharmetrics_BitMapCharMetrics_new.call(new bb_bitmapcharmetrics_BitMapCharMetrics);
	this.f_image=null;
	this.f_imageResourceName="";
	this.f_imageResourceNameBackup="";
}
function bb_bitmapchar_BitMapChar_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<15>";
	pop_err();
	return this;
}
bb_bitmapchar_BitMapChar.prototype.m_SetImageResourceName=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<46>";
	this.f_imageResourceName=t_value;
	pop_err();
	return 0;
}
bb_bitmapchar_BitMapChar.prototype.m_CharImageLoaded=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<42>";
	if(this.f_image==null && this.f_imageResourceName!=""){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<42>";
		pop_err();
		return false;
	}else{
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<42>";
		pop_err();
		return true;
	}
}
bb_bitmapchar_BitMapChar.prototype.m_LoadCharImage=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<30>";
	if(this.m_CharImageLoaded()==false){
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<31>";
		this.f_image=bb_graphics_LoadImage(this.f_imageResourceName,1,bb_graphics_Image_DefaultFlags);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<32>";
		this.f_image.m_SetHandle(-dbg_object(dbg_object(dbg_object(this).f_drawingMetrics).f_drawingOffset).f_x,-dbg_object(dbg_object(dbg_object(this).f_drawingMetrics).f_drawingOffset).f_y);
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<33>";
		this.f_imageResourceNameBackup=this.f_imageResourceName;
		err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapchar.monkey<34>";
		this.f_imageResourceName="";
	}
	pop_err();
	return 0;
}
function bb_drawingpoint_DrawingPoint(){
	Object.call(this);
	this.f_x=.0;
	this.f_y=.0;
}
function bb_drawingpoint_DrawingPoint_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/drawingpoint.monkey<8>";
	pop_err();
	return this;
}
function bb_bitmapcharmetrics_BitMapCharMetrics(){
	Object.call(this);
	this.f_drawingOffset=bb_drawingpoint_DrawingPoint_new.call(new bb_drawingpoint_DrawingPoint);
	this.f_drawingSize=bb_drawingpoint_DrawingPoint_new.call(new bb_drawingpoint_DrawingPoint);
	this.f_drawingWidth=.0;
}
function bb_bitmapcharmetrics_BitMapCharMetrics_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/fontmachine/bitmapcharmetrics.monkey<12>";
	pop_err();
	return this;
}
var bb_main_TitleFont;
var bb_main_InfoFont;
var bb_main_SmallFont;
var bb_main_HighlightFont;
function bb_title_screen_TitleScreen(){
	bb_framework_Screen.call(this);
	this.f_background=null;
	this.f_selected=0;
	this.f_Icons=new_object_array(20);
	this.f_Thumbs=new_object_array(20);
}
bb_title_screen_TitleScreen.prototype=extend_class(bb_framework_Screen);
function bb_title_screen_TitleScreen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<28>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<29>";
	this.f_name="Main Screen";
	pop_err();
	return this;
}
bb_title_screen_TitleScreen.prototype.m_LoadGames=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<199>";
	var t_input=bb_app_LoadString("gamelist.txt");
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<200>";
	var t_count=0;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<202>";
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<202>";
	var t_=t_input.split(";");
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<202>";
	var t_2=0;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<202>";
	while(t_2<t_.length){
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<202>";
		var t_cutter=dbg_array(t_,t_2)[t_2];
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<202>";
		t_2=t_2+1;
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<203>";
		var t_inner=t_cutter.split(",");
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<205>";
		if(t_count<=19){
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<207>";
			dbg_object(dbg_array(bb_title_screen_GameList,t_count)[t_count]).f_id=parseInt((dbg_array(t_inner,0)[0]),10);
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<208>";
			dbg_object(dbg_array(bb_title_screen_GameList,t_count)[t_count]).f_name=dbg_array(t_inner,1)[1];
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<209>";
			dbg_object(dbg_array(bb_title_screen_GameList,t_count)[t_count]).f_iconname=dbg_array(t_inner,2)[2];
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<210>";
			dbg_object(dbg_array(bb_title_screen_GameList,t_count)[t_count]).f_thumbnail=dbg_array(t_inner,3)[3];
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<211>";
			dbg_object(dbg_array(bb_title_screen_GameList,t_count)[t_count]).f_author=dbg_array(t_inner,4)[4];
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<212>";
			dbg_object(dbg_array(bb_title_screen_GameList,t_count)[t_count]).f_authorurl=dbg_array(t_inner,5)[5];
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<213>";
			dbg_object(dbg_array(bb_title_screen_GameList,t_count)[t_count]).f_info=dbg_array(t_inner,6)[6];
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<215>";
			dbg_array(dbg_object(this).f_Icons,t_count)[t_count]=dbg_object(bb_framework_game).f_images.m_Find("game"+String(t_count+1)+"_icon")
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<216>";
			dbg_array(dbg_object(this).f_Thumbs,t_count)[t_count]=dbg_object(bb_framework_game).f_images.m_Find("game"+String(t_count+1)+"_thumb")
		}
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<219>";
		t_count+=1;
	}
	pop_err();
}
bb_title_screen_TitleScreen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<36>";
	this.f_background=dbg_object(bb_framework_game).f_images.m_Find("title");
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<37>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<39>";
	for(var t_init=0;t_init<=19;t_init=t_init+1){
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<40>";
		dbg_array(bb_title_screen_GameList,t_init)[t_init]=bb_title_screen_miniGame_new.call(new bb_title_screen_miniGame)
	}
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<43>";
	this.f_selected=0;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<45>";
	this.m_LoadGames();
	pop_err();
}
bb_title_screen_TitleScreen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<54>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<55>";
	bb_graphics_DrawImage(dbg_object(this.f_background).f_image,0.0,0.0,0);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<57>";
	bb_graphics_DrawImage(dbg_object(dbg_array(dbg_object(this).f_Thumbs,dbg_object(this).f_selected)[dbg_object(this).f_selected]).f_image,345.0,214.0,0);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<60>";
	for(var t_row=0;t_row<=4;t_row=t_row+1){
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<61>";
		for(var t_col=0;t_col<=3;t_col=t_col+1){
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<63>";
			if(dbg_object(this).f_selected==t_row*4+t_col){
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<64>";
				var t_=t_row*4+t_col;
				bb_graphics_DrawImage(dbg_object(dbg_array(dbg_object(this).f_Icons,t_)[t_]).f_image,(72+t_col*58),(175+t_row*58),0);
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<65>";
				bb_main_HighlightFont.m_DrawText3(dbg_object(dbg_array(bb_title_screen_GameList,dbg_object(this).f_selected)[dbg_object(this).f_selected]).f_name,(49+t_col*58),(201+t_row*58));
			}else{
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<67>";
				var t_2=t_row*4+t_col;
				bb_graphics_DrawImage(dbg_object(dbg_array(dbg_object(this).f_Icons,t_2)[t_2]).f_image,(72+t_col*58),(182+t_row*58),0);
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<68>";
				var t_3=t_row*4+t_col;
				bb_main_SmallFont.m_DrawText3(dbg_object(dbg_array(bb_title_screen_GameList,t_3)[t_3]).f_name,(49+t_col*58),(201+t_row*58));
			}
		}
	}
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<74>";
	var t_stp=150;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<75>";
	var t_gap=20;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<77>";
	bb_main_TitleFont.m_DrawText("Game    : ",403.0,(t_stp),1);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<78>";
	t_stp+=t_gap;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<79>";
	bb_main_InfoFont.m_DrawText("  "+dbg_object(dbg_array(bb_title_screen_GameList,dbg_object(this).f_selected)[dbg_object(this).f_selected]).f_name,403.0,(t_stp),1);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<80>";
	t_stp+=t_gap;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<81>";
	bb_main_TitleFont.m_DrawText("Author  : ",403.0,(t_stp),1);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<82>";
	t_stp+=t_gap;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<83>";
	bb_main_InfoFont.m_DrawText("  "+dbg_object(dbg_array(bb_title_screen_GameList,dbg_object(this).f_selected)[dbg_object(this).f_selected]).f_author,403.0,(t_stp),1);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<85>";
	t_stp+=t_gap;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<86>";
	bb_main_TitleFont.m_DrawText("Website : ",403.0,(t_stp),1);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<87>";
	t_stp+=t_gap;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<88>";
	bb_main_InfoFont.m_DrawText("  "+dbg_object(dbg_array(bb_title_screen_GameList,dbg_object(this).f_selected)[dbg_object(this).f_selected]).f_authorurl,403.0,(t_stp),1);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<90>";
	t_stp=272;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<91>";
	bb_main_TitleFont.m_DrawText("Game Info",295.0,(t_stp),1);
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<93>";
	t_stp+=t_gap;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<94>";
	bb_main_InfoFont.m_DrawText2(dbg_object(dbg_array(bb_title_screen_GameList,dbg_object(this).f_selected)[dbg_object(this).f_selected]).f_info,295.0,(t_stp),1,308);
	pop_err();
}
bb_title_screen_TitleScreen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<109>";
	for(var t_row=0;t_row<=4;t_row=t_row+1){
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<110>";
		for(var t_col=0;t_col<=3;t_col=t_col+1){
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<111>";
			var t_current=t_row*4+t_col;
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<113>";
			if(bb_title_screen_MouseOver(47+t_col*58,157+t_row*58,58,58) && ((bb_input_TouchHit(0))!=0)){
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<114>";
				dbg_object(this).f_selected=t_current;
			}
		}
	}
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<121>";
	if(bb_title_screen_MouseOver(399,406,93,45)){
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<123>";
		if(((bb_input_TouchHit(0))!=0) || ((bb_input_MouseHit(0))!=0)){
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<125>";
			var t_1=dbg_object(this).f_selected+1;
			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<126>";
			if(t_1==1){
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<127>";
				dbg_object(bb_framework_game).f_nextScreen=bb_main_Game1Scr;
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<128>";
				dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
			}else{
				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<129>";
				if(t_1==2){
					err_info="D:/Dropbox/monkeytouch/title_screen.monkey<130>";
					dbg_object(bb_framework_game).f_nextScreen=bb_main_Game2Scr;
					err_info="D:/Dropbox/monkeytouch/title_screen.monkey<131>";
					dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
				}else{
					err_info="D:/Dropbox/monkeytouch/title_screen.monkey<132>";
					if(t_1==3){
						err_info="D:/Dropbox/monkeytouch/title_screen.monkey<133>";
						dbg_object(bb_framework_game).f_nextScreen=bb_main_Game3Scr;
						err_info="D:/Dropbox/monkeytouch/title_screen.monkey<134>";
						dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
					}else{
						err_info="D:/Dropbox/monkeytouch/title_screen.monkey<135>";
						if(t_1==4){
							err_info="D:/Dropbox/monkeytouch/title_screen.monkey<136>";
							dbg_object(bb_framework_game).f_nextScreen=bb_main_Game4Scr;
							err_info="D:/Dropbox/monkeytouch/title_screen.monkey<137>";
							dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
						}else{
							err_info="D:/Dropbox/monkeytouch/title_screen.monkey<138>";
							if(t_1==5){
								err_info="D:/Dropbox/monkeytouch/title_screen.monkey<139>";
								dbg_object(bb_framework_game).f_nextScreen=bb_main_Game5Scr;
								err_info="D:/Dropbox/monkeytouch/title_screen.monkey<140>";
								dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
							}else{
								err_info="D:/Dropbox/monkeytouch/title_screen.monkey<141>";
								if(t_1==6){
									err_info="D:/Dropbox/monkeytouch/title_screen.monkey<142>";
									dbg_object(bb_framework_game).f_nextScreen=bb_main_Game6Scr;
									err_info="D:/Dropbox/monkeytouch/title_screen.monkey<143>";
									dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
								}else{
									err_info="D:/Dropbox/monkeytouch/title_screen.monkey<144>";
									if(t_1==7){
										err_info="D:/Dropbox/monkeytouch/title_screen.monkey<145>";
										dbg_object(bb_framework_game).f_nextScreen=bb_main_Game7Scr;
										err_info="D:/Dropbox/monkeytouch/title_screen.monkey<146>";
										dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
									}else{
										err_info="D:/Dropbox/monkeytouch/title_screen.monkey<147>";
										if(t_1==8){
											err_info="D:/Dropbox/monkeytouch/title_screen.monkey<148>";
											dbg_object(bb_framework_game).f_nextScreen=bb_main_Game8Scr;
											err_info="D:/Dropbox/monkeytouch/title_screen.monkey<149>";
											dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
										}else{
											err_info="D:/Dropbox/monkeytouch/title_screen.monkey<150>";
											if(t_1==9){
												err_info="D:/Dropbox/monkeytouch/title_screen.monkey<151>";
												dbg_object(bb_framework_game).f_nextScreen=bb_main_Game9Scr;
												err_info="D:/Dropbox/monkeytouch/title_screen.monkey<152>";
												dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
											}else{
												err_info="D:/Dropbox/monkeytouch/title_screen.monkey<153>";
												if(t_1==10){
													err_info="D:/Dropbox/monkeytouch/title_screen.monkey<154>";
													dbg_object(bb_framework_game).f_nextScreen=bb_main_Game10Scr;
													err_info="D:/Dropbox/monkeytouch/title_screen.monkey<155>";
													dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
												}else{
													err_info="D:/Dropbox/monkeytouch/title_screen.monkey<156>";
													if(t_1==11){
														err_info="D:/Dropbox/monkeytouch/title_screen.monkey<157>";
														dbg_object(bb_framework_game).f_nextScreen=bb_main_Game11Scr;
														err_info="D:/Dropbox/monkeytouch/title_screen.monkey<158>";
														dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
													}else{
														err_info="D:/Dropbox/monkeytouch/title_screen.monkey<159>";
														if(t_1==12){
															err_info="D:/Dropbox/monkeytouch/title_screen.monkey<160>";
															dbg_object(bb_framework_game).f_nextScreen=bb_main_Game12Scr;
															err_info="D:/Dropbox/monkeytouch/title_screen.monkey<161>";
															dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
														}else{
															err_info="D:/Dropbox/monkeytouch/title_screen.monkey<162>";
															if(t_1==13){
																err_info="D:/Dropbox/monkeytouch/title_screen.monkey<163>";
																dbg_object(bb_framework_game).f_nextScreen=bb_main_Game13Scr;
																err_info="D:/Dropbox/monkeytouch/title_screen.monkey<164>";
																dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
															}else{
																err_info="D:/Dropbox/monkeytouch/title_screen.monkey<165>";
																if(t_1==14){
																	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<166>";
																	dbg_object(bb_framework_game).f_nextScreen=bb_main_Game14Scr;
																	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<167>";
																	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
																}else{
																	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<168>";
																	if(t_1==15){
																		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<169>";
																		dbg_object(bb_framework_game).f_nextScreen=bb_main_Game15Scr;
																		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<170>";
																		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
																	}else{
																		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<171>";
																		if(t_1==16){
																			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<172>";
																			dbg_object(bb_framework_game).f_nextScreen=bb_main_Game16Scr;
																			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<173>";
																			dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
																		}else{
																			err_info="D:/Dropbox/monkeytouch/title_screen.monkey<174>";
																			if(t_1==17){
																				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<175>";
																				dbg_object(bb_framework_game).f_nextScreen=bb_main_Game17Scr;
																				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<176>";
																				dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
																			}else{
																				err_info="D:/Dropbox/monkeytouch/title_screen.monkey<177>";
																				if(t_1==18){
																					err_info="D:/Dropbox/monkeytouch/title_screen.monkey<178>";
																					dbg_object(bb_framework_game).f_nextScreen=bb_main_Game18Scr;
																					err_info="D:/Dropbox/monkeytouch/title_screen.monkey<179>";
																					dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
																				}else{
																					err_info="D:/Dropbox/monkeytouch/title_screen.monkey<180>";
																					if(t_1==19){
																						err_info="D:/Dropbox/monkeytouch/title_screen.monkey<181>";
																						dbg_object(bb_framework_game).f_nextScreen=bb_main_Game19Scr;
																						err_info="D:/Dropbox/monkeytouch/title_screen.monkey<182>";
																						dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
																					}else{
																						err_info="D:/Dropbox/monkeytouch/title_screen.monkey<183>";
																						if(t_1==20){
																							err_info="D:/Dropbox/monkeytouch/title_screen.monkey<184>";
																							dbg_object(bb_framework_game).f_nextScreen=bb_main_Game20Scr;
																							err_info="D:/Dropbox/monkeytouch/title_screen.monkey<185>";
																							dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	pop_err();
}
var bb_main_TitleScr;
function bb_functions_ExitApp(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/functions.monkey<139>";
	error("");
	pop_err();
}
function bb_collections_ListEnumerator(){
	bb_collections_IEnumerator.call(this);
	this.f_lst=null;
	this.f_expectedModCount=0;
	this.f_index=0;
	this.f_lastIndex=0;
}
bb_collections_ListEnumerator.prototype=extend_class(bb_collections_IEnumerator);
function bb_collections_ListEnumerator_new(t_lst){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<233>";
	bb_collections_IEnumerator_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<234>";
	dbg_object(this).f_lst=t_lst;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<235>";
	this.f_expectedModCount=dbg_object(t_lst).f_modCount;
	pop_err();
	return this;
}
function bb_collections_ListEnumerator_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<219>";
	bb_collections_IEnumerator_new.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<219>";
	pop_err();
	return this;
}
bb_collections_ListEnumerator.prototype.m_CheckConcurrency=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<228>";
	if(dbg_object(this.f_lst).f_modCount!=this.f_expectedModCount){
		err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<228>";
		bb_assert_AssertError("ListEnumerator.CheckConcurrency: Concurrent list modification");
	}
	pop_err();
}
bb_collections_ListEnumerator.prototype.m_HasNext=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<241>";
	this.m_CheckConcurrency();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<242>";
	var t_=this.f_index<this.f_lst.m_Size();
	pop_err();
	return t_;
}
bb_collections_ListEnumerator.prototype.m_NextObject=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<253>";
	this.m_CheckConcurrency();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<254>";
	this.f_lastIndex=this.f_index;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<255>";
	this.f_index+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<256>";
	var t_=this.f_lst.m_Get2(this.f_lastIndex);
	pop_err();
	return t_;
}
function bb_collections_ArrayListEnumerator(){
	bb_collections_ListEnumerator.call(this);
	this.f_alst=null;
}
bb_collections_ArrayListEnumerator.prototype=extend_class(bb_collections_ListEnumerator);
function bb_collections_ArrayListEnumerator_new(t_lst){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<306>";
	bb_collections_ListEnumerator_new.call(this,(t_lst));
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<307>";
	dbg_object(this).f_alst=t_lst;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<308>";
	this.f_expectedModCount=dbg_object(this.f_alst).f_modCount;
	pop_err();
	return this;
}
function bb_collections_ArrayListEnumerator_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<299>";
	bb_collections_ListEnumerator_new2.call(this);
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<299>";
	pop_err();
	return this;
}
bb_collections_ArrayListEnumerator.prototype.m_HasNext=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<314>";
	this.m_CheckConcurrency();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<315>";
	var t_=this.f_index<dbg_object(this.f_alst).f_size;
	pop_err();
	return t_;
}
bb_collections_ArrayListEnumerator.prototype.m_NextObject=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<320>";
	this.m_CheckConcurrency();
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<321>";
	this.f_lastIndex=this.f_index;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<322>";
	this.f_index+=1;
	err_info="D:/Code/MonkeyPro/modules/diddy/collections.monkey<323>";
	var t_=object_downcast((dbg_array(dbg_object(this.f_alst).f_elements,this.f_lastIndex)[this.f_lastIndex]),bb_xml_XMLElement);
	pop_err();
	return t_;
}
function bb_map_MapKeys(){
	Object.call(this);
	this.f_map=null;
}
function bb_map_MapKeys_new(t_map){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<503>";
	dbg_object(this).f_map=t_map;
	pop_err();
	return this;
}
function bb_map_MapKeys_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<500>";
	pop_err();
	return this;
}
bb_map_MapKeys.prototype.m_ObjectEnumerator=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<507>";
	var t_=bb_map_KeyEnumerator_new.call(new bb_map_KeyEnumerator,this.f_map.m_FirstNode());
	pop_err();
	return t_;
}
function bb_map_KeyEnumerator(){
	Object.call(this);
	this.f_node=null;
}
function bb_map_KeyEnumerator_new(t_node){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<459>";
	dbg_object(this).f_node=t_node;
	pop_err();
	return this;
}
function bb_map_KeyEnumerator_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<456>";
	pop_err();
	return this;
}
bb_map_KeyEnumerator.prototype.m_HasNext=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<463>";
	var t_=this.f_node!=null;
	pop_err();
	return t_;
}
bb_map_KeyEnumerator.prototype.m_NextObject=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<467>";
	var t_t=this.f_node;
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<468>";
	this.f_node=this.f_node.m_NextNode();
	err_info="D:/Code/MonkeyPro/modules/monkey/map.monkey<469>";
	pop_err();
	return dbg_object(t_t).f_key;
}
function bb_title_screen_miniGame(){
	Object.call(this);
	this.f_id=0;
	this.f_name="";
	this.f_iconname="";
	this.f_thumbnail="";
	this.f_author="";
	this.f_authorurl="";
	this.f_info="";
}
function bb_title_screen_miniGame_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<235>";
	pop_err();
	return this;
}
var bb_title_screen_GameList;
function bb_edrawmode_eDrawMode(){
	Object.call(this);
}
function bb_edrawalign_eDrawAlign(){
	Object.call(this);
}
function bb_math_Abs(t_x){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<46>";
	if(t_x>=0){
		err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<46>";
		pop_err();
		return t_x;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<47>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_math_Abs2(t_x){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<73>";
	if(t_x>=0.0){
		err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<73>";
		pop_err();
		return t_x;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/math.monkey<74>";
	var t_=-t_x;
	pop_err();
	return t_;
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<509>";
	bb_graphics_DebugRenderDevice();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<511>";
	var t_f=dbg_array(dbg_object(t_image).f_frames,t_frame)[t_frame];
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<513>";
	if((dbg_object(bb_graphics_context).f_tformed)!=0){
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<514>";
		bb_graphics_PushMatrix();
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<517>";
		bb_graphics_Translate(-dbg_object(t_image).f_tx+t_x,-dbg_object(t_image).f_ty+t_y);
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<519>";
		bb_graphics_ValidateMatrix();
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<521>";
		dbg_object(bb_graphics_context).f_device.DrawSurface2(dbg_object(t_image).f_surface,0.0,0.0,t_srcX+dbg_object(t_f).f_x,t_srcY+dbg_object(t_f).f_y,t_srcWidth,t_srcHeight);
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<523>";
		bb_graphics_PopMatrix();
	}else{
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<525>";
		bb_graphics_ValidateMatrix();
		err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<527>";
		dbg_object(bb_graphics_context).f_device.DrawSurface2(dbg_object(t_image).f_surface,-dbg_object(t_image).f_tx+t_x,-dbg_object(t_image).f_ty+t_y,t_srcX+dbg_object(t_f).f_x,t_srcY+dbg_object(t_f).f_y,t_srcWidth,t_srcHeight);
	}
	pop_err();
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<533>";
	bb_graphics_DebugRenderDevice();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<535>";
	var t_f=dbg_array(dbg_object(t_image).f_frames,t_frame)[t_frame];
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<537>";
	bb_graphics_PushMatrix();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<539>";
	bb_graphics_Translate(t_x,t_y);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<540>";
	bb_graphics_Rotate(t_rotation);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<541>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<542>";
	bb_graphics_Translate(-dbg_object(t_image).f_tx,-dbg_object(t_image).f_ty);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<544>";
	bb_graphics_ValidateMatrix();
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<546>";
	dbg_object(bb_graphics_context).f_device.DrawSurface2(dbg_object(t_image).f_surface,0.0,0.0,t_srcX+dbg_object(t_f).f_x,t_srcY+dbg_object(t_f).f_y,t_srcWidth,t_srcHeight);
	err_info="D:/Code/MonkeyPro/modules/mojo/graphics.monkey<548>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_title_screen_MouseOver(t__x,t__y,t__w,t__h){
	push_err();
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<248>";
	var t_result=false;
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<250>";
	if(bb_input_TouchX(0)>(t__x) && bb_input_TouchX(0)<(t__x+t__w) && bb_input_TouchY(0)>(t__y) && bb_input_TouchY(0)<(t__y+t__h)){
		err_info="D:/Dropbox/monkeytouch/title_screen.monkey<251>";
		t_result=true;
	}
	err_info="D:/Dropbox/monkeytouch/title_screen.monkey<254>";
	pop_err();
	return t_result;
}
function bb_game1_Game1Screen(){
	bb_framework_Screen.call(this);
	this.f_background=null;
}
bb_game1_Game1Screen.prototype=extend_class(bb_framework_Screen);
function bb_game1_Game1Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<53>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<54>";
	this.f_name="Game 1 Screen";
	pop_err();
	return this;
}
bb_game1_Game1Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<61>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<62>";
	this.f_background=bb_graphics_LoadImage("graphics/game1/bg.png",1,bb_graphics_Image_DefaultFlags);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<63>";
	bb_game1_TaiPlayer=bb_game1_Tai_Player_new.call(new bb_game1_Tai_Player,320,3);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<64>";
	bb_game1_TaiWave=1;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<65>";
	bb_game1_CreateWave();
	pop_err();
}
bb_game1_Game1Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<74>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<75>";
	bb_graphics_DrawImage(this.f_background,0.0,0.0,0);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<76>";
	bb_main_TitleFont.m_DrawText("Taiphoz Invaders",320.0,240.0,2);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<77>";
	bb_main_TitleFont.m_DrawText("Score : "+String(dbg_object(bb_game1_TaiPlayer).f_score),1.0,1.0,1);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<78>";
	bb_main_TitleFont.m_DrawText(String(dbg_object(bb_game1_TaiPlayer).f_life)+": Lives",640.0,1.0,3);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<80>";
	err_info="D:/Dropbox/monkeytouch/game1.monkey<80>";
	var t_=bb_game1_TaiBulletList.m_ObjectEnumerator();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<80>";
	while(t_.m_HasNext()){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<80>";
		var t_ub=t_.m_NextObject();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<81>";
		t_ub.m_render();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<84>";
	err_info="D:/Dropbox/monkeytouch/game1.monkey<84>";
	var t_2=bb_game1_TaiAlienList.m_ObjectEnumerator();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<84>";
	while(t_2.m_HasNext()){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<84>";
		var t_ua=t_2.m_NextObject();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<85>";
		t_ua.m_render();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<88>";
	bb_game1_TaiPlayer.m_render();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<90>";
	bb_main_TitleFont.m_DrawText("x "+String(dbg_object(bb_game1_TaiPlayer).f_x),10.0,60.0,1);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<91>";
	bb_main_TitleFont.m_DrawText("Bullets "+String(bb_game1_TaiBulletList.m_Count()),10.0,80.0,1);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<92>";
	bb_main_TitleFont.m_DrawText("Aliens "+String(bb_game1_TaiAlienList.m_Count()),10.0,100.0,1);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<93>";
	bb_main_TitleFont.m_DrawText("Wave "+String(bb_game1_TaiWave),10.0,120.0,1);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<94>";
	bb_main_TitleFont.m_DrawText("Base "+String(bb_game1_TaiBaseSpeed),10.0,140.0,1);
	pop_err();
}
bb_game1_Game1Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<105>";
	if(dbg_object(bb_game1_TaiPlayer).f_life>0 && bb_game1_TaiAlienList.m_Count()==0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<106>";
		bb_game1_TaiWave+=1;
		err_info="D:/Dropbox/monkeytouch/game1.monkey<107>";
		bb_game1_CreateWave();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<111>";
	if((bb_input_KeyDown(37))!=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<111>";
		bb_game1_TaiPlayer.m_MoveLeft();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<112>";
	if((bb_input_KeyDown(39))!=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<112>";
		bb_game1_TaiPlayer.m_MoveRight();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<113>";
	if((bb_input_KeyDown(90))!=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<113>";
		bb_game1_TaiPlayer.m_Shoot();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<115>";
	bb_game1_TaiPlayer.m_update();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<117>";
	err_info="D:/Dropbox/monkeytouch/game1.monkey<117>";
	var t_=bb_game1_TaiBulletList.m_ObjectEnumerator();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<117>";
	while(t_.m_HasNext()){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<117>";
		var t_ub=t_.m_NextObject();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<118>";
		t_ub.m_update();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<121>";
	err_info="D:/Dropbox/monkeytouch/game1.monkey<121>";
	var t_2=bb_game1_TaiAlienList.m_ObjectEnumerator();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<121>";
	while(t_2.m_HasNext()){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<121>";
		var t_ua=t_2.m_NextObject();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<122>";
		t_ua.m_update();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<125>";
	if(bb_game1_Tai_Shunt==true){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<126>";
		bb_game1_ShuntDown();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<127>";
		bb_game1_Tai_Shunt=false;
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<130>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<131>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game1.monkey<132>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game1Scr;
function bb_game2_Game2Screen(){
	bb_framework_Screen.call(this);
}
bb_game2_Game2Screen.prototype=extend_class(bb_framework_Screen);
function bb_game2_Game2Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game2.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game2.monkey<24>";
	this.f_name="Game 2 Screen";
	pop_err();
	return this;
}
bb_game2_Game2Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game2.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game2_Game2Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game2.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game2.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game2_Game2Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game2.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game2.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game2.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game2Scr;
function bb_game3_Game3Screen(){
	bb_framework_Screen.call(this);
}
bb_game3_Game3Screen.prototype=extend_class(bb_framework_Screen);
function bb_game3_Game3Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game3.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game3.monkey<24>";
	this.f_name="Game 3 Screen";
	pop_err();
	return this;
}
bb_game3_Game3Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game3.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game3_Game3Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game3.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game3.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game3_Game3Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game3.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game3.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game3.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game3Scr;
function bb_game4_Game4Screen(){
	bb_framework_Screen.call(this);
}
bb_game4_Game4Screen.prototype=extend_class(bb_framework_Screen);
function bb_game4_Game4Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game4.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game4.monkey<24>";
	this.f_name="Game 4 Screen";
	pop_err();
	return this;
}
bb_game4_Game4Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game4.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game4_Game4Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game4.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game4.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game4_Game4Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game4.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game4.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game4.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game4Scr;
function bb_game5_Game5Screen(){
	bb_framework_Screen.call(this);
}
bb_game5_Game5Screen.prototype=extend_class(bb_framework_Screen);
function bb_game5_Game5Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game5.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game5.monkey<24>";
	this.f_name="Game 5 Screen";
	pop_err();
	return this;
}
bb_game5_Game5Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game5.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game5_Game5Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game5.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game5.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game5_Game5Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game5.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game5.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game5.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game5Scr;
function bb_game6_Game6Screen(){
	bb_framework_Screen.call(this);
}
bb_game6_Game6Screen.prototype=extend_class(bb_framework_Screen);
function bb_game6_Game6Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game6.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game6.monkey<24>";
	this.f_name="Game 6 Screen";
	pop_err();
	return this;
}
bb_game6_Game6Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game6.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game6_Game6Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game6.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game6.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game6_Game6Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game6.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game6.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game6.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game6Scr;
function bb_game7_Game7Screen(){
	bb_framework_Screen.call(this);
}
bb_game7_Game7Screen.prototype=extend_class(bb_framework_Screen);
function bb_game7_Game7Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game7.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game7.monkey<24>";
	this.f_name="Game 7 Screen";
	pop_err();
	return this;
}
bb_game7_Game7Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game7.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game7_Game7Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game7.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game7.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game7_Game7Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game7.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game7.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game7.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game7Scr;
function bb_game8_Game8Screen(){
	bb_framework_Screen.call(this);
}
bb_game8_Game8Screen.prototype=extend_class(bb_framework_Screen);
function bb_game8_Game8Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game8.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game8.monkey<24>";
	this.f_name="Game 8 Screen";
	pop_err();
	return this;
}
bb_game8_Game8Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game8.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game8_Game8Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game8.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game8.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game8_Game8Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game8.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game8.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game8.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game8Scr;
function bb_game9_Game9Screen(){
	bb_framework_Screen.call(this);
}
bb_game9_Game9Screen.prototype=extend_class(bb_framework_Screen);
function bb_game9_Game9Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game9.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game9.monkey<24>";
	this.f_name="Game 9 Screen";
	pop_err();
	return this;
}
bb_game9_Game9Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game9.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game9_Game9Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game9.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game9.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game9_Game9Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game9.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game9.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game9.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game9Scr;
function bb_game10_Game10Screen(){
	bb_framework_Screen.call(this);
}
bb_game10_Game10Screen.prototype=extend_class(bb_framework_Screen);
function bb_game10_Game10Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game10.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game10.monkey<24>";
	this.f_name="Game 10 Screen";
	pop_err();
	return this;
}
bb_game10_Game10Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game10.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game10_Game10Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game10.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game10.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game10_Game10Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game10.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game10.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game10.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game10Scr;
function bb_game11_Game11Screen(){
	bb_framework_Screen.call(this);
}
bb_game11_Game11Screen.prototype=extend_class(bb_framework_Screen);
function bb_game11_Game11Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game11.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game11.monkey<24>";
	this.f_name="Game 11 Screen";
	pop_err();
	return this;
}
bb_game11_Game11Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game11.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game11_Game11Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game11.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game11.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game11_Game11Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game11.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game11.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game11.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game11Scr;
function bb_game12_Game12Screen(){
	bb_framework_Screen.call(this);
}
bb_game12_Game12Screen.prototype=extend_class(bb_framework_Screen);
function bb_game12_Game12Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game12.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game12.monkey<24>";
	this.f_name="Game 12 Screen";
	pop_err();
	return this;
}
bb_game12_Game12Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game12.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game12_Game12Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game12.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game12.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game12_Game12Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game12.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game12.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game12.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game12Scr;
function bb_game13_Game13Screen(){
	bb_framework_Screen.call(this);
}
bb_game13_Game13Screen.prototype=extend_class(bb_framework_Screen);
function bb_game13_Game13Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game13.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game13.monkey<24>";
	this.f_name="Game 13 Screen";
	pop_err();
	return this;
}
bb_game13_Game13Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game13.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game13_Game13Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game13.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game13.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game13_Game13Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game13.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game13.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game13.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game13Scr;
function bb_game14_Game14Screen(){
	bb_framework_Screen.call(this);
}
bb_game14_Game14Screen.prototype=extend_class(bb_framework_Screen);
function bb_game14_Game14Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game14.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game14.monkey<24>";
	this.f_name="Game 14 Screen";
	pop_err();
	return this;
}
bb_game14_Game14Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game14.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game14_Game14Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game14.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game14.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game14_Game14Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game14.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game14.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game14.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game14Scr;
function bb_game15_Game15Screen(){
	bb_framework_Screen.call(this);
}
bb_game15_Game15Screen.prototype=extend_class(bb_framework_Screen);
function bb_game15_Game15Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game15.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game15.monkey<24>";
	this.f_name="Game 15 Screen";
	pop_err();
	return this;
}
bb_game15_Game15Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game15.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game15_Game15Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game15.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game15.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game15_Game15Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game15.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game15.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game15.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game15Scr;
function bb_game16_Game16Screen(){
	bb_framework_Screen.call(this);
}
bb_game16_Game16Screen.prototype=extend_class(bb_framework_Screen);
function bb_game16_Game16Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game16.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game16.monkey<24>";
	this.f_name="Game 16 Screen";
	pop_err();
	return this;
}
bb_game16_Game16Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game16.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game16_Game16Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game16.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game16.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game16_Game16Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game16.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game16.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game16.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game16Scr;
function bb_game17_Game17Screen(){
	bb_framework_Screen.call(this);
}
bb_game17_Game17Screen.prototype=extend_class(bb_framework_Screen);
function bb_game17_Game17Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game17.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game17.monkey<24>";
	this.f_name="Game 17 Screen";
	pop_err();
	return this;
}
bb_game17_Game17Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game17.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game17_Game17Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game17.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game17.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game17_Game17Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game17.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game17.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game17.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game17Scr;
function bb_game18_Game18Screen(){
	bb_framework_Screen.call(this);
}
bb_game18_Game18Screen.prototype=extend_class(bb_framework_Screen);
function bb_game18_Game18Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game18.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game18.monkey<24>";
	this.f_name="Game 18 Screen";
	pop_err();
	return this;
}
bb_game18_Game18Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game18.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game18_Game18Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game18.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game18.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game18_Game18Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game18.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game18.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game18.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game18Scr;
function bb_game19_Game19Screen(){
	bb_framework_Screen.call(this);
}
bb_game19_Game19Screen.prototype=extend_class(bb_framework_Screen);
function bb_game19_Game19Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game19.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game19.monkey<24>";
	this.f_name="Game 19 Screen";
	pop_err();
	return this;
}
bb_game19_Game19Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game19.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game19_Game19Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game19.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game19.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game19_Game19Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game19.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game19.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game19.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game19Scr;
function bb_game20_Game20Screen(){
	bb_framework_Screen.call(this);
}
bb_game20_Game20Screen.prototype=extend_class(bb_framework_Screen);
function bb_game20_Game20Screen_new(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game20.monkey<23>";
	bb_framework_Screen_new.call(this);
	err_info="D:/Dropbox/monkeytouch/game20.monkey<24>";
	this.f_name="Game 20 Screen";
	pop_err();
	return this;
}
bb_game20_Game20Screen.prototype.m_Start=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game20.monkey<31>";
	dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,false,false,false);
	pop_err();
}
bb_game20_Game20Screen.prototype.m_Render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game20.monkey<39>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="D:/Dropbox/monkeytouch/game20.monkey<40>";
	bb_main_TitleFont.m_DrawText(dbg_object(this).f_name,320.0,240.0,2);
	pop_err();
}
bb_game20_Game20Screen.prototype.m_Update2=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game20.monkey<50>";
	if((bb_input_KeyHit(27))!=0){
		err_info="D:/Dropbox/monkeytouch/game20.monkey<51>";
		dbg_object(bb_framework_game).f_nextScreen=bb_main_TitleScr;
		err_info="D:/Dropbox/monkeytouch/game20.monkey<52>";
		dbg_object(bb_framework_game).f_screenFade.m_Start2(50.0,true,false,false);
	}
	pop_err();
}
var bb_main_Game20Scr;
function bb_game1_Tai_Player(){
	Object.call(this);
	this.f_sprite=null;
	this.f_x=0;
	this.f_y=0;
	this.f_life=0;
	this.f_state=0;
	this.f_held=0;
	this.f_bullettime=0;
	this.f_bulletstall=0;
	this.f_gunopen=0;
	this.f_score=0;
}
function bb_game1_Tai_Player_new(t__x,t__life){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<161>";
	dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_player");
	err_info="D:/Dropbox/monkeytouch/game1.monkey<162>";
	dbg_object(this).f_x=t__x;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<163>";
	dbg_object(this).f_y=450;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<164>";
	dbg_object(this).f_life=t__life;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<165>";
	dbg_object(this).f_state=1;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<166>";
	dbg_object(this).f_held=0;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<168>";
	dbg_object(this).f_bullettime=bb_app_Millisecs();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<169>";
	dbg_object(this).f_bulletstall=300;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<171>";
	dbg_object(this).f_gunopen=0;
	pop_err();
	return this;
}
function bb_game1_Tai_Player_new2(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<145>";
	pop_err();
	return this;
}
bb_game1_Tai_Player.prototype.m_render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<224>";
	var t_1=dbg_object(this).f_state;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<225>";
	if(t_1==1){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<226>";
		bb_graphics_DrawImage(dbg_object(dbg_object(this).f_sprite).f_image,(dbg_object(this).f_x),(dbg_object(this).f_y),0);
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<227>";
		if(t_1==0){
		}
	}
	pop_err();
	return 0;
}
bb_game1_Tai_Player.prototype.m_MoveLeft=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<203>";
	dbg_object(this).f_x-=4;
	pop_err();
	return 0;
}
bb_game1_Tai_Player.prototype.m_MoveRight=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<207>";
	dbg_object(this).f_x+=4;
	pop_err();
	return 0;
}
bb_game1_Tai_Player.prototype.m_Shoot=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<212>";
	if(dbg_object(this).f_gunopen==1){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<214>";
		dbg_object(this).f_gunopen=0;
		err_info="D:/Dropbox/monkeytouch/game1.monkey<215>";
		dbg_object(this).f_bullettime=bb_app_Millisecs();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<217>";
		var t_shot=bb_game1_Tai_Bullet_new.call(new bb_game1_Tai_Bullet,dbg_object(bb_game1_TaiPlayer).f_x,dbg_object(bb_game1_TaiPlayer).f_y,1);
	}
	pop_err();
	return 0;
}
bb_game1_Tai_Player.prototype.m_update=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<177>";
	if(bb_app_Millisecs()-dbg_object(this).f_bullettime>dbg_object(this).f_bulletstall){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<178>";
		dbg_object(this).f_bullettime=bb_app_Millisecs();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<179>";
		dbg_object(this).f_gunopen=1;
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<182>";
	if((bb_input_KeyHit(90))!=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<183>";
		bb_game1_TaiPlayer.m_Shoot();
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<186>";
	if((bb_input_TouchDown(0))!=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<188>";
		if(bb_game1_Tai_Touching(dbg_object(this).f_x,dbg_object(this).f_y,50,53,2) || dbg_object(this).f_held==1){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<189>";
			dbg_object(bb_game1_TaiPlayer).f_x=((bb_input_TouchX(0))|0);
			err_info="D:/Dropbox/monkeytouch/game1.monkey<190>";
			dbg_object(this).f_held=1;
		}
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<194>";
		dbg_object(this).f_held=0;
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<197>";
	if(dbg_object(this).f_x>617){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<197>";
		dbg_object(this).f_x=617;
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<198>";
	if(dbg_object(this).f_x<27){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<198>";
		dbg_object(this).f_x=27;
	}
	pop_err();
	return 0;
}
var bb_game1_TaiPlayer;
var bb_game1_TaiWave;
function bb_game1_Tai_Alien(){
	Object.call(this);
	this.f_x=.0;
	this.f_y=.0;
	this.f_life=0;
	this.f_dir=0;
	this.f_speed=.0;
	this.f_sprite=null;
}
function bb_game1_Tai_Alien_new(t__x,t__y,t__life,t__color,t__ship,t__speed){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<285>";
	dbg_object(this).f_x=(t__x);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<286>";
	dbg_object(this).f_y=(t__y);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<287>";
	dbg_object(this).f_life=t__life;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<288>";
	dbg_object(this).f_dir=1;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<289>";
	dbg_object(this).f_speed=(t__speed);
	err_info="D:/Dropbox/monkeytouch/game1.monkey<291>";
	var t_3=t__color;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<292>";
	if(t_3==1){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<293>";
		var t_4=t__ship;
		err_info="D:/Dropbox/monkeytouch/game1.monkey<294>";
		if(t_4==1){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<295>";
			dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien1_red");
		}else{
			err_info="D:/Dropbox/monkeytouch/game1.monkey<296>";
			if(t_4==2){
				err_info="D:/Dropbox/monkeytouch/game1.monkey<297>";
				dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien2_red");
			}else{
				err_info="D:/Dropbox/monkeytouch/game1.monkey<298>";
				if(t_4==3){
					err_info="D:/Dropbox/monkeytouch/game1.monkey<299>";
					dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien3_red");
				}
			}
		}
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<301>";
		if(t_3==2){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<302>";
			var t_5=t__ship;
			err_info="D:/Dropbox/monkeytouch/game1.monkey<303>";
			if(t_5==1){
				err_info="D:/Dropbox/monkeytouch/game1.monkey<304>";
				dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien1_green");
			}else{
				err_info="D:/Dropbox/monkeytouch/game1.monkey<305>";
				if(t_5==2){
					err_info="D:/Dropbox/monkeytouch/game1.monkey<306>";
					dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien2_green");
				}else{
					err_info="D:/Dropbox/monkeytouch/game1.monkey<307>";
					if(t_5==3){
						err_info="D:/Dropbox/monkeytouch/game1.monkey<308>";
						dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien3_green");
					}
				}
			}
		}else{
			err_info="D:/Dropbox/monkeytouch/game1.monkey<310>";
			if(t_3==3){
				err_info="D:/Dropbox/monkeytouch/game1.monkey<311>";
				var t_6=t__ship;
				err_info="D:/Dropbox/monkeytouch/game1.monkey<312>";
				if(t_6==1){
					err_info="D:/Dropbox/monkeytouch/game1.monkey<313>";
					dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien1_blue");
				}else{
					err_info="D:/Dropbox/monkeytouch/game1.monkey<314>";
					if(t_6==2){
						err_info="D:/Dropbox/monkeytouch/game1.monkey<315>";
						dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien2_blue");
					}else{
						err_info="D:/Dropbox/monkeytouch/game1.monkey<316>";
						if(t_6==3){
							err_info="D:/Dropbox/monkeytouch/game1.monkey<317>";
							dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien3_blue");
						}
					}
				}
			}else{
				err_info="D:/Dropbox/monkeytouch/game1.monkey<319>";
				if(t_3==4){
					err_info="D:/Dropbox/monkeytouch/game1.monkey<320>";
					var t_7=t__ship;
					err_info="D:/Dropbox/monkeytouch/game1.monkey<321>";
					if(t_7==1){
						err_info="D:/Dropbox/monkeytouch/game1.monkey<322>";
						dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien1_yellow");
					}else{
						err_info="D:/Dropbox/monkeytouch/game1.monkey<323>";
						if(t_7==2){
							err_info="D:/Dropbox/monkeytouch/game1.monkey<324>";
							dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien2_yellow");
						}else{
							err_info="D:/Dropbox/monkeytouch/game1.monkey<325>";
							if(t_7==3){
								err_info="D:/Dropbox/monkeytouch/game1.monkey<326>";
								dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_alien3_yellow");
							}
						}
					}
				}
			}
		}
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<331>";
	bb_game1_TaiAlienList.m_AddLast2(this);
	pop_err();
	return this;
}
function bb_game1_Tai_Alien_new2(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<237>";
	pop_err();
	return this;
}
bb_game1_Tai_Alien.prototype.m_render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<279>";
	bb_graphics_DrawImage(dbg_object(dbg_object(this).f_sprite).f_image,dbg_object(this).f_x,dbg_object(this).f_y,0);
	pop_err();
	return 0;
}
bb_game1_Tai_Alien.prototype.m_MoveLeft=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<269>";
	dbg_object(this).f_x-=dbg_object(this).f_speed;
	pop_err();
	return 0;
}
bb_game1_Tai_Alien.prototype.m_MoveRight=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<273>";
	dbg_object(this).f_x+=dbg_object(this).f_speed;
	pop_err();
	return 0;
}
bb_game1_Tai_Alien.prototype.m_update=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<251>";
	var t_2=dbg_object(this).f_dir;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<252>";
	if(t_2==1){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<253>";
		this.m_MoveLeft();
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<254>";
		if(t_2==2){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<255>";
			this.m_MoveRight();
		}
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<259>";
	if(dbg_object(this).f_y>480.0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<259>";
		dbg_object(this).f_life=0;
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<261>";
	if(dbg_object(this).f_x>617.0 || dbg_object(this).f_x<27.0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<261>";
		bb_game1_Tai_Shunt=true;
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<263>";
	if(dbg_object(this).f_life<=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<264>";
		bb_game1_TaiAlienList.m_Remove(this);
	}
	pop_err();
	return 0;
}
var bb_game1_TaiBaseSpeed;
function bb_random_Rnd(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/random.monkey<21>";
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	err_info="D:/Code/MonkeyPro/modules/monkey/random.monkey<22>";
	var t_=(bb_random_Seed>>8&16777215)/16777216.0;
	pop_err();
	return t_;
}
function bb_random_Rnd2(t_low,t_high){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/random.monkey<30>";
	var t_=bb_random_Rnd3(t_high-t_low)+t_low;
	pop_err();
	return t_;
}
function bb_random_Rnd3(t_range){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/random.monkey<26>";
	var t_=bb_random_Rnd()*t_range;
	pop_err();
	return t_;
}
function bb_list_List(){
	Object.call(this);
	this.f__head=(bb_list_HeadNode_new.call(new bb_list_HeadNode));
}
function bb_list_List_new(){
	push_err();
	pop_err();
	return this;
}
bb_list_List.prototype.m_AddLast2=function(t_data){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<120>";
	var t_=bb_list_Node_new.call(new bb_list_Node,this.f__head,dbg_object(this.f__head).f__pred,t_data);
	pop_err();
	return t_;
}
function bb_list_List_new2(t_data){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[t_2];
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<14>";
		this.m_AddLast2(t_t);
	}
	pop_err();
	return this;
}
bb_list_List.prototype.m_ObjectEnumerator=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<124>";
	var t_=bb_list_Enumerator2_new.call(new bb_list_Enumerator2,this);
	pop_err();
	return t_;
}
bb_list_List.prototype.m_Count=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.f__head).f__succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<42>";
	while(t_node!=this.f__head){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).f__succ;
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
bb_list_List.prototype.m_Equals=function(t_lhs,t_rhs){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
bb_list_List.prototype.m_RemoveEach=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<107>";
	var t_node=dbg_object(this.f__head).f__succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<108>";
	while(t_node!=this.f__head){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<109>";
		var t_succ=dbg_object(t_node).f__succ;
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<110>";
		if(this.m_Equals(dbg_object(t_node).f__data,t_value)){
			err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<110>";
			t_node.m_Remove2();
		}
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<111>";
		t_node=t_succ;
	}
	pop_err();
	return 0;
}
bb_list_List.prototype.m_Remove=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<103>";
	this.m_RemoveEach(t_value);
	pop_err();
	return 0;
}
function bb_list_Node(){
	Object.call(this);
	this.f__succ=null;
	this.f__pred=null;
	this.f__data=null;
}
function bb_list_Node_new(t_succ,t_pred,t_data){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<199>";
	this.f__succ=t_succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<200>";
	this.f__pred=t_pred;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<201>";
	dbg_object(this.f__succ).f__pred=this;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<202>";
	dbg_object(this.f__pred).f__succ=this;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<203>";
	this.f__data=t_data;
	pop_err();
	return this;
}
function bb_list_Node_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<196>";
	pop_err();
	return this;
}
bb_list_Node.prototype.m_Remove2=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<212>";
	if(dbg_object(this.f__succ).f__pred!=this){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<212>";
		error("Illegal operation on removed node");
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<214>";
	dbg_object(this.f__succ).f__pred=this.f__pred;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<215>";
	dbg_object(this.f__pred).f__succ=this.f__succ;
	pop_err();
	return 0;
}
function bb_list_HeadNode(){
	bb_list_Node.call(this);
}
bb_list_HeadNode.prototype=extend_class(bb_list_Node);
function bb_list_HeadNode_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<248>";
	bb_list_Node_new2.call(this);
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<249>";
	this.f__succ=(this);
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<250>";
	this.f__pred=(this);
	pop_err();
	return this;
}
var bb_game1_TaiAlienList;
function bb_game1_CreateWave(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<418>";
	var t_ta=null;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<420>";
	var t__speed=0;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<421>";
	var t__ship=0;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<422>";
	var t__color=0;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<424>";
	var t__taiwave=bb_game1_TaiWave;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<426>";
	var t_11=bb_game1_TaiWave;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<427>";
	if(t_11==4){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<428>";
		bb_game1_TaiBaseSpeed+=0.5;
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<429>";
		if(t_11==8){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<430>";
			bb_game1_TaiBaseSpeed+=0.5;
		}else{
			err_info="D:/Dropbox/monkeytouch/game1.monkey<431>";
			if(t_11==12){
				err_info="D:/Dropbox/monkeytouch/game1.monkey<432>";
				bb_game1_TaiBaseSpeed+=0.5;
			}else{
				err_info="D:/Dropbox/monkeytouch/game1.monkey<433>";
				if(t_11==16){
					err_info="D:/Dropbox/monkeytouch/game1.monkey<434>";
					bb_game1_TaiBaseSpeed+=0.5;
				}
			}
		}
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<439>";
	var t_12=t__taiwave;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<440>";
	if(t_12==1){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<441>";
		t__speed=((12.0+bb_game1_TaiBaseSpeed)|0);
		err_info="D:/Dropbox/monkeytouch/game1.monkey<442>";
		t__ship=1;
		err_info="D:/Dropbox/monkeytouch/game1.monkey<443>";
		t__color=1;
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<445>";
		if(t_12==2){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<446>";
			t__speed=((12.5+bb_game1_TaiBaseSpeed)|0);
			err_info="D:/Dropbox/monkeytouch/game1.monkey<447>";
			t__ship=2;
			err_info="D:/Dropbox/monkeytouch/game1.monkey<448>";
			t__color=2;
		}else{
			err_info="D:/Dropbox/monkeytouch/game1.monkey<449>";
			if(t_12==3){
				err_info="D:/Dropbox/monkeytouch/game1.monkey<450>";
				t__speed=((13.0+bb_game1_TaiBaseSpeed)|0);
				err_info="D:/Dropbox/monkeytouch/game1.monkey<451>";
				t__ship=3;
				err_info="D:/Dropbox/monkeytouch/game1.monkey<452>";
				t__color=3;
			}else{
				err_info="D:/Dropbox/monkeytouch/game1.monkey<453>";
				if(t_12==4){
					err_info="D:/Dropbox/monkeytouch/game1.monkey<454>";
					t__speed=((13.5+bb_game1_TaiBaseSpeed)|0);
					err_info="D:/Dropbox/monkeytouch/game1.monkey<455>";
					t__ship=3;
					err_info="D:/Dropbox/monkeytouch/game1.monkey<456>";
					t__color=4;
				}else{
					err_info="D:/Dropbox/monkeytouch/game1.monkey<458>";
					t__speed=((13.5+bb_game1_TaiBaseSpeed)|0);
					err_info="D:/Dropbox/monkeytouch/game1.monkey<459>";
					t__ship=3;
					err_info="D:/Dropbox/monkeytouch/game1.monkey<460>";
					t__color=((bb_random_Rnd2(1.0,4.0))|0);
				}
			}
		}
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<464>";
	for(var t_y=0;t_y<=3;t_y=t_y+1){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<465>";
		for(var t_x=0;t_x<=6;t_x=t_x+1){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<466>";
			t_ta=bb_game1_Tai_Alien_new.call(new bb_game1_Tai_Alien,50+t_x*50,50+t_y*50,3,t__color,t__ship,t__speed);
		}
	}
	pop_err();
	return 0;
}
function bb_game1_Tai_Bullet(){
	Object.call(this);
	this.f_sprite=null;
	this.f_x=0;
	this.f_y=0;
	this.f_dir=0;
	this.f_life=0;
}
bb_game1_Tai_Bullet.prototype.m_render=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<389>";
	bb_graphics_DrawImage(dbg_object(dbg_object(this).f_sprite).f_image,(dbg_object(this).f_x),(dbg_object(this).f_y),0);
	pop_err();
	return 0;
}
function bb_game1_Tai_Bullet_new(t__x,t__y,t__dir){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<361>";
	dbg_object(this).f_sprite=dbg_object(bb_framework_game).f_images.m_Find("game1_player_bullet");
	err_info="D:/Dropbox/monkeytouch/game1.monkey<362>";
	dbg_object(this).f_x=t__x;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<363>";
	dbg_object(this).f_y=t__y;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<364>";
	dbg_object(this).f_dir=t__dir;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<365>";
	dbg_object(this).f_life=3;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<366>";
	bb_game1_TaiBulletList.m_AddLast3(this);
	pop_err();
	return this;
}
function bb_game1_Tai_Bullet_new2(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<353>";
	pop_err();
	return this;
}
bb_game1_Tai_Bullet.prototype.m_update=function(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<371>";
	var t_9=dbg_object(this).f_dir;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<372>";
	if(t_9==0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<373>";
		dbg_object(this).f_y+=4;
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<374>";
		if(t_9==1){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<375>";
			dbg_object(this).f_y-=4;
		}
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<378>";
	if(dbg_object(this).f_y<0 || dbg_object(this).f_y>480){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<379>";
		dbg_object(this).f_life=0;
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<382>";
	if(dbg_object(this).f_life<=0){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<383>";
		bb_game1_TaiBulletList.m_Remove3(this);
	}
	pop_err();
	return 0;
}
function bb_list_List2(){
	Object.call(this);
	this.f__head=(bb_list_HeadNode2_new.call(new bb_list_HeadNode2));
}
function bb_list_List2_new(){
	push_err();
	pop_err();
	return this;
}
bb_list_List2.prototype.m_AddLast3=function(t_data){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<120>";
	var t_=bb_list_Node2_new.call(new bb_list_Node2,this.f__head,dbg_object(this.f__head).f__pred,t_data);
	pop_err();
	return t_;
}
function bb_list_List2_new2(t_data){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[t_2];
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<14>";
		this.m_AddLast3(t_t);
	}
	pop_err();
	return this;
}
bb_list_List2.prototype.m_ObjectEnumerator=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<124>";
	var t_=bb_list_Enumerator_new.call(new bb_list_Enumerator,this);
	pop_err();
	return t_;
}
bb_list_List2.prototype.m_Count=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.f__head).f__succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<42>";
	while(t_node!=this.f__head){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).f__succ;
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
bb_list_List2.prototype.m_Equals2=function(t_lhs,t_rhs){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
bb_list_List2.prototype.m_RemoveEach2=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<107>";
	var t_node=dbg_object(this.f__head).f__succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<108>";
	while(t_node!=this.f__head){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<109>";
		var t_succ=dbg_object(t_node).f__succ;
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<110>";
		if(this.m_Equals2(dbg_object(t_node).f__data,t_value)){
			err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<110>";
			t_node.m_Remove2();
		}
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<111>";
		t_node=t_succ;
	}
	pop_err();
	return 0;
}
bb_list_List2.prototype.m_Remove3=function(t_value){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<103>";
	this.m_RemoveEach2(t_value);
	pop_err();
	return 0;
}
function bb_list_Node2(){
	Object.call(this);
	this.f__succ=null;
	this.f__pred=null;
	this.f__data=null;
}
function bb_list_Node2_new(t_succ,t_pred,t_data){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<199>";
	this.f__succ=t_succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<200>";
	this.f__pred=t_pred;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<201>";
	dbg_object(this.f__succ).f__pred=this;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<202>";
	dbg_object(this.f__pred).f__succ=this;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<203>";
	this.f__data=t_data;
	pop_err();
	return this;
}
function bb_list_Node2_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<196>";
	pop_err();
	return this;
}
bb_list_Node2.prototype.m_Remove2=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<212>";
	if(dbg_object(this.f__succ).f__pred!=this){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<212>";
		error("Illegal operation on removed node");
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<214>";
	dbg_object(this.f__succ).f__pred=this.f__pred;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<215>";
	dbg_object(this.f__pred).f__succ=this.f__succ;
	pop_err();
	return 0;
}
function bb_list_HeadNode2(){
	bb_list_Node2.call(this);
}
bb_list_HeadNode2.prototype=extend_class(bb_list_Node2);
function bb_list_HeadNode2_new(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<248>";
	bb_list_Node2_new2.call(this);
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<249>";
	this.f__succ=(this);
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<250>";
	this.f__pred=(this);
	pop_err();
	return this;
}
var bb_game1_TaiBulletList;
function bb_list_Enumerator(){
	Object.call(this);
	this.f__list=null;
	this.f__curr=null;
}
function bb_list_Enumerator_new(t_list){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<264>";
	this.f__list=t_list;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<265>";
	this.f__curr=dbg_object(dbg_object(t_list).f__head).f__succ;
	pop_err();
	return this;
}
function bb_list_Enumerator_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<261>";
	pop_err();
	return this;
}
bb_list_Enumerator.prototype.m_HasNext=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<269>";
	while(dbg_object(dbg_object(this.f__curr).f__succ).f__pred!=this.f__curr){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<270>";
		this.f__curr=dbg_object(this.f__curr).f__succ;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<272>";
	var t_=this.f__curr!=dbg_object(this.f__list).f__head;
	pop_err();
	return t_;
}
bb_list_Enumerator.prototype.m_NextObject=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<276>";
	var t_data=dbg_object(this.f__curr).f__data;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<277>";
	this.f__curr=dbg_object(this.f__curr).f__succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<278>";
	pop_err();
	return t_data;
}
function bb_list_Enumerator2(){
	Object.call(this);
	this.f__list=null;
	this.f__curr=null;
}
function bb_list_Enumerator2_new(t_list){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<264>";
	this.f__list=t_list;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<265>";
	this.f__curr=dbg_object(dbg_object(t_list).f__head).f__succ;
	pop_err();
	return this;
}
function bb_list_Enumerator2_new2(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<261>";
	pop_err();
	return this;
}
bb_list_Enumerator2.prototype.m_HasNext=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<269>";
	while(dbg_object(dbg_object(this.f__curr).f__succ).f__pred!=this.f__curr){
		err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<270>";
		this.f__curr=dbg_object(this.f__curr).f__succ;
	}
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<272>";
	var t_=this.f__curr!=dbg_object(this.f__list).f__head;
	pop_err();
	return t_;
}
bb_list_Enumerator2.prototype.m_NextObject=function(){
	push_err();
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<276>";
	var t_data=dbg_object(this.f__curr).f__data;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<277>";
	this.f__curr=dbg_object(this.f__curr).f__succ;
	err_info="D:/Code/MonkeyPro/modules/monkey/list.monkey<278>";
	pop_err();
	return t_data;
}
function bb_game1_Tai_Touching(t__x,t__y,t__w,t__h,t__handle){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<396>";
	var t_result=false;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<398>";
	var t_10=t__handle;
	err_info="D:/Dropbox/monkeytouch/game1.monkey<399>";
	if(t_10==1){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<400>";
		if(bb_input_TouchX(0)>(t__x) && bb_input_TouchX(0)<(t__x+t__w) && bb_input_TouchY(0)>(t__y) && bb_input_TouchY(0)<(t__y+t__h)){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<401>";
			t_result=true;
		}
	}else{
		err_info="D:/Dropbox/monkeytouch/game1.monkey<403>";
		if(t_10==2){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<404>";
			if(bb_input_TouchX(0)>(t__x-((t__w/2)|0)) && bb_input_TouchX(0)<(t__x+((t__w/2)|0)) && bb_input_TouchY(0)>(t__y-((t__h/2)|0)) && bb_input_TouchY(0)<(t__y+((t__h/2)|0))){
				err_info="D:/Dropbox/monkeytouch/game1.monkey<405>";
				t_result=true;
			}
		}
	}
	err_info="D:/Dropbox/monkeytouch/game1.monkey<410>";
	pop_err();
	return t_result;
}
var bb_game1_Tai_Shunt;
function bb_game1_ShuntDown(){
	push_err();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<337>";
	err_info="D:/Dropbox/monkeytouch/game1.monkey<337>";
	var t_=bb_game1_TaiAlienList.m_ObjectEnumerator();
	err_info="D:/Dropbox/monkeytouch/game1.monkey<337>";
	while(t_.m_HasNext()){
		err_info="D:/Dropbox/monkeytouch/game1.monkey<337>";
		var t_t=t_.m_NextObject();
		err_info="D:/Dropbox/monkeytouch/game1.monkey<338>";
		dbg_object(t_t).f_y=dbg_object(t_t).f_y+10.0;
		err_info="D:/Dropbox/monkeytouch/game1.monkey<339>";
		var t_8=dbg_object(t_t).f_dir;
		err_info="D:/Dropbox/monkeytouch/game1.monkey<340>";
		if(t_8==1){
			err_info="D:/Dropbox/monkeytouch/game1.monkey<341>";
			dbg_object(t_t).f_dir=2;
		}else{
			err_info="D:/Dropbox/monkeytouch/game1.monkey<342>";
			if(t_8==2){
				err_info="D:/Dropbox/monkeytouch/game1.monkey<343>";
				dbg_object(t_t).f_dir=1;
			}
		}
	}
	pop_err();
	return 0;
}
function bbInit(){
	bb_graphics_context=null;
	bb_input_device=null;
	bb_audio_device=null;
	bb_app_device=null;
	bb_framework_game=null;
	bb_graphics_Image_DefaultFlags=256;
	bb_graphics_renderDevice=null;
	bb_framework_DEVICE_WIDTH=.0;
	bb_framework_DEVICE_HEIGHT=.0;
	bb_framework_SCREEN_WIDTH=.0;
	bb_framework_SCREEN_HEIGHT=.0;
	bb_framework_SCREEN_WIDTH2=.0;
	bb_framework_SCREEN_HEIGHT2=.0;
	bb_framework_SCREENX_RATIO=1.0;
	bb_framework_SCREENY_RATIO=1.0;
	bb_random_Seed=1234;
	bb_framework_dt=null;
	bb_framework_Particle_MAX_PARTICLES=800;
	bb_framework_Particle_particles=new_object_array(bb_framework_Particle_MAX_PARTICLES);
	bb_framework_FPSCounter_startTime=0;
	bb_framework_FPSCounter_fpsCount=0;
	bb_framework_FPSCounter_totalFPS=0;
	bb_framework_SoundPlayer_channel=0;
	bb_main_TitleFont=null;
	bb_main_InfoFont=null;
	bb_main_SmallFont=null;
	bb_main_HighlightFont=null;
	bb_main_TitleScr=(bb_title_screen_TitleScreen_new.call(new bb_title_screen_TitleScreen));
	bb_title_screen_GameList=new_object_array(20);
	bb_main_Game1Scr=(bb_game1_Game1Screen_new.call(new bb_game1_Game1Screen));
	bb_main_Game2Scr=(bb_game2_Game2Screen_new.call(new bb_game2_Game2Screen));
	bb_main_Game3Scr=(bb_game3_Game3Screen_new.call(new bb_game3_Game3Screen));
	bb_main_Game4Scr=(bb_game4_Game4Screen_new.call(new bb_game4_Game4Screen));
	bb_main_Game5Scr=(bb_game5_Game5Screen_new.call(new bb_game5_Game5Screen));
	bb_main_Game6Scr=(bb_game6_Game6Screen_new.call(new bb_game6_Game6Screen));
	bb_main_Game7Scr=(bb_game7_Game7Screen_new.call(new bb_game7_Game7Screen));
	bb_main_Game8Scr=(bb_game8_Game8Screen_new.call(new bb_game8_Game8Screen));
	bb_main_Game9Scr=(bb_game9_Game9Screen_new.call(new bb_game9_Game9Screen));
	bb_main_Game10Scr=(bb_game10_Game10Screen_new.call(new bb_game10_Game10Screen));
	bb_main_Game11Scr=(bb_game11_Game11Screen_new.call(new bb_game11_Game11Screen));
	bb_main_Game12Scr=(bb_game12_Game12Screen_new.call(new bb_game12_Game12Screen));
	bb_main_Game13Scr=(bb_game13_Game13Screen_new.call(new bb_game13_Game13Screen));
	bb_main_Game14Scr=(bb_game14_Game14Screen_new.call(new bb_game14_Game14Screen));
	bb_main_Game15Scr=(bb_game15_Game15Screen_new.call(new bb_game15_Game15Screen));
	bb_main_Game16Scr=(bb_game16_Game16Screen_new.call(new bb_game16_Game16Screen));
	bb_main_Game17Scr=(bb_game17_Game17Screen_new.call(new bb_game17_Game17Screen));
	bb_main_Game18Scr=(bb_game18_Game18Screen_new.call(new bb_game18_Game18Screen));
	bb_main_Game19Scr=(bb_game19_Game19Screen_new.call(new bb_game19_Game19Screen));
	bb_main_Game20Scr=(bb_game20_Game20Screen_new.call(new bb_game20_Game20Screen));
	bb_game1_TaiPlayer=null;
	bb_game1_TaiWave=1;
	bb_game1_TaiBaseSpeed=0.0;
	bb_game1_TaiAlienList=bb_list_List_new.call(new bb_list_List);
	bb_game1_TaiBulletList=bb_list_List2_new.call(new bb_list_List2);
	bb_game1_Tai_Shunt=false;
}
//${TRANSCODE_END}
