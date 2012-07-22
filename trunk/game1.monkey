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
Global HighScore:Int = 100
Global blockscorefont:BitmapFont2
Global blockfont:BitmapFont2

Const BLUE:Int = 1
Const GREEN:Int = 2
Const ORANGE:Int = 3
Const PURPLE:Int = 4
Const RED:Int = 5

Global GameOver:bool = false

Global Game1PlayScr:Screen = New Game1PlayScreen()
#Rem
summary:Title Screen Class.
Used to manage and deal with all Tital Page stuff.
#End
Class Game1PlayScreen Extends Screen
	
	Field background:Image
	Field clearing:Bool
	Field scoreup:bool
	
	
	
	#Rem
	summary: New
	New method to create a new instance of this screen class.
	#End
	Method New()
		name = "Game 1 Play Screen"
		
		clearing = False
				
	End
	
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
				
		game.screenFade.Start(50, False)
		background = LoadImage("graphics/game1/bg.png")
		
		TaiPlayer = New Tai_Player(320)
		ClearGameData()
		TaiPlayer.score = 0
		TaiPlayer.life = 3
		TaiPlayer.score = 0
		scoreup = false
		TaiWave = 1
		self.clearing = false
		CreateWave(TaiWave)
		GameOver = false
		
	End
	
	
	#Rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
			DrawImage(background, 0, 0)
			'TitleFont.DrawText("Taiphoz Invaders", 320, 240, 2)
			
			'blockscorefont.DrawText(TaiPlayer.score, DEVICE_WIDTH / 2, 1, 2)
			
			
			
			for local ub:Tai_Bullet = eachin TaiBulletList
				ub.render()
			Next		
	
			for local ua:Tai_Alien = eachin TaiAlienList
				ua.renderbloom()
				ua.render()
			Next
			
			'for local ua:Tai_Alien = eachin TaiAlienList
				'ua.render()
			'Next
				
			for local pu:TaiPowerUp = eachin TaiPowerUplist
				pu.draw()
			Next
			
			for local pt:cParticle = eachin cParticleList
				pt.draw()
			Next			
					
			For Local lpx:Int = 1 to 3
				PushMatrix
				
				SetMatrix(1, 0, 0, 1, 0, 0)
				Scale 0.5, 0.5
				Translate((DEVICE_WIDTH + 21) - (lpx * 42), DEVICE_HEIGHT - 21)
				
				DrawImage(TaiPlayer.heart.image, (DEVICE_WIDTH + 21) - (lpx * 42), DEVICE_HEIGHT - 21)
				
				PopMatrix
			Next
					
			For Local lpx:Int = 1 to TaiPlayer.life
				DrawImage(TaiPlayer.fullheart.image, (DEVICE_WIDTH + 21) - (lpx * 42), DEVICE_HEIGHT - 21)
			Next
			
			
			TaiPlayer.render()
			
			
			if GameOver = true
				'ok game over. lets draw the score in the center with a text message.
				blockscorefont.DrawText(TaiPlayer.score, DEVICE_WIDTH / 2, 240, 2)
				select self.scoreup
					Case true
						blockfont.DrawText("WOW! New High Score", DEVICE_WIDTH / 2, 300, 2)
					case false
						blockfont.DrawText("Better Luck Next Time!", DEVICE_WIDTH / 2, 300, 2)
				End Select

			else
				blockscorefont.DrawText(TaiPlayer.score, DEVICE_WIDTH / 2, 1, 2)
			EndIf
			
						

			
			TitleFont.DrawText("x " + TaiPlayer.x, 10, 60, 1)
			TitleFont.DrawText("Bullets " + TaiBulletList.Count(), 10, 80, 1)
			TitleFont.DrawText("Aliens " + TaiAlienList.Count(), 10, 100, 1)
			TitleFont.DrawText("Wave " + TaiWave, 10, 120, 1)
			TitleFont.DrawText("Base " + TaiBaseSpeed, 10, 140, 1)
			TitleFont.DrawText("Particles " + cParticleList.Count(), 10, 180, 1)
			TitleFont.DrawText("Life " + TaiPlayer.life, 10, 200, 1)

	End

	#Rem
	summary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
		
		if GameOver = false
		
			CollisionCheck()
		
			if TaiPlayer.life <= 0
				GameOver = true
				If TaiPlayer.score > HighScore Then
					HighScore = TaiPlayer.score
					Self.scoreup = true
				End if
								
			EndIf
		
			if TaiPlayer.life > 0 And TaiAlienList.Count() = 0 And cParticleList.Count() = 0 And TaiBulletList.Count() = 0 and TaiPowerUplist.Count() = 0 ' waveout = false
				TaiWave += 1
				CreateWave(TaiWave)
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
			
			for local pu:TaiPowerUp = eachin TaiPowerUplist
				pu.update()
			Next
			
			for local pt:cParticle = eachin cParticleList
				pt.update()
			Next			
			
			if Tai_Shunt = True
				ShuntDown()
				Tai_Shunt = False
			EndIf
					
			if KeyHit(KEY_ESCAPE)
				
				FadeToScreen(Game1Scr)
			EndIf
		Else
			'game over , detect a touch to go back.
			
			if TouchHit()
				ClearGameData()
				FadeToScreen(Game1Scr)
			EndIf
			
		End if

	End method

	
End


'summary:Clear out all the lists, and bullets, aliens. etc.
Function ClearGameData()
	TaiBulletList.Clear
	TaiAlienList.Clear
	TaiPowerUplist.Clear
	cParticleList.Clear
End Function


#Rem
	summary: Check the bullet against all collidable objects.
	Using the bullet as its the most common check.
#END

Function CollisionCheck()

	For Local shot:Tai_Bullet = eachin TaiBulletList
		
		'check aliens.
		
		For Local alien:Tai_Alien = eachin TaiAlienList
			if RectsOverlap(shot.x, shot.y, 10, 10, alien.x - 18, alien.y - 20, 36, 40) and shot.dir = UP And shot.life > 0
				'bullet hit the alien.
				
				alien.shoot()
				
				if alien.life <= 1 Then
					'it died, give points
					alien.life = 0
					'Print "Adding a point"
					TaiPlayer.AddScore(alien.pts)
				else
					'its alive make it shoot back
					'and take some like off.
					alien.life -= 1
					
				EndIf
				
				shot.life = 0
			End if
		Next
		
		'check power ups.
		
		For Local power:TaiPowerUp = eachin TaiPowerUplist
			if RectsOverlap(shot.x, shot.y, 10, 10, power.x - 18, power.y - 20, 36, 41) and shot.dir = UP And shot.life > 0
				'bullet hit the power.
				shot.life = 0
				power.life -= 1
				
			End if				
			
		Next
		
		

		
		
		'check player.

		if shot.dir = DOWN
			if RectsOverlap(shot.x, shot.y, 10, 10, TaiPlayer.x - 20, TaiPlayer.y - 20, 40, 40) And shot.life > 0
				'bullet hit the player.
				TaiPlayer.life -= 1
				shot.life = 0
				
			End if
		EndIf
	
		
	
	Next

		

End Function

Class Game1Screen Extends Screen
	
	Field background:Image
	
	
	
	
	#Rem
	summary: New
	New method to create a new instance of this screen class.
	#End
	Method New()
		name = "Game 1 Menu"
		
		
		
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
		background = LoadImage("graphics/game1/menu.png")
		blockscorefont = New BitmapFont2("graphics/game1/block_score.txt", True)
		blockfont = New BitmapFont2("graphics/game1/block.txt", True)
		'blockfont.DrawShadow = False
		
	End
	
	
	#Rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		DrawImage(background, 0, 0)
		blockscorefont.DrawText(HighScore, DEVICE_WIDTH / 2, 180, 2)
		'blockscorefont.DrawText("1 2 3 4 5 6 7 8 9 0", DEVICE_WIDTH / 2, 180, 2)
	End

	#Rem
	summary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
	
		if KeyHit(KEY_SPACE)
			FadeToScreen(Game1PlayScr)
		EndIf
	
		if TouchHit() or TouchDown()
			
			if MouseOver(15, 214, 264, 203)
				'back
				FadeToScreen(TitleScr)
			EndIf
			
			if MouseOver(366, 214, 264, 203)
				'play
				FadeToScreen(Game1PlayScr)
			EndIf
		EndIf
		
		if KeyHit(KEY_ESCAPE)
			FadeToScreen(TitleScr)
		EndIf
			
	End method

	
End





'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************









#Rem
summary: Tai_Player
Class Created to manage the Player charcter
#End
Class Tai_Player
	Field sprite:GameImage
	Field heart:GameImage
	Field fullheart:GameImage
	
	Field x:Int
	Field y:Int
	Field life:Int
	Field state:int
	Field score:Int
	Field held:Int
	
	Field bullettime:Int
	Field bulletstall:Int
	
	Field gunopen:Int
	
	Field power:Int
	
	
	#Rem
		summary: new
		Create a new Player and provided _x position with the provided _life
	#END
	Method new(_x:Int, _life = 3, _power:Int = 1)
	
		self.sprite = game.images.Find("game1_player")
		self.fullheart = game.images.Find("game1_fullheart")
		self.heart = game.images.Find("game1_emptyheart")
		Self.x = _x
		Self.y = 450
		Self.life = _life
		Self.state = 1
		Self.held = 0
		
		self.bullettime = Millisecs()
		Self.bulletstall = 100
		
		Self.gunopen = 0
		Self.power = _power
		
	End
	
	
	#Rem
		summary: gives the player some points :P
		wooot score muahahahaha
	#END
	Method AddScore(_score:int)
		
		TaiPlayer.score+=_score	
	End Method
	
	
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
				TaiPlayer.Shoot
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
			Local shot:Tai_Bullet
			Select Self.power
				Case 1
					shot = new Tai_Bullet(TaiPlayer.x, TaiPlayer.y, 1)
				Case 2
					shot = new Tai_Bullet(TaiPlayer.x - 20, TaiPlayer.y + 18, 1)
					shot = new Tai_Bullet(TaiPlayer.x + 20, TaiPlayer.y + 18, 1)
				Case 3
					shot = new Tai_Bullet(TaiPlayer.x, TaiPlayer.y, 1)
					shot = new Tai_Bullet(TaiPlayer.x - 20, TaiPlayer.y + 18, 1)
					shot = new Tai_Bullet(TaiPlayer.x + 20, TaiPlayer.y + 18, 1)
					
				
			End
			
			
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










'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************









Global Taiwave:int=0

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
	Field color:Int
	Field pts:int

	Field bloom:GameImage
	
	#Rem
		summary: new
		Create's a new alien at _x,_y with _life of colour _color and ship type _ship at speed _speed .
		And then adds this new alien to the TaiAlienList
	#END
	Method new(_x:Int, _y:Int, _life:Int, _color:int = 1, _ship:int, _speed:int)
	
		Self.x = _x
		Self.y = _y
		Self.life = _life
		Self.pts = _life * 3
		Self.dir = 1
		Self.speed = _speed
		Self.color = _color
		
		Select _color
			Case BLUE
				Self.sprite = game.images.Find("game1_alien" + _ship + "_blue")
				Self.bloom = game.images.Find("game1_glow_blue")
			Case GREEN
				Self.sprite = game.images.Find("game1_alien" + _ship + "_green")
				Self.bloom = game.images.Find("game1_glow_green")
			Case ORANGE
				Self.sprite = game.images.Find("game1_alien" + _ship + "_orange")
				Self.bloom = game.images.Find("game1_glow_orange")
			Case PURPLE
				Self.sprite = game.images.Find("game1_alien" + _ship + "_purple")
				Self.bloom = game.images.Find("game1_glow_purple")
				
		End Select
		
		TaiAlienList.AddLast(Self)
		
	End	
	
		
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
		
		
		

		
		
		
		
		if Self.life <= 0
		
			CreateBang(Self.x, Self.y, Self.color, Rnd(10, 20))
			
			Local pup:Int = Rnd(1, 10)
			
			Select True
				Case pup > 8
					'change this to drop new powerups
					Local tp:Int = int(Rnd(1, 6))
					if tp > 5 Then tp = 5
					
					Local np:TaiPowerUp = new TaiPowerUp(self.x, self.y, tp)
					'Print "Making a POwerup"
			End select
		
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
	
	Method renderbloom()
		DrawImage(Self.bloom.image, Self.x, Self.y)
	End

	Method shoot()
		Local shot:Tai_Bullet
		shot = new Tai_Bullet(self.x, self.y, DOWN, self.color)
	End Method
	
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

	
	
	







'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************







	
	
Const UP:Int = 1
Const DOWN:Int = 0
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
	
	'summary:Create a new bullet at _x,_y traveling in _dir direction (0=down 1=up)
	Method new(_x:Int, _y:Int, _dir:Int = UP, _color:int = RED)
		Select _dir
			Case UP
				'Player Shooting UP
				Self.sprite = game.images.Find("game1_player_bullet")
			Case DOWN
				'Alien shooting down.
				select _color
					Case BLUE
						Self.sprite = game.images.Find("game1_bullet_blue")'must rmemebr to fix this image filename.
					Case GREEN
						Self.sprite = game.images.Find("game1_bullet_green")
					Case ORANGE
						Self.sprite = game.images.Find("game1_bullet_orange")
					Case PURPLE
						Self.sprite = game.images.Find("game1_bullet_purple")
				End Select
		End Select
		
		
		Self.x = _x
		Self.y = _y
		Self.dir = _dir
		Self.life = 1
		TaiBulletList.AddLast(self)
	End
	
	'summary:update bullets, moved them in the appropriate direction based on self.dir
	Method update()
	
		Select Self.dir
			Case DOWN ' down
				Self.y += 8
			Case UP ' up
				Self.y -= 8
		End
		
		if Self.y < 0 or Self.y > 480
			Self.life = 0
		EndIf	
		
		if Self.life <= 0
			CreateShatter(Self.x, Self.y, 10)
			TaiBulletList.Remove(self)
		EndIf
		
		
		
	End
	
	'summary:Draw bullets.
	Method render()
		DrawImage(Self.sprite.image, Self.x, Self.y)
	End
End









'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************




Global TaiPowerUplist:List<TaiPowerUp> = new List<TaiPowerUp>

Const TAIPOWERUP:Int = 1
Const TAIPOWERDOWN:Int = 2
Const TAISPEED:Int = 3
Const TAISLOW:Int = 4
Const TAIBOMB:Int = 5


Class TaiPowerUp
	Field x:Int
	Field y:Int
	Field life:Int
	Field sprite:GameImage
	Field type:Int
	Field pts:Int
	
	Method new(_x:Int, _y:Int, _power)
		Self.x = _x
		Self.y = _y
		Self.type = _power
		Self.life = 10
		
		select _power
			Case TAIPOWERUP
				Self.sprite = game.images.Find("game1_powerup")
				Self.pts = 100
			Case TAIPOWERDOWN
				Self.sprite = game.images.Find("game1_powerdown")
				Self.pts = -100
			Case TAIBOMB
				Self.life = 4
				Self.sprite = game.images.Find("game1_powerbomb")
				Self.pts = 100
			Case TAISPEED
				Self.sprite = game.images.Find("game1_powerspeed")
				Self.pts = -100
			Case TAISLOW
				Self.sprite = game.images.Find("game1_powerslow")
				Self.pts = 100
		End select
				
		
		TaiPowerUplist.AddLast(self)
	End
	
	Method update()
		Self.y += 2
		
		if Self.y > 640 Then self.life = 0

		'power hit the player
		if RectsOverlap(TaiPlayer.x - 20, TaiPlayer.y - 20, 40, 40, Self.x - 20, Self.y - 20, 40, 40)
			'Print "Hit"
			Self.life = 0
			
			select Self.type
				Case TAIPOWERUP
					if TaiPlayer.power <= 2 then TaiPlayer.power += 1
					CreateRing(TaiPlayer.x, TaiPlayer.y, RED)
					
				Case TAIPOWERDOWN
					if TaiPlayer.power >= 2 then TaiPlayer.power -= 1
					CreateRing(TaiPlayer.x, TaiPlayer.y, BLUE)
					
				Case TAIBOMB
					CreateRing(TaiPlayer.x, TaiPlayer.y, RED)
					
					For Local px:Int = 1 to SCREEN_WIDTH / 50
						Local xb:Tai_Bullet = new Tai_Bullet(px * 50, 400, UP, RED)
					next
					
				Case TAISPEED
					CreateRing(TaiPlayer.x, TaiPlayer.y, BLUE)
					TaiBaseSpeed += 0.5
					
				Case TAISLOW
					CreateRing(TaiPlayer.x, TaiPlayer.y, RED)
					if TaiBaseSpeed >= 0.5 Then TaiBaseSpeed -= 0.5
				
			End select		
					
		EndIf
		
		if Self.life <= 0 Then TaiPowerUplist.Remove(Self)
	End
	
	Method draw()
		DrawImage(Self.sprite.image, Self.x, Self.y)
	End
End










'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************





Global cParticleList:List<cParticle> = new List<cParticle>

#Rem
	summary: Particle Manager
	Basic Particle Manager, wont bother with emiiters.
#END
Class cParticle
	'position
	Field x:float
	field y:Float
	Field dx:Float
	Field dy:float
	Field angle:float
	Field force:float
	
	
	'environment
	Field gravity:Float
	Field friction:Float
	
	Field winddirection:Float
	Field windrange:Float
	Field windforce:Float
	
	
	'data
	Field life:float
	Field sprite:GameImage
	
	Method new(_x:float, _y:float, _color:int)
		Self.x = _x
		Self.y = _y
		Self.angle = Rnd( - 180, 180)
		Self.dx = Sin(Self.angle)
		Self.dy = Cos(Self.angle)
		Self.force = Rnd(10, 15)
		
		Self.gravity = 0.2
		self.friction = 0.9
		Self.life = 100
		
		
		Select _color
			Case BLUE
				Self.sprite = game.images.Find("game1_bluebit" + int(Rnd(1, 3)))
			Case GREEN
				Self.sprite = game.images.Find("game1_greenbit" + int(Rnd(1, 3)))
			Case ORANGE
				Self.sprite = game.images.Find("game1_orangebit" + int(Rnd(1, 3)))
			Case PURPLE
				Self.sprite = game.images.Find("game1_purplebit" + int(Rnd(1, 3)))
			Case RED
				Self.sprite = game.images.Find("game1_redbit" + int(Rnd(1, 3)))
		End select
		
		cParticleList.AddLast(Self)
	End Method
	
	Method updatevector()
		Self.dx = Sin(Self.angle)
		Self.dy = Cos(Self.angle)
	End Method
	
	Method update()
	
		'move
		Self.x += self.dx * Self.force
		Self.y += Self.dy * Self.force
		
		'apply env
		if self.friction <> 0 then Self.force *= Self.friction
		if gravity <> 0 then
				Self.gravity += 0.2
				Self.y += Self.gravity
		EndIf
		
		if Self.life <= 0 or (Self.x < 0) or (Self.y < 0) or (Self.x > DEVICE_WIDTH) or (Self.y > DEVICE_HEIGHT)
			cParticleList.Remove(Self)
		EndIf
		
	End Method
	
	Method draw()
		DrawImage Self.sprite.image, Self.x, Self.y
	End Method
	
	Method new(_x:float, _y:float, _gravity:float, _friction:float, _winddirection:float, _windrange:float, _windforce:float, _life:float)
		'for a more complex particle.
		'probably not gona need this tho.
	End Method
	
	
End Class



'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************
'*********************************************************************************************

#Rem
	summary: Create a burst of particles.
#END
Function CreateBang:void(_x:Int, _y:Int, _color:Int = BLUE, _count:int = 20)
	
	For Local loop:Int = 1 to _count
		Local part:cParticle = new cParticle(_x, _y, _color)
	Next
		
End Function


Function CreateRing:void(_x:Int, _y:Int, _color:Int = BLUE)
	local loop:Int
	For loop = 1 to 360 step 12
		Local part:cParticle = new cParticle(_x, _y, _color)
			part.gravity = 0
			part.friction = 0
			part.angle = loop
			part.updatevector()
	Next
End function


Function CreateShatter:void(_x:Int, _y:Int, _count:int = 20)
	For Local loop:Int = 1 to _count
		Local part:cParticle = new cParticle(_x, _y, RED)
		part.friction = 0
		part.gravity = 0
		part.angle = 180 + Rnd( - 30, 30)
		part.updatevector()
	Next	
End Function


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


Global TaiWave:Int = 0
Global TaiBaseSpeed:Float = 0

#Rem
	summary: Creates alien waves.
	waves are created based on current level, and current base speed, which increases a little each new level
	making the ships travel faster the further you progress.
#END
Function CreateWave(_wave:Int = 1)
	
	'level structure, 10 aliens, so 10 waves.
	'after wave ten change alien colour start again but increase
	'thei health and their shooting speed.
	'by stage 4, or 5, it should be dodge and bullet hell. :P

	
	
	
	Local _speed:Int = 1
	Local _ship:Int = 1
	Local _color:Int = 1
	Local _life:Int
		
	select true
	
		Case(_wave > 0 and _wave < 11) '1-10
			TaiBaseSpeed += 0.5
			_ship = _wave
			_color = GREEN
			_life = 1
			
		Case(_wave >= 11 And _wave <= 20) '11-20
			TaiBaseSpeed += 1
			_ship = (_wave - 10)
			_color = BLUE
			_life = 2
			
		Case(_wave >= 21 And _wave <= 30)
			TaiBaseSpeed += 1.5
			_ship = (_wave - 20)
			_color = PURPLE
			_life = 3
			
		Case(_wave >= 31 And _wave <= 40)
			TaiBaseSpeed += 2.5
			_ship = (_wave-30)
			_color = ORANGE
			_life = 4
		
	End

	Local ta:Tai_Alien
	For Local y:Int = 0 to 3
		For Local x:Int = 0 to 6
			ta = New Tai_Alien(50 + (x * 50), 50 + (y * 50), _life, _color, _ship, _speed)
		Next
	Next
	
End Function



#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end