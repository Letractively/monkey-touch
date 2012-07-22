#rem
header:
[quote]

[b]File Name :[/b] Title_Screen
[b]Author    :[/b] Paul "Taiphoz" Grayston
[b]About     :[/b]
The Main screen that lets the player launch all the included mini games.
[/quote]
#end



Import main

#rem
summary:Title Screen Class.
Used to manage and deal with all Tital Page stuff.
#End
Class TitleScreen Extends Screen
	Field background:GameImage
	Field Icons:GameImage[20]
	Field Thumbs:GameImage[20]
	Field outoforder:GameImage
	
	
	Field selected:Int
	
	
	Method New()
		name = "Main Screen"
	End
	#rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		self.background = game.images.Find("title")
		Self.outoforder = game.images.Find("ooo")
		
		selected = 0
		LoadGameIcons()
		
		#IF TARGET="glfw"
			game.MusicPlay("brain_menu.wav", True)
		#ELSE
			game.MusicPlay("brain_menu.mp3", True)
		#END
		
				
		game.MusicSetVolume(30)
		
		
	End
	
	#rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		DrawImage(background.image, 0, 0)
		
		DrawImage(Self.Thumbs[Self.selected].image, 345, 214)
		
		'render the game icons.
		For Local row:Int = 0 To 4
			For Local col:Int = 0 To 3
			
				if GameList[ ( (row * 4) + col)].name <> "????"
					If Self.selected = ( (row * 4) + col)
						DrawImage(Self.Icons[ ( (row * 4) + col)].image, 72 + (col * 58), 175 + (row * 58))
						HighlightFont.DrawText(GameList[Self.selected].name[ .. 7], 49 + (col * 58), 201 + (row * 58))
					Else
						DrawImage(Self.Icons[ ( (row * 4) + col)].image, 72 + (col * 58), 182 + (row * 58))
						SmallFont.DrawText(GameList[ ( (row * 4) + col)].name[ .. 7], 49 + (col * 58), 201 + (row * 58))
					Endif
				Else
					DrawImage(Self.outoforder.image, 72 + (col * 58), 182 + (row * 58))
					'SmallFont.DrawText("Out Of Order", 49 + (col * 58), 201 + (row * 58))
				End if
				
			Next
		Next
		
		Local stp:Int = 150
		Local gap:Int = 20
		
		TitleFont.DrawText("Game    : ", 403, stp, 1)
		stp += gap
		InfoFont.DrawText("  " + GameList[Self.selected].name, 403, stp, 1)
		stp += gap
		TitleFont.DrawText("Author  : ", 403, stp, 1)
		stp += gap
		InfoFont.DrawText("  " + GameList[Self.selected].author, 403, stp, 1)
		
		stp += gap
		TitleFont.DrawText("Website : ", 403, stp, 1)
		stp += gap
		InfoFont.DrawText("  " + GameList[Self.selected].authorurl, 403, stp, 1)
		
		stp = 272
		TitleFont.DrawText("Game Info", 295, stp, 1)
		
		stp += gap
		InfoFont.DrawTextWidth(GameList[Self.selected].info, 295, stp, 1, 308)

	End

	#rem
	sumary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
	
	
		For Local row:Int = 0 To 4
			For Local col:Int = 0 To 3
				Local current:Int = ( (row * 4) + col)
				 
				If MouseOver(47 + (col * 58), 157 + (row * 58), 58, 58) And TouchHit()
					Self.selected = current
					'Print "Selected " + current
				Endif
				
			Next
		Next
		
		'About Button
		If MouseOver(486, 400, 100, 57)
			If TouchHit() Or MouseHit(MOUSE_LEFT)
				FadeToScreen(AboutScr)
			End If
		Endif
		
		'Play Button.
		If MouseOver(317, 400, 100, 57)
			
			If TouchHit() Or MouseHit(MOUSE_LEFT)
			'clicked play.
				Select Self.selected + 1
					Case 1
						FadeToScreen(Game1Scr)
					Case 2
						FadeToScreen(Game2Scr)
					Case 3
						FadeToScreen(Game3Scr)
					Case 4
						FadeToScreen(Game4Scr)
					Case 5
						FadeToScreen(Game5Scr)
					Case 6
						FadeToScreen(Game6Scr)
					Case 7
						FadeToScreen(Game7Scr)
					Case 8
						FadeToScreen(Game8Scr)
					Case 9
						FadeToScreen(Game9Scr)
					Case 10
						FadeToScreen(Game10Scr)
					Case 11
						FadeToScreen(Game11Scr)
					Case 12
						FadeToScreen(Game12Scr)
					Case 13
						FadeToScreen(Game13Scr)
					Case 14
						FadeToScreen(Game14Scr)
					Case 15
						FadeToScreen(Game15Scr)
					Case 16
						FadeToScreen(Game16Scr)
					Case 17
						FadeToScreen(Game17Scr)
					Case 18
						FadeToScreen(Game18Scr)
					Case 19
						FadeToScreen(Game19Scr)
					Case 20
						FadeToScreen(Game20Scr)
				End
			End If
			
		Endif
	
	
	End
	
	#rem
	'summary: LoadGames
	loads the games from a text file, which should make it easier to add new games.
	#END
	Method LoadGameIcons:Void()
		For Local count:Int = 0 To 19
			Self.Icons[count] = game.images.Find("game" + (count + 1) + "_icon")
			Self.Thumbs[count] = game.images.Find("game" + (count + 1) + "_thumb")
		Next
	End Method

	
End




Global GameList:miniGame[20]
#rem
	'summary: miniGame
	Class used to just help oganise the game list a litte
#END
Class miniGame
	Field name:String
	Field id:Int
	Field iconname:String
	Field thumbnail:String
	Field author:String
	Field authorurl:String
	Field info:String
End


Function MouseOver:Bool(_x:Int, _y:Int, _w:Int, _h:Int)
	Local result:Bool = False
	
		If TouchX() > _x And TouchX() < (_x + _w) And TouchY() > _y And TouchY() < (_y + _h)
			result = True
		Endif
	
	Return result
End


#rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end