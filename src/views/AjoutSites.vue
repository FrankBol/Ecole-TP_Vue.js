<template>
    <form @submit.prevent="ValidForm()" class="w-50 mx-auto mt-5 border p-4">
        <div class= "mb-3">
            <label for="" class="form-label">Nom</label>
            <input type="text" class="form-control" v-model="site.name" required>
        </div>
        <div class= "mb-3">
            <label for="" class="form-label">Url</label>
            <input type="text" class="form-control" v-model="site.url" >
        </div>
        <div class= "mb-3">
            <label for="" class="form-label">Description</label>
            <input type="text" class="form-control" v-model="site.description">
        </div>
        <div class= "mb-3">
            <label for="" class="form-label">Tag</label>
            <input type="text" class="form-control" v-model="tag" >
        </div>
        <button type="submit" class="btn btn-primary">Envoie</button>
    </form>
</template>

<script>
export default {
    name: 'add',
    data() {
        return {
            tag:null,
            site: {
                name: "",
                url: "",
                description: "",
                tabTag: [],
                date: new Date(),
                dateNow: "",
           }           
        }
    },
    methods: {
        ValidForm() {
            if(this.site.name.length > 0 && this.site.name.length < 255){
                this.addSite()
            }
        },
        addSite() {
            this.site.dateNow = Date.now()
            if(this.tag != null)this.site.tabTag = this.tag.trim().split(" ")

          fetch('https://test-integration-c1055-default-rtdb.firebaseio.com/sites.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.site)
          })
          .catch(err => console.log(err))
        }
    },
}
</script>