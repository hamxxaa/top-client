export default class ListenerRemover{

    constructor(socket) {
        this.socket = socket;
    }

    removeRoomHandlerListeners(){
        this.socket.removeAllListeners("rooms");
        this.socket.removeAllListeners("owner can connect to lobby");
        this.socket.removeAllListeners("player can connect to lobby");
        this.socket.removeAllListeners("game already started");
    }
    
    removeLobbyHandlerListeners(){
        this.socket.removeAllListeners("get lobby");
        this.socket.removeAllListeners("update lobby");
        this.socket.removeAllListeners("game started");
        this.socket.removeAllListeners("validate stats");
    }

    removeSocketHandlerListeners(){
        this.socket.removeAllListeners("draw players");
        this.socket.removeAllListeners("update clients");
        this.socket.removeAllListeners("direk");
        this.socket.removeAllListeners("update score1");
        this.socket.removeAllListeners("update score2");
        this.socket.removeAllListeners("play shoot sounds on client");
        // this.socket.off("user disconnected");
        this.socket.removeAllListeners("pause");
        this.socket.removeAllListeners("update specs");
    }
    
    removeListeners() {
        this.socket.removeAllListeners();
    }

}