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
		game.screenFade.Start(50, False)
		
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
		InfoFont.DrawText(GameList[Self.selected].info, 295, stp, 1, 308)
		
		
		

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
		
		if MouseOver(399, 406, 93, 45)
			
			if TouchHit() or MouseHit(MOUSE_LEFT)
			'clicked play.
				select Self.selected + 1
					Case 1
						game.nextScreen = Game1Scr
						game.screenFade.Start(50, true)
					Case 2
						game.nextScreen = Game2Scr
						game.screenFade.Start(50, true)
					Case 3
						game.nextScreen = Game3Scr
						game.screenFade.Start(50, true)
					Case 4
						game.nextScreen = Game4Scr
						game.screenFade.Start(50, true)
					Case 5
						game.nextScreen = Game5Scr
						game.screenFade.Start(50, true)
					Case 6
						game.nextScreen = Game6Scr
						game.screenFade.Start(50, true)
					Case 7
						game.nextScreen = Game7Scr
						game.screenFade.Start(50, true)
					Case 8
						game.nextScreen = Game8Scr
						game.screenFade.Start(50, true)
					Case 9
						game.nextScreen = Game9Scr
						game.screenFade.Start(50, true)
					Case 10
						game.nextScreen = Game10Scr
						game.screenFade.Start(50, true)
					Case 11
						game.nextScreen = Game11Scr
						game.screenFade.Start(50, true)
					Case 12
						game.nextScreen = Game12Scr
						game.screenFade.Start(50, true)
					Case 13
						game.nextScreen = Game13Scr
						game.screenFade.Start(50, true)
					Case 14
						game.nextScreen = Game14Scr
						game.screenFade.Start(50, true)
					Case 15
						game.nextScreen = Game15Scr
						game.screenFade.Start(50, true)
					Case 16
						game.nextScreen = Game16Scr
						game.screenFade.Start(50, true)
					Case 17
						game.nextScreen = Game17Scr
						game.screenFade.Start(50, true)
					Case 18
						game.nextScreen = Game18Scr
						game.screenFade.Start(50, true)
					Case 19
						game.nextScreen = Game19Scr
						game.screenFade.Start(50, true)
					Case 20
						game.nextScreen = Game20Scr
						game.screenFade.Start(50, true)
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