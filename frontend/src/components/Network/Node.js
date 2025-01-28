export default class Node {
    constructor(id, sha, message, cx, cy, rad, fill, stroke, strokeWidth, connections) {
        this.id = id;
        this.sha = sha;
        this.message = message;
        this.cx = cx;
        this.cy = cy;
        this.rad = rad;
        this.fill = fill;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.connections = connections;
    }


}