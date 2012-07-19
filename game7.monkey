#Rem
header:


File Name : Game7Screen
Author    : Patrik "Tibit" Strandell
About     : Desert Race Mayhem, see how long you can keep it up :)
 

#end



Import main

#Rem
summary:Title Screen Class. Test Commit
Used to manage and deal with all Tital Page stuff.
#End
Class Game7Screen Extends Screen

        Field GameState:ERT_GameState
        Field BlinkTimer:Float
        Field BlinkFade:Bool
        
        Method New()
                name = "Game 7 Screen"
                Local gameid:Int = 7
                GameList[gameid - 1] = New miniGame
                GameList[gameid - 1].id = gameid - 1
                GameList[gameid - 1].name = "Desert Race Mayhem"
                GameList[gameid - 1].iconname = "game" + gameid + "_icon"
                GameList[gameid - 1].thumbnail = "game" + gameid + "_thumb"
                GameList[gameid - 1].author = "Patrik Strandell"
                GameList[gameid - 1].authorurl = "tibitinteractive.com"
                GameList[gameid - 1].info = "When you get to be 1st, you get a flat tire.."
        End
                
        #Rem
        summary:Start Screen
        Start the Title Screen.
        #End
        Method Start:Void()
                game.screenFade.Start(50, False)
                GameState = new ERT_GameState
                GameState.LoadGraphics()                        
        End
        
        #Rem
        summary:Render Title Screen
        Renders all the Screen Elements.
        #End
        Method Render:Void()
                Cls
                SetColor(255, 255, 255)
        
                Local rowHeight:Int = 30
                Local row:Int = 0
                TitleFont.DrawText("Oh NO!", 320, 140 + row * rowHeight, 2); row += 2
                TitleFont.DrawText("You have managed to take the 1st position", 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("in a desert race and you just got a flat tire..", 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("For how long can you keep the lead?? ", 320, 140 + row * rowHeight, 2); row += 3
                
                SetAlpha(BlinkTimer * 0.01)
                TitleFont.DrawText("click to start", 320, 140 + row * rowHeight, 2); row += 1
                SetAlpha(1)
        End

        #Rem
        sumary:Update Title Screen
        Will update all screen objects, handles mouse, keys
        and all use input.
        #End
        Method Update:Void()
                Local fadeSpeed:Float = 2
                if BlinkFade = False
                        BlinkTimer += fadeSpeed
                        if BlinkTimer > 98
                                BlinkFade = True
                        End
                Else
                        BlinkTimer -= fadeSpeed
                        if BlinkTimer < 2
                                BlinkFade = false
                        End
                End
                
                                
                if TouchHit()
                        game.nextScreen = GameState
                        game.screenFade.Start(50, true)
                End
                                
                if KeyHit(KEY_ESCAPE) or
                        game.nextScreen = TitleScr
                        game.screenFade.Start(50, true)
                EndIf
                
        End method

        
End

'summary:need input
Class Mine

        Field Position:Vector = new Vector
        
        Method New(startPosition:Vector)
                ' Since we are using vectors it is VERY important 
                ' that we use SET here and not =
                Position.Set(startPosition)
        End
End

'summary:need input
Class OpponentCar
        Field Position:Vector = new Vector
        Field Type:Int
        Field Speed:Float
        Field MaxSpeed:Float
        Field Destroyed:Bool = false
        
        Method New(startX:float, startY:float, speed:Float = 0)
                Position.Set(startX, startY)
                Type = Rnd(1, 5) '<-- Generates a 1 or 2 or 3 or 4
                Speed = speed
                if Speed = 0 Then Speed = Rnd(3, 6)
                MaxSpeed = Speed
        End
        
End
'summary:need input
Class ERT_GameState Extends Screen
        
        Field VictoryGameState:ERT_VictoryGameState = new ERT_VictoryGameState
        Field LossGameState:ERT_LossGameState = new ERT_LossGameState
        Field CarImage:Image[5] 'Array of 5 Images
        
        Field MineImage:Image
        Field PauseImage:Image
        Field CrashImage:Image
        Field CarPosition:Vector = new Vector
        Field MineCooldown:Float = 10
        Field PlayerSpeed:Float
        Field MineFrame:Int
        Field MineFrameTimer:Float
        Field RoadImage:Image
        Field RoadOffset:Float
        Field Distance:Int
        Field Place:Int = 1
        Field PlayerDead:Bool = true
        Field TouchLocation:Vector = new Vector
        
        Field SpawnCooldown:Float = 500
        Field SpawnTimer:Float
        Field Difficulty:Float = 0
        
        Field MineList:List<Mine> = new List<Mine>
        Field OpponentList:List<OpponentCar> = new List<OpponentCar>
        
        ' X Position of the Center of that Lane
        
        Const LANE1A:Int = 147 - 25
        Const LANE2A:Int = 262 - 25
        Const LANE3A:Int = 382 - 25
        Const LANE4A:Int = 498 - 25
        
        Const LANE1B:Int = 147 + 25
        Const LANE2B:Int = 262 + 25
        Const LANE3B:Int = 382 + 25
        Const LANE4B:Int = 498 + 25
        
        Method LoadGraphics:Void()
                CrashImage = LoadImage("graphics/game7/crash.png")
                PauseImage = LoadImage("graphics/game7/pause.png")
                CarImage[1] = LoadImage("graphics/game7/car.png")
                CarImage[2] = LoadImage("graphics/game7/car2.png")
                CarImage[3] = LoadImage("graphics/game7/car3.png")
                CarImage[4] = LoadImage("graphics/game7/car4.png")
                RoadImage = LoadImage("graphics/game7/road.png")
                MineImage = LoadImage("graphics/game7/mine.png", 12, 12, 2)
                'ERT_WorldRecordDistance 'We could Load from file + Save at end of game
                ERT_ExitMenu = New ERT_EndOfGameMenu()
        End
        
        'summary: Initialize Gameplay
        Method Start:Void()
                game.screenFade.Start(1500, False)
                CarPosition.Set(120, 130)
                PlayerDead = False
                SpawnTimer = SpawnCooldown
        End
        
        'summary: Render Game
        Method Render:Void()
                Cls
                'Draw Road
                DrawImage(RoadImage, 0, RoadOffset)
                DrawImage(RoadImage, 0, RoadOffset - RoadImage.Height)
                'Above: I am drawing the background twice, so it will appear as it loops when we move it
                
                For Local mine:Mine = EachIn MineList
                         DrawImage(MineImage, mine.Position.X - MineImage.Height / 2, mine.Position.Y - MineImage.Height / 2, MineFrame)
                Next
                
                
                DrawImage(CarImage[1], CarPosition.X - CarImage[1].Width / 2, CarPosition.Y - CarImage[1].Height / 2)
                
                For Local car:OpponentCar = EachIn OpponentList
                        DrawImage(CarImage[car.Type], car.Position.X - CarImage[car.Type].Height / 2, car.Position.Y - CarImage[car.Type].Height / 2)
                        if car.Destroyed
                                DrawImage(CrashImage, car.Position.X - CrashImage.Width / 2, car.Position.Y - CrashImage.Height / 2)
                        End
                Next
                
                DrawImage(PauseImage, DEVICE_WIDTH - 50, DEVICE_HEIGHT - 50)
                
                TitleFont.DrawText("Distance: " + Distance, 50, 30, 1)
                TitleFont.DrawText("Place: " + Place, DeviceWidth(), 30, 3)
        End

        'summary: Game Logic
        Method Update:Void()
                Distance += 1 'Int!
                MineCooldown += 1
                MineFrameTimer += 1
                if MineFrameTimer > 10
                        if MineFrame = 0 then MineFrame = 1 Else MineFrame = 0 'ToggleFrame
                        MineFrameTimer = 0
                End
                
                if RoadOffset > RoadImage.Height Then RoadOffset = 0
                        
                'Slow down when outside Road 316 331
                If CarPosition.X < 92 or CarPosition.X > RoadImage.Width - 99 or (CarPosition.X > 316 And CarPosition.X < 331)
                        RoadOffset += PlayerSpeed * 0.5
                Else
                        RoadOffset += PlayerSpeed
                End
                
                'Input
                'TiltLeft or Touch Left Side of Screen
                If TouchX() < DeviceWidth() / 2 OR KeyDown(KEY_LEFT) Or AccelZ() = - 1
                        CarPosition.X -= 3
                        'PlayerSpeed -= 0.5
                End
                
                'TiltRight or Touch Right Side of Screen
                If TouchX() > DeviceWidth() / 2 OR KeyDown(KEY_RIGHT) Or AccelZ() = 1
                        CarPosition.X += 3
                        'PlayerSpeed -= 0.5
                End
                
                TouchLocation.Set(TouchX(), TouchY())
                
                ' Touch Car
                if TouchLocation.DistanceTo(CarPosition) < 25 OR KeyDown(KEY_SPACE)
                        'Cooldown
                        if MineCooldown > 300
                                MineList.AddLast(New Mine(CarPosition))
                                MineCooldown = 0
                        End
                End
                
                SpawnTimer += 1
                If SpawnTimer >= SpawnCooldown
                        SpawnTimer = 0
                                                
                        'Lower player speed over time!
                        if Distance > 6000
                                SpawnCooldown = 100
                                PlayerSpeed = 3
                                Difficulty = 7
                        Else if Distance > 5000
                                PlayerSpeed = 3.5
                                SpawnCooldown = 150
                                Difficulty = 6
                        Else if Distance > 4000
                                PlayerSpeed = 4
                                SpawnCooldown = 150
                                Difficulty = 5
                        Else if Distance > 3000
                                PlayerSpeed = 4.5
                                SpawnCooldown = 150
                                Difficulty = 4
                        Else if Distance > 2000
                                PlayerSpeed = 5
                                SpawnCooldown = 450
                                Difficulty = 3
                        Else if Distance > 1000
                                PlayerSpeed = 5.5
                                SpawnCooldown = 50
                                Difficulty = 2
                        Else If Distance > 200
                                PlayerSpeed = 6
                                SpawnCooldown = 200
                                Difficulty = 1
                        Else If Distance > 0
                                PlayerSpeed = 8
                                SpawnCooldown = 200
                                Difficulty = 0
                        End
                        
                        
                        Local lane:Int = Rnd(1, 9)
                        Select lane
                                Case 1
                                        Spawn(LANE1A, Rnd(1, Difficulty))
                                Case 2
                                        Spawn(LANE1B, Rnd(1, Difficulty))
                                Case 3
                                        Spawn(LANE2A, Rnd(1, Difficulty))
                                Case 4
                                        Spawn(LANE2B, Rnd(1, Difficulty))
                                Case 5
                                        Spawn(LANE3A, Rnd(1, Difficulty))
                                Case 6
                                        Spawn(LANE3B, Rnd(1, Difficulty))
                                Case 7
                                        Spawn(LANE4A, Rnd(1, Difficulty))
                                Case 8
                                        Spawn(LANE4B, Rnd(1, Difficulty))
                        End
                End
                
                'Used these to Test the gameplay
                #REM
                If KeyHit(KEY_1)
                        OpponentList.AddFirst(New OpponentCar(LANE1A, RoadImage.Height + 50, PlayerSpeed + 1))
                        OpponentList.AddFirst(New OpponentCar(LANE1B, RoadImage.Height + 50, PlayerSpeed + 1))
                End
                If KeyHit(KEY_2)
                        OpponentList.AddFirst(New OpponentCar(LANE2A, RoadImage.Height + 50, PlayerSpeed + 2))
                        OpponentList.AddFirst(New OpponentCar(LANE2B, RoadImage.Height + 50, PlayerSpeed + 2))
                End
                If KeyHit(KEY_3)
                        OpponentList.AddFirst(New OpponentCar(LANE3A, RoadImage.Height + 50, PlayerSpeed + 3))
                        OpponentList.AddFirst(New OpponentCar(LANE3B, RoadImage.Height + 50, PlayerSpeed + 3))
                End
                If KeyHit(KEY_4)
                        OpponentList.AddFirst(New OpponentCar(LANE4A, RoadImage.Height + 50, PlayerSpeed + 4))
                        OpponentList.AddFirst(New OpponentCar(LANE4B, RoadImage.Height + 50, PlayerSpeed + 4))
                End
                #END
                
                
                For Local mine:Mine = EachIn MineList
                        mine.Position.Y += PlayerSpeed
                        If mine.Position.Y > RoadImage.Height + 50
                                MineList.Remove(mine)
                        End
                        For Local opponent:OpponentCar = EachIn OpponentList
                                if mine.Position.DistanceTo(opponent.Position) < 15
                                        MineList.Remove(mine)
                                        opponent.Speed = 0
                                        opponent.Destroyed = True
                                End
                        Next
                Next
                
                For Local car:OpponentCar = EachIn OpponentList
                        car.Position.Y -= (car.Speed - PlayerSpeed)
                        If car.Position.Y > RoadImage.Height + 80
                                OpponentList.Remove(car)
                                Continue
                        End
                        If car.Position.Y < - 80
                                Place += 1
                                OpponentList.Remove(car)
                                Continue
                        End
                        For Local car2:OpponentCar = EachIn OpponentList
                                If car.Position.DistanceTo(car2.Position.X, car2.Position.Y + 55) < 25
                                        car.Speed = car2.Speed * 0.7
                                Else
                                        If car.Speed < car.MaxSpeed
                                                car.Speed += 0.005
                                        End
                                End
                        Next
                        If car.Position.DistanceTo(CarPosition.X, CarPosition.Y + 75) < 25
                                car.Speed = PlayerSpeed * 0.8
                        End
                        'Crash?
                        If car.Position.DistanceTo(CarPosition.X, CarPosition.Y) < 25
                                car.Speed = 0
                                car.Destroyed = True
                                PlayerSpeed = 0
                                ' Explosion!
                                PlayerDead = True
                        End
                Next
                
                if PlayerDead = True ' We stop when dead...  = We move towards bottom of screen
                         CarPosition.Y += PlayerSpeed
                End
                
                if Place > 25 Or PlayerDead = true
                        'Using global to send score to the Victory/loss state
                        ' This is not the best code, but then this is also a simple game :)
                        ERT_DistanceTraveledThisGame = Distance
                        
                        
                        ' Check Score - if best score then goto victory screen instead
                        If Distance > ERT_WorldRecordDistance
                                ERT_WorldRecordDistance = Distance ' Save new record!
                                game.nextScreen = VictoryGameState
                                game.screenFade.Start(1500, true)
                        Else
                                game.nextScreen = LossGameState
                                game.screenFade.Start(1500, true)
                        End
                End
                
                'Go Back to Lobby 
                if KeyHit(KEY_ESCAPE) or (TouchX() > DEVICE_WIDTH - 50 And TouchY() > DEVICE_HEIGHT - 50)
                        game.nextScreen = LossGameState
                        game.screenFade.Start(50, true)
                End
                
        End method
        
        'summary: This metod spawns a car at a X coordinate and with a certain speed faster than the player's current speed. Use the LANE constants to spawn on lanes!
        Method Spawn(xLane:Float, speedPlus:Float)
                OpponentList.AddFirst(New OpponentCar(xLane, RoadImage.Height + 50, PlayerSpeed + speedPlus))
        End

End
Global ERT_DistanceTraveledThisGame:Int
Global ERT_WorldRecordDistance:Int
Global ERT_ExitMenu:ERT_EndOfGameMenu
'summary:need input
Class ERT_VictoryGameState Extends Screen
        
        Method Start:Void()
        End
        Method Update:Void()
                ERT_ExitMenu.Update
        End
        Method Render:Void()
                Cls
                SetColor(255, 255, 255)
        
                Local rowHeight:Int = 30
                Local row:Int = 0
                TitleFont.DrawText("Congratulations!", 320, 140 + row * rowHeight, 2); row += 2
                TitleFont.DrawText("No one in the world has managed to keep themselves", 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("in a desert race with a flat tire such a long distance!", 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("Amazing! Now, can you do even better? ", 320, 140 + row * rowHeight, 2); row += 3
                TitleFont.DrawText("You traveled: " + ERT_DistanceTraveledThisGame, 320, 140 + row * rowHeight, 2); row += 1
                ERT_ExitMenu.Render
        End
End
'summary:need input
Class ERT_LossGameState Extends Screen
        Method Start:Void()
                
        End
        Method Update:Void()
                ERT_ExitMenu.Update
        End
        Method Render:Void()
                Cls
                Local rowHeight:Int = 30
                Local row:Int = 0
                TitleFont.DrawText("You are LAST!", 320, 140 + row * rowHeight, 2); row += 2
                TitleFont.DrawText("You did not break the world record this time..", 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("Nothing else counts.. really.. deal with it..", 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("World Record: " + ERT_WorldRecordDistance, 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("You traveled: " + ERT_DistanceTraveledThisGame, 320, 140 + row * rowHeight, 2); row += 1
                TitleFont.DrawText("Remaining Distance: " + (ERT_WorldRecordDistance - ERT_DistanceTraveledThisGame), 320, 140 + row * rowHeight, 2); row += 2
                TitleFont.DrawText("Maybe next time you have better luck!", 320, 140 + row * rowHeight, 2); row += 1
                ERT_ExitMenu.Render
        End
End

'summary:need input
Class ERT_EndOfGameMenu
        
        Field Restart:= new Vector(30, 430)
        Field Back:= new Vector(460, 430)
        Field BlinkTimer:Float
        Field BlinkFade:Bool
                        
        Method New()
                
        End
        
        Method Render:Void()
                SetAlpha(BlinkTimer * 0.01)
                TitleFont.DrawText("PLAY AGAIN", Restart.X, Restart.Y, 1);
                TitleFont.DrawText("BACK TO ARCADE", Back.X, Back.Y, 1);
                SetAlpha(1)
        End
        
        Method Update:Void()

                Local fadeSpeed:Float = 2
                if BlinkFade = False
                        BlinkTimer += fadeSpeed
                        if BlinkTimer > 98
                                BlinkFade = True
                        End
                Else
                        BlinkTimer -= fadeSpeed
                        if BlinkTimer < 2
                                BlinkFade = false
                        End
                End     
        
                If Restart.DistanceTo(TouchX(), TouchY()) < 80
                        game.nextScreen = Game7Scr
                        game.screenFade.Start(500, true)
                End
                
                If Back.DistanceTo(TouchX(), TouchY()) < 80
                        game.nextScreen = TitleScr
                        game.screenFade.Start(500, true)
                End
        End
End

#Rem
footer:

Monkey Coder 
 

#end

' INCLUDE:

' A vector class with a lot of handy functionality for game-programming! 

' In simplicy a vector is an Arrow. It has an length
' and a direction. You can use these properties to 
' make the vector model a Position, a Velocity, a 
' Line, a Distance and many other things that can be
' measured using a length and a direction or anything
' that uses two float pair-values!

' Wikipedia: A vector is what is needed to "carry" the
' point A to the point B; the Latin word vector means "one who carries"
'summary:need input
Class Vector
Public
        Field X:Float
        Field Y:Float 
        
        Method New(x:Float=0,y:Float=0)
                X = x
                Y = y
        End
        '           S E T
        '---------------------------------------------- 
        Method Set:Vector( vector:Vector ) 
                X = vector.X 
                Y = vector.Y 
                Return Self     
        End
        Method Set:Vector(x:Float,y:Float ) 
                X = x
                Y = y
                Return Self     
        End
                
        '               A D D
        '---------------------------------------------- 
        Method Add:Vector( vector:Vector ) 
                X += vector.X 
                Y += vector.Y 
                Return Self     
        End
        Method Add:Vector( x:Float,y:Float  ) 
                X += x
                Y += y 
                Return Self     
        End     
        
        '               S U B T R A C T
        '---------------------------------------------- 
        Method Subtract:Vector( vector:Vector ) 
                X = X - vector.X 
                Y = Y - vector.Y 
                Return Self     
        End
        
        '                D O T  P R O D U C T 
        '---------------------------------------------------
        ' Dot Product which is X*X2 + Y*Y2
        '
        '---------------------------------------------------
        Method Dot:Float( Vector:Vector )
                Return ( X * Vector.X + Y * Vector.Y)
        End
        
                '               M U L T I P L Y   V E C T O R 
        '----------------------------------------------
        Method Multiply:Vector( Value:Float )
                X*=Value
                Y*=Value
                Return Self     
        End
        Method Multiply:Vector( vector:Vector )
                X*=vector.X 
                Y*=vector.Y 
                Return Self     
        End             
        ' M I R R O R
        '----------------------------------------------------------
        ' if the mirrorImage vector is a unit-vector this will 
        ' make this vector flip 180 degrees around it
        ' So that this vector now points in the exact opppisite 
        ' direction To the mirrorImage vector
        ' Returns Self, which will be opposite to mirrorImage.
        Method Mirror:Vector( mirrorImage:Vector )
                Local Dotprod# = -X * mirrorImage.X - Y * mirrorImage.Y
                X=X+2 * mirrorImage.X * dotprod
                Y=Y+2 * mirrorImage.Y * dotprod
                Return Self
        End
        
        ' Set the vector to a direction and a length x,y
        ' returns Self, which is now pointin the directio
        ' provided, with the length provided
        Method MakeField:Vector( direction:Float, length:Float )        
                X = Cos( -direction )*length
                Y = Sin( -direction )*length
                Return Self
        End
        
        '----------------------------------------------
        ' Create a copy --> depending on situation you might
        ' want to use the VectorPool to do this instead for
        ' when extrenme performance is required
        '-----------------------------------------------
        Method Copy:Vector() Property
                Local vector:Vector = New Vector
                vector.X = X
                vector.Y = Y
                Return vector   
        End
        
                '        C R E A T E   L E F T   N O R M A L
        '---------------------------------------------- 
        ' Make this an Perpendicular Vector
        ' As if you would rotate it 90 degrees Counter Clockwise
        ' return ( Y, -X )
        Method LeftNormal:Vector( )
                Local tempX:Float = Y
                Y = -X
                X = tempX
                Return Self
        End

                
        '        C R E A T E   R I G H T   N O R M A L
        '---------------------------------------------- 
        ' Make this a Perpendicular Vector
        ' Same as rotating it 90 degrees ClockWise
        ' return ( -Y, X )
        Method RightNormal:Vector( )
                Local tempY:Float = Y
                Y = X
                X = -tempY
                Return Self
        End
        
        '               N O R M A L I Z E 
        '---------------------------------------------- 
        ' Purpose: Sets Vector length To ONE but keeps it's direction           
        ' Returns Self as a UnitVector
        Method Normalize:Vector()
                Local Length:Float = Self.Length()
                If Length = 0 
                        Return Self ' Don't divide by zero, 
                        'we do not normalize a zero-vector 
                        'since this vector's direction is in
                        ' mathematical terms all directions!
                Endif
                Set( X / Length, Y / Length ) 'Make length = 1
                Return Self
        End
        
        '   G E T   L E N G T H
        '-----------------------------
        ' Get current Length of vector, uses a single sqr operation
        Method Length:Float() Property
                Return Sqrt( X*X + Y*Y )'
        End
        
        '       S E T   L E N G T H
        '-------------------------------------
        Method Length:Void( length:Float ) Property
                'If we want to set vector to zero 
                If length = 0 
                        X=0 
                        Y=0
                        Return
                Endif

                If X = 0 And Y = 0
                        X = length
                Endif
                
                Normalize()
                Multiply( length )                              
        End
        
        Method ReduceLength:Vector( amount:Float )
                Local currentAngle:Float = Direction
                Local currentLength:Float = Length              
                Local newLength:Float = currentLength - amount
                If newLength > 0
                        MakeField( currentAngle, currentLength - amount  )
                Else 
                        Set 0,0
                Endif
                Return Self     
        End
        
        Method IncreaseLength:Vector( amount:Float )
                Return ReduceLength( -amount )
        End     
        ' G E T  D I R E C T I O N
        '----------------------------------------------------
        ' Calculates the current direction in degrees
        ' in the 0 To < 360 range
        Method Direction:Float() Property
                Local angle:Float = ATan2(-Y , X)
                'If angle < 0 Then angle =+ 360
                Return angle
        End
        
        ' S E T  D I R E C T I O N
        '----------------------------------------------
        '
        ' Set the angle of this vector without changing the length,
        ' has no effect if vector length is 0
        ' uses a single sqr operation
        Method Direction:Void( direction:Float ) Property
                MakeField( direction, Length ) 
        End Method
        
        ' D I S T A N C E
        '---------------------------------------------- 
        ' The Distance between the two points
        ' This is NOT related to the vectors Length#    
        Method DistanceTo:Float(Other:Vector) 
                Return DistanceTo(Other.X, Other.Y)
        End
        Method DistanceTo:Float(x:Float, y:Float) 
                Local dx:Float = x - X 
                Local dy:Float = y - Y 
                Return Sqrt( dx*dx + dy*dy )    
        End
        
        ' For extreme performance situations only
        Method DistanceToSquared:Float(x:Float, y:Float) 
                Local dx:Float = x - X 
                Local dy:Float = y - Y 
                Return (dx*dx + dy*dy )
        End
        Method DistanceToSquared:Float(Other:Vector)
                Return DistanceToSquared(Other.X, Other.Y)
        End
                        
'               G E T  A N G L E   B E T W E E N
        '----------------------------------------------
        ' If you have two vectors that start at the same position
        ' the angle-distance between two vectors Result is from 0 
        ' to 180 degrees, because two vectors can not be more than 180 
        ' degrees apart, check AngleClockwise & AngleAntiClockwise
        ' to get a 0-360 result instead
        ' even tough it is counted as they are on the same position,
        ' that is not a requirement at all for this to be correct
        Method AngleTo:Float( target:Vector )   
                Local dot:Float = Self.Dot( target )
                
                Local combinedLength:Float = Self.Length()*target.Length()
                If combinedLength = 0 Then Return 0
                
                Local quaski:Float = dot/combinedLength
                
                Local angle:Float = ACos( quaski )
                Return angle
        End
        
        
        ' If you have two vectors so they both start at the same position
        ' returns the angle from this vector to target vector (in degrees)
        ' if you where to go Clockwise to it, result is 0 to 360        
        Method AngleToClockwise:Float( target:Vector )
                Local angle:Float = ATan2(-Y , X)  - ATan2(-target.Y , target.X)
                If angle < 0 Then angle += 360
                If angle >= 360 Then angle -= 360
                Return angle            
        End
        
        ' If you have two vectors so they both start at the same position
        ' returns the angle fromt this vector to target vector (in degrees)
        ' if you where to go AntiClockwise to it, result is 0 to 360    
        Method AngleToAntiClockwise:Float( target:Vector )
                Local angle:Float =  AngleToClockwise(target)-360
                Return -angle
        End     
        
		#rem
		summary:V E C T O R    B E T W E E N
	    ----------------------------------------------
         Change the vector into a vector from Position1 to Position2
         Return Self, as a vector that goes from first 
         parameter's position to the second 
		#END
        Method MakeBetween:Vector( PositionFrom:Vector , PositionToo:Vector)
                If PositionFrom = Null Or PositionToo = Null Then Return Self
                X = ( PositionToo.X - PositionFrom.X )  
                Y = ( PositionToo.Y - PositionFrom.Y )
                Return Self             
        End
        
        '----------------------------------------------
        'Check to see if Self.X = 0 and Self.Y = 0
        Method IsZero:Bool()
                If X = 0.0 And Y = 0.0 Then Return True
                Return False
        End
		
		'summary:need input
        Method Lerp:void( toV:Vector, speed:Float)
                If DistanceTo(toV) < speed Then
                        Set(toV)
                        Return
                End
                Local fromVX:Float = X
                Local fromVY:Float = Y
                self.Set(MakeBetween(self, toV))
                If IsZero() = False Then
                        Normalize()
                        Multiply(speed)
                        X += fromVX
                        Y += fromVY
                Else
                        Set(toV)
                End
        End
		'summary:need input
        Method RotateTowards:Void(other:Vector, angleAmount:Float)
                Local angleClockwise:Float = AngleToClockwise(other)
                Local angleAntiClockwise:Float = AngleToAntiClockwise(other)
                If angleClockwise < angleAntiClockwise Then 
                        If Abs(angleAmount) > AngleTo(other) Then
                                Direction -= AngleTo(other)
                        Else If Abs(angleAmount) < AngleTo(other) Then
                                Direction -= angleAmount
                        End
                Else if angleClockwise > angleAntiClockwise Then
                        If Abs(angleAmount) > AngleTo(other) Then
                                Direction += AngleTo(other)
                        Else If Abs(angleAmount) < AngleTo(other) Then
                                Direction += angleAmount
                        End
                End             
                
        End
End 