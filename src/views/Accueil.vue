<template>
    <div class="text-center"><button @click="test()">TEST</button></div>
    <h1 class="text-success text-center mb-5">Accueil</h1>
    <div class="border border-light bg-info w-75 m-auto p-4 mb-5 rounded d-flex justify-content-between">
        <div>
            <button v-for="(tag, index) in tabTags" :key="index" @click="selectTag(tag)" class="btn btn-secondary me-2 text-white">
            {{tag}}
            </button>
        </div>
        <div v-if="nbrFilters">
            <span class="text-white">Vous avez {{nbrFilters}}</span><span class="text-white"> filtre</span><span v-if="nbrFilters>1"  class="text-white">s</span>
            <button type="button" class="btn btn-danger ms-2" @click="deleteFilter()">Retirer</button>
        </div>
    </div>
    <div v-for="(site, index) in dataSites" :key="index" class="card w-75 m-auto shadow p-3 mb-5 bg-white rounded">
        <h5 class="card-header">{{site.date}}</h5>
        <div class="card-body">
            <h2 v-if="!site.url" class="card-title">{{site.name}}</h2>
            <h2 v-if="site.url" class="card-title"><a :href="site.url" target="_blank">{{site.name}}</a></h2>
            <p class="card-text">{{ site.description.substring(0, 75) }}</p>
            <div class="d-flex justify-content-between">
                <div>
                    <button  v-for="(tag, indexTag) in site.tabTag" :key="indexTag"  @click="selectTag(tag)" class="btn btn-info text-white me-2">
                    {{tag}}
                    </button>
                </div>
                <button @click="deleteSite(site.id, index)" class="btn btn-danger">Supprimé</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            SaveDataSites: [],
            dataSites: [],
            tabTags: [],
            nbrFilters : "",
            listeSitesLenght: "",
            ref: ""
        }
    },
    methods: {
        test() {
        },

        loadSitesData() {
            fetch('https://test-integration-c1055-default-rtdb.firebaseio.com/sites.json')
            .then(response => 
            response.json()
        )
        .then(data => {
            for(let i in data){
                data[i].id = i
                this.dataSites.push(data[i]);
            }
            this.dataSites.sort((a, b) => a.dateNow + b.dateNow)
            this.SaveDataSites = [...this.dataSites]
            this.loadTagsData() 
            this.listeSitesLenght = this.dataSites.length
            this.ref = this.dataSites.length
        }) 
        .catch(err => console.log(err)) 
        },

        loadTagsData() {
            let tagData = []      
            this.dataSites.forEach(e => {
                if(e.tabTag != undefined){
                    e.tabTag.forEach(tag => {
                    tagData.push(tag)
                    })
                }
            })
            // this.tabTags = tagData.filter((v, i, a) => a.indexOf(v) === i);    
            this.tabTags = new Set(tagData)
            this.listeSitesLenght = this.dataSites.length
        },
        selectTag(tag) {
            let filterRender = []
            for (let i = 0; i < this.dataSites.length; i++) {
                if(this.dataSites[i].tabTag != undefined) {
                    this.dataSites[i].tabTag.forEach(e => {
                        if(e == tag){
                            filterRender.push(this.dataSites[i])
                        }
                    })
                }
            }
            this.dataSites = filterRender    
            this.loadTagsData()
        },

        deleteFilter() {
            this.dataSites = this.SaveDataSites
            this.nbrFilters = ""
            this.loadTagsData()
        },

        deleteSite(id, index) {
            // let confirmation = confirm("Êtes vous bien sûr?")
            // if(confirmation){
                fetch(`https://test-integration-c1055-default-rtdb.firebaseio.com/sites/${id}.json`, {
                method: 'DELETE'
            })
            .catch(err => console.log(err))
            this.dataSites.splice(index, 1)
            // }
            this.loadTagsData()
        },
    },
    watch: {
        listeSitesLenght() {
            if(this.listeSitesLenght != this.ref) {
                this.nbrFilters ++
            }
        }
    },
    beforeCreate() {   
        },
    created() {
        this.loadSitesData()
    },
    // mounted() {
    //     this.loadTagsData()
    // },
    updated() {
        
    }
}
</script>

<style>

</style>