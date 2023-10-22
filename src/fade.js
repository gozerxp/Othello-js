const RGB = {
    r: 0,
    g: 0,
    b: 0,
    getRGB: (color) => {
        this.r = color % 256;
        this.g = color / 256 % 256;
        this.b = color / Math.pow(256, 2);
    }
};

