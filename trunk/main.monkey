#Rem
header:
[quote]

[b]-Main Project-[/b]
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

Private

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
Public
	Import diddy
	Import fontmachine
	Import title_screen
	Import about_screen




Global TitleFont:BitmapFont2
Global InfoFont:BitmapFont2
Global SmallFont:BitmapFont2
Global HighlightFont:BitmapFont2


'summary:Launch Point
Function Main:Int()
	
	game = New MyGame()
	game.debugKeyOn = True
	game.drawFPSOn = True
	game.FPS = 60
	Return 1
End


Global TitleScr:Screen = New TitleScreen()		'Main Title Screen.
Global AboutScr:Screen = New AboutScreen()		'Main Title Screen.

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
		Super.OnCreate()
		SetGraphics(640, 480)
		SetScreenSize(640, 480, True)

		LoadImages()
		LoadSounds()
		LoadFonts()
		
		game.Start(TitleScr) 
		Return 0
	End Method
	
	#Rem
		summary: LoadImages
		This method also loads ALL game(index).png Atlas files in each of the games folders
		so if your using the packer, just pack and publish , then use the game.images.find()
		to actually get at your image.
	#END
	Method LoadImages:Void()
	
		'loading in the main apps atlas sheet.
		'game.images.LoadAtlas("sheet.txt", images.LIBGDX_ATLAS, true)
		
		'loading in all the mini games atlas sheets.
		For Local g:Int = 1 to 20
			Local path:String
			path = ("/game" + g + "/game" + g + ".txt")
			game.images.LoadAtlas(path, images.LIBGDX_ATLAS, true)
		Next
		
		game.images.Load("about.png", "", False, False)
		game.images.Load("title.png", "", False, False)
		game.images.Load("about_mask.png", "", False, False)
		game.images.Load("about_buttons.png", "", False, False)
		game.images.Load("ooo.png", "", true, False)
		
	End Method

	'summary:Load Game Fonts.
	Method LoadFonts:Void()
		TitleFont = New BitmapFont2("fonts/monkey_18_h.txt", True)
		InfoFont = New BitmapFont2("fonts/monkey_18.txt", True)
		SmallFont = New BitmapFont2("fonts/monkey_12.txt", True)
		HighlightFont = New BitmapFont2("fonts/monkey_12_h.txt", True)
	End Method
	
	'summary: load sounds.
	Method LoadSounds:Void()
		'
	End Method
	
End


#Rem
	summary: Extension of Font Machine's BitmapFont
	Created so that others dont need to hack their font machine module.
	Should be removed soon once Ziggy writes his own more efficiant version.
	
#END
Class BitmapFont2 extends BitmapFont
	
	Method new(fontDescriptionFilePath:String, dynamicLoad:bool)
		Super.New(fontDescriptionFilePath, dynamicLoad)
	End method
	
	#rem
		summary:This is a BitmapFont class constructor.
		The fontDescriptionFilePath parameter indicates the name of the txt file containing the font description (generated by the FontMachine editor).
	#end
	Method New(fontDescriptionFilePath:String)
		Super.New(fontDescriptionFilePath)
	End method
	#rem
		summary:This Method draws TEXT within a given Width.
		Draw's Text inside a given width, allowing for textbox like rendering.
		Code by Taiphoz.
	#End
	
	Method DrawTextWidth:void(text:String, x:float, y:float, align:Int, Tai_width:Int)
		
		Local Tai_TextLines:String[]
		
		If Self.GetTxtWidth(text)>Tai_width
		
			Tai_TextLines = Self.SplitLines(text,Tai_width)
			
			'Render the Lines from the String Araay.
			Local Tai_Drop:Int = Self.GetFontHeight()
			
			Local Tai_Count:Int =0
			
			For Local Tai_CurLine:String = Eachin Tai_TextLines
				If Tai_CurLine<>""			
					If DrawShadow Then DrawCharsText(Tai_CurLine, x, y + (Tai_Count * Tai_Drop), 2, align)
					If DrawBorder Then DrawCharsText(Tai_CurLine, x, y + (Tai_Count * Tai_Drop), 1, align)
					DrawCharsText(Tai_CurLine, x, y + (Tai_Count * Tai_Drop), 0, align)
					Tai_Count+=1
				End if
			Next
			
		Else
			if DrawShadow Then DrawCharsText(text, x, y, 2, align)
			If DrawBorder Then DrawCharsText(text, x, y, 1, align)
			DrawCharsText(text, x, y, 0, align)
		End If
		
		
				

	End Method
	
	#rem
		'summary split given text into an array of lines based on provided with.
		Code by Taiphoz
	#End
	
	Method SplitLines:String[](_text:String,_width:Int)	

		Local Tai_textdata:String[] = _text.Split(" ")


		 
		
		'temp vars for building lines.
		Local Tai_tmptext:String=""
		Local Tai_words:Int=Tai_textdata.Length()
		Local Tai_textlines:String[Tai_words] 'its a fudge. but number of lines will possibly match number of words.
		
		Local Tai_line:Int = 0				
		
		For Local Tai_word:Int = 0 To Tai_words-1
		
			Tai_tmptext+=Tai_textdata[Tai_word]+" "
			
			If Self.GetTxtWidth(Tai_tmptext)<_width
				Tai_textlines[Tai_line]=Tai_tmptext
			Else
				Tai_line+=1
				Tai_tmptext=(Tai_textdata[Tai_word]+" ")
			End If
			
		Next
		
		Return Tai_textlines
	End Method
	
End

#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end

