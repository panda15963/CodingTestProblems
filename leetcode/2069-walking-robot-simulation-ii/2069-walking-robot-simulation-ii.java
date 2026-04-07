class Robot {
    private final int[][] positions;
    private final String[] directions;
    private final int cycleLength;
    private int index;
    private boolean moved;

    public Robot(int width, int height) {
        cycleLength = 2 * (width + height) - 4;
        positions = new int[cycleLength][2];
        directions = new String[cycleLength];

        int current = 0;
        positions[current][0] = 0;
        positions[current][1] = 0;
        directions[current++] = "South";

        for (int x = 1; x < width; x++) {
            positions[current][0] = x;
            positions[current][1] = 0;
            directions[current++] = "East";
        }

        for (int y = 1; y < height; y++) {
            positions[current][0] = width - 1;
            positions[current][1] = y;
            directions[current++] = "North";
        }

        for (int x = width - 2; x >= 0; x--) {
            positions[current][0] = x;
            positions[current][1] = height - 1;
            directions[current++] = "West";
        }

        for (int y = height - 2; y >= 1; y--) {
            positions[current][0] = 0;
            positions[current][1] = y;
            directions[current++] = "South";
        }
    }

    public void step(int num) {
        if (num == 0) {
            return;
        }

        moved = true;
        index = (index + num % cycleLength) % cycleLength;
    }

    public int[] getPos() {
        return new int[] {positions[index][0], positions[index][1]};
    }

    public String getDir() {
        return moved ? directions[index] : "East";
    }
}