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
Class AboutScreen Extends Screen
	Field background:GameImage
	Field background_mask:GameImage
	
	Field y:Float
	Field abouttext:String
	
	
	Method New()
		name = "About Screen"
	End
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		background = game.images.Find("about")
		background_mask = game.images.Find("about_mask")
		Self.y = 440
		 abouttext = "Welcome to the MonkeyCoder.co.nz Community~n"
		abouttext += "Project, built with monkey, for monkey and~n"
		abouttext += "for the community.~n~n"
		abouttext += ""
		abouttext += "Each of the Mini Games in this Project were~n"
		abouttext += "written in the monkey programming language~n"
		abouttext += "A simple and easy to learn language that will~n"
		abouttext += "let even the most novis of programmers ~n"
		abouttext += "quickly create and build their own games.~n~n"
		abouttext += ""
		abouttext += "Not only will you be able to make your own~n"
		abouttext += "games, but thanks to monkey's amazing list~n"
		abouttext += "of Targets you will be able to easily Export~n"
		abouttext += "your game to any platform.~n~n"
		abouttext += ""
		abouttext += "You write your code in monkey, and then deply~n"
		abouttext += "on as many or as few platforms as you like."
		abouttext += ""
		
	End
	
	#Rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		DrawImage(background.image, 0, 0)
		
		
		InfoFont.DrawText(abouttext, 159, Self.y, 1)
		
					
		DrawImage(background_mask.image, 159, 0)
		
		SmallFont.DrawText("y = " + Self.y, 20, 60)
		
	End

	#Rem
	sumary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
	
		Self.y -= 0.2
	
	if MouseOver(42, 399, 100, 57)
		if TouchHit() or MouseHit(MOUSE_LEFT)
			game.Start(TitleScr)
		End if
	EndIf
	
	
	End
	
End


#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end