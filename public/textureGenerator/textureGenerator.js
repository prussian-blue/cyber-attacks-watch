// Dani Vicario - textureGenerator experiment (canvas)- Thu 13 Aug 2020 23:17:51 CEST

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
	normal: "source-over",
	"source-in": "source-in",
	"source-out": "source-out",
	"source-atop": "source-atop",
	"destination-over": "destination-over",
	"destination-in": "destination-in",
	"destination-out": "destination-out",
	"destination-atop": "destination-atop",
	lighter: "lighter",
	copy: "copy",
	xor: "xor",
	multiply: "multiply",
	screen: "screen",
	overlay: "overlay",
	darken: "darken",
	lighten: "lighten",
	"color-dodge": "color-dodge",
	"color-burn": "color-burn",
	"hard-light": "hard-light",
	"soft-light": "soft-light",
	difference: "difference",
	exclusion: "exclusion",
	hue: "hue",
	saturation: "saturation",
	color: "color",
	luminosity: "luminosity"
};

// eslint-disable-next-line func-names
CanvasRenderingContext2D.prototype.rotateImageFromCenter = function (
	imageCanvas,
	angleInDegrees,
	placeImageInX,
	placeImageInY,
	width,
	height
) {
	this.save();

	if (width === undefined && height === undefined) {
		this.translate(placeImageInX, placeImageInY);
		this.rotate((angleInDegrees * Math.PI) / 180);
		this.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
	} else {
		this.translate(placeImageInX, placeImageInY);
		this.rotate((angleInDegrees * Math.PI) / 180);
		this.drawImage(imageCanvas, -width / 2, -height / 2, width, height);
	}

	this.restore();
};

// eslint-disable-next-line no-unused-vars
Math.randomFloat = (min, max) => Math.random() * (max - min) + min;
// eslint-disable-next-line no-unused-vars
Math.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// eslint-disable-next-line no-unused-vars
Math.shuffle = (array, _) => array.sort(() => Math.random() - 0.5);

// eslint-disable-next-line no-unused-vars
function getGlobalCompositeOperationMode() {
	const keys = Object.keys(globalCompositeOperationModes);
	let mode = 0;
	let consoleDone = false;

	// eslint-disable-next-line arrow-parens
	window.onkeydown = (e) => {
		if (e.keyCode === 39) {
			mode++;
			consoleDone = false;

			if (mode === keys.length) mode = 0;
		}

		if (e.keyCode === 37) {
			mode--;
			consoleDone = false;

			if (mode < 0) mode = keys.length - 1;
		}
	};

	// eslint-disable-next-line no-func-assign
	getGlobalCompositeOperationMode = () => {
		const modeFinal = globalCompositeOperationModes[keys[mode]];

		if (!consoleDone) {
			// eslint-disable-next-line no-console
			console.log("exposure mode to", modeFinal);

			consoleDone = true;
		}

		return modeFinal;
	};

	return getGlobalCompositeOperationMode;
}

// eslint-disable-next-line func-names
CanvasRenderingContext2D.prototype.rotateImageFromCenter = function (
	imageCanvas,
	angleInDegrees,
	placeImageInX,
	placeImageInY,
	width,
	height
) {
	this.save();

	if (width === undefined && height === undefined) {
		this.translate(placeImageInX, placeImageInY);
		this.rotate((angleInDegrees * Math.PI) / 180);
		this.drawImage(imageCanvas, -imageCanvas.width / 2, -imageCanvas.height / 2);
	} else {
		this.translate(placeImageInX, placeImageInY);
		this.rotate((angleInDegrees * Math.PI) / 180);
		this.drawImage(imageCanvas, -width / 2, -height / 2, width, height);
	}

	this.restore();
};

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
// eslint-disable-next-line no-unused-vars
const w2 = w / 2;
// eslint-disable-next-line no-unused-vars
const h2 = h / 2;

// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

ctx.save();

function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

let textures = [
	"blue_vein.jpg",
	"cement_shoe.jpg",
	"clean_slate.jpg",
	"cracked_up.jpg",
	"crime_scene.jpg",
	"emerald_city.jpg",
	"grey_ghost.jpg",
	"grunge_music.jpg",
	"jade_helm.jpg",
	"lost_marble.jpg",
	"mustard_gas.jpg",
	"sand_pit.jpg",
	"smoke_stone.jpg",
	"spilt_milk.jpg",
	"white_wash.jpg"
];
const texture = new Image();
const f = () => `./textures/${textures.splice(randomInt(0, textures.length - 1), 1)}`;

let pos = f();
console.log(pos);
texture.src = pos;
const texture2 = new Image();

pos = f();
console.log(pos);
texture2.src = pos;

let deg = 0;
let loaded = 0;

texture.onload = function () {
	loaded++;
	checkLoaded();
};

texture2.onload = function () {
	loaded++;
	checkLoaded();
};

function checkLoaded() {
	if (loaded < 2) return;

	ctx.clearRect(0, 0, w, h);
	console.log("enters");

	ctx.globalCompositeOperation = globalCompositeOperationModes.overlay;
	// ctx.filter = `hue-rotate(${randomInt(0, 360)}deg)`;

	ctx.save();
	ctx.filter = `blur(${randomFloat(0, 20)}px)`;
	// ctx.scale(1, 1);
	ctx.drawImage(texture, 0, 0, w, h);
	ctx.restore();

	ctx.save();
	ctx.filter = `none`;
	ctx.drawImage(texture2, 0, 0, w + randomInt(0, 200), h + randomInt(0, 200));
	ctx.restore();
}
