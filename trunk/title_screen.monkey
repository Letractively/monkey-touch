#Rem
header:
[quote]

[b]File Name :[/b] Title_Screen
[b]Author    :[/b] Paul "Taiphoz" Grayston
[b]About     :[/b]
The Main screen that lets the player launch all the included mini games.
[/quote]
#end



Import main

#Rem
summary:Title Screen Class.
Used to manage and deal with all Tital Page stuff.
#End
Class TitleScreen Extends Screen
	Field background:GameImage
	Field Icons:GameImage[20]
	Field Thumbs:GameImage[20]
	
	Field selected:Int
	
	
	Method New()
		name = "Main Screen"
	End
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		background = game.images.Find("title")
		selected = 0
		LoadGameIcons()
	End
	
	#Rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		DrawImage(background.image, 0, 0)
		
		DrawImage(Self.Thumbs[Self.selected].image, 345, 214)
		
		'render the game icons.
		For Local row:Int = 0 to 4
			for Local col:Int = 0 to 3
			
				if Self.selected = ( (row * 4) + col)
					DrawImage(Self.Icons[ ( (row * 4) + col)].image, 72 + (col * 58), 175 + (row * 58))
					HighlightFont.DrawText(GameList[Self.selected].name[ .. 7], 49 + (col * 58), 201 + (row * 58))
				Else
					DrawImage(Self.Icons[ ( (row * 4) + col)].image, 72 + (col * 58), 182 + (row * 58))
					SmallFont.DrawText(GameList[ ( (row * 4) + col)].name[ .. 7], 49 + (col * 58), 201 + (row * 58))
				EndIf
				
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

	#Rem
	sumary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
	
	
		For Local row:Int = 0 to 4
			for Local col:Int = 0 to 3
				Local current:Int = ( (row * 4) + col)
				 
				if MouseOver(47 + (col * 58), 157 + (row * 58), 58, 58) And TouchHit()
					Self.selected = current
					'Print "Selected " + current
				EndIf
				
			Next
		Next
		
		'About Button
		if MouseOver(486, 400, 100, 57)
			if TouchHit() or MouseHit(MOUSE_LEFT)
				game.Start(AboutScr)
			End if
		EndIf
		
		'Play Button.
		if MouseOver(317, 400, 100, 57)
			
			if TouchHit() or MouseHit(MOUSE_LEFT)
			'clicked play.
				select Self.selected + 1
					Case 1
						game.Start(Game1Scr)
					Case 2
						game.Start(Game2Scr)
					Case 3
						game.Start(Game3Scr)
					Case 4
						game.Start(Game4Scr)
					Case 5
						game.Start(Game5Scr)
					Case 6
						game.Start(Game6Scr)
					Case 7
						game.Start(Game7Scr)
					Case 8
						game.Start(Game8Scr)
					Case 9
						game.Start(Game9Scr)
					Case 10
						game.Start(Game10Scr)
					Case 11
						game.Start(Game11Scr)
					Case 12
						game.Start(Game12Scr)
					Case 13
						game.Start(Game13Scr)
					Case 14
						game.Start(Game14Scr)
					Case 15
						game.Start(Game15Scr)
					Case 16
						game.Start(Game16Scr)
					Case 17
						game.Start(Game17Scr)
					Case 18
						game.Start(Game18Scr)
					Case 19
						game.Start(Game19Scr)
					Case 20
						game.Start(Game20Scr)
				End
			End if
			
		EndIf
	
	
	End
	
	#Rem
	'summary: LoadGames
	loads the games from a text file, which should make it easier to add new games.
	#END
	method LoadGameIcons:Void()
		For Local count:Int = 0 to 19
			Self.Icons[count] = game.images.Find("game" + (count + 1) + "_icon")
			Self.Thumbs[count] = game.images.Find("game" + (count + 1) + "_thumb")
		Next
	End method

	
End




Global GameList:miniGame[20]
#Rem
	'summary: miniGame
	Class used to just help oganise the game list a litte
#END
Class miniGame
	Field name:string
	Field id:Int
	Field iconname:String
	Field thumbnail:string
	Field author:String
	Field authorurl:String
	Field info:String
End


Function MouseOver:Bool(_x:Int, _y:Int, _w:Int, _h:int)
	Local result:Bool = false
	
		if TouchX() > _x And TouchX() < (_x + _w) And TouchY() > _y And TouchY() < (_y + _h)
			result = true
		EndIf
	
	Return result
End


#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end