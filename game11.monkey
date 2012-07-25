#Rem
header:
[quote]

[b]File Name :[/b] Game11Screen
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
Class Game11Screen Extends Screen
	Field background:Image
	Field PlayerOne:cPlayer
	Field PlayerTwo:cPlayer
	Field Ball:cBall
	Field collisions:float
	
	Method New()
		name = "Game 11 Screen"
		Local gameid:Int = 11
		GameList[gameid - 1] = New miniGame
		GameList[gameid - 1].id = gameid - 1
		GameList[gameid - 1].name = "Pong"
		GameList[gameid - 1].iconname = "game" + gameid + "_icon"
		GameList[gameid - 1].thumbnail = "game" + gameid + "_thumb"
		GameList[gameid - 1].author = "Paul Grayston"
		GameList[gameid - 1].authorurl = "dev.cruel-gaming.com"
		GameList[gameid - 1].info = "Quick and Messy PONG, might be of help to some new people looking for that first project."
	End
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		game.screenFade.Start(50, False)
		Self.background = LoadImage("graphics/game11/background.png")

		PlayerList = New List<cPlayer>
		
		Self.PlayerOne = New cPlayer(AI,LEFTSIDE)
		Self.PlayerTwo = New cPlayer(AI,RIGHTSIDE)
		
		Self.Ball = New cBall
		Self.collisions=0
		'Return 0
	End
	
	#Rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		DrawImage(Self.background, 0, 0, 0)
		
		For Local bat:cPlayer = Eachin PlayerList
			bat.Render()
		Next
		
		Self.Ball.Render()
		
		TitleFont.DrawText(PlayerOne.score + " | " + PlayerTwo.score, 320, 95, 2)
		
'		Return 0		

	End

	#Rem
	sumary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
		'
		Self.Ball.Update(PlayerOne, PlayerTwo)
		
		For Local bat:cPlayer = Eachin PlayerList

			bat.Update(Self.Ball)
			
			If RectsOverlap(bat.x,bat.y,16,67,Self.Ball.x,Self.Ball.y,17,18) And Self.collisions=0
				Self.Ball.dx = -Self.Ball.dx
				Self.Ball.Nudge()
				Self.collisions=1
			Else
				Self.collisions-=.2
				If Self.collisions<0 Then Self.collisions=0
			End If
		Next
		
		if KeyHit(KEY_ESCAPE)
			FadeToScreen(TitleScr)
			 
		EndIf
		
	End method

	
End


Const PLAYER:Int = 1
Const AI:Int = 2
Const LEFTSIDE:Int = 1
Const RIGHTSIDE:Int = 2

Global PlayerList:List<cPlayer>

Class cBall
	Field x:Float
	Field y:Float
	Field dx:Float
	Field dy:Float
	Field angle:Int
	Field speed:Float
	Field sprite:Image

	
	Method New()
		Self.sprite = LoadImage("graphics/game11/ball.png")
		Self.x=323
		Self.y=277
		Self.angle=Rnd(90)+Rnd(-10,10)
		Self.dx=Sin(Self.angle)
		Self.dy=Cos(Self.angle)
		Self.speed=3
	End Method
	
	Method Update:Void(_PlayerOne:cPlayer,_PlayerTwo:cPlayer)
		Self.x+=Self.dx*Self.speed
		Self.y+=Self.dy*Self.speed
		
		If Self.y>440 Then
			Self.y=440
			Self.dy=-Self.dy
			Self.Nudge()
		End If

		If Self.y<128 Then
			Self.y=128
			Self.dy=-Self.dy
			Self.Nudge()
		End If

		If Self.x<0
			_PlayerTwo.score+=1
			Self.Reset()
		End If
		
		If Self.x>640
			_PlayerOne.score+=1
			Self.Reset()
		End If
		
	End Method
	
	Method Reset:void()
		Self.x=323
		Self.y=277
		Self.angle=Rnd(90)+Rnd(-10,10)
		Self.dx=Sin(Self.angle)
		Self.dy=Cos(Self.angle)
		Self.speed=3
	End Method
	
	Method Nudge:void()
		Self.angle=ATan2(Self.dx,Self.dy)
		Self.angle+=Rnd(-10,10)
		Self.dx=Sin(Self.angle)
		Self.dy=Cos(Self.angle)	
		Self.speed+=.2	
	End Method 
	
	Method Render:Void()
		DrawImage(Self.sprite,Self.x,Self.y)
	End Method
End Class



Class cBat
	Field x:Int
	Field y:Int
	Field sprite:Image
End Class



Class cPlayer Extends cBat
	Field score:Int
	Field ai:Int
	Field side:Int
	
	Method New(_ai:Int,_side:Int)
		Self.sprite = LoadImage("graphics/game11/bat.png")
		Self.side=_side
		Select _side
			Case LEFTSIDE
				Self.x=53
			Case RIGHTSIDE
				Self.x=590
		End Select
		
		Self.y=250
		Self.ai=_ai
		PlayerList.AddLast(Self)
		
	End Method

	Method Render:Void()
		DrawImage (Self.sprite,Self.x,Self.y)
	End Method

	Method Update:Void(_ball:cBall)
		Select ai
			Case AI
				UpdateAI(_ball)
			Case PLAYER
				UpdatePlayer()
		End Select
	End Method	
		
	Method Up:Void()
		Self.y-=3
	End Method
	
	Method Down:Void()
		Self.y+=3
	End Method	

	Method UpdateAI:Void(_ball:cBall)
	
		Select Self.side
			Case LEFTSIDE
				Select True
					Case _ball.angle<0
						'traveling left
						If _ball.y> Self.y Then Self.Down()
						If _ball.y< Self.y Then Self.Up()
						
					Case _ball.angle>0
						'traveling right
						If Self.y>265 Then
							Self.Up()
							Self.Up()
						End If
							
						If Self.y<260 Then
							Self.Down()						
							Self.Down()
						End If
				End Select
			Case RIGHTSIDE
				Select True
					Case _ball.angle<0
						'traveling right
						'traveling right
						If Self.y>265 Then
							Self.Up()
							Self.Up()
						End If
							
						If Self.y<260 Then
							Self.Down()						
							Self.Down()
						End If						

						
					Case _ball.angle>0
						'traveling left
						If _ball.y> Self.y Then Self.Down()
						If _ball.y< Self.y Then Self.Up()
					
				End Select			
		End Select
	End Method
	
	Method UpdatePlayer:Void()
		If KeyDown(KEY_DOWN) Then
			If Self.y<384 Then Self.Down()
		End If
		
		If KeyDown(KEY_UP)	Then
			If Self.y>128 Then Self.Up()
		End If
		
	End Method
	
End Class

#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end