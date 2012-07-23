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
Global defaultBullet:Smh_Bullet
Global background:Smh_EntityGroup
Global bullets:Smh_BulletPool

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
		
		background = New Smh_EntityGroup
		background.boundsLeft = 0
		background.boundsTop = 0
		background.boundsRight = SCREEN_WIDTH
		background.boundsBottom = SCREEN_HEIGHT
		
		bullets = New Smh_BulletPool
		bullets.parent = background
		bullets.boundsLeft = background.boundsLeft
		bullets.boundsTop = background.boundsTop
		bullets.boundsRight = background.boundsRight
		bullets.boundsBottom = background.boundsBottom
		
		defaultBullet = New Smh_Bullet
		defaultBullet.image = game.images.Find("game9_bullet1")
		defaultBullet.rotation = 90
		defaultBullet.scaleX = 0.75
		defaultBullet.scaleY = 0.75
		defaultBullet.parent = bullets
			
		background.children.Add(bullets)
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
		
	End
	
	Method Update:Void()
		If KeyHit(KEY_ESCAPE) Then
			FadeToScreen(Game9Scr)
		End
		If KeyHit(KEY_SPACE) Or MouseHit() Then
			bullets.FireBulletSpray(
				defaultBullet, Null,
				MouseX(), MouseY(), 5,
				'100, 100, 5,
				0, 360,
				0, 16,
				60, 120,
				50)
		End
		background.DoUpdate(dt.frametime)
	End
	
	Method Render:Void()
		Cls
		DrawText("Bullet Count: " + bullets.aliveCount, 0, 15)
		background.DoRender()
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
	Field boundsLeft#, boundsRight#, boundsTop#, boundsBottom#
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
		' clip
		Local boundsSrc:Smh_Entity = parent
		If Not boundsSrc Then boundsSrc = Self
		If boundsRestrict Then
			If x < boundsSrc.boundsLeft Then x = boundsSrc.boundsLeft
			If x > boundsSrc.boundsRight Then x = boundsSrc.boundsRight
			If y < boundsSrc.boundsTop Then y = boundsSrc.boundsTop
			If y > boundsSrc.boundsBottom Then y = boundsSrc.boundsBottom
		End

		' mark for purging
		If boundsPurge Then
			'If x < boundsSrc.boundsLeft Or x > boundsSrc.boundsRight Or y < boundsSrc.boundsTop Or y > boundsSrc.boundsBottom Then alive = False
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
		Return active
	End
	
	Method PostRender:Void()
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
		'If Smh_Bullet(Self) Then Print "rendering bullet"
		'Print "render"
		If image Then
			Local rx:Float = AbsoluteX
			Local ry:Float = AbsoluteY
			If useHSL And recalcHSL Then RecalcHSL()
			SetColor(red, green, blue)
			
			Local rot:Float = rotation
			If rotateWithHeading And usePolar Then rot -= polarAngle
			DrawImage(image.image, rx, ry, rot, scaleX, scaleY)
			'PushMatrix
			'Translate rx, ry
			'Scale scaleX, scaleY
			'Rotate rot
			'DrawRect(-10,-10,20,20)
			'DrawCircle(0, 0, 10)
			'PopMatrix
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
		visible = source.visible
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
		If Not unit Then Return ' error, wrong entity type
		Super.CopyFrom(source)
		currentHP = unit.currentHP
		maxHP = unit.maxHP
	End
End

Class Smh_Player Extends Smh_Unit
	Method New()
		alive = True
		active = True
		boundsRestrict = True
		boundsPurge = False
	End
	
	Method Update:Void(millis#)
		Super.Update(millis)
	End
	
	Method Render:Void()
		Super.Render()
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

Class Smh_Boss Extends Smh_Enemy
	Field timeRemainingMillis:Int
	
	Method Update:Void(millis#)
		Super.Update(millis)
	End
	
	Method Render:Void()
		Super.Render()
	End
End

Class Smh_BulletPool Extends Smh_Pool<Smh_Bullet>
	Method New(capacity:Int=2000)
		Super.New(capacity)
	End
	
	' fires one or more identical bullets with an optional delay between them
	Method FireBullet:Smh_Bullet(template:Smh_Bullet, parent:Smh_Entity, x:Float, y:Float, delayMillis:Int=0, bulletCount:Int=1)
		Local bullet:Smh_Bullet = Null
		For Local i:Int = 1 To bulletCount
			bullet = GetEntity(template)
			If Not bullet Then Return Null
			bullet.parent = parent
			bullet.activeDelayMillis = delayMillis * i
			bullet.x = x
			bullet.y = y
		Next
		Return bullet
	End
	
	' fires one or more identical bullets with an optional frame delay between them
	Method FireBulletLinear:Smh_Bullet(template:Smh_Bullet, parent:Smh_Entity, x:Float, y:Float, polarAngle:Float, polarVelocity:Float, delayMillis:Int=0, bulletCount:Int=1)
		Local bullet:Smh_Bullet = Null
		For Local i:Int = 1 To bulletCount
			bullet = GetEntity(template)
			If Not bullet Then Return Null
			bullet.parent = parent
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
		Local bullet:Smh_Bullet = Null
		Local delayMillis:Int = firstDelayMillis
		For Local i:Int = 0 Until bulletCount
			Local ratio:Float = 0
			If bulletCount > 0 Then ratio = Float(i)/(bulletCount-1)
			Local angle:Float = startAngle + (endAngle-startAngle) * ratio
			While angle > 360 angle -= 360 End
			While angle < 0 angle += 360 End
			bullet = GetEntity(template)
			If Not bullet Then Return Null
			bullet.parent = parent
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

Class Smh_Bullet Extends Smh_Unit
	Method New()
		alive = False
		active = False
		boundsRestrict = False
		boundsPurge = True
	End
	
	Method Render:Void()
		Super.Render()
	End
End



#rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end