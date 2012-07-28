#rem
header:
[quote]

[b]File Name :[/b] Game9Screen
[b]Author    :[/b] Shane "Samah" Woolcock
[b]About     :[/b]
Touhou Clone
[/quote]
#end


Public
Import main

Private
'Global spriteSheet:GameImage
'Global bossSheet:GameImage
Global smhGameScreen:Smh_GameScreen

Global background:Smh_EntityGroup
Global enemyBullets:Smh_BulletPool
Global playerBullets:Smh_BulletPool
Global boss:Smh_Boss
Global player:Smh_Player

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
		GameList[gameid - 1].info = "????"
	End
	
	#rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		game.images.Load("game9/game9_bullet1.png")
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
	and all use input.
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
		background.boundsLeft = 0
		background.boundsTop = 0
		background.boundsRight = SCREEN_WIDTH
		background.boundsBottom = SCREEN_HEIGHT
		
		enemyBullets = New Smh_BulletPool
		enemyBullets.parent = background
		
		playerBullets = New Smh_BulletPool
		playerBullets.parent = background
		
		player = New Smh_Player
		player.parent = background
		player.x = background.boundsLeft + (background.boundsRight - background.boundsLeft) * 0.5
		player.y = background.boundsTop + (background.boundsBottom - background.boundsTop) * 0.8
		
		boss = New Smh_Stage1Boss1
		boss.parent = background
		boss.x = player.x
		boss.y = background.boundsBottom - player.y
		boss.boundsLeft = background.boundsLeft
		boss.boundsRight = background.boundsRight
		boss.boundsTop = background.boundsTop
		boss.boundsBottom = background.boundsTop + (background.boundsBottom - background.boundsTop) * 0.4
		boss.boundsInset = 20
		boss.useParentBounds = False
		
		'background.children.Add(enemies)
		background.children.Add(boss)
		background.children.Add(enemyBullets)
		background.children.Add(playerBullets)
		background.children.Add(player)
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
				Local delay:Float = 20
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
		background.DoUpdate(dt.frametime)
		
		ResolveCollisions()
	End
	
	Method Render:Void()
		Cls
		DrawText("Enemy Bullet Count: " + enemyBullets.aliveCount, 0, 15)
		background.DoRender()
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
			If bullet Then bullet.red = 128
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
	'Field animations:ArrayList<AnimStrip> ' TODO: animations
	'Field currentAnimIndex:Int
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
	
	Method PreUpdate:Float(millis#)
		If Not active And activeDelayMillis > 0 Then
			activeDelayMillis -= millis
			If activeDelayMillis <= 0 Then
				millis = -activeDelayMillis
				activeDelayMillis = 0
				active = True
			End
		End
		If Not active Then Return 0
		Return millis
	End
	
	Method PostUpdate:Void(millis#)
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
	Method DoUpdate:Void(millis#)
		millis = PreUpdate(millis)
		If millis > 0 Then
			Update(millis)
			PostUpdate(millis)
		End
	End
	
	' Entities should implement this method
	Method Update:Void(millis#)
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
		Return True
	End
	
	Method PostRender:Void()
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
		If image Then
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
			DrawImage(image.image, 0, 0)
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
		Return Self
	End
End

Class Smh_EntityGroup Extends Smh_Entity
	Field children:ArrayList<Smh_Entity> = New ArrayList<Smh_Entity>(100)
	
	Method Update:Void(millis#)
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
	
	Method Update:Void(millis#)
		For Local i:Int = 0 Until aliveCount
			If children[i].alive Then children[i].DoUpdate(millis)
		Next
	End
	
	Method Render:Void()
		For Local i:Int = 0 Until aliveCount
			If children[i].alive Then children[i].DoRender()
		Next
	End
End

Class Smh_Stage
End

Class Smh_StageSection
End

Class Smh_TrashStageSection
End

Class Smh_BossStageSection
End

Class Smh_Unit Extends Smh_Entity
	Field currentHP:Int
	Field maxHP:Int
	Field died:Bool
	
	Method Update:Void(millis#)
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
	Method New()
		alive = True
		active = True
		alpha = 0.8
		boundsRestrict = True
		boundsPurge = False
		boundsInset = 20
	End
	
	Method Update:Void(millis#)
		Super.Update(millis)
		Local xdir:Int = 0, ydir:Int = 0
		If KeyDown(KEY_LEFT) Then xdir -= 1
		If KeyDown(KEY_RIGHT) Then xdir += 1
		If KeyDown(KEY_UP) Then ydir -= 1
		If KeyDown(KEY_DOWN) Then ydir += 1
		' hard coded for now
		Local playerSpeed:Float = 100
		dx = playerSpeed * xdir
		dy = playerSpeed * ydir
		If KeyDown(KEY_SHIFT) Then
			dx *= 0.5
			dy *= 0.5
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
	Method Update:Void(millis#)
		Super.Update(millis)
	End
	
	Method Render:Void()
		Super.Render()
	End
End

Class Smh_Boss Extends Smh_Enemy Abstract
	Field phaseCount:Int = 1
	Field currentPhase:Int = -1
	Field currentPhaseStep:Int = 0
	Field timeRemainingMillis:Int
	Field waitTimeMillis:Int
	
	Method Update:Void(millis#)
		' call super
		Super.Update(millis)
		
		' if the boss has run out of health, we go to the next phase
		If currentPhase < 0 Or currentHP <= 0 Then
			currentPhase += 1
			' if this was the last phase, we win!
			If currentPhase > phaseCount Then
				' TODO: win!
			Else
				' TODO: not hardcode these?
				timeRemainingMillis = 30000 
				maxHP = 100
				currentHP = 100
				waitTimeMillis = 0
			End
			Return
		End
		
		' update time remaining (this could go negative if we're waiting)
		timeRemainingMillis -= millis
		
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
		
		' if we've run out time, jump to the previous section and interp off screen
		If timeRemainingMillis <= 0 Then
			' TODO interp
			Return
		End
		
		' time left, do the main boss logic
		DoLogic(millis)
	End
	
	Method DoLogic:Void(millis#) Abstract
	
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
		If bulletCount > 10 Then Purge()
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
	
	' fires one or more identical bullets with an optional frame delay between them
	Method FireBulletLinear:Smh_Bullet(template:Smh_Bullet, parent:Smh_Entity, x:Float, y:Float, polarAngle:Float, polarVelocity:Float, delayMillis:Int=0, bulletCount:Int=1)
		' if we're firing more than an arbitrary number, purge
		If bulletCount > 10 Then Purge()
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
			bullet.SetVelocityPolar(polarAngle, polarVelocity)
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
		If bulletCount > 10 Then Purge()
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
Class Smh_Stage1Boss1 Extends Smh_Boss
	Field firstBullet:Smh_Bullet
	
	Method New()
		active = True
		boundsRestrict = False
		boundsPurge = False
		
		firstBullet = New Smh_Bullet
		firstBullet.image = game.images.Find("game9_bullet1")
		firstBullet.rotation = 90
		firstBullet.scaleX = 1
		firstBullet.scaleY = 1
		firstBullet.radius = 3
		firstBullet.blendMode = AdditiveBlend
		firstBullet.visibleWhileInactive = True
		firstBullet.fadeInTimeMillis = 1000
	End
	
	Method DoLogic:Void(millis#)
		Select currentPhase
			Case 0 ' first phase
				Select currentPhaseStep
					Case 0
						' just wait
						currentPhaseStep = 1
						boss.waitTimeMillis = 1000
						
					Case 1
						' random interp and wait
						boss.SetInterpRandomOverTime(boss.x, boss.y, 50, 100, 2000, 1)
						boss.waitTimeMillis = 2000
						currentPhaseStep = 2
						
					case 2
						' fire and wait, then loop to 1
						Local direction:Float = ATan2(player.y-boss.y,player.x-boss.x)
						Local srcX:Float = boss.x - Cos(direction)*5
						Local srcY:Float = boss.y - Sin(direction)*5
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
						boss.waitTimeMillis = 3000
						currentPhaseStep = 1
				End
		End
	End
End

#rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end