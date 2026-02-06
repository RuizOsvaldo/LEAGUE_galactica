# Build a Space Shooter Game

## Introduction @unplugged

Welcome to The LEAGUE's Space Shooter tutorial! You will create an exciting space shooter game where you control a spaceship, dodge enemies, shoot projectiles, and defeat a boss to win. Get ready for an epic space battle!

## Step 1 - Set the background

First, let's create a cool space background! Drag the ``||scene:set background image||`` block into the ``||loops:on start||`` block and click on the grey box to open the image editor. Create a starry space scene with planets and stars, or use the example image.
```blocks
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444fffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444ffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444444fffffffffffffffffffffffffffffffffffffffff
    `)
```

## Step 2 - Create your spaceship

Now let's create your spaceship! Drag ``||sprites:set mySprite to sprite of kind Player||`` into ``||loops:on start||``. Click on the grey box to open the image editor and design your spaceship. Make it look like a rocket or use the example design shown.
```blocks
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444fffffffffffffffffffffffffffffffffffffffffffffff
    `)
let mySprite = sprites.create(img`
    ................1...............
    ...............111..............
    ..............11111.............
    .............111111d............
    .............111111d............
    ............111111ddd...........
    ............ccccccccc...........
    ............bbbbbbbbc...........
    ............bbbbbbbbb...........
    ............bbbbbbbbb...........
    ...........bbbbbbbbbbc..........
    ...........bbb99999bbc..........
    ..........1bbb99999bbcd.........
    ..........1bbb99996bccd.........
    .........11bbb99666bccdd........
    ........111bbbbbbbbbccddd.......
    ........111bbbbbbbbcccddd.......
    ........1111bbbbbbccc11dd.......
    ........11....25552....1d.......
    ........11....44544....1d.......
    ........1....2245422....1.......
    .............2445442............
    ............224555422...........
    ............244555442...........
    ............245555542...........
    ............245555442...........
    ............244555422...........
    ............224454422...........
    .............2244422............
    ..............22422.............
    ...............222..............
    ................2...............
    `, SpriteKind.Player)
```

## Step 3 - Keep spaceship on screen

We want to make sure your spaceship stays on the screen and doesn't fly off! Add ``||sprites:set mySprite stay in screen||`` and set it to **ON**.
```blocks
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444fffffffffffffffffffffffffffffffffffffffffffffff
    `)
let mySprite = sprites.create(img`
    ................1...............
    ...............111..............
    ..............11111.............
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
```

## Step 4 - Position the spaceship

Let's place your spaceship near the bottom of the screen where it will start the game. Add ``||sprites:set mySprite position||`` and set **x** to `80` and **y** to `106`.
```blocks
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444fffffffffffffffffffffffffffffffffffffffffffffff
    `)
let mySprite = sprites.create(img`
    ................1...............
    ...............111..............
    ..........................
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 106)
```

## Step 5 - Add horizontal movement

Now let's make the spaceship move left and right! Drag ``||controller:move mySprite with buttons||`` into ``||loops:on start||``. Click the + sign and set **vx** to `100` and **vy** to `0` so the spaceship only moves horizontally across the bottom of the screen.
```blocks
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444fffffffffffffffffffffffffffffffffffffffffffffff
    `)
let mySprite = sprites.create(img`
    ................1...............
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite, 100, 0)
```

## Step 6 - Add spaceship animation

Let's make your spaceship look more alive with animation! Add ``||animation:animate mySprite||`` block and create two frames showing slight movement. Set the interval to `250` ms and turn **loop** to **ON** so it repeats continuously.
```blocks
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444fffffffffffffffffffffffffffffffffffffffffffffff
    `)
let mySprite = sprites.create(img`
    ................1...............
    `, SpriteKind.Player)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite, 100, 0)
animation.runImageAnimation(
mySprite,
[img`
    ................1...............
    ...............111..............
    `, img`
    ..............1.................
    .............111................
    `],
250,
true
)
```

## Step 7 - Set starting score

Every good shooter needs a score! Add ``||info:set score to||`` and set it to `0` to start counting from zero.
```blocks
info.setScore(0)
```

## Step 8 - Set starting lives

The player needs lives to survive enemy attacks! Add ``||info:set life to||`` and set it to `3` to give the player three chances.
```blocks
info.setScore(0)
info.setLife(3)
```

## Step 9 - Create shooting button event

Now for the fun part - shooting! Drag ``||controller:on A button pressed||`` from ``||controller:Controller||``. This will let you shoot projectiles when you press the A button.
```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    
})
```

## Step 10 - Create the projectile

Inside the A button event, create a projectile that shoots upward! Add ``||sprites:set projectile to projectile from mySprite||``. Draw a simple laser or bullet sprite. Set **vx** to `0` and **vy** to `-100` to make it shoot straight up.
```blocks
let projectile: Sprite = null
let mySprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        `, mySprite, 0, -100)
})
```

## Step 11 - Spawn regular enemies

Time to add enemies! Drag ``||game:on game update every||`` from ``||game:Game||`` and set it to `2500` ms (every 2.5 seconds).
```blocks
game.onUpdateInterval(2500, function () {
    
})
```

## Step 12 - Create alien enemy sprite

Inside the game update block, create an alien enemy! Use ``||sprites:set alien to sprite of kind Enemy||`` and design a cool alien sprite.
```blocks
let alien: Sprite = null
game.onUpdateInterval(2500, function () {
    alien = sprites.create(img`
        ........................
        ..........aaaa..........
        ........aa7777aa........
        .......a77777777a.......
        ......fa77777777af......
        ......f7777777777f......
        ......f777f77f777f......
        .......a77777777a.......
        .....aaaa777777aaaa.....
        ....a77777a77a77777a....
        ....a7f7f7faaf7f7f7a....
        .........aaaaaa.........
        ........................
        `, SpriteKind.Enemy)
})
```

## Step 13 - Position enemies randomly

Make enemies appear at random positions at the top! Add ``||sprites:set alien position||`` and use ``||math:pick random||`` from `0` to ``||scene:screen width||`` for **x**, and set **y** to `0`.
```blocks
let alien: Sprite = null
game.onUpdateInterval(2500, function () {
    alien = sprites.create(img`
        ........................
        ..........aaaa..........
        `, SpriteKind.Enemy)
    alien.setPosition(randint(0, scene.screenWidth()), 0)
})
```

## Step 14 - Make enemies chase player

Let's make enemies chase your spaceship! Add ``||sprites:set alien follow mySprite||`` and set the speed to `30` to make them slowly pursue you.
```blocks
let alien: Sprite = null
let mySprite: Sprite = null
game.onUpdateInterval(2500, function () {
    alien = sprites.create(img`
        ........................
        ..........aaaa..........
        `, SpriteKind.Enemy)
    alien.setPosition(randint(0, scene.screenWidth()), 0)
    alien.follow(mySprite, 30)
})
```

## Step 15 - Create custom sprite kind for boss

We need a special kind of enemy for the boss! At the very top of your code, before everything else, add this namespace to create a new sprite kind called Miniboss:
```blocks
namespace SpriteKind {
    export const Miniboss = SpriteKind.create()
}
```

## Step 16 - Spawn boss enemies

Now add another ``||game:on game update every||`` and set it to `2000` ms to spawn boss enemies slightly more often than regular aliens.
```blocks
game.onUpdateInterval(2000, function () {
    
})
```

## Step 17 - Create boss variable

Before the boss spawning code, create a variable for boss health. Add ``||variables:set bossLife to||`` and set it to `3` so the boss takes 3 hits to defeat.
```blocks
let bossLife = 0
let boss: Sprite = null
game.onUpdateInterval(2000, function () {
    bossLife = 3
})
```

## Step 18 - Create boss sprite

Create the boss enemy sprite! Add ``||sprites:set boss to sprite of kind Miniboss||`` and design a bigger, scarier enemy sprite to represent the boss.
```blocks
let bossLife = 0
let boss: Sprite = null
game.onUpdateInterval(2000, function () {
    bossLife = 3
    boss = sprites.create(img`
        .........bbbcc..........
        ........bbbbccc.........
        .......bbbbccccc........
        ........7777777.........
        ........7ffff77.........
        .....bbb7777777bbb......
        ....bbbbbbbbbbbbbbb.....
        ....c5bbbbbbbbbbb5c.....
        .....ccc5ccc5cc5cc......
        `, SpriteKind.Miniboss)
})
```

## Step 19 - Position and move boss

Just like the aliens, make the boss appear randomly at the top and chase the player. Add ``||sprites:set boss position||`` with random x and y of `0`, then add ``||sprites:set boss follow mySprite||`` with speed `20` (slower than regular enemies to make it easier).
```blocks
let bossLife = 0
let boss: Sprite = null
let mySprite: Sprite = null
game.onUpdateInterval(2000, function () {
    bossLife = 3
    boss = sprites.create(img`
        .........bbbcc..........
        `, SpriteKind.Miniboss)
    boss.setPosition(randint(0, scene.screenWidth()), 0)
    boss.follow(mySprite, 20)
})
```

## Step 20 - Handle projectile hitting enemies

Now let's make your shots count! Drag ``||sprites:on sprite overlaps otherSprite||`` and set it to **Projectile** and **Enemy**.
```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    
})
```

## Step 21 - Destroy enemies and add points

When a projectile hits an enemy, add ``||info:change score by 1||`` to earn a point, then add ``||loops:pause||`` for `200` ms, and finally ``||sprites:destroy otherSprite||`` with a **disintegrate** effect lasting `100` ms.
```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    pause(200)
    sprites.destroy(otherSprite, effects.disintegrate, 100)
})
```

## Step 22 - Handle projectile hitting boss

Create another overlap event for **Projectile** and **Miniboss** to handle shooting the boss.
```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Miniboss, function (sprite, otherSprite) {
    
})
```

## Step 23 - Damage boss and check health

Inside the boss overlap, add ``||variables:change bossLife by -1||`` to reduce boss health. Then add a ``||loops:pause||`` for `200` ms.
```blocks
let bossLife = 0
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Miniboss, function (sprite, otherSprite) {
    bossLife += -1
    pause(200)
})
```

## Step 24 - Destroy boss when defeated

Add an ``||logic:if bossLife <= 0 then||`` statement. Inside it, add ``||sprites:destroy otherSprite||`` with **fire** effect for `100` ms, then ``||info:change score by 3||`` to give bonus points for defeating the boss!
```blocks
let bossLife = 0
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Miniboss, function (sprite, otherSprite) {
    bossLife += -1
    pause(200)
    if (bossLife <= 0) {
        sprites.destroy(otherSprite, effects.fire, 100)
        info.changeScoreBy(3)
    }
})
```

## Step 25 - Handle player collision with enemies

Create an overlap event for when the **Player** touches an **Enemy**.
```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    
})
```

## Step 26 - Lose life when hit by enemy

When the player collides with an enemy, add ``||sprites:destroy otherSprite||`` with **fire** effect for `200` ms, then ``||info:change life by -1||`` to lose a life, and ``||loops:pause||`` for `200` ms.
```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 200)
    info.changeLifeBy(-1)
    pause(200)
})
```

## Step 27 - Handle player collision with boss

Create another overlap for **Player** and **Miniboss** to handle when the boss hits you.
```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Miniboss, function (sprite, otherSprite) {
    
})
```

## Step 28 - Boss does more damage

The boss should be more dangerous! Add ``||sprites:destroy otherSprite||`` with **fire** for `200` ms, then ``||info:change life by -2||`` (the boss takes away 2 lives instead of 1!), and ``||loops:pause||`` for `200` ms.
```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Miniboss, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 200)
    info.changeLifeBy(-2)
    pause(200)
})
```

## Step 29 - Create win condition

Let's set up what happens when you win! Drag ``||info:on score 50||`` from ``||info:Info||``.
```blocks
info.onScore(50, function () {
    
})
```

## Step 30 - Set up victory

Inside the score event, add ``||game:game over WIN||`` and set it to **true**, then add ``||game:set game over effect||`` to **true** with **confetti** effect, and ``||game:set game over message||`` to **true** with text `"YOU WIN!"`. Finally add ``||music:stop all sounds||``.
```blocks
info.onScore(50, function () {
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
    game.setGameOverMessage(true, "YOU WIN!")
    music.stopAllSounds()
})
```

## Step 31 - Create lose condition

Now set up what happens when you lose all lives. Drag ``||info:on life zero||`` from ``||info:Info||``.
```blocks
info.onLifeZero(function () {
    
})
```

## Step 32 - Set up defeat

Inside the life zero event, add ``||game:game over LOSE||`` and set it to **false**, then ``||game:set game over effect||`` to **false** with **dissolve** effect, ``||game:splash||`` with text `"YOU LOSE"`, and ``||music:stop all sounds||``.
```blocks
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.dissolve)
    game.splash("YOU LOSE")
    music.stopAllSounds()
})
```

## Step 33 - Add background music

Finally, let's add some epic space music! In ``||loops:on start||``, add ``||music:play melody||`` and create a simple looping background track, or use the music editor to compose your own space theme. Set it to loop in background.
```blocks
music.play(music.createSong(hex`0078000408020205001c000f0a006400f4010a0000040000000000000000000000000000000002660000000400011b08000c00011b`), music.PlaybackMode.LoopingInBackground)
```

## Finale

Congratulations! You've built an epic space shooter game! 🚀

Try playing your game and see if you can reach a score of 50 to win! Here are some ideas to make it even better:

- Add more enemy types with different behaviors
- Create power-ups that restore health or give special weapons
- Make enemies shoot back at you
- Add multiple levels with increasing difficulty
- Create different boss types
- Add sound effects for shooting and explosions
- Track and display a high score

Your space adventure awaits, Commander!