#rem
header:
[quote]

[b]File Name :[/b] Game8Screen
[b]Author    :[/b] firstname "alias" lastname
[b]About     :[/b]
what it is..
[/quote]
#end

Import main

Global gameScreen:GameScreen
Global gameOverScreen:GameOverScreen
Global debugOn:Bool = True

Class GameOverScreen Extends Screen
	Method New()
		name = "GameOverScreen"
	End
	
	Method Start:Void()
		
	End
	
	Method Render:Void()
		Cls
		TitleFont.DrawText("GAME OVER!", 320, 240, 2)
	End
	
	Method Update:Void()
		If KeyHit(KEY_SPACE) or KeyHit(KEY_ESCAPE) Or MouseHit() Then
			FadeToScreen(Game8Scr)
		End
	End
End

#rem
summary:Title Screen Class.
Used to manage and deal with all Tital Page stuff.
#End
Class Game8Screen Extends Screen
	
	Method New()
		name = "Tower Defense"
		Local gameid:Int = 8
		GameList[gameid - 1] = New miniGame
		GameList[gameid - 1].id = gameid - 1
		GameList[gameid - 1].name = "Tower Defense"
		GameList[gameid - 1].iconname = "game" + gameid + "_icon"
		GameList[gameid - 1].thumbnail = "game" + gameid + "_thumb"
		GameList[gameid - 1].author = "Steven Revill"
		GameList[gameid - 1].authorurl = "therevillsgames.com"
		GameList[gameid - 1].info = "Tower Defense Info"
	End
	
	#rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		gameScreen = New GameScreen
		gameOverScreen = New GameOverScreen
	End
	
	#rem
	summary:Render Title Screen
	Renders all the Screen Elements.
	#End
	Method Render:Void()
		Cls
		TitleFont.DrawText(Self.name, 320, 240,2)
	End

	#rem
	sumary:Update Title Screen
	Will update all screen objects, handles mouse, keys
	and all use input.
	#End
	Method Update:Void()
		If KeyHit(KEY_SPACE) Or MouseHit() Then
			FadeToScreen(gameScreen)
		End
		If KeyHit(KEY_ESCAPE)
			FadeToScreen(TitleScr)
		End
	End
End

Class TankEnemy Extends Enemy
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
	End
	
	Method SetStats:Void()
		Self.fireRate = 20
		Self.damage = 10
		Self.range = 70
		Self.health = 100
		Self.speed = 1
		Self.alive = True
		Self.score = 50
	End
End

Class Enemy Extends Sprite 'Abstract
	Global list:ArrayList<Enemy> = New ArrayList<Enemy>
	Field currentPath:Int = 0
	Field damage:Float
	Field range:Float
	Field fireRate:Int
	Field health:Float
	Field alive:Bool
	Field route:Int[]
	Field score:Int
	
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
		SetStats()
		SetPath()
		list.Add(Self)
	End
	
	Method SetStats:Void() Abstract
	
	Method Kill:Void()
		If Not list Return	
		list.Remove(Self)
	End
	
	Function DrawAll:Void()
		If Not list Return
		Local e:Enemy
		For Local i:Int = 0 Until list.Size
			e = list.Get(i)
			e.Draw(game.scrollX, game.scrollY)
		Next
	End
		
	Function UpdateAll:Void()
		If Not list Return
		Local e:Enemy
		For Local i:Int = 0 Until list.Size
			e = list.Get(i)
			e.Update()
		Next
	End
	
	Method Update:Void()
		If currentPath >= 0 And PathFinder.route.Length() > 0
			Local angle:Float = CalcAngle(x, y, route[currentPath] * gameScreen.TILE_SIZE, route[currentPath + 1] * gameScreen.TILE_SIZE)

			dx = Cos(angle) * speed
			dy = Sin(angle) * speed
			
			Self.Move()
			
			If angle > 22.5 And angle < 67.5
			' down right
				frame = 0
			Elseif angle > 67.5 And angle < 112.5
			' down
				frame = 1
			Elseif angle > 112.5 And angle < 157.5
			' down left
				frame = 2
			Elseif angle > 157.5 And angle < 202.5
			' left
				frame = 5
			Elseif angle > 202.5 And angle < 247.5
			' up left
				frame = 8
			Elseif angle > 247.5 And angle < 292.5
			' up
				frame = 7
			Elseif angle > 292.5 And angle < 337.5
			' up right
				frame = 6
			Else
			' right
				frame = 3
			End
	
			If PointInSpot(x, y, route[currentPath] * gameScreen.TILE_SIZE, route[currentPath + 1] * gameScreen.TILE_SIZE, 3)
				currentPath -= 2
				If currentPath < 0
					gameScreen.health -= damage
					alive = False
					Kill()
				End
			End
		End
		If Self.health <= 0
			gameScreen.cash += Self.score
			alive = False
			New Explosion(gameScreen.explosionImage, x, y, 8, 100)
			Kill()
		End
	End
	
	Method SetPath:Void()
		Local startPos:TileMapObject = gameScreen.tilemap.FindObjectByName("Start")
		Local endPos:TileMapObject = gameScreen.tilemap.FindObjectByName("End")
		PathFinder.FindPath(startPos.x / gameScreen.TILE_SIZE, startPos.y / gameScreen.TILE_SIZE, endPos.x / gameScreen.TILE_SIZE, endPos.y / gameScreen.TILE_SIZE)
		route = PathFinder.route
		currentPath = (PathFinder.paths - 1) * 2
		x = startPos.x
		y = startPos.y
	End
End

Class TurretTower Extends Tower
	Global cost:Int = 250
	
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
	End
	
	Method SetStats:Void()
		Self.fireRate = 30
		Self.damage = 25
		Self.damageBonus = 2
		Self.range = 100
		Self.health = 100
		Self.firePosX = x + Self.image.w2
		Self.firePosY = y + Self.image.h2
		Self.selected = False		
	End
End

' Towers are NOT midhandled!
Class Tower Extends Sprite Abstract
	Global list:ArrayList<Tower> = New ArrayList<Tower>
	Field damage:Float
	Field damageBonus:Float
	Field range:Float
	Field lastFire:Float
	Field fireRate:Int
	Field health:Float
	Field target:Enemy
	Field targetDist:Float
	Field firePosX:Int, firePosY:Int
	Field drawLine:Bool
	Field drawLineTime:Float
	
	Field dx1:Int, dy1:Int, dx2:Int, dy2:Int
	Field selected:Bool
	Field gunImage:GameImage
	Field gunFrame:Int
	Field gunAngle:Float
	
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
		SetStats()
		list.Add(Self)
	End
	
	Method SetStats:Void() Abstract
	
	Method Kill:Void()
		If Not list Return
		list.Remove(Self)
	End
	
	Function DrawAll:Void()
		If Not list Return
		Local t:Tower
		For Local i:Int = 0 Until list.Size
			t = list.Get(i)
			t.Draw()
		Next
	End
	
	Method Draw:Void()
		If selected
			SetAlpha 0.2
			DrawCircle(firePosX - game.scrollX, firePosY - game.scrollY, range)
			SetAlpha 1
		End
		Super.Draw(game.scrollX, game.scrollY)

		If drawLine
			DrawLine dx1 - game.scrollX, dy1 - game.scrollY, dx2 - game.scrollX, dy2 - game.scrollY
		End
		gunImage.Draw(firePosX - game.scrollX, firePosY - game.scrollY, gunAngle, 1, 1, gunFrame)
	End
	
	Function UpdateAll:Void()
		If Not list Return
		Local t:Tower
		For Local i:Int = 0 Until list.Size
			t = list.Get(i)
			t.Update()
		Next
	End
	
	Method SetGunAngle:Void(angle:Float)
		gunAngle = -angle - 90
	
		If angle > 22.5 And angle < 67.5
		' down right
			gunAngle -= 45 * 5
			gunFrame = 3
		Elseif angle > 67.5 And angle < 112.5
		' down
			gunAngle -= 45 * 4
			gunFrame = 4
		Elseif angle > 112.5 And angle < 157.5
		' down left
			gunAngle -= 45 * 3
			gunFrame = 5
		Elseif angle > 157.5 And angle < 202.5
		' left
			gunAngle -= 45 * 2
			gunFrame = 6
		Elseif angle > 202.5 And angle < 247.5
		' up left
			gunAngle -= 45
			gunFrame = 7
		Elseif angle > 247.5 And angle < 292.5
		' up
			gunFrame = 0
		Elseif angle > 292.5 And angle < 337.5
		' up right
			gunAngle += 45
			gunFrame = 1
		Else
		' right
			gunAngle += 45 * 2
			gunFrame = 2
		End	
	
	End
	
	Method Update:Void()
		Local e:Enemy
		If Self.target And Self.target.alive
			lastFire += 1 * dt.delta
			Self.targetDist = CalcDistance(Self.firePosX, Self.firePosY, Self.target.x, Self.target.y)
			Local angle:Float = CalcAngle(Self.firePosX, Self.firePosY, Self.target.x, Self.target.y)
				
			If lastFire > fireRate
				SetGunAngle(angle)
				lastFire = 0
				Self.drawLine = True
				dx1 = Self.firePosX
				dy1 = Self.firePosY
				dx2 = Self.target.x
				dy2 = Self.target.y
				Self.target.health -= Self.damage + Rnd(0, Self.damageBonus)
				New Explosion(gameScreen.explosionSmallImage, Self.target.x, Self.target.y, 6, 100)
				If Self.target.health <= 0
					Self.target = Null
				End
			End
			If Self.targetDist > Self.range
				Self.target = Null
			End
		Else
			For Local i:Int = 0 Until Enemy.list.Size
				e = Enemy.list.Get(i)
				Local dist:Float = CalcDistance(Self.firePosX, Self.firePosY, e.x, e.y)
				If Self.target And Self.target.alive
					If dist < Self.targetDist
						Self.targetDist = dist
						Self.target = e
					End
				Else
					If dist < Self.range
						Self.targetDist = dist
						Self.target = e
					End
				End
			Next
		End
		If Self.drawLine
			Self.drawLineTime += 1 * dt.delta
			If Self.drawLineTime > 10
				Self.drawLineTime = 0
				Self.drawLine = False
			End
		End
	End
	
	Function UnselectTowers:Void()
		For Local t:Tower = Eachin Tower.list
			t.selected = False
		Next
	End
	
	Function SelectTower:Tower(x:Int, y:Int)
		Local tower:Tower
		For Local t:Tower = Eachin Tower.list
			If t.x / gameScreen.TILE_SIZE = x / gameScreen.TILE_SIZE And t.y / gameScreen.TILE_SIZE = y / gameScreen.TILE_SIZE
				t.selected = True
				tower = t
				Exit
			End
		Next
		Return tower
	End
End

Class Explosion Extends Sprite
	Global list:ArrayList<Explosion> = New ArrayList<Explosion>

	Method New(img:GameImage, x:Float, y:Float, frames:Int, animSpeed:Int)
		Super.New(img, x, y)
		Self.SetFrame(0, frames, animSpeed, False, False)
		list.Add(Self)
	End
	
	Method Kill:Void()
		If Not list Return
		list.Remove(Self)
	End
	
	Function DrawAll:Void()
		If Not list Return
		Local e:Explosion
		For Local i:Int = 0 Until list.Size
			e = list.Get(i)
			e.Draw(game.scrollX, game.scrollY)
		Next
	End
	
	Function UpdateAll:Void()
		If Not list Return
		Local e:Explosion
		For Local i:Int = 0 Until list.Size
			e = list.Get(i)
			e.Update()
		Next
	End
	
	Method Update:Void()
		If UpdateAnimation() Then Kill()
	End
End

Class GameScreen Extends Screen
	Const TILE_SIZE:Int = 20
	Field tilemap:MyTileMap
	Field x:Float, y:Float
	Field grid:Float[]
	Field enemyImage:GameImage
	Field turretBaseImage:GameImage
	Field turretGunImage:GameImage
	Field selectedTower:Tower
	Field delay:Float, maxDelay:Int = 100
	Field buildableLayerOn:Bool = False
	Field gridOn:Bool = False
	Field explosionImage:GameImage
	Field explosionBigImage:GameImage
	Field explosionSmallImage:GameImage
	Field gui:Gui
	Field cash:Int
	Field health:Int
	Field gameScrollSpeed:Int = 5
	
	Method New()
		name = "Tower Defense GameScreen"
	End
	
	Method LoadMap:Void()
		Local reader:MyTiledTileMapReader = New MyTiledTileMapReader
		Local tm:TileMap = reader.LoadMap("graphics/game8/level1.tmx")
		tilemap = MyTileMap(tm)
		Local startPos:TileMapObject = tilemap.FindObjectByName("Start")
		Local endPos:TileMapObject = tilemap.FindObjectByName("End")

		Local layer:TileMapTileLayer = tilemap.FindLayerByName(tilemap.COLLISION_LAYER)
		grid = New Float[tilemap.width * tilemap.height]
		
		' convert the tile map to a float grid for the pathfinder
		For Local i:Int = 0 Until layer.mapData.tiles.Length
			grid[i] = layer.mapData.tiles[i]
		Next
		
		' set the map for the pathfinder using diagonals(2) and randomise it a tad(1)
		PathFinder.SetMap(grid, tilemap.width, tilemap.height, 2, 1)
	End
	
	Method LoadImages:Void()
		Local tmpImage:Image
		game.images.LoadAnim("game8/tank7.png", 20, 20, 9, tmpImage)
		game.images.LoadAnim("game8/turretBase.png", 40, 28, 2, tmpImage, False)
		game.images.LoadAnim("game8/turretGun.png", 52, 45, 8, tmpImage)
		game.images.LoadAnim("game8/explosn.png", 20, 20, 9, tmpImage)
		game.images.LoadAnim("game8/exploBig.png", 40, 40, 14, tmpImage)
		game.images.LoadAnim("game8/expSmall.png", 20, 20, 7, tmpImage)
		game.images.Load("game8/gui.png", "", False)
		turretBaseImage = game.images.Find("turretBase")
		turretGunImage = game.images.Find("turretGun")
		enemyImage = game.images.Find("tank7")
		explosionImage = game.images.Find("explosn")
		explosionBigImage = game.images.Find("exploBig")
		explosionSmallImage = game.images.Find("expSmall")
	End
	
	Method Start:Void()
		game.scrollX = TILE_SIZE
		game.scrollY = TILE_SIZE
		delay = maxDelay
		LoadImages()
		LoadMap()
		cash = 1000
		health = 100
		gui = New Gui
	End
	
	Method Render:Void()
		Cls
		tilemap.RenderMap(game.scrollX, game.scrollY, SCREEN_WIDTH, SCREEN_HEIGHT)
		
		If gridOn
			'Draw grid lines
			SetColor 255, 255, 255
			SetAlpha 0.3
			For Local fx:Int = 0 To tilemap.width
				DrawLine fx * TILE_SIZE - game.scrollX, 0 - game.scrollY, fx * TILE_SIZE - game.scrollX, tilemap.width * TILE_SIZE - game.scrollY
				DrawLine 0 - game.scrollX, fx * TILE_SIZE - game.scrollY, tilemap.width * TILE_SIZE - game.scrollX, fx * TILE_SIZE - game.scrollY
			Next
			SetAlpha 1
		End
		
		If buildableLayerOn
			SetColor 255, 0, 0
			SetAlpha 0.3
			Local layer:TileMapTileLayer = tilemap.FindLayerByName(gameScreen.tilemap.BUILD_LAYER)

			For Local fx:Int = 0 Until tilemap.width
				For Local fy:Int = 0 Until tilemap.height
					If layer.mapData.Get(fx, fy) > 0
						DrawRect fx * TILE_SIZE - game.scrollX, fy * TILE_SIZE - game.scrollY, TILE_SIZE, TILE_SIZE
					End
				Next
			Next
			SetAlpha 1
			SetColor 255, 255, 255
		End
		
		Tower.DrawAll()
		Enemy.DrawAll()
		Explosion.DrawAll()
		
		if gui.mode = gui.TURRET
			Local nx:Float = Floor((game.mouseX + game.scrollX)/ TILE_SIZE)
			Local ny:Float = Floor((game.mouseY + game.scrollY)/ TILE_SIZE)
			turretBaseImage.Draw(nx * TILE_SIZE - game.scrollX, ny * TILE_SIZE - game.scrollY)
		End
		
		gui.Draw()
		
		If debugOn Then DrawDebugInfo()
	End

	Method DrawDebugInfo:Void()
		Local y:Int = 10
		Local gap:Int = 13
		SetAlpha 0.4
		If gridOn
			DrawText "Grid: On (F1)", 10, y
		Else
			DrawText "Grid: Off (F1)", 10, y
		End
		
		y += gap
		
		If buildableLayerOn
			DrawText "Build Layer: On (F2)", 10, y
		Else
			DrawText "Build Layer: Off (F2)", 10, y
		End
		SetAlpha 1
	End

	Method Update:Void()
		If delay > 0
			delay -= 1 * dt.delta
		Else
			delay = maxDelay
			Local startPos:TileMapObject = tilemap.FindObjectByName("Start")
			Local endPos:TileMapObject = tilemap.FindObjectByName("End")
			New TankEnemy(enemyImage, startPos.x, startPos.y)
		End
		Tower.UpdateAll()
		Enemy.UpdateAll()
		Explosion.UpdateAll()
		Controls()
		
		' game over
		if health < 0 Then
			FadeToScreen(gameOverScreen, defaultFadeTime, True, True, False)
		End
	End
	
	Method Controls:Void()
		gui.Update()
		If debugOn
			If KeyHit(KEY_SPACE)
				Local startPos:TileMapObject = tilemap.FindObjectByName("Start")
				Local endPos:TileMapObject = tilemap.FindObjectByName("End")
				New TankEnemy(enemyImage, startPos.x, startPos.y)
			End
			If KeyHit(KEY_F2)
				buildableLayerOn = Not buildableLayerOn
			End
			If KeyHit(KEY_F1)
				gridOn = Not gridOn
			End
			
			If KeyDown(KEY_LEFT)
				game.scrollX -= Floor(gameScrollSpeed * dt.delta)
			End
			If KeyDown(KEY_RIGHT)
				game.scrollX += Floor(gameScrollSpeed * dt.delta)
			End
			If KeyDown(KEY_UP)
				game.scrollY -= Floor(gameScrollSpeed * dt.delta)
			End
			If KeyDown(KEY_DOWN)
				game.scrollY += Floor(gameScrollSpeed * dt.delta)
			End

		End
		
		If KeyHit(KEY_DELETE)
			If selectedTower <> Null
				gameScreen.tilemap.SetTile(selectedTower.x, selectedTower.y, 0, gameScreen.tilemap.BUILD_LAYER)
				gameScreen.tilemap.SetTile((selectedTower.x + TILE_SIZE), selectedTower.y, 0, gameScreen.tilemap.BUILD_LAYER)
				New Explosion(explosionBigImage, selectedTower.x + selectedTower.image.w2, selectedTower.y + selectedTower.image.h2, 13, 80)
				selectedTower.Kill()
			End
		End
		
		If KeyHit(KEY_1)
			If selectedTower <> Null
				selectedTower.range += 30
			End
		End
		
		If game.mouseHit
			Tower.UnselectTowers()
			selectedTower = Null
			if game.mouseY < gui.y Then
				Local mx:Int = game.mouseX + game.scrollX
				Local my:Int = game.mouseY + game.scrollY
				
				If gameScreen.tilemap.CollisionTile(mx + TILE_SIZE, my, gameScreen.tilemap.BUILD_LAYER) = 0 And
				gameScreen.tilemap.CollisionTile(mx, my, gameScreen.tilemap.BUILD_LAYER) = 0 Then
					if gui.mode = gui.TURRET
						Local nx:Float = Floor(mx / TILE_SIZE)
						Local ny:Float = Floor(my / TILE_SIZE)
						Local t:TurretTower = New TurretTower(turretBaseImage, nx * TILE_SIZE, ny * TILE_SIZE)
						cash -= TurretTower.cost
						t.gunImage = turretGunImage
						t.firePosY -= 7
						
						gameScreen.tilemap.SetTile(mx, my, 1, gameScreen.tilemap.BUILD_LAYER)
						gameScreen.tilemap.SetTile(mx + TILE_SIZE, my, 1, gameScreen.tilemap.BUILD_LAYER)
						
						selectedTower = Tower.SelectTower(mx, my)

						gui.Reset()
					End
				Else
					if gui.mode = gui.NONE
						If gameScreen.tilemap.CollisionTile(mx, my, gameScreen.tilemap.BUILD_LAYER) = 1
							selectedTower = Tower.SelectTower(mx, my)
						End
					End
				End
			End
		End
	
		If KeyHit(KEY_ESCAPE)
			FadeToScreen(Game8Scr, defaultFadeTime, True, True, False)
		End
	End
	
	Method Kill:Void()
		ClearItems()
	End
	
	Method ClearItems:Void()
		If Enemy.list
			Enemy.list.Clear()
		End
		If Tower.list
			Tower.list.Clear()
		End
		If Explosion.list
			Explosion.list.Clear()
		End
	End
End

Class Gui
	Const FULL:Int = 2
	Const SCROLL_UP:Int = 1
	Const SCROLL_DOWN:Int = 3
	Const HIDE:Int = 0
	Const NONE:Int = 0
	Const TURRET:Int = 1
	
	Field showGUI:Int
	Field x:Float
	Field y:Float
	Field menu:SimpleMenu
	Field mode:Int
	Field limit:Int
	Field override:Int = 0
	Field backgroundImage:GameImage
	Field speedY:Int = 4
	Field lip:Int = 20
	Field enableScroll:Bool
	Field menuOffsetY:Int = 7
	
	Method New()
		showGUI = SCROLL_UP
		mode = NONE
		x = 0
		y = SCREEN_HEIGHT - lip
		override = 0
		menu = New SimpleMenu("ButtonOver", "ButtonClick", 0, 0, 20, True, HORIZONTAL)
		local b:SimpleButton = menu.AddButton("game8/turretButton.png", "game8/turretButtonMO.png")
		b.SetSelectedImage("game8/turretButtonSelected.png")
		menu.AddButton("game8/turretButton.png", "game8/turretButtonMO.png", "2")
		menu.AddButton("game8/turretButton.png", "game8/turretButtonMO.png", "3")

		backgroundImage = game.images.Find("gui")
		limit = backgroundImage.h
		enableScroll = False
		if Not enableScroll
			y = SCREEN_HEIGHT - 50
		End

		menu.SetY(y + menuOffsetY)
		menu.SetX(10)

	End
	
	Method ShowHideGUI:Void()
		if enableScroll
			If game.mouseY < SCREEN_HEIGHT - limit And override = 0 showGUI = SCROLL_DOWN
			If game.mouseY >= SCREEN_HEIGHT - lip showGUI = SCROLL_UP
			
			If showGUI = SCROLL_UP
				y -= speedY * dt.delta
				If y < SCREEN_HEIGHT - limit
					showGUI = FULL
					y = SCREEN_HEIGHT - limit
				End
			End
	
			If showGUI = SCROLL_DOWN
				y += speedY * dt.delta
				If y > SCREEN_HEIGHT - lip
					showGUI = 0
					override = 0
					y = SCREEN_HEIGHT - lip
				End
			End
		End
	End
	
	Method Reset:Void()
		mode = NONE
		For local b:SimpleButton = EachIn self.menu
			b.selected = False
		Next
	End
	
	Method Update()
		menu.Update()
		menu.SetY(y + menuOffsetY)

		if menu.Clicked("turretButton") And gameScreen.cash >= TurretTower.cost
			Local sb:SimpleButton = menu.FindButton("turretButton")
			if sb.selected = True
				mode = NONE
				sb.selected = False
			Else
				mode = TURRET
				sb.selected = True
			End
			
		End
		
		
		ShowHideGUI()
	End
	
	Method Draw()
		backgroundImage.Draw(x, y)
		menu.Draw()
		DrawText("CASH:" + gameScreen.cash, SCREEN_WIDTH, y + 10, 1, 0)
		DrawText("HEALTH:" + gameScreen.health, SCREEN_WIDTH, y + 25, 1, 0)
	End
	
End

Class MyTiledTileMapReader Extends TiledTileMapReader
	Method CreateMap:TileMap()
		graphicsPath = "game8/"
		Return New MyTileMap
	End
End

Class MyTileMap Extends TileMap
	Const GRAVITY:Float = 0.5
	Const COLLISION_LAYER:String = "CollisionLayer"
	Const BUILD_LAYER:String = "BuildableLayer"
		
	Method ConfigureLayer:Void(tileLayer:TileMapLayer)
		SetAlpha(tileLayer.opacity)
	End
	
	Method DrawTile:Void(tileLayer:TileMapTileLayer, mapTile:TileMapTile, x:Int, y:Int)
		mapTile.image.DrawTile(x, y, mapTile.id, 0, 1, 1)
	End
End

#rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end