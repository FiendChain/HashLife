export class Texture3D {
    constructor(gl, data, shape) {
        this.gl = gl;
        this.data = data;
        this.shape = shape;
        this.texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_3D, this.texture);
        // The R32F type works only with gl.RED and gl.FLOAT
        // https://www.khronos.org/registry/webgl/specs/latest/2.0/#TEXTURE_TYPES_FORMATS_FROM_DOM_ELEMENTS_TABLE
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

        // gl.texImage3D(gl.TEXTURE_3D, 0, gl.R8, shape[0], shape[1], shape[2], 0, gl.RED, gl.UNSIGNED_BYTE, this.data);
        // gl.texImage3D(gl.TEXTURE_3D, 0, gl.RG8, shape[0], shape[1], shape[2], 0, gl.RG, gl.UNSIGNED_BYTE, this.data);
        gl.texImage3D(gl.TEXTURE_3D, 0, gl.RG8, shape[0], shape[1], shape[2], 0, gl.RG, gl.UNSIGNED_BYTE, this.data);
        // gl.texImage3D(gl.TEXTURE_3D, 0, gl.RGBA8, shape[0], shape[1], shape[2], 0, gl.RGBA, gl.UNSIGNED_BYTE, this.data);
    }

    bind(slot=0) {
        let gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + slot);
        gl.bindTexture(gl.TEXTURE_3D, this.texture);
    }
}