#Rem
header:
[quote]

[b]File Name :[/b] Game1Screen
[b]Author    :[/b] Paul "Taiphoz" Grayston
[b]About     :[/b]
Space Invaders with little glowing ships, keeping this nice and 
basic, endless levels of ever increasing speed and a hail of bullets
to test the players reflex's
[/quote]
#end

Import main


Global TaiPlayer:Tai_Player
Global Tai_Shunt:Bool = False

#Rem
summary:Title Screen Class.
Used to manage and deal with all Tital Page stuff.
#End
Class Game1Screen Extends Screen
	
	Field background:Image
	
	
	#Rem
	summary: New
	New method to create a new instance of this screen class.
	#End
	Method New()
		name = "Game 1 Screen"
		
		Local gameid:Int = 1
		
		GameList[gameid - 1] = New miniGame
		GameList[gameid - 1].id = (gameid - 1)
		GameList[gameid - 1].name = "Invader"
		GameList[gameid - 1].iconname = "game" + gameid + "_icon"
		GameList[gameid - 1].thumbnail = "game" + gameid + "_thumb"
		GameList[gameid - 1].author = "Paul Grayston"
		GameList[gameid - 1].authorurl = "dev.cruel-gaming.com"
		GameList[gameid - 1].info = "Aliens are planning to take over the world it's your job to save us all "
		'Print "GameList " + GameList[0].name
		
	End
	
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		game.screenFade.Start(50, False)
		background = LoadImage("graphics/game1/bg.png")
		TaiPlayer = New Tai_Player(320)
		TaiWave = 1
		CreateWave()
	End
	
	
	#Rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		DrawImage(background, 0, 0)
		TitleFont.DrawText("Taiphoz Invaders", 320, 240, 2)
		TitleFont.DrawText("Score : " + TaiPlayer.score, 1, 1, 1)
		TitleFont.DrawText(TaiPlayer.life + ": Lives", 640, 1, 3)
		
		for local ub:Tai_Bullet = eachin TaiBulletList
			ub.render()
		Next		

		for local ua:Tai_Alien = eachin TaiAlienList
			ua.render()
		Next		
		
		TaiPlayer.render()
		
		TitleFont.DrawText("x " + TaiPlayer.x, 10, 60, 1)
		TitleFont.DrawText("Bullets " + TaiBulletList.Count(), 10, 80, 1)
		TitleFont.DrawText("Aliens " + TaiAlienList.Count(), 10, 100, 1)
		TitleFont.DrawText("Wave " + TaiWave, 10, 120, 1)
		TitleFont.DrawText("Base " + TaiBaseSpeed, 10, 140, 1)
		
	End

	#Rem
	summary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
		'
		if TaiPlayer.life > 0 And TaiAlienList.Count() = 0
			TaiWave += 1
			CreateWave()
		EndIf
		
		
		if KeyDown(KEY_LEFT) Then TaiPlayer.MoveLeft
		if KeyDown(KEY_RIGHT) Then TaiPlayer.MoveRight
		if KeyDown(KEY_Z) Then TaiPlayer.Shoot
		
		TaiPlayer.update()
		
		for local ub:Tai_Bullet = eachin TaiBulletList
			ub.update()
		Next
				
		for local ua:Tai_Alien = eachin TaiAlienList
			ua.update()
		Next
		
		if Tai_Shunt = True
			ShuntDown()
			Tai_Shunt = False
		EndIf
				
		if KeyHit(KEY_ESCAPE)
			game.nextScreen = TitleScr
			game.screenFade.Start(50, true)
		EndIf
		
	End method

	
End


#Rem
summary: Tai_Player
Class Created to manage the Player charcter
#End
Class Tai_Player
	Field sprite:GameImage
	Field x:Int
	Field y:Int
	Field life:Int
	Field state:int
	Field score:Int
	Field held:Int
	
	Field bullettime:Int
	Field bulletstall:Int
	
	Field gunopen:Int
	
	#Rem
		summary: new
		Create a new Player and provided _x position with the provided _life
	#END
	Method new(_x:Int, _life = 3)
	
		self.sprite = game.images.Find("game1_player")
		Self.x = _x
		Self.y = 450
		Self.life = _life
		Self.state = 1
		Self.held = 0
		
		self.bullettime = Millisecs()
		Self.bulletstall = 100
		
		Self.gunopen = 0
		
	End
	
	#Rem
		summary: update
		Update the player , tic through it's timer and handle controls and bound checking
	#END
	Method update()
		
		if Millisecs() - Self.bullettime > Self.bulletstall
			Self.bullettime = Millisecs()
			Self.gunopen = 1
		EndIf
	
		if KeyHit(KEY_Z)
			TaiPlayer.Shoot()
		EndIf
		
		if TouchDown(0)
		
			if Tai_Touching(Self.x, Self.y, 50, 53, 2) or Self.held = true
				TaiPlayer.x = TouchX()
				Self.held = true
			EndIf
			
		Else
			Self.held = false
		EndIf
		
		if Self.x > 617 Then Self.x = 617
		if Self.x < 27 Then self.x = 27
		
	End
	
	'summary:Move Player Left
	Method MoveLeft:void()
		Self.x -= 4
	End
	
	'summary:Move Player Right
	Method MoveRight:void()
		Self.x += 4
	End
	
	'summary:If the player's gun is not reloading then fire off a round.
	Method Shoot()
		'
		if Self.gunopen = 1
			'fire a bullet
			Self.gunopen = 0
			Self.bullettime = Millisecs()
			
			Local shot:Tai_Bullet = new Tai_Bullet(TaiPlayer.x, TaiPlayer.y, 1)
			
		EndIf
		
	End
	
	'summary:Draw the player if it's visible (self.state=1) or dont if its not visible (self.state=0).
	Method render()
		select self.state
			Case 1
				DrawImage(Self.sprite.image, Self.x, Self.y)
			Case 0
				'hit by something , fade out for a little bit.
				'DrawImage Self.sprite, Self.x, Self.y
		End
	End
End

Global Taiwave:int = 2

'summary:Alien List, holds all alien objects once created, used when updating all aliens.
Global TaiAlienList:List<Tai_Alien> = new List<Tai_Alien>

#Rem
	summary:Tai_Alien
	Alien class used to manage and control all alien ships, this class gets instanced and fills up the alienlist.
#END

Class Tai_Alien
	Field sprite:GameImage
	Field x:float
	Field y:float
	Field life:Int
	Field dir:int
	Field speed:float
	
	'dir 1 = left 2 = right
	'color : 1=red 2=green 3=blue 4=yellow
	'ship 1,2,3,4
	
	'summary:Update aliens.
	Method update()
		
		Select Self.dir
			Case 1
				Self.MoveLeft
			Case 2
				Self.MoveRight
		End
	
		
		if Self.y > 480 Then self.life = 0
		
		if Self.x > 617 or Self.x < 27 Then Tai_Shunt = true
		
		
		
		For Local bb:Tai_Bullet = eachin TaiBulletList
			if RectsOverlap(Self.x - 20, Self.y - 20, 40, 40, bb.x, bb.y, 10, 10)
				bb.life = 0
				Self.life -= 1
			EndIf
		Next
		
		
		
		
		if Self.life <= 0
			TaiAlienList.Remove(Self)
		End if
	End
	
	'summary:Move alien left
	Method MoveLeft()
		Self.x -= Self.speed
	End
	
	'summary:Move alien Right
	Method MoveRight()
		Self.x += Self.speed
	End

	'summary:Draw the alien.
	Method render()
		
		DrawImage(Self.sprite.image, Self.x, Self.y)
	End
	
	#Rem
		summary: new
		Create's a new alien at _x,_y with _life of colour _color and ship type _ship at speed _speed .
		And then adds this new alien to the TaiAlienList
	#END
	Method new(_x:Int, _y:Int, _life:Int, _color:int = 1, _ship:int, _speed:int)
	
		Self.x = _x
		Self.y = _y
		Self.life = _life
		Self.dir = 1
		Self.speed = _speed
		
		Select _color
			Case 1
				Select _ship
					Case 1
						Self.sprite = game.images.Find("game1_alien1_red")
					Case 2
						Self.sprite = game.images.Find("game1_alien2_red")
					Case 3
						Self.sprite = game.images.Find("game1_alien3_red")
				End
			Case 2
				Select _ship
					Case 1
						Self.sprite = game.images.Find("game1_alien1_green")
					Case 2
						Self.sprite = game.images.Find("game1_alien2_green")
					Case 3
						Self.sprite = game.images.Find("game1_alien3_green")
				End
			Case 3
				Select _ship
					Case 1
						Self.sprite = game.images.Find("game1_alien1_blue")
					Case 2
						Self.sprite = game.images.Find("game1_alien2_blue")
					Case 3
						Self.sprite = game.images.Find("game1_alien3_blue")
				End
			Case 4
				Select _ship
					Case 1
						Self.sprite = game.images.Find("game1_alien1_yellow")
					Case 2
						Self.sprite = game.images.Find("game1_alien2_yellow")
					Case 3
						Self.sprite = game.images.Find("game1_alien3_yellow")
				End
			
		End select
		
		TaiAlienList.AddLast(Self)
		
	End
End

'summary:Shunts down every alien alive if any alien reaches the side of the screen.
	Function ShuntDown()
		For Local t:Tai_Alien = eachin TaiAlienList
			t.y += 10
			Select t.dir
				Case 1
					t.dir = 2
				Case 2
					t.dir = 1
			End
		Next
	End

	
'summary:Bullet list to manage all the bullets that get fired.
Global TaiBulletList:List<Tai_Bullet> = new List<Tai_Bullet>
#Rem
	summary: Tai_Bullet
	Bullet class used to manage all bullets, will probably make this manage alien and player bullets
#END
Class Tai_Bullet
	Field x:Int
	Field y:Int
	Field sprite:GameImage
	Field life:Int
	Field dir:Int
	
	'summary:Create a new bullet at _x,_y traveling in _dir direction (1=down 0=up)
	Method new(_x:Int, _y:Int, _dir:Int = 1)
		Self.sprite = game.images.Find("game1_player_bullet")
		Self.x = _x
		Self.y = _y
		Self.dir = _dir
		Self.life = 1
		TaiBulletList.AddLast(self)
	End
	
	'summary:update bullets, moved them in the appropriate direction based on self.dir
	Method update()
	
		Select Self.dir
			Case 0 ' down
				Self.y += 8
			Case 1 ' up
				Self.y -= 8
		End
		
		if Self.y < 0 or Self.y > 480
			Self.life = 0
		EndIf
		
		if Self.life <= 0
			TaiBulletList.Remove(self)
		EndIf
		
		
		
	End
	
	'summary:Draw bullets.
	Method render()
		DrawImage(Self.sprite.image, Self.x, Self.y)
	End
End


#Rem
	summary: Check if the player is touching the ship.
	Once the player grabs the ship , match the ships x position to the players finger x, or mouse x.
	paramaters take are x,y,width,height,handle.
	Handle can be 1 - left or 2 - mid.
#END
Function Tai_Touching:Bool(_x:Int, _y:Int, _w:Int, _h:int, _handle:Int = 1)
	Local result:Bool = false
	
		Select _handle
			Case 1 ' left
				if TouchX() > _x And TouchX() < (_x + _w) And TouchY() > _y And TouchY() < (_y + _h)
					result = true
				EndIf			
			Case 2 ' mid
				if TouchX() > _x - (_w / 2) And TouchX() < _x + (_w / 2) And TouchY() > _y - (_h / 2) And TouchY() < _y + (_h / 2)
					result = true
				EndIf			
		End

	
	Return result
End


Global TaiWave:Int = 1
Global TaiBaseSpeed:Float = 0

#Rem
	summary: Creates alien waves.
	waves are created based on current level, and current base speed, which increases a little each new level
	making the ships travel faster the further you progress.
#END
Function CreateWave()
	Local ta:Tai_Alien
	
	Local _speed:Int = 0
	Local _ship:Int = 0
	Local _color:Int = 0
	
	Local _taiwave:Int = TaiWave
	
	select TaiWave
		Case 4
			TaiBaseSpeed += 0.5
		Case 8
			TaiBaseSpeed += 0.5
		Case 12
			TaiBaseSpeed += 0.5
		Case 16
			TaiBaseSpeed += 0.5
	End
			
	
			
	Select _taiwave
		Case 1
			_speed = 2 + TaiBaseSpeed
			_ship = 1
			_color = 1
			
		Case 2
			_speed = 2.5 + TaiBaseSpeed
			_ship = 2
			_color = 2
		Case 3
			_speed = 3 + TaiBaseSpeed
			_ship = 3
			_color = 3
		Case 4
			_speed = 3.5 + TaiBaseSpeed
			_ship = 3
			_color = 4
		Default
			_speed = 3.5 + TaiBaseSpeed
			_ship = 3
			_color = Rnd(1,4)
		
	End
	
	For Local y:Int = 0 to 3
		For Local x:Int = 0 to 6
			ta = New Tai_Alien(50 + (x * 50), 50 + (y * 50), 3, _color, _ship, _speed)
		Next
	Next
End Function


#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end