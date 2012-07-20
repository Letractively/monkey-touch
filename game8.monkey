#Rem
header:
[quote]

[b]File Name :[/b] Game8Screen
[b]Author    :[/b] firstname "alias" lastname
[b]About     :[/b]
what it is..
[/quote]
#end



Import main

#Rem
summary:Title Screen Class.
Used to manage and deal with all Tital Page stuff.
#End
Class Game8Screen Extends Screen

	
	Method New()
		name = "Game 8 Screen"
		Local gameid:Int = 8
		GameList[gameid - 1] = New miniGame
		GameList[gameid - 1].id = gameid - 1
		GameList[gameid - 1].name = "Steves"
		GameList[gameid - 1].iconname = "game" + gameid + "_icon"
		GameList[gameid - 1].thumbnail = "game" + gameid + "_thumb"
		GameList[gameid - 1].author = "Steven Revill"
		GameList[gameid - 1].authorurl = "therevillsgames.com"
		GameList[gameid - 1].info = "????"
	End
	
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
	
	End
	
	#Rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		TitleFont.DrawText(self.name, 320, 240,2)
	End

	#Rem
	sumary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
		'
		if KeyHit(KEY_ESCAPE)
			FadeToScreen(TitleScr)
		EndIf
		
	End method

	
End


#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end