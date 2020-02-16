<script>

    // Abstract component

    // can precalc the pic and eth but no need to?
    export default {
        name: "Box",
        inject:['provider'],

        props: {
            // start coordinates
            x1: {
                type: Number,
            },

            y1: {
                type: Number,
                default: 0
            },

            // The color of the box.
            color: {
                type: String,
                default: '#ff00a7'
            }
        },
        data () {
            return {
                // cache earlier dimensions
                oldBox: {
                    x: null,
                    y: null,
                    w: null,
                    h: null
                }
            }
        },
        render () {
            if(!this.provider.context)
            // something went wrong
                return;

            const ctx = this.provider.context;

            // create a box
            const newBox = {
                x: this.x1,
                y: this.y1,
                c: this.color
            };
            // console.log("Before: \n");
            // console.log("X: " + newBox.x);
            // console.log("Y: " + newBox.y * mult );
            // console.log("\n");

            //calculate the row
            var mult = 0;
            if (newBox.x >= 500 && newBox.x < 1000) {
                mult += 1; // add 1 to the multplier
                newBox.x -= 500 // subtract 500
            } else if (newBox.x >= 1000 && newBox.x < 1500) {
                mult += 2; // add 1 to the multplier
                newBox.x -= 1000 // subtract 1000
            } else if (newBox.x >= 1500 && newBox.x < 2000) {
                mult += 3; // add 1 to the multplier
                newBox.x -= 1500 // subtract 1500
            } else if (newBox.x >= 2000 && newBox.x < 2500) {
                mult += 4; // add 1 to the multplier
                newBox.x -= 2000 // subtract 2000
            } else if (newBox.x >= 2500 && newBox.x < 3000) {
                mult += 5; // add 1 to the multplier
                newBox.x -= 2500 // subtract 2000
            } else if (newBox.x >= 3000 && newBox.x < 3500) {
                mult += 6; // add 1 to the multplier
                newBox.x -= 3000 // subtract 2000
            } else if (newBox.x >= 3500 && newBox.x < 4000) {
                mult += 7; // add 1 to the multplier
                newBox.x -= 3500 // subtract 2000
            } else if (newBox.x >= 4000 && newBox.x < 4500) {
                mult += 8; // add 1 to the multplier
                newBox.x -= 4000 // subtract 2000
            }else if (newBox.x >= 4500 && newBox.x < 5000) {
                mult += 9; // add 1 to the multplier
                newBox.x -= 4500 // subtract 2000
            }
            //
            // console.log("After: \n");
            // console.log("X: " + newBox.x);
            // console.log("Y: " + newBox.y);
            // console.log("\n\n");


            ctx.beginPath();

            //draw a rectangle
            ctx.rect(newBox.x, newBox.y * mult, 100, 100);
            ctx.fillStyle = newBox.c;
            ctx.fill();

            return 0;

        }
    }
</script>