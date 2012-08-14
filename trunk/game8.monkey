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
Global nextLevelScreen:NextLevelScreen
Global debugOn:Bool = True

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
		nextLevelScreen = New NextLevelScreen
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

Class UnitTemplate
	Field name:String
	Field gunImageName:String
	Field damage:Float
	Field damageBonus:Float
	Field range:Float
	Field fireRate:Int
	Field health:Float
	Field score:Int
	Field imageName:String
	Field speed:Float
	Field cost:Int
	Field firePosX:Float
	Field firePosY:Float
End

Class TankEnemy Extends Enemy
	Method New(name:String, x:Float, y:Float)
		Super.New(game.images.Find(gameScreen.enemyTemplateMap.Get(name.ToUpper()).imageName), x, y, name)
	End
End

Class Enemy Extends Sprite Abstract
	Global list:ArrayList<Enemy> = New ArrayList<Enemy>
	Field currentPath:Int = 0
	Field damage:Float
	Field range:Float
	Field fireRate:Int
	Field health:Float
	Field alive:Bool
	Field route:Int[]
	Field score:Int
	
	Method New(img:GameImage, x:Float, y:Float, name:String)
		Super.New(img, x, y)
		SetStats(name)
		SetPath()
		list.Add(Self)
	End
	
	Method SetStats:Void(name:String)
		Local et:UnitTemplate = gameScreen.enemyTemplateMap.Get(name.ToUpper())
		Self.fireRate = et.fireRate
		Self.damage = et.damage
		Self.range = et.range
		Self.health = et.health
		Self.speed = et.speed
		Self.alive = True
		Self.score = et.score
	End
	
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
	Method New(name:String, x:Float, y:Float)
		Super.New(game.images.Find(gameScreen.towerTemplateMap.Get(name.ToUpper()).imageName), x, y, name)
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
	Field cost:Int
	
	Field dx1:Int, dy1:Int, dx2:Int, dy2:Int
	Field selected:Bool
	Field gunImage:GameImage
	Field gunFrame:Int
	Field gunAngle:Float
	
	Method New(img:GameImage, x:Float, y:Float, name:String)
		Super.New(img, x, y)
		SetStats(name)
		list.Add(Self)
	End
	
	Method SetStats:Void(name:String)
		Local t:UnitTemplate = gameScreen.towerTemplateMap.Get(name.ToUpper())
		Self.damage = t.damage
		Self.damageBonus = t.damageBonus
		Self.range = t.range
		Self.health = t.health
		Self.fireRate = t.fireRate
		Self.cost = t.cost
		Self.firePosX = x + Self.image.w2 + t.firePosX
		Self.firePosY = y + Self.image.h2 + t.firePosY
		self.gunImage = game.images.Find(t.gunImageName)
		Self.selected = False
	End
	
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

Class Wave
	Field sequence:Int
	Field initialDelay:Int
	Field initialDelayCounter:Float
	Field enemyMap:IntMap<EnemyWave>
	Field delay:Float
	Field enemySeq:Int
	Field currentEnemyWave:EnemyWave
	Field firstTime:Bool
	
	Method New()
		enemyMap = New IntMap<EnemyWave>
		delay = 0
		enemySeq = 1
		firstTime = True
		initialDelayCounter = 0
	End
	
	Method Update:Int()
		if firstTime
			currentEnemyWave = enemyMap.Get(enemySeq)
			firstTime = False
		Else
			if initialDelayCounter < initialDelay
				initialDelayCounter += 1 * dt.delta
			Else
				if currentEnemyWave <> null Then
					if currentEnemyWave.count < currentEnemyWave.amount Then
						delay += 1 * dt.delta
						if delay > currentEnemyWave.delay
							delay = 0
							Local startPos:TileMapObject = gameScreen.tilemap.FindObjectByName("Start")
							Local endPos:TileMapObject = gameScreen.tilemap.FindObjectByName("End")
							New TankEnemy(currentEnemyWave.type, startPos.x, startPos.y)
							currentEnemyWave.count += 1
						End
					Else
						enemySeq += 1
						currentEnemyWave = enemyMap.Get(enemySeq)
						if currentEnemyWave = null
							Return 1
						End
					End
				Else
					Return 1
				End
			End
		End
		Return 0
	End
End

Class EnemyWave
	Field sequence:Int
	Field type:String
	Field delay:Int
	Field amount:Int
	Field count:Int
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
	Field enemyTemplateMap:StringMap<UnitTemplate>
	Field towerTemplateMap:StringMap<UnitTemplate>
	Field level:Int
	Field mapFileName:String
	Field mapName:String
	Field waveMap:IntMap<Wave>
	Field waveCount:Int
	Field currentWave:Wave
	
	Method New()
		name = "Tower Defense GameScreen"
	End
	
	Method LoadEnemyData:Void()
		' load enemy data
		Local file:String = "graphics/game8/enemies.xml"
		Local xmlReader:XMLParser = New XMLParser
		Local doc:XMLDocument = xmlReader.ParseFile(file)
		Local rootElement:XMLElement = doc.Root
		For Local xmlEnemy:XMLElement = Eachin rootElement.GetChildrenByName("enemy")
			Local t:UnitTemplate = New UnitTemplate()
			
			t.name = xmlEnemy.GetFirstChildByName("name").Value
			t.imageName = xmlEnemy.GetFirstChildByName("image").Value
			t.damage = Int(xmlEnemy.GetFirstChildByName("damage").Value)
			t.range = Float(xmlEnemy.GetFirstChildByName("range").Value)
			t.health = Float(xmlEnemy.GetFirstChildByName("health").Value)
			t.speed = Float(xmlEnemy.GetFirstChildByName("speed").Value)
			t.score = Int(xmlEnemy.GetFirstChildByName("score").Value)
			
			enemyTemplateMap.Add(t.name.ToUpper(), t)
		Next	
	End
	
	Method LoadTowerData:Void()
		' load enemy data
		Local file:String = "graphics/game8/towers.xml"
		Local xmlReader:XMLParser = New XMLParser
		Local doc:XMLDocument = xmlReader.ParseFile(file)
		Local rootElement:XMLElement = doc.Root
		For Local xmlEnemy:XMLElement = Eachin rootElement.GetChildrenByName("tower")
			Local t:UnitTemplate = New UnitTemplate()
			
			t.name = xmlEnemy.GetFirstChildByName("name").Value
			t.imageName = xmlEnemy.GetFirstChildByName("image").Value
			t.gunImageName = xmlEnemy.GetFirstChildByName("gunImage").Value
			t.damage = Float(xmlEnemy.GetFirstChildByName("damage").Value)
			t.damageBonus = Float(xmlEnemy.GetFirstChildByName("damageBonus").Value)
			t.range = Float(xmlEnemy.GetFirstChildByName("range").Value)
			t.health = Float(xmlEnemy.GetFirstChildByName("health").Value)
			t.fireRate = Float(xmlEnemy.GetFirstChildByName("fireRate").Value)
			t.cost = Int(xmlEnemy.GetFirstChildByName("cost").Value)
			t.firePosX = Float(xmlEnemy.GetFirstChildByName("firePosX").Value)
			t.firePosY = Float(xmlEnemy.GetFirstChildByName("firePosY").Value)
			
			towerTemplateMap.Add(t.name.ToUpper(), t)
		Next
	End
	
	Method LoadLevelData:Void(level:Int)
		' load level data
		Local file:String = "graphics/game8/level" + level + ".xml"
		Local xmlReader:XMLParser = New XMLParser
		Local doc:XMLDocument = xmlReader.ParseFile(file)
		Local rootElement:XMLElement = doc.Root
		
		For Local xml:XMLElement = Eachin rootElement.GetChildrenByName("data")
			mapName = xml.GetFirstChildByName("name").Value
			cash = Int(xml.GetFirstChildByName("cash").Value)
			mapFileName = xml.GetFirstChildByName("map").Value
			
			For Local waveXml:XMLElement = Eachin xml.GetChildrenByName("wave")
				Local wave:Wave = New Wave()
				wave.sequence = Int(waveXml.GetFirstChildByName("sequence").Value)
				wave.initialDelay = Int(waveXml.GetFirstChildByName("initialDelay").Value)
				For Local enemiesXml:XMLElement = Eachin waveXml.GetChildrenByName("enemies")
				
					For Local enemyXml:XMLElement = Eachin enemiesXml.GetChildrenByName("enemy")
						Local ew:EnemyWave = New EnemyWave()
						ew.sequence = Int(enemyXml.GetFirstChildByName("sequence").Value)
						ew.type = enemyXml.GetFirstChildByName("type").Value
						ew.amount = Int(enemyXml.GetFirstChildByName("amount").Value)
						ew.delay = Int(enemyXml.GetFirstChildByName("delay").Value)
						wave.enemyMap.Add(ew.sequence, ew)
					Next
					
				Next
				
				waveMap.Add(wave.sequence, wave)
				
			Next
			
		Next
	End
	
	Method LoadData:Void()
		LoadEnemyData()
		LoadTowerData()
		LoadLevelData(1)
	End
	
	Method LoadMap:Void()
		Local reader:MyTiledTileMapReader = New MyTiledTileMapReader
		Local tm:TileMap = reader.LoadMap("graphics/game8/" + mapFileName + ".tmx")
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
		game.images.LoadAnim("game8/Tank5b.png", 20, 20, 9, tmpImage)
		game.images.LoadAnim("game8/hardtank.png", 40, 40, 9, tmpImage)
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
		enemyTemplateMap = New StringMap<UnitTemplate>
		towerTemplateMap = New StringMap<UnitTemplate>
		waveMap = New IntMap<Wave>
		
		game.scrollX = TILE_SIZE
		game.scrollY = TILE_SIZE
		delay = maxDelay
		LoadData()
		LoadImages()
		LoadMap()
		health = 100
		gui = New Gui
		waveCount = 1
		currentWave = waveMap.Get(waveCount)
		
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

	Method UpdateWave:Void()
		if currentWave <> null Then
			if currentWave.Update()
				waveCount += 1
				currentWave = waveMap.Get(waveCount)
			End
		End	
	End
	
	Method Update:Void()
		UpdateWave()
		Tower.UpdateAll()
		Enemy.UpdateAll()
		Explosion.UpdateAll()
		Controls()
		
		' game over
		if health <= 0 Then
			health = 0
			FadeToScreen(gameOverScreen, defaultFadeTime, True, True, False)
		End
		
		' win
		if Enemy.list.Size() = 0 And currentWave = null Then
			FadeToScreen(nextLevelScreen, defaultFadeTime, True, True, False)
		End
	End
	
	Method Controls:Void()
		gui.Update()
		If debugOn
			If KeyHit(KEY_SPACE)
				Local startPos:TileMapObject = tilemap.FindObjectByName("Start")
				Local endPos:TileMapObject = tilemap.FindObjectByName("End")
				New TankEnemy("EasyTank", startPos.x, startPos.y)
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
						Local t:TurretTower = New TurretTower("turret", nx * TILE_SIZE, ny * TILE_SIZE)
						cash -= t.cost
						
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
		enemyTemplateMap.Clear()
		towerTemplateMap.Clear()
		waveMap.Clear()
		
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
		b.SetSelectedImage("game8/turretButtonSelected.png", "game8/turretButtonSelectedMO.png")
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

		if menu.Clicked("turretButton") And gameScreen.cash >= gameScreen.towerTemplateMap.Get("TURRET").cost
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

Class NextLevelScreen Extends Screen
	Method New()
		name = "NextlevelScreen"
	End
	
	Method Start:Void()
		
	End
	
	Method Render:Void()
		Cls
		TitleFont.DrawText("WELL DONE!", 320, 240, 2)
	End
	
	Method Update:Void()
		If KeyHit(KEY_SPACE) or KeyHit(KEY_ESCAPE) Or MouseHit() Then
			FadeToScreen(gameScreen)
		End
	End
End

#rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end