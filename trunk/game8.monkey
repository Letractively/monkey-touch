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

Class GameScreen extends Screen
	Field tilemap:MyTileMap
	Field x:Float, y:Float
	Field TILE_SIZE:Int = 20
	Field grid:Float[]
	Field currentPath:Int = 0
	
	Method New()
		name = "Game 8's GameScreen"
	End
	
	Method Start:Void()
		Local reader:MyTiledTileMapReader = New MyTiledTileMapReader
		Local tm:TileMap = reader.LoadMap("graphics/game8/level1.tmx")
		tilemap = MyTileMap(tm)
		Local startPos:TileMapObject = tilemap.FindObjectByName("Start")
		Local endPos:TileMapObject = tilemap.FindObjectByName("End")

		Local layer:TileMapTileLayer = tilemap.FindLayerByName(tilemap.COLLISION_LAYER)
		grid = New Float[tilemap.width * tilemap.height]
		
		For Local i:Int = 0 until layer.mapData.tiles.Length
			grid[i] = layer.mapData.tiles[i]
		Next
		
		PathFinder.SetMap(grid, tilemap.width, tilemap.height, 2, 1)
		SetPath()
	End
	
	Method SetPath:Void()
		Local startPos:TileMapObject = tilemap.FindObjectByName("Start")
		Local endPos:TileMapObject = tilemap.FindObjectByName("End")
		PathFinder.FindPath(startPos.x / TILE_SIZE, startPos.y / TILE_SIZE, endPos.x / TILE_SIZE, endPos.y / TILE_SIZE)
		currentPath = (PathFinder.paths - 1) * 2
		x = startPos.x
		y = startPos.y
	End
	
	Method Render:Void()
		Cls
		tilemap.RenderMap(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
		SetColor 255, 0, 255
		DrawOval x, y, 20, 20
		'Draw path
		SetColor 0, 255, 0
		For local i:Int = 0 Until PathFinder.paths * 2 Step 2
			DrawRect PathFinder.route[i] * TILE_SIZE + TILE_SIZE/2, PathFinder.route[i + 1] * TILE_SIZE + TILE_SIZE / 2, 5, 5
		Next
		SetColor 255, 255, 255
	End

	Method Update:Void()
		If currentPath >= 0 And PathFinder.route.Length() > 0
			If x < PathFinder.route[currentPath] * TILE_SIZE
				x += 1
			End
			If x > PathFinder.route[currentPath] * TILE_SIZE
				x -= 1
			End
			If y < PathFinder.route[currentPath + 1] * TILE_SIZE
				y += 1
			End
			If y > PathFinder.route[currentPath + 1] * TILE_SIZE
				y -= 1
			End
			If x = PathFinder.route[currentPath] * TILE_SIZE And
				y = PathFinder.route[currentPath + 1] * TILE_SIZE
				currentPath -= 2
				if currentPath < 0
					SetPath()
				End
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