# Space Shooter

## Introduction @unplugged
Welcome to **The LEAGUE's Space Shooter game**!
In this beginner-friendly game, you'll learn how to build a classic space shooter. Control your ship, fire projectiles at incoming aliens, and survive long enough to reach a winning score. Let's start coding!

## Step 1

First, let's set up the game world with a space-themed background image.

From the ``||scene:Scene||`` category, use ``||scene:set background image||`` and choose or draw a space background. You can pick one from the **Gallery** or create your own starry sky.

```blocks
scene.setBackgroundImage(assets.image`space_bg`)
```

## Step 2

Now create your player ship that will defend against the aliens.

From ``||sprites:Sprites||``, click and drag ``||sprites:set mySprite to sprite kind player||``. Keep the name as **mySprite**, set the kind to **Player**, and choose a spaceship image from the **Gallery** or draw your own.

```blocks
scene.setBackgroundImage(assets.image`space_bg`)
let mySprite = sprites.create(assets.image`ship`, SpriteKind.Player)
```

## Step 3

Let's keep the player inside the screen so the ship does not fly off the edges.

From ``||sprites:Sprites||``, use ``||sprites:set stay in screen||`` and toggle it to **ON** for your player sprite.

```blocks
scene.setBackgroundImage(assets.image`space_bg`)
let mySprite = sprites.create(assets.image`ship`, SpriteKind.Player)
mySprite.setStayInScreen(true)
```

## Step 4

Position the ship near the bottom of the screen, where a defender would stand.

From ``||sprites:Sprites||``, use ``||sprites:set mySprite position to x y||``. Set **x** to **80** (center of the screen) and **y** to **106** (near the bottom).

```blocks
scene.setBackgroundImage(assets.image`space_bg`)
let mySprite = sprites.create(assets.image`ship`, SpriteKind.Player)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 106)
```

## Step 5

Let's make the player move left and right using the controller buttons.

From ``||controller:Controller||``, use ``||controller:move sprite with buttons||``. Press the **+** sign to see both **VX** and **VY**. Set **VX** to **100** and **VY** to **0** so the ship only moves horizontally.

```blocks
scene.setBackgroundImage(assets.image`space_bg`)
let mySprite = sprites.create(assets.image`ship`, SpriteKind.Player)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite, 100, 0)
```

## Step 6

Initialize the score and lives so the player can track their progress.

From ``||info:Info||``, use ``||info:set score to 0||`` to start with zero points. Then use ``||info:set life to 3||`` to give the player 3 lives.

```blocks
scene.setBackgroundImage(assets.image`space_bg`)
let mySprite = sprites.create(assets.image`ship`, SpriteKind.Player)
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite, 100, 0)
info.setScore(0)
info.setLife(3)
```

## Step 7

Now let's give the player the ability to shoot! We need to fire a projectile when the **A** button is pressed.

From ``||controller:Controller||``, drag out ``||controller:on A button pressed||``. Inside that block, from ``||sprites:Sprites||``, use ``||sprites:set projectile to projectile from mySprite||``. Set **VX** to **0** and **VY** to **-100** so the projectile flies straight up. Draw or choose a small laser or bullet image for the projectile.

```blocks
let mySprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let projectile = sprites.createProjectileFromSprite(assets.image`laser`, mySprite, 0, -100)
})
```

## Step 8

Time to add enemies! Let's make alien sprites spawn automatically during the game.

From ``||game:Game||``, drag out ``||game:on game update every||`` and set it to **1000** ms (every 1 second, a new alien appears). Inside the block, from ``||sprites:Sprites||``, use ``||sprites:set alien to sprite of kind enemy||``. Rename the variable to **alien**, set the kind to **Enemy**, and choose or draw an alien image.

```blocks
let alien: Sprite = null
game.onUpdateInterval(1000, function () {
    alien = sprites.create(assets.image`alien`, SpriteKind.Enemy)
})
```

## Step 9

Make each alien appear at a random spot along the top of the screen.

Inside the same ``||game:on game update every||`` block, from ``||sprites:Sprites||``, use ``||sprites:set mySprite position to x y||`` for the alien. For the **x** value, use ``||math:pick random||`` from the ``||math:Math||`` category with a range of **0** to ``||scene:screen width||`` (found in the ``||scene:Scene||`` category). Set **y** to **0** so they appear at the top.

```blocks
let alien: Sprite = null
game.onUpdateInterval(1000, function () {
    alien = sprites.create(assets.image`alien`, SpriteKind.Enemy)
    alien.setPosition(randint(0, scene.screenWidth()), 0)
})
```

## Step 10

Make the aliens chase the player! This adds challenge to the game.

Still inside the ``||game:on game update every||`` block, from ``||sprites:Sprites||``, use ``||sprites:set mySprite follow otherSprite||``. Set it so the **alien** follows **mySprite** at a speed of **30**. This makes the aliens slowly drift toward your ship.

```blocks
let mySprite: Sprite = null
let alien: Sprite = null
game.onUpdateInterval(1000, function () {
    alien = sprites.create(assets.image`alien`, SpriteKind.Enemy)
    alien.setPosition(randint(0, scene.screenWidth()), 0)
    alien.follow(mySprite, 30)
})
```

## Step 11

Now let's handle what happens when a projectile hits an alien. The player should earn a point and the alien should be destroyed.

From ``||sprites:Sprites||``, use ``||sprites:on sprite of kind player overlaps with otherSprite of kind player||``. Change the first kind to **Projectile** and the second kind to **Enemy**. Inside the block:
- From ``||info:Info||``, use ``||info:change score by 1||``
- From ``||loops:Loops||``, use ``||loops:pause 200 ms||`` to add a brief delay
- From ``||sprites:Sprites||``, use ``||sprites:destroy otherSprite||``. Click the **+** sign and add the **disintegrate** effect for **100** ms

```blocks
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    pause(200)
    sprites.destroy(otherSprite, effects.disintegrate, 100)
})
```

## Step 12

If an alien reaches the player, the player should lose a life! Let's handle the player-enemy collision.

From ``||sprites:Sprites||``, use another ``||sprites:on sprite of kind overlaps with otherSprite of kind||`` block. Set the first kind to **Player** and the second kind to **Enemy**. Inside the block:
- From ``||sprites:Sprites||``, use ``||sprites:destroy otherSprite||`` with the **fire** effect for **200** ms
- From ``||info:Info||``, use ``||info:change life by -1||`` to remove one life
- From ``||loops:Loops||``, use ``||loops:pause 200 ms||`` to add a brief delay

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 200)
    info.changeLifeBy(-1)
    pause(200)
})
```

## Step 13

Let's set a win condition! When the player reaches a score of **50**, they win the game.

From ``||info:Info||``, use ``||info:on score 50||``. Inside the block:
- From ``||game:Game||``, use ``||game:game over win||`` and set it to **WIN**
- From ``||game:Game||``, use ``||game:set game over effect||`` to **confetti** for the win screen
- From ``||game:Game||``, use ``||game:set game over message||`` and type **"YOU WIN!"**

```blocks
info.onScore(50, function () {
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
    game.setGameOverMessage(true, "YOU WIN!")
})
```

## Step 14

Finally, let's handle the lose condition. When the player runs out of lives, the game ends.

From ``||info:Info||``, use ``||info:on life zero||``. Inside the block:
- From ``||game:Game||``, use ``||game:game over lose||`` and set it to **LOSE**
- From ``||game:Game||``, use ``||game:set game over effect||`` to **dissolve** for the lose screen
- From ``||game:Game||``, use ``||game:splash||`` and type a game over message

```blocks
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.dissolve)
    game.splash("YOU LOSE")
})
```

## Conclusion @unplugged

Congratulations! You've built your own Space Shooter game! Try playing it and see if you can survive long enough to reach 50 points.

**What you learned:**
- Setting up a background image
- Creating and positioning a player sprite
- Firing projectiles with button input
- Spawning enemies on a timed interval
- Making enemies follow the player
- Detecting collisions between different sprite kinds
- Tracking score and lives
- Setting up win and lose conditions
- Adding visual effects to destroyed sprites

**Try these challenges:**
- Change the alien spawn time to make it easier or harder
- Increase the alien follow speed for more difficulty
- Add a second type of enemy worth more points
- Give the player a power-up that shoots faster
- Change the number of lives or the winning score
- Try different destroy effects for projectiles and aliens

Great job and keep coding!