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
		if KeyHit(KEY_ESCAPE)
			FadeToScreen(TitleScr)
		EndIf
		
	End method

	
End

Class Enemy extends Sprite
	Global list:ArrayList<Enemy> = New ArrayList<Enemy>
	Field currentPath:Int = 0
	Field damage:Float
	Field range:Float
	Field fireRate:Int
	Field health:Float
	
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
		Self.fireRate = 20
		Self.damage = 1
		Self.range = 70
		Self.health = 100
		Self.speed = 2
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
			If x < PathFinder.route[currentPath] * gameScreen.TILE_SIZE
				x += Self.speed * dt.delta
				frame = 3
			End
			If x > PathFinder.route[currentPath] * gameScreen.TILE_SIZE
				x -= Self.speed * dt.delta
				frame = 5
			End
			If y < PathFinder.route[currentPath + 1] * gameScreen.TILE_SIZE
				y += Self.speed * dt.delta
				frame = 1
			End
			If y > PathFinder.route[currentPath + 1] * gameScreen.TILE_SIZE
				y -= Self.speed * dt.delta
				frame = 7
			End
			If PointInSpot(x, y, PathFinder.route[currentPath] * gameScreen.TILE_SIZE, PathFinder.route[currentPath + 1] * gameScreen.TILE_SIZE, 3)
				currentPath -= 2
				if currentPath < 0
					Kill()
				End
			End
		End	
	End
	
	Method SetPath:Void()
		Local startPos:TileMapObject = gameScreen.tilemap.FindObjectByName("Start")
		Local endPos:TileMapObject = gameScreen.tilemap.FindObjectByName("End")
		PathFinder.FindPath(startPos.x / gameScreen.TILE_SIZE, startPos.y / gameScreen.TILE_SIZE, endPos.x / gameScreen.TILE_SIZE, endPos.y / gameScreen.TILE_SIZE)
		currentPath = (PathFinder.paths - 1) * 2
		x = startPos.x
		y = startPos.y
	End
End

Class Tower extends Sprite
	Global list:ArrayList<Tower> = New ArrayList<Tower>
	Field damage:Float
	Field range:Float
	Field fireRate:Int
	Field health:Float
	Field target:Enemy
		
	Method New(img:GameImage, x:Float, y:Float)
		Super.New(img, x, y)
		Self.fireRate = 20
		Self.damage = 1
		Self.range = 70
		Self.health = 100
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
			t.Draw()
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
		
	End
End

Class GameScreen extends Screen
	Const TILE_SIZE:Int = 20
	Field tilemap:MyTileMap
	Field x:Float, y:Float
	Field grid:Float[]
	Field enemyImage:GameImage
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

		Enemy.DrawAll()
		DrawText delay, 10, 10
		'Draw path
	'	SetColor 0, 255, 0
	'	For local i:Int = 0 Until PathFinder.paths * 2 Step 2
'			DrawRect PathFinder.route[i] * TILE_SIZE + TILE_SIZE/2, PathFinder.route[i + 1] * TILE_SIZE + TILE_SIZE / 2, 5, 5
	'	Next
'		SetColor 255, 255, 255
		
		DrawImage enemyImage.image, game.mouseX, game.mouseY, 0
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
		Enemy.UpdateAll()
		Controls()
	End
	
	Method Controls:Void()
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