#Rem
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
Global debugOn:Bool = true

#Rem
summary:Title Screen Class.
Used to manage and deal with all Tital Page stuff.
#End
Class Game8Screen Extends Screen
	
	Method New()
		name = "Game 8 Screen"
		Local gameid:Int = 8
		GameList[gameid - 1] = New miniGame
		GameList[gameid - 1].id = gameid - 1
		GameList[gameid - 1].name = "Steves"
		GameList[gameid - 1].iconname = "game" + gameid + "_icon"
		GameList[gameid - 1].thumbnail = "game" + gameid + "_thumb"
		GameList[gameid - 1].author = "Steven Revill"
		GameList[gameid - 1].authorurl = "therevillsgames.com"
		GameList[gameid - 1].info = "????"
	End
	
	#Rem
	summary:Start Screen
	Start the Title Screen.
	#End
	Method Start:Void()
		gameScreen = New GameScreen
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
		If KeyHit(KEY_SPACE) Or MouseHit() Then
			FadeToScreen(gameScreen)
		End
		If KeyHit(KEY_ESCAPE)
			FadeToScreen(TitleScr)
		End
	End
End

Class Enemy extends Sprite
	Global list:ArrayList<Enemy> = New ArrayList<Enemy>
	Field currentPath:Int = 0
	Field damage:Float
	Field range:Float
	Field fireRate:Int
	Field health:Float
	Field route:Int[]
	
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
		Self.fireRate = 20
		Self.damage = 1
		Self.range = 70
		Self.health = 100
		Self.speed = 1
		SetPath()
		list.Add(Self)
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
			e.Draw()
			DrawText e.health, e.x, e.y
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
			local angle:Float = CalcAngle(x, y, route[currentPath] * gameScreen.TILE_SIZE, route[currentPath + 1] * gameScreen.TILE_SIZE)

			dx = Cos(angle) * speed
			dy = Sin(angle) * speed
			
			Self.Move()
			
			If angle > 22.5 And angle < 67.5
			' down right
				frame = 0
			ElseIf angle > 67.5 And angle < 112.5
			' down
				frame = 1
			ElseIf angle > 112.5 And angle < 157.5
			' down left
				frame = 2
			ElseIf angle > 157.5 And angle < 202.5
			' left
				frame = 5
			ElseIf angle > 202.5 And angle < 247.5
			' up left
				frame = 8
			ElseIf angle > 247.5 And angle < 292.5
			' up
				frame = 7
			ElseIf angle > 292.5 And angle < 337.5
			' up right
				frame = 6
			Else
			' right
				frame = 3
			End
	
			If PointInSpot(x, y, route[currentPath] * gameScreen.TILE_SIZE, route[currentPath + 1] * gameScreen.TILE_SIZE, 3)
				currentPath -= 2
				if currentPath < 0
					Kill()
				End
			End
		End
		If Self.health <= 0
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

' Towers are NOT midhandled!
Class Tower extends Sprite
	Global list:ArrayList<Tower> = New ArrayList<Tower>
	Field damage:Float
	Field range:Float
	Field lastFire:Int
	Field fireRate:Int
	Field health:Float
	Field target:Enemy
	Field targetDist:Float
	Field firePosX:Int, firePosY:Int
	Field drawLine:Bool
	Field dx1:Int, dy1:Int, dx2:Int, dy2:Int
	
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
		Self.fireRate = 20
		Self.damage = 1
		Self.range = 70
		Self.health = 100
		Self.firePosX = x + img.w2
		Self.firePosY = y + img.h2
		list.Add(Self)
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
			SetAlpha 0.2
			DrawCircle(t.firePosX, t.firePosY, t.range)
			SetAlpha 1
			
			t.Draw()
			if t.drawLine
				DrawLine t.dx1, t.dy1, t.dx2, t.dy2
			End
		Next
	End
	
	Function UpdateAll:Void()
		If Not list Return
		Local t:Tower
		For Local i:Int = 0 Until list.Size
			t = list.Get(i)
			t.Update()
		Next
	End
	
	Method Update:Void()
		lastFire += 1
		Local e:Enemy
		For Local i:Int = 0 Until Enemy.list.Size
			e = Enemy.list.Get(i)
			Local dist:Float = CalcDistance(self.firePosX, self.firePosY, e.x, e.y)
			if Self.target
				if dist < Self.targetDist
					Self.targetDist = dist
					Self.target = e
				End
			Else
				if dist < Self.range
					Self.targetDist = dist
					Self.target = e
				End
			End
		Next
		if Self.target
			Self.targetDist = CalcDistance(self.firePosX, self.firePosY, self.target.x, self.target.y)
			Local angle:Float = CalcAngle(self.firePosX, self.firePosY, self.target.x, self.target.y)
			If lastFire > fireRate
				lastFire = 0
				Self.drawLine = True
				dx1 = Self.firePosX
				dy1 = Self.firePosY
				dx2 = Self.target.x
				dy2 = Self.target.y
				Self.target.health -= Self.damage
				If Self.target.health <= 0
					Self.target = Null
				End
			End
			if Self.targetDist > Self.range
				Self.target = Null
			End
		End
	End
End

Class GameScreen extends Screen
	Const TILE_SIZE:Int = 20
	Field tilemap:MyTileMap
	Field x:Float, y:Float
	Field grid:Float[]
	Field enemyImage:GameImage
	Field turretBaseImage:GameImage
	
	Field delay:Float, maxDelay:Int = 100
	
	Method New()
		name = "Game 8's GameScreen"
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
		For Local i:Int = 0 until layer.mapData.tiles.Length
			grid[i] = layer.mapData.tiles[i]
		Next
		
		' set the map for the pathfinder using diagonals(2) and randomise it a tad(1)
		PathFinder.SetMap(grid, tilemap.width, tilemap.height, 2, 1)
	End
	
	Method LoadImages:Void()
		Local tmpImage:Image
		game.images.LoadAnim("game8/tank7.png", 20, 20, 9, tmpImage)
		game.images.LoadAnim("game8/turretBase.png", 40, 28, 2, tmpImage, False)
		
		turretBaseImage = game.images.Find("turretBase")
		enemyImage = game.images.Find("tank7")
	End
	
	Method Start:Void()
		delay = maxDelay
		LoadImages()
		LoadMap()
	End
	
	Method Render:Void()
		Cls
		tilemap.RenderMap(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		Tower.DrawAll()
		Enemy.DrawAll()
		turretBaseImage.Draw( (game.mouseX / TILE_SIZE) * TILE_SIZE, (game.mouseY / TILE_SIZE) * TILE_SIZE)
		DrawText Tower.list.Size, 10, 10
		if debugOn
			'Draw grid lines
			SetColor 255, 255, 255
			SetAlpha 0.4
			For local fx:Int = 0 To tilemap.width
				DrawLine fx * TILE_SIZE, 0, fx * TILE_SIZE, tilemap.width * TILE_SIZE
				DrawLine 0, fx * TILE_SIZE, tilemap.width * TILE_SIZE, fx * TILE_SIZE
			Next
			SetAlpha 1
		End
	End

	Method Update:Void()
		if delay > 0
			delay -= 1 * dt.delta
		Else
			delay = maxDelay
			Local startPos:TileMapObject = tilemap.FindObjectByName("Start")
			Local endPos:TileMapObject = tilemap.FindObjectByName("End")
			New Enemy(enemyImage, startPos.x, startPos.y)
		End
		Tower.UpdateAll()
		Enemy.UpdateAll()
		Controls()
	End
	
	Method Controls:Void()
		if game.mouseHit
			if gameScreen.tilemap.CollisionTile(game.mouseX + TILE_SIZE, game.mouseY, gameScreen.tilemap.BUILD_LAYER) = 0 And
			gameScreen.tilemap.CollisionTile(game.mouseX, game.mouseY, gameScreen.tilemap.BUILD_LAYER) = 0 Then
				New Tower(turretBaseImage, (game.mouseX / TILE_SIZE) * TILE_SIZE, (game.mouseY / TILE_SIZE) * TILE_SIZE)
				gameScreen.tilemap.SetTile(game.mouseX, game.mouseY, 1, gameScreen.tilemap.BUILD_LAYER)
				gameScreen.tilemap.SetTile( (game.mouseX + TILE_SIZE), game.mouseY, 1, gameScreen.tilemap.BUILD_LAYER)
			End
		End
	
		If KeyHit(KEY_ESCAPE)
			FadeToScreen(Game8Scr)
		End
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

#Rem
footer:
[quote]
[a Http://www.monkeycoder.co.nz]Monkey Coder[/a] 
[/quote]
#end