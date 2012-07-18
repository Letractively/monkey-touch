#Rem
header:
[quote]

[b]Project[/b]
[list]
[*] Project : Monkey Touch - Community Project
[*] Author	: Monkey Community
[*] Website	: [a Http://www.monkeycoder.co.nz]Monkey Coder[/a]
[/list]

[b]The Team[/b]
The following people have all contributed either full mini games, 
or assets to this project.

	[list]
	[*] Art 	: People who contributed Art.
		[list]
			[*]	Paul "Taiphoz" Grayston
		[/list]
	[*] Audio 	: People who contributed Music or Sound
	[*] Code 	: People who contributed Code
		[list]
			[*]	Paul "Taiphoz" Grayston
		[/list]
	[/list]

[b]Comment's[/b]
	
	The Monkey Touch Project was a concept created by the Monkey Community.
	It's goal is simply to show case monkey via a collection of fun mini games.
	
	It's Structure is as follows.
	
	main.monkey
	title.monkey
	  gamename_author.monkey
	  
	 

[/quote]
#end



Strict

Import diddy
Import fontmachine


Import title_screen
Import game1
Import game2
Import game3
Import game4
Import game5
Import game6
Import game7
Import game8
Import game9
Import game10
Import game11
Import game12
Import game13
Import game14
Import game15
Import game16
Import game17
Import game18
Import game19
Import game20

Global TitleFont:BitmapFont
Global InfoFont:BitmapFont
Global SmallFont:BitmapFont
Global HighlightFont:BitmapFont


'summary:Launch Point
Function Main:Int()
	game = New MyGame()
	game.debugKeyOn = True
	game.drawFPSOn = True
	game.FPS = 60
	Return 1
End


Global TitleScr:Screen = New TitleScreen()		'Main Title Screen.

Global Game1Scr:Screen = New Game1Screen()		'Game Screen
Global Game2Scr:Screen = New Game2Screen()		'Game Screen
Global Game3Scr:Screen = New Game3Screen()		'Game Screen
Global Game4Scr:Screen = New Game4Screen()		'Game Screen
Global Game5Scr:Screen = New Game5Screen()		'Game Screen
Global Game6Scr:Screen = New Game6Screen()		'Game Screen
Global Game7Scr:Screen = New Game7Screen()		'Game Screen
Global Game8Scr:Screen = New Game8Screen()		'Game Screen
Global Game9Scr:Screen = New Game9Screen()		'Game Screen
Global Game10Scr:Screen = New Game10Screen()		'Game Screen
Global Game11Scr:Screen = New Game11Screen()		'Game Screen
Global Game12Scr:Screen = New Game12Screen()		'Game Screen
Global Game13Scr:Screen = New Game13Screen()		'Game Screen
Global Game14Scr:Screen = New Game14Screen()		'Game Screen
Global Game15Scr:Screen = New Game15Screen()		'Game Screen
Global Game16Scr:Screen = New Game16Screen()		'Game Screen
Global Game17Scr:Screen = New Game17Screen()		'Game Screen
Global Game18Scr:Screen = New Game18Screen()		'Game Screen
Global Game19Scr:Screen = New Game19Screen()		'Game Screen
Global Game20Scr:Screen = New Game20Screen()		'Game Screen


'summary:MyGame main game class.
Class MyGame Extends DiddyApp
	
	
	Method OnCreate:Int()
		'Seed = RealMillisecs()
		Super.OnCreate()
		SetGraphics(640, 480)
		SetScreenSize(640, 480, True)

		LoadImages()
		LoadSounds()
		LoadFonts()
		
		TitleScr.PreStart()
				
		Return 0
	End Method
	
	'summary:Load Game Images
	Method LoadImages:Void()
	
		'loading in the main apps atlas sheet.
		'game.images.LoadAtlas("sheet.txt", images.LIBGDX_ATLAS, true)
		
		'loading in all the mini games atlas sheets.
		For Local g:Int = 1 to 20
			Local path:String
			path = ("/game" + g + "/game" + g + ".txt")
			game.images.LoadAtlas(path, images.LIBGDX_ATLAS, true)
		Next
		
		game.images.Load("title.png", "", False, False)
		
	End Method

	'summary:Load Game Fonts.
	Method LoadFonts:Void()
		TitleFont = New BitmapFont("fonts/monkey_18_h.txt", True)
		InfoFont = New BitmapFont("fonts/monkey_18.txt", True)
		SmallFont = New BitmapFont("fonts/monkey_12.txt", True)
		HighlightFont = New BitmapFont("fonts/monkey_12_h.txt", True)
	End Method
	
	'summary: load sounds.
	Method LoadSounds:Void()
		'
	End Method
	
End


#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end