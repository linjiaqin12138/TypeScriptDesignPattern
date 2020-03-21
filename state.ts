enum PlayState {
    PLAY,
    PAUSE,
    STOP       
}
abstract class  IPlayer{

    abstract request(flag: number): void; 

}

