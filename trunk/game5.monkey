#Rem
header:
[quote]

[b]File Name :[/b] Game5Screen
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
Class Game5Screen Extends Screen

	
	Method New()
		name = "Game 5 Screen"
	End
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		game.screenFade.Start(50, False)		
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
			game.nextScreen = TitleScr
			game.screenFade.Start(50, true)
		EndIf
		
	End method

	
End


#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end