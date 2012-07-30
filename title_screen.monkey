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
	Field mask:GameImage
	
	Field Icons:GameImage[20]
	Field Thumbs:GameImage[20]
	Field outoforder:GameImage
	
	Field Tile:GameImage
	
	Field selected:Int
		
	Field offsety:Int
	Field startdragy:Int
	Field dragdir:Int
	Field dragspeed:float
	
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
		Self.mask = game.images.Find("title_mask")
		Self.Tile = game.images.Find("game_tile")
		
		selected = 0
		LoadGameIcons()
		
		#IF TARGET="glfw"
			game.MusicPlay("brain_menu.wav", True)
		#ELSE
			game.MusicPlay("brain_menu.mp3", True)
		#END
		
				
		
		
		
	End
	
	#rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		DrawImage(background.image, 0, 0)
		
		DrawImage(Self.Thumbs[Self.selected].image, 300, 214)
		
		'render the game icons.
		For Local row:Int = 0 To 19
		
			if GameList[row].name <> "????"
				
				if Self.selected = row
					DrawImage(self.Tile.image, 39, 175 + (row * 58) + offsety, 1)
				Else
					DrawImage(self.Tile.image, 39, 175 + (row * 58) + offsety, 0)
				End if
				
				DrawImage(Self.Icons[row].image, 83, 203 + (row * 58) + offsety)
				InfoFont.DrawText(GameList[row].name[ .. 12], 110, 205 + (row * 58) + offsety)
			End if
			
		Next
		
		Local stp:Int = 150
		Local gap:Int = 20
		
		TitleFont.DrawText("Game    : ", 353, stp, 1)
		stp += gap
		InfoFont.DrawText("  " + GameList[Self.selected].name, 353, stp, 1)
		stp += gap
		TitleFont.DrawText("Author  : ", 353, stp, 1)
		stp += gap
		InfoFont.DrawText("  " + GameList[Self.selected].author, 353, stp, 1)
		
		stp += gap
		TitleFont.DrawText("Website : ", 353, stp, 1)
		stp += gap
		InfoFont.DrawText("  " + GameList[Self.selected].authorurl, 353, stp, 1)
		
		stp = 272
		TitleFont.DrawText("Game Info", 245, stp, 1)
		
		stp += gap
		InfoFont.DrawTextWidth(GameList[Self.selected].info, 245, stp, 1, 380)

		DrawImage(Self.mask.image, 0, 0, 0)
		
	End

	#rem
	sumary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
		
		Self.selected = (Abs( (-29 + Self.offsety) / 58))' + 1)
		
		If MouseOver(51, 147, 186, 279)
			
			
			
			
			if TouchDown()
				if Self.startdragy <> 0
					if TouchY() < Self.startdragy
						Self.dragdir = 1
						self.dragspeed = (Self.startdragy - TouchY()) * 0.1
					ElseIf TouchY() > Self.startdragy
						Self.dragdir = 2
						self.dragspeed = (TouchY() -Self.startdragy) * 0.1
					EndIf
				Else
					Self.startdragy = TouchY()
					Self.dragdir = 0
				End if
			Else
				Self.startdragy = 0			
			End if
			
			select Self.dragdir
				Case 1
					Self.offsety -= dragspeed
					
				Case 2
					Self.offsety += dragspeed
					'need to find the upper cap, total number of games.*tile height.
					
			End Select
			
			if Self.offsety > 0 Then Self.offsety = 0
			
		Endif
		
		if Self.dragdir <> 0
			dragspeed -= 0.1
			if dragspeed < 0 Then dragspeed = 0
		EndIf
		
		
		'About Button
		If MouseOver(486, 400, 100, 57)
			If TouchHit() Or MouseHit(MOUSE_LEFT)
				FadeToScreen(AboutScr)
			End If
		Endif
		
		'Play Button.
		If MouseOver(281, 400, 100, 57)
			
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