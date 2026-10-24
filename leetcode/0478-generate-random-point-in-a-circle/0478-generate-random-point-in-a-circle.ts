class Solution {
    private radius: number;
    private xCenter: number;
    private yCenter: number;

    constructor(_radius: number, _x_center: number, _y_center: number) {
        this.radius = _radius;
        this.xCenter = _x_center;
        this.yCenter = _y_center;
    }

    randPoint(): number[] {
        const randomRadius = Math.sqrt(Math.random()) * this.radius;
        const randomAngle = Math.random() * 2 * Math.PI;

        const x = this.xCenter + randomRadius * Math.cos(randomAngle);
        const y = this.yCenter + randomRadius * Math.sin(randomAngle);

        return [x, y];
    }
}