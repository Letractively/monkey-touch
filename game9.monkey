#rem
header:
[quote]

[b]File Name :[/b] Game9Screen
[b]Author    :[/b] Shane "Samah" Woolcock
[b]About     :[/b]
Touhou Clone
[/quote]
#End


Public
Import main

Private
'Global spriteSheet:GameImage
'Global bossSheet:GameImage
Global smhGameScreen:Smh_GameScreen

Global background:Smh_EntityGroup
Global enemyBullets:Smh_BulletPool
Global playerBullets:Smh_BulletPool
Global enemies:Smh_EnemyPool
Global player:Smh_Player
Global boss:Smh_Boss

Global currentStage:Smh_Stage

Public
#rem
summary:Title Screen Class.
Used to manage and deal with all Title Page stuff.
#End
Class Game9Screen Extends Screen
	Method New()
		name = "Danmaku"
		Local gameid:Int = 9
		GameList[gameid - 1] = New miniGame
		GameList[gameid - 1].id = gameid - 1
		GameList[gameid - 1].name = "Danmaku"
		GameList[gameid - 1].iconname = "game" + gameid + "_icon"
		GameList[gameid - 1].thumbnail = "game" + gameid + "_thumb"
		GameList[gameid - 1].author = "Shane Woolcock"
		GameList[gameid - 1].authorurl = "????"
		GameList[gameid - 1].info = "Touhou Clone"
	End
	
	#rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		game.images.LoadAtlas("game9/game9_bullets1.txt", ImageBank.LIBGDX_ATLAS, True)
		Local tmpImage:GameImage = Null
		'game.images.LoadAnim("Ship1.png", 64, 64, 7, tmpImage)
		smhGameScreen = New Smh_GameScreen
	End
	
	#rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		TitleFont.DrawText(Self.name, 320, 240, 2)
	End

	#rem
	summary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	And all use input.
	#End
	Method Update:Void()
		If KeyHit(KEY_ESCAPE) Then
			FadeToScreen(TitleScr)
		End
		If KeyHit(KEY_SPACE) Or MouseHit() Then
			FadeToScreen(smhGameScreen)
		End
	End
End

Class Smh_GameScreen Extends Screen
	Method Start:Void()
		background = New Smh_EntityGroup
		background.scissor = True
		background.boundsLeft = 20
		background.boundsTop = 20
		background.boundsRight = background.boundsLeft + 400
		background.boundsBottom = SCREEN_HEIGHT - 20
		
		enemyBullets = New Smh_BulletPool
		enemyBullets.parent = background
		
		playerBullets = New Smh_BulletPool
		playerBullets.parent = background
		
		player = New Smh_Player
		player.parent = background
		player.x = background.boundsLeft + (background.boundsRight - background.boundsLeft) * 0.5
		player.y = background.boundsTop + (background.boundsBottom - background.boundsTop) * 0.8
		
		enemies = New Smh_EnemyPool
		enemies.parent = background
		
		currentStage = New Smh_Stage1
	End
	
	Method Kill:Void()
		background = Null
		enemyBullets = Null
		playerBullets = Null
		player = Null
		enemies = Null
		boss = Null
		currentStage = Null
	End
	
	Method Update:Void()
		If KeyHit(KEY_ESCAPE) Then
			FadeToScreen(Game9Scr)
		End
		#Rem
		If KeyHit(KEY_SPACE) Or MouseHit() Then
			If KeyDown(KEY_SHIFT) Then
				enemyBullets.FireBulletSpray(
					defaultBullet, Null,
					MouseX(), MouseY(), 5,
					0, 360,
					1, 16,
					60, 120,
					50)
			Else
				Local direction:Float = ATan2(player.y-MouseY(),player.x-MouseX())
				Local intervalAngle:Float = 35.0/8.0
				Local firstAngle:Float = direction - intervalAngle
				Local speed:Float = 100
				Local intervalSpeed:Float = 10
				Local delay:Int = 20
				For Local i:Int = 3 To 8
					enemyBullets.FireBulletSpray(
						defaultBullet, Null,
						MouseX(), MouseY(), 0,
						firstAngle, firstAngle+intervalAngle*(i-1),
						1+delay*(i-3), 0,
						speed-(i-3)*intervalSpeed, speed-(i-3)*intervalSpeed,
						i)
					firstAngle -= intervalAngle/2
				Next
			End
		End
		#End
		' update everything
		currentStage.Update(dt.frametime)
		
		background.DoUpdate(dt.frametime)
		enemies.DoUpdate(dt.frametime)
		If boss Then boss.DoUpdate(dt.frametime)
		enemyBullets.DoUpdate(dt.frametime)
		playerBullets.DoUpdate(dt.frametime)
		player.DoUpdate(dt.frametime)
		
		ResolveCollisions()
	End
	
	Method Render:Void()
		Cls
		background.DoRender()
		enemies.DoRender()
		If boss Then boss.DoRender()
		enemyBullets.DoRender()
		playerBullets.DoRender()
		player.DoRender()
		DrawText("Enemy Bullet Count: " + enemyBullets.aliveCount, 0, 15)
		DrawText("Player Bullet Count: " + playerBullets.aliveCount, 0, 30)
		If boss Then
			DrawText("Boss Health: " + boss.currentHP, 0, 45)
			DrawText("Boss Phase: " + boss.currentPhase, 0, 60)
			DrawText("Time Remaining: " + Max(0,Int(Ceil(Float(boss.timeRemainingMillis) / 1000.0))), 0, 75)
		End
		DrawRectOutline(background.boundsLeft, background.boundsTop, background.boundsRight-background.boundsLeft, background.boundsBottom-background.boundsTop)
	End
	
	Method ResolveCollisions:Void()
		Local bullet:Smh_Bullet = Null
		' resolve collisions of boss with player
		' TODO
		
		' resolve collisions of enemies with player
		'bullet = enemies.FindFirstCollision(player)
		If bullet Then bullet.red = 0
		
		' resolve collisions of enemy bullets with player
		bullet = enemyBullets.FindFirstCollision(player)
		If bullet Then bullet.green = 0
		
		' resolve collisions of player bullets with boss
		If boss Then
			bullet = playerBullets.FindFirstCollision(boss)
			If bullet Then
				bullet.red = 128
				boss.currentHP -= 2
				If boss.currentHP < 0 Then boss.currentHP = 0
			End
		End
		
		' resolve collisions of player bullets with enemies
		'For Local i:Int = 0 Until enemies.aliveCount
		'	bullet = playerBullets.FindFirstCollision(enemies.children[i])
		'	If bullet Then bullet.blue = 0
		'Next
	End
End


Class Smh_Entity
	' used for HSL conversion
	Global rgbArray:Int[] = New Int[3]
	
	' misc
	Field parent:Smh_Entity
	Field alive:Bool = False ' used for pooling
	Field active:Bool = True
	Field activeDelayMillis:Int = 0
	Field logicHandler:Smh_EntityLogicHandler = Null
	Field activeTimeMillis:Int = 0 ' the game time that this entity became active
	
	' custom fields for the logic handler
	Field logicVar1:Int
	Field logicVar2:Int
	Field logicVar3:Int
	
	' position/velocities (velocity in units per second)
	Field x#, y# ' position
	Field dx#, dy# ' cartesian velocity if usePolar = False
	Field polarAngle#, polarVelocity# ' polar velocity if usePolar = True
	Field usePolar?
	Field recalcPolar?
	Field boundsRestrict? = False
	Field boundsPurge? = False
	Field useParentBounds? = True
	Field boundsLeft#, boundsRight#, boundsTop#, boundsBottom#
	Field boundsInset# = 0
	Field radius# = 0
	
	' interpolation
	Field sourceX#, sourceY# ' starting point
	Field targetX#, targetY# ' ending point
	Field interpTotalMillis% ' total interp time millis
	Field interpRemainingMillis% ' interp time remaining millis
	Field interpSmooth%
	Field interping?
	
	' visual
	Field image:GameImage ' for a simple single image
	Field anim:Smh_AnimStrip
	Field animFrame:Int
	Field animDelayMillis:Int
	Field animDirection:Int
	Field animForcedDirection:Int
	Field rotation# = 0
	Field rotateWithHeading? = True
	Field scaleX# = 1
	Field scaleY# = 1
	Field hue# = 0
	Field saturation# = 1
	Field luminance# = 0.5
	Field red% = 255
	Field green% = 255
	Field blue% = 255
	Field useHSL? = False
	Field recalcHSL?
	Field alpha# = 1
	Field visible? = True
	Field visibleWhileInactive? = False
	Field fadeInTimeMillis% = 0
	Field blendMode# = AlphaBlend
	Field scissor? = False
	
	Method CalcBoundsLeft:Float()
		Local current:Smh_Entity = Self
		While current.parent And current.useParentBounds
			current = current.parent
		End
		Return current.boundsLeft + boundsInset
	End
	
	Method CalcBoundsRight:Float()
		Local current:Smh_Entity = Self
		While current.parent And current.useParentBounds
			current = current.parent
		End
		Return current.boundsRight - boundsInset
	End
	
	Method CalcBoundsTop:Float()
		Local current:Smh_Entity = Self
		While current.parent And current.useParentBounds
			current = current.parent
		End
		Return current.boundsTop + boundsInset
	End
	
	Method CalcBoundsBottom:Float()
		Local current:Smh_Entity = Self
		While current.parent And current.useParentBounds
			current = current.parent
		End
		Return current.boundsBottom - boundsInset
	End
	
	Method SetVelocityCartesian:Void(dx#, dy#)
		Self.dx = dx
		Self.dy = dy
		Self.usePolar = False
		Self.recalcPolar = False
		Self.interping = False
	End
	
	Method SetVelocityPolar:Void(polarAngle#, polarVelocity#)
		Self.polarAngle = polarAngle
		Self.polarVelocity = polarVelocity
		Self.usePolar = True
		Self.interping = False
		RecalcPolar()
	End
	
	Method SetInterpOverTime:Void(sourceX#, sourceY#, targetX#, targetY#, millis%, smooth% = 0)
		Self.sourceX = sourceX
		Self.sourceY = sourceY
		Self.targetX = targetX
		Self.targetY = targetY
		Self.interpTotalMillis = millis
		Self.interpRemainingMillis = millis
		Self.interpSmooth = smooth
		Self.interping = True
	End
	
	Method SetInterpWithVelocity:Void(sourceX#, sourceY#, targetX#, targetY#, velocity#, smooth% = 0)
		Local distance# = Sqrt((targetX-sourceX)*(targetX-sourceX)+(targetY-sourceY)*(targetY-sourceY))
		Local time# = distance/velocity
		SetInterpOverTime(sourceX, sourceY, targetX, targetY, Int(time*1000), smooth)
	End
	
	' Warning: don't call this with parameters that would give an impossible movement, or it'll infinite loop!
	Method SetInterpRandomOverTime:Void(sourceX#, sourceY#, minDistance#, maxDistance#, millis%, smooth% = 0)
		Local rndX# = 0
		Local rndY# = 0
		Local calc# = 0
		Repeat
			rndX = Rnd(boundsLeft+boundsInset, boundsRight-boundsInset)
			rndY = Rnd(boundsTop+boundsInset, boundsBottom-boundsInset)
			calc = (sourceX-rndX)*(sourceX-rndX)+(sourceY-rndY)*(sourceY-rndY)
		Until calc >= minDistance*minDistance And calc <= maxDistance*maxDistance
		SetInterpOverTime(sourceX, sourceY, rndX, rndY, millis, smooth)
	End
	
	Method RecalcPolar:Void()
		Self.recalcPolar = False
		Self.dx = Cos(polarAngle) * polarVelocity
		Self.dy = Sin(polarAngle) * polarVelocity
	End
	
	Method RecalcHSL:Void()
		Self.recalcHSL = False
		HSLtoRGB(hue, saturation, luminance, rgbArray)
		red = rgbArray[0]; green = rgbArray[1]; blue = rgbArray[2]
	End
	
	Method PreUpdate:Float(millis%)
		If Not active And activeDelayMillis > 0 Then
			activeDelayMillis -= millis
			If activeDelayMillis <= 0 Then
				millis = -activeDelayMillis
				activeDelayMillis = 0
				activeTimeMillis = dt.currentticks
				active = True
			End
		End
		If Not active Then Return 0
		Return millis
	End
	
	Method PostUpdate:Void(millis%)
		' update position based on interp or velocity
		If interping Then
			interpRemainingMillis -= millis
			If interpRemainingMillis <= 0 Then
				interping = False
				x = targetX
				y = targetY
				interpRemainingMillis = 0
			Else
				Local alpha# = 1 - Float(interpRemainingMillis)/Float(interpTotalMillis)
				For Local i% = 0 Until interpSmooth
					alpha *= alpha * (3 - 2 * alpha)
				Next
				x = sourceX + (targetX-sourceX)*alpha
				y = sourceY + (targetY-sourceY)*alpha
			End
		Else
			If usePolar And recalcPolar Then RecalcPolar()
			x += dx * millis / 1000.0
			y += dy * millis / 1000.0
		End
		
		' get bounds
		Local current:Smh_Entity = Self
		While current.parent And current.useParentBounds
			current = current.parent
		End
		Local bl:Float = current.boundsLeft + boundsInset
		Local br:Float = current.boundsRight - boundsInset
		Local bt:Float = current.boundsTop + boundsInset
		Local bb:Float = current.boundsBottom - boundsInset
		
		' restrict
		If boundsRestrict Then
			If x < bl Then x = bl
			If x > br Then x = br
			If y < bt Then y = bt
			If y > bb Then y = bb
		End

		' mark for purging
		If boundsPurge Then
			If x < bl Or x > br Or y < bt Or y > bb Then alive = False
		End
	End
	
	' This should be called in OnUpdate() or by a parent entity
	Method DoUpdate:Void(millis%)
		millis = PreUpdate(millis)
		If millis > 0 Then
			Update(millis)
			PostUpdate(millis)
		End
	End
	
	' Entities should implement this method
	Method Update:Void(millis%)
		If logicHandler Then logicHandler.Update(Self, millis)
	End
	
	Method PreRender:Bool()
		If Not active And Not visibleWhileInactive Then Return False
		If fadeInTimeMillis > 0 Then alpha = Max(0.0,Min(1.0,1.0-(Float(activeDelayMillis) / Float(fadeInTimeMillis))))
		Local rot:Float = rotation
		If rotateWithHeading And usePolar Then rot -= polarAngle
		PushMatrix
		Translate x, y
		Scale scaleX, scaleY
		Rotate rot
		'If scissor Then SetScissor(boundsLeft, boundsTop, boundsRight-boundsLeft, boundsBottom-boundsTop)
		Return True
	End
	
	Method PostRender:Void()
		'If scissor Then SetScissor(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		PopMatrix
	End
	
	' This should be called in OnRender() or by a parent entity
	Method DoRender:Void()
		If PreRender() Then
			Render()
			PostRender()
		End
	End
	
	' Entities should override this method if they want anything special
	Method Render:Void()
		If image Or anim Then
			Local oldalpha:Float = GetAlpha()
			Local oldblend:Int = GetBlend()
			SetBlend(blendMode)
			If useHSL And recalcHSL Then RecalcHSL()
			If blendMode = AlphaBlend Then
				SetAlpha(alpha)
				SetColor(red, green, blue)
			Else
				SetAlpha(1)
				SetColor(red*alpha, green*alpha, blue*alpha)
			End
			If image Then
				DrawImage(image.image, 0, 0)
			ElseIf anim Then
				anim.Render(Self, 0, 0)
			End
			SetBlend(oldblend)
			If blendMode = AlphaBlend Then
				SetAlpha(oldalpha)
			End
		End
	End
	
	Method AbsoluteX:Float() Property
		If parent = Null Then Return x
		Return x + parent.AbsoluteX
	End
	
	Method AbsoluteY:Float() Property
		If parent = Null Then Return y
		Return y + parent.AbsoluteY
	End
	
	' summary: Copies specific fields from another entity to this one.
	' This is so we can reuse entities and populate them with templates.
	Method CopyFrom:Smh_Entity(source:Smh_Entity)
		parent = source.parent
		'active = source.active
		'activeDelayMillis = source.activeDelayMillis
		'alive = source.alive
		logicHandler = source.logicHandler
		logicVar1 = source.logicVar1
		logicVar2 = source.logicVar2
		logicVar3 = source.logicVar3
		x = source.x
		y = source.y
		dx = source.dx
		dy = source.dy
		polarAngle = source.polarAngle
		polarVelocity = source.polarVelocity
		usePolar = source.usePolar
		recalcPolar = source.recalcPolar
		boundsLeft = source.boundsLeft
		boundsRight = source.boundsRight
		boundsTop = source.boundsTop
		boundsBottom = source.boundsBottom
		boundsPurge = source.boundsPurge
		boundsRestrict = source.boundsRestrict
		boundsInset = source.boundsInset
		radius = source.radius
		sourceX = source.sourceX
		sourceY = source.sourceY
		targetX = source.targetX
		targetY = source.targetY
		interpTotalMillis = source.interpTotalMillis
		interpRemainingMillis = source.interpRemainingMillis
		interpSmooth = source.interpSmooth
		interping = source.interping
		image = source.image
		rotation = source.rotation
		rotateWithHeading = source.rotateWithHeading
		scaleX = source.scaleX
		scaleY = source.scaleY
		hue = source.hue
		saturation = source.saturation
		luminance = source.luminance
		red = source.red
		green = source.green
		blue = source.blue
		useHSL = source.useHSL
		recalcHSL = source.recalcHSL
		alpha = source.alpha
		blendMode = source.blendMode
		visible = source.visible
		visibleWhileInactive = source.visibleWhileInactive
		fadeInTimeMillis = source.fadeInTimeMillis
		scissor = source.scissor
		anim = source.anim
		animFrame = source.animFrame
		animDelayMillis = source.animDelayMillis
		animDirection = source.animDirection
		animForcedDirection = source.animForcedDirection
		Return Self
	End
End

' Implement this interface if you want to provide logic shared amongst entities without having to extend them.
' This is useful for applying different functionality to pooled objects (like bullets).
Interface Smh_EntityLogicHandler
	Method Update:Void(entity:Smh_Entity, millis%)
End

Class Smh_AnimStrip
	Field image:GameImage
	Field frameCount:Int
	Field frameDelays:Int[]
	Field frameOffsets:Int[]
	Field frameDirections:Int[]
	
	Method New(name:String, frameCount:Int)
		Self.image = game.images.Find(name)
		Self.frameCount = frameCount
		frameDelays = New Int[frameCount]
		frameOffsets = New Int[frameCount]
		frameDirections = New Int[frameCount]
		For Local i:Int = 0 Until frameCount
			frameOffsets[i] = 1
			frameDirections[i] = 0
		Next
	End
	
	Method Update:Void(entity:Smh_Entity, millis%)
		' die if paused and not forced
		If entity.animDirection = 0 And entity.animForcedDirection = 0 Then Return
		' loop while we have millis
		While millis > 0
			' update the delay
			entity.animDelay -= millis
			If entity.animDelay >= 0 Then
				millis = 0
			Else
				millis = -entity.animDelay
			End
			
			' if we should move to the next frame
			If entity.animDelay <= 0 Then
				' if we're forcing a direction, use that
				If entity.animForcedDirection <> 0 Then
					entity.animFrame += entity.animForcedDirection
				Else
					entity.animFrame += frameOffsets[entity.animFrame]*entity.animDirection
				End
				' clip it
				If entity.animFrame < 0 Then entity.animFrame = 0
				If entity.animFrame >= frameCount Then entity.animFrame = frameCount-1
				' update the direction if not forced
				If entity.animForcedDirection = 0 And frameDirections[entity.animFrame] <> 0 Then
					entity.animDirection = frameDirections[entity.animFrame]
				End
				entity.animDelay = frameDelays[entity.animFrame]
			End
		End
	End
	
	Method Render:Void(entity:Smh_Entity, x#, y#)
		DrawImage(image.image, x, y, entity.animFrame)
	End
End

Class Smh_EntityGroup Extends Smh_Entity
	Field children:ArrayList<Smh_Entity> = New ArrayList<Smh_Entity>(100)
	
	Method Update:Void(millis%)
		For Local i:Int = 0 Until children.Size
			Local child:Smh_Entity = children.Get(i)
			If child.active Then child.DoUpdate(millis)
		Next
	End
	
	Method Render:Void()
		For Local i:Int = 0 Until children.Size
			Local child:Smh_Entity = children.Get(i)
			If child.active Then child.DoRender()
		Next
	End
End

Class Smh_Pool<T> Extends Smh_Entity
	Field children:T[]
	Field aliveCount:Int = 0
	Field autoPurgeMillis:Int = 500
	Field nextPurgeMillis:Int = -1
	
	Method New(capacity:Int)
		active = True
		PopulatePool(capacity)
	End
	
	Method PopulatePool:Void(capacity:Int)
		If children.Length > 0 Then Return ' throw exception?
		If capacity <= 0 Then Return ' throw exception?
		children = New T[capacity]
		For Local i:Int = 0 Until capacity
			children[i] = New T
		Next
	End
	
	Method GetEntity:T(template:Smh_Entity)
		If aliveCount = children.Length Then Purge()
		If aliveCount = children.Length Then Return Null
		aliveCount += 1
		children[aliveCount-1].alive = True
		If template Then children[aliveCount-1].CopyFrom(template)
		Return children[aliveCount-1]
	End
	
	Method ReleaseEntity:Void(entity:T)
		' TODO: improve performance with a reverse pointer lookup?
		For Local i:Int = 0 Until aliveCount
			If children[i] = entity Then
				entity.alive = False
				Exit
			End
		Next
		Purge()
	End
	
	Method Purge:Void()
		Local current:Int = 0
		While current < aliveCount
			' if the low index is alive
			If children[current].alive Then
				' move to the next index
				current += 1
			Else
				' else, reduce the alive count until we find one to swap with
				While current < aliveCount And Not children[aliveCount-1].alive
					aliveCount -= 1
				End
				' if we have an alive to swap, do it
				If current < aliveCount Then
					Local oldChild:T = children[current]
					children[current] = children[aliveCount-1]
					children[aliveCount-1] = oldChild
					aliveCount -= 1
				End
			End
		End
	End
	
	Method FindFirstCollision:T(other:Smh_Entity)
		For Local i% = 0 Until aliveCount
			If children[i].alive Then
				Local dx# = other.x-children[i].x
				Local dy# = other.y-children[i].y
				Local dist# = other.radius+children[i].radius
				If dx*dx + dy*dy < dist*dist Then Return children[i]
			End
		Next
		Return Null
	End
	
	Method Update:Void(millis%)
		For Local i:Int = 0 Until aliveCount
			If children[i].alive Then children[i].DoUpdate(millis)
		Next
		If autoPurgeMillis > 0 Then
			If nextPurgeMillis < dt.frametime Then
				Purge()
				nextPurgeMillis = dt.frametime + autoPurgeMillis
			End
		End
	End
	
	Method Render:Void()
		For Local i:Int = 0 Until aliveCount
			If children[i].alive Then children[i].DoRender()
		Next
	End
End

Class Smh_Stage
	Field currentSection:Int = 0
	Field currentSectionStep:Int = 0
	Field waitTimeMillis:Int = 0
	
	Method Update:Void(millis%)
		' if waiting, reduce wait time
		If waitTimeMillis > 0 Then
			waitTimeMillis -= millis
			millis = 0
			If waitTimeMillis < 0 Then
				millis = -waitTimeMillis
				waitTimeMillis = 0
			End
		End
		
		' if we have no millis left, die
		If millis = 0 Then Return
		
		DoLogic(millis)
	End
	
	Method DoLogic:Void(millis%) Abstract
End

Class Smh_Unit Extends Smh_Entity
	Field currentHP:Int
	Field maxHP:Int
	Field died:Bool
	
	Method Update:Void(millis%)
		Super.Update(millis)
		If currentHP <= 0 And Not died Then
			died = True
			Died()
		End
	End
	
	Method Died:Void()
	End
	
	Method CopyFrom:Smh_Entity(source:Smh_Entity)
		Local unit:Smh_Unit = Smh_Unit(source)
		If Not unit Then Return Null ' error, wrong entity type
		Super.CopyFrom(source)
		currentHP = unit.currentHP
		maxHP = unit.maxHP
	End
End

Class Smh_Player Extends Smh_Unit
	Field firingSpeed:Int = 100
	Field nextShotAvailableMillis:Int = 0
	Field playerShot:Smh_Bullet
	
	Method New()
		alive = True
		active = True
		alpha = 0.8
		boundsRestrict = True
		boundsPurge = False
		boundsInset = 20
		
		playerShot = New Smh_Bullet
		playerShot.image = game.images.Find("game9_bullet1")
		playerShot.rotation = 45
		playerShot.scaleX = 4
		playerShot.scaleY = 4
		playerShot.radius = 10
		playerShot.blendMode = AdditiveBlend
	End
	
	Method Update:Void(millis%)
		Super.Update(millis)
		
		' movement
		Local xdir:Int = 0, ydir:Int = 0
		If KeyDown(KEY_LEFT) Then xdir -= 1
		If KeyDown(KEY_RIGHT) Then xdir += 1
		If KeyDown(KEY_UP) Then ydir -= 1
		If KeyDown(KEY_DOWN) Then ydir += 1
		
		' hard coded for now
		Local playerSpeed:Float = 200
		dx = playerSpeed * xdir
		dy = playerSpeed * ydir
		If KeyDown(KEY_SHIFT) Then
			dx *= 0.4
			dy *= 0.4
		End
		
		' attack
		If KeyDown(KEY_Z) And nextShotAvailableMillis < dt.currentticks Then
			' fire bullet(s)
			playerBullets.FireBulletLinear(playerShot, playerBullets, x, y, -90, 400, 1, 1)
			' update next available
			nextShotAvailableMillis = dt.currentticks + firingSpeed
		End
	End
	
	Method Render:Void()
		Local oldalpha:Float = GetAlpha()
		If useHSL And recalcHSL Then RecalcHSL()
		SetColor(red, green, blue)
		SetAlpha(alpha)
		DrawRect(-5,-5,10,10)
		SetAlpha(oldalpha)
	End
End

Class Smh_Enemy Extends Smh_Unit
	Method Update:Void(millis%)
		Super.Update(millis)
	End
	
	Method Render:Void()
		Local oldalpha:Float = GetAlpha()
		If useHSL And recalcHSL Then RecalcHSL()
		SetColor(red, green, blue)
		SetAlpha(alpha)
		DrawRect(-5,-5,10,10)
		SetAlpha(oldalpha)
	End
End

Class Smh_Boss Extends Smh_Enemy Abstract
	Field phaseCount:Int = 1
	Field currentPhase:Int = -1
	Field currentPhaseStep:Int = 0
	Field timeRemainingMillis:Int
	Field bossIsLeaving:Bool = False
	Field waitTimeMillis:Int
	Field defeated:Bool = False
	
	Method New()
		active = True
		boundsRestrict = False
		boundsPurge = False
		
		boundsLeft = background.boundsLeft
		boundsRight = background.boundsRight
		boundsTop = background.boundsTop
		boundsBottom = background.boundsTop + (background.boundsBottom - background.boundsTop) * 0.4
		boundsInset = 20
		useParentBounds = False
	End
	
	Method Reset:Void()
		timeRemainingMillis = 30000
		maxHP = 100
		currentHP = 100
		waitTimeMillis = 0
	End
	
	Method Update:Void(millis%)
		' call super
		Super.Update(millis)
		
		' if leaving just die
		If Not bossIsLeaving Then
			' if the boss has run out of health, we go to the next phase
			If currentPhase < 0 Or currentHP <= 0 Then
				currentPhase += 1
				currentPhaseStep = 0
				' if this was the last phase, we win!
				If currentPhase > phaseCount Then
					defeated = True
				Else
					Reset()
				End
				Return
			End
			
			' update time remaining (this could go negative if we're waiting)
			timeRemainingMillis -= millis
			
			' if we've run out of time, interp off screen
			If timeRemainingMillis <= 0 Then
				If x < boundsLeft + (boundsRight-boundsLeft)/2 Then
					SetInterpOverTime(x, y, boundsLeft, boundsTop - 100, 2000, 1)
				Else
					SetInterpOverTime(x, y, boundsRight, boundsTop - 100, 2000, 1)
				End
				timeRemainingMillis = 0
				waitTimeMillis = 2000
				bossIsLeaving = True
				Return
			End
		End
		
		' if waiting, reduce wait time
		If waitTimeMillis > 0 Then
			waitTimeMillis -= millis
			millis = 0
			If waitTimeMillis < 0 Then
				millis = -waitTimeMillis
				waitTimeMillis = 0
			End
		End
		
		' if we have no millis left, die
		If millis = 0 Then Return
		
		' time left, do the main boss logic if we're not leaving
		If Not bossIsLeaving Then DoLogic(millis)
	End
	
	Method DoLogic:Void(millis%) Abstract
	
	Method Render:Void()
		Local oldalpha:Float = GetAlpha()
		If useHSL And recalcHSL Then RecalcHSL()
		SetColor(red, green, blue)
		SetAlpha(alpha)
		DrawRect(-5,-5,10,10)
		SetAlpha(oldalpha)
	End
End

Class Smh_BulletPool Extends Smh_Pool<Smh_Bullet>
	Method New(capacity:Int=2000)
		Super.New(capacity)
	End
	
	' fires one or more identical bullets with an optional delay between them
	Method FireBullet:Smh_Bullet(template:Smh_Bullet, parent:Smh_Entity, x:Float, y:Float, delayMillis:Int=0, bulletCount:Int=1)
		' if we're firing more than an arbitrary number, purge
		'If bulletCount > 10 Then Purge()
		Purge()
		Local bullet:Smh_Bullet = Null
		If Not parent Then parent = Self
		For Local i:Int = 1 To bulletCount
			bullet = GetEntity(template)
			If Not bullet Then Return Null
			bullet.parent = parent
			bullet.active = False
			bullet.activeDelayMillis = delayMillis * i
			bullet.x = x
			bullet.y = y
		Next
		Return bullet
	End
	
	' fires one or more identical bullets with an optional delay between them
	Method FireBulletLinear:Smh_Bullet(template:Smh_Bullet, parent:Smh_Entity, x:Float, y:Float, polarAngle:Float, startVelocity:Float, endVelocity:Float, delayMillis:Int=0, bulletCount:Int=1)
		' if we're firing more than an arbitrary number, purge
		'If bulletCount > 10 Then Purge()
		Purge()
		Local bullet:Smh_Bullet = Null
		If Not parent Then parent = Self
		Local velocity:Float = startVelocity
		For Local i:Int = 1 To bulletCount
			bullet = GetEntity(template)
			If Not bullet Then Return Null
			bullet.parent = parent
			bullet.active = False
			bullet.activeDelayMillis = delayMillis * i
			bullet.x = x
			bullet.y = y
			bullet.SetVelocityPolar(polarAngle, velocity)
			velocity += (endVelocity-startVelocity)/bulletCount
		Next
		Return bullet
	End
	
	Method FireBulletSpray:Smh_Bullet(template:Smh_Bullet, parent:Smh_Entity,
			x:Float, y:Float, distance:Float, ' the coordinates to fire from, with a distance offset so that they don't stack on the parent
			startAngle:Float, endAngle:Float, ' the start and end angles for the spray arc
			firstDelayMillis:Int, intervalDelayMillis:Int, ' the delay before the first bullet, and the delay between each bullet
			firstSpeed:Float, lastSpeed:Float, ' the speed of the first and last bullets (the rest are linearly interpolated)
			bulletCount:Int) ' the number of bullets to fire
		' if we're firing more than an arbitrary number, purge
		'If bulletCount > 10 Then Purge()
		Purge()
		Local bullet:Smh_Bullet = Null
		Local delayMillis:Int = firstDelayMillis
		If Not parent Then parent = Self
		For Local i:Int = 0 Until bulletCount
			Local ratio:Float = 0
			If bulletCount > 0 Then ratio = Float(i)/(bulletCount-1)
			Local angle:Float = startAngle + (endAngle-startAngle) * ratio
			While angle > 360 angle -= 360 End
			While angle < 0 angle += 360 End
			bullet = GetEntity(template)
			If Not bullet Then Return Null
			bullet.parent = parent
			bullet.active = False
			bullet.activeDelayMillis = delayMillis
			delayMillis += intervalDelayMillis
			bullet.x = x + distance*Cos(angle)
			bullet.y = y + distance*Sin(angle)
			bullet.SetVelocityPolar(angle, firstSpeed + (lastSpeed-firstSpeed) * ratio)
		Next
		Return bullet
	End
End

Class Smh_EnemyPool Extends Smh_Pool<Smh_Enemy>
	Method New(capacity:Int=200)
		Super.New(capacity)
	End
	
	Method AreAllDead:Bool()
		Purge()
		For Local i:Int = 0 Until aliveCount
			If children[i].alive And children[i].currentHP > 0 Then Return False
		Next
		Return True
	End
	
	Method CreateEnemyWave:Smh_Enemy(template:Smh_Enemy, parent:Smh_Entity,
			x:Float, y:Float,
			polarAngle:Float, polarSpeed:Float,
			firstDelayMillis:Int, intervalDelayMillis:Int,
			enemyCount:Int)
		Purge()
		Local enemy:Smh_Enemy = Null
		Local delayMillis:Int = firstDelayMillis
		If Not parent Then parent = Self
		For Local i:Int = 0 Until enemyCount
			enemy = GetEntity(template)
			If Not enemy Then Return Null
			enemy.parent = parent
			enemy.active = False
			enemy.activeDelayMillis = delayMillis
			delayMillis += intervalDelayMillis
			enemy.x = x
			enemy.y = y
			enemy.SetVelocityPolar(polarAngle, polarSpeed)
		Next
		Return enemy
	End
End

Class Smh_Bullet Extends Smh_Entity
	Method New()
		alive = False
		active = False
		boundsRestrict = False
		boundsPurge = True
		boundsInset = -30
	End
	
	Method Render:Void()
		Super.Render()
	End
End

''''''''''''''''''''''''' BOSSES '''''''''''''''''''''''''
Class Smh_Stage1 Extends Smh_Stage
	Field firstBoss:Smh_Boss = New Smh_Stage1Boss1
	Field trash1:Smh_Enemy
	
	Method New()
		trash1 = New Smh_Enemy
		trash1.currentHP = 30
		trash1.maxHP = 30
		trash1.boundsInset = -50
		trash1.boundsPurge = True
		trash1.boundsRestrict = False
	End
	
	Method DoLogic:Void(millis%)
		Select currentSection
			Case 0 ' first trash section
				Select currentSectionStep
					Case 0 ' spawn some basic trash
						' spawn trash
						enemies.CreateEnemyWave(
								trash1, background,
								-20, background.boundsTop+(background.boundsBottom-background.boundsTop)*0.2,
								15, 100,
								1, 500,
								10)
						enemies.CreateEnemyWave(
								trash1, background,
								(background.boundsRight-background.boundsLeft)+20, background.boundsTop+(background.boundsBottom-background.boundsTop)*0.2,
								180-15, 100,
								3000, 500,
								10)
						currentSectionStep = 1
						waitTimeMillis = 0'3000
						
					Case 1 ' wait until all dead
						' dead check
						If enemies.AreAllDead() Then
							boss = firstBoss
							currentSectionStep = 2
						End
						
					Case 2 ' wait until boss is dead or timed out
						If boss Then
							If boss.defeated Then
								boss = Null
								currentSection = 1
								currentSectionStep = 0
							Elseif boss.timeRemainingMillis <= 0 Then
								currentSectionStep = 0
							End
						End
				End
				
			Case 1 ' second trash section
				Select currentSectionStep
					Case 0 ' spawn some trash
						currentSectionStep = 1
						waitTimeMillis = 3000
						
					Case 1 ' wait until all dead
						If enemies.AreAllDead() Then
							currentSectionStep = 2
						End
					
					Case 2 ' we've won, this time
						' TODO: win
				End
		End
	End
End

Class Smh_Stage1Enemy1 Extends Smh_Enemy
End

Class Smh_Stage1Boss1 Extends Smh_Boss
	Field firstBullet:Smh_Bullet = New Smh_Bullet
	Field secondBullet:Smh_Bullet = New Smh_Bullet
	Field thirdBullet:Smh_Bullet = New Smh_Bullet
	Field thirdBulletLogic:Smh_Stage1Boss1HomingBulletLogic = New Smh_Stage1Boss1HomingBulletLogic
	Field fourthBullet:Smh_Bullet = New Smh_Bullet
	Field fourthBulletLogic:Smh_Stage1Boss1RightAngleBulletLogic = New Smh_Stage1Boss1RightAngleBulletLogic
	
	Field bulletFireCount:Int = 0
	
	Method New()
		radius = 20
		
		' phase 1
		firstBullet.image = game.images.Find("game9_bullet1")
		firstBullet.rotation = 45
		firstBullet.scaleX = 1.5
		firstBullet.scaleY = 1.5
		firstBullet.radius = 5
		firstBullet.blendMode = AdditiveBlend
		firstBullet.visibleWhileInactive = True
		firstBullet.fadeInTimeMillis = 1000
		
		secondBullet.image = game.images.Find("game9_bullet1")
		secondBullet.rotation = 45
		secondBullet.scaleX = 2
		secondBullet.scaleY = 2
		secondBullet.radius = 8
		secondBullet.blendMode = AdditiveBlend
		secondBullet.visibleWhileInactive = False
		secondBullet.fadeInTimeMillis = 1000
		
		thirdBullet.image = game.images.Find("game9_bullet1")
		thirdBullet.rotation = 45
		thirdBullet.scaleX = 1.5
		thirdBullet.scaleY = 1.5
		thirdBullet.radius = 5
		thirdBullet.blendMode = AdditiveBlend
		thirdBullet.visibleWhileInactive = False
		thirdBullet.fadeInTimeMillis = 1000
		thirdBullet.logicHandler = thirdBulletLogic
		
		' phase 2
		fourthBullet.image = game.images.Find("game9_bullet1")
		fourthBullet.rotation = 45
		fourthBullet.scaleX = 1.5
		fourthBullet.scaleY = 1.5
		fourthBullet.radius = 5
		fourthBullet.blendMode = AdditiveBlend
		fourthBullet.visibleWhileInactive = False
		fourthBullet.fadeInTimeMillis = 0
		fourthBullet.logicHandler = fourthBulletLogic
		
		'anim = New Smh_AnimStrip(images.Find("Ship1"))
		' FIXME: first frame always skipped
	End
	
	Method DoLogic:Void(millis%)
		Local boundsWidth:Float = boundsRight-boundsLeft
		Local boundsHeight:Float = boundsBottom-boundsTop
		Select currentPhase
			Case 0 ' first phase
				Select currentPhaseStep
					Case 0
						' interp to the centre from a random point
						SetInterpOverTime(Rnd(boundsLeft,boundsRight), -100, boundsLeft+boundsWidth/2, boundsTop+boundsHeight/2, 2000, 1)
						currentPhaseStep = 1
						waitTimeMillis = 2000
						
					Case 1
						' fire and wait, then loop to 1
						Local direction:Float = ATan2(player.y-y,player.x-x)
						Local srcX:Float = x - Cos(direction)*5
						Local srcY:Float = y - Sin(direction)*5
						Local intervalAngle:Float = 45.0/8.0
						Local firstAngle:Float = direction - intervalAngle
						Local speed:Float = 150
						Local intervalSpeed:Float = 20
						Local delay:Float = 10
						For Local i:Int = 3 To 8
							enemyBullets.FireBulletSpray(
								firstBullet, Null,
								srcX, srcY, 0,
								firstAngle, firstAngle+intervalAngle*(i-1),
								1000+delay*(i-3), 0,
								speed-(i-3)*intervalSpeed, speed-(i-3)*intervalSpeed,
								i)
							firstAngle -= intervalAngle/2
						Next
						waitTimeMillis = 3000
						bulletFireCount += 1
						If bulletFireCount = 1'3 Then
							bulletFireCount = 0
							currentPhaseStep = 2
						End
						
					Case 2
						' interp to top right
						SetInterpOverTime(x, y, boundsLeft+boundsWidth*0.75, boundsHeight/2, 3000, 1)
						waitTimeMillis = 1000
						currentPhaseStep = 3
						
					Case 3
						' fire second bullet type (while moving)
						enemyBullets.FireBulletSpray(
							secondBullet, Null,
							x, y, 0,
							0, 360*(19.0/20.0),
							1, 0,
							50, 50,
							20)
						waitTimeMillis = 1000
						currentPhaseStep = 4
						
					Case 4
						' fire third bullet type (while moving)
						enemyBullets.FireBulletSpray(
							thirdBullet, Null,
							x, y, 0,
							0, 360*(39.0/40.0),
							1, 0,
							100, 100,
							40)
						waitTimeMillis = 1000
						currentPhaseStep = 5
						
					Case 5
						' fire second bullet type (while moving)
						enemyBullets.FireBulletSpray(
							secondBullet, Null,
							x, y, 0,
							0, 360*(19.0/20.0),
							1, 0,
							50, 50,
							20)
						
						bulletFireCount += 1
						If bulletFireCount = 1'3 Then
							Reset() ' TODO: convert bullets to powerups
							bulletFireCount = 0
							currentPhase = 1
							currentPhaseStep = 0
						Else
							currentPhaseStep = 6
						End If
						
						waitTimeMillis = 2000
						
					Case 6
						' random interp, loop to 3
						SetInterpRandomOverTime(x, y, 80, 110, 2000, 1)
						currentPhaseStep = 3
				End
				
			Case 1 ' second phase
				Select currentPhaseStep
					Case 0
						' interp to the middle
						SetInterpOverTime(x, y, boundsLeft+(boundsRight-boundsLeft)/2, boundsTop+(boundsBottom-boundsTop)/2, 1000, 1)
						waitTimeMillis = 2000
						currentPhaseStep = 1
						bulletFireCount = 0
						
					Case 1
						' fire bullet 4
						enemyBullets.FireBulletLinear(
							fourthBullet, Null,
							x, y,
							5*(bulletFireCount-1), 40, 200,
							1, 3)
						enemyBullets.FireBulletLinear(
							fourthBullet, Null,
							x, y,
							180-5*(bulletFireCount-1), 40, 200,
							1, 3)
						bulletFireCount += 1
						If bulletFireCount = 11 Then bulletFireCount = 0
						waitTimeMillis = 1000
				End
		End
	End
End

Class Smh_Stage1Boss1HomingBulletLogic Implements Smh_EntityLogicHandler
	Method Update:Void(entity:Smh_Entity, millis%)
		If entity.logicVar1 = 0 Then
			entity.polarVelocity -= 55 * Float(millis) / 1000.0
			If entity.polarVelocity < 0 Then
				entity.polarVelocity = 100
				entity.polarAngle = ATan2(player.y-entity.y,player.x-entity.x)
				entity.logicVar1 = 1
			End
			entity.recalcPolar = True
		End
	End
End

Class Smh_Stage1Boss1RightAngleBulletLogic Implements Smh_EntityLogicHandler
	Method Update:Void(entity:Smh_Entity, millis%)
		If entity.logicVar2 <= 0 Then entity.logicVar2 = entity.polarVelocity
		If entity.logicVar1 = 0 Then
			Local targetTime# = 2500
			Local currentTime# = dt.currentticks - entity.activeTimeMillis
			Local ratio:Float = Min(1.0, currentTime / targetTime)
			ratio *= ratio
			entity.polarVelocity = entity.logicVar2 * (1-ratio)
			' assume they've all stopped at a certain life value
			If currentTime >= targetTime Then
				entity.polarVelocity = 40
				If entity.polarAngle > 90 Then
					entity.polarAngle -= 90
				Else
					entity.polarAngle += 90
				End
				entity.logicVar1 = 1
			End
			entity.recalcPolar = True
		End
	End
End

#rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#End