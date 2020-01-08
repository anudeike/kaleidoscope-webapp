<template>
    <div>
        <!--a slot for the parent component to activate the file changer-->
        <div @click="launchFilePicker()">
            <slot name="activator"></slot>
        </div>

        <!--image input - style is hidden and assigned a ref so it can be triggered-->
        <input type="file" ref="file" :name="uploadFieldName" @change="onFileChange($event.target.name, $event.target.files)" style="display: none;">

        <!--any errors?-->
        <v-dialog v-model="errorDialog" max-width="300">
            <v-card>
                <v-card-text class="subheading">{{ errorText }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "ImageUpload",
        data: () => ({
            errorDialog: null,
            errorText: '',
            uploadFieldName: 'file',
            maxSize: 4096,
            count: 0
        }),
        props: {
            value: Object,
        },
        methods: {
            launchFilePicker() {
                this.$refs.file.click();
            },
            onFileChange(fieldName, file) {
                const {maxSize} = this;
                let imageFile = file[0];
                //check is there is an actual file
                if (file.length > 0) {
                    let size = imageFile.size / maxSize / maxSize;
                    if (!imageFile.type.match('image.*')) {
                        // check whether the upload is an image
                        this.errorDialog = true;
                        this.errorText = 'Please choose an image file';
                    } else if (size > 1) {
                        // check whether the size is greater than the size limit
                        this.errorDialog = true;
                        this.errorText = 'Your file is too big! Please select an image under 4MB';
                    } else {
                        // Append file into FormData & turn file into image URL
                        //console.log(this.count);
                        let formData = new FormData();
                        let imageURL = URL.createObjectURL(imageFile);
                        formData.append(fieldName, imageFile);

                        // Emit FormData & image URL to the parent component
                        this.$emit('input', {imageFile, formData, imageURL});
                    }
                    this.count++;
                }
            },
        }
    }
</script>

<style scoped>

</style>