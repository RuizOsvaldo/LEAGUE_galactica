namespace SpriteKind {
    export const Miniboss = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . 2 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -100)
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.dissolve)
    game.splash("👾YOU LOSE👾")
})
info.onScore(50, function () {
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
    game.setGameOverMessage(true, "YOU WIN!")
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    pause(200)
    sprites.destroy(otherSprite, effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 200)
    info.changeLifeBy(-1)
    pause(200)
})
let alien: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444fffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444ffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444444fffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444222222244444444444444444444fffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444424444444244444444444444444444ffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444424444444442444444444444444444444ffffffffffffffff1fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444244444444424444444444444444444444fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444444424444444442444444444444444444444444fffffffffffffffffffffffffffff1fff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444244444444424444444444444444444444444ffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444444444442444444444244444444444444444444444444fffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444444444424444444442444444444444444444444444444ffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444244444444424444444444444444444444444444fffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffff444444444444444444444444244444442444444444444444444444444444444ffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444444444444444222222244444444444444444444444444444444fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444444444444444444444444444444444444ffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444444444444444444444444444444444442222222444444444444422222fffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444444444444244444442444444444442444442ffffffffffffffffffffffff
    ff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444444444444444444444444444444444244444442444444444442444442ffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444444444444442444444424444444444424444424fffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444444444444442444444424444444444424444424fffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444444444444444444444444444444444444424444444244444444444244444244ffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44442222222444444444444444444444444444444444444244444442444444444444222224444fffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffff44424444444244444444444444444444444444444444444244444442444444444444444444444fffffffffff1fffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4442444444444244444444444444442224444444444444444222222244444444444444444444444ffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4424444444444424444444444444442424444444444444444444444444444444444444444444444ffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4424444444444424444444444444442224444444444444444444444444444444444444444444444ffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444244444444444244444444444444444444444444444444444444444444444444444444444444444fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444244444444444244444444444444444444444444444444444444444444444444444444444444444fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444244444444444244444444444444444444444444444444444444444444444444444444444444444fffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44442444444444442444444444444444444444444444444444444444444444444444444444444444444ffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44442444444444442444444444444444444444444444444444444444444444442222222444444444442ffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444244444444424444444444444444444422222222244444444444444444424444444244444444442ffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444244444442444444444444444444422444444444224444444444444442444444444244444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444422222224444444444444444444244444444444442444444444444442444444444244444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444442444444444444444244444444444442444444444244444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444424444444444444444424444444444442444444444244444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444424444444444444444424444444444442444444444244444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444244444444444444444442444444444442444444444244444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444244444444444444444442444444444442444444444244444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444244444444444444444442444444444444244444442444444444422fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444244444444444444444442444444444444422222224444444444222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444244444444444444444442444444444444444444444444444444222fffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffff1ffff4444444444444444444444444444444244444444444444444442444444444444444444444444444444222fffffffffff1fffff
    ffffffffffffffff1fffffffffffffffffffffffffffffffffffffffff4442222244444444444444444444444244444444444444444442444444444444444444444444444444222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4442444244444444444444444444444244444444444444444442444444444444444444444444444442222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4442444244444444444444444444444244444444444444444442444444444444444444444444444442222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4442444244444444444444444444444424444444444444444424444444444444444444444444444422222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4442222244444444444444444444444424444444444444444424444444444444444444444444444422222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444442444444444444444244444444444444444444444444444222222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444244444444444442444444444444444444444444444444222222fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444422444444444224444444444444444444444444444442222222fffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444444444444444444444444422222222244444444444444444444444444444442222222ffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444444444444444444444444444444444444444444444444422222444444444442222222ffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444222222244444444444444444444444444444444444444244444244444444422222222ffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444244444442444444444444444444444444444444444444424444424444444422222222fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444244444442444444444444444444444444444444444444424444424444444422222222fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff444444444444244444442444444444444444444444444444444444444424444424444444222222222fffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444424444444244444444444444444444444444444444444442444442444444422222222ffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444424444444244444444444444444444444444444444444444222224444444222222222ffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444424444444244444444444444444444444444444444444444444444444442222222222ffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444442444444424444444444444444444444222222244444444444444444442222222222fffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444222222244444444444444444444442444444424444444444444444442222222222fffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444444444444444444444444444442444444444244444444444444442222222222ffffffffffffffffffffff
    ffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444442444444444442444444444444442222222222fffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444444442444444444442444444444444422222222222fffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444444444444444444444444244444444444244444444444422222222222fffffffffffffffffff1ffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444444444444444444444444424444444444424444444444422222222222fffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444444444444444444444444424444444444424444444444222222222222fffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444444444444444444444442444444444442444444444222222222222ffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444444442222244444444444244444444444244444444422222222222fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffff444444444444444244424444444444442444444444244444444222222222222ffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff4444444444444424442444444444444424444444244444444222222222222fffffffffffffffffffffffffffff
    fff9999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff44444444444442444244444444444444222222244444444222222222222ffffffffffffffffffffffffffffff
    9999999999999999999fffffffffffffffffffffffffffffffffffffffffffffffffffff444444444444222224444444444444444444444444442222222222222fffffffffffffffffffffffffffffff
    9999999999999999999999ffffffffffffffffffffffffffffffffffff1ffffffffffffff4444444444444444444444444444444444444444422222222222222ffffffffffffffffffffffffffffffff
    9999999999999999999999999ffffff8888888888888ffffffffffffffffffffffffffffff44444444444444444444444444444444444444222222222222222fffffffffffffffffffffffffffffffff
    9999999999999999999999999999ff8888888888888888ffffffffffffffffffffffffffffff4444444444444444444444444444444444422222222222222fffffffffffffffffffffffffffffffffff
    999999999999999999999999999998888888888888888888fffffffffffffffffffffffffffff44444444444444444444444444444444222222222222222ffffffffffffffffffffffffffffffffffff
    9999999999999999999999999999999888888888888888888ffffffffffffffffffffffffffffff4444444444444444444444444444222222222222222ffffffffffffffffffffffffffffffffffffff
    99999999999999999999999999999999888888ffffffff88888fffffffffffffffffffffffffffff44444444444444444444444422222222222222222fffffffffffffffffffffffffffffffffffffff
    9999999999999999999999999999999999ffffffffffffff8888ffffffffffffffffffffffffffffff4444444444444444444422222222222222222fffffffffffffffffffffffffffffffffffffffff
    99999999999999999999999999999999999ffffffffffffff8888ffffffffffffffffffffffffffffffff4444444444444222222222222222222ffffffffffffffffffffffffffffffffffffffffffff
    999999999999999999999999999999999999fffffffffffff8888fffffffffffffffffffffffffffffffffff4444444222222222222222222fffffffffffffffffffffffffffffffffffffffffffffff
    9999999999999999999999999999999999999ffffffffffff88888fffffffffffffffffffffffffffffffffffff4222222222222222222ffffffffffffffffffffffffffffffffffffffffffffffffff
    9999999999999999999999999999999999999ffffffffffff88888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    99999999999999999999999999999999999999fffffffffff88888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    99999999999999999999999999999999999999fffffffffff888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    999999999999999999999999999999999999999fffffffff8888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    9999999999999999999999999999999999999999ffffffff8888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    99999999999999999999999999999999999999999ffffff88888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffff
    99999999999999999999999999999999999999999fffff888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff
    999999999999999999999999999999999999999999ffff888888888ffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    999999999999999999999999999999999999999999fff888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    9999999999999999999999999999999999999999999f8888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    9999999999999999999999999999999999999999999f8888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    99999999999999999999999999999999999999999998888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    69999999999999999999999999999999999999999888888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6999999999999999999999999999999999999999888888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6999999999999999999999999999999999999988888888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    69999999999999999999999999999999999998888888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6999999999999999999999999999999999998888888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    669999999999999999999999999999999998888888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66999999999999999999999999999999988888888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6699999999999999999999999999999888888888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6669999999999999999999999999998888888888888889ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6666999999999999999999999998888888888888888899ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66669999999999999999999998888888888888888889999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66666999999999999999998888888888888888888999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66666699999999999999988888888888888888889999999ffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66666669999999999988888888888888888889999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66666666999999998888888888888888888999999999999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffff
    66666666999999888888888888888888899999999999999fffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66666666699998888888888888888889999999999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    66666666668888888888888888888999999999999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fff
    6666666688888888888888888889999999999999999999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6666668888888888888888888999999999999999999999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6666888888888888888888899999999999999999999999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    6888888888888888888889999999999999999999999999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    888888888888888888899999999999999999999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    888888888888888866666999999999999999999999999fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
mySprite = sprites.create(img`
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
mySprite.setStayInScreen(true)
mySprite.setPosition(80, 106)
controller.moveSprite(mySprite, 100, 0)
info.setScore(0)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    alien = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........aaaa..........
        ........aa7777aa........
        .......a77777777a.......
        .......a77777777a.......
        ......fa77777777af......
        ......f7777777777f......
        ......f7777777777f......
        ......f777f77f777f......
        ......f777f77f777f......
        .......a77777777a.......
        .....aaaa777777aaaa.....
        ....a77777a77a77777a....
        ....a77777aaaa77777a....
        ....a7f7f7faaf7f7f7a....
        .........aaaaaa.........
        ..........faaf..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Enemy)
    alien.setPosition(randint(0, scene.screenWidth()), 0)
    alien.follow(mySprite, 30)
})
